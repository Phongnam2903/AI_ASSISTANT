---
key: NFR-JARVIS-SEC-001
type: non-functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: satisfied
revision: 1
---

# NFR-JARVIS-SEC-001 — Minimal native permissions

Desktop UI chỉ được cấp Tauri capabilities tối thiểu cần cho chức năng đang triển khai — không wildcard filesystem/shell, không quyền chưa dùng đến. Component React không được gọi Tauri API trực tiếp, phải qua Native Adapter.

**Satisfied** — Phase 1. Bằng chứng: `apps/desktop/src-tauri/capabilities/default.json`, bug thiếu quyền `global-shortcut` phát hiện/sửa 2026-09-21 (chứng minh có kiểm tra thật, không phải suy luận từ code).
