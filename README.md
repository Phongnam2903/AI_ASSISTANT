# Personal AI Assistant

Trợ lý AI cá nhân  JARVIS, được thiết kế như một **Voice-First Desktop Assistant**: người dùng mở hoặc gọi trợ lý, nói yêu cầu và nhận phản hồi bằng giọng nói.

Thứ tự ưu tiên tương tác: **Voice → Text / Transcript → Vision (tương lai)**. Văn bản phục vụ transcript, lịch sử, nhập liệu khi không dùng microphone và cấu hình trợ lý.

## Trạng thái thực tế

- **Current Phase:** Phase 1 — Desktop Assistant Shell (Baseline verified; chờ nghiệm thu chính thức).
- **Phase 0:** ✅ Completed — Foundation & Voice-First Architecture.
- **Ngày duyệt Phase 0:** 2026-09-07.
- **Phase 1 Status:** 🔵 Toàn bộ kiểm tra P1-00 → P1-10 đã PASS (bao gồm xác nhận thủ công của chủ dự án ngày 2026-09-21). Chờ chủ dự án phê duyệt nghiệm thu chính thức để đóng Phase 1.
- **Cập nhật:** 2026-09-21.
- Repository chứa tài liệu thiết kế, **Tauri minimal spike đã build/chạy native trên Windows** tại `spikes/tauri-minimal/`, và **Desktop Shell baseline tại `apps/desktop/` đã build/chạy native trên Windows** (compact overlay, tray Show/Hide/Exit, single instance, greeting, 5 visual states, cấu hình cơ bản, global shortcut với xử lý conflict). Xem kết quả kiểm tra thật: [apps/desktop/README.md](apps/desktop/README.md#kết-quả-kiểm-tra-thực-tế-2026-09-21).
- Technical foundation Phase 0 và kế hoạch Phase 1 đã được chủ dự án phê duyệt. Chủ dự án duyệt Desktop Shell implementation ngày 2026-09-16; các kiểm tra tương tác (tray icon click, shortcut trigger thành công, DPI 100%/150%) đã được chủ dự án tự xác nhận thủ công trên Windows thật ngày 2026-09-21 — cả 3 đều PASS. Một bug thật (thiếu quyền ACL cho global-shortcut) được phát hiện và sửa trong quá trình đó.
- Kết quả kiểm tra và giới hạn môi trường: [báo cáo Phase 0](docs/phase-0-verification.md).

## Trải nghiệm hướng tới

1. Mở ứng dụng, nhấn phím tắt hoặc chọn biểu tượng tray để hiện cửa sổ trợ lý nhỏ.
2. Trợ lý chào theo thời gian trên máy. Khi đã cho phép microphone và bắt đầu phiên, trợ lý lắng nghe.
3. VAD xác định lượt nói; STT chuyển âm thanh thành văn bản; bộ quản lý hội thoại chuyển yêu cầu đến AI.
4. Trợ lý trả lời bằng giọng nói qua TTS, hiển thị transcript và tiếp tục nghe trong cùng phiên.
5. Về sau, agent sử dụng công cụ, bộ nhớ và dịch vụ cá nhân; hành động thay đổi dữ liệu phải qua phân quyền và xác nhận.

Wake word, automation, vision và nhiều agent được bổ sung ở các giai đoạn sau. Chạy nền không đồng nghĩa với luôn thu âm.

## Kiến trúc dự kiến

| Thành phần   | Công nghệ / trách nhiệm                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Desktop        | Tauri 2 + React + TypeScript; cửa sổ, tray, phím tắt, trạng thái trợ lý                          |
| Backend        | Python + FastAPI; một backend chia thành các mô-đun                                                 |
| Voice          | Microphone → VAD → STT → hội thoại → TTS → speaker                                                |
| Agent          | LangGraph, bắt đầu Phase 4                                                                            |
| AI             | Lớp trừu tượng LLM cho OpenAI, Anthropic, Gemini; bổ sung adapter theo nhu cầu                     |
| Realtime       | WebSocket cho sự kiện phiên và âm thanh                                                             |
| Memory         | Redis, PostgreSQL và pgvector, bắt đầu Phase 6                                                       |
| Infrastructure | Docker / Docker Compose cho backend và dữ liệu tùy giai đoạn; desktop chạy trực tiếp trên máy |

Xem [kiến trúc và sơ đồ](docs/architecture.md), [luồng hội thoại](docs/agent-flow.md) và [bảo mật](docs/security.md).

## Phase 0 — ✅ Completed

Checkbox chỉ được đánh dấu sau khi artifact tồn tại và đã kiểm tra. Hoàn thành tài liệu không chứng minh chức năng đã chạy.

- [X] Kiểm tra repository và ghi nhận môi trường — [báo cáo](docs/phase-0-verification.md).
- [X] Tài liệu kiến trúc, sơ đồ và ranh giới mô-đun — [architecture](docs/architecture.md).
- [X] Yêu cầu và tiêu chí nghiệm thu — [requirements](docs/requirements.md).
- [X] Luồng voice, trạng thái, hủy và hội thoại nhiều lượt — [agent flow](docs/agent-flow.md).
- [X] Mô hình bảo mật và quyền thực thi — [security](docs/security.md).
- [X] Roadmap Phase 0–12 — [roadmap](docs/roadmap.md).
- [X] Hướng dẫn phát triển — [development guide](docs/development-guide.md).
- [X] Cấu trúc thư mục có tệp mô tả trách nhiệm — [apps](apps/README.md), [packages](packages/README.md), [infrastructure](infrastructure/README.md), [scripts](scripts/README.md).
- [X] Mẫu môi trường và quy tắc bỏ qua dữ liệu riêng — [.env.example](.env.example), [.gitignore](.gitignore).
- [X] Kiến trúc Docker và vòng đời dịch vụ — [infrastructure](infrastructure/README.md).
- [X] Quyết định kỹ thuật được lập thành ADR — [danh mục ADR](docs/adr/README.md).
- [X] Kế hoạch triển khai Phase 1 đã được soạn — [implementation plan](docs/phase-1-implementation-plan.md).
- [X] Kiểm tra tính nhất quán của hồ sơ Phase 0 — [verification](docs/phase-0-verification.md).
- [x] Phase 0 approved by project owner.
- Phase 0 approval date: **2026-09-07**.
- Phase 0 approver: **Project owner**.
- [x] Phase 1 implementation plan approved by project owner.
- Phase 1 approval date: **2026-09-08**.
- [x] Prerequisite gate G1–G4 passed.
- [x] Desktop Shell implementation approved by project owner.
- Desktop Shell implementation approval date: **2026-09-16**.
- [x] Phase 1 implementation started.
- Phase 1 implementation start date: **2026-09-16**.

## Phase 1 — Prerequisite verification result

Ngày xác minh hoàn tất: **2026-09-09**. Kết quả tổng thể: **G1–G4 PASS**.

| Gate | Status | Kết quả |
| --- | --- | --- |
| G1 — npm | PASS | Node 24.20.0/npm 11.19.0; cài dependency từ npm lockfile thành công. |
| G2 — Native prerequisites | PASS | Build Tools/workload C++ hoàn tất; MSVC 14.29.30133; SDK 10.0.19041.0 và 10.0.22621.0 đủ headers/libs. Build dùng SDK 10.0.22621.0. |
| G3 — Compatibility | PASS | React/ReactDOM 19.2.8, TypeScript 5.9.3, Vite 7.3.1; Tauri CLI/crate 2.10.0, API 2.10.1, native runtimes khóa 2.10.0. Bộ dependency đã install/build/run thành công. |
| G4 — Minimal native spike | PASS | Frontend build → Rust/Tauri release build → tạo và chạy .exe → cửa sổ native hiển thị nhãn → đóng bình thường, exit 0, không còn child processes đã quan sát. |

Spike riêng: [hướng dẫn chạy và phiên bản khóa](spikes/tauri-minimal/README.md). Bằng chứng: [báo cáo G2/G4](docs/phase-1-prerequisite-verification.md#native-toolchain-re-verification-and-g4-spike--2026-09-09), [ảnh cửa sổ native](spikes/tauri-minimal/verification/native-window.png), [runtime record](spikes/tauri-minimal/verification/native-runtime.json).

Lịch sử FAIL/BLOCKED và các lần thử lỗi đều được giữ trong báo cáo/evidence. G4 đã khắc phục API 2.10.0 bị npm đánh dấu broken release và lỗi compile với runtime Tauri 2.11.x bằng phiên bản cụ thể trong lockfiles.

Prerequisite gate đã đạt trước khi implementation bắt đầu. Spike chỉ có một native window và nhãn “Tauri prerequisite spike”; không copy/move vào `apps/desktop/` — Desktop Shell được viết mới, kế thừa version set đã verify.

## Phase 1 — Desktop Shell implementation result (2026-09-16, cập nhật 2026-09-21)

Chủ dự án duyệt Desktop Shell implementation ngày 2026-09-16. Đã build và chạy native thành công trên Windows x64: `apps/desktop/src-tauri/target/release/desktop-assistant-shell.exe`. Bảng kết quả P1-00 đến P1-10 đầy đủ: [docs/phase-1-implementation-plan.md §8](docs/phase-1-implementation-plan.md#8-tiêu-chí-kiểm-thử-và-nghiệm-thu). Tóm tắt:

- PASS: prerequisite gate, static checks/build (typecheck/vitest 17 test/vite build/cargo check/tauri build --locked), single instance, open/show/hide/close-to-tray, greeting theo giờ, 5 visual states + dev-only simulator, settings round-trip qua UI thật, shortcut-conflict-detection với fallback tray, phạm vi/quyền (không mic/key/backend).
- Ngày 2026-09-21, chủ dự án tự xác nhận thủ công trên Windows thật 3 mục còn lại — **cả 3 đều PASS**: tray icon click Show/Hide/Exit, shortcut trigger ở trường hợp đăng ký thành công, DPI 100%/150%. Trong lúc xác nhận shortcut, phát hiện và sửa 1 bug thật: `capabilities/default.json` cấp `global-shortcut:default` — permission set này **rỗng theo thiết kế bảo mật của Tauri**, khiến mọi `register()` bị ACL từ chối và báo nhầm thành "trùng shortcut". Đã sửa bằng cách khai rõ `allow-register`/`allow-unregister`/`allow-is-registered`, rebuild, và chủ dự án xác nhận lại thành công.
- Phase 1 baseline giờ đã có kết quả PASS đầy đủ cho toàn bộ P1-00 → P1-10. **Vẫn chờ chủ dự án phê duyệt nghiệm thu chính thức** để đóng Phase 1 — không tự đánh dấu completed.

## Roadmap

| Phase | Mục tiêu                            | Trạng thái                               |
| ----- | ------------------------------------- | ------------------------------------------ |
| 0     | Foundation & Voice-First Architecture | ✅ Completed |
| 1     | Desktop Assistant Shell               | 🔵 Baseline verified, toàn bộ P1-00→P1-10 PASS — chờ nghiệm thu chính thức |
| 2     | Speech Pipeline                       | Not Started                                |
| 3     | Voice AI Conversation                 | Not Started                                |
| 4     | Agent + Tool Calling                  | Not Started                                |
| 5     | Permission & Security Layer           | Not Started                                |
| 6     | Personal Memory                       | Not Started                                |
| 7     | Personal Integrations                 | Not Started                                |
| 8     | Coding Assistant                      | Not Started                                |
| 9     | Wake Word                             | Not Started                                |
| 10    | Automation                            | Not Started                                |
| 11    | Vision                                | Not Started                                |
| 12    | Multi-Agent                           | Not Started                                |

Chi tiết phạm vi và tiêu chí kết thúc từng phase: [roadmap](docs/roadmap.md).

## Bắt đầu đọc

- [Yêu cầu sản phẩm](docs/requirements.md) và [kiến trúc](docs/architecture.md).
- [Kế hoạch Phase 1 đã duyệt](docs/phase-1-implementation-plan.md).
- [Hướng dẫn phát triển](docs/development-guide.md) và [bằng chứng kiểm tra](docs/phase-0-verification.md).

Lệnh build/chạy cùng manifests và lockfiles có trong [minimal spike](spikes/tauri-minimal/README.md) và [Desktop Shell](apps/desktop/README.md). Chưa có backend hoặc cấu hình Compose thực thi; các phần này được triển khai ở phase tương ứng sau khi được duyệt.

## Decision log

| Ngày      | Ghi nhận                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-08-11 | README ban đầu đề xuất modular monolith, LangGraph và bộ nhớ ba tầng; ghi nhận repository riêng cho thư mục AI_Assistant.                 |
| 2026-09-07 | Audit xác nhận commit ban đầu chỉ có README; các tuyên bố hoàn thành tài liệu và skeleton trước đây chưa có artifact đối chiếu. |
| 2026-09-07 | Theo yêu cầu chủ dự án, chuyển sang Voice-First Desktop Assistant, đưa desktop và speech lên Phase 1–3, xây dựng lại hồ sơ Phase 0.    |
| 2026-09-07 | Chủ dự án phê duyệt Phase 0 — Foundation & Voice-First Architecture. Phase 1 plan chưa được duyệt; chuyển sang planning và chờ review. |
| 2026-09-08 | Chủ dự án duyệt Phase 1 implementation plan với architectural constraints bổ sung; chỉ cho phép prerequisite gate/minimal spike, chưa cho phép Desktop Shell implementation. |
| 2026-09-09 | Re-verify sau khi chủ máy nâng Node: G1 PASS, G2 BLOCKED, G3 PASS, G4 BLOCKED / NOT RUN. Giữ lịch sử FAIL; cần chủ máy hoàn tất C++ Build Tools/Windows SDK; chưa tạo spike hoặc triển khai shell. |
| 2026-09-09 | Sau remediation native của chủ máy: G2 PASS; G4 minimal spike đã install/build/chạy cửa sổ native và đóng sạch. G1–G4 PASS; chuyển Ready for Implementation Approval, chưa bắt đầu Desktop Shell. |
| 2026-09-16 | Chủ dự án duyệt Desktop Shell implementation. Đã scaffold `apps/desktop/`, build và chạy native thành công trên Windows x64 (compact overlay, tray, single instance, greeting, 5 visual states, settings, shortcut với xử lý conflict). Một số kiểm tra tương tác chưa tự động hóa được, cần xác nhận thủ công; Phase 1 chưa được đánh dấu hoàn thành, chờ chủ dự án nghiệm thu. |
| 2026-09-21 | Chủ dự án tự xác nhận thủ công trên Windows thật 3 mục còn lại (tray icon click, shortcut trigger thành công, DPI 100%/150%) — cả 3 PASS. Phát hiện và sửa 1 bug thật: thiếu quyền ACL cho plugin global-shortcut khiến mọi tổ hợp phím bị báo nhầm "không khả dụng". Toàn bộ P1-00→P1-10 đã PASS; Phase 1 vẫn chưa tự đánh dấu completed, chờ phê duyệt nghiệm thu chính thức. |

## Quy tắc hoàn thành

Một phase chỉ hoàn thành khi artifact đúng phạm vi đã có, validation phù hợp đã đạt, kết quả đã báo cáo và chủ dự án đã phê duyệt. Không tự đánh dấu phê duyệt dựa trên việc tài liệu đã được viết.

**Bước tiếp theo:** STOP — toàn bộ P1-00 → P1-10 đã có kết quả PASS (kể cả 3 mục xác nhận thủ công: tray icon click, shortcut trigger thành công, DPI 100%/150%, đều do chủ dự án tự kiểm tra ngày 2026-09-21). Không tự đánh dấu Phase 1 completed — chờ chủ dự án phê duyệt nghiệm thu chính thức để đóng phase.
