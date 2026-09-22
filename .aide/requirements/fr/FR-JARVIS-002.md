---
key: FR-JARVIS-002
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

# FR-JARVIS-002 — System tray control

## Description

JARVIS provides a system tray icon with Show, Hide, and Exit. Closing the assistant window hides it to the tray instead of exiting the application; Exit is the only path that terminates the process.

## Acceptance Criteria

### AC-JARVIS-002-01

- given: the assistant window is visible
- when: the user clicks the window close control or the tray "Hide" item
- then: the window hides; the process and tray icon remain running

### AC-JARVIS-002-02

- given: the tray icon is available
- when: the user selects "Exit"
- then: the process terminates cleanly with no leftover child processes

## Status thực tế

**Satisfied** — Phase 1. Bằng chứng: `docs/phase-1-implementation-plan.md` §8 P1-03 (xác nhận tự động + thủ công ngày 2026-09-21).
