# Domain Glossary — Assistant / Desktop

Status: Active · Cập nhật: 2026-09-21

| Thuật ngữ | Định nghĩa |
| --- | --- |
| **Compact Assistant Overlay** | Cửa sổ nhỏ, kích thước cố định (400×560 logical px trong implementation hiện tại), là giao diện chính của trợ lý — không phải một application window thông thường. |
| **Full Workspace** | Cửa sổ mở rộng, resizable đầy đủ, tùy chọn (chưa triển khai) — không phải baseline bắt buộc. |
| **Native Adapter** | Lớp duy nhất trong code desktop được phép gọi Tauri API/plugin trực tiếp (show/hide/exit/always-on-top/shortcut...). Component React không được gọi thẳng. |
| **Settings Repository** | Interface trừu tượng cho việc lưu/đọc preference cục bộ không nhạy cảm — không phải Personal Memory. |
| **Development State Preview** | Simulator các Assistant State (IDLE/LISTENING/...) chỉ hiển thị khi bật developer/debug mode; không xuất hiện trong production build; không kích hoạt speech/AI thật. |
| **Greeting** | Lời chào xác định theo giờ máy (deterministic, local); Phase 1 hiển thị chữ, Phase 2 phát thêm TTS. Không dùng LLM/Calendar/Email. |
