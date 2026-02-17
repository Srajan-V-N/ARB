const ACTION_VERBS = new Set([
  "built", "developed", "designed", "implemented", "led", "improved",
  "created", "optimized", "automated", "managed", "launched", "reduced",
  "increased", "deployed", "integrated", "migrated", "refactored",
  "streamlined", "maintained", "analyzed", "architected", "configured",
  "coordinated", "delivered", "established", "executed", "facilitated",
  "generated", "mentored", "negotiated", "orchestrated", "pioneered",
  "resolved", "scaled", "secured", "simplified", "spearheaded",
  "supervised", "tested", "transformed", "upgraded",
]);

const NUMBER_PATTERN = /\d+%?|[0-9]+[kKmM+]/;

export function getGuidance(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const hints: string[] = [];

  const firstWord = trimmed.split(/\s/)[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (firstWord && !ACTION_VERBS.has(firstWord)) {
    hints.push("Start with a strong action verb.");
  }

  if (!NUMBER_PATTERN.test(trimmed)) {
    hints.push("Add measurable impact (numbers).");
  }

  return hints;
}
