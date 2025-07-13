export function validateIsNumeric(value: unknown): boolean {
  return typeof value === "string" && /^\d+$/.test(value);
}
