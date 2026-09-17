import type { AssistantState } from "../../types/assistantState";

export interface StatePreviewProps {
  state: AssistantState;
  onStep: () => void;
  onTriggerError: () => void;
  onReset: () => void;
}

/**
 * Development State Preview constraint: this panel only renders when the
 * caller confirms developer/debug mode (see App.tsx, gated on import.meta.env.DEV).
 * It never triggers real speech or AI activity — it only cycles the local
 * state machine used for the shell's visual states.
 */
export function StatePreview({ state, onStep, onTriggerError, onReset }: StatePreviewProps) {
  return (
    <div className="dev-preview">
      <div className="dev-preview__label">Mô phỏng (chỉ development)</div>
      <div className="dev-preview__actions">
        <button type="button" onClick={onStep}>
          Trạng thái tiếp theo ({state})
        </button>
        <button type="button" onClick={onTriggerError}>
          Mô phỏng lỗi
        </button>
        <button type="button" onClick={onReset}>
          Reset IDLE
        </button>
      </div>
    </div>
  );
}
