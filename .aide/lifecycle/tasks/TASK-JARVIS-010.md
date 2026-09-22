---
key: TASK-JARVIS-010
story: STORY-JARVIS-006
status: blocked
blocked_by: [TASK-JARVIS-009]
---

# TASK-JARVIS-010 — Desktop audio capture + state thật

Gắn audio capture (qua Native Adapter đã có từ Phase 1) vào `useAssistantShell`; Overlay hiển thị Idle/Listening/Thinking/Speaking/Error thật thay vì simulator; greeting phát TTS.

## Bằng chứng

UI phản ánh đúng trạng thái backend gửi về (`playback.started`/`playback.finished`); không tự suy đoán Speaking.

## Do not touch

`CMP-JARVIS-DESKTOP` phần tray/single-instance/settings đã Completed ở Phase 1 — không refactor lại trừ khi cần thiết cho audio capture.
