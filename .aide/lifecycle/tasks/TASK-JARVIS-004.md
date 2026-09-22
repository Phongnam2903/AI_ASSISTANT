---
key: TASK-JARVIS-004
story: STORY-JARVIS-005
status: not_ready
depends_on: [TASK-JARVIS-001, TASK-JARVIS-002, TASK-JARVIS-003]
---

# TASK-JARVIS-004 — G4: Minimal audio pipeline spike

Trong `spikes/audio-pipeline-minimal/` (tách biệt `apps/backend`, giống `spikes/tauri-minimal` ở Phase 1): mic → VAD → STT → phản hồi cố định (hardcode) → TTS → speaker, một vòng trọn vẹn trên Windows thật.

## Bằng chứng PASS bắt buộc

Chạy thật, transcript đúng, audio phát ra loa; đo latency một lượt; xác nhận raw audio không ghi ra đĩa; lệnh/exit code/observation thật.

## Definition of Ready

**NOT READY** — phụ thuộc G1, G2, G3.
