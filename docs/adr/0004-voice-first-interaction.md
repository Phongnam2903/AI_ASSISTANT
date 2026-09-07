# ADR 0004 — Voice-First Desktop Assistant

Status: Proposed

Date: 2026-09-07

## Bối cảnh

Chủ dự án đã xác định giọng nói là tương tác chính, text/transcript là phụ trợ, vision về sau. Roadmap chat trước và voice ở Version 2 trong README cũ không còn phù hợp. Định hướng sản phẩm này đã được yêu cầu; chi tiết triển khai dưới đây vẫn chờ duyệt.

## Quyết định đề xuất

Desktop shell ở Phase 1, speech pipeline thật ở Phase 2, voice LLM multi-turn ở Phase 3, agent/tool ở Phase 4. Click/shortcut/tray kích hoạt trước; wake word ở Phase 9. Greeting theo giờ chạy local; Phase 1 hiển thị chữ, Phase 2 phát TTS khi bật âm thanh.

Cửa sổ assistant nhỏ ưu tiên presence/status/điều khiển, transcript thu gọn và text fallback. Phase 1 có state harness gắn nhãn trong development; release không giả vờ nghe hoặc gọi AI.

V1 nói theo lượt, dừng capture khi TTS và mở lại trong cùng session; Stop hủy playback. Hide kết thúc phiên. Wake-word listening là chế độ riêng cần bật ở Phase 9, không suy ra từ việc app chạy nền.

## Phương án và hệ quả

Chat-first đẩy rủi ro audio/native ra sau và không đáp ứng ưu tiên sản phẩm. Wake word/full-duplex ngay đầu làm tăng rủi ro audio/echo/privacy. Phân phase cho phép kiểm chứng presence, thiết bị, rồi AI lần lượt nhưng phải nói rõ demo và tính năng thật.

Audio spike đầu Phase 2 quyết định WebView capture hay native adapter. Đo latency, silence/device loss/cancel và hội thoại tiếng Việt thật trước khi nghiệm thu Phase 3. Voice approval cho tác vụ ghi chưa thuộc baseline; dùng nút xác nhận rõ ràng.

Chi tiết: [requirements](../requirements.md), [roadmap](../roadmap.md).
