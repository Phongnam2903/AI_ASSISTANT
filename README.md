# Personal AI Assistant

Personal AI Assistant is a modular AI Agent platform designed to become a practical personal JARVIS-style assistant.

---

# Project Status

Current Phase:

> Phase 0 — Foundation & Architecture

Overall Status:

🟡 In Progress

Last Updated:

2026-08-11

---

# Progress Tracker

## Phase 0 — Foundation & Architecture

- [x] Repository audit completed
- [x] Environment audit completed
- [x] Architecture defined
- [x] Architecture diagram created
- [x] Requirements documented
- [x] Agent flow documented
- [x] Security model documented
- [x] Development guide created
- [x] Roadmap created
- [x] Base folder structure created
- [x] Environment template created
- [x] Docker architecture defined
- [x] Phase 0 verification completed
- [ ] Phase 0 approved by project owner

Status:

🟡 In Progress — technically complete, awaiting project owner review

---

## Phase 1 — Text AI Chat

- [ ] Backend chat API
- [ ] LLM provider abstraction
- [ ] Chat UI
- [ ] Streaming responses
- [ ] Conversation sessions
- [ ] Error handling
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation
- [ ] Phase 1 approved

Status:

⚪ Not Started

---

## Phase 2 — Agent + Tool Calling

- [ ] LangGraph agent
- [ ] Agent state
- [ ] Tool registry
- [ ] BaseTool contract
- [ ] Tool execution
- [ ] Agent loop
- [ ] Error handling
- [ ] Tool tests
- [ ] Phase 2 approved

Status:

⚪ Not Started

---

## Phase 3 — Permission & Security Layer

- [ ] Permission levels
- [ ] Tool policy
- [ ] Approval workflow
- [ ] Audit log
- [ ] Security tests
- [ ] Phase 3 approved

Status:

⚪ Not Started

---

## Phase 4 — Memory

- [ ] Short-term memory
- [ ] Redis integration
- [ ] Long-term memory
- [ ] PostgreSQL integration
- [ ] Semantic memory
- [ ] pgvector
- [ ] Memory retrieval
- [ ] Memory write policy
- [ ] Phase 4 approved

Status:

⚪ Not Started

---

## Phase 5 — Coding Assistant

- [ ] Repository scanner
- [ ] Git status tool
- [ ] Git diff tool
- [ ] Git log tool
- [ ] Code search
- [ ] Project summarization
- [ ] Review workflow
- [ ] Permission enforcement
- [ ] Phase 5 approved

Status:

⚪ Not Started

---

## Phase 6 — Personal Integrations

- [ ] Google OAuth
- [ ] Google Calendar
- [ ] Gmail
- [ ] Google Drive
- [ ] GitHub
- [ ] Permission flow
- [ ] Integration tests
- [ ] Phase 6 approved

Status:

⚪ Not Started

---

# Version 2

## Phase 7 — Automation

- [ ] Scheduler
- [ ] Recurring tasks
- [ ] Conditional tasks
- [ ] Notifications

## Phase 8 — Voice

- [ ] Speech-to-text
- [ ] Text-to-speech
- [ ] Voice session
- [ ] Wake word research

## Phase 9 — Desktop Agent

- [ ] Desktop application
- [ ] Local tool bridge
- [ ] Application launcher
- [ ] Secure command execution

## Phase 10 — Vision

- [ ] Screenshot capture
- [ ] Vision model
- [ ] Screen understanding

## Phase 11 — Multi-Agent

- [ ] Supervisor
- [ ] Coding Agent
- [ ] Research Agent
- [ ] Personal Agent

---

# Architecture

See:

- `docs/architecture.md`
- `docs/agent-flow.md`
- `docs/security.md`

---

# Requirements

See:

- `docs/requirements.md`

---

# Development

See:

- `docs/development-guide.md`

---

# Roadmap

See:

- `docs/roadmap.md`

---

# Architecture Decision Records

See:

- `docs/adr/0001-project-architecture.md` — Modular monolith
- `docs/adr/0002-agent-framework.md` — LangGraph + provider-agnostic LLM layer
- `docs/adr/0003-memory-strategy.md` — Three-tier memory (Redis / Postgres / pgvector)

All currently `Status: Proposed` — not yet approved by the project owner.

---

# Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-08-11 | Initial architecture (modular monolith, LangGraph, three-tier memory) | Project initialization — see ADRs 0001–0003 |
| 2026-08-11 | Initialize an independent Git repository inside `AI_Assistant/` rather than relying on the ambient repository | The nearest pre-existing `.git` was found rooted at `D:\` itself (an unrelated old FPT University group project, remote `gitlab.com/phongnnhe176274/se1831_g2.git`, worktree = entire D: drive). Using it would have risked staging/committing unrelated personal files on the drive. Project owner chose to init a fresh, isolated repo scoped to this project folder instead. |

---

# Current Work

Current objective:

> Complete Phase 0 and receive approval before Phase 1.

Current blocker:

> None.

Next action:

> Await project owner approval of Phase 0.

---

# Phase Completion Rule

A checkbox may only be marked:

```text
[x]
```

when the task is actually completed and verified.

Never mark unfinished work as completed.

A phase may only be marked complete after:

1. implementation/documentation is complete
2. validation succeeds
3. status is reported
4. project owner approves the phase
