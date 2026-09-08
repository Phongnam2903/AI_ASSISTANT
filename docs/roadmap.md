# Roadmap Voice-First

Cập nhật: 2026-09-07. Phase 0: ✅ Completed — được chủ dự án phê duyệt ngày 2026-09-07; Phase 1: Planning / Awaiting Approval, chưa triển khai; Phase 2–12: Not Started. Mỗi phase cần bằng chứng kiểm tra và chủ dự án phê duyệt trước khi đánh hoàn thành.

## Version 1 — Từ presence đến trợ lý làm việc

| Phase | Phạm vi | Điều kiện kết thúc |
| --- | --- | --- |
| 0 — Foundation & Voice-First Architecture | Audit, requirements, architecture, flow, security, ADRs, development guide, skeleton, environment template, Docker design, kế hoạch Phase 1 | Artifact tồn tại; links/status/scope nhất quán; báo cáo giới hạn môi trường; chủ dự án duyệt |
| 1 — Desktop Assistant Shell | Tauri/React/TS, cửa sổ nhỏ, single instance, tray, shortcut, greeting chữ, state model và demo development | Build/typecheck đạt; nghiệm thu window lifecycle, shortcut conflict, greeting, keyboard; owner duyệt |
| 2 — Speech Pipeline | Audio spike, microphone, VAD, STT, phản hồi cố định, TTS, FastAPI/WebSocket có auth, cancellation | Pipeline thật trên Windows, tiếng Việt; denial/device loss/silence/limits/cancel; raw audio không ghi đĩa mặc định |
| 3 — Voice AI Conversation | LLM abstraction, adapter đầu tiên, streaming, context RAM, text fallback, multi-turn, spike đóng gói backend | Ít nhất 3 lượt có ngữ cảnh; lỗi mạng/quota; bỏ output cũ; đo độ trễ; kết luận sidecar được ghi |
| 4 — Agent + Tool Calling | LangGraph, state, registry, BaseTool contract, executor, giới hạn loop; policy và audit tối thiểu | Tool giả lập/đọc trong scope hoạt động; sai schema/scope bị từ chối; tác vụ ghi vẫn bị chặn |
| 5 — Permission & Security Layer | Policy đầy đủ, preview/approval UI, expiry, action binding, audit, idempotency | Kiểm tra deny, thay args, replay, expiry, cancel, prompt injection và tác vụ kết quả unknown |
| 6 — Personal Memory | Redis session TTL, PostgreSQL durable data, pgvector, retrieval và write policy | Lưu có quyền, xem/xóa, xóa embedding/cache, cách ly scope, migrations/backup/restore được kiểm tra |
| 7 — Personal Integrations | Google OAuth, Calendar, Gmail, Drive, GitHub theo adapter | Scope tối thiểu, refresh/revoke, lỗi quota; tác vụ ghi/gửi qua approval |
| 8 — Coding Assistant | Repository scanner, Git status/diff/log, code search, project summary/review; thử desktop tools giới hạn | Canonical root/junction/secret guards; kết quả có nguồn; mở project/app theo allowlist và approval |

## Mở rộng sau baseline Version 1

| Phase | Phạm vi | Điều kiện kết thúc |
| --- | --- | --- |
| 9 — Wake Word | Đánh thức bằng tên như Jarvis, tùy chọn chờ cục bộ | Bật/tắt rõ ràng, chỉ báo, false activation/CPU được đo; không cloud upload trước kích hoạt |
| 10 — Automation | Scheduler, recurring/conditional tasks, reminders, notifications, daily briefing | Múi giờ, missed run, tránh trùng, pause/cancel; policy vẫn có hiệu lực |
| 11 — Vision | Screenshot có phạm vi, vision model, hiểu màn hình | Preview/consent, kiểm tra nội dung nhạy cảm, không capture liên tục ngầm |
| 12 — Multi-Agent | Supervisor, Coding/Research/Personal Agent | Routing, budget, cancellation, quyền kế thừa giới hạn, không nhân đôi hành động |

## Phụ thuộc và giới hạn

Phase 1 chạy độc lập, chưa cần Python backend, API key, database hoặc Docker. Phase 2–3 hội thoại bằng context RAM; Phase 6 mới thêm persistence. Giao tiếp cơ bản với LLM ở Phase 3 không đòi hỏi LangGraph.

Security được triển khai dần: native permissions ở Phase 1, auth/audio privacy ở Phase 2, tool policy trước execution ở Phase 4. Phase 5 mở rộng quyền, không là mốc bắt đầu bảo vệ hệ thống.

Phase 1 có greeting chữ và trạng thái voice mô phỏng có nhãn. Phase 2 bổ sung greeting bằng giọng nói và speech thật. Phase 3 mới gọi LLM. Wake word luôn thuộc Phase 9; click/shortcut đủ cho giai đoạn đầu.

Trước khi triển khai mỗi phase, xác định dependency versions/provider cần dùng, kế hoạch kiểm tra và thay đổi phạm vi. Không đặt ngày hoàn thành chưa có cơ sở. Kế hoạch gần nhất: [Phase 1](phase-1-implementation-plan.md).

- [x] Phase 0 approved by project owner.
- Phase 0 approval date: **2026-09-07**.
- [ ] Phase 1 implementation plan approved by project owner.

Phase 1 chỉ chạy prerequisite gate và Tauri minimal spike sau khi kế hoạch được duyệt riêng; chỉ code shell khi toàn bộ gate đạt. Hiện STOP để chủ dự án review kế hoạch.
