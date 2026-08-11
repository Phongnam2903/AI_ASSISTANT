# Web App (apps/web)

Status: Scaffolded folder structure only. No application code yet — implementation starts in Phase 1.

Planned stack: Next.js + TypeScript + Tailwind CSS.

## Planned structure

```text
src/
├── app/          # Next.js App Router routes/layouts
├── components/   # Shared, presentation-only UI components
├── features/     # Feature-scoped modules (chat, auth, settings, ...)
├── hooks/        # Cross-feature reusable hooks
├── services/     # API client layer (REST + WebSocket)
├── stores/       # Client-side state
├── types/        # Shared TypeScript types
└── utils/        # Pure helper functions
```

See `/docs/architecture.md` §6 for the full rationale. `package.json` and actual dependencies are introduced in Phase 1, not in Phase 0.
