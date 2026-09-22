---
key: TASK-JARVIS-002
story: STORY-JARVIS-005
status: not_ready
---

# TASK-JARVIS-002 — G2: Audio device trên Windows

Xác minh microphone và speaker được hệ điều hành nhận diện; thử capture/playback thô (chưa qua VAD/STT/TTS) để chứng minh thiết bị thật hoạt động.

## Bằng chứng PASS bắt buộc

Danh sách thiết bị phát hiện, log capture/playback thật — không dùng version probe thay cho device test.

## Definition of Ready

**NOT READY** — phụ thuộc `TASK-JARVIS-001` và Scope Gate của `CHG-JARVIS-2026-001`.
