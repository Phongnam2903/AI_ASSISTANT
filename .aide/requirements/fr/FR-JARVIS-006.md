---
key: FR-JARVIS-006
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: [NFR-JARVIS-SEC-002, NFR-JARVIS-PRIV-001]
---

# FR-JARVIS-006 — Microphone capture with permission and indicator

## Description

JARVIS must not capture microphone audio until permission is granted for the current session, must show a clear capturing indicator while active, and must release the microphone immediately on hide/end/exit. It must handle permission denial, device removal, and mute gracefully.

## Acceptance Criteria

### AC-JARVIS-006-01

- given: microphone permission has not been granted for the session
- when: the user has not started a voice session
- then: no audio capture occurs

### AC-JARVIS-006-02

- given: an active capturing session
- when: the user hides, ends, or exits the assistant
- then: the microphone is released immediately and the capturing indicator disappears

### AC-JARVIS-006-03

- given: permission is denied, or the input device is removed/muted mid-session
- when: the condition occurs
- then: JARVIS surfaces a clear error state and does not crash or silently continue

## Status thực tế

**Proposed** — thuộc Phase 2 (Speech Pipeline), chưa triển khai. Tương ứng `VO-01` trong `docs/requirements.md`.
