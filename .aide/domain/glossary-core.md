# Domain Glossary — Core

Status: Active · Cập nhật: 2026-09-21

Thuật ngữ dùng chung toàn hệ thống `SYS-JARVIS`. Mỗi module có thể mở rộng thêm glossary riêng (`domain/<module>/glossary.md`) nhưng không được định nghĩa lại khác nghĩa các từ ở đây.

| Thuật ngữ | Định nghĩa |
| --- | --- |
| **Session** | Một phiên tương tác giữa desktop và backend, bắt đầu bằng `session.start` (đã xác thực) và kết thúc bằng `session.end`, disconnect, hoặc timeout. |
| **Turn** | Một lượt nói/trả lời trong session: người dùng nói (hoặc gõ) → hệ thống xử lý → phản hồi. Có `turn_id` riêng, hủy được độc lập với session. |
| **Transcript** | Văn bản chuyển đổi từ giọng nói (STT) hoặc nhập tay; có `partial` (tạm) và `final` (cuối). Partial không kích hoạt xử lý tiếp theo. |
| **Intent** | Ý định của người dùng được suy ra từ transcript/text, dùng để quyết định phản hồi hoặc (từ Phase 4) chọn tool. |
| **Assistant State** | Trạng thái hiển thị của trợ lý: `IDLE`, `LISTENING`, `THINKING`, `SPEAKING`, `ERROR` (Phase 1–2), mở rộng `AWAITING_APPROVAL`, `EXECUTING` từ Phase 4–5. |
| **Conversation Manager** | Thành phần backend (từ Phase 2) giữ trạng thái session/turn chuẩn; là nguồn sự thật duy nhất cho Assistant State — UI không tự suy đoán. |
| **Output ID** | Định danh cho một phản hồi phát ra (TTS/greeting), độc lập với `turn_id` của người dùng — dùng để hủy/theo dõi playback. |
| **Capability** | JARVIS *có thể* làm gì về mặt kỹ thuật (ví dụ: có tool đọc email). |
| **Authority** | JARVIS *được phép* làm gì trong tình huống cụ thể (ví dụ: có quyền đọc email của phiên này không, có cần confirm không). Capability và Authority luôn được xét riêng — xem Execution Guide §W. |
| **Approval** | Sự đồng ý tường minh của người dùng cho một hành động cụ thể (tool + đối số + phạm vi + hạn dùng), bắt buộc cho hành động có tác dụng phụ (side effect) từ Phase 5. Im lặng/hết hạn không phải approval. |
| **Evidence** | Bằng chứng thật (log, kết quả test, screenshot, review, approval...) chứng minh một artifact/behavior đã được thực hiện đúng — không suy luận từ việc tài liệu đã viết. |
