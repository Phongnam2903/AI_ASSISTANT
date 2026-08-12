# 0001 — Project Architecture: Modular Monolith

Status: Proposed

## Context

The Personal AI Assistant needs a backend architecture for a single-owner system that will grow to include an agent core, tool calling, permissions, memory, and several external integrations (Phases 1–6), and later automation, voice, desktop, and vision (Phases 7–11). The project brief explicitly warns against premature enterprise-grade infrastructure (Kafka, Kubernetes, RabbitMQ, service mesh, multiple microservices) and asks for YAGNI/KISS to guide the choice.

## Decision

Build the backend as a **modular monolith**: a single FastAPI deployable, internally organized into clear layers (`api`, `services`, `agents`, `tools`, `memory`, `repositories`, `integrations`, `observability` — see `docs/architecture.md` §5) with an enforced dependency direction. The frontend is a separate Next.js app talking to the backend over REST + WebSocket. Both live in one repository (`apps/web`, `apps/api`) alongside a `packages/shared` for cross-cutting types, i.e. a single-repo, two-app layout rather than a microservices or multi-repo split.

## Alternatives considered

- **Microservices per capability** (chat service, agent service, memory service, integration service): rejected for V1. There is one user and low request volume; the operational cost (deployment, networking, observability across services) is pure overhead with no corresponding benefit yet, and it would slow down the agent core's rapid early iteration.
- **Serverless functions per tool/endpoint**: rejected. Adds cold-start latency and deployment complexity that doesn't suit a stateful agent loop with WebSocket streaming, and complicates local development.
- **Single unstructured script/app with no internal layering**: rejected. Even as a monolith, the project needs enforced boundaries (e.g., `agents`/`tools` must not reach into `api`) so it doesn't collapse into unmaintainable coupling as Phases 2–6 land.

## Consequences

- Faster iteration in V1: one process to run, one deployable, simpler local dev (matches Docker Compose plan in `docs/architecture.md` §11).
- Internal layering must be genuinely enforced (via code review / linting conventions), or the "modular" half of "modular monolith" erodes over time.
- If a specific component (e.g., a compute-heavy vision pipeline in Phase 10) later proves it needs independent scaling, it can be extracted then — this decision is revisited, not treated as permanent. A future ADR would supersede this one for that component rather than the whole system.
