# ADR 0002 — LangGraph và LLM abstraction

Status: Proposed

Date: 2026-09-07

## Bối cảnh

Hội thoại voice cần session/cancel sớm; tác vụ nhiều bước với công cụ đến sau. Người dùng muốn hỗ trợ OpenAI, Anthropic và Gemini mà không gắn toàn bộ sản phẩm với một SDK.

## Quyết định đề xuất

Conversation Manager sở hữu session/turn/cancellation. Phase 3 dùng LLM adapter đầu tiên qua interface trung lập; Phase 4 thêm LangGraph để điều phối tool loop và state. LangGraph cung cấp nền tảng orchestration cho agent có trạng thái. [Tài liệu LangGraph](https://docs.langchain.com/oss/python/langgraph/overview).

Provider interface dự kiến có input messages/context, streaming output, usage nếu có, capability flags, timeout/cancel và lỗi chuẩn hóa. Không giả định mọi provider hỗ trợ cùng tool/streaming semantics. Chưa chọn model hoặc viết adapter; thêm provider sau bằng contract tests khi thực sự triển khai.

## Phương án và hệ quả

Tự viết toàn bộ agent loop linh hoạt nhưng tăng chi phí quản lý state/error. SDK đơn provider gọn hơn nhưng khó thay. LangGraph không sở hữu quyền thực thi: mọi tool đi qua policy/executor độc lập và có giới hạn số bước, deadline.

Phase 3 kiểm tra stream/cancel/quota/context bằng fake provider và provider được chọn; Phase 4 kiểm tra tool schema/scope/error/loop budget. Chưa có persistent checkpoint; chính sách lưu dài hạn chờ Phase 6.

Chi tiết: [agent flow](../agent-flow.md), [security](../security.md).
