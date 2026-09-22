---
key: NFR-JARVIS-SEC-002
type: non-functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
---

# NFR-JARVIS-SEC-002 — Authenticated local API

Local WebSocket API (loopback-only) phải xác thực bằng session token ngắn hạn cấp qua kênh riêng (không URL/query/log) và kiểm tra Origin allowlist — không dựa vào CORS đơn thuần, vì đây là server local có thể bị trang web khác gọi tới.

**Proposed** — áp dụng từ Phase 2 (`FR-JARVIS-010`).
