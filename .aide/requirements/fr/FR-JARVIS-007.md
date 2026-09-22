---
key: FR-JARVIS-007
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: [NFR-JARVIS-VOICE-001]
---

# FR-JARVIS-007 — Turn detection and transcription

## Description

JARVIS uses Voice Activity Detection (VAD) to detect a spoken turn (start/end of speech, ignoring silence and background noise, capped at 30 seconds), then converts the captured audio to a final transcript (STT) for Vietnamese. Partial transcripts do not trigger downstream processing.

## Acceptance Criteria

### AC-JARVIS-007-01

- given: the user speaks, pauses, and stays silent (including background noise)
- when: VAD processes the audio stream
- then: exactly one turn is produced per spoken utterance, not a continuous/unbounded stream; utterance is capped at 30 seconds

### AC-JARVIS-007-02

- given: a completed spoken turn in Vietnamese
- when: STT processes it
- then: a correct final transcript is produced on real hardware; silence produces no transcript and no empty prompt

## Status thực tế

**Proposed** — thuộc Phase 2. Tương ứng `VO-02`, `VO-03` (phần STT) trong `docs/requirements.md`.
