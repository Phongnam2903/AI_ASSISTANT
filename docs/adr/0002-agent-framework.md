# 0002 — Agent Framework: LangGraph + Provider-Agnostic LLM Layer

Status: Proposed

## Context

The assistant needs an agent reasoning loop (context load → plan → optionally call tools → observe → respond, per `docs/agent-flow.md`) starting in Phase 2. The project brief specifies LangGraph as the intended framework and requires the system not be tightly coupled to a single LLM vendor (OpenAI, Anthropic, and Gemini are all named as candidates).

## Decision

Use **LangGraph** to implement the agent's reasoning loop as an explicit graph (nodes for context loading, planning, permission check, tool execution, observation, response generation — see `docs/architecture.md` §7). Introduce an `LLMProvider` abstraction in `apps/api/app/core/` that the agent graph depends on, with concrete implementations per vendor added as needed (starting with whichever provider Phase 1 chat uses). The agent graph and tools depend on `LLMProvider`, never on a specific vendor SDK directly.

## Alternatives considered

- **Hand-rolled agent loop (plain Python control flow, no graph framework)**: rejected. It would work for Phase 2's simple case but re-implements state management, branching, and resumability that LangGraph already provides, and the project explicitly names LangGraph as the target framework.
- **Direct coupling to one vendor's SDK/agent framework** (e.g., building directly against OpenAI's Assistants API primitives): rejected. It would satisfy Phase 2 fastest but directly violates the provider-independence goal — switching or A/B-testing models later would require rewriting the agent core instead of swapping an `LLMProvider` implementation.
- **A full multi-agent framework from day one** (e.g., wiring up a supervisor/sub-agent topology now): rejected as premature — Phase 11 (multi-agent) is explicitly V2 scope; building it now would be complexity ahead of need.

## Consequences

- The `LLMProvider` interface becomes a load-bearing contract early (Phase 1) — its shape should be designed to support streaming (needed for FR-CHAT-002) and tool-calling (needed for Phase 2), even though Phase 1 doesn't use tool-calling yet, to avoid a breaking interface change between Phase 1 and Phase 2.
- LangGraph becomes a hard dependency of the agent core starting Phase 2; if it proves unsuitable (e.g., for the Phase 11 multi-agent topology), that would warrant a new ADR rather than silently working around it.
- Provider-specific quirks (function-calling formats, streaming formats) are normalized inside each `LLMProvider` implementation, not leaked into `agents/` or `tools/`.
