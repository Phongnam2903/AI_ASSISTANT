# REG-OWNER-001 — Ownership Registry

Status: Active · Cập nhật: 2026-09-21

Dự án hiện có một chủ dự án (project owner, quyết định/phê duyệt cuối cùng) và Claude (coding agent, đề xuất/triển khai/đề xuất kiến trúc). Xem [K. Human vs Agent Responsibilities](../../EXECUTION_GUIDE.md#k-human-vs-agent-responsibilities-trách-nhiệm-giữa-con-người-và-agent) trong Execution Guide.

| Module / Component | Owner đề xuất (drafts) | Owner phê duyệt (approves) |
| --- | --- | --- |
| `CMP-JARVIS-DESKTOP` | Claude | Project owner |
| `CMP-JARVIS-VOICE` | Claude | Project owner |
| `CMP-JARVIS-AGENT` | Claude | Project owner |
| `CMP-JARVIS-TOOLS` | Claude | Project owner |
| `CMP-JARVIS-MEMORY` | Claude | Project owner |
| `CMP-JARVIS-INTEGRATIONS` | Claude | Project owner |

Mọi Sensitive action, Release approval, Risk acceptance, Scope change và Product direction đều cần Project owner quyết định — Claude không tự phê duyệt các mục này (xem quy tắc K và Y trong Execution Guide).
