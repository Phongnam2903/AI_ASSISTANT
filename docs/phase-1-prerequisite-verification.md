# Phase 1 — Prerequisite Verification Report

Date: 2026-09-08.
Current Phase: Phase 1 — Desktop Assistant Shell (Prerequisite Verification).
Phase 1 implementation plan: **Approved by project owner — 2026-09-08**.
Scope authorized: G1–G4 only. Desktop Shell implementation is not authorized.

## Result

**Overall: NOT PASSED — STOP.** Gate evaluation is complete for the current environment; this does not mean all gates passed.

| Gate | Status | Observed result |
| --- | --- | --- |
| G1 — npm verification | PASS | npm 10.8.2 works in the host execution context and reads exact package metadata from the public registry. |
| G2 — Native prerequisites | FAIL | No matching C++ toolchain installation; Visual Studio Build Tools 2019 installation is incomplete; Windows SDK Include/Lib are absent. |
| G3 — Dependency compatibility | FAIL | Installed Node 20.20.2 satisfies the queried engine ranges but fails the approved requirement to use a supported Node LTS release. Dependency/build compatibility is not fully validated. |
| G4 — Tauri minimal native spike | BLOCKED | Missing G2 native prerequisites and unresolved G3 runtime baseline prevent a valid native build/run verification. No spike has been scaffolded or run. |

Raw command records, outputs and exit codes: [commands.json](evidence/phase-1-prerequisites/commands.json). Record IDs below identify entries in that file. No transcript, credential or environment-secret dump was collected.

## G1 — npm verification

**Status: PASS**

**Commands**

- `npm.cmd --version` in the sandbox.
- The same version probe in the host execution context using an approved sandbox escalation.
- `npm.cmd view react@19.2.0 version engines peerDependencies --json --registry=https://registry.npmjs.org`.
- Equivalent exact-version queries for react-dom@19.2.0, typescript@5.9.3, vite@7.3.1 and @tauri-apps/cli@2.10.0.

**Versions:** Node 20.20.2, npm 10.8.2.

**Exit codes:** sandbox npm version probe = 1; host npm version probe = 0; each of the five registry queries = 0; metadata collection command = 0.

**Evidence:** records `g1-npm-sandbox`, `host-toolchain-confirmation`, `pinned-package-metadata`.

**Observed result:** npm runs and resolves public metadata without EPERM in the host context. Query cache was directed to the ignored workspace directory `.cache/npm`. No package installation, global npm upgrade or change to the active Node version was performed.

**Issues:** sandbox execution cannot traverse the NVM target in the user profile and initially reports EPERM. G1 PASS applies to the verified host context, not to unrestricted operation inside the sandbox.

**Resolution if applicable:** repeated the read-only probe outside the sandbox under approved escalation. Future installation/build must use a permitted execution context or an accessible project toolchain. Actual dependency installation and lockfile reproducibility are not claimed by this metadata check; they remain part of G4.

## G2 — Native prerequisites verification

**Status: FAIL**

**Commands**

- `vswhere.exe -all -products "*" -format json -utf8`.
- `vswhere.exe -all -products "*" -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath`.
- The component query repeated in the host context with JSON output.
- SDK filesystem probes under `C:/Program Files (x86)/Windows Kits/10`.
- WebView2 registry version probe.
- `rustc -vV`, `cargo --version`.
- A final gate assertion checking matching C++ installations and SDK Include/Lib directories.

**Versions**

- Visual Studio Build Tools 2019: installation version **16.11.37206.5**, product display version **16.11.55**.
- Rust **1.97.1**, host **x86_64-pc-windows-msvc**.
- Cargo **1.97.1**.
- WebView2 registry version **152.0.4191.66**.
- Windows SDK: **no usable version detected**; Include and Lib directories are absent.

**Exit codes:** vswhere probes = 0; rustc = 0; cargo = 0; final native gate assertion = **1**. A successful inventory command does not mean the required components exist.

**Evidence:** records `g2-native-probes-sandbox`, `host-toolchain-confirmation`, `g2-native-assertion`.

**Observed result:** vswhere lists an incomplete Build Tools installation with `isComplete=false`, `isLaunchable=false` and a canceled installation marker. The C++ component query returns no matching installation. SDK root exists but its Include/Lib directories do not. The host recheck confirms this is not merely sandbox visibility.

**Issues:** C++ compiler/linker workload and Windows SDK are not verified or usable through the required installation. Rust and WebView2 version detection alone cannot establish a native build.

**Resolution if applicable:** not resolved. Repair or install the supported Visual Studio C++ Build Tools workload with a Windows SDK, then repeat G2 and G4. No system-wide installer, repair operation or reboot was initiated during this verification. Windows requirements are documented by [Tauri](https://v2.tauri.app/start/prerequisites/).

## G3 — Node/Tauri/frontend compatibility

**Status: FAIL**

**Commands**

- `node --version` and inspection of the NVM link/installed version directories.
- The five exact npm registry queries listed in G1.
- HTTP GET `https://crates.io/api/v1/crates/tauri/2.10.0`, selecting version, rust_version and yanked.
- HTTP GET `https://nodejs.org/dist/index.json`, selecting an available Node 24 LTS release dated no later than 2026-09-08.
- Review of the official [Node release lifecycle](https://nodejs.org/en/about/previous-releases).

**Versions:** see the matrix below.

**Exit codes:** Node version probe = 0; five npm metadata queries = 0; combined npm/crates.io/Node index collection command = 0. Web documentation review has no process exit code.

**Evidence:** records `g3-node-sandbox`, `g3-node-installations-sandbox`, `host-toolchain-confirmation`, `pinned-package-metadata`; official sources linked in this section.

**Observed result:** only Node 18.20.2 and 20.20.2 were found in the NVM installation, with 20.20.2 active. React/ReactDOM metadata is mutually compatible; the active Node satisfies the queried engines; Rust 1.97.1 is above tauri 2.10.0's declared minimum Rust 1.77.2.

However, Node 20 is EOL on the verification date. The approved gate requires a supported LTS baseline, so G3 is FAIL despite satisfying the package engine ranges. Node 24.20.0, released 2026-08-26 as LTS Krypton with npm 11.19.0, was identified as an exact candidate from the official release index; it was not installed or tested.

**Issues:** unsupported active Node baseline; no dependency installation, transitive resolution, lockfiles or build validation. This matrix is not evidence that a complete frontend/native dependency graph builds.

**Resolution if applicable:** not resolved. Select and enable a supported exact Node/npm pair, recheck metadata and execute dependency/build checks when G2 is fixed. Do not treat the candidate versions below as a validated production baseline.

### Version matrix

| Component | Observed or exact version examined | Compatibility / verification state |
| --- | --- | --- |
| Node | Installed active **20.20.2**; candidate **24.20.0** | Active version meets Vite engines but is EOL; candidate LTS not installed/tested. |
| npm | Installed **10.8.2**; bundled with candidate Node: **11.19.0** | Installed npm CLI/registry access verified; candidate npm not tested. |
| React | **19.2.0** metadata | Node >=0.10.0; not installed in project. |
| React DOM | **19.2.0** metadata | Peer React ^19.2.0; matches examined React version. |
| TypeScript | **5.9.3** metadata | Node >=14.17; not installed. |
| Vite | **7.3.1** metadata | Node ^20.19.0 or >=22.12.0; not installed/built. |
| Tauri CLI | **2.10.0** metadata | Node >=10; not installed. |
| Tauri Rust crate | **2.10.0** metadata | Rust >=1.77.2, not yanked; matches CLI major 2; not downloaded/built. |
| Tauri plugins | **None** in the minimal spike scope | No plugin dependency is needed or installed; future shell plugin versions must be checked separately. |
| Rust | **1.97.1** MSVC host | Version probe passes; native compilation blocked by G2. |
| Cargo | **1.97.1** | Version probe passes; no lockfile generated. |
| Visual Studio C++ Build Tools | **16.11.37206.5** installation record | Incomplete; no matching C++ component installation. |
| Windows SDK | **Unavailable / not detected** | Include/Lib directories missing; no version claimed. |
| WebView2 | **152.0.4191.66** registry | Runtime presence detected; native rendering not tested. |

**Pin/lock policy:** exact metadata queries were used, not ambiguous package installation tags. Before running the spike after prerequisites are repaired, create manifests with exact direct versions, an exact Node/toolchain selection and committed npm/Cargo lockfiles. Verify installation from locks. Any later Desktop Shell implementation must use the verified versions or repeat affected compatibility/build checks. No manifest or lockfile has been created during this blocked run.

## G4 — Tauri minimal native spike

**Status: BLOCKED**

**Commands:** scope check only: `Test-Path spikes/tauri-minimal` and listing of any implementation files under `apps/desktop`. Frontend install/build, Rust build, executable launch and clean-close tests were **NOT RUN**.

**Versions:** no spike runtime/dependencies installed. G3 lists only observed tools and exact metadata candidates.

**Exit codes:** scope-check command = 0, reporting spike absent and desktop implementation file list empty. Build/launch/close exit codes = **N/A — NOT RUN**.

**Evidence:** record `g4-blocked-scope-check`, G2 assertion exit 1, G3 matrix. No executable, screenshot or build artifact exists.

**Observed result:** G2 confirms the required native prerequisites are missing; G3 lacks a supported active LTS baseline. The spike has not been scaffolded, built or run, so G4 cannot pass.

**Issues:** cannot demonstrate the required native window or clean shutdown. A browser-only page, metadata query or synthetic success output would not satisfy G4.

**Resolution if applicable:** after prerequisite repair, run G4 only in `spikes/tauri-minimal/`: minimal React/Tauri application, one native window and one test label; frontend/native build, actual executable launch and clean close. No overlay, tray, greeting, shortcut, assistant states, microphone, STT/TTS, LLM, Agent or Memory.

## Documentation and authorization outcome

- [x] Phase 1 implementation plan approved by project owner.
- Approval date: **2026-09-08**.
- [x] Added compact constraints, development simulator isolation, SettingsRepository, native adapter layer and deterministic local greeting to the plan before running gates.
- [ ] Prerequisite gate G1–G4 passed.
- [ ] Desktop Shell implementation approved by project owner.
- [ ] Phase 1 implementation started.

README remains at **Prerequisite Verification**, recording the failed/blocked result rather than a PASS. The completed activity is the current gate evaluation and report; G2/G3 must be resolved and G4 must actually run before an overall PASS can be recorded.

**STOP.** Report prerequisite issues to the owner. Desktop Shell implementation still requires separate approval even after a future all-PASS gate run.

PHASE 1 PREREQUISITE GATE COMPLETE — WAITING FOR IMPLEMENTATION APPROVAL
