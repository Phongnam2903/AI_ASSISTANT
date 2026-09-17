import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NativeAdapter } from "../adapters/nativeAdapter";
import type { SettingsRepository } from "../adapters/settingsRepository";
import { buildGreeting } from "../config/greeting";
import { applyShortcutPolicy } from "./shortcutPolicy";
import { ASSISTANT_STATES, canTransition, nextDemoState, type AssistantState } from "../types/assistantState";
import { DEFAULT_SETTINGS, type AssistantSettings } from "../types/settings";

export interface AssistantShell {
  ready: boolean;
  settings: AssistantSettings;
  state: AssistantState;
  greeting: string | null;
  shortcutStatus: "registered" | "unavailable" | "disabled";
  updateSettings: (patch: Partial<AssistantSettings>) => void;
  hide: () => void;
  setState: (next: AssistantState) => void;
  resetFromError: () => void;
  runDemoStep: () => void;
}

export function useAssistantShell(
  nativeAdapter: NativeAdapter,
  settingsRepository: SettingsRepository,
): AssistantShell {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<AssistantSettings>(DEFAULT_SETTINGS);
  const [state, setStateRaw] = useState<AssistantState>("IDLE");
  const [greeting, setGreeting] = useState<string | null>(null);
  const [shortcutStatus, setShortcutStatus] = useState<"registered" | "unavailable" | "disabled">("disabled");
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const setState = useCallback((next: AssistantState) => {
    setStateRaw((current) => (canTransition(current, next) ? next : current));
  }, []);

  const applyShowGreeting = useCallback((current: AssistantSettings) => {
    setGreeting(current.greetingEnabled ? buildGreeting(new Date(), current.displayName) : null);
    setStateRaw((prev) => (prev === "ERROR" ? prev : "IDLE"));
  }, []);

  const greetOnShow = useCallback(() => {
    applyShowGreeting(settingsRef.current);
  }, [applyShowGreeting]);

  // Load persisted settings once, apply always-on-top, and wire the "show" lifecycle event.
  useEffect(() => {
    let disposed = false;
    let unsubscribeShow: (() => void) | undefined;

    (async () => {
      const loaded = await settingsRepository.load();
      if (disposed) return;
      setSettings(loaded);
      settingsRef.current = loaded;
      await nativeAdapter.setAlwaysOnTop(loaded.alwaysOnTop);
      if (loaded.windowPosition) {
        await nativeAdapter.setWindowPosition(loaded.windowPosition);
      }
      // Greet immediately for the initial mount: the window is already visible
      // at launch, and the native "show" event emitted during Rust setup can
      // race ahead of this listener being registered, so it must not be the
      // only path that triggers the first greeting.
      applyShowGreeting(loaded);
      unsubscribeShow = nativeAdapter.onShow(greetOnShow);
      setReady(true);
    })();

    return () => {
      disposed = true;
      unsubscribeShow?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the registered global shortcut in sync with settings.
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    (async () => {
      const result = await applyShortcutPolicy(nativeAdapter, settings, () => {
        nativeAdapter.showWindow();
      });
      if (!cancelled) setShortcutStatus(result);
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, settings.shortcutEnabled, settings.shortcutBinding, nativeAdapter]);

  const updateSettings = useCallback(
    (patch: Partial<AssistantSettings>) => {
      setSettings((current) => {
        const next = { ...current, ...patch };
        settingsRepository.save(next);
        if (patch.alwaysOnTop !== undefined) {
          nativeAdapter.setAlwaysOnTop(patch.alwaysOnTop);
        }
        return next;
      });
    },
    [nativeAdapter, settingsRepository],
  );

  const hide = useCallback(() => {
    (async () => {
      const position = await nativeAdapter.getWindowPosition();
      if (position) {
        setSettings((current) => {
          const next = { ...current, windowPosition: position };
          settingsRepository.save(next);
          return next;
        });
      }
      await nativeAdapter.hideWindow();
    })();
    setStateRaw("IDLE");
  }, [nativeAdapter, settingsRepository]);

  const resetFromError = useCallback(() => setState("IDLE"), [setState]);

  const runDemoStep = useCallback(() => {
    setStateRaw((current) => nextDemoState(current));
  }, []);

  return useMemo(
    () => ({
      ready,
      settings,
      state,
      greeting,
      shortcutStatus,
      updateSettings,
      hide,
      setState,
      resetFromError,
      runDemoStep,
    }),
    [ready, settings, state, greeting, shortcutStatus, updateSettings, hide, setState, resetFromError, runDemoStep],
  );
}

export { ASSISTANT_STATES };
