import type { NativeAdapter, ShortcutRegistrationResult } from "../adapters/nativeAdapter";
import type { AssistantSettings } from "../types/settings";

/**
 * Pure shortcut lifecycle policy, kept separate from the React hook so it is
 * unit-testable without a DOM/React test environment: disabled settings
 * always unregister and report "disabled"; enabled settings (re)register the
 * configured binding and report whatever the native adapter observed.
 */
export async function applyShortcutPolicy(
  adapter: Pick<NativeAdapter, "registerShortcut" | "unregisterShortcut">,
  settings: Pick<AssistantSettings, "shortcutEnabled" | "shortcutBinding">,
  onTrigger: () => void,
): Promise<ShortcutRegistrationResult> {
  if (!settings.shortcutEnabled) {
    await adapter.unregisterShortcut(settings.shortcutBinding);
    return "disabled";
  }
  return adapter.registerShortcut(settings.shortcutBinding, onTrigger);
}
