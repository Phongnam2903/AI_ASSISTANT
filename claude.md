# Hướng dẫn làm việc với Personal AI Assistant

File này cung cấp ngữ cảnh và quy tắc làm việc cho Claude trong repository. Trao đổi với chủ dự án bằng tiếng Việt; giữ tên công nghệ, API và identifier bằng tiếng Anh khi phù hợp.

## Quy trình hiện hành: khung `.aide/` (từ 2026-09-21)

Từ 2026-09-21, chủ dự án chuyển toàn bộ quy trình lập kế hoạch/phê duyệt/thực thi sang khung mô tả trong **[EXECUTION_GUIDE.md](EXECUTION_GUIDE.md)** (root repo, bản dịch tiếng Việt). **Đọc file này trước khi làm bất kỳ việc gì liên quan Phase 2 trở đi.** Tóm tắt các điểm bắt buộc:

- Đơn vị quản lý là `.aide/lifecycle/change-sets/CHG-<SYS>-YYYY-NNN/`, phân rã thành Epic → Story → Task. Mỗi Task cần Context Package + Implementation Plan (`evidence/context/`, `evidence/plans/`) trước khi được phép sửa code — xem Definition of Ready (Execution Guide §H).
- FR/NFR sống trong `.aide/requirements/`; kiến trúc trong `.aide/architecture/` (L1 Capability, L2 Component, ADR, threat model); thuật ngữ chung trong `.aide/domain/`.
- Không tự phê duyệt Change Set, Scope Gate, Architecture Gate, Release Gate hay sensitive action — những việc này thuộc Human (chủ dự án), xem Execution Guide §K.
- Không bịa FR/kiến trúc/quyền hạn; khi spec thiếu hoặc mâu thuẫn, STOP và tạo Open Question (`open-questions/`) thay vì đoán — xem Execution Guide §T, §Y.
- `docs/` (architecture.md, requirements.md, security.md, agent-flow.md, roadmap.md, adr/, phase-1-implementation-plan.md...) **vẫn được giữ nguyên làm tài liệu kỹ thuật tham chiếu** — nội dung của chúng đã migrate/tham chiếu vào `.aide/`, không bị xóa hay mất giá trị. `docs/phase-2-implementation-plan.md` ở trạng thái *superseded*, thay bằng `CHG-JARVIS-2026-001`.
- Phase 0 và Phase 1 đã hoàn thành theo quy trình cũ (`docs/phase-N-implementation-plan.md`) trước khi khung `.aide/` được áp dụng — các mục dưới đây về Phase 1 vẫn đúng như lịch sử, không cần làm lại theo `.aide/`.

## Đọc tài liệu trước khi hành động

1. [EXECUTION_GUIDE.md](EXECUTION_GUIDE.md): quy trình hiện hành cho mọi việc từ Phase 2 trở đi (xem mục trên).
2. [.aide/lifecycle/change-sets/](/.aide/lifecycle/change-sets/): Change Set đang mở, trạng thái gate/approval thật.
3. [README](README.md): trạng thái tổng thể và phê duyệt đã ghi nhận.
4. [Phase 1 implementation plan](docs/phase-1-implementation-plan.md): lịch sử phạm vi/constraints/ranh giới phê duyệt của Phase 1 (đã Completed, quy trình cũ).
5. [Prerequisite verification report](docs/phase-1-prerequisite-verification.md): kết quả thực tế, version matrix, lệnh và bằng chứng của Phase 1.
6. Khi cần thiết, đọc [architecture](docs/architecture.md), [requirements](docs/requirements.md), [security](docs/security.md), [agent flow](docs/agent-flow.md) và [development guide](docs/development-guide.md) — nội dung kỹ thuật vẫn là nguồn tham chiếu chính, được trỏ tới từ các artifact `.aide/`.

Yêu cầu và phê duyệt mới nhất của chủ dự án trong hội thoại là căn cứ cập nhật phạm vi. Không xin duyệt lại công việc đã được duyệt rõ ràng. Nếu snapshot trong file này cũ, đối chiếu tài liệu và artifact hiện có; không suy ra phê duyệt từ việc một file hoặc checkbox kỹ thuật tồn tại.

## Dự án đang xây dựng gì

Personal AI Assistant là trợ lý cá nhân kiểu JARVIS theo hướng **Voice-First Desktop Assistant**.

- Tương tác chính: voice. Text phục vụ transcript, fallback, lịch sử và cấu hình. Vision thuộc giai đoạn sau.
- Version 1 định hướng modular monolith: Tauri + React + TypeScript ở desktop, Python + FastAPI ở backend; không tự tách thành microservices.
- LangGraph, nhiều LLM provider, memory và integrations được bổ sung theo [roadmap](docs/roadmap.md), không phải tính năng đã triển khai.

## Trạng thái khi tạo file

Cập nhật ngữ cảnh: **2026-09-09**. Kết quả gate gần nhất được ghi ngày **2026-09-08**; đây là snapshot lịch sử, không phải một lần kiểm tra mới.

| Hạng mục | Trạng thái đã ghi nhận |
| --- | --- |
| Phase 0 — Foundation & Voice-First Architecture | Completed; chủ dự án duyệt 2026-09-07 |
| Phase 1 implementation plan | Approved; chủ dự án duyệt 2026-09-08 |
| Current Phase | Phase 1 — Desktop Assistant Shell (Prerequisite Verification) |
| G1 — npm | PASS trong host context; sandbox từng gặp EPERM |
| G2 — Native prerequisites | FAIL; C++ Build Tools chưa đầy đủ, Windows SDK thiếu Include/Lib |
| G3 — Compatibility | FAIL; Node 20.20.2 không đạt yêu cầu LTS còn hỗ trợ theo báo cáo |
| G4 — Minimal native spike | BLOCKED; chưa scaffold, build hoặc chạy |
| Desktop Shell implementation approval | Chưa được duyệt |
| Phase 1 implementation started | Chưa bắt đầu; giữ checkbox trống |

Repository hiện có tài liệu, skeleton và bằng chứng kiểm tra. Chưa có ứng dụng, dependency manifests, lockfiles hoặc spike chạy được. Không trình bày phiên bản mới chỉ tra metadata là dependency đã cài hoặc baseline đã build thành công.

## Phê duyệt và điểm dừng

- Phê duyệt kế hoạch Phase 1 chỉ cho phép prerequisite gate G1–G4 và minimal spike đúng phạm vi. Nó không cho phép triển khai Desktop Shell.
- Đợt gate trước đã STOP vì FAIL/BLOCKED. Chỉ tiếp tục khắc phục hoặc kiểm tra lại theo yêu cầu/phạm vi được chủ dự án cho phép; việc đọc file này không phải lệnh tự chạy lại gate.
- Nếu gate còn FAIL/BLOCKED, báo rõ nguyên nhân và dừng trước implementation.
- Kể cả G1–G4 đều PASS, vẫn báo cáo và chờ phê duyệt Desktop Shell implementation riêng.
- Không tự đánh dấu `Phase 1 implementation started`, implementation approval hoặc phase completed.
- Chỉ đánh `[x]` cho artifact/hành vi thực sự hoàn thành và đã kiểm tra. Ghi ngày duyệt theo phê duyệt thực tế, không tự điền theo ngày hiện tại.
- Thực hiện chủ động các công việc đã được cho phép; chỉ dừng tại ranh giới phê duyệt áp dụng cho bước tiếp theo.

## Phạm vi Desktop Shell khi được duyệt triển khai

Phase 1 chỉ gồm Tauri desktop application, React/TypeScript UI, compact overlay, open/show/hide, system tray, global shortcut nếu phù hợp, greeting dạng chữ, visual states, basic desktop configuration và tests phù hợp với shell. Transcript area hoặc full workspace shell là tùy chọn giao diện.

Năm architectural constraints bắt buộc:

1. **Compact Assistant Overlay:** fixed-size hoặc constrained resize. Full Workspace mới resizable đầy đủ. Giữ compact như một assistant overlay.
2. **Development State Preview:** IDLE/LISTENING/THINKING/SPEAKING/ERROR simulator chỉ cho development/test. Production UX mặc định không có simulator; chỉ hiển thị khi bật explicit developer/debug mode, có nhãn mô phỏng rõ ràng. Các state không kích hoạt speech hoặc AI thật.
3. **Desktop Settings Abstraction:** UI dùng interface kiểu `SettingsRepository`, không truy cập trực tiếp persistence implementation. Chỉ lưu local non-sensitive preferences; đây không phải Personal Memory.
4. **Desktop Native Adapter:** React components không gọi Tauri native APIs, `invoke` hoặc plugin APIs rải rác. Dùng một adapter layer cho show/hide, exit, always-on-top, shortcut registration, native lifecycle và capability khác của Phase 1.
5. **Greeting:** deterministic local greeting từ giờ/config. Không dùng LLM, Calendar, Email, Memory hoặc backend. Contextual/AI-generated greeting thuộc phase sau.

Không triển khai trong Phase 1:

- Microphone capture, VAD, Speech-to-Text, Text-to-Speech hoặc Wake Word.
- LLM API, LangGraph, Agent, Tool Calling hoặc Personal Memory.
- PostgreSQL, Redis, pgvector, Gmail, Calendar hoặc GitHub integration.
- Automation, Vision, backend/FastAPI/WebSocket hoặc provider SDK.

Không biến transcript shell thành chat implementation. Không biến việc mở chính assistant thành application launcher. Dùng Git để quản lý source không đồng nghĩa xây GitHub integration trong sản phẩm.

## Prerequisite gate và minimal spike

G1 xác minh npm; G2 xác minh C++ Build Tools/Windows SDK/Rust MSVC/WebView2; G3 đối chiếu Node và các dependency cụ thể; G4 chứng minh native build/run trên Windows.

Spike chỉ nằm tại `spikes/tauri-minimal/`: minimal React/Tauri application, một native window và một nhãn test. Cần frontend build, Rust/native build, executable thực sự chạy và đóng sạch.

Không đưa overlay thật, tray, greeting, shortcut, assistant states, microphone, STT/TTS, LLM, Agent hoặc Memory vào spike. Không tạo abstraction của sản phẩm chỉ để làm spike.

- Phân biệt lỗi sandbox với công cụ thực sự thiếu; dùng cơ chế cấp quyền hợp lệ của môi trường khi cần. Không bỏ qua giới hạn truy cập hoặc tự sửa cấu hình toàn hệ thống để làm kết quả đẹp hơn.
- Không dùng `latest` mơ hồ. Tra yêu cầu của phiên bản cụ thể; pin direct dependencies, Node/toolchain và tạo npm/Cargo lockfiles khi thực sự scaffold được phép. Kiểm tra installation/build từ locks.
- Version probe, metadata và browser preview không thay thế native build/run. Không có executable thì không báo G4 PASS.
- Cập nhật [verification report](docs/phase-1-prerequisite-verification.md) với Status PASS/FAIL/BLOCKED, Commands, Versions, Exit codes, Evidence, Observed result, Issues và Resolution if applicable.
- Version matrix phải có Node, npm, React, TypeScript, Vite, Tauri CLI, Tauri Rust crate, Tauri plugins, Rust, Windows SDK và WebView2. Dùng N/A hoặc NOT RUN khi chưa có bằng chứng; không bịa phiên bản/exit code.
- Kết thúc đợt prerequisite verification bằng báo cáo và câu: `PHASE 1 PREREQUISITE GATE COMPLETE — WAITING FOR IMPLEMENTATION APPROVAL`. Câu này không có nghĩa mọi gate đều PASS.

## Cấu trúc và công cụ làm việc

| Vị trí | Trách nhiệm |
| --- | --- |
| [apps/desktop](apps/desktop/README.md) | Desktop shell; hiện chỉ có skeleton |
| [apps/backend](apps/backend/README.md) | Backend cho các phase sau |
| [packages/contracts](packages/contracts/README.md) | Protocol/schema dùng chung khi triển khai transport |
| [infrastructure](infrastructure/README.md) | Thiết kế hạ tầng; chưa có Docker runtime được kiểm chứng |
| [scripts](scripts/README.md) | Chỗ đặt automation phát triển khi có nhu cầu thật |
| [docs/adr](docs/adr/README.md) | Quyết định kiến trúc; đọc status của từng ADR |

- Workspace: `D:/PROJECT/AI_Assistant`; shell: PowerShell. Đọc/ghi văn bản UTF-8 để giữ tiếng Việt.
- Dùng `rg`/`rg --files` để tìm kiếm; bỏ qua `.git`, `.cache`, `node_modules`, `target` và `dist` khi không liên quan.
- Kiểm tra Git status trước sửa; giữ nguyên các thay đổi đang có của người dùng. Không reset, xóa hoặc ghi đè công việc ngoài phạm vi.
- Không thao tác file ngoài workspace hoặc xóa/move đệ quy khi chưa xác minh đường dẫn tuyệt đối và phạm vi được phép.
- Nếu gặp Git ownership mismatch ở repo này, dùng override từng lệnh `git -c safe.directory=D:/PROJECT/AI_Assistant -c core.excludesFile= ...`; không tự sửa global Git config.
- Chưa có lệnh chạy/build app trong repository hiện tại. Khi có manifests thật, đọc scripts và lockfiles trước khi chạy; không đoán lệnh rồi báo là đã kiểm chứng.

## Dữ liệu, kiểm tra và báo cáo

- Không commit `.env`, credentials, token, raw audio hoặc dữ liệu cá nhân. Không đưa provider keys vào `VITE_*`, frontend bundle, transcript hay log.
- `.env.example` là mẫu đề xuất cho backend tương lai; không giả định đã có loader hoặc yêu cầu điền key để chạy shell.
- Khi triển khai được duyệt, chạy checks phù hợp với thay đổi. Logic greeting/state/settings có thể kiểm tra tự động; tray/focus/show/hide/Exit cần kiểm tra trên Windows thật.
- Thay đổi tài liệu chỉ cần kiểm tra nội dung, liên kết, encoding và diff; không tạo bộ test ứng dụng khi chưa có code.
- Báo ngắn gọn: đã thay đổi gì, kiểm tra gì, kết quả và giới hạn còn lại. Phân biệt code đã viết, build đã đạt, runtime đã quan sát và phê duyệt của chủ dự án.
- Cập nhật README/plan/report khi phạm vi, trạng thái hoặc bằng chứng thay đổi; giữ các kết quả cũ có ngày để không biến lịch sử thành tuyên bố hiện tại.
