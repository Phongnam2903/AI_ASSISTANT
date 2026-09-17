import { getCurrentWindow } from "@tauri-apps/api/window";
import { PhysicalPosition } from "@tauri-apps/api/dpi";
import { listen } from "@tauri-apps/api/event";
import { isRegistered, register, unregister } from "@tauri-apps/plugin-global-shortcut";
import type { NativeAdapter, ShortcutRegistrationResult } from "./nativeAdapter";
import type { WindowPosition } from "../types/settings";

const SHOW_EVENT = "assistant://show";

/**
 * Concrete NativeAdapter backed by the Tauri v2 window/app APIs and the
 * global-shortcut plugin. All native lifecycle handling for the shell lives
 * here so React components stay free of Tauri-specific calls.
 */
export class TauriNativeAdapter implements NativeAdapter {
  private readonly window = getCurrentWindow();

  async showWindow(): Promise<void> {
    await this.window.show();
    await this.window.setFocus();
  }

  async hideWindow(): Promise<void> {
    await this.window.hide();
  }

  async setAlwaysOnTop(enabled: boolean): Promise<void> {
    await this.window.setAlwaysOnTop(enabled);
  }

  async getWindowPosition(): Promise<WindowPosition | null> {
    try {
      const position = await this.window.outerPosition();
      return { x: position.x, y: position.y };
    } catch {
      return null;
    }
  }

  async setWindowPosition(position: WindowPosition): Promise<void> {
    await this.window.setPosition(new PhysicalPosition(position.x, position.y));
  }

  async registerShortcut(binding: string, onTrigger: () => void): Promise<ShortcutRegistrationResult> {
    try {
      const already = await isRegistered(binding);
      if (already) {
        await unregister(binding);
      }
      await register(binding, (event) => {
        if (event.state === "Pressed") {
          onTrigger();
        }
      });
      return "registered";
    } catch {
      return "unavailable";
    }
  }

  async unregisterShortcut(binding: string): Promise<void> {
    try {
      const already = await isRegistered(binding);
      if (already) {
        await unregister(binding);
      }
    } catch {
      // Best-effort cleanup; nothing to recover from if the shortcut was never registered.
    }
  }

  onShow(handler: () => void): () => void {
    let unlisten: (() => void) | undefined;
    let cancelled = false;
    listen(SHOW_EVENT, () => handler()).then((fn) => {
      if (cancelled) {
        fn();
      } else {
        unlisten = fn;
      }
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
  }
}
