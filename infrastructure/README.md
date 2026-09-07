# Kiến trúc hạ tầng và Docker

Status: Proposed — design only. Chưa có Dockerfile/Compose thực thi; chưa kéo image hoặc chạy container.

## Topology theo phase

| Thành phần | Chạy ở đâu | Thời điểm |
| --- | --- | --- |
| Tauri/React, microphone, speaker | Windows host | Desktop từ Phase 1, audio từ 2 |
| FastAPI | Host process trong development; sidecar đề xuất cho bản đóng gói | Phase 2–3 |
| Redis | Dịch vụ dữ liệu; Compose profile memory đề xuất | Phase 6 |
| PostgreSQL + pgvector | Một database service có extension vector; Compose profile memory | Phase 6 |
| Backend container tùy chọn | Compose profile backend, API publish loopback | Khi có backend và nhu cầu integration test |

Docker không phải điều kiện chạy desktop Phase 1 hoặc voice Phase 2–3. Modular monolith mô tả cấu trúc nghiệp vụ; container dữ liệu không biến từng mô-đun thành microservice.

## Thiết kế Compose cần hiện thực

Đề xuất profile `memory` cho Redis/PostgreSQL, profile `backend` cho API tùy chọn. Compose profiles cho phép chọn nhóm dịch vụ khi chạy. [Docker documentation](https://docs.docker.com/compose/how-tos/profiles/).

- Pin phiên bản image và lock digest khi tạo cấu hình, không mặc định `latest`. Chưa chọn image/tag khi chưa kiểm chứng tương thích.
- PostgreSQL chứa durable memory và pgvector extension trong cùng database; migration tạo extension/schema/index theo phiên bản đã chọn. pgvector cung cấp vector similarity search cho PostgreSQL. [pgvector upstream](https://github.com/pgvector/pgvector).
- PostgreSQL có named volume; Redis session dùng TTL, persistence tắt theo mặc định. Không dùng cache làm nguồn dữ liệu duy nhất.
- Backend trên host dùng port dữ liệu chỉ publish `127.0.0.1`; backend trong Compose dùng DNS service và port nội bộ, không dùng `localhost` để gọi container khác.
- Service có credentials, healthcheck và readiness timeout. Không đưa secrets vào image/repository hoặc dùng tài khoản production trong local dev.
- Container backend không cần microphone trực tiếp: desktop gửi audio qua giao thức xác thực. Không mount toàn bộ ổ đĩa hoặc Docker socket cho agent.
- Dừng dịch vụ giữ volume theo mặc định; reset/xóa volume là thao tác riêng có phạm vi và xác nhận. Backup/restore PostgreSQL phải thử trước khi dùng persistent memory thật.

## Điều kiện thêm cấu hình chạy được

Khi tới phase tương ứng: chọn/pin image, tạo Compose và mẫu biến cần thiết, chạy `docker compose config`, healthcheck, kết nối API/data, migration, shutdown và backup/restore. Chỉ ghi runtime verified sau khi chạy được.

Audit hiện tại thấy Docker/Compose CLI nhưng không truy cập được daemon trong sandbox; [báo cáo](../docs/phase-0-verification.md) ghi giới hạn này. Thiết kế Docker Phase 0 không phải bằng chứng container đã hoạt động.
