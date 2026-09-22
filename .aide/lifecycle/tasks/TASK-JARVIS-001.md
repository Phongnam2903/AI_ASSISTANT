---
key: TASK-JARVIS-001
story: STORY-JARVIS-005
status: not_ready
---

# TASK-JARVIS-001 — G1: Python/FastAPI toolchain verification

Chọn Python bản còn hỗ trợ chính thức (không mặc định bản đang cài trên máy); cài FastAPI + uvicorn + websockets qua venv/uv; xác minh WebSocket hoạt động với một endpoint echo tối thiểu.

## Bằng chứng PASS bắt buộc

Version Python/pip/uv, lệnh, exit code; lockfile (`requirements.txt`/`uv.lock`) tạo được; echo WebSocket nhận/gửi frame thật — không phải mô tả lý thuyết.

## Definition of Ready

**NOT READY.** Chặn bởi: (1) `CHG-JARVIS-2026-001` chưa qua Scope Gate (chủ dự án chưa phê duyệt Change Set), (2) chưa có Context Package/Implementation Plan.
