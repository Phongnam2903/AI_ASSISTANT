import { describe, expect, it } from "vitest";
import { buildGreeting, getGreetingPeriod } from "../src/config/greeting";

describe("getGreetingPeriod", () => {
  it("maps the morning boundary 05:00-11:59", () => {
    expect(getGreetingPeriod(5)).toBe("morning");
    expect(getGreetingPeriod(11)).toBe("morning");
  });

  it("maps the afternoon boundary 12:00-17:59", () => {
    expect(getGreetingPeriod(12)).toBe("afternoon");
    expect(getGreetingPeriod(17)).toBe("afternoon");
  });

  it("maps the evening boundary 18:00-21:59", () => {
    expect(getGreetingPeriod(18)).toBe("evening");
    expect(getGreetingPeriod(21)).toBe("evening");
  });

  it("maps the night boundary 22:00-04:59, wrapping past midnight", () => {
    expect(getGreetingPeriod(22)).toBe("night");
    expect(getGreetingPeriod(23)).toBe("night");
    expect(getGreetingPeriod(0)).toBe("night");
    expect(getGreetingPeriod(4)).toBe("night");
  });
});

describe("buildGreeting", () => {
  it("appends the trimmed display name when present", () => {
    const date = new Date(2026, 0, 1, 8, 0, 0);
    expect(buildGreeting(date, "  Nam  ")).toBe("Chào buổi sáng, Nam");
  });

  it("omits the name suffix when displayName is empty", () => {
    const date = new Date(2026, 0, 1, 20, 0, 0);
    expect(buildGreeting(date, "")).toBe("Chào buổi tối");
  });
});
