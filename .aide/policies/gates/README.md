# Policies — Gates

Status: Active · Cập nhật: 2026-09-21

5 gate chuẩn theo **Execution Guide §L — Gate Model**: Scope Gate, Architecture Gate, Tool Safety Gate, Component Merge Gate, Release Gate. Xem [EXECUTION_GUIDE.md §L](../../../EXECUTION_GUIDE.md#l-gate-model-mô-hình-cổng-kiểm-soát).

Ngoài ra, mỗi Change Set có thể có **prerequisite gate riêng** (G1, G2, G3... theo thứ tự cụ thể của change đó) — không nhầm với 5 gate chuẩn ở trên. Ví dụ: `CHG-JARVIS-2026-001` (Phase 2) có G1–G5 riêng, xem `lifecycle/change-sets/CHG-JARVIS-2026-001/change-set.yaml`.
