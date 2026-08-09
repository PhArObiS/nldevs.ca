const BLOCKED_PATTERNS = [
  /\bf+u+c+k+(?:e+d+|i+n+g+|e+r+|s+)?\b/,
  /\bs+h+i+t+(?:t+y+|s+)?\b/,
  /\bb+i+t+c+h+(?:e+s+)?\b/,
  /\ba+s+s+h+o+l+e+s?\b/,
  /\bc+u+n+t+s?\b/,
  /\bd+i+c+k+s?\b/,
  /\bc+o+c+k+s?\b/,
  /\bp+u+s+s+y+\b/,
  /\bw+h+o+r+e+s?\b/,
  /\bs+l+u+t+s?\b/,
  /\bn+i+g+g+e+r+s?\b/,
  /\bf+a+g+g+o+t+s?\b/,
  /\br+e+t+a+r+d+(?:e+d+|s+)?\b/,
  /\bk+i+k+e+s?\b/,
  /\bs+p+i+c+s?\b/,
  /\bc+h+i+n+k+s?\b/,
];

const COMPACT_BLOCKED_TERMS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "pussy",
  "whore",
  "slut",
  "nigger",
  "faggot",
  "chink",
];

function normalizeInput(value: unknown) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/[!1|]/g, "i")
    .replace(/3/g, "e")
    .replace(/0/g, "o")
    .replace(/[$5]/g, "s")
    .replace(/7/g, "t");
}

export function hasBlockedLanguage(values: unknown[]) {
  return values.some((value) => {
    const normalized = normalizeInput(value);
    if (!normalized) return false;

    const compact = normalized.replace(/[^a-z0-9]+/g, "");
    return (
      BLOCKED_PATTERNS.some((pattern) => pattern.test(normalized)) ||
      COMPACT_BLOCKED_TERMS.some((term) => compact.includes(term))
    );
  });
}

export function findBlockedLanguageFields(fields: Record<string, unknown>) {
  return Object.entries(fields)
    .filter(([, value]) => hasBlockedLanguage([value]))
    .map(([field]) => field);
}
