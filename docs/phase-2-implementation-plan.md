# Phase 2 — Speech Pipeline Implementation Plan

Status: **Superseded by `.aide/` framework (2026-09-21).** Chủ dự án quyết định chuyển toàn bộ quy trình dự án sang khung `.aide/` mô tả trong [EXECUTION_GUIDE.md](../EXECUTION_GUIDE.md). Nội dung kỹ thuật trong file này (contract WebSocket, giới hạn tài nguyên, constraints, đề xuất provider...) **vẫn đúng và được giữ làm tài liệu tham chiếu** — không xóa. Đơn vị quản lý/phê duyệt chính thức từ nay là **`.aide/lifecycle/change-sets/CHG-JARVIS-2026-001/`**, với các Task tương ứng tại `.aide/lifecycle/tasks/TASK-JARVIS-001` đến `TASK-JARVIS-011`. Xem đó để biết trạng thái phê duyệt thật hiện tại, không dựa vào trạng thái cũ ghi dưới đây.

Ngày soạn: 2026-09-21 (trước khi chuyển sang `.aide/`). Soạn dựa trên các quyết định đã có ở Phase 0: [architecture](architecture.md), [agent flow](agent-flow.md), [security](security.md), [requirements](requirements.md), [ADR 0004](adr/0004-voice-first-interaction.md).

Phase 1 — Desktop Assistant Shell đã ✅ Completed (2026-09-21). Phase 2 chưa được phép triển khai bất kỳ phần nào — kế hoạch này cần chủ dự án phê duyệt riêng trước, đúng quy trình đã áp dụng cho Phase 1.

## 1. Mục tiêu và kết quả bàn giao

Biến Desktop Shell từ "im lặng, chỉ có chữ" thành một pipeline giọng nói thật: nói vào micro → nhận diện lượt nói (VAD) → chuyển thành văn bản (STT) → **phản hồi cố định, chưa gọi AI thật** → đọc phản hồi bằng giọng nói (TTS). Đây là bước cô lập rủi ro: xác nhận toàn bộ "tai và miệng" hoạt động đúng trước khi Phase 3 gắn "bộ não" (LLM) vào.

Kết quả bàn giao:
- `apps/backend/` — FastAPI, một tiến trình, có WebSocket endpoint xác thực, quản lý session/turn.
- Adapter STT/TTS/VAD sau lưng interface chung (không hardcode 1 provider cụ thể trong logic nghiệp vụ).
- `packages/contracts/` — JSON Schema khóa cho control envelope + audio framing, protocol version `1`.
- Desktop: audio capture (WebView2 hoặc native adapter, quyết định sau spike), state machine thật thay simulator, greeting phát TTS.
- Toàn bộ chạy được trên Windows x64 thật, tiếng Việt, không cần Docker/PostgreSQL/Redis.

## 2. Ranh giới phê duyệt

Thứ tự bắt buộc, giống hệt quy trình đã dùng ở Phase 1:

1. Chủ dự án phê duyệt riêng kế hoạch Phase 2 này.
2. Sau khi duyệt, chạy prerequisite gate G1–G5 (mục 3). Riêng **G3 — chọn provider VAD/STT/TTS cần chủ dự án xác nhận** vì liên quan chi phí/dữ liệu rời máy (xem mục 4).
3. Sau gate, báo cáo kết quả và STOP — kể cả toàn bộ PASS vẫn phải chờ chủ dự án phê duyệt Speech Pipeline implementation riêng.
4. Chỉ bắt đầu code `apps/backend/` và audio capture thật sau khi gate PASS **và** có phê duyệt implementation mới.
5. Sau khi được duyệt, kiểm thử theo mục 7 và trình kết quả để nghiệm thu.

Không tự suy luận phê duyệt từ việc tài liệu này tồn tại.

## 3. Prerequisite gate trước khi code Speech Pipeline

| Gate | Việc cần làm | Bằng chứng PASS bắt buộc |
| --- | --- | --- |
| G1 — Python/FastAPI toolchain | Chọn Python bản còn hỗ trợ chính thức (không mặc định bản đang cài trên máy); cài FastAPI + uvicorn + websockets qua venv/uv; xác minh WebSocket hoạt động với một endpoint echo tối thiểu. | Version Python/pip/uv, lệnh, exit code; venv/lockfile (`requirements.txt`/`uv.lock`) tạo được; echo WebSocket nhận/gửi frame thật, không phải mô tả lý thuyết. |
| G2 — Audio device trên Windows | Xác minh microphone và speaker được hệ điều hành nhận diện; thử capture/playback thô (chưa qua VAD/STT/TTS) để chứng minh thiết bị thật hoạt động. | Ghi danh sách thiết bị phát hiện, log capture/playback thật, không dùng version probe thay cho device test. |
| G3 — Chọn provider VAD/STT/TTS | Đánh giá tối thiểu 1 lựa chọn local và 1 lựa chọn cloud cho STT/TTS theo tiêu chí: chất lượng tiếng Việt, độ trễ, chi phí, dữ liệu có rời máy không. Đề xuất mặc định (xem mục 4) cần **chủ dự án xác nhận rõ ràng** trước khi khóa. | Bảng so sánh có nguồn; quyết định cuối ghi vào ADR mới; nếu chọn cloud phải ghi rõ chính sách lưu dữ liệu của provider đó. |
| G4 — Minimal audio spike | Trong `spikes/audio-pipeline-minimal/` (tách biệt `apps/backend`, giống `spikes/tauri-minimal`): mic → VAD → STT → phản hồi cố định (hardcode, không gọi AI) → TTS → speaker, một vòng trọn vẹn trên Windows thật. | Chạy thật, có transcript đúng và audio phát ra loa; đo latency một lượt; xác nhận raw audio không ghi ra đĩa; ghi lệnh/exit code/observation thật. |
| G5 — Capture path quyết định | Theo ADR 0004: thử capture qua WebView2 (`getUserMedia`) trước; nếu chất lượng/latency không đạt, thử native capture adapter cùng interface. | Kết quả đo latency/chất lượng của phương án đã thử; ADR ghi quyết định cuối, không chọn ngầm không ghi lại. |

G4 chỉ cần một vòng thoại tối thiểu với phản hồi hardcode — **không** phải overlay thật, không gọi LLM, không tích hợp vào `apps/desktop/`. Gate PASS yêu cầu G1–G5 đều đạt; nếu bất kỳ mục FAIL/BLOCKED, dừng và báo nguyên nhân, không chuyển sang code backend thật.

## 4. Đề xuất provider (cần chủ dự án xác nhận ở G3, chưa phải quyết định cuối)

Đây là đề xuất ban đầu để chủ dự án cân nhắc — **chưa khóa**, và giá/tính năng cụ thể phải xác minh lại tại thời điểm chạy G3 (thị trường AI thay đổi nhanh).

| Thành phần | Đề xuất mặc định | Lý do | Phương án thay thế |
| --- | --- | --- | --- |
| VAD | **Silero VAD** (chạy local, ONNX, miễn phí) | Không tốn chi phí, không gửi audio ra ngoài, đủ chính xác cho việc tách lượt nói | WebRTC VAD (nhẹ hơn nhưng kém chính xác hơn) |
| STT | **faster-whisper (local, chạy trên máy)** làm baseline | Miễn phí, không gửi giọng nói ra cloud (khớp nguyên tắc bảo mật "audio chỉ RAM, không mặc định gửi cloud"), hỗ trợ tiếng Việt | Cloud (OpenAI/Google/Azure Speech) nếu local quá chậm hoặc chất lượng tiếng Việt không đạt — cần chủ dự án đồng ý trả phí + xác nhận chính sách lưu dữ liệu |
| TTS | **Piper TTS (local, có voice tiếng Việt)** làm baseline | Miễn phí, offline, đủ tự nhiên cho baseline | Cloud (OpenAI TTS/Azure/ElevenLabs) nếu cần giọng tự nhiên hơn — tương tự cần chủ dự án đồng ý chi phí |

Lý do ưu tiên local trước: dự án hiện **chưa cam kết** dùng dịch vụ trả phí hoặc gửi dữ liệu ra ngoài (theo `docs/architecture.md` và `docs/security.md`). Bắt đầu bằng local giúp Phase 2 nghiệm thu được mà không phải chờ quyết định ngân sách; kiến trúc adapter (backend/providers) cho phép đổi sang cloud ở phase sau mà không phải viết lại logic nghiệp vụ.

**Câu hỏi cần chủ dự án trả lời trước khi chạy G3:** bạn có đồng ý bắt đầu bằng bộ local (Silero + faster-whisper + Piper) để tránh phát sinh chi phí/API key ở Phase 2, và để dành việc đánh giá provider cloud cho khi thực sự cần chất lượng cao hơn?

## 5. Phạm vi được phép trong Phase 2

| Hạng mục | Hành vi dự kiến |
| --- | --- |
| Audio capture | WebView2 trước, native adapter nếu cần (G5); microphone permission rõ ràng, chỉ báo thu âm, xử lý từ chối/rút thiết bị/mute |
| VAD | Tách lượt nói tại desktop; giới hạn 30 giây/lượt; im lặng không gọi STT |
| STT | Backend adapter, transcript cuối cho tiếng Việt; partial transcript không kích hoạt xử lý tiếp theo |
| Phản hồi | **Cố định/hardcode**, không gọi LLM — chỉ để kiểm tra pipeline hoạt động |
| TTS | Backend adapter phát phản hồi qua loa; tắt được; greeting cũng phát TTS khi bật âm thanh |
| FastAPI + WebSocket | Local API, chỉ bind loopback (127.0.0.1); session token ngắn hạn qua kênh riêng + kiểm tra Origin (không chỉ CORS) |
| `packages/contracts` | JSON Schema khóa cho control envelope (`protocol_version`, `event_id`, `session_id`, `turn_id`, `sequence`, `type`, `payload`) và audio binary framing; generate type TypeScript + Python từ cùng schema |
| State machine thật | Conversation Manager (backend) là nguồn trạng thái chuẩn Idle/Listening/Thinking/Speaking/Error; desktop không tự suy đoán Speaking khi chỉ nhận text — phải đợi `playback.started` |
| Cancellation | `turn.cancel`, `output.cancel`, nút Stop dừng playback ngay, disconnect/reconnect không replay dữ liệu cũ |
| Resource limits | Frame ≤ 64 KiB, tổng payload ≤ ~960 000 byte (30s PCM 16kHz/mono/16-bit), deadline upload, queue hữu hạn, im lặng 60s thì kết thúc phiên |
| Greeting | Phát qua TTS khi bật âm thanh (nâng cấp từ chữ-only ở Phase 1); không chào lặp khi focus lại |

## 6. Architectural constraints bắt buộc

1. **Không LLM, không Agent:** phản hồi trong Phase 2 luôn là hardcode/scripted. Không gọi bất kỳ LLM provider hay LangGraph nào — giữ nguyên tắc cô lập lỗi (test "tai/miệng" độc lập với "não").
2. **Audio chỉ ở RAM:** raw audio không ghi ra đĩa mặc định dưới bất kỳ hình thức nào (kể cả log/debug); dọn buffer khi end/cancel/error.
3. **Auth thật cho local WebSocket:** session token ngắn hạn cấp qua kênh riêng (không URL/query string/log) + allowlist Origin kiểm tra ở cả dev và packaged app; không dựa vào CORS đơn thuần vì đây là local server.
4. **Conversation Manager là nguồn trạng thái chuẩn:** từ Phase 2, backend quyết định state (Idle/Listening/Thinking/Speaking/Error), không phải UI tự suy luận. Desktop báo `playback.started`/`playback.finished` thật về backend.
5. **Idle/hidden = không capture:** microphone giải phóng ngay khi hide/end/exit. Không có chế độ "luôn nghe" ngầm — đó là phạm vi Wake Word (Phase 9) riêng, phải bật rõ ràng.
6. **Backend giữ toàn bộ provider credentials:** UI/desktop không bao giờ import SDK provider hay giữ API key; STT/TTS/VAD key chỉ ở backend `.env`, không lộ vào `VITE_*`, bundle, transcript hay log.

## 7. Không triển khai trong Phase 2

- LLM call thật, LangGraph, Agent, Tool Calling (thuộc Phase 3–4).
- Memory lưu dài hạn ngoài RAM theo phiên (thuộc Phase 6); PostgreSQL, Redis, pgvector.
- Gmail/Calendar/Drive/GitHub integration (Phase 7); Coding Assistant tools (Phase 8).
- Wake Word (Phase 9), Automation (Phase 10), Vision (Phase 11), Multi-Agent (Phase 12).
- Voice approval cho hành động ghi dữ liệu — chưa có tool nào để ghi ở Phase 2 nên chưa cần.
- Đóng gói backend thành sidecar cho bản release (spike đóng gói thuộc Phase 3 theo `architecture.md`).

## 8. Thứ tự triển khai sau khi gate PASS và được duyệt implementation riêng

| Bước | Công việc | Artifact |
| --- | --- | --- |
| 1 | Khóa `packages/contracts`: JSON Schema control envelope + audio framing, generate type TS/Python. | Schema file, generated types, test sai schema bị từ chối. |
| 2 | Scaffold `apps/backend/`: FastAPI app, WebSocket endpoint, session token + Origin auth, cấu trúc module (transport, voice, conversation). | `requirements.txt`/lockfile, app khởi động được, echo WebSocket có auth. |
| 3 | VAD + STT + TTS adapter theo interface chung, dùng provider đã chốt ở G3. | Adapter code, unit test logic (không cần device thật) cho phần xử lý dữ liệu. |
| 4 | Conversation Manager: session/turn state machine, cancellation, resource limits. | State machine thật thay simulator Phase 1. |
| 5 | Desktop: audio capture adapter (qua Desktop Native Adapter đã có từ Phase 1), gắn vào `useAssistantShell`, cập nhật Overlay hiển thị trạng thái thật. | UI phản ánh Idle/Listening/Thinking/Speaking/Error thật; greeting phát TTS. |
| 6 | Kiểm thử, đo latency, viết README backend, cập nhật `.env.example` (điền biến thật đã chọn ở G3). | Kết quả P2-00 → P2-11, giới hạn còn lại, README cập nhật. |

## 9. Tiêu chí kiểm thử và nghiệm thu

| ID | Kiểm tra | Kết quả yêu cầu |
| --- | --- | --- |
| P2-00 | Prerequisite gate | G1–G5 PASS với bằng chứng trước khi code backend thật |
| P2-01 | Microphone permission & chỉ báo (VO-01) | Chưa cấp quyền không thu; xử lý từ chối, rút mic, mute, end đúng |
| P2-02 | VAD tách lượt (VO-02) | Nói/dừng/im lặng/tiếng nền không gây gửi vô hạn; giới hạn 30 giây/lượt |
| P2-03 | STT/TTS thật (VO-03) | Tiếng Việt tạo transcript đúng trên thiết bị thật; phản hồi cố định phát qua loa thật |
| P2-04 | Stop/Cancel (VO-04) | Dừng playback, hủy turn, bỏ output đến muộn; đo thời gian dừng (mục tiêu <300ms, chưa cam kết cứng) |
| P2-05 | Local API auth (SE-02) | Session sai, Origin sai, frame quá lớn đều bị từ chối |
| P2-06 | WebSocket contract | `packages/contracts` JSON Schema khóa version 1; message sai/thứ tự frame sai/cancellation/size limits đều được kiểm tra |
| P2-07 | State machine thật | Conversation Manager là nguồn trạng thái chuẩn; UI không tự suy đoán Speaking khi chưa có `playback.started` thật |
| P2-08 | Resource & privacy limits | Raw audio không ghi đĩa mặc định; frame/total-size/deadline/queue giới hạn hoạt động đúng; im lặng 60s kết thúc phiên |
| P2-09 | Greeting TTS | Phát giọng nói khi bật âm thanh; tắt được; focus lại không chào lặp |
| P2-10 | Phạm vi & không leak credentials | Backend giữ provider key; UI không có SDK/key nào; chưa gọi LLM/Agent/Memory persistent |
| P2-11 | Static checks & build | Backend khởi động được; desktop build vẫn PASS sau khi gắn audio capture; `packages/contracts` schema validate đạt |

Tray/mic/speaker/latency cần kiểm tra trên Windows thật với thiết bị âm thanh thật — mock không thay thế được. Ghi rõ PASS/FAIL/chưa chạy cho từng mục, không suy luận từ code review.

## 10. Rủi ro và xử lý

- **WebView2 capture không đủ tốt (latency/chất lượng):** thử native capture adapter qua cùng interface (G5); ghi quyết định vào ADR mới, không đoán trước khi đo.
- **Provider STT/TTS local chậm hoặc chất lượng tiếng Việt kém:** G3 phải so sánh có số liệu; nếu local không đạt, đề xuất cloud kèm chi phí/chính sách dữ liệu để chủ dự án quyết định — không tự ý chuyển sang cloud.
- **Thiết bị âm thanh bị chiếm bởi ứng dụng khác / không tồn tại:** xử lý theo VO-01 (denial/device loss), có thông báo rõ, không crash app.
- **Latency vượt kỳ vọng:** đo và báo cáo trung thực; mục tiêu số cứng chính thức (p95 <4s) thuộc Phase 3, Phase 2 chỉ đo và ghi nhận.
- **Auth local API bị bỏ qua/yếu:** bắt buộc test session sai/Origin sai bị từ chối trước khi coi P2-05 PASS.
- **Rò rỉ raw audio ra đĩa ngoài ý muốn:** kiểm tra rõ ràng bằng cách theo dõi filesystem trong lúc test P2-08, không chỉ đọc code.

## 11. Ghi nhận phê duyệt và điểm dừng

- [x] Phase 0 approved by project owner — **2026-09-07**.
- [x] Phase 1 implementation plan approved by project owner — **2026-09-08**.
- [x] Phase 1 completed / accepted by project owner — **2026-09-21**.
- [ ] Phase 2 implementation plan approved by project owner.
- [ ] Trả lời câu hỏi provider ở mục 4 (local-first hay có ngân sách cho cloud ngay từ đầu).
- [ ] Prerequisite gate G1–G5 passed.
- [ ] Speech Pipeline implementation approved by project owner.
- [ ] Phase 2 implementation started.

**Current Phase: Phase 2 — Speech Pipeline (Proposed, chờ phê duyệt kế hoạch).**

**STOP:** không chạy G1–G5, không tạo `spikes/audio-pipeline-minimal/`, không tạo file nào trong `apps/backend/` cho đến khi chủ dự án phê duyệt kế hoạch này.
