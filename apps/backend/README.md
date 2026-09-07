# Backend

Status: Skeleton only — implementation starts in Phase 2.

Python + FastAPI, một tiến trình gồm các mô-đun dự kiến: transport/config, voice, conversation, providers, agent, tools, permissions, memory và integrations. Mô-đun chỉ được tạo khi phase tương ứng triển khai; chưa có package Python, endpoint hoặc lệnh khởi động.

Phase 2 thêm local API/WebSocket có auth, STT/TTS adapter và quản lý session. Phase 3 thêm LLM và context RAM; LangGraph từ Phase 4; Redis/PostgreSQL/pgvector từ Phase 6. Backend giữ provider credentials; UI không truy cập trực tiếp SDK/provider.

Xem [architecture](../../docs/architecture.md), [flow](../../docs/agent-flow.md), [security](../../docs/security.md).
