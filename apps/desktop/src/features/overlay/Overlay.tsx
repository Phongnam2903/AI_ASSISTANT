import type { ReactNode } from "react";
import type { AssistantState } from "../../types/assistantState";
import "./overlay.css";

const STATE_LABEL: Record<AssistantState, string> = {
  IDLE: "Sẵn sàng",
  LISTENING: "Đang nghe",
  THINKING: "Đang xử lý",
  SPEAKING: "Đang nói",
  ERROR: "Lỗi",
};

export interface OverlayProps {
  displayName: string;
  greeting: string | null;
  state: AssistantState;
  reducedMotion: boolean;
  settingsOpen: boolean;
  onHide: () => void;
  onResetFromError: () => void;
  onToggleSettings: () => void;
  settingsPanel: ReactNode;
  children?: ReactNode;
}

export function Overlay({
  displayName,
  greeting,
  state,
  reducedMotion,
  settingsOpen,
  onHide,
  onResetFromError,
  onToggleSettings,
  settingsPanel,
  children,
}: OverlayProps) {
  return (
    <div className={`overlay${reducedMotion ? " overlay--reduced-motion" : ""}`}>
      <div className="overlay__titlebar" data-tauri-drag-region>
        <span className="overlay__title">{displayName.trim() || "Personal AI Assistant"}</span>
        <span className="overlay__titlebar-actions">
          <button type="button" onClick={onToggleSettings} aria-label="Cấu hình trợ lý">
            {settingsOpen ? "Trợ lý" : "Cấu hình"}
          </button>
          <button type="button" onClick={onHide} aria-label="Ẩn cửa sổ trợ lý">
            Ẩn
          </button>
        </span>
      </div>

      {settingsOpen ? (
        settingsPanel
      ) : (
        <div className="overlay__body">
          <p className="overlay__greeting" aria-live="polite">
            {greeting ?? ""}
          </p>

          <div className="overlay__state">
            <div className={`overlay__state-dot overlay__state-dot--${state}`} aria-hidden="true" />
            <span className="overlay__state-label">{STATE_LABEL[state]}</span>
          </div>

          {state === "ERROR" ? (
            <div className="overlay__error-actions">
              <button type="button" onClick={onResetFromError}>
                Thử lại
              </button>
            </div>
          ) : null}
        </div>
      )}

      <div className="overlay__footer">Vẫn chạy trong system tray sau khi ẩn cửa sổ.</div>

      {children}
    </div>
  );
}
