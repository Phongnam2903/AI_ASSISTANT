# Architecture Decision Records

Các ADR dưới đây là **Proposed**, chưa được chủ dự án phê duyệt. Ngày tạo: 2026-09-07. Chúng hiện thực hóa bằng tài liệu định hướng mới, không chứng minh implementation đã có.

| ADR | Quyết định đề xuất |
| --- | --- |
| [0001](0001-project-architecture.md) | Modular monolith với Tauri desktop và một backend FastAPI |
| [0002](0002-agent-framework.md) | LangGraph từ Phase 4, LLM abstraction độc lập provider |
| [0003](0003-memory-strategy.md) | RAM trước, Redis/PostgreSQL/pgvector từ Phase 6 |
| [0004](0004-voice-first-interaction.md) | Voice-first, desktop trước speech, click/shortcut trước wake word |

Khi được duyệt, ghi người/ngày/phạm vi và chuyển ADR tương ứng sang Accepted. Thay đổi quyết định đã chấp nhận cần ADR mới hoặc ghi rõ Superseded; không tự đổi trạng thái chỉ vì code đã được viết.
