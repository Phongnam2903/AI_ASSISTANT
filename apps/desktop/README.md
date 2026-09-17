# Desktop Assistant Shell

Status: Implementation in progress — Phase 1 baseline built and verified on Windows x64. Chủ dự án duyệt Desktop Shell implementation ngày 2026-09-16.

Tauri 2 quản lý window/tray/shortcut/lifecycle; React + TypeScript hiển thị compact assistant overlay, greeting, trạng thái và cấu hình cơ bản. Windows x64 là target đầu tiên.

## Bộ version đã pin và build/chạy thành công

Kế thừa từ [prerequisite gate](../../docs/phase-1-prerequisite-verification.md); nâng đồng bộ dòng Tauri 2.11.x cho phần cần thêm plugin (JS `@tauri-apps/plugin-*` yêu cầu `@tauri-apps/api ^2.11.0`).

| Thành phần | Version |
| --- | --- |
| Node | 24.20.0 |
| npm | 11.19.0 |
| Rust / Cargo | 1.97.1 (MSVC, x86_64-pc-windows-msvc) |
| MSVC toolset | 14.29.30133 |
| Windows SDK | 10.0.22621.0 |
| React / React DOM | 19.2.8 |
| TypeScript | 5.9.3 |
| Vite | 7.3.1 |
| @vitejs/plugin-react | 5.1.2 |
| vitest | 5.0.1 |
| @tauri-apps/cli | 2.11.4 |
| @tauri-apps/api | 2.11.1 |
| @tauri-apps/plugin-global-shortcut (JS) | 2.3.2 |
| @tauri-apps/plugin-store (JS) | 2.4.5 |
| tauri (Rust crate) | 2.11.5 |
| tauri-build | 2.6.3 |
| tauri-plugin-single-instance | 2.4.4 |
| tauri-plugin-global-shortcut (Rust) | 2.3.2 |
| tauri-plugin-store (Rust) | 2.4.5 |

Mọi dependency trực tiếp đều pin phiên bản chính xác (không dùng `latest`/range) trong `package.json` và `src-tauri/Cargo.toml`; `package-lock.json` và `src-tauri/Cargo.lock` đã được tạo và build/chạy thành công từ các lock này.

## Cấu trúc

```
src/
  adapters/         # SettingsRepository + NativeAdapter interfaces và implementation Tauri
  config/           # Logic greeting theo giờ (deterministic, không LLM/backend)
  features/overlay/ # Overlay.tsx, SettingsPanel.tsx, StatePreview.tsx (dev-only)
  state/            # useAssistantShell hook (state machine + lifecycle), shortcutPolicy
  types/            # AssistantState, AssistantSettings
src-tauri/
  src/main.rs        # Builder, plugin registration, close-to-tray, single instance
  src/tray.rs         # Tray icon: Show/Hide/Exit
  capabilities/default.json
tests/               # vitest — logic thuần (greeting, state transitions, settings fallback, shortcut lifecycle)
scripts/             # verify:toolchain, build-native.ps1, verify-native-runtime.ps1
```

## Tuân thủ 5 architectural constraints

1. **Compact Assistant Overlay:** cửa sổ 400×560 logical px, `resizable: false`, `minWidth/maxWidth` và `minHeight/maxHeight` khóa cứng trong `tauri.conf.json`. Chưa có Full Workspace (ngoài phạm vi baseline).
2. **Development State Preview:** `StatePreview` chỉ render khi `import.meta.env.DEV === true` (App.tsx) — không xuất hiện trong `tauri build` release. Nhãn "Mô phỏng (chỉ development)" rõ ràng; không gọi speech/AI thật.
3. **Desktop Settings Abstraction:** UI chỉ phụ thuộc `SettingsRepository` interface (`src/adapters/settingsRepository.ts`); `TauriSettingsRepository` là implementation duy nhất, dùng `tauri-plugin-store` lưu JSON tại app data dir (`%APPDATA%\dev.personalassistant.desktop\assistant-settings.json` trên Windows). Chỉ lưu preference cục bộ không nhạy cảm — không phải Personal Memory.
4. **Desktop Native Adapter:** UI chỉ phụ thuộc `NativeAdapter` interface (`src/adapters/nativeAdapter.ts`); `TauriNativeAdapter` là nơi duy nhất import `@tauri-apps/api`/plugin. Không component nào gọi Tauri API trực tiếp.
5. **Greeting:** `src/config/greeting.ts`, thuần theo giờ máy + `displayName` cục bộ, không LLM/Calendar/Email/Memory/backend.

## Hành vi đã implement

- Open/show/hide; đóng cửa sổ (nút "Ẩn" hoặc nút X) → ẩn vào tray, không thoát app (`WindowEvent::CloseRequested` → `prevent_close()` + `hide()`).
- System tray: Show / Hide / Exit (`src-tauri/src/tray.rs`); Exit gọi `app.exit(0)` — đường duy nhất thoát thật.
- Single instance: mở lần hai focus lại cửa sổ hiện có (`tauri-plugin-single-instance`), không mở process thứ hai.
- Global shortcut tùy chọn, mặc định đề xuất `CommandOrControl+Shift+Space`, có thể bật/tắt/đổi trong "Cấu hình". Nếu bị hệ thống từ chối (trùng ứng dụng khác), trạng thái hiển thị "Không khả dụng" và tray vẫn dùng được — không chặn app.
- Greeting hiển thị một lần khi mở/show (launch, tray Show, shortcut, second-instance); không chào lặp khi cửa sổ đã visible.
- 5 visual states IDLE/LISTENING/THINKING/SPEAKING/ERROR với state machine giới hạn transition hợp lệ; ERROR có nút "Thử lại" reset về IDLE.
- Cấu hình cơ bản: tên hiển thị, bật/tắt greeting, always-on-top, giảm chuyển động, bật/tắt + đổi tổ hợp phím tắt. Vị trí cửa sổ được nhớ khi ẩn và khôi phục khi mở lại (kích thước giữ cố định theo constraint #1).

## Lệnh

```bash
npm install          # cài từ package-lock.json
npm run typecheck     # tsc --noEmit
npm run test          # vitest run — 17 test logic (greeting/state/settings/shortcut policy)
npm run build          # typecheck + vite build (frontend)
npm run dev             # vite dev server (dùng cho `tauri dev`)
npm run native:build   # verify:toolchain + test + tauri build --no-bundle --locked
```

`scripts/build-native.ps1` kích hoạt đúng MSVC 14.29.30133 / Windows SDK 10.0.22621.0 qua VsDevCmd rồi chạy `native:build`. `scripts/verify-native-runtime.ps1` mở executable đã build, xác minh cửa sổ visible/đúng tiêu đề, và kiểm tra close-to-tray (đóng không thoát) — evidence tại `verification/`.

## Kết quả kiểm tra thực tế (2026-09-16)

| Hạng mục | Kết quả |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run test` (vitest) | PASS — 17/17 test, 4 file |
| `npm run build` (frontend) | PASS |
| `cargo check` (src-tauri) | PASS — không lỗi biên dịch; `tauri-runtime` 2.11.3 / `tauri-runtime-wry` 2.11.4 khớp yêu cầu `tauri` 2.11.5 (không lặp lại lỗi mismatch runtime đã gặp ở spike) |
| `tauri build --no-bundle --locked` (release) | PASS — tạo `src-tauri/target/release/desktop-assistant-shell.exe` |
| Launch native thật, cửa sổ visible, đúng tiêu đề | PASS (`verification/native-runtime.json`, `verification/native-window-launch.png`) |
| Close-to-tray (đóng cửa sổ → ẩn, không thoát process) | PASS — quan sát trực tiếp qua `CloseMainWindow()` + kiểm tra process còn sống |
| Single instance (mở lần hai) | PASS — instance thứ hai thoát ngay (exit 0), instance đầu tiên vẫn sống và được focus |
| Settings round-trip (load → hiển thị UI → lưu qua UI thật → load lại) | PASS — xác nhận qua `displayName`/`windowPosition` phản ánh đúng trên titlebar/greeting sau khi seed và sau khi lưu qua click "Ẩn" thật |
| Greeting đúng mốc giờ + hiển thị `displayName` | PASS (quan sát qua screenshot thật, ví dụ "Chào buổi chiều, Nam Test") |
| Shortcut — trường hợp bị trùng (conflict) | PASS — `CommandOrControl+Shift+Space` bị máy dev hiện tại chiếm dụng; UI hiển thị đúng "Không khả dụng", tray vẫn dùng bình thường |
| Shortcut — trường hợp đăng ký thành công + trigger | **Chưa kết luận được bằng automation** — click chuột tự động vào UI không ổn định trong phiên này do Windows chặn `SetForegroundWindow` từ process không tương tác (xác nhận qua `ForegroundMatches=False`); đây là giới hạn của kịch bản automation, không phải lỗi code (code path giống hệt case đăng ký thất bại, chỉ khác nhánh try/catch dựa trên kết quả OS). Cần người dùng thật bấm thử một lần trên máy Windows để xác nhận đầy đủ theo đúng yêu cầu dự án ("Tray/focus/show/hide/Exit cần kiểm tra trên Windows thật"). |
| Tray menu Show/Hide/Exit — click chuột thật vào tray icon | **Chưa tự động hóa được** trong phiên này (icon tray khó click chính xác qua tọa độ màn hình một cách đáng tin cậy). Logic xử lý dùng chung code path đã verify (cùng gọi `window.show()/hide()`/`app.exit(0)` như các đường đã PASS ở trên). Đề nghị người dùng thử tray icon một lần thủ công. |
| DPI 100%/150% | Chưa kiểm tra tường minh ở cả hai mốc; máy dev hiện chạy ở DPI scale khác 100% (cửa sổ 400×560 logical hiển thị 518×710 physical, khớp tỉ lệ DPI hệ thống) — chưa đổi DPI hệ thống để test riêng từng mốc. |
| Accessibility (bàn phím/focus/nhãn) | Nút có `aria-label`; chưa kiểm tra đầy đủ bằng screen reader thật. |

## Giới hạn còn lại / cần làm tiếp

- Xác nhận thủ công (một lần, trên Windows thật): click tray icon Show/Hide/Exit; đổi shortcut sang tổ hợp không xung đột và bấm thử để xác nhận trigger mở lại cửa sổ.
- Kiểm tra DPI 100% và 150% tường minh (P1-07).
- Full Workspace, transcript area: không làm trong đợt này (tùy chọn theo phạm vi Phase 1).
- Chưa có automation UI test (Playwright/WebDriver) cho các luồng tương tác chuột — hiện chỉ có unit test logic thuần + kiểm tra native lifecycle qua Win32 API script.

## Không nằm trong phạm vi

Microphone, VAD, STT/TTS, LLM/LangGraph/Agent, Memory, PostgreSQL/Redis/pgvector, Gmail/Calendar/GitHub integration, backend/FastAPI/WebSocket — theo đúng ranh giới [kế hoạch Phase 1](../../docs/phase-1-implementation-plan.md).
