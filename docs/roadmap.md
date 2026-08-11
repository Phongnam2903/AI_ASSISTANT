# Roadmap

Status: Living document.
Last updated: 2026-08-11

Version 1 scope: Phases 0–6. Version 2 scope: Phases 7–11. Phases 0–6 are detailed below; 7–11 are sketched at a level sufficient to keep V1 decisions from boxing them out, and will be broken down properly when V1 is complete.

---

## Phase 0 — Foundation & Architecture

**Goal:** Establish a strong technical foundation (docs, structure, conventions) before any product code is written.

**Features:** N/A (no product features — documentation and scaffolding only).

**Dependencies:** None.

**Deliverables:**
- Repository & environment audit
- `docs/architecture.md`, `docs/requirements.md`, `docs/agent-flow.md`, `docs/security.md`, `docs/roadmap.md`, `docs/development-guide.md`
- `docs/adr/0001-0003`
- Base folder structure (`apps/`, `packages/`, `infrastructure/`, `scripts/`, `docs/`)
- `.env.example`, `.gitignore`, conceptual `docker-compose.yml`
- Root `README.md` as progress tracker

**Exit criteria:** All Phase 0 deliverables exist, README accurately reflects status, no Phase 1+ product code has been written, project owner has reviewed and approved.

---

## Phase 1 — Text AI Chat

**Goal:** A working end-to-end text conversation with an LLM, with no agent/tool reasoning yet — prove the gateway, streaming, and UI plumbing.

**Features:**
- Send/receive text messages
- Streamed responses (WebSocket)
- Conversation persisted and resumable
- Basic error states in UI

**Dependencies:** Phase 0 folder structure, `LLMProvider` abstraction, Postgres (for conversation storage), FastAPI app skeleton, Next.js app skeleton.

**Deliverables:**
- `apps/api`: chat endpoint(s), `LLMProvider` interface + one concrete provider implementation, conversation/message models
- `apps/web`: chat UI, streaming client, conversation list
- Unit + integration tests for the chat path
- Updated docs where implementation diverges from Phase 0 design

**Exit criteria:** A user can hold a persisted, streamed text conversation with the assistant through the web UI end-to-end locally; tests pass; FR-CHAT-001..004 satisfied.

---

## Phase 2 — Agent + Tool Calling

**Goal:** Replace the direct LLM call with a LangGraph reasoning loop capable of calling tools.

**Features:**
- LangGraph agent graph implementing the flow in `docs/agent-flow.md`
- Tool registry + `BaseTool` contract implemented
- At least one real read-only tool (e.g., a simple utility tool) to validate the contract end-to-end
- Multi-step tool use within one turn

**Dependencies:** Phase 1 chat pipeline, `docs/architecture.md` §9 tool contract, `docs/agent-flow.md`.

**Deliverables:** `apps/api/app/agents/`, `apps/api/app/tools/` implementations; agent-run observability IDs wired in; tool unit tests.

**Exit criteria:** Agent can decide to call a registered tool, execute it, observe the result, and produce a final response, with full agent-run traceability; FR-AGENT-001..003, FR-TOOL-001..002 satisfied.

---

## Phase 3 — Permission & Security Layer

**Goal:** No tool with real-world effect executes without going through an enforced permission gate.

**Features:**
- Four permission levels enforced in code (`READ`/`SAFE_WRITE`/`CONFIRM`/`DANGEROUS`)
- Approval UI/workflow for `CONFIRM`/`DANGEROUS`
- Audit log of every tool invocation and its permission outcome

**Dependencies:** Phase 2 tool registry and `BaseTool.permission_level`.

**Deliverables:** Permission-check middleware in the agent core, approval request/response API + UI, audit log table + viewer, security tests covering deny/approve paths.

**Exit criteria:** A `CONFIRM`/`DANGEROUS` tool call cannot execute without explicit approval in any test path; audit log captures every decision; FR-PERM-001..003 satisfied.

---

## Phase 4 — Memory

**Goal:** The assistant remembers across turns and sessions.

**Features:**
- Short-term memory (Redis)
- Long-term memory (Postgres)
- Semantic memory (pgvector) with retrieval
- Memory view/delete for the user

**Dependencies:** Phase 1 conversation storage, Postgres + pgvector + Redis running (Phase 0 docker-compose).

**Deliverables:** Memory read/write interfaces per `docs/architecture.md` §8, retrieval integrated into the agent's context-loading step, memory management UI.

**Exit criteria:** A fact mentioned in one session is retrievable and influences a later session's response; user can view/delete memory; FR-MEM-001..004 satisfied.

---

## Phase 5 — Coding Assistant

**Goal:** The assistant can help with this very codebase (and other designated local repos) under the permission model.

**Features:**
- Read-only repo tools: status, diff, log, code search
- Project summarization
- Review workflow
- Any write action gated through Phase 3 permissions

**Dependencies:** Phases 2–3 (tool contract + permission enforcement).

**Deliverables:** `apps/api/app/tools/` git/code tools, scoped-directory enforcement, tests.

**Exit criteria:** Assistant can answer questions about a designated repo's current state using only permitted tools; no ambient filesystem access beyond the configured scope; FR-CODE-001..003 satisfied.

---

## Phase 6 — Personal Integrations

**Goal:** Connect the assistant to real personal accounts under explicit, revocable authorization.

**Features:**
- Google OAuth (Calendar, Gmail, Drive)
- GitHub connection
- Read access first; write actions (send email, create event) go through `CONFIRM`
- Revocation flow

**Dependencies:** Phase 3 permission layer, Phase 2 tool contract.

**Deliverables:** `apps/api/app/integrations/` clients, OAuth flow + token storage, calendar/email/GitHub tools, integration tests (mocked external APIs).

**Exit criteria:** User can connect/revoke Google and GitHub; assistant can read calendar/email and draft (not auto-send) email; all write-capable actions are `CONFIRM`-gated; FR-INT-001..005 satisfied.

---

## Phase 7 — Automation Engine *(V2)*

**Goal:** Let the assistant act on a schedule or condition, not just in response to a chat message.

**Features:** Scheduler, recurring tasks, conditional tasks, notifications.

**Dependencies:** Phases 2–4 (agent, permissions, memory) must be stable — automation multiplies the blast radius of anything not already safe.

**Deliverables/exit criteria:** To be detailed at the start of Phase 7, informed by V1 usage.

---

## Phase 8 — Voice *(V2)*

**Goal:** Voice in/out as an alternative interface to the same agent core.

**Features:** Speech-to-text, text-to-speech, voice session handling, wake-word research.

**Dependencies:** Phase 1 chat pipeline (voice is a new client surface over the same API), Phase 3 permissions (voice commands still need gating).

**Deliverables/exit criteria:** TBD at Phase 8 kickoff.

---

## Phase 9 — Desktop Agent *(V2)*

**Goal:** Local desktop capabilities (launch apps, run approved local commands) via a local bridge process.

**Features:** Desktop companion app, local tool bridge, application launcher, secure command execution.

**Dependencies:** Phase 3 permission layer is mandatory before any local command execution ships.

**Deliverables/exit criteria:** TBD at Phase 9 kickoff.

---

## Phase 10 — Vision *(V2)*

**Goal:** The assistant can see and reason about screen content on request.

**Features:** Screenshot capture, vision-model integration, screen understanding.

**Dependencies:** Phase 3 permissions (screen capture is sensitive), Phase 9 desktop bridge likely needed for capture.

**Deliverables/exit criteria:** TBD at Phase 10 kickoff.

---

## Phase 11 — Multi-Agent *(V2)*

**Goal:** Specialize reasoning across a supervisor + sub-agents rather than one monolithic agent graph.

**Features:** Supervisor agent, Coding Agent, Research Agent, Personal Agent.

**Dependencies:** Phases 2–6 stable; multi-agent is a refactor of the agent core, not a bolt-on.

**Deliverables/exit criteria:** TBD at Phase 11 kickoff.
