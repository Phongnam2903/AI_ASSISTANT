# API (apps/api)

Status: Scaffolded folder structure only. No application code yet — implementation starts in Phase 1.

Planned stack: Python + FastAPI + Pydantic + SQLAlchemy.

## Planned structure

```text
app/
├── api/            # HTTP + WebSocket route handlers
├── core/           # config, settings, DI wiring, LLM provider abstraction
├── agents/         # LangGraph graph definitions (Phase 2+)
├── tools/          # BaseTool contract + implementations (Phase 2+)
├── memory/         # short-term / long-term / semantic memory (Phase 4+)
├── models/         # SQLAlchemy ORM models
├── schemas/        # Pydantic request/response DTOs
├── services/       # application/use-case logic
├── repositories/   # data-access layer
├── integrations/   # Gmail / Calendar / GitHub / web clients (Phase 6+)
└── observability/  # structured logging, tracing IDs, metrics
tests/
```

See `/docs/architecture.md` §5 for the dependency direction and rationale. `pyproject.toml` and actual dependencies are introduced in Phase 1, not in Phase 0.
