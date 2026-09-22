---
key: CMP-JARVIS-AGENT
type: l2-component
group: normative
scope: system
system: SYS-JARVIS
status: planned
revision: 1
relations:
  implements: [CAP-JARVIS-002]
  covers: []
---

# CMP-JARVIS-AGENT

Status: Planned — thuộc Phase 4. Chưa thiết kế chi tiết, chưa có FR nào cover.

Sẽ chứa: LangGraph state, intent/planning, tool selection, giới hạn bước (đề xuất tối đa 5 tool call/turn theo `docs/agent-flow.md`). Xem `docs/adr/0002-agent-framework.md` cho quyết định sơ bộ từ Phase 0.
