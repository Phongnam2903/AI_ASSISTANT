export type AssistantState = "IDLE" | "LISTENING" | "THINKING" | "SPEAKING" | "ERROR";

export const ASSISTANT_STATES: readonly AssistantState[] = [
  "IDLE",
  "LISTENING",
  "THINKING",
  "SPEAKING",
  "ERROR",
];

const ALLOWED_TRANSITIONS: Record<AssistantState, readonly AssistantState[]> = {
  IDLE: ["LISTENING", "ERROR"],
  LISTENING: ["THINKING", "IDLE", "ERROR"],
  THINKING: ["SPEAKING", "IDLE", "ERROR"],
  SPEAKING: ["IDLE", "ERROR"],
  ERROR: ["IDLE"],
};

export function canTransition(from: AssistantState, to: AssistantState): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

/**
 * Cycle used by the development state preview simulator only:
 * IDLE -> LISTENING -> THINKING -> SPEAKING -> IDLE.
 */
export function nextDemoState(current: AssistantState): AssistantState {
  switch (current) {
    case "IDLE":
      return "LISTENING";
    case "LISTENING":
      return "THINKING";
    case "THINKING":
      return "SPEAKING";
    case "SPEAKING":
      return "IDLE";
    case "ERROR":
      return "IDLE";
  }
}
