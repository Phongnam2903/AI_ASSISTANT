# ADR 0001 — Modular monolith và desktop host

Status: Proposed

Date: 2026-09-07

## Bối cảnh

Trợ lý cá nhân cần native presence và audio nhưng phải dễ phát triển, kiểm thử và thay nhà cung cấp AI. Repository ban đầu chỉ có README, chưa có kiến trúc triển khai cần bảo toàn.

## Quyết định đề xuất

Tauri 2 + React + TypeScript trên desktop, Python + FastAPI trong một backend chia mô-đun. Windows x64 trước. Nghiệp vụ agent/tools/permissions/memory/integrations nằm trong backend; giao tiếp desktop qua WebSocket có xác thực. Phase 1 chỉ shell; backend bắt đầu Phase 2.

Docker/Compose dành cho hạ tầng theo nhu cầu. Bản phát hành đề xuất backend sidecar, kiểm chứng đóng gói ở Phase 3. Các module nghiệp vụ không tự trở thành network services.

## Phương án đã cân nhắc

Web-only dễ khởi động nhưng không đáp ứng đầy đủ tray/shortcut/native lifecycle. Electron là lựa chọn desktop khác nhưng lệch stack người dùng định hướng. Microservices làm tăng quản lý deployment và giao tiếp trước khi có nhu cầu mở rộng độc lập.

## Hệ quả và cách kiểm chứng

Cần Rust/MSVC/WebView2 và Node toolchain trên Windows; phải quản lý hai tiến trình, local auth và protocol version. Phase 1 kiểm tra desktop lifecycle/build, Phase 2 kiểm tra transport/audio, Phase 3 thử sidecar. Tách interface để có thể thay audio/provider mà không đổi UI.

Chi tiết: [architecture](../architecture.md), [Phase 1 plan](../phase-1-implementation-plan.md).
