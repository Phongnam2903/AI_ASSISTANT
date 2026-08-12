# Development Guide

Status: Baseline conventions for Phase 1 onward.
Last updated: 2026-08-11

## 1. Branching

- `main` is the stable branch. It should always be in a working state.
- Work happens on short-lived feature branches: `<type>/<short-description>`, e.g. `feat/chat-streaming`, `fix/websocket-reconnect`, `docs/phase-1-plan`.
- Rebase or merge from `main` before opening a PR to keep history readable; avoid long-lived divergent branches.
- No direct force-push to `main`.

## 2. Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

Types used in this project:

| Type | Use for |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `test` | Adding or fixing tests |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore` | Tooling, dependencies, config |

Scopes match the architecture's components, e.g.:

```text
feat(agent): add tool-call loop to LangGraph graph
feat(memory): add semantic retrieval via pgvector
feat(tool): add git status read-only tool
feat(api): add chat streaming endpoint
feat(web): add streaming chat UI
docs: update architecture with permission layer detail
test(tool): cover permission-denied path
```

Commit messages describe *why*, not just *what*, when the reason isn't obvious from the diff.

## 3. Code style

**Backend (Python):**
- Follow PEP 8; format with `black`/`ruff format` (formatter choice finalized when Phase 1 dependencies are added — not installed in Phase 0).
- Type hints required on public functions; Pydantic models for all API request/response shapes.
- No bare `except:`; catch specific exceptions.

**Frontend (TypeScript):**
- Strict TypeScript (`strict: true`); no implicit `any`.
- Functional components, hooks over class components.
- Co-locate a feature's components/hooks/state under `src/features/<feature>/` rather than spreading it across global folders.

**General:**
- No dead code, no commented-out code left in commits.
- No premature abstraction — see `docs/architecture.md` principles (YAGNI/KISS).

## 4. Environment setup

Documented fully once Phase 1 introduces real dependencies. Baseline (Phase 0 audit):

| Tool | Verified version on this machine |
|---|---|
| Python | 3.11.9 |
| Node.js | 20.20.2 |
| npm | 10.8.2 |
| Docker | 29.0.1 |
| Docker Compose | v2.40.3 |
| Git | 2.45.0 |

Copy `.env.example` to `.env` and fill in real values locally; `.env` is git-ignored.

## 5. Dependency management

- Backend: `pyproject.toml` (introduced in Phase 1) — avoid pinning to exact patch versions unless a specific bug requires it.
- Frontend: `package.json` with `npm` (matches the Node/npm already available on this machine; revisit `pnpm` only if workspace needs justify it — no `pnpm`/`yarn` currently installed).
- New runtime dependencies (especially new infrastructure like a queue or search engine) require an ADR per NFR-MAINT-001 in `docs/requirements.md`.

## 6. Testing expectations

- Backend: `pytest`. Business logic (agent orchestration, permission checks, tool contracts) must be testable without a live LLM or live external API — mock the `LLMProvider` and integration clients.
- Frontend: `Vitest` + `React Testing Library` for components/hooks; `Playwright` is a possible later addition for e2e, not required in V1.
- Every new tool (Phase 2+) ships with at least: valid-input execution test, invalid-input schema-rejection test, and a permission-level assertion.
- Test suite is not fully implemented in Phase 0 — this section documents the target strategy per the master project brief.

## 7. Documentation updates

- When an implementation decision diverges from `docs/architecture.md`, `docs/agent-flow.md`, or an ADR, update the doc in the same PR — docs describing a design that no longer matches the code are worse than no docs.
- New ADRs are added for any decision that reverses or meaningfully narrows a previous ADR, rather than editing history.
- Root `README.md` progress tracker is updated whenever a checklist item is actually completed (see README's own update policy).

## 8. Definition of done

A task/phase item is done when:

1. Implementation (or documentation, for Phase 0-style work) is complete.
2. Relevant tests pass (where tests apply).
3. Docs affected by the change are updated.
4. The change has been reported/reviewed.
5. For phase-level completion specifically: the project owner has explicitly approved the phase — no phase is self-approved.
