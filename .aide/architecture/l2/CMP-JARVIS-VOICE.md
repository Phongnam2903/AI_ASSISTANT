---
key: CMP-JARVIS-VOICE
type: l2-component
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
relations:
  implements: [CAP-JARVIS-001]
  covers: [FR-JARVIS-005, FR-JARVIS-006, FR-JARVIS-007, FR-JARVIS-008, FR-JARVIS-009, FR-JARVIS-010]
---

# CMP-JARVIS-VOICE

Status: Proposed (Phase 2, chờ phê duyệt) · Cập nhật: 2026-09-21

## Responsibility

Speech pipeline: audio capture (desktop side), VAD, STT, TTS adapter, Conversation Manager (session/turn state chuẩn), local authenticated WebSocket API. Chạy phần backend trong `apps/backend/`, phần capture trong `apps/desktop/` (qua Native Adapter).

## Internal structure (dự kiến)

```text
apps/backend/
  app/
    transport/     # FastAPI app, WebSocket endpoint, auth
    voice/          # VAD, STT, TTS adapters sau interface chung
    conversation/    # Session/turn state machine, cancellation, limits
packages/contracts/  # JSON Schema control envelope + audio framing (protocol_version=1)
```

## Execution sequence

```text
Microphone → Audio Capture → VAD → STT → Transcript
→ Fixed response (Phase 2) → TTS → Audio Output
```

## Failure modes

Xem `docs/agent-flow.md` §"Hủy, lỗi và reconnect": mic unavailable, STT timeout, TTS unavailable, audio device loss, cancel/disconnect/reconnect. Một lỗi voice không được làm crash toàn bộ desktop assistant (`CMP-JARVIS-DESKTOP` vẫn hoạt động).

## State boundary

Từ Phase 2, Conversation Manager (backend) là nguồn trạng thái Assistant State chuẩn — desktop không tự suy đoán Speaking/Listening.

## Concurrency / Idempotency

Một session voice hoạt động, tối đa một turn xử lý tại một thời điểm ở V1. Cancel gắn ID; turn mới khi đang busy bị từ chối hoặc phải cancel turn trước. Kết quả unknown cần đối soát, không tự retry.

## Security boundary

Auth theo `NFR-JARVIS-SEC-002`. Raw audio theo `NFR-JARVIS-PRIV-001`. Provider credentials (STT/TTS/VAD key nếu dùng cloud) chỉ ở backend `.env`, không lộ vào frontend/log/transcript.

## Trạng thái triển khai

**Proposed — chưa có code.** Kế hoạch chi tiết: `docs/phase-2-implementation-plan.md` (giữ làm tài liệu tham chiếu kỹ thuật) → thay thế bằng `CHG-JARVIS-2026-001` trong `.aide/lifecycle/change-sets/` làm đơn vị thực thi chính thức từ nay.
