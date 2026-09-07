# Desktop / backend contracts

Status: Design only. Đặc tả hiện tại nằm tại [agent flow](../../docs/agent-flow.md).

Phase 2 sẽ khóa JSON Schema cho control envelope, phiên bản protocol, event payload, error code, audio framing và giới hạn dữ liệu. Sau đó tạo/kiểm tra kiểu TypeScript và Python từ cùng contract. Binary frame cần ID/sequence riêng để bỏ output từ turn đã hủy.

Chưa có schema hoặc kiểu được generate. Kiểm tra tương thích version, message sai, thứ tự frame, cancellation và size limits là điều kiện triển khai transport.
