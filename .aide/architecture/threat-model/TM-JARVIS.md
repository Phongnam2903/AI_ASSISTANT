# TM-JARVIS — Threat Model

Status: Draft, kế thừa từ `docs/security.md` (Phase 0) · Cập nhật: 2026-09-21

## Ranh giới tin cậy

UI, local backend, cloud, dữ liệu tool và hệ điều hành có ranh giới riêng. Chỉ request hợp lệ qua policy mới được executor chạy. Mô hình AI, transcript, email, repository và kết quả tool **không phải nguồn cấp quyền**.

## Rủi ro đã xác định (kế thừa từ Phase 0)

| Rủi ro | Biện pháp | Phase đầu tiên |
| --- | --- | --- |
| UI gọi native command quá rộng | Tauri capabilities tối thiểu; không wildcard filesystem/shell | 1 (Satisfied) |
| Mic hoạt động ngoài phiên | Quyền thiết bị, chỉ báo, giải phóng khi hide/end/exit | 2 (Proposed) |
| Trang web khác gọi backend local | Loopback, token phiên, allowlist Origin, xác thực WebSocket | 2 (Proposed) |
| Audio làm hết RAM | Frame/total-size/deadline/queue/session limits | 2 (Proposed) |
| Prompt injection từ nội dung ngoài | Xem là dữ liệu; policy độc lập prompt trước execution | 4 (Planned) |
| Tool đọc vượt root/secret | Canonical path, kiểm tra symlink/junction, chặn credential | 4 (Planned) |
| Thay args hoặc replay approval | Duyệt một lần, ràng buộc action/args/scope/session/expiry | 5 (Planned) |
| Lộ OAuth/key, lưu dữ liệu ngầm | Backend/OS credential store, scope tối thiểu | Theo tính năng |

Chi tiết đầy đủ (cấp quyền tool, approval flow, audit): `docs/security.md`. Tài liệu này sẽ được mở rộng thành TM-JARVIS đầy đủ khi Phase 4 (Tool Permission) bắt đầu thiết kế chi tiết.
