$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class SpikeWindowProbe {
    [StructLayout(LayoutKind.Sequential)]
    public struct Rect { public int Left, Top, Right, Bottom; }
    [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr window);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr window, out Rect rect);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr window);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
'@
[SpikeWindowProbe]::SetProcessDPIAware() | Out-Null
$spikeRoot = Split-Path $PSScriptRoot -Parent
$exePath = Join-Path $spikeRoot 'src-tauri\target\release\tauri-minimal-spike.exe'
$evidenceRoot = Join-Path $spikeRoot 'verification'
New-Item -ItemType Directory -Path $evidenceRoot -Force | Out-Null
$record = [ordered]@{
    StartedUtc = [DateTime]::UtcNow.ToString('o')
    Executable = $exePath
    ExecutableSha256 = (Get-FileHash -LiteralPath $exePath -Algorithm SHA256).Hash
    Status = 'FAIL'
    ForcedTermination = $false
}
$spikeProcess = $null
try {
    # The owner explicitly requested a visibly opened native window.
    $spikeProcess = Start-Process -FilePath $exePath -WorkingDirectory $spikeRoot -WindowStyle Normal -PassThru
    $processHandle = $spikeProcess.Handle
    $record.ProcessId = $spikeProcess.Id
    $deadline = [DateTime]::UtcNow.AddSeconds(20)
    do {
        $spikeProcess.Refresh()
        if ($spikeProcess.HasExited) { throw "Spike exited before showing a window: $($spikeProcess.ExitCode)" }
        if ($spikeProcess.MainWindowHandle -ne [IntPtr]::Zero) { break }
        Start-Sleep -Milliseconds 200
    } while ([DateTime]::UtcNow -lt $deadline)
    $window = $spikeProcess.MainWindowHandle
    if ($window -eq [IntPtr]::Zero) { throw 'No native main window appeared within 20 seconds.' }
    $record.WindowHandle = $window.ToInt64()
    $record.WindowTitle = $spikeProcess.MainWindowTitle
    $record.IsWindowVisible = [SpikeWindowProbe]::IsWindowVisible($window)
    if (-not $record.IsWindowVisible) { throw 'Native window is not visible.' }
    if ($record.WindowTitle -ne 'Tauri prerequisite spike') { throw 'Unexpected native window title.' }
    [SpikeWindowProbe]::SetForegroundWindow($window) | Out-Null
    Start-Sleep -Milliseconds 2000
    $record.ForegroundMatches = [SpikeWindowProbe]::GetForegroundWindow() -eq $window
    if (-not $record.ForegroundMatches) { throw 'Window did not become foreground; cannot safely capture only the visible spike.' }
    $rect = New-Object SpikeWindowProbe+Rect
    if (-not [SpikeWindowProbe]::GetWindowRect($window, [ref]$rect)) { throw 'GetWindowRect failed.' }
    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top
    if ($width -le 0 -or $height -le 0) { throw 'Native window has invalid bounds.' }
    $record.WindowBounds = @{ Left=$rect.Left; Top=$rect.Top; Width=$width; Height=$height }
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
        $screenshot = Join-Path $evidenceRoot 'native-window.png'
        $bitmap.Save($screenshot, [System.Drawing.Imaging.ImageFormat]::Png)
        $record.Screenshot = 'verification/native-window.png'
    } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
    }
    $processInventory = @(Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId)
    $ownedIds = @($spikeProcess.Id)
    do {
        $newIds = @($processInventory | Where-Object { $_.ParentProcessId -in $ownedIds -and $_.ProcessId -notin $ownedIds } | Select-Object -ExpandProperty ProcessId)
        $ownedIds += $newIds
    } while ($newIds.Count -gt 0)
    $record.ObservedChildProcessIds = @($ownedIds | Where-Object { $_ -ne $spikeProcess.Id })
    $record.CloseRequested = $spikeProcess.CloseMainWindow()
    if (-not $record.CloseRequested) { throw 'CloseMainWindow did not deliver a normal close request.' }
    if (-not $spikeProcess.WaitForExit(10000)) { throw 'Spike did not exit after normal window close.' }
    $record.ExitCode = $spikeProcess.ExitCode
    if ($record.ExitCode -ne 0) { throw "Spike exited with code $($record.ExitCode)." }
    $deadline = [DateTime]::UtcNow.AddSeconds(5)
    do {
        $remainingIds = @($record.ObservedChildProcessIds | Where-Object { Get-Process -Id $_ -ErrorAction SilentlyContinue })
        if ($remainingIds.Count -eq 0) { break }
        Start-Sleep -Milliseconds 200
    } while ([DateTime]::UtcNow -lt $deadline)
    $record.RemainingChildProcessIds = $remainingIds
    if ($remainingIds.Count -gt 0) { throw 'Observed child processes remained after normal exit.' }
    $record.WindowVisibleAfterExit = [SpikeWindowProbe]::IsWindowVisible($window)
    if ($record.WindowVisibleAfterExit) { throw 'Window remained visible after process exit.' }
    $record.Status = 'PASS'
} catch {
    $record.Error = $_.Exception.Message
} finally {
    if ($spikeProcess -and -not $spikeProcess.HasExited) {
        $spikeProcess.CloseMainWindow() | Out-Null
        if (-not $spikeProcess.WaitForExit(5000)) {
            # Cleanup only this process created by the verification; it cannot count as PASS.
            $record.ForcedTermination = $true
            $spikeProcess.Kill()
            $spikeProcess.WaitForExit()
        }
    }
    $record.CompletedUtc = [DateTime]::UtcNow.ToString('o')
    $json = $record | ConvertTo-Json -Depth 6
    [IO.File]::WriteAllText((Join-Path $evidenceRoot 'native-runtime.json'), $json + [Environment]::NewLine, (New-Object Text.UTF8Encoding($false)))
    Write-Output $json
}
if ($record.Status -ne 'PASS') { exit 1 }
exit 0
