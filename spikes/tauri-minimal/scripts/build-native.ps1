$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    $vswhere = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'
    $installation = @(& $vswhere -products '*' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath) |
        Where-Object { Test-Path -LiteralPath (Join-Path $_ 'VC\Tools\MSVC\14.29.30133') } |
        Select-Object -First 1
    if (-not $installation) { throw 'Verified MSVC 14.29.30133 installation not found.' }
    $devCmd = Join-Path $installation 'Common7\Tools\VsDevCmd.bat'
    $envCommand = '"' + $devCmd + '" -no_logo -arch=x64 -host_arch=x64 -winsdk=10.0.22621.0 && set'
    $devEnvironment = & $env:ComSpec /d /s /c $envCommand
    if ($LASTEXITCODE -ne 0) { throw 'VsDevCmd failed.' }
    foreach ($line in $devEnvironment) {
        if ($line -match '^(PATH|INCLUDE|LIB|LIBPATH|WindowsSdkDir|WindowsSDKVersion|VCToolsInstallDir|VCToolsVersion|VSINSTALLDIR|VCINSTALLDIR|UniversalCRTSdkDir|UCRTVersion|VSCMD_ARG_TGT_ARCH)=(.*)$') {
            [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process')
        }
    }
    if ($env:VCToolsVersion -ne '14.29.30133') { throw "Unexpected MSVC: $env:VCToolsVersion" }
    if ($env:WindowsSDKVersion.TrimEnd('\') -ne '10.0.22621.0') { throw "Unexpected SDK: $env:WindowsSDKVersion" }
    Write-Output "MSVC=$env:VCToolsVersion SDK=$env:WindowsSDKVersion TARGET=$env:VSCMD_ARG_TGT_ARCH"
    $env:CARGO_HOME = Join-Path (Get-Location) '.cache/cargo'
    $env:NPM_CONFIG_CACHE = Join-Path (Get-Location) '.cache/npm'
    $env:CARGO_BUILD_JOBS = '4'
    # Native stderr may contain normal build progress; the actual exit code decides success.
    $ErrorActionPreference = 'Continue'
    & npm.cmd run native:build
    $buildExit = $LASTEXITCODE
    Write-Output "TAURI_NATIVE_BUILD_EXIT=$buildExit"
    exit $buildExit
} finally {
    Pop-Location
}
