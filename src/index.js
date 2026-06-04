export class FlagEngine {
  constructor(flags = []) { this.flags = new Map(flags.map((flag) => [flag.key, flag])); }
  evaluate(key, user) {
    const flag = this.flags.get(key);
    if (!flag || !flag.enabled) return { enabled: false, reason: "disabled" };
    if (flag.targets?.includes(user.id)) return { enabled: true, reason: "targeted" };
    if (flag.rules?.some((rule) => user[rule.field] === rule.equals)) return { enabled: true, reason: "rule" };
    const bucket = hash(`${key}:${user.id}`) % 100;
    return { enabled: bucket < (flag.rollout || 0), reason: "rollout", bucket };
  }
}
export function hash(text) {
  let value = 2166136261;
  for (const char of text) { value ^= char.charCodeAt(0); value = Math.imul(value, 16777619); }
  return value >>> 0;
}
