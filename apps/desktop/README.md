# Desktop Assistant

Status: Skeleton only — implementation not started.

Tauri 2 quản lý window/tray/shortcut/lifecycle; React + TypeScript hiển thị presence, greeting, trạng thái và transcript phụ trợ. Windows x64 là target đầu tiên đề xuất.

Phase 1 sẽ tạo manifests/lockfiles, `src/` frontend và `src-tauri/` native. Hiện chưa có các artifact đó, chưa có lệnh `npm run` dùng được. Không cần provider key, microphone hoặc backend cho shell Phase 1.

Phase 2 mới thêm audio adapter, VAD và WebSocket client. Provider secrets chỉ ở backend. Các trạng thái demo Phase 1 có nhãn và không xuất hiện trong release.

Phạm vi, trình tự và kiểm tra: [kế hoạch Phase 1](../../docs/phase-1-implementation-plan.md).
