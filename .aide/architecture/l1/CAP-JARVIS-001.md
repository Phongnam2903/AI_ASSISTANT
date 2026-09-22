---
key: CAP-JARVIS-001
type: l1-capability
group: normative
scope: system
system: SYS-JARVIS
status: active
revision: 1
relations:
  covers: [FR-JARVIS-005, FR-JARVIS-006, FR-JARVIS-007, FR-JARVIS-008, FR-JARVIS-009, FR-JARVIS-010]
---

# CAP-JARVIS-001 — Voice Interaction

Người dùng gọi trợ lý và hội thoại bằng giọng nói: invoke → capture → VAD → STT → hiểu → phản hồi → TTS. Bao gồm cả greeting và text fallback khi mic không dùng được.

Owner component: `CMP-JARVIS-DESKTOP` (capture/playback), `CMP-JARVIS-VOICE` (VAD/STT/TTS, từ Phase 2).
