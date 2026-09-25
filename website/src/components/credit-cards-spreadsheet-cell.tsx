import type { ReactNode } from "react";
import { memo } from "react";

function humanizeFieldKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function truncateUrl(url: string, max = 44): string {
  if (url.length <= max) return url;
  return `${url.slice(0, max - 1)}…`;
}

function LinkIfUrl({ value }: { value: string }): ReactNode {
  const v = value.trim();
  if (!isHttpUrl(v)) {
    return <span className="break-words whitespace-pre-wrap">{value}</span>;
  }
  return (
    <a
      href={v}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-medium underline-offset-2 hover:underline break-all"
      title={v}
    >
      {truncateUrl(v)}
    </a>
  );
}

function tryParseJsonString(s: string): unknown | undefined {
  const t = s.trim();
  if (!(t.startsWith("{") || t.startsWith("["))) return undefined;
  try {
    return JSON.parse(t) as unknown;
  } catch {
    return undefined;
  }
}

function isEmptyDeep(v: unknown): boolean {
  if (v === null || v === undefined || v === "") return true;
  if (Array.isArray(v)) return v.length === 0 || v.every(isEmptyDeep);
  if (typeof v === "object") {
    const entries = Object.values(v as Record<string, unknown>).filter((x) => !isEmptyDeep(x));
    return entries.length === 0;
  }
  return false;
}

/** Prefer bullets for short comma-separated taglines (not long prose). */
function renderCommaTagline(s: string): ReactNode | null {
  const trimmed = s.trim();
  if (!trimmed.includes(",") || trimmed.length > 320) return null;
  const parts = trimmed.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 3) return null;
  if (parts.some((p) => p.length > 120)) return null;
  return (
    <ul className="my-0 list-disc space-y-0.5 pl-4">
      {parts.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  );
}

/** Split prose into sentence bullets when it reads better than one wall of text. */
function renderProseBullets(s: string): ReactNode {
  const trimmed = s.trim();

  if (trimmed.length >= 90 && /[.!?]\s/.test(trimmed)) {
    const parts = trimmed.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (
        <ul className="my-0 list-disc space-y-0.5 pl-4">
          {parts.map((p, i) => (
            <li key={i}>{p.trim()}</li>
          ))}
        </ul>
      );
    }
  }

  const commaBullets = renderCommaTagline(trimmed);
  if (commaBullets) return commaBullets;

  return <span className="break-words whitespace-pre-wrap">{trimmed}</span>;
}

function renderStructured(val: unknown, depth = 0): ReactNode {
  if (depth > 14) {
    return <span className="text-muted-foreground text-[10px] italic">Further detail trimmed.</span>;
  }

  if (val === null || val === undefined || val === "") {
    return <span className="text-muted-foreground">—</span>;
  }

  if (typeof val === "boolean") {
    return <span>{val ? "Yes" : "No"}</span>;
  }

  if (typeof val === "number") {
    return <span>{Number.isFinite(val) ? String(val) : "—"}</span>;
  }

  if (typeof val === "string") {
    const parsed = tryParseJsonString(val);
    if (parsed !== undefined && parsed !== val) {
      return renderStructured(parsed, depth + 1);
    }
    if (isHttpUrl(val)) {
      return <LinkIfUrl value={val} />;
    }
    return renderProseBullets(val);
  }

  if (Array.isArray(val)) {
    if (val.length === 0) {
      return <span className="text-muted-foreground">—</span>;
    }
    const primitiveLike = val.every(
      (item) =>
        item === null ||
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean",
    );
    if (primitiveLike) {
      return (
        <ul className="my-0 list-disc space-y-0.5 pl-4">
          {val.map((item, i) => (
            <li key={i}>
              {item === null ? "—" : typeof item === "boolean" ? (item ? "Yes" : "No") : String(item)}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="my-0 list-disc space-y-1.5 pl-4">
        {val.map((item, i) => (
          <li key={i} className="marker:text-foreground">
            {renderStructured(item, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>).filter(([, v]) => !isEmptyDeep(v));
    if (entries.length === 0) {
      return <span className="text-muted-foreground">—</span>;
    }
    return (
      <ul className="my-0 list-disc space-y-1 pl-4 marker:text-muted-foreground">
        {entries.map(([k, v]) => (
          <li key={k} className="marker:text-foreground">
            <span className="text-foreground font-medium">{humanizeFieldKey(k)}:</span>{" "}
            {typeof v === "object" && v !== null && !Array.isArray(v) ? (
              <div className="mt-1 border-muted ml-0 border-l pl-3">{renderStructured(v, depth + 1)}</div>
            ) : (
              renderStructured(v, depth + 1)
            )}
          </li>
        ))}
      </ul>
    );
  }

  return <span>{String(val)}</span>;
}

const FEATURE_KEY_ORDER = [
  "creditCardOneLinerDescription",
  "cardType",
  "creditCardSpecialOfferDetails",
  "bestFeature",
  "cardBenefits",
  "bestSuitedFor",
  "saveOnFeeToolTip",
  "creditCardJoiningFeeAmount",
  "creditCardJoiningFeeAdditionalText",
  "creditCardJoiningFeeDescription",
  "creditCardAnnualFeeAmount",
  "creditCardAnnualFeeAdditionalText",
  "creditCardAnnualFeeDescription",
  "creditCardTermCondition",
  "cardNetwork",
  "isRupay",
  "isSecuredCard",
  "exclusivelyOnPb",
  "redirectUrl",
  "isRedirect",
  "seoLink",
  "voucherEligibility",
  "voucherValue",
  "cardOrientation",
  "cardCategory",
  "cardCategoryDescription",
  "moreInfo",
  "trendingOffers",
  "nameOnCard",
];

function orderedFeatureKeys(features: Record<string, unknown>): string[] {
  const keys = Object.keys(features);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of FEATURE_KEY_ORDER) {
    if (keys.includes(k)) {
      out.push(k);
      seen.add(k);
    }
  }
  for (const k of keys.sort()) {
    if (!seen.has(k)) out.push(k);
  }
  return out;
}

function renderFeaturesSection(features: Record<string, unknown>): ReactNode {
  return (
    <div className="space-y-3">
      {orderedFeatureKeys(features).map((key) => {
        const v = features[key];
        if (isEmptyDeep(v)) return null;
        return (
          <section key={key}>
            <h4 className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wide uppercase">
              {humanizeFieldKey(key)}
            </h4>
            <div className="text-foreground">{renderStructured(v)}</div>
          </section>
        );
      })}
    </div>
  );
}

export const CreditCardSpreadsheetCell = memo(function CreditCardSpreadsheetCell({
  columnKey,
  value,
}: {
  columnKey: string;
  value: unknown;
}) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground">—</span>;
  }

  if (columnKey === "image" || columnKey === "applyLink") {
    if (typeof value === "string") {
      return <LinkIfUrl value={value} />;
    }
  }

  if (columnKey === "features" && typeof value === "object" && value !== null && !Array.isArray(value)) {
    return renderFeaturesSection(value as Record<string, unknown>);
  }

  if (columnKey === "additionalPayload" && typeof value === "string") {
    const parsed = tryParseJsonString(value);
    if (parsed !== undefined) {
      return renderStructured(parsed);
    }
    return renderProseBullets(value);
  }

  return renderStructured(value);
});
