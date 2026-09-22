---
key: FR-JARVIS-004
type: functional-requirement
group: normative
scope: system
system: SYS-JARVIS
status: satisfied
revision: 1
relations:
  satisfies: [GOAL-JARVIS-001]
  constrained_by: []
---

# FR-JARVIS-004 — Basic desktop configuration

## Description

User can configure display name, greeting on/off, always-on-top, reduced motion, and the global shortcut. Preferences persist across restarts using local, non-sensitive storage (not Personal Memory).

## Acceptance Criteria

### AC-JARVIS-004-01

- given: the user changes a setting in the configuration panel
- when: the app is restarted
- then: the changed value is loaded and reflected in the UI

### AC-JARVIS-004-02

- given: the stored settings file is missing or contains invalid fields
- when: the app starts
- then: it falls back to defaults per field and still opens successfully

## Status thực tế

**Satisfied** — Phase 1. Bằng chứng: `docs/phase-1-implementation-plan.md` §8 P1-06; implementation tại `apps/desktop/src/adapters/settingsRepository.ts` + `tauriSettingsRepository.ts`.
