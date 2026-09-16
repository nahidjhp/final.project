import { LanguagesSpoken } from "@/types";


export function formatLanguagesSpoken(value: LanguagesSpoken | undefined | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return Object.entries(value).map(([language, level]) => `${language} (${level})`);
}

export function tutorDisplayName(user: { first_name?: string; last_name?: string; email?: string } | undefined | null): string {
  if (!user) return "Unknown tutor";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return name || user.email || "Unknown tutor";
}

export function formatMoney(amount: string | number, currency: string) {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(n)) return `${amount} ${currency}`;
  return `${n.toLocaleString()} ${currency}`;
}
