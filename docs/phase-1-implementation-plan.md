# Phase 1 — Desktop Assistant Shell Implementation Plan

Status: Proposed — awaiting project owner approval.

Ngày: 2026-09-07. Chưa bắt đầu code. Tài liệu này là kết quả để duyệt, không ghi nhận việc triển khai đã được cho phép.

## Kết quả bàn giao

Một ứng dụng desktop Windows x64 có cửa sổ assistant nhỏ, mở/gọi được qua tray và shortcut, chào theo giờ và hiển thị Idle. Có state model cho Listening/Thinking/Speaking/Error và chế độ development trình diễn rõ nhãn. Sản phẩm Phase 1 chưa thu microphone, gọi LLM hoặc phát TTS; speech thật được nghiệm thu ở Phase 2.

Đề xuất stack: Tauri 2 + React + TypeScript + Vite, npm với lockfile. Chọn phiên bản ổn định tương thích và Node LTS còn được hỗ trợ khi bắt đầu scaffold; không khóa phiên bản chỉ dựa vào tool đang có trên máy.

## Phạm vi đề xuất để duyệt

| Hạng mục | Hành vi cụ thể |
| --- | --- |
| Cửa sổ | Khoảng 400 × 560 logical pixels, resize được, có thanh kéo và nút đóng rõ ràng; nền đặc dễ đọc |
| Presence | Khu vực biểu tượng/trạng thái ở trung tâm, greeting và điều khiển bên dưới; transcript phụ có thể thu gọn |
| Single instance | Mở app lần hai focus cửa sổ hiện có |
| Tray | Show/Hide/Exit; đóng cửa sổ = hide; có hướng dẫn lần đầu để biết app còn ở tray |
| Shortcut | Mặc định đề xuất Ctrl+Shift+Space; đổi hoặc tắt trong Settings; conflict có thông báo và fallback tray |
| Greeting | Tiếng Việt theo giờ local, một lần mỗi lần hiện sau trạng thái hidden hoặc khởi chạy; focus khi đang visible không chào lại |
| Trạng thái | Idle thực tế; demo Listening/Thinking/Speaking/Error chỉ ở development harness, có chữ Mô phỏng |
| Settings | Tên hiển thị, bật/tắt greeting, shortcut, giảm chuyển động; lưu preference không nhạy cảm |
| Accessibility | Keyboard/focus, nhãn chữ, tương phản và giảm chuyển động |
| Vòng đời | Hide reset demo/session shell; Exit dọn shortcut/tray/listener và thoát; không autostart ở đăng nhập Windows |

Greeting Phase 1: 05:00–11:59 sáng, 12:00–17:59 chiều, 18:00–21:59 tối, 22:00–04:59 đêm. Phase 2 chuyển khái niệm phiên shell sang session voice; không tạo greeting trùng khi bật microphone trong lần mở hiện tại.

## Điều kiện trước khi triển khai

1. Chủ dự án duyệt hồ sơ Phase 0 và kế hoạch này, ghi ngày/phạm vi duyệt.
2. Kiểm tra npm hoạt động trong môi trường build; chọn Node LTS còn hỗ trợ. Phiên audit hiện tại chạy được Node nhưng npm gặp EPERM.
3. Xác minh Visual Studio C++ Build Tools và Windows SDK; `vswhere` hiện chưa trả về installation thỏa probe C++.
4. Xác minh Rust MSVC và WebView2 bằng một build Tauri sau khi được duyệt. Đã thấy phiên bản trong audit không thay thế cho build test.

Tauri yêu cầu C++ Build Tools và WebView2 trên Windows. [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/). Chọn Node theo [lịch release chính thức](https://nodejs.org/en/about/previous-releases).

Các điểm npm/C++ cần xử lý trước scaffold/build; Docker và uv không phải phụ thuộc Phase 1. Không cài hoặc thay đổi công cụ toàn hệ thống trong Phase 0.

## Thứ tự triển khai sau phê duyệt

| Bước | Công việc | Artifact và kiểm tra |
| --- | --- | --- |
| 1 | Kiểm tra toolchain, scaffold Tauri/React/TS | Manifest/lockfile ở `apps/desktop`; cửa sổ tối thiểu build và mở trên Windows |
| 2 | Presence UI, greeting và state reducer | Components/state/types rõ ràng, clock có thể thay trong kiểm tra |
| 3 | Native lifecycle, single instance, tray, shortcut | Native adapter; xử lý lỗi đăng ký, cleanup và show/focus |
| 4 | Settings và development harness | Preference persistence có version/default; demo gắn nhãn, không có đường gọi trong release |
| 5 | Capabilities/CSP và khả năng tiếp cận | Quyền đúng chức năng; không cấp shell, filesystem rộng hoặc microphone |
| 6 | Kiểm tra và bàn giao | Build/typecheck, kiểm tra hành vi, checklist Windows, hướng dẫn chạy thực tế, kết quả và giới hạn |

Tauri có hỗ trợ [system tray](https://v2.tauri.app/learn/system-tray/), [global shortcut](https://v2.tauri.app/plugin/global-shortcut/) và [single instance](https://v2.tauri.app/plugin/single-instance/). Kế hoạch chọn các khả năng này; chưa kiểm chứng implementation trong dự án.

## Cấu trúc file sẽ tạo ở Phase 1

Trong `apps/desktop`: `package.json`, lockfile npm, cấu hình TypeScript/Vite, frontend `src/`, native `src-tauri/` với Cargo manifest/lockfile, Tauri config và capabilities. Bên trong frontend chia theo assistant, settings và adapter native; chỉ tách package UI khi có nhu cầu dùng lại thật.

Không scaffold backend, LangGraph, database, Docker hoặc provider SDK trong Phase 1. Không thêm key vào frontend. Tên file chi tiết có thể theo template Tauri đã chọn; README desktop phải cập nhật lệnh thật sau scaffold.

## Kiểm tra nghiệm thu

| ID | Kịch bản | Kết quả yêu cầu |
| --- | --- | --- |
| P1-01 | Launch lần đầu và lần hai | Một instance; greeting đúng giờ; focus cửa sổ hiện có |
| P1-02 | Mốc giờ và bật/tắt greeting | Kiểm tra ranh giới giờ; không lặp khi focus; preference giữ sau restart |
| P1-03 | Shortcut, thay shortcut, conflict | Mở/focus; hủy đăng ký shortcut cũ; conflict không làm mất đường tray |
| P1-04 | Close → tray → Show → Exit | Hide có chỉ dẫn lần đầu; mở lại đúng; Exit không còn process/listener của app |
| P1-05 | Demo states và lỗi | Thứ tự hợp lệ, reset khi hide; luôn có nhãn Mô phỏng; release không có demo |
| P1-06 | Settings lỗi hoặc thiếu | Default an toàn, app vẫn mở; không làm hỏng preferences khác |
| P1-07 | Keyboard, focus, DPI, reduce motion | Dùng được không cần chuột; thử 100%/150% DPI, trạng thái có chữ |
| P1-08 | Phạm vi quyền và kết nối | Không yêu cầu mic, provider key hoặc dịch vụ chạy; không quyền shell/đọc ổ đĩa rộng |
| P1-09 | Build và static checks | Typecheck, frontend build, Rust checks và Tauri build đạt với version được ghi |

Tự động kiểm tra logic greeting, state transitions, shortcut lifecycle và settings fallback khi chúng được triển khai. Tray/focus/Exit/DPI cần kiểm tra trên desktop Windows thật; UI mock không đủ chứng minh native behavior. Báo rõ kiểm tra nào tự động, thủ công, chưa chạy hoặc thất bại.

## Rủi ro và cách xử lý

- npm/C++ chưa sẵn sàng trong phiên audit: kiểm tra và xử lý đầu phase; không báo shell build đạt nếu chưa chạy được.
- Shortcut bị ứng dụng khác dùng: thông báo, cho đổi/tắt, luôn giữ tray.
- Hide gây nhầm là thoát: hướng dẫn lần đầu và Exit rõ ràng trong tray.
- State demo bị hiểu là voice thật: nhãn mô phỏng trong dev và loại khỏi release.
- Capture WebView2 chưa kiểm chứng: thực hiện audio spike đầu Phase 2; giữ audio interface độc lập với UI.

## Quyết định phê duyệt

Chủ dự án đang được đề nghị duyệt: Windows x64 trước; Tauri/React/TS; phạm vi shell và greeting chữ; quy tắc close-to-tray; shortcut mặc định có thể đổi; tiêu chí nghiệm thu ở trên. Không bao gồm triển khai các phase sau.

- [ ] Phase 0 approved by project owner.
- [ ] Phase 1 implementation plan approved by project owner.
- Người duyệt: chưa ghi nhận.
- Ngày duyệt: chưa ghi nhận.
- Giới hạn/thay đổi khi duyệt: chưa ghi nhận.

Phase 1 chỉ bắt đầu sau khi phê duyệt được ghi nhận và điều kiện môi trường liên quan được giải quyết.
