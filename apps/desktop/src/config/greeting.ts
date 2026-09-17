export type GreetingPeriod = "morning" | "afternoon" | "evening" | "night";

/**
 * Boundaries from the approved Phase 1 plan (docs/phase-1-implementation-plan.md):
 * 05:00-11:59 morning, 12:00-17:59 afternoon, 18:00-21:59 evening, 22:00-04:59 night.
 */
export function getGreetingPeriod(hour: number): GreetingPeriod {
  if (hour >= 5 && hour <= 11) return "morning";
  if (hour >= 12 && hour <= 17) return "afternoon";
  if (hour >= 18 && hour <= 21) return "evening";
  return "night";
}

const GREETING_BASE: Record<GreetingPeriod, string> = {
  morning: "Chào buổi sáng",
  afternoon: "Chào buổi chiều",
  evening: "Chào buổi tối",
  night: "Chào bạn, khuya rồi đấy",
};

export function buildGreeting(date: Date, displayName: string): string {
  const base = GREETING_BASE[getGreetingPeriod(date.getHours())];
  const trimmedName = displayName.trim();
  return trimmedName.length > 0 ? `${base}, ${trimmedName}` : base;
}
