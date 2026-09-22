---
key: TASK-JARVIS-005
story: STORY-JARVIS-005
status: not_ready
depends_on: [TASK-JARVIS-004]
---

# TASK-JARVIS-005 — G5: Quyết định capture path

Thử capture qua WebView2 (`getUserMedia`) trước; nếu chất lượng/latency không đạt, thử native capture adapter cùng interface.

## Bằng chứng PASS bắt buộc

Kết quả đo latency/chất lượng của phương án đã thử; ADR ghi quyết định cuối trong `architecture/adr/` — không chọn ngầm không ghi lại.

## Definition of Ready

**NOT READY** — phụ thuộc `TASK-JARVIS-004`. Hoàn thành Task này = Story `STORY-JARVIS-005` Done = gate G1–G5 PASS.
