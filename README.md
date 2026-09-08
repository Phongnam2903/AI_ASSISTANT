# Personal AI Assistant

Trợ lý AI cá nhân  JARVIS, được thiết kế như một **Voice-First Desktop Assistant**: người dùng mở hoặc gọi trợ lý, nói yêu cầu và nhận phản hồi bằng giọng nói.

Thứ tự ưu tiên tương tác: **Voice → Text / Transcript → Vision (tương lai)**. Văn bản phục vụ transcript, lịch sử, nhập liệu khi không dùng microphone và cấu hình trợ lý.

## Trạng thái thực tế

- **Current Phase:** Phase 1 — Desktop Assistant Shell (Planning / Awaiting Approval).
- **Phase 0:** ✅ Completed — Foundation & Voice-First Architecture.
- **Ngày duyệt Phase 0:** 2026-09-07.
- **Phase 1:** Planning / Awaiting Approval — chưa bắt đầu implementation.
- **Cập nhật:** 2026-09-07.
- Repository chứa tài liệu thiết kế, cấu trúc thư mục và mẫu cấu hình. **Chưa có ứng dụng chạy được hoặc mã triển khai Phase 1.**
- Technical foundation Phase 0 đã được chủ dự án phê duyệt; kế hoạch Phase 1 vẫn là **Proposed**, chờ phê duyệt riêng.
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
- [ ] Phase 1 implementation plan approved by project owner.

## Roadmap

| Phase | Mục tiêu                            | Trạng thái                               |
| ----- | ------------------------------------- | ------------------------------------------ |
| 0     | Foundation & Voice-First Architecture | ✅ Completed |
| 1     | Desktop Assistant Shell               | Planning / Awaiting Approval |
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
- [Kế hoạch Phase 1 để duyệt](docs/phase-1-implementation-plan.md).
- [Hướng dẫn phát triển](docs/development-guide.md) và [bằng chứng kiểm tra](docs/phase-0-verification.md).

Chưa có lệnh chạy ứng dụng, dependency manifest, lockfile hoặc cấu hình Compose thực thi. Chúng được bổ sung trong phase triển khai tương ứng sau khi được duyệt.

## Decision log

| Ngày      | Ghi nhận                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-08-11 | README ban đầu đề xuất modular monolith, LangGraph và bộ nhớ ba tầng; ghi nhận repository riêng cho thư mục AI_Assistant.                 |
| 2026-09-07 | Audit xác nhận commit ban đầu chỉ có README; các tuyên bố hoàn thành tài liệu và skeleton trước đây chưa có artifact đối chiếu. |
| 2026-09-07 | Theo yêu cầu chủ dự án, chuyển sang Voice-First Desktop Assistant, đưa desktop và speech lên Phase 1–3, xây dựng lại hồ sơ Phase 0.    |
| 2026-09-07 | Chủ dự án phê duyệt Phase 0 — Foundation & Voice-First Architecture. Phase 1 plan chưa được duyệt; chuyển sang planning và chờ review. |

## Quy tắc hoàn thành

Một phase chỉ hoàn thành khi artifact đúng phạm vi đã có, validation phù hợp đã đạt, kết quả đã báo cáo và chủ dự án đã phê duyệt. Không tự đánh dấu phê duyệt dựa trên việc tài liệu đã được viết.

**Bước tiếp theo:** trình toàn bộ [Phase 1 implementation plan](docs/phase-1-implementation-plan.md) để chủ dự án review. STOP và chờ phê duyệt riêng; chưa chạy prerequisite gate, minimal spike hoặc implement Phase 1.
