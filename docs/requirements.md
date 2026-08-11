# Requirements

Status: Living document — updated as scope is refined per phase.
Last updated: 2026-08-11

Scope note: these are development-stage requirements for a single-owner personal assistant, not enterprise SLAs. Numbers (latency, uptime) are targets to design toward, not contractual guarantees.

## 1. Functional Requirements

### Chat (Phase 1)

- **FR-CHAT-001** — The system shall allow the user to send text messages to the assistant via the web UI.
- **FR-CHAT-002** — The system shall stream the assistant's response back to the user as it is generated, rather than waiting for the full completion.
- **FR-CHAT-003** — The system shall persist conversation sessions so a user can leave and resume a conversation with prior messages visible.
- **FR-CHAT-004** — The system shall display a clear error state in the UI when the LLM call fails, without losing the user's in-progress message.

### Agent & Tools (Phase 2)

- **FR-AGENT-001** — The system shall run user requests through an agent reasoning loop capable of deciding whether a tool call is needed.
- **FR-AGENT-002** — The system shall support multi-step tool use within a single user turn (tool result feeds back into further reasoning).
- **FR-AGENT-003** — The system shall expose a tool registry so new tools can be added without modifying the agent core.
- **FR-TOOL-001** — Every tool shall declare a name, description, input schema, and permission level, and shall validate its input against that schema before executing.
- **FR-TOOL-002** — Tool execution results shall be returned to the agent as structured data, tagged as untrusted content rather than as instructions.

### Permissions (Phase 3)

- **FR-PERM-001** — The system shall classify every tool under one of four permission levels: `READ`, `SAFE_WRITE`, `CONFIRM`, `DANGEROUS`.
- **FR-PERM-002** — The system shall block execution of any `CONFIRM` or `DANGEROUS` tool call until the user explicitly approves that specific action.
- **FR-PERM-003** — The system shall record an audit log entry for every tool invocation, including whether it was auto-allowed, user-approved, or denied.

### Memory (Phase 4)

- **FR-MEM-001** — The system shall retain short-term conversational context for the duration of an active session.
- **FR-MEM-002** — The system shall persist long-term conversation history so it survives service restarts.
- **FR-MEM-003** — The system shall support semantic retrieval of relevant past context using vector similarity search.
- **FR-MEM-004** — The system shall allow the user to view and delete stored memory.

### Coding Assistant (Phase 5)

- **FR-CODE-001** — The system shall allow the assistant to inspect a local repository's status, diff, and log via read-only tools.
- **FR-CODE-002** — The system shall allow the assistant to search code within a designated project directory.
- **FR-CODE-003** — Any tool that modifies files or repository state shall be gated by the permission layer per FR-PERM-002.

### Personal Integrations (Phase 6)

- **FR-INT-001** — The system shall allow the user to connect a Google account via OAuth for Calendar and Gmail access.
- **FR-INT-002** — The system shall allow the assistant to read calendar events on the user's behalf once authorized.
- **FR-INT-003** — The system shall allow the assistant to draft (not auto-send) emails on the user's behalf once authorized.
- **FR-INT-004** — The system shall allow the user to connect a GitHub account via a personal access token or OAuth app for repository read access.
- **FR-INT-005** — The system shall allow the user to revoke any connected integration at any time.

## 2. Non-Functional Requirements

### Security

- **NFR-SEC-001** — Secrets (API keys, OAuth tokens) shall never be committed to version control; only `.env.example` placeholders are tracked.
- **NFR-SEC-002** — All content originating from tools, external accounts, or the web (email bodies, file contents, page content) shall be treated as untrusted data and never executed as agent instructions without explicit design review.
- **NFR-SEC-003** — All `CONFIRM`/`DANGEROUS` actions shall require a human-in-the-loop approval step; there shall be no fully autonomous execution path for these levels in V1.

### Performance

- **NFR-PERF-001** — For a simple chat message with no tool calls, the first streamed token should typically arrive within ~2 seconds under normal local-dev conditions.
- **NFR-PERF-002** — The web UI should remain responsive (no blocking the main thread) while a response is streaming.

### Observability

- **NFR-OBS-001** — Every agent run shall be traceable via correlated `request_id` / `conversation_id` / `agent_run_id` / `tool_run_id` identifiers, per `docs/architecture.md` §12.
- **NFR-OBS-002** — Logs shall never contain raw secret values or full OAuth tokens.

### Reliability

- **NFR-REL-001** — A single failed tool call shall not crash the agent run; it shall be surfaced as an observable error the agent (and user) can see.
- **NFR-REL-002** — The system shall be developable and runnable fully locally (via Docker Compose) without depending on a hosted deployment.

### Maintainability

- **NFR-MAINT-001** — The backend shall not introduce a new external infrastructure dependency (message queue, search engine, orchestration platform) without an ADR justifying it over the existing stack.
- **NFR-MAINT-002** — Core business logic (agent orchestration, permission checks, tool contracts) shall be unit-testable without a live LLM connection or live external integration.

## 3. Future Requirements (V2, not designed in detail yet)

- **FR-AUTO-001** — The system shall support scheduling recurring or conditional automated tasks.
- **FR-VOICE-001** — The system shall support speech-to-text input and text-to-speech output for conversations.
- **FR-DESKTOP-001** — The system shall support a local desktop bridge for launching applications and executing approved local commands.
- **FR-VISION-001** — The system shall support capturing and interpreting screen content on request.
- **FR-MULTI-001** — The system shall support routing a request to specialized sub-agents (coding, research, personal) under a supervisor agent.

These are intentionally underspecified — they will be broken into concrete FR/NFR items when their phase begins, informed by what V1 usage actually reveals.
