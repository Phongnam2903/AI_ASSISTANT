---
key: CMP-JARVIS-DESKTOP
type: l2-component
group: normative
scope: system
system: SYS-JARVIS
status: active
revision: 1
relations:
  implements: [CAP-JARVIS-005, CAP-JARVIS-001]
  covers: [FR-JARVIS-001, FR-JARVIS-002, FR-JARVIS-003, FR-JARVIS-004, FR-JARVIS-005]
---

# CMP-JARVIS-DESKTOP

Status: Active (Phase 1 Completed) · Cập nhật: 2026-09-21

## Responsibility

Tauri desktop shell: compact assistant overlay, system tray, global shortcut, single instance, native lifecycle, settings persistence, và (từ Phase 2) audio capture adapter.

## Internal structure

```text
apps/desktop/
  src/
    adapters/        # NativeAdapter + SettingsRepository interfaces + Tauri implementation
    features/overlay/ # Overlay, SettingsPanel, StatePreview (dev-only)
    state/            # useAssistantShell hook, shortcutPolicy
    config/           # greeting logic
    types/            # AssistantState, AssistantSettings
  src-tauri/
    src/main.rs        # Builder, plugin registration, close-to-tray, single instance
    src/tray.rs         # Tray menu
    capabilities/       # ACL — minimal permissions per NFR-JARVIS-SEC-001
```

## Execution sequence

Xem Execution Guide §F.15 (state machine IDLE→LISTENING→...→IDLE) và `docs/agent-flow.md` cho state machine đầy đủ từ Phase 2.

## Failure modes

- Shortcut conflict → status "unavailable", tray vẫn dùng được (không crash).
- Settings file thiếu/hỏng → fallback default per-field.
- Native window không tạo được → không có fallback hiện tại (chặn hoàn toàn) — chấp nhận được vì đây là entry point duy nhất của Phase 1.

## State boundary

Component này sở hữu: window visibility, tray state, shortcut registration, local settings. Không sở hữu: conversation/voice state (từ Phase 2, thuộc `CMP-JARVIS-VOICE` + Conversation Manager backend).

## Security boundary

Không giữ provider credentials. Không gọi API backend trực tiếp từ component React — mọi native access qua `NativeAdapter` duy nhất (`src/adapters/tauriNativeAdapter.ts`).

## Bằng chứng

`docs/phase-1-implementation-plan.md` §8 (P1-00 → P1-10, tất cả PASS, xác nhận 2026-09-21), `apps/desktop/README.md`.
