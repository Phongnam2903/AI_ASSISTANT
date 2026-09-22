---
key: FR-JARVIS-003
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: satisfied
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: []
---

# FR-JARVIS-003 — Optional global shortcut

## Description

User can enable, disable, or change a global keyboard shortcut to show the assistant window. If the configured shortcut is unavailable (OS/other app conflict), JARVIS reports it clearly and the tray remains a working fallback.

## Acceptance Criteria

### AC-JARVIS-003-01

- given: shortcut is enabled with a binding not held by another application
- when: registration is attempted
- then: status shows "registered" and pressing the binding shows the window

### AC-JARVIS-003-02

- given: shortcut is enabled with a binding already held by the OS or another application
- when: registration is attempted
- then: status shows "unavailable"; the tray Show action still works

## Status thực tế

**Satisfied** — Phase 1. Bằng chứng: `docs/phase-1-implementation-plan.md` §8 P1-04. Bug ACL (`global-shortcut:default` rỗng quyền) được phát hiện và sửa 2026-09-21; xem `apps/desktop/src-tauri/capabilities/default.json`.
