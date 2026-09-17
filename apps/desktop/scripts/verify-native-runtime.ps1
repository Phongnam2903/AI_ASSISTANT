$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class AssistantWindowProbe {
    [StructLayout(LayoutKind.Sequential)]
    public struct Rect { public int Left, Top, Right, Bottom; }
    [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr window);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr window, out Rect rect);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr window);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
'@
[AssistantWindowProbe]::SetProcessDPIAware() | Out-Null
$appRoot = Split-Path $PSScriptRoot -Parent
$exePath = Join-Path $appRoot 'src-tauri\target\release\desktop-assistant-shell.exe'
$evidenceRoot = Join-Path $appRoot 'verification'
New-Item -ItemType Directory -Path $evidenceRoot -Force | Out-Null
$record = [ordered]@{
    StartedUtc = [DateTime]::UtcNow.ToString('o')
    Executable = $exePath
    ExecutableSha256 = (Get-FileHash -LiteralPath $exePath -Algorithm SHA256).Hash
    Status = 'FAIL'
    ForcedTermination = $false
}
$appProcess = $null
try {
    $appProcess = Start-Process -FilePath $exePath -WorkingDirectory $appRoot -WindowStyle Normal -PassThru
    $record.ProcessId = $appProcess.Id
    $deadline = [DateTime]::UtcNow.AddSeconds(20)
    do {
        $appProcess.Refresh()
        if ($appProcess.HasExited) { throw "App exited before showing a window: $($appProcess.ExitCode)" }
        if ($appProcess.MainWindowHandle -ne [IntPtr]::Zero) { break }
        Start-Sleep -Milliseconds 200
    } while ([DateTime]::UtcNow -lt $deadline)
    $window = $appProcess.MainWindowHandle
    if ($window -eq [IntPtr]::Zero) { throw 'No native main window appeared within 20 seconds.' }
    $record.WindowHandle = $window.ToInt64()
    $record.WindowTitle = $appProcess.MainWindowTitle
    $record.IsWindowVisible = [AssistantWindowProbe]::IsWindowVisible($window)
    if (-not $record.IsWindowVisible) { throw 'Native window is not visible.' }
    if ($record.WindowTitle -ne 'Personal AI Assistant') { throw 'Unexpected native window title.' }
    [AssistantWindowProbe]::SetForegroundWindow($window) | Out-Null
    Start-Sleep -Milliseconds 2000
    $record.ForegroundMatches = [AssistantWindowProbe]::GetForegroundWindow() -eq $window
    if (-not $record.ForegroundMatches) { throw 'Window did not become foreground; cannot safely capture only the app window.' }
    $rect = New-Object AssistantWindowProbe+Rect
    if (-not [AssistantWindowProbe]::GetWindowRect($window, [ref]$rect)) { throw 'GetWindowRect failed.' }
    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top
    if ($width -le 0 -or $height -le 0) { throw 'Native window has invalid bounds.' }
    $record.WindowBounds = @{ Left=$rect.Left; Top=$rect.Top; Width=$width; Height=$height }
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
        $screenshot = Join-Path $evidenceRoot 'native-window-launch.png'
        $bitmap.Save($screenshot, [System.Drawing.Imaging.ImageFormat]::Png)
        $record.Screenshot = 'verification/native-window-launch.png'
    } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
    }
    $processInventory = @(Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId)
    $ownedIds = @($appProcess.Id)
    do {
        $newIds = @($processInventory | Where-Object { $_.ParentProcessId -in $ownedIds -and $_.ProcessId -notin $ownedIds } | Select-Object -ExpandProperty ProcessId)
        $ownedIds += $newIds
    } while ($newIds.Count -gt 0)
    $record.ObservedChildProcessIds = @($ownedIds | Where-Object { $_ -ne $appProcess.Id })

    # Close-to-tray check: the normal window close must hide, not exit, the process.
    $record.CloseRequested = $appProcess.CloseMainWindow()
    if (-not $record.CloseRequested) { throw 'CloseMainWindow did not deliver a normal close request.' }
    Start-Sleep -Milliseconds 1500
    $appProcess.Refresh()
    if ($appProcess.HasExited) { throw 'Process exited on window close instead of hiding to tray.' }
    $record.HiddenAfterClose = -not [AssistantWindowProbe]::IsWindowVisible($window)
    if (-not $record.HiddenAfterClose) { throw 'Window remained visible after close-to-tray request.' }
    $record.ProcessAliveAfterHide = $true

    $record.Status = 'PASS'
} catch {
    $record.Error = $_.Exception.Message
} finally {
    if ($appProcess -and -not $appProcess.HasExited) {
        Stop-Process -Id $appProcess.Id -Force
        $record.ForcedTermination = $true
    }
    $record.CompletedUtc = [DateTime]::UtcNow.ToString('o')
    $json = $record | ConvertTo-Json -Depth 6
    [IO.File]::WriteAllText((Join-Path $evidenceRoot 'native-runtime.json'), $json + [Environment]::NewLine, (New-Object Text.UTF8Encoding($false)))
    Write-Output $json
}
if ($record.Status -ne 'PASS') { exit 1 }
exit 0
