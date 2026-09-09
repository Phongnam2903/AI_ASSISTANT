# Personal AI Assistant

Trợ lý AI cá nhân  JARVIS, được thiết kế như một **Voice-First Desktop Assistant**: người dùng mở hoặc gọi trợ lý, nói yêu cầu và nhận phản hồi bằng giọng nói.

Thứ tự ưu tiên tương tác: **Voice → Text / Transcript → Vision (tương lai)**. Văn bản phục vụ transcript, lịch sử, nhập liệu khi không dùng microphone và cấu hình trợ lý.

## Trạng thái thực tế

- **Current Phase:** Phase 1 — Desktop Assistant Shell (Ready for Implementation Approval).
- **Phase 0:** ✅ Completed — Foundation & Voice-First Architecture.
- **Ngày duyệt Phase 0:** 2026-09-07.
- **Phase 1 Status:** 🟡 Ready for Implementation Approval.
- **Cập nhật:** 2026-09-09.
- Repository chứa tài liệu thiết kế, skeleton và **Tauri minimal spike đã build/chạy native trên Windows** tại `spikes/tauri-minimal/`. **Desktop Shell implementation chưa bắt đầu; `apps/desktop/` vẫn chỉ là skeleton.**
- Technical foundation Phase 0 và kế hoạch Phase 1 đã được chủ dự án phê duyệt. Phê duyệt ngày 2026-09-08 chỉ cho phép prerequisite gate G1–G4; Desktop Shell implementation chờ phê duyệt riêng.
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
- [ ] Desktop Shell implementation approved by project owner.
- [ ] Phase 1 implementation started.

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

Phase 1 ở **🟡 Ready for Implementation Approval**. Prerequisite gate đã đạt; **Desktop Shell implementation vẫn cần phê duyệt riêng**. Spike chỉ có một native window và nhãn “Tauri prerequisite spike”; không copy/move vào `apps/desktop/`.

## Roadmap

| Phase | Mục tiêu                            | Trạng thái                               |
| ----- | ------------------------------------- | ------------------------------------------ |
| 0     | Foundation & Voice-First Architecture | ✅ Completed |
| 1     | Desktop Assistant Shell               | 🟡 Ready for Implementation Approval |
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

Lệnh build/chạy cùng manifests và lockfiles chỉ có trong [minimal spike](spikes/tauri-minimal/README.md). Chưa có Desktop Shell, backend hoặc cấu hình Compose thực thi; các phần này được triển khai ở phase tương ứng sau khi được duyệt.

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

## Quy tắc hoàn thành

Một phase chỉ hoàn thành khi artifact đúng phạm vi đã có, validation phù hợp đã đạt, kết quả đã báo cáo và chủ dự án đã phê duyệt. Không tự đánh dấu phê duyệt dựa trên việc tài liệu đã được viết.

**Bước tiếp theo:** STOP — chờ chủ dự án phê duyệt Desktop Shell implementation riêng. Giữ `[ ] Phase 1 implementation started`; prerequisite PASS không phải implementation approval.
