# Policies — Rules

Status: Active · Cập nhật: 2026-09-21

Quy tắc engineering áp dụng toàn hệ thống. Nguồn chính là **Execution Guide §Y — Non-Negotiable Rules** (15 quy tắc, ví dụ: không tự sửa spec đã duyệt, không bypass permission check, không tự self-approve, không mark `not_run` thành `passed`...). Xem [EXECUTION_GUIDE.md](../../../EXECUTION_GUIDE.md#y-non-negotiable-rules-các-quy-tắc-không-được-thương-lượng).

Quy tắc bổ sung riêng của repo này (không thuộc Execution Guide chung) nằm ở `CLAUDE.md` tại gốc repo — ví dụ: quy trình phê duyệt theo phase, quy tắc bảo vệ dữ liệu người dùng, giới hạn thao tác Git.

Chưa có `VAL-JARVIS-*` (deterministic validation rule) nào được mã hóa thành script kiểm tra tự động — sẽ thêm khi có nhu cầu thật (ví dụ: script kiểm tra không có `approved = True` hardcode, kiểm tra raw audio không bị ghi đĩa).
