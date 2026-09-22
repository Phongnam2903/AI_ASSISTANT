---
key: STORY-JARVIS-005
epic: EPIC-JARVIS-002
status: draft
---

# STORY-JARVIS-005 — Prerequisite gate cho speech pipeline

Là chủ dự án, tôi muốn toolchain/thiết bị/provider cho speech pipeline được xác minh thật (không phải suy luận) trước khi bất kỳ code backend nào được viết, để tránh code sai hướng rồi phải sửa lại — đúng bài học đã áp dụng ở Phase 1.

## Tasks

- `TASK-JARVIS-001` — G1: Python/FastAPI toolchain
- `TASK-JARVIS-002` — G2: Audio device trên Windows
- `TASK-JARVIS-003` — G3: Chọn provider VAD/STT/TTS (chặn bởi `OQ-JARVIS-2026-001-001`)
- `TASK-JARVIS-004` — G4: Minimal audio pipeline spike
- `TASK-JARVIS-005` — G5: Quyết định capture path (WebView2 vs native) + ADR

## Điều kiện hoàn thành Story

Cả 5 Task đều Done; kết quả PASS/FAIL/BLOCKED ghi rõ; nếu có FAIL/BLOCKED thì Story dừng, không chuyển sang `STORY-JARVIS-006`.
