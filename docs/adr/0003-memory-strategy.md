# ADR 0003 — Bộ nhớ ba tầng, triển khai theo nhu cầu

Status: Proposed

Date: 2026-09-07

## Bối cảnh

Hội thoại nhiều lượt cần context tức thời; nhớ người dùng qua nhiều phiên cần storage và chính sách riêng. Không nên bắt desktop/speech phụ thuộc database ngay từ đầu.

## Quyết định đề xuất

Phase 2–3 giữ context/transcript trong RAM của phiên, mất khi end/disconnect. Phase 6 bổ sung:

| Tầng | Công nghệ | Trách nhiệm |
| --- | --- | --- |
| Session/cache | Redis với TTL, persistence tắt mặc định | Context tạm thời, không là nguồn dữ liệu duy nhất |
| Durable memory | PostgreSQL | Dữ liệu người dùng chủ động lưu, provenance, preferences/lịch sử được bật |
| Semantic retrieval | pgvector trong PostgreSQL | Embedding có scope và liên kết bản gốc |

Không ghi raw audio mặc định, không lưu key hoặc suy luận nhạy cảm tự động. Xóa bản gốc phải xử lý embedding/cache; backup có thời hạn lưu công bố riêng. Chỉ ghi memory theo chính sách quyền.

## Phương án và hệ quả

Chỉ RAM đơn giản nhưng không nhớ qua phiên. SQLite có thể giảm hạ tầng nhưng lệch stack người dùng đề xuất. Vector database riêng tăng vận hành; PostgreSQL + extension giữ dữ liệu và truy hồi trong cùng hệ thống.

Phase 6 phải kiểm tra migrations, TTL, scope retrieval, write approval, xóa lan truyền, backup/restore. Chưa chọn embedding model/dimension; thay model cần chiến lược re-embed, không trộn vector không tương thích.

Chi tiết: [security](../security.md), [infrastructure](../../infrastructure/README.md).
