export interface WindowPosition {
  x: number;
  y: number;
}

export interface AssistantSettings {
  version: number;
  displayName: string;
  greetingEnabled: boolean;
  shortcutEnabled: boolean;
  shortcutBinding: string;
  alwaysOnTop: boolean;
  reducedMotion: boolean;
  windowPosition: WindowPosition | null;
}

export const SETTINGS_VERSION = 1;
export const SETTINGS_STORE_KEY = "assistant-settings";

export const DEFAULT_SETTINGS: AssistantSettings = {
  version: SETTINGS_VERSION,
  displayName: "",
  greetingEnabled: true,
  shortcutEnabled: true,
  shortcutBinding: "CommandOrControl+Shift+Space",
  alwaysOnTop: false,
  reducedMotion: false,
  windowPosition: null,
};

function isValidPosition(value: unknown): value is WindowPosition {
  if (!value || typeof value !== "object") return false;
  const position = value as Partial<WindowPosition>;
  return typeof position.x === "number" && typeof position.y === "number";
}

/**
 * Missing or corrupted stored settings always fall back to defaults per field,
 * so a broken/partial config file never blocks the app from opening (P1-06).
 */
export function normalizeSettings(input: unknown): AssistantSettings {
  if (!input || typeof input !== "object") {
    return { ...DEFAULT_SETTINGS };
  }
  const raw = input as Partial<AssistantSettings>;
  return {
    version: SETTINGS_VERSION,
    displayName: typeof raw.displayName === "string" ? raw.displayName : DEFAULT_SETTINGS.displayName,
    greetingEnabled:
      typeof raw.greetingEnabled === "boolean" ? raw.greetingEnabled : DEFAULT_SETTINGS.greetingEnabled,
    shortcutEnabled:
      typeof raw.shortcutEnabled === "boolean" ? raw.shortcutEnabled : DEFAULT_SETTINGS.shortcutEnabled,
    shortcutBinding:
      typeof raw.shortcutBinding === "string" && raw.shortcutBinding.trim().length > 0
        ? raw.shortcutBinding
        : DEFAULT_SETTINGS.shortcutBinding,
    alwaysOnTop: typeof raw.alwaysOnTop === "boolean" ? raw.alwaysOnTop : DEFAULT_SETTINGS.alwaysOnTop,
    reducedMotion: typeof raw.reducedMotion === "boolean" ? raw.reducedMotion : DEFAULT_SETTINGS.reducedMotion,
    windowPosition: isValidPosition(raw.windowPosition) ? raw.windowPosition : DEFAULT_SETTINGS.windowPosition,
  };
}
