# Tauri minimal prerequisite spike

Verification artifact only, authorized after G1-G3 passed on 2026-09-09.
One Tauri native window renders the React label "Tauri prerequisite spike".
Desktop Shell implementation is not started; keep this spike separate from apps/desktop.

Direct npm dependencies are exact; package-lock.json and Cargo.lock record resolution.
Node 24.20.0/npm 11.19.0 are enforced by package engines and .nvmrc.
The native build checks Rust/Cargo 1.97.1 and the x86_64-pc-windows-msvc host without changing the global toolchain.

Run from this directory in a host PowerShell with the verified C++/SDK installation:

```powershell
npm.cmd ci
npm.cmd run verify:toolchain
npm.cmd run build
powershell.exe -NoProfile -File scripts/build-native.ps1
.\src-tauri\target\release\tauri-minimal-spike.exe
```

Close the native window using its title-bar close button. No tray or background shell lifecycle is implemented.
scripts/build-native.ps1 selects MSVC 14.29.30133 and SDK 10.0.22621.0 in the child process,
uses a spike-local Cargo cache, and invokes a locked Tauri release build.
The native build uses Tauri's release build with bundling disabled; MSI/NSIS installers are outside this spike.
See [Tauri CLI build](https://v2.tauri.app/reference/cli/#build).

Verification results, commands, exit codes and runtime evidence are recorded under verification/ and in
[the prerequisite report](../../docs/phase-1-prerequisite-verification.md).

To repeat the native launch/window-capture/clean-close verification:

```powershell
powershell.exe -NoProfile -File scripts/verify-native-runtime.ps1
```

This verification helper opens the executable visibly, captures only its foreground window,
requests normal window close, and checks exit code and observed child-process cleanup.
A failed cleanup or forced termination cannot count as PASS.

The neutral 16x16 icon is only the Windows resource required by Tauri code generation.
No product UI or native plugins are implemented.

Compatibility fixes verified during G4:

- @tauri-apps/api is pinned to 2.10.1; npm marks 2.10.0 as a broken release.
- Cargo.lock pins tauri-runtime and tauri-runtime-wry to 2.10.0. Unconstrained resolution
  selected runtime 2.11.x and tauri 2.10.0 failed with E0308. Preserve the lock;
  dependency updates require another native build/run verification.
- tauri-build is pinned to 2.5.4, matching the native crate's declared build requirement.

Verified on 2026-09-09: **G1-G4 PASS**. The release executable rendered the label in a visible native window;
normal close exited with code 0, the window disappeared and all six observed child processes exited.
See [runtime evidence](verification/native-runtime.json), [window screenshot](verification/native-window.png),
[commands including failed attempts](verification/commands.json) and [artifact hashes](verification/artifacts.json).
Desktop Shell implementation has NOT started.
