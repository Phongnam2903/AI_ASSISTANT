import type { WindowPosition } from "../types/settings";

export type ShortcutRegistrationResult = "registered" | "unavailable" | "disabled";

/**
 * The only entry point React components may use to reach native desktop
 * capabilities (Desktop Native Adapter constraint). No component should
 * import @tauri-apps/api or a Tauri plugin directly.
 */
export interface NativeAdapter {
  showWindow(): Promise<void>;
  hideWindow(): Promise<void>;
  setAlwaysOnTop(enabled: boolean): Promise<void>;
  getWindowPosition(): Promise<WindowPosition | null>;
  setWindowPosition(position: WindowPosition): Promise<void>;
  registerShortcut(binding: string, onTrigger: () => void): Promise<ShortcutRegistrationResult>;
  unregisterShortcut(binding: string): Promise<void>;
  /** Fires when the native layer brings the window from hidden to visible (launch, tray Show, shortcut, second instance). */
  onShow(handler: () => void): () => void;
}
