# Phase 1 — Desktop Assistant Shell Implementation Plan

Status: Approved plan — Ready for Implementation Approval.

Approval date: 2026-09-08. Approver: Project owner.
Authorization: G1–G4 only; Desktop Shell implementation requires separate approval.

Ngày cập nhật: 2026-09-09.

Phase 0 — Foundation & Voice-First Architecture đã được chủ dự án phê duyệt ngày 2026-09-07. Kế hoạch Phase 1 đã được phê duyệt ngày 2026-09-08. Chỉ prerequisite gate và minimal spike được phép thực hiện; Desktop Shell implementation chưa được cho phép.

## 1. Mục tiêu và kết quả bàn giao

Một Desktop Assistant Shell trên Windows x64, dùng Tauri 2 + React + TypeScript. Ứng dụng có compact assistant overlay, mở/show/hide được, system tray, greeting dạng chữ và các visual states: IDLE, LISTENING, THINKING, SPEAKING, ERROR.

LISTENING / THINKING / SPEAKING chỉ là UI/state-machine states phục vụ shell. Chúng không biểu thị microphone, xử lý AI hoặc phát giọng nói thực tế.

Frontend dự kiến dùng Vite và npm với lockfile. Phiên bản Node.js, Tauri, React, TypeScript, Vite và plugin được đối chiếu trong prerequisite gate; baseline của minimal spike đã được pin/lock và build/chạy native thành công; xem verification report trước khi chọn dependency cho shell.

## 2. Ranh giới phê duyệt

Thứ tự bắt buộc:

1. Chủ dự án phê duyệt riêng Phase 1 implementation plan.
2. Xác minh G1–G3; chỉ khi cả ba PASS mới được tạo/chạy Tauri minimal spike thuộc G4.
3. Sau G1–G4, báo cáo kết quả và STOP. Kể cả toàn bộ PASS vẫn phải chờ chủ dự án phê duyệt Desktop Shell implementation riêng.
4. Chỉ bắt đầu code shell/UI thật khi gate PASS và có phê duyệt implementation mới.
5. Sau implementation được cho phép, kiểm thử và trình kết quả Phase 1 để nghiệm thu.

Minimal spike là thử nghiệm toolchain thuộc gate, không phải triển khai UI sản phẩm. Ngoại lệ tạo mã thử nghiệm này chỉ có hiệu lực sau khi kế hoạch Phase 1 được duyệt và G1–G3 đều PASS.

Phê duyệt ngày 2026-09-08 cho phép prerequisite gate. Yêu cầu remediation ngày 2026-09-09 chỉ cho phép tạo/chạy minimal spike tại `spikes/tauri-minimal/` khi G1–G3 đều PASS; không copy/move spike vào `apps/desktop/`. Không được triển khai assistant shell trong đợt này.

## 3. Prerequisite gate trước khi code shell

Trạng thái hiện tại (2026-09-09): **G1–G4 PASS — Ready for Implementation Approval**. Minimal spike đã install/build/chạy cửa sổ native và đóng sạch. Xem [báo cáo G2/G4](phase-1-prerequisite-verification.md#native-toolchain-re-verification-and-g4-spike--2026-09-09). Desktop Shell implementation chưa được duyệt.

| Gate                        | Công việc cần thực hiện sau khi được duyệt                                                                                                                                                                  | Bằng chứng PASS bắt buộc                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1 — npm                   | Xác minh npm chạy bình thường trong môi trường build, truy cập được package metadata và đường dẫn cần thiết. Kiểm tra lại lỗi EPERM từng gặp trong audit.                                    | Ghi version npm, lệnh và exit code; thao tác npm không còn lỗi quyền. Việc cài dependency thật được xác nhận tiếp trong G4.                                                             |
| G2 — Native prerequisites  | Xác minh Visual Studio C++ Build Tools, workload Desktop development with C++, Windows SDK và Rust MSVC phù hợp; xác nhận WebView2 runtime.                                                                    | Ghi installation/workload/SDK/toolchain được phát hiện. Không coi version probe hoặc registry entry là đủ chứng minh build.                                                                  |
| G3 — Node.js compatibility | Chọn bộ frontend/Tauri dependencies cụ thể; đối chiếu Node.js với yêu cầu engines và tài liệu của các phiên bản được chọn. Kiểm tra tương thích major version của Tauri CLI/native/plugin. | Bảng Node/npm/dependency versions và nguồn yêu cầu; chọn Node LTS còn được hỗ trợ, không có engine mismatch. Không mặc định dùng Node 20.20.2 chỉ vì audit tìm thấy.             |
| G4 — Tauri minimal spike   | Tạo project Tauri tối thiểu trong thư mục riêng dự kiến`spikes/tauri-minimal/`, dùng bộ dependency đã chọn; cài dependencies, build native Windows và chạy executable vừa build.                  | Dependency resolution/install, frontend build và native build đạt; executable mở cửa sổ tối thiểu rồi đóng sạch trên Windows. Ghi lệnh, exit code, artifact path và quan sát thực tế. |

G4 chỉ cần cửa sổ mặc định với một nhãn kiểm tra. Chưa làm overlay sản phẩm, greeting, tray, shortcut hoặc state UI thật trong spike. Một trang chạy trong browser hoặc dev server không đủ chứng minh native toolchain.

Gate PASS yêu cầu cả G1–G4 đạt. Nếu bất kỳ mục nào lỗi, giữ gate ở trạng thái FAIL/BLOCKED, ghi nguyên nhân và cách xử lý; không chuyển sang code shell và không báo đạt dựa trên mô phỏng.

Bằng chứng FAIL ngày 2026-09-08 và BLOCKED trong đợt remediation đầu ngày 2026-09-09 được giữ trong report. Sau chủ máy hoàn tất native installation, G2 và G4 đã PASS; spike nằm riêng tại `spikes/tauri-minimal/`, không copy/move sang app chính. Phê duyệt triển khai shell vẫn là bước riêng.

Tham chiếu: [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) và [Node.js releases](https://nodejs.org/en/about/previous-releases). Yêu cầu dependency cụ thể phải được kiểm tra lại khi lựa chọn phiên bản.

## 4. Phạm vi được phép trong Phase 1

| Hạng mục                     | Hành vi dự kiến                                                                                                                                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tauri desktop application      | Windows x64; một instance; mở app lần hai focus cửa sổ hiện có.                                                                                                                                                                                     |
| React + TypeScript UI          | Components, state model và native adapter phục vụ desktop shell.                                                                                                                                                                                        |
| Compact assistant overlay      | Cửa sổ nhỏ, đề xuất khoảng 400 × 560 logical pixels, fixed-size hoặc constrained resize; có vùng kéo và điều khiển rõ ràng. Compact mode không trở thành application window thông thường. Always-on-top là tùy chọn cấu hình. |
| Open / show / hide             | Mở hoặc show đưa assistant lên trước; close chuyển sang hide; thao tác hide reset trạng thái demo.                                                                                                                                              |
| System tray                    | Show/Hide/Exit; hướng dẫn lần đầu rằng app vẫn ở tray sau khi đóng cửa sổ. Exit thoát và dọn tài nguyên do app sở hữu.                                                                                                                 |
| Global shortcut nếu phù hợp | Đề xuất Ctrl+Shift+Space, có thể đổi/tắt. Xác minh khả năng đăng ký; nếu conflict hoặc không khả dụng, báo rõ và giữ đường mở bằng tray.                                                                                       |
| Greeting khi mở assistant     | Hiển thị chữ tiếng Việt theo giờ local; có thể tắt/đổi tên. Không phát âm thanh.                                                                                                                                                            |
| Visual assistant states        | IDLE, LISTENING, THINKING, SPEAKING, ERROR; nhãn chữ và chuyển trạng thái rõ ràng.                                                                                                                                                                 |
| Optional transcript area       | Vùng thu gọn với empty state hoặc fixture minh họa có nhãn; không nhận dạng lời nói, chat API hoặc lưu lịch sử hội thoại.                                                                                                                |
| Optional full workspace shell  | Cửa sổ Full Workspace mới resizable đầy đủ; chỉ bố cục/navigation/panel mở rộng của cùng ứng dụng; không thêm tính năng AI, editor hoặc integrations. Không bắt buộc để nghiệm thu baseline.                                    |
| Basic desktop configuration    | Tên hiển thị, greeting, shortcut, kích thước/vị trí cửa sổ, always-on-top và giảm chuyển động; chỉ lưu preference cục bộ không nhạy cảm.                                                                                             |
| Tests phù hợp với shell     | Logic/state/configuration tests, kiểm tra native lifecycle trên Windows, typecheck và build.                                                                                                                                                            |

Lưu preference desktop không phải triển khai Personal Memory. Mở ứng dụng ở đây là mở chính assistant, không phải xây application launcher hoặc công cụ điều khiển ứng dụng khác.

## Architectural constraints bắt buộc

1. **Compact Assistant Overlay:** compact fixed-size hoặc constrained resize; Full Workspace là cửa sổ resizable đầy đủ. Giữ compact như một assistant overlay.
2. **Development State Preview:** simulator IDLE/LISTENING/THINKING/SPEAKING/ERROR chỉ phục vụ development/test. Production mặc định không hiển thị simulator; ngoại lệ chỉ khi bật explicit developer/debug mode.
3. **Desktop Settings Abstraction:** UI chỉ dùng interface kiểu SettingsRepository; không truy cập trực tiếp persistence implementation. Phase 1 chỉ lưu local non-sensitive preferences. Đây không phải Personal Memory.
4. **Desktop Native Adapter:** React components không gọi Tauri native APIs, invoke hoặc plugin APIs rải rác. Một desktop/native adapter layer bao bọc show/hide window, exit, always-on-top, shortcut registration, native lifecycle và các native capability khác của Phase 1.
5. **Greeting:** deterministic local greeting dựa trên giờ/config; không dùng LLM, Calendar, Email, Memory hoặc backend. Contextual/AI-generated greeting thuộc phase sau.

Các abstraction và UX constraints trên là ràng buộc của Desktop Shell khi được phép implement. Minimal spike không triển khai SettingsRepository, native adapter của sản phẩm, greeting, assistant states, overlay, tray hoặc shortcut.

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

| Tình huống         | Hành vi                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Open/show            | Hiện overlay, greeting nếu phù hợp, trạng thái IDLE.                                                             |
| Development preview  | Chạy IDLE → LISTENING → THINKING → SPEAKING → IDLE bằng sự kiện UI/fixture có nhãn Mô phỏng.               |
| Preview lỗi         | Chuyển ERROR, cho reset về IDLE; không phát sinh tác vụ speech/AI.                                               |
| Lỗi shell thực tế | Thông báo lỗi cửa sổ/shortcut/config phù hợp, có đường phục hồi; không dùng thông điệp giả lỗi AI. |
| Hide                 | Đưa cửa sổ về hidden, reset demo và dọn timer/listener liên quan; tray còn hoạt động.                      |
| Exit                 | Hủy shortcut, tray/listener/timer do app tạo và thoát sạch.                                                       |

State-machine và kiểu dữ liệu của các trạng thái vẫn thuộc shell. Development harness chỉ dùng cho development/test. Simulator không xuất hiện trong production UX mặc định; chỉ được hiển thị khi người dùng bật explicit developer/debug mode, luôn gắn nhãn Mô phỏng. Không tự khởi động cùng Windows ở Phase 1.

## 7. Thứ tự triển khai sau khi gate đạt VÀ được duyệt implementation riêng

| Bước | Công việc                                                                                 | Artifact                                                                                             |
| ------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1      | Sau implementation approval riêng, scaffold app chính theo bộ dependency đã qua spike. | Manifest/lockfile, cấu hình Tauri/Vite/TypeScript, frontend và Rust native tại`apps/desktop/`. |
| 2      | Compact overlay, greeting, state model và development preview.                             | UI/state/native adapter tách trách nhiệm; fixture có nhãn.                                      |
| 3      | Open/show/hide, single instance, tray, shortcut nếu phù hợp.                             | Lifecycle và cleanup; fallback khi shortcut conflict.                                               |
| 4      | Basic configuration và phần shell tùy chọn nếu cần.                                   | Preferences có defaults/version; transcript/workspace chỉ là UI.                                  |
| 5      | Native capabilities/CSP và accessibility.                                                  | Quyền tối thiểu theo chức năng, bàn phím/focus/nhãn chữ/giảm chuyển động.               |
| 6      | Kiểm thử, hướng dẫn chạy và trình nghiệm thu.                                      | Kết quả tests/build/manual checks, hạn chế còn lại và README desktop cập nhật.              |

Trong `apps/desktop/` dự kiến có `package.json`, npm lockfile, `src/`, `src-tauri/`, Cargo manifest/lockfile, Tauri config và capabilities. Tên file cụ thể theo template đã kiểm chứng; hiện chưa tạo các file implementation này.

Tham chiếu native features: [system tray](https://v2.tauri.app/learn/system-tray/), [global shortcut](https://v2.tauri.app/plugin/global-shortcut/) và [single instance](https://v2.tauri.app/plugin/single-instance/).

## 8. Tiêu chí kiểm thử và nghiệm thu

| ID    | Kiểm tra                      | Kết quả yêu cầu                                                                                                                                                         | Trạng thái thực tế (2026-09-21)                                                                                                                                                                                                                                                                                                                                                                                           |
| ----- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1-00 | Prerequisite gate              | G1–G4 PASS với bằng chứng trước khi bắt đầu UI sản phẩm.                                                                                                         | PASS (xem verification report)                                                                                                                                                                                                                                                                                                                                                                                                |
| P1-01 | Launch và single instance     | Một instance; executable desktop mở được trên Windows; lần mở tiếp theo focus đúng.                                                                              | PASS — instance thứ hai thoát exit 0 ngay, instance đầu focus lại                                                                                                                                                                                                                                                                                                                                                       |
| P1-02 | Greeting                       | Đúng các mốc giờ; bật/tắt có hiệu lực; focus lại không chào trùng.                                                                                            | PASS — quan sát qua screenshot thật; logic focus-lại-không-chào-lặp theo thiết kế (onShow chỉ emit khi hidden→visible)                                                                                                                                                                                                                                                                                             |
| P1-03 | Overlay lifecycle              | Open/show/hide và close-to-tray hoạt động; Exit không để lại process/listener của app.                                                                             | PASS — open/show/hide/close-to-tray xác nhận qua automation;**tray icon Show/Hide/Exit đã xác nhận thủ công bởi chủ dự án ngày 2026-09-21**, đúng hành vi (Exit thoát sạch, không còn process).                                                                                                                                                                                                    |
| P1-04 | Shortcut nếu bật             | Đăng ký/đổi/tắt và cleanup đúng; conflict có thông báo, tray vẫn dùng được. Nếu không hỗ trợ, ghi lý do và fallback.                                 | PASS đầy đủ — nhánh conflict (mặc định`Ctrl+Shift+Space` bị máy dev chiếm dụng, UI báo "Không khả dụng", tray vẫn dùng được) **và** nhánh đăng ký-thành-công đã xác nhận thủ công ngày 2026-09-21 (đổi shortcut, trạng thái "Đã đăng ký", bấm phím mở lại cửa sổ đúng). Phát hiện và sửa 1 bug thật trong lúc xác nhận: xem "Bug đã sửa" bên dưới. |
| P1-05 | Visual states                  | Đủ 5 trạng thái, transition/reset hợp lệ; preview có nhãn; không gọi audio/AI; production UX mặc định không có simulator trừ explicit developer/debug mode. | PASS — transition logic có 17 unit test; simulator chỉ bật khi`import.meta.env.DEV` (không có trong release build)                                                                                                                                                                                                                                                                                                    |
| P1-06 | Desktop configuration          | Preferences giữ sau restart; cấu hình thiếu/hỏng có default và không làm app không mở được.                                                                   | PASS — round-trip load→UI→save qua UI thật→load lại đã xác nhận qua displayName/windowPosition; fallback default có unit test (settings.test.ts)                                                                                                                                                                                                                                                                   |
| P1-07 | Accessibility và DPI          | Bàn phím/focus/nhãn chữ/giảm chuyển động; kiểm tra 100% và 150% DPI.                                                                                              | PASS phần DPI — chủ dự án xác nhận thủ công ngày 2026-09-21 ở cả 100% và 150%, UI không vỡ layout. Chưa test screen reader thật (còn lại, không chặn nghiệm thu).                                                                                                                                                                                                                                       |
| P1-08 | Transcript/workspace nếu làm | Layout và fixture rõ ràng; không kết nối hoặc lưu hội thoại thật.                                                                                                | Không làm trong đợt này (tùy chọn, ngoài baseline)                                                                                                                                                                                                                                                                                                                                                                    |
| P1-09 | Phạm vi và quyền            | App chạy không cần backend, key hoặc database; không xin mic, cấp shell tùy ý hay đọc ổ đĩa rộng.                                                             | PASS — không có provider key, mic permission, hay backend call nào trong code                                                                                                                                                                                                                                                                                                                                             |
| P1-10 | Static checks và build        | Typecheck, frontend build, Rust checks và Tauri native build đạt trên bộ version đã ghi nhận.                                                                       | PASS — typecheck/vitest/vite build/cargo check/tauri build --locked đều exit 0 (bao gồm rebuild sau khi sửa bug quyền shortcut)                                                                                                                                                                                                                                                                                         |

Tự động kiểm tra logic greeting, state transitions, settings fallback và shortcut lifecycle khi triển khai (17 test vitest). Toàn bộ hạng mục cần kiểm tra trên Windows thật (tray, shortcut, DPI) đã được chủ dự án xác nhận thủ công ngày 2026-09-21. Chi tiết đầy đủ: [apps/desktop/README.md](../apps/desktop/README.md#kết-quả-kiểm-tra-thực-tế-2026-09-21).

### Bug đã sửa trong lúc xác nhận thủ công (2026-09-21)

Khi chủ dự án test P1-04 (đổi global shortcut), mọi tổ hợp phím kể cả tổ hợp hiếm/không xung đột (`Alt+Shift+A`, `Ctrl+Alt+Shift+K`) đều báo "Không khả dụng". Nguyên nhân thật: `src-tauri/capabilities/default.json` cấp quyền `global-shortcut:default` — nhưng permission set `default` của plugin `global-shortcut` **rỗng theo thiết kế bảo mật của Tauri** ("No features are enabled by default... it is application specific if specific shortcuts should be registered"), nên mọi lệnh `register()` từ JS đều bị ACL từ chối, và code bắt lỗi đó rồi báo nhầm thành "bị trùng/hệ thống từ chối" giống hệt trường hợp OS conflict thật — hai nguyên nhân không phân biệt được qua UI. Đã sửa bằng cách khai rõ `global-shortcut:allow-register`, `global-shortcut:allow-unregister`, `global-shortcut:allow-is-registered` trong capabilities, rebuild, và chủ dự án xác nhận lại thành công.

## 9. Rủi ro và xử lý

- npm từng lỗi EPERM, C++/SDK chưa được xác nhận: xử lý tại gate; dừng trước code shell nếu chưa đạt.
- Node/dependencies không tương thích: chọn lại bộ version còn hỗ trợ và chạy lại các phần gate bị ảnh hưởng.
- Minimal spike build được nhưng chạy lỗi: G4 chưa PASS; kiểm tra runtime/WebView2 và executable thật.
- Shortcut conflict: cho đổi/tắt, giữ tray; chỉ đưa vào baseline khi phù hợp với môi trường.
- Hide dễ bị hiểu là thoát: hướng dẫn lần đầu và Exit rõ ràng.
- Visual states bị hiểu là chức năng voice thật: preview có nhãn; không tự mô phỏng hoạt động AI trong release.

## 10. Ghi nhận phê duyệt và điểm dừng

- [X] Phase 0 approved by project owner.

- Phase 0 approval date: **2026-09-07**.
- Phase 0 approver: **Project owner**.

- [X] Phase 1 implementation plan approved by project owner.

- Phase 1 approval date: **2026-09-08**.
- Phase 1 approver: **Project owner**.

- [X] Desktop Shell implementation approved by project owner.

- Desktop Shell implementation approval date: **2026-09-16**.

- [X] Prerequisite gate G1–G4 passed.
- [X] Phase 1 implementation started.

- Phase 1 implementation start date: **2026-09-16**.

- [X] Tất cả hạng mục kiểm tra P1-00 → P1-10 đã có kết quả (PASS hoặc ghi rõ ngoài phạm vi); các mục cần xác nhận trên Windows thật (tray, shortcut, DPI) do chủ dự án tự xác nhận ngày 2026-09-21.
- [X] Phase 1 completed / accepted by project owner.
- Phase 1 completion date: **2026-09-21**.
- Phase 1 approver: **Project owner**.

**Current Phase: Phase 2 — Speech Pipeline (chưa bắt đầu; chưa có kế hoạch implementation).**

Phase 1 — Desktop Assistant Shell: ✅ **Completed**, chủ dự án phê duyệt nghiệm thu ngày 2026-09-21.

**STOP sau G1–G4:** nếu gate FAIL/BLOCKED, báo nguyên nhân; nếu tất cả PASS, cập nhật README và vẫn chờ implementation approval. Không tự đánh dấu Phase 1 implementation started.

PHASE 1 PREREQUISITE GATE PASSED — WAITING FOR IMPLEMENTATION APPROVAL

**Cập nhật 2026-09-21:** toàn bộ bảng kiểm thử §8 đã có kết quả PASS, bao gồm các mục trước đó cần xác nhận thủ công (tray icon, shortcut trigger, DPI 100%/150%) — chủ dự án đã tự kiểm tra trực tiếp trên Windows. Một bug thật (thiếu quyền ACL cho `global-shortcut` khiến mọi shortcut bị báo nhầm "không khả dụng") đã được phát hiện trong lúc xác nhận và sửa. Chủ dự án đã phê duyệt nghiệm thu — **Phase 1 completed**.

PHASE 1 — DESKTOP ASSISTANT SHELL: COMPLETED (2026-09-21). NEXT: PHASE 2 — SPEECH PIPELINE CHƯA CÓ KẾ HOẠCH IMPLEMENTATION.
