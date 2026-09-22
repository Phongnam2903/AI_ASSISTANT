---
key: NFR-JARVIS-VOICE-001
type: non-functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: proposed
revision: 1
---

# NFR-JARVIS-VOICE-001 — Voice pipeline limits and latency

PCM input 16 kHz/mono/16-bit; đoạn nói tối đa 30 giây (~960 000 byte payload); mỗi frame tối đa 64 KiB gồm envelope; phiên chờ im lặng 60 giây thì kết thúc. Latency đo và báo cáo trung thực ở Phase 2, chưa cam kết số cứng (mục tiêu p95 <4s chính thức thuộc Phase 3, đo ≥30 lượt).

**Proposed** — áp dụng từ Phase 2 (`FR-JARVIS-007`, `FR-JARVIS-008`).
