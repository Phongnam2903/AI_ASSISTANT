---
key: FR-JARVIS-009
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: []
---

# FR-JARVIS-009 — Stop / cancel a turn

## Description

The user can stop TTS playback and cancel an in-progress turn at any time. Cancelled turns' late-arriving results (STT/TTS) are discarded, not applied.

## Acceptance Criteria

### AC-JARVIS-009-01

- given: TTS is currently playing
- when: the user presses Stop
- then: playback stops immediately (local stop, not dependent on network)

### AC-JARVIS-009-02

- given: a turn is cancelled mid-processing
- when: a late STT/TTS result for that turn arrives afterward
- then: it is discarded and does not affect the current state

## Status thực tế

**Proposed** — thuộc Phase 2. Tương ứng `VO-04` trong `docs/requirements.md`.
