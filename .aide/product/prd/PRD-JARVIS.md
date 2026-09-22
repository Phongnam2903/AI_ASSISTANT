---
key: PRD-JARVIS
type: product-requirements
group: normative
scope: system
system: SYS-JARVIS
status: active
revision: 1
relations:
  satisfies: []
---

# PRD-JARVIS

Status: Active · Revision: 1 · Cập nhật: 2026-09-21

Migrated từ `docs/requirements.md` (Phase 0, 2026-09-07) sang định dạng PRD chuẩn của `.aide/`. Nội dung gốc vẫn được giữ tại `docs/requirements.md` cho lịch sử; tài liệu này là bản normative hiện hành từ 2026-09-21.

## Product Goal

### GOAL-JARVIS-001

Cung cấp một Voice-First Desktop Assistant chạy trên Windows x64, cho phép người dùng gọi trợ lý bằng phím tắt/tray, hội thoại bằng giọng nói tiếng Việt nhiều lượt, và — ở các phase sau — thực hiện tác vụ thật qua tool có kiểm soát quyền (permission-gated). Mọi FR trong hệ thống `SYS-JARVIS` đều `satisfies: [GOAL-JARVIS-001]` trừ khi có goal con cụ thể hơn được thêm sau.

## Personas

- **Chủ dự án / người dùng chính:** một cá nhân dùng trợ lý cho công việc hàng ngày trên máy Windows của họ, đồng thời là người phê duyệt mọi thay đổi phạm vi/kiến trúc/release.

## Core User Experience

```text
Invoke
  ↓
Listen
  ↓
Understand
  ↓
Plan
  ↓
Ask permission if needed
  ↓
Act
  ↓
Respond
  ↓
Remember when appropriate
```

Mốc trải nghiệm theo phase:

- **Phase 1 (Completed):** Open → Assistant appears → Greeting dạng chữ → Idle. Trạng thái voice mô phỏng có nhãn, chỉ trong development.
- **Phase 2 (Proposed):** Activate → Microphone permission → Listen → VAD → STT → Fixed response → TTS. Greeting phát qua TTS khi bật âm thanh.
- **Phase 3:** Thay fixed response bằng LLM thật, giữ context nhiều lượt và text fallback — mốc voice AI thực tế đầu tiên.
- **Phase 4+:** Agent thật (LangGraph) có thể đề xuất và thực thi tool, luôn qua permission policy.

## Scope (V1)

Voice là phương thức chính; text hỗ trợ transcript/lịch sử/cấu hình/nhập khi mic không dùng được. Giao diện chính là cửa sổ trợ lý nhỏ (compact overlay) với trạng thái và điều khiển phiên; transcript mở rộng khi cần.

## Non-goals (V1)

- Không cam kết offline hoàn toàn.
- Không cam kết đa nền tảng (macOS/Linux) — Windows x64 trước.
- Không xây microservices — modular monolith.
- Không có wake word trước Phase 9; click/shortcut/tray đủ cho giai đoạn đầu.
- Không có automation/scheduling trước Phase 10.
- Không có vision/screen understanding trước Phase 11.

## KPIs / Non-functional targets

- Một session voice hoạt động, tối đa một turn xử lý tại một thời điểm ở V1.
- Idle/hidden không capture; không lưu raw audio mặc định.
- Shell vẫn dùng được khi backend/provider lỗi — có text fallback.
- Thao tác chính dùng được bằng bàn phím; trạng thái có chữ, không chỉ màu; hỗ trợ giảm chuyển động.
- Mục tiêu chưa đo: focus cửa sổ đang chạy <500ms; Stop dừng playback <300ms.
- Phase 3: mục tiêu p95 từ hết câu đến âm thanh đầu tiên <4 giây trên cấu hình tham chiếu, đo ≥30 lượt, báo phần cứng/mạng/provider/tỷ lệ lỗi.
- Queue audio hữu hạn; đoạn nói tối đa 30 giây; phiên chờ im lặng 60 giây thì kết thúc.

## Constraints

- Windows x64 là nền tảng đầu tiên được xác minh.
- Backend Python + FastAPI, desktop Tauri + React + TypeScript, agent LangGraph (từ Phase 4).
- Không chọn dịch vụ trả phí hoặc cam kết offline khi chưa có kiểm chứng thật.
- Provider credentials chỉ ở backend, không lộ vào frontend bundle/log/transcript.

## Assumptions

- Người dùng có microphone/speaker hoạt động trên máy Windows thật.
- Toolchain (Node, Rust, Python) được xác minh riêng ở prerequisite gate của từng phase, không giả định từ audit cũ.

## Risks

- Chất lượng STT/TTS tiếng Việt (local vs cloud) chưa được đánh giá — xử lý ở Phase 2 G3.
- WebView2 audio capture có thể không đủ tốt — có phương án native adapter dự phòng (xem ADR liên quan).
- Một Agent có quyền gọi tool là rủi ro bảo mật nếu thiếu permission layer — do đó Phase 4 (Agent) luôn đi kèm giới hạn deny-by-default, Phase 5 mới mở rộng quyền ghi.

## Roadmap boundaries

Chi tiết từng phase: [docs/roadmap.md](../../../docs/roadmap.md) (giữ nguyên làm bảng roadmap tổng thể; các Change Set trong `.aide/lifecycle/change-sets/` là đơn vị thực thi chi tiết cho từng phase từ Phase 2 trở đi).

## Bump log

- Revision 1 (2026-09-21): Khởi tạo PRD trong `.aide/`, migrate từ `docs/requirements.md`. Không có thay đổi Goal/KPI/Scope so với bản gốc — chỉ đổi định dạng.
