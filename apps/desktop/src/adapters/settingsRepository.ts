import type { AssistantSettings } from "../types/settings";

/**
 * UI code depends only on this interface, never on a concrete persistence
 * mechanism (Desktop Settings Abstraction constraint). Phase 1 stores only
 * local, non-sensitive preferences here — this is not Personal Memory.
 */
export interface SettingsRepository {
  load(): Promise<AssistantSettings>;
  save(settings: AssistantSettings): Promise<void>;
}
