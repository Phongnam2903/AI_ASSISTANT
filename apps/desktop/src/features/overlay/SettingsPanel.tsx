import type { AssistantSettings } from "../../types/settings";
import type { ShortcutRegistrationResult } from "../../adapters/nativeAdapter";

export interface SettingsPanelProps {
  settings: AssistantSettings;
  shortcutStatus: ShortcutRegistrationResult | "disabled";
  onChange: (patch: Partial<AssistantSettings>) => void;
  onClose: () => void;
}

const SHORTCUT_STATUS_LABEL: Record<string, string> = {
  registered: "Đã đăng ký",
  unavailable: "Không khả dụng (bị trùng hoặc hệ thống từ chối)",
  disabled: "Đang tắt",
};

export function SettingsPanel({ settings, shortcutStatus, onChange, onClose }: SettingsPanelProps) {
  return (
    <div className="settings-panel">
      <div className="settings-panel__header">
        <span>Cấu hình</span>
        <button type="button" onClick={onClose} aria-label="Đóng cấu hình">
          Đóng
        </button>
      </div>

      <label className="settings-panel__field">
        <span>Tên hiển thị</span>
        <input
          type="text"
          value={settings.displayName}
          maxLength={40}
          onChange={(event) => onChange({ displayName: event.target.value })}
        />
      </label>

      <label className="settings-panel__checkbox">
        <input
          type="checkbox"
          checked={settings.greetingEnabled}
          onChange={(event) => onChange({ greetingEnabled: event.target.checked })}
        />
        <span>Chào khi mở trợ lý</span>
      </label>

      <label className="settings-panel__checkbox">
        <input
          type="checkbox"
          checked={settings.alwaysOnTop}
          onChange={(event) => onChange({ alwaysOnTop: event.target.checked })}
        />
        <span>Luôn hiển thị trên cùng</span>
      </label>

      <label className="settings-panel__checkbox">
        <input
          type="checkbox"
          checked={settings.reducedMotion}
          onChange={(event) => onChange({ reducedMotion: event.target.checked })}
        />
        <span>Giảm chuyển động</span>
      </label>

      <label className="settings-panel__checkbox">
        <input
          type="checkbox"
          checked={settings.shortcutEnabled}
          onChange={(event) => onChange({ shortcutEnabled: event.target.checked })}
        />
        <span>Bật phím tắt mở trợ lý</span>
      </label>

      <label className="settings-panel__field">
        <span>Tổ hợp phím tắt</span>
        <input
          type="text"
          value={settings.shortcutBinding}
          disabled={!settings.shortcutEnabled}
          onChange={(event) => onChange({ shortcutBinding: event.target.value })}
        />
      </label>

      <p className="settings-panel__status">
        Trạng thái phím tắt: {SHORTCUT_STATUS_LABEL[shortcutStatus] ?? shortcutStatus}
      </p>
    </div>
  );
}
