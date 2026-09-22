---
key: FR-JARVIS-008
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

# FR-JARVIS-008 — Spoken response (fixed, pre-LLM)

## Description

After a turn is transcribed, JARVIS responds with a **fixed/scripted** reply (no LLM call in Phase 2) and speaks it via TTS on the real output device. This isolates speech-pipeline correctness from AI/model behavior, to be replaced by real LLM responses in Phase 3.

## Acceptance Criteria

### AC-JARVIS-008-01

- given: a final transcript has been produced
- when: the fixed response logic runs
- then: a scripted text response is produced without calling any LLM provider

### AC-JARVIS-008-02

- given: a response text and TTS enabled
- when: playback is triggered
- then: audio is played through a real speaker device on Windows

## Status thực tế

**Proposed** — thuộc Phase 2. Tương ứng phần TTS của `VO-03` trong `docs/requirements.md`. **Constraint bắt buộc: không gọi LLM ở đây** (xem Execution Guide §F.9, §Y.1).
