import { CREDIT_CARDS } from "./CREDIT_DATA";

/** Column order for CSV table + Raw CSV export (identity → basics → links → flags → heavy payloads → audit). */
export const CREDIT_CARD_COLUMN_PRIORITY: readonly string[] = [
  "value",
  "name",
  "id",
  "program",
  "partnerId",
  "pbcoOfferId",
  "token",
  "slug",
  "guid",
  "beaconUserIdentifier",
  "image",
  "applyLink",
  "preApproved",
  "isCrossSell",
  "isActive",
  "cardDisplay",
  "priority",
  "pcoPriority",
  "features",
  "rewardJson",
  "domestic",
  "international",
  "additionalPayload",
  "createdAt",
  "updatedAt",
  "createdBy",
  "updatedBy",
  "sortOrder",
];

const CREDIT_CARD_PRIORITY_SET = new Set(CREDIT_CARD_COLUMN_PRIORITY);

export function orderedCreditCardColumns(cards: typeof CREDIT_CARDS): string[] {
  const keySet = new Set<string>();
  for (const card of cards) {
    for (const k of Object.keys(card)) {
      keySet.add(k);
    }
  }
  const prioritized = CREDIT_CARD_COLUMN_PRIORITY.filter((k) => keySet.has(k));
  const tail = Array.from(keySet)
    .filter((k) => !CREDIT_CARD_PRIORITY_SET.has(k))
    .sort((a, b) => a.localeCompare(b));
  return [...prioritized, ...tail];
}

export function csvEscapeCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = typeof val === "object" ? JSON.stringify(val) : String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function creditCardsToCsv(cards: typeof CREDIT_CARDS, columns: string[]): string {
  if (cards.length === 0 || columns.length === 0) return "";
  const lines = [columns.join(",")];
  for (const card of cards) {
    const row = card as unknown as Record<string, unknown>;
    lines.push(columns.map((col) => csvEscapeCell(row[col])).join(","));
  }
  return lines.join("\n");
}

export function sortCardsByValue(cards: typeof CREDIT_CARDS) {
  return [...cards].sort((a, b) => String(a.value).localeCompare(String(b.value)));
}
