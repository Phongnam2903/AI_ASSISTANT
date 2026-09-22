# REG-TYPE-001 — Artifact Type Registry

Status: Active · Cập nhật: 2026-09-21

Đăng ký các artifact type (tiền tố ID) dùng trong `.aide/`. Mỗi ID mới phải dùng đúng tiền tố tương ứng và tăng số thứ tự tiếp theo trong phạm vi hệ thống `SYS-JARVIS`.

| Tiền tố | Ý nghĩa | Vị trí |
| --- | --- | --- |
| `SYS-` | System | `registry/` |
| `GOAL-` | Product goal | `product/prd/` |
| `CR-` | Change Request (yêu cầu gốc) | `evidence/requests/` |
| `CHG-` | Change Set | `lifecycle/change-sets/` |
| `FR-` | Functional Requirement | `requirements/fr/` |
| `AC-` | Acceptance Criteria (nằm trong file FR) | `requirements/fr/` |
| `NFR-` | Non-Functional Requirement | `requirements/nfr/` |
| `CAP-` | L1 Capability | `architecture/l1/` |
| `CMP-` | L2 Component | `architecture/l2/` |
| `ADR-` | Architecture Decision Record | `architecture/adr/` |
| `TM-` | Threat Model | `architecture/threat-model/` |
| `API-` | Tech spec — API/contract | `tech-specs/<module>/api/` |
| `TBL-` | Tech spec — data schema/table | `tech-specs/<module>/schema/` |
| `EPIC-` | Epic | `lifecycle/epics/` |
| `STORY-` | Story | `lifecycle/stories/` |
| `TASK-` | Task | `lifecycle/tasks/` |
| `BUG-` | Bug | `lifecycle/bugs/` |
| `REL-` | Release | `lifecycle/releases/` |
| `CTX-` | Context Package | `evidence/context/` |
| `PLAN-` | Implementation Plan | `evidence/plans/` |
| `DIARY-` | Agent Diary | `evidence/diaries/` |
| `RVW-` | Review | `evidence/reviews/` |
| `FND-` | Finding | `evidence/findings/` |
| `APR-` | Approval | `evidence/approvals/` |
| `OQ-` | Open Question | bất kỳ thư mục `open-questions/` liên quan |
| `OBS-` | Observability spec | `observability/` |
| `VAL-` | Policy/validation rule | `policies/rules/` |
| `REG-` | Registry | `registry/` |

Mọi ID đều có dạng `<PREFIX><SYSTEM?>-NNN`, ví dụ `FR-JARVIS-001`, `CHG-JARVIS-2026-001`. Không tái sử dụng số đã cấp, kể cả khi artifact bị hủy — artifact hủy chuyển `status: superseded` hoặc `status: withdrawn`, không xóa file.
