# Phase 1 — Desktop Assistant Shell Implementation Plan

Status: Proposed — Planning / Awaiting Approval.

Ngày cập nhật: 2026-09-07.

Phase 0 — Foundation & Voice-First Architecture đã được chủ dự án phê duyệt ngày 2026-09-07. Kế hoạch Phase 1 chưa được phê duyệt; chưa chạy prerequisite gate, tạo minimal spike hoặc bắt đầu implementation.

## 1. Mục tiêu và kết quả bàn giao

Một Desktop Assistant Shell trên Windows x64, dùng Tauri 2 + React + TypeScript. Ứng dụng có compact assistant overlay, mở/show/hide được, system tray, greeting dạng chữ và các visual states: IDLE, LISTENING, THINKING, SPEAKING, ERROR.

LISTENING / THINKING / SPEAKING chỉ là UI/state-machine states phục vụ shell. Chúng không biểu thị microphone, xử lý AI hoặc phát giọng nói thực tế.

Frontend dự kiến dùng Vite và npm với lockfile. Phiên bản Node.js, Tauri, React, TypeScript, Vite và plugin sẽ được lựa chọn, kiểm tra tương thích tại prerequisite gate sau khi kế hoạch được duyệt.

## 2. Ranh giới phê duyệt

Thứ tự bắt buộc:

1. Chủ dự án phê duyệt riêng Phase 1 implementation plan.
2. Thực hiện prerequisite gate G1–G4, bao gồm Tauri minimal spike.
3. Chỉ khi toàn bộ gate đạt và có bằng chứng mới bắt đầu code shell/UI thật.
4. Kiểm thử và trình kết quả Phase 1 để nghiệm thu.

Minimal spike là thử nghiệm toolchain thuộc gate, không phải triển khai UI sản phẩm. Ngoại lệ tạo mã thử nghiệm này chỉ có hiệu lực sau khi kế hoạch Phase 1 được duyệt.

Hiện tại phải dừng ở bước trình kế hoạch. Không chạy gate, cài dependencies, tạo spike hoặc implement shell dựa trên phê duyệt Phase 0.

## 3. Prerequisite gate trước khi code shell

Trạng thái hiện tại: **NOT RUN — awaiting Phase 1 plan approval**.

| Gate | Công việc cần thực hiện sau khi được duyệt | Bằng chứng PASS bắt buộc |
| --- | --- | --- |
| G1 — npm | Xác minh npm chạy bình thường trong môi trường build, truy cập được package metadata và đường dẫn cần thiết. Kiểm tra lại lỗi EPERM từng gặp trong audit. | Ghi version npm, lệnh và exit code; thao tác npm không còn lỗi quyền. Việc cài dependency thật được xác nhận tiếp trong G4. |
| G2 — Native prerequisites | Xác minh Visual Studio C++ Build Tools, workload Desktop development with C++, Windows SDK và Rust MSVC phù hợp; xác nhận WebView2 runtime. | Ghi installation/workload/SDK/toolchain được phát hiện. Không coi version probe hoặc registry entry là đủ chứng minh build. |
| G3 — Node.js compatibility | Chọn bộ frontend/Tauri dependencies cụ thể; đối chiếu Node.js với yêu cầu engines và tài liệu của các phiên bản được chọn. Kiểm tra tương thích major version của Tauri CLI/native/plugin. | Bảng Node/npm/dependency versions và nguồn yêu cầu; chọn Node LTS còn được hỗ trợ, không có engine mismatch. Không mặc định dùng Node 20.20.2 chỉ vì audit tìm thấy. |
| G4 — Tauri minimal spike | Tạo project Tauri tối thiểu trong thư mục riêng dự kiến `spikes/tauri-minimal/`, dùng bộ dependency đã chọn; cài dependencies, build native Windows và chạy executable vừa build. | Dependency resolution/install, frontend build và native build đạt; executable mở cửa sổ tối thiểu rồi đóng sạch trên Windows. Ghi lệnh, exit code, artifact path và quan sát thực tế. |

G4 chỉ cần cửa sổ mặc định với một nhãn kiểm tra. Chưa làm overlay sản phẩm, greeting, tray, shortcut hoặc state UI thật trong spike. Một trang chạy trong browser hoặc dev server không đủ chứng minh native toolchain.

Gate PASS yêu cầu cả G1–G4 đạt. Nếu bất kỳ mục nào lỗi, giữ gate ở trạng thái FAIL/BLOCKED, ghi nguyên nhân và cách xử lý; không chuyển sang code shell và không báo đạt dựa trên mô phỏng.

Bằng chứng sẽ được ghi tại `docs/phase-1-prerequisite-verification.md` khi gate thực sự được chạy. File báo cáo và thư mục spike chưa được tạo ở bước planning này. Giữ spike riêng để review; việc tái sử dụng cấu hình đã kiểm chứng cho app chính phải được ghi rõ.

Tham chiếu: [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) và [Node.js releases](https://nodejs.org/en/about/previous-releases). Yêu cầu dependency cụ thể phải được kiểm tra lại khi lựa chọn phiên bản.

## 4. Phạm vi được phép trong Phase 1

| Hạng mục | Hành vi dự kiến |
| --- | --- |
| Tauri desktop application | Windows x64; một instance; mở app lần hai focus cửa sổ hiện có. |
| React + TypeScript UI | Components, state model và native adapter phục vụ desktop shell. |
| Compact assistant overlay | Cửa sổ nhỏ, đề xuất khoảng 400 × 560 logical pixels, resize được, có vùng kéo và điều khiển rõ ràng. Always-on-top là tùy chọn cấu hình. |
| Open / show / hide | Mở hoặc show đưa assistant lên trước; close chuyển sang hide; thao tác hide reset trạng thái demo. |
| System tray | Show/Hide/Exit; hướng dẫn lần đầu rằng app vẫn ở tray sau khi đóng cửa sổ. Exit thoát và dọn tài nguyên do app sở hữu. |
| Global shortcut nếu phù hợp | Đề xuất Ctrl+Shift+Space, có thể đổi/tắt. Xác minh khả năng đăng ký; nếu conflict hoặc không khả dụng, báo rõ và giữ đường mở bằng tray. |
| Greeting khi mở assistant | Hiển thị chữ tiếng Việt theo giờ local; có thể tắt/đổi tên. Không phát âm thanh. |
| Visual assistant states | IDLE, LISTENING, THINKING, SPEAKING, ERROR; nhãn chữ và chuyển trạng thái rõ ràng. |
| Optional transcript area | Vùng thu gọn với empty state hoặc fixture minh họa có nhãn; không nhận dạng lời nói, chat API hoặc lưu lịch sử hội thoại. |
| Optional full workspace shell | Chỉ bố cục/navigation/panel mở rộng của cùng ứng dụng; không thêm tính năng AI, editor hoặc integrations. Không bắt buộc để nghiệm thu baseline. |
| Basic desktop configuration | Tên hiển thị, greeting, shortcut, kích thước/vị trí cửa sổ, always-on-top và giảm chuyển động; chỉ lưu preference cục bộ không nhạy cảm. |
| Tests phù hợp với shell | Logic/state/configuration tests, kiểm tra native lifecycle trên Windows, typecheck và build. |

Lưu preference desktop không phải triển khai Personal Memory. Mở ứng dụng ở đây là mở chính assistant, không phải xây application launcher hoặc công cụ điều khiển ứng dụng khác.

## 5. Những phần không được implement trong Phase 1

- Microphone capture thực tế.
- Voice Activity Detection (VAD).
- Speech-to-Text.
- Text-to-Speech.
- LLM API.
- LangGraph.
- Agent.
- Tool Calling.
- Memory.
- PostgreSQL.
- Redis.
- pgvector.
- Gmail.
- Calendar.
- GitHub integration.
- Wake Word.
- Automation.
- Vision.

Không scaffold backend/FastAPI/WebSocket, provider SDK, database hoặc Docker runtime trong phase này. Không yêu cầu API key hay quyền microphone. Việc dùng Git để quản lý source dự án không phải GitHub integration trong sản phẩm.

## 6. Greeting, trạng thái và vòng đời shell

Greeting hiển thị theo giờ hệ điều hành: 05:00–11:59 buổi sáng, 12:00–17:59 buổi chiều, 18:00–21:59 buổi tối, 22:00–04:59 lời chào ban đêm.

Khởi chạy hoặc show sau khi hidden chào một lần nếu bật greeting. Focus lại cửa sổ đang visible không chào lặp. Greeting không gọi model hoặc đọc lịch/email.

| Tình huống | Hành vi |
| --- | --- |
| Open/show | Hiện overlay, greeting nếu phù hợp, trạng thái IDLE. |
| Development preview | Chạy IDLE → LISTENING → THINKING → SPEAKING → IDLE bằng sự kiện UI/fixture có nhãn Mô phỏng. |
| Preview lỗi | Chuyển ERROR, cho reset về IDLE; không phát sinh tác vụ speech/AI. |
| Lỗi shell thực tế | Thông báo lỗi cửa sổ/shortcut/config phù hợp, có đường phục hồi; không dùng thông điệp giả lỗi AI. |
| Hide | Đưa cửa sổ về hidden, reset demo và dọn timer/listener liên quan; tray còn hoạt động. |
| Exit | Hủy shortcut, tray/listener/timer do app tạo và thoát sạch. |

State-machine và kiểu dữ liệu của các trạng thái vẫn thuộc shell. Development harness dùng để review/test; bản release không tự giả vờ đang nghe, suy nghĩ bằng AI hoặc nói. Không tự khởi động cùng Windows ở Phase 1.

## 7. Thứ tự triển khai sau khi gate đạt

| Bước | Công việc | Artifact |
| --- | --- | --- |
| 1 | Scaffold app chính theo bộ dependency đã qua spike. | Manifest/lockfile, cấu hình Tauri/Vite/TypeScript, frontend và Rust native tại `apps/desktop/`. |
| 2 | Compact overlay, greeting, state model và development preview. | UI/state/native adapter tách trách nhiệm; fixture có nhãn. |
| 3 | Open/show/hide, single instance, tray, shortcut nếu phù hợp. | Lifecycle và cleanup; fallback khi shortcut conflict. |
| 4 | Basic configuration và phần shell tùy chọn nếu cần. | Preferences có defaults/version; transcript/workspace chỉ là UI. |
| 5 | Native capabilities/CSP và accessibility. | Quyền tối thiểu theo chức năng, bàn phím/focus/nhãn chữ/giảm chuyển động. |
| 6 | Kiểm thử, hướng dẫn chạy và trình nghiệm thu. | Kết quả tests/build/manual checks, hạn chế còn lại và README desktop cập nhật. |

Trong `apps/desktop/` dự kiến có `package.json`, npm lockfile, `src/`, `src-tauri/`, Cargo manifest/lockfile, Tauri config và capabilities. Tên file cụ thể theo template đã kiểm chứng; hiện chưa tạo các file implementation này.

Tham chiếu native features: [system tray](https://v2.tauri.app/learn/system-tray/), [global shortcut](https://v2.tauri.app/plugin/global-shortcut/) và [single instance](https://v2.tauri.app/plugin/single-instance/).

## 8. Tiêu chí kiểm thử và nghiệm thu

| ID | Kiểm tra | Kết quả yêu cầu |
| --- | --- | --- |
| P1-00 | Prerequisite gate | G1–G4 PASS với bằng chứng trước khi bắt đầu UI sản phẩm. |
| P1-01 | Launch và single instance | Một instance; executable desktop mở được trên Windows; lần mở tiếp theo focus đúng. |
| P1-02 | Greeting | Đúng các mốc giờ; bật/tắt có hiệu lực; focus lại không chào trùng. |
| P1-03 | Overlay lifecycle | Open/show/hide và close-to-tray hoạt động; Exit không để lại process/listener của app. |
| P1-04 | Shortcut nếu bật | Đăng ký/đổi/tắt và cleanup đúng; conflict có thông báo, tray vẫn dùng được. Nếu không hỗ trợ, ghi lý do và fallback. |
| P1-05 | Visual states | Đủ 5 trạng thái, transition/reset hợp lệ; preview có nhãn; không gọi audio/AI hoặc giả trạng thái voice trong release. |
| P1-06 | Desktop configuration | Preferences giữ sau restart; cấu hình thiếu/hỏng có default và không làm app không mở được. |
| P1-07 | Accessibility và DPI | Bàn phím/focus/nhãn chữ/giảm chuyển động; kiểm tra 100% và 150% DPI. |
| P1-08 | Transcript/workspace nếu làm | Layout và fixture rõ ràng; không kết nối hoặc lưu hội thoại thật. |
| P1-09 | Phạm vi và quyền | App chạy không cần backend, key hoặc database; không xin mic, cấp shell tùy ý hay đọc ổ đĩa rộng. |
| P1-10 | Static checks và build | Typecheck, frontend build, Rust checks và Tauri native build đạt trên bộ version đã ghi nhận. |

Tự động kiểm tra logic greeting, state transitions, settings fallback và shortcut lifecycle khi triển khai. Tray/focus/show/hide/Exit cần kiểm tra trên desktop Windows thật; mock không thay thế được native validation. Ghi rõ kiểm tra nào PASS, FAIL hoặc chưa chạy; không tạo tests speech/AI/database trong phase này.

## 9. Rủi ro và xử lý

- npm từng lỗi EPERM, C++/SDK chưa được xác nhận: xử lý tại gate; dừng trước code shell nếu chưa đạt.
- Node/dependencies không tương thích: chọn lại bộ version còn hỗ trợ và chạy lại các phần gate bị ảnh hưởng.
- Minimal spike build được nhưng chạy lỗi: G4 chưa PASS; kiểm tra runtime/WebView2 và executable thật.
- Shortcut conflict: cho đổi/tắt, giữ tray; chỉ đưa vào baseline khi phù hợp với môi trường.
- Hide dễ bị hiểu là thoát: hướng dẫn lần đầu và Exit rõ ràng.
- Visual states bị hiểu là chức năng voice thật: preview có nhãn; không tự mô phỏng hoạt động AI trong release.

## 10. Ghi nhận phê duyệt và điểm dừng

- [x] Phase 0 approved by project owner.
- Phase 0 approval date: **2026-09-07**.
- Phase 0 approver: **Project owner**.
- [ ] Phase 1 implementation plan approved by project owner.
- Phase 1 approval date: **Chưa ghi nhận**.
- [ ] Prerequisite gate G1–G4 passed.
- [ ] Phase 1 implementation started.

**Current Phase: Phase 1 — Desktop Assistant Shell (Planning / Awaiting Approval).**

**STOP:** trình toàn bộ kế hoạch này để chủ dự án review và chờ phê duyệt Phase 1. Không tự đánh dấu approved, không chạy gate/minimal spike và không bắt đầu implementation trong lúc chờ.
