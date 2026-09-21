# Roadmap Voice-First

Cập nhật: 2026-09-21. Phase 0: ✅ Completed — được chủ dự án phê duyệt ngày 2026-09-07; Phase 1: ✅ Completed — Desktop Assistant Shell, chủ dự án phê duyệt nghiệm thu ngày 2026-09-21 (xem [kết quả P1-00→P1-10](phase-1-implementation-plan.md#8-tiêu-chí-kiểm-thử-và-nghiệm-thu)); Phase 2 — Speech Pipeline: kế hoạch implementation đã soạn — [phase-2-implementation-plan.md](phase-2-implementation-plan.md) — **Proposed, chờ chủ dự án phê duyệt**, chưa chạy prerequisite gate hay code; Phase 3–12: Not Started. Mỗi phase cần bằng chứng kiểm tra và chủ dự án phê duyệt trước khi đánh hoàn thành.

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

Trước khi triển khai mỗi phase, xác định dependency versions/provider cần dùng, kế hoạch kiểm tra và thay đổi phạm vi. Không đặt ngày hoàn thành chưa có cơ sở. Kế hoạch gần nhất: [Phase 2](phase-2-implementation-plan.md) (Proposed, chờ duyệt); kế hoạch đã hoàn thành: [Phase 1](phase-1-implementation-plan.md).

- [x] Phase 0 approved by project owner.
- Phase 0 approval date: **2026-09-07**.
- [x] Phase 1 implementation plan approved by project owner.

Phase 1 plan đã được duyệt ngày 2026-09-08 cho G1–G4 và minimal spike. Sau gate phải STOP, kể cả toàn bộ PASS; Desktop Shell implementation cần phê duyệt riêng.

- Phase 1 approval date: **2026-09-08**.

Gate evaluation ngày 2026-09-08: G1 PASS, G2 FAIL, G3 FAIL, G4 BLOCKED. Xem [báo cáo prerequisite](phase-1-prerequisite-verification.md). STOP; chưa triển khai Desktop Shell.

Remediation ngày 2026-09-09: **G1 PASS, G2 BLOCKED, G3 PASS, G4 BLOCKED / NOT RUN**. Node 24.20.0/npm 11.19.0 và compatibility metadata đã xác minh; C++ compiler/linker và Windows SDK còn thiếu. Xem [bằng chứng mới](phase-1-prerequisite-verification.md#prerequisite-remediation--2026-09-09). Chỉ tạo/chạy spike khi G1–G3 đều PASS; không copy/move spike vào app chính. Desktop Shell implementation chưa bắt đầu.

Sau remediation native tiếp theo ngày 2026-09-09: **G1–G4 PASS**. Minimal spike đã build release, mở cửa sổ native với nhãn và đóng sạch (exit 0). Xem [kết quả G2/G4](phase-1-prerequisite-verification.md#native-toolchain-re-verification-and-g4-spike--2026-09-09). Chờ implementation approval riêng; chưa bắt đầu `apps/desktop/`.

- [x] Desktop Shell implementation approved by project owner.
- Desktop Shell implementation approval date: **2026-09-16**.
- [x] Phase 1 completed / accepted by project owner.
- Phase 1 completion date: **2026-09-21**.

Desktop Shell (`apps/desktop/`) đã build/chạy native thành công trên Windows x64; toàn bộ kiểm tra P1-00 → P1-10 PASS, bao gồm xác nhận thủ công (tray icon, shortcut, DPI) ngày 2026-09-21. Chi tiết: [phase-1-implementation-plan.md §8](phase-1-implementation-plan.md#8-tiêu-chí-kiểm-thử-và-nghiệm-thu), [apps/desktop/README.md](../apps/desktop/README.md). **Phase 1 — Desktop Assistant Shell: Completed.**

- [x] Phase 2 implementation plan drafted — **2026-09-21**.
- [ ] Phase 2 implementation plan approved by project owner.

**Current Phase: Phase 2 — Speech Pipeline (Proposed).** Kế hoạch đã soạn tại [phase-2-implementation-plan.md](phase-2-implementation-plan.md); chờ chủ dự án phê duyệt trước khi chạy prerequisite gate hoặc code, theo đúng quy trình đã áp dụng cho Phase 1.
