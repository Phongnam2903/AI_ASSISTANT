---
key: NFR-JARVIS-PRIV-001
type: non-functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
---

# NFR-JARVIS-PRIV-001 — Audio privacy

Raw audio chỉ tồn tại trong RAM theo lượt (turn), dọn khi end/cancel/error. Không ghi audio ra đĩa hoặc bật recording chẩn đoán ngầm dưới bất kỳ hình thức nào, kể cả log/debug. Idle/hidden không capture; mic giải phóng ngay khi hide/end/exit.

**Proposed** — áp dụng từ Phase 2 (`FR-JARVIS-006`).
