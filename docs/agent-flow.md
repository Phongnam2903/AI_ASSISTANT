# Agent Flow

Status: Design document for Phase 2 (agent + tool calling). Not implemented in Phase 0.
Last updated: 2026-08-11

This document describes the intended lifecycle of a single user turn once the LangGraph agent (Phase 2) exists. Phase 1 (plain chat) does not use this flow — it is a direct LLM call with no tool loop.

## 1. Happy-path flow

```mermaid
flowchart TD
    A[User sends message] --> B[Intent detection]
    B --> C[Context retrieval<br/>short-term + long-term + semantic memory]
    C --> D[Planning<br/>agent decides next step]
    D --> E{Tool needed?}
    E -- No --> F[Generate response]
    E -- Yes --> G[Tool selection]
    G --> H[Permission check]
    H -- Denied --> I[Explain denial, continue planning without tool]
    H -- Approved / auto-allowed --> J[Tool execution]
    J --> K[Observation<br/>tool result appended to context, tagged untrusted]
    K --> D
    I --> D
    F --> L[Memory update]
    L --> M[Response streamed to user]
```

The loop between `D` (Planning) and `K` (Observation) is what allows chained tool use, e.g. "look up tomorrow's events, then draft a summary email" — the agent replans after each observation rather than committing to a fixed sequence upfront.

## 2. Sequence view (single tool call)

```mermaid
sequenceDiagram
    actor User
    participant Web as Web UI
    participant API as FastAPI Gateway
    participant Agent as LangGraph Agent
    participant Mem as Memory
    participant Perm as Permission Layer
    participant Tool as Tool (e.g. Calendar)
    participant LLM as LLM Provider

    User->>Web: Send message
    Web->>API: POST/WS chat message
    API->>Agent: Start agent run (agent_run_id)
    Agent->>Mem: Load context
    Mem-->>Agent: Short/long-term + semantic context
    Agent->>LLM: Reason over context
    LLM-->>Agent: Decision - call tool X
    Agent->>Perm: Check permission for tool X
    Perm-->>Agent: Approved (or awaiting user confirmation)
    Agent->>Tool: Execute(input)
    Tool-->>Agent: ToolResult (untrusted data)
    Agent->>LLM: Continue reasoning with observation
    LLM-->>Agent: Final response
    Agent->>Mem: Write updated memory
    Agent-->>API: Stream response
    API-->>Web: Stream tokens (WebSocket)
    Web-->>User: Render response
```

## 3. Error flows

The agent core must degrade predictably. None of these should crash the agent run or leave the conversation in an inconsistent state.

```mermaid
flowchart TD
    Start((Agent run in progress)) --> LLMErr{LLM call fails?}
    LLMErr -- Yes --> LLMRetry[Retry with backoff, bounded attempts]
    LLMRetry -- still failing --> LLMFail[Surface error to user,<br/>preserve conversation state]

    Start --> ToolErr{Tool execution fails?}
    ToolErr -- Yes --> ToolObserve[Return structured error as observation,<br/>let agent decide how to proceed]

    Start --> Timeout{Tool or LLM call times out?}
    Timeout -- Yes --> TimeoutAbort[Abort that step,<br/>report timeout as observation/error]

    Start --> PermReject{Permission denied?}
    PermReject -- Yes --> PermExplain[Explain denial to user,<br/>do not execute, continue reasoning without it]

    Start --> BadInput{Tool input fails schema validation?}
    BadInput -- Yes --> BadInputReject[Reject before execution,<br/>return validation error as observation]

    Start --> MemDown{Memory store unavailable?}
    MemDown -- Yes --> MemDegrade[Degrade to in-request context only,<br/>warn that persistence is unavailable]
```

| Failure | Handling |
|---|---|
| LLM provider failure (timeout, 5xx, rate limit) | Bounded retry with backoff; on exhaustion, surface a clear error to the user without losing their message. |
| Tool execution failure (exception, non-zero exit, API error) | Captured as a structured error result, fed back to the agent as an observation — the agent decides whether to retry, try another approach, or tell the user it failed. Never silently swallowed. |
| Timeout (tool or LLM) | The specific step is aborted and reported as a timeout observation/error; the rest of the conversation state is preserved. |
| Permission rejection | Not an error — an expected control-flow branch. The agent explains what it wanted to do and why it can't, and continues without that tool. |
| Invalid tool input | Rejected by schema validation before `execute()` is ever called (fail closed, per `BaseTool.input_schema` in `docs/architecture.md` §9). |
| Memory unavailable | Agent run degrades to using only in-request context (no persisted memory), and the user/logs are informed persistence is temporarily unavailable, rather than the run failing outright. |

## 4. Notes for implementation (Phase 2)

- `agent_run_id` is generated once per user turn and threaded through every node in the graph and every tool call, per the observability plan in `docs/architecture.md` §12.
- Tool results are never concatenated into the prompt as if they were trusted system/user instructions — see `docs/security.md` for the prompt-injection rationale.
- This document will be revised once the LangGraph graph is actually implemented; treat it as the target design, not a guarantee of the final node names.
