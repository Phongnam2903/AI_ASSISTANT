import { describe, expect, it } from "vitest";
import { canTransition, nextDemoState } from "../src/types/assistantState";

describe("canTransition", () => {
  it("allows the full demo cycle IDLE -> LISTENING -> THINKING -> SPEAKING -> IDLE", () => {
    expect(canTransition("IDLE", "LISTENING")).toBe(true);
    expect(canTransition("LISTENING", "THINKING")).toBe(true);
    expect(canTransition("THINKING", "SPEAKING")).toBe(true);
    expect(canTransition("SPEAKING", "IDLE")).toBe(true);
  });

  it("allows any state to move to ERROR", () => {
    for (const from of ["IDLE", "LISTENING", "THINKING", "SPEAKING"] as const) {
      expect(canTransition(from, "ERROR")).toBe(true);
    }
  });

  it("only allows ERROR to reset to IDLE", () => {
    expect(canTransition("ERROR", "IDLE")).toBe(true);
    expect(canTransition("ERROR", "LISTENING")).toBe(false);
    expect(canTransition("ERROR", "SPEAKING")).toBe(false);
  });

  it("rejects skipping states out of order", () => {
    expect(canTransition("IDLE", "THINKING")).toBe(false);
    expect(canTransition("LISTENING", "SPEAKING")).toBe(false);
  });
});

describe("nextDemoState", () => {
  it("cycles through the simulator sequence and wraps ERROR back to IDLE", () => {
    expect(nextDemoState("IDLE")).toBe("LISTENING");
    expect(nextDemoState("LISTENING")).toBe("THINKING");
    expect(nextDemoState("THINKING")).toBe("SPEAKING");
    expect(nextDemoState("SPEAKING")).toBe("IDLE");
    expect(nextDemoState("ERROR")).toBe("IDLE");
  });
});
