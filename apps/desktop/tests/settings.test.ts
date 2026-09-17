import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, normalizeSettings } from "../src/types/settings";

describe("normalizeSettings", () => {
  it("returns defaults for missing/corrupted input", () => {
    expect(normalizeSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings("not an object")).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(42)).toEqual(DEFAULT_SETTINGS);
  });

  it("falls back per-field when only part of the config is valid", () => {
    const result = normalizeSettings({
      displayName: "Nam",
      greetingEnabled: "yes", // invalid type -> falls back
      shortcutEnabled: false,
      shortcutBinding: "", // empty -> falls back
      windowPosition: { x: "10", y: 20 }, // invalid -> falls back to null
    });

    expect(result).toEqual({
      ...DEFAULT_SETTINGS,
      displayName: "Nam",
      shortcutEnabled: false,
    });
  });

  it("keeps a fully valid configuration as-is (version pinned to current)", () => {
    const valid = {
      version: 999, // ignored; always normalized to the current version
      displayName: "Trợ lý",
      greetingEnabled: false,
      shortcutEnabled: true,
      shortcutBinding: "Alt+Space",
      alwaysOnTop: true,
      reducedMotion: true,
      windowPosition: { x: 100, y: 200 },
    };

    expect(normalizeSettings(valid)).toEqual({ ...valid, version: DEFAULT_SETTINGS.version });
  });
});
