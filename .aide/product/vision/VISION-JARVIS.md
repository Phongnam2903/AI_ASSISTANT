# VISION-JARVIS

Status: Active · Revision: 1 · Cập nhật: 2026-09-21

System: `SYS-JARVIS`

## Tầm nhìn

Một trợ lý AI cá nhân kiểu JARVIS, theo hướng **Voice-First Desktop Assistant**: người dùng gọi trợ lý bằng phím tắt/tray, nói yêu cầu, trợ lý nghe — hiểu — (khi cần) hành động qua tool có kiểm soát quyền — và trả lời bằng giọng nói.

Thứ tự ưu tiên tương tác: **Voice → Text/Transcript (hỗ trợ) → Vision (tương lai)**.

## Vì sao

Người dùng muốn một trợ lý không chỉ trả lời câu hỏi (như chatbot) mà còn có thể **thực sự làm việc thay** — đọc lịch, gửi email, thao tác file, hỗ trợ code — nhưng phải làm điều đó một cách **an toàn, có thể kiểm soát và có thể kiểm toán (auditable)**, không phải một agent tự ý hành động không giới hạn.

## Nguyên tắc nền tảng

1. **Voice-first, không phải chat-first.** Text/transcript là phụ trợ, không phải giao diện chính.
2. **Modular monolith, không phải microservices.** Một backend Python + một desktop client Tauri; ranh giới UI/backend là ranh giới tiến trình duy nhất trong V1.
3. **Capability ≠ Authority.** Trợ lý có thể *biết cách* làm một việc, nhưng phải *được phép* mới được làm — đặc biệt với hành động có tác dụng phụ (gửi, xóa, sửa, thực thi).
4. **Phân kỳ theo rủi ro, không phải theo tính năng dễ demo.** Desktop shell trước, speech thật sau, AI thật sau nữa, agent/tool sau cùng khi đã có permission layer — để cô lập lỗi và không hứa hẹn quá sớm.
5. **Bằng chứng thật, không suy luận.** Một phase/feature chỉ được coi là xong khi có evidence thật (build chạy, test chạy, người dùng xác nhận) — không phải vì tài liệu đã viết xong.

## Ranh giới hiện tại (chưa cam kết)

Chưa cam kết chạy offline hoàn toàn, chưa cam kết hỗ trợ đa nền tảng (macOS/Linux), chưa chọn provider LLM/STT/TTS cố định. Windows x64 là nền tảng đầu tiên.

## Tham chiếu

Vision này thay thế phần "Trải nghiệm hướng tới" cũ trong README.md gốc — nội dung không đổi về ý nghĩa, chỉ chuyển sang định dạng chuẩn của `.aide/`.
