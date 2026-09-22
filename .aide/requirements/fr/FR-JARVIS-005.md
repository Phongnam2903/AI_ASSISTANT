---
key: FR-JARVIS-005
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: partial
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: []
---

# FR-JARVIS-005 — Time-based greeting

## Description

JARVIS greets the user based on local system time (morning/afternoon/evening/night boundaries), deterministically and locally — no LLM, Calendar, or Email involved. Phase 1 renders it as text; Phase 2 adds spoken (TTS) greeting when audio is enabled.

## Acceptance Criteria

### AC-JARVIS-005-01 (Phase 1 — satisfied)

- given: the assistant window opens or is shown after being hidden
- when: greeting is enabled
- then: the correct greeting text for the current local hour is displayed once

### AC-JARVIS-005-02 (Phase 2 — proposed)

- given: greeting is enabled and audio is on
- when: the assistant opens/shows
- then: the greeting is also spoken via TTS, without duplicating on refocus of an already-visible window

## Status thực tế

**Partial.** AC-005-01 satisfied ở Phase 1 (`docs/phase-1-implementation-plan.md` §8 P1-02). AC-005-02 thuộc Phase 2, chưa triển khai.
