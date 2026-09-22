---
key: TASK-JARVIS-003
story: STORY-JARVIS-005
status: blocked
blocked_by: [OQ-JARVIS-2026-001-001]
---

# TASK-JARVIS-003 — G3: Chọn provider VAD/STT/TTS

Đánh giá tối thiểu 1 lựa chọn local và 1 lựa chọn cloud cho STT/TTS theo tiêu chí: chất lượng tiếng Việt, độ trễ, chi phí, dữ liệu có rời máy không. Đề xuất mặc định: Silero VAD + faster-whisper + Piper TTS (local-first).

## Bằng chứng PASS bắt buộc

Bảng so sánh có nguồn; quyết định cuối ghi vào ADR mới (`architecture/adr/`); nếu chọn cloud phải ghi rõ chính sách lưu dữ liệu của provider đó.

## Definition of Ready

**BLOCKED** bởi `OQ-JARVIS-2026-001-001` (câu hỏi local vs cloud) — cần chủ dự án trả lời trước.
