import { load, type Store } from "@tauri-apps/plugin-store";
import type { SettingsRepository } from "./settingsRepository";
import { DEFAULT_SETTINGS, SETTINGS_STORE_KEY, normalizeSettings, type AssistantSettings } from "../types/settings";

const STORE_FILE = "assistant-settings.json";

let storePromise: Promise<Store> | null = null;

function getStore(): Promise<Store> {
  if (!storePromise) {
    storePromise = load(STORE_FILE, { autoSave: false });
  }
  return storePromise;
}

/**
 * Concrete SettingsRepository backed by the Tauri store plugin, which
 * persists a JSON file under the app's local data directory.
 */
export class TauriSettingsRepository implements SettingsRepository {
  async load(): Promise<AssistantSettings> {
    try {
      const store = await getStore();
      const raw = await store.get<AssistantSettings>(SETTINGS_STORE_KEY);
      return normalizeSettings(raw);
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  async save(settings: AssistantSettings): Promise<void> {
    const store = await getStore();
    await store.set(SETTINGS_STORE_KEY, settings);
    await store.save();
  }
}
