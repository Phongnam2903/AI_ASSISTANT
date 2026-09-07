# Yêu cầu sản phẩm và tiêu chí nghiệm thu

Status: Proposed · 2026-09-07. Đây là yêu cầu, chưa phải tính năng đã triển khai.

## Phạm vi

Voice là phương thức chính; text hỗ trợ transcript, lịch sử, cấu hình và nhập khi microphone không dùng được. Vision bổ sung về sau. Giao diện chính là cửa sổ trợ lý nhỏ với trạng thái và điều khiển phiên, transcript mở khi cần.

Đề xuất: Windows x64, tiếng Việt, greeting theo giờ/múi giờ hệ điều hành, tên có thể cấu hình. Chưa cam kết chạy offline hoàn toàn hoặc trên mọi hệ điều hành.

## Yêu cầu có thể kiểm tra

| ID | Yêu cầu | Bằng chứng nghiệm thu | Phase |
| --- | --- | --- | --- |
| UX-01 | Mở app hiện một cửa sổ assistant | Chạy lần hai đưa về cửa sổ hiện có | 1 |
| UX-02 | Tray và shortcut gọi cửa sổ | Show/Hide/Exit hoạt động; báo shortcut conflict và vẫn mở bằng tray | 1 |
| UX-03 | Greeting theo giờ | Kiểm tra mốc 05:00, 12:00, 18:00, 22:00; focus lại không chào lặp | 1; TTS ở 2 |
| UX-04 | Idle / Listening / Thinking / Speaking và lỗi rõ ràng | Phase 1 demo có nhãn; từ Phase 2 phản ánh tài nguyên thật | 1–3 |
| VO-01 | Capture có chỉ báo và quyền | Chưa cấp quyền thì không thu; xử lý từ chối, rút mic, mute, end | 2 |
| VO-02 | VAD tách lượt | Nói, dừng, im lặng và tiếng nền không gây gửi vô hạn | 2 |
| VO-03 | STT và TTS thật | Tiếng Việt tạo transcript; phản hồi cố định phát trên thiết bị thật | 2 |
| VO-04 | Stop / Cancel | Dừng playback, hủy turn, bỏ kết quả đến muộn | 2–3 |
| CO-01 | Hội thoại nhiều lượt | Ít nhất 3 lượt tham chiếu ngữ cảnh trong cùng phiên, không gọi lại | 3 |
| CO-02 | Text fallback | Mic không khả dụng vẫn gửi text qua cùng session/cancellation | 3 |
| CO-03 | Phục hồi lỗi provider | Timeout, mạng và quota có thông báo; không replay tác vụ ghi | 3 |
| AG-01 | Agent gọi tool theo contract | Schema, timeout, step limit và cancellation được kiểm tra | 4 |
| SE-01 | Native permissions tối thiểu | Chỉ quyền window/tray/shortcut cần thiết, không shell/ổ đĩa rộng | 1 |
| SE-02 | Local API có xác thực | Session sai, origin sai, frame quá lớn bị từ chối | 2 |
| SE-03 | Tool không vượt scope | Mọi invocation qua policy; ghi bị chặn trước Phase 5 | 4 |
| SE-04 | Approval cho hành động cụ thể | Kiểm tra deny/expiry/replay/đổi args; có audit | 5 |
| ME-01 | Bộ nhớ có quyền lưu | Xem/xóa dữ liệu, scope truy hồi; xóa embedding liên quan | 6 |
| IN-01 | Dịch vụ cá nhân | Calendar/Gmail/Drive/GitHub theo scope; revoke; ghi cần duyệt | 7 |
| CD-01 | Hỗ trợ repository | Root được chọn, code search, Git status/diff/log và review có nguồn | 8 |
| WK-01 | Wake word tùy chọn | Chỉ báo chờ, bật/tắt, đo false activation; không gửi audio trước kích hoạt | 9 |
| AU-01 | Automation | Xem/tạm dừng/hủy lịch, múi giờ, tránh chạy trùng; giữ policy | 10 |
| VI-01 | Hiểu màn hình | Preview phạm vi capture trước chia sẻ; xử lý dữ liệu nhạy cảm | 11 |
| MA-01 | Agent chuyên biệt | Supervisor điều phối Coding/Personal/Research Agent trong ngân sách và quyền | 12 |

Desktop tools mở ứng dụng/thư mục/project được thử sau Phase 5, dự kiến trong Phase 8 với allowlist. Shell tùy ý không thuộc baseline.

## Tiêu chí phi chức năng

- Một session voice hoạt động và tối đa một turn xử lý tại một thời điểm ở V1. Cancel/đổi session/disconnect làm kết quả cũ mất hiệu lực.
- Idle/hidden không capture; không lưu raw audio mặc định; log metadata không chứa key/prompt/transcript/email mặc định.
- Shell vẫn dùng được khi backend/provider lỗi. Có text fallback khi speech lỗi, retry không nhân đôi tác vụ có tác dụng phụ.
- Thao tác chính dùng được bằng bàn phím, focus rõ; trạng thái có chữ, không chỉ màu; hỗ trợ giảm chuyển động.
- Mục tiêu chưa đo: focus cửa sổ đang chạy dưới 500 ms; Stop dừng playback dưới 300 ms. Phase 3 đặt mục tiêu p95 từ hết câu đến âm thanh đầu tiên dưới 4 giây trên cấu hình tham chiếu, đo ít nhất 30 lượt và báo phần cứng/mạng/provider/tỷ lệ lỗi. Nếu cần đổi mục tiêu, ghi rõ trước nghiệm thu.
- Queue audio hữu hạn; mặc định đề xuất đoạn nói tối đa 30 giây, phiên chờ im lặng 60 giây thì kết thúc. Kiểm chứng ở Phase 2.

## Mốc trải nghiệm

**Phase 1:** Open → Assistant appears → Greeting dạng chữ → Idle. Trạng thái voice mô phỏng riêng trong development harness có nhãn.

**Phase 2:** Activate → Microphone permission → Listen → VAD → STT → Fixed response → TTS. Greeting phát qua TTS khi bật âm thanh.

**Phase 3:** Thay fixed response bằng LLM, giữ context nhiều lượt và text fallback; đây là mốc voice AI thực tế đầu tiên.

Hồ sơ/skeleton Phase 0 được kiểm tra bằng artifact và tính nhất quán. Build desktop, microphone và provider thật thuộc validation phase triển khai, không suy ra từ tài liệu. Chủ dự án duyệt Phase 0 và [kế hoạch Phase 1](phase-1-implementation-plan.md) trước khi code.
