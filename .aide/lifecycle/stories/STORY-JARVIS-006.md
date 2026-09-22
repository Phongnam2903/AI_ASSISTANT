---
key: STORY-JARVIS-006
epic: EPIC-JARVIS-002
status: blocked
blocked_by: [STORY-JARVIS-005, "Speech Pipeline implementation approval by project owner"]
---

# STORY-JARVIS-006 — Triển khai speech pipeline

Là người dùng, tôi muốn gọi trợ lý và nhận được phản hồi bằng giọng nói thật (dù chưa cần AI thông minh), để xác nhận toàn bộ "tai và miệng" của trợ lý hoạt động trước khi Phase 3 gắn LLM vào.

## Tasks

- `TASK-JARVIS-006` — Khóa `packages/contracts` (JSON Schema + generate types)
- `TASK-JARVIS-007` — Scaffold `apps/backend/` (FastAPI + WebSocket + auth)
- `TASK-JARVIS-008` — VAD/STT/TTS adapters theo interface chung
- `TASK-JARVIS-009` — Conversation Manager (session/turn/cancellation/limits)
- `TASK-JARVIS-010` — Desktop audio capture + gắn state thật vào Overlay
- `TASK-JARVIS-011` — Kiểm thử, đo latency, cập nhật docs/README

## Điều kiện bắt đầu (Definition of Ready ở mức Story)

**BLOCKED** cho đến khi: (a) `STORY-JARVIS-005` Done với G1–G5 PASS, và (b) chủ dự án phê duyệt "Speech Pipeline implementation" riêng — đúng quy trình 2 lớp phê duyệt (plan/gate rồi mới implementation) đã dùng ở Phase 1.
