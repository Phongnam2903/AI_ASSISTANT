import { describe, expect, it, vi } from "vitest";
import { applyShortcutPolicy } from "../src/state/shortcutPolicy";

describe("applyShortcutPolicy", () => {
  it("unregisters and reports disabled when shortcutEnabled is false", async () => {
    const unregisterShortcut = vi.fn().mockResolvedValue(undefined);
    const registerShortcut = vi.fn();

    const status = await applyShortcutPolicy(
      { registerShortcut, unregisterShortcut },
      { shortcutEnabled: false, shortcutBinding: "Ctrl+Shift+Space" },
      () => {},
    );

    expect(status).toBe("disabled");
    expect(unregisterShortcut).toHaveBeenCalledWith("Ctrl+Shift+Space");
    expect(registerShortcut).not.toHaveBeenCalled();
  });

  it("registers the configured binding and reports the adapter's result when enabled", async () => {
    const registerShortcut = vi.fn().mockResolvedValue("registered");
    const unregisterShortcut = vi.fn();
    const onTrigger = () => {};

    const status = await applyShortcutPolicy(
      { registerShortcut, unregisterShortcut },
      { shortcutEnabled: true, shortcutBinding: "Ctrl+Shift+Space" },
      onTrigger,
    );

    expect(status).toBe("registered");
    expect(registerShortcut).toHaveBeenCalledWith("Ctrl+Shift+Space", onTrigger);
    expect(unregisterShortcut).not.toHaveBeenCalled();
  });

  it("surfaces an unavailable binding (e.g. OS/global conflict) instead of throwing", async () => {
    const registerShortcut = vi.fn().mockResolvedValue("unavailable");

    const status = await applyShortcutPolicy(
      { registerShortcut, unregisterShortcut: vi.fn() },
      { shortcutEnabled: true, shortcutBinding: "Ctrl+Shift+Space" },
      () => {},
    );

    expect(status).toBe("unavailable");
  });
});
