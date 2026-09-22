---
key: OBS-JARVIS-001
type: observability-spec
group: normative
scope: system
system: SYS-JARVIS
status: draft
revision: 1
---

# OBS-JARVIS-001 — Baseline logging

Log vận hành dùng mã lỗi/latency/correlation ID; **không chứa** raw audio, token, prompt, transcript hay email mặc định (kế thừa `docs/security.md` §Audit và validation). Audit tool call tối thiểu bắt đầu từ Phase 4, ghi action/tool, scope đã redact, policy decision, approval reference, thời gian, kết quả.

Phase 1–2 chưa cần audit trail cho tool (chưa có tool nào tồn tại) — chỉ cần log lỗi/latency cơ bản cho debugging desktop/voice pipeline.
