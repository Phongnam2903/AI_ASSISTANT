# Domain Glossary — Voice

Status: Active · Cập nhật: 2026-09-21

| Thuật ngữ | Định nghĩa |
| --- | --- |
| **VAD (Voice Activity Detection)** | Xác định đoạn người dùng đang nói so với im lặng/tiếng nền, dùng để tách một lượt nói (turn) mà không cần người dùng tự bấm nút. |
| **STT (Speech-to-Text)** | Chuyển audio đã thu thành transcript. Chạy ở backend (Phase 2). |
| **TTS (Text-to-Speech)** | Chuyển phản hồi văn bản thành audio phát qua loa. Chạy ở backend (Phase 2). |
| **Audio Capture Adapter** | Thành phần desktop thu âm thanh thô từ microphone — có thể là WebView2 (`getUserMedia`) hoặc native adapter, tùy kết quả spike G5 của Phase 2. |
| **Fixed Response (Phản hồi cố định)** | Phản hồi hardcode/scripted dùng ở Phase 2 để kiểm tra pipeline speech mà chưa gọi LLM — cố ý cô lập rủi ro "tai/miệng" khỏi "não". |
| **Barge-in** | Người dùng ngắt lời trợ lý khi đang phát TTS — chưa hỗ trợ ở baseline V1, cần kiểm chứng echo cancellation riêng. |
