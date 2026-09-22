---
key: TASK-JARVIS-007
story: STORY-JARVIS-006
status: blocked
blocked_by: [TASK-JARVIS-006]
---

# TASK-JARVIS-007 — Scaffold `apps/backend/`

FastAPI app, WebSocket endpoint, session token + Origin auth (`NFR-JARVIS-SEC-002`), cấu trúc module (transport, voice, conversation).

## Bằng chứng

`requirements.txt`/lockfile, app khởi động được, echo WebSocket có auth (session sai/Origin sai bị từ chối).
