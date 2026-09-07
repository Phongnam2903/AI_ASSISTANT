# Mô hình bảo mật và phê duyệt

Status: Proposed · 2026-09-07. Yêu cầu triển khai theo phase; skeleton chưa thực thi các biện pháp này.

## Ranh giới tin cậy

UI, local backend, cloud, dữ liệu tool và hệ điều hành có ranh giới riêng. Chỉ request hợp lệ qua policy mới được executor chạy. Mô hình AI, transcript, email, repository và kết quả tool không phải nguồn cấp quyền.

| Rủi ro cụ thể | Biện pháp | Phase đầu tiên |
| --- | --- | --- |
| UI gọi native command quá rộng | Tauri capabilities tối thiểu; không wildcard filesystem/shell | 1 |
| Mic hoạt động ngoài phiên | Quyền thiết bị, chỉ báo, giải phóng khi hide/end/exit | 2 |
| Trang web khác gọi backend local | Loopback, token phiên, allowlist Origin, xác thực WebSocket; không chỉ CORS | 2 |
| Audio làm hết RAM | Frame/total-size/deadline/queue/session limits | 2 |
| Prompt injection từ nội dung ngoài | Xem là dữ liệu; policy độc lập prompt trước execution | 4 |
| Tool đọc vượt root/secret | Canonical path, kiểm tra symlink/junction, chặn credential | 4 |
| Thay args hoặc replay approval | Duyệt một lần, ràng buộc action/args/scope/session/expiry | 5 |
| Lộ OAuth/key, lưu dữ liệu ngầm | Backend/OS credential store, scope tối thiểu, chính sách lưu/xóa | Theo tính năng |

Tauri capabilities giới hạn IPC theo cửa sổ/webview; cấu hình thực tế cần kiểm tra Phase 1. [Tài liệu Tauri](https://v2.tauri.app/security/capabilities/).

## Cấp quyền công cụ

| Cấp | Ví dụ | Chính sách |
| --- | --- | --- |
| 0 — Pure/local | Tính toán trên dữ liệu sẵn có | Không mở rộng I/O; không cần duyệt mỗi lần |
| 1 — Read scoped | Repo đã chọn, lịch đã kết nối | Cần quyền/scope; audit metadata |
| 2 — Write/external effect | Sửa file, tạo lịch, gửi email, mở app | Preview tác động và xác nhận cụ thể |
| 3 — Destructive/privileged | Xóa hàng loạt, admin, shell tùy ý | Chặn trong baseline V1, cần thiết kế riêng |

Phase 4 có deny by default, chỉ tool cấp 0–1 trong scope đã cấp. Phase 5 bật cấp 2 khi approval được kiểm chứng. Roadmap không cho phép bỏ bảo vệ cơ bản ở Phase 1–4.

## Approval

Hiển thị tool, đích, đối số chuẩn hóa, tác động và dữ liệu gửi ra ngoài. Im lặng/hết hạn không phải chấp thuận. Bản ghi gồm action ID, tool/version, hash canonical args, scope/resource identity, user/session, expiry và consumed state.

Executor kiểm tra lại ngay trước thực thi; args/scope/tài nguyên thay đổi thì xin lại. Ghi file cần kiểm tra resolved path và điều kiện file chưa đổi giữa duyệt và chạy. Action ID/idempotency khi dịch vụ hỗ trợ; kết quả unknown cần đối soát trước retry.

V1 đề xuất xác nhận tác vụ có tác dụng phụ bằng nút trên desktop; voice đọc tóm tắt. Từ “đồng ý” nhận dạng từ môi trường chưa đủ cấp quyền. Voice approval cần thiết kế chống phát lại và kiểm tra ngữ cảnh riêng.

Cancel/disconnect vô hiệu approval chưa dùng. Không báo đã hoàn tác nếu hành động đã ghi dữ liệu và chưa có bằng chứng rollback.

## Audio, transcript và memory

- Phase 1 không yêu cầu mic; trạng thái demo có nhãn mô phỏng. Phase 2 có quyền, chỉ báo, mute/end và xử lý từ chối/rút thiết bị.
- Raw audio chỉ ở RAM theo lượt, dọn khi end/cancel/error. Không ghi file hoặc bật recording chẩn đoán ngầm.
- Transcript/context mặc định trong RAM theo phiên. Phase 6 thêm lịch sử tùy chọn với xem/xóa/thời hạn lưu; Redis session có TTL, không mặc định persistence.
- Ghi memory theo chính sách và ý định người dùng; không tự lưu suy luận nhạy cảm, credentials hoặc embedding của secret.
- Xóa memory bao gồm bản gốc, embedding và cache. Khi có backup phải công bố thời hạn dữ liệu còn trong backup.
- Cấu hình cloud STT/LLM/TTS phải cho biết dữ liệu đi tới dịch vụ nào. Chính sách lưu của provider phải xác minh lúc chọn adapter; không mặc định mọi provider không lưu dữ liệu.

## Secrets, local API và integrations

`.env.example` là mẫu trống; `.env`, token, credentials, audio và dữ liệu cá nhân bị ignore. Key chỉ ở backend, không trong `VITE_*`, bundle, UI state, transcript hoặc log. Development dùng `.env`; bản đóng gói đề xuất OS credential store.

Native host/bootstrap cấp token ngẫu nhiên ngắn hạn qua kênh riêng, không URL/command line/log. Backend xác thực trước audio; kiểm tra Origin riêng cho dev và packaged app ở Phase 2. Chỉ bind loopback; truy cập từ xa cần thiết kế auth/TLS riêng.

Giới hạn CSP, remote navigation và native commands. Local auth không chống được malware cùng quyền đã kiểm soát máy. OAuth dùng scope tối thiểu, PKCE khi phù hợp, refresh/revoke rõ ràng. Kết nối tài khoản không tự cấp quyền gửi email/sửa dữ liệu; tác vụ vẫn qua policy.

## Audit và validation

Audit tối thiểu từ Phase 4 ghi action/tool, scope đã redacted, policy decision, approval reference, thời gian và kết quả. Log vận hành dùng mã lỗi/latency/correlation ID; không chứa raw audio, token, prompt hoặc email mặc định. Audit file cục bộ không được coi là chống sửa tuyệt đối.

Kiểm tra theo phase: native command bị từ chối; local request thiếu auth; microphone sau hide/exit; frame quá lớn; tool vượt root qua junction; approval đổi args/expiry/replay; revoke OAuth; xóa memory. Chỉ đánh hoàn thành khi có implementation và kết quả thực tế.
