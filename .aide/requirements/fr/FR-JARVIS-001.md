---
key: FR-JARVIS-001
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: satisfied
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: [NFR-JARVIS-SEC-001]
---

# FR-JARVIS-001 — Desktop invocation

## Description

User can bring up the JARVIS assistant window by click, global shortcut, or tray icon. A second launch focuses the existing window instead of opening a new instance.

## Acceptance Criteria

### AC-JARVIS-001-01

- given: JARVIS is not running
- when: the user launches the executable
- then: the compact assistant overlay opens and becomes visible

### AC-JARVIS-001-02

- given: JARVIS is already running (visible or hidden)
- when: the executable is launched a second time
- then: the existing window is shown and focused; no second process/window is created

## Status thực tế

**Satisfied** — Phase 1, Desktop Assistant Shell. Bằng chứng: `docs/phase-1-implementation-plan.md` §8 P1-01, `apps/desktop/README.md`.
