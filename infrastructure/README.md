# infrastructure

Status: Placeholder for local/deployment infrastructure config.

- `docker/` — Dockerfiles for `apps/api` and `apps/web` (added when those apps have real dependencies to containerize, starting Phase 1).
- `postgres/` — init scripts / extension setup (e.g., enabling `pgvector`) for local Postgres, added when Phase 1/4 need it.

The root `docker-compose.yml` orchestrates these services for local development; see `/docs/architecture.md` §11.
