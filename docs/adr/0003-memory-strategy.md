# 0003 — Memory Strategy: Three-Tier (Redis / Postgres / pgvector)

Status: Proposed

## Context

The assistant needs to remember within a single agent run (fast, ephemeral), across sessions (durable), and needs similarity-based retrieval over past context for relevant recall (semantic). The project brief specifies Redis, PostgreSQL, and pgvector as the target stack and asks for memory tiers to map explicitly onto them.

## Decision

Adopt a three-tier memory model (detailed in `docs/architecture.md` §8):

1. **Short-term memory → Redis.** Session/run-scoped working context, TTL-based, optimized for low-latency read/write during an active agent run.
2. **Long-term memory → PostgreSQL.** The durable source of truth for conversations and structured facts. Never expires implicitly; user-deletable (FR-MEM-004).
3. **Semantic memory → PostgreSQL + pgvector.** A similarity-searchable index derived from long-term memory (and later, documents), used for retrieval-augmented context. Treated as a rebuildable derived index, not a second source of truth.

## Alternatives considered

- **A dedicated vector database** (e.g., Pinecone, Weaviate, Qdrant): rejected for V1. It would add another piece of infrastructure and another set of credentials/ops burden for a single-user system when `pgvector` on the Postgres instance already being run covers the need — matches the "no premature complexity" principle in `docs/architecture.md`.
- **Redis-only memory (no Postgres tier)**: rejected. Redis is well-suited to ephemeral working context but is the wrong tool for durable, queryable, user-deletable history — losing memory on a Redis restart/eviction is not acceptable for long-term memory (NFR-REL-002-adjacent concern).
- **Single-tier memory (just store everything in Postgres, no Redis)**: rejected for the short-term tier specifically — an active agent run's working state benefits from Redis's low-latency semantics and natural TTL expiry rather than needing explicit cleanup logic in Postgres.

## Consequences

- Three storage systems to run in local dev (already planned via Docker Compose in `docs/architecture.md` §11), not one — acceptable since Postgres and Redis are both already required for other reasons (conversation storage, caching).
- Because semantic memory is defined as derived from long-term memory, a future re-embedding (e.g., switching embedding models) is a rebuild, not a migration — this constrains Phase 4 to design semantic memory as regenerable rather than hand-authored.
- Memory *write policy* (what qualifies to be promoted from short-term to long-term, and what gets embedded into semantic memory) is intentionally left to Phase 4 design work and is not decided by this ADR.
