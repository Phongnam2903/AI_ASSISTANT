---
key: EPIC-JARVIS-002
change_set: CHG-JARVIS-2026-001
status: draft
---

# EPIC-JARVIS-002 — Speech Pipeline

Voice-first: mic → VAD → STT → phản hồi cố định (chưa AI thật) → TTS, chạy trên Windows thật, tiếng Việt, qua local WebSocket API có auth.

## Stories

- `STORY-JARVIS-005` — Prerequisite gate cho speech pipeline
- `STORY-JARVIS-006` — Triển khai speech pipeline (chỉ sau khi gate PASS và có implementation approval riêng)

## Liên quan

`CAP-JARVIS-001` (Voice Interaction), `CMP-JARVIS-VOICE`, `docs/phase-2-implementation-plan.md` (tài liệu kỹ thuật tham chiếu, nội dung được giữ nguyên giá trị — chỉ đổi đơn vị quản lý sang Task/Story/Epic của `.aide/`).
