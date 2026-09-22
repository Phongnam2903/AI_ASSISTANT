---
key: FR-JARVIS-010
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: [NFR-JARVIS-SEC-002]
---

# FR-JARVIS-010 — Authenticated local WebSocket API

## Description

The desktop-to-backend WebSocket connection (loopback only) requires a short-lived session token issued through a private channel (never URL/query string/log) and validates the Origin header. This is not just CORS — it is required because the API is reachable by any local process/page.

## Acceptance Criteria

### AC-JARVIS-010-01

- given: a WebSocket connection attempt with a missing or invalid session token
- when: the backend evaluates the handshake
- then: the connection is rejected before any audio/data is accepted

### AC-JARVIS-010-02

- given: a WebSocket connection attempt with a disallowed Origin
- when: the backend evaluates the handshake
- then: the connection is rejected

### AC-JARVIS-010-03

- given: an oversized frame beyond the configured limit
- when: it is received
- then: it is rejected and does not crash the backend

## Status thực tế

**Proposed** — thuộc Phase 2. Tương ứng `SE-02` trong `docs/requirements.md` và `docs/security.md` mục "Trang web khác gọi backend local".
