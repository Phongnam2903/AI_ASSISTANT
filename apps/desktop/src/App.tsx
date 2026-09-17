import { useMemo, useState } from "react";
import { Overlay } from "./features/overlay/Overlay";
import { StatePreview } from "./features/overlay/StatePreview";
import { SettingsPanel } from "./features/overlay/SettingsPanel";
import { useAssistantShell } from "./state/useAssistantShell";
import { TauriNativeAdapter } from "./adapters/tauriNativeAdapter";
import { TauriSettingsRepository } from "./adapters/tauriSettingsRepository";

// Development State Preview constraint: import.meta.env.DEV is false in a
// release build (tauri build), so the simulator never ships in production.
const DEV_PREVIEW_ENABLED = import.meta.env.DEV;

export function App() {
  const nativeAdapter = useMemo(() => new TauriNativeAdapter(), []);
  const settingsRepository = useMemo(() => new TauriSettingsRepository(), []);
  const shell = useAssistantShell(nativeAdapter, settingsRepository);
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!shell.ready) {
    return null;
  }

  return (
    <Overlay
      displayName={shell.settings.displayName}
      greeting={shell.greeting}
      state={shell.state}
      reducedMotion={shell.settings.reducedMotion}
      settingsOpen={settingsOpen}
      onHide={shell.hide}
      onResetFromError={shell.resetFromError}
      onToggleSettings={() => setSettingsOpen((open) => !open)}
      settingsPanel={
        <SettingsPanel
          settings={shell.settings}
          shortcutStatus={shell.shortcutStatus}
          onChange={shell.updateSettings}
          onClose={() => setSettingsOpen(false)}
        />
      }
    >
      {DEV_PREVIEW_ENABLED ? (
        <StatePreview
          state={shell.state}
          onStep={shell.runDemoStep}
          onTriggerError={() => shell.setState("ERROR")}
          onReset={shell.resetFromError}
        />
      ) : null}
    </Overlay>
  );
}
