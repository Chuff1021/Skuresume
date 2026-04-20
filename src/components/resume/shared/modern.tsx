"use client";

import type { CSSProperties, ReactNode } from "react";
import type { ResumeData } from "@/types/resume";

// Shared rendering primitives for the modern template family (Modern Minimal,
// Executive Classic, Two-Column Technical). Typography, spacing, and accents
// are tuned for server-side PDF rendering via headless Chromium.
//
// Design rules enforced here:
//  - Body 10–12 pt range, name 18–28 pt (clamped from user metadata).
//  - Line height 1.35 body / 1.15 headers.
//  - Letter-spacing -0.01 em body, -0.02 em headers, 0.08 em section titles.
//  - Max two font weights per template; hierarchy comes from weight + tracking.
//  - Bullets are em dashes, small squares, or tight hanging indent — never "•".
//  - Muted ink #52525B (not washed-out); body ink #111111.

export const INK = "#111111";
export const MUTED = "#52525B";
export const HAIRLINE_ALPHA = "33"; // 20% opacity as hex suffix — compatible with hex colors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyItem = any;

export function hasItems(section: { visible: boolean; items: AnyItem[] } | undefined) {
  return !!section && section.visible && section.items.some((i) => !i.hidden);
}

export function items(section: { items: AnyItem[] } | undefined): AnyItem[] {
  return section ? section.items.filter((i) => !i.hidden) : [];
}

export interface ModernTypo {
  bodyFamily: string;
  displayFamily: string;
  body: number;
  small: number;
  micro: number;
  name: number;
  section: number;
  lineBody: number;
  lineHead: number;
}

export function modernTypo(data: ResumeData, opts?: { bodyFallback?: string; displayFallback?: string }): ModernTypo {
  const bf = data.metadata.typography.body;
  const hf = data.metadata.typography.heading;
  const body = Math.max(10, Math.min(12, bf.fontSize));
  const name = Math.max(18, Math.min(28, hf.fontSize));
  const bodyFallback = opts?.bodyFallback ?? "'Source Serif 4', Georgia, serif";
  const displayFallback = opts?.displayFallback ?? "'Inter', system-ui, -apple-system, sans-serif";
  return {
    bodyFamily: `'${bf.fontFamily}', ${bodyFallback}`,
    displayFamily: `'${hf.fontFamily}', ${displayFallback}`,
    body,
    small: Math.max(9, body - 1),
    micro: Math.max(8.5, body - 1.5),
    name,
    section: body + 0.5,
    lineBody: 1.35,
    lineHead: 1.15,
  };
}

// Convert a hex color (#rrggbb) to a value with given alpha in 0..1.
// Falls back gracefully on non-hex input.
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;
  const a = Math.max(0, Math.min(1, alpha));
  const aa = Math.round(a * 255).toString(16).padStart(2, "0");
  return `#${clean}${aa}`;
}

// ---------------- Section Title ----------------

export interface ModernSectionTitleProps {
  title: string;
  ink: string;
  size: number;
  family: string;
  align?: "left" | "center";
  style?: "rule" | "rule-full" | "none";
}

export function ModernSectionTitle({ title, ink, size, family, align = "left", style = "rule-full" }: ModernSectionTitleProps) {
  const label = (
    <span
      style={{
        fontFamily: family,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: ink,
        lineHeight: 1.15,
      }}
    >
      {title}
    </span>
  );
  if (style === "none") {
    return <div style={{ marginBottom: 6, textAlign: align }}>{label}</div>;
  }
  if (style === "rule") {
    return (
      <div style={{ marginBottom: 8, textAlign: align, display: "flex", alignItems: "center", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
        {label}
        <span style={{ flex: 1, height: 0, borderTop: `0.5px solid ${withAlpha(ink, 0.2)}` }} />
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ textAlign: align, paddingBottom: 5, borderBottom: `0.5px solid ${withAlpha(ink, 0.2)}` }}>
        {label}
      </div>
    </div>
  );
}

// ---------------- Row header (title + date) ----------------

export function ItemRow({
  primary,
  secondary,
  date,
  bodyFamily,
  size,
  small,
  muted,
  accent,
}: {
  primary: string;
  secondary?: string;
  date?: string;
  bodyFamily: string;
  size: number;
  small: number;
  muted: string;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: bodyFamily, fontSize: size, fontWeight: 600, letterSpacing: "-0.01em" }}>{primary}</span>
        {secondary ? (
          <span style={{ fontFamily: bodyFamily, fontSize: size, fontWeight: 400, color: accent || "inherit", letterSpacing: "-0.01em" }}>
            {"  —  "}
            {secondary}
          </span>
        ) : null}
      </div>
      {date ? (
        <span
          style={{
            fontFamily: bodyFamily,
            fontSize: small,
            color: muted,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          {date}
        </span>
      ) : null}
    </div>
  );
}

export function MetaRow({
  left,
  right,
  bodyFamily,
  small,
  muted,
}: {
  left?: string;
  right?: string;
  bodyFamily: string;
  small: number;
  muted: string;
}) {
  if (!left && !right) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontFamily: bodyFamily,
        fontSize: small,
        color: muted,
        marginTop: 2,
        gap: 12,
        letterSpacing: "-0.005em",
      }}
    >
      <span>{left}</span>
      {right ? <span style={{ whiteSpace: "nowrap" }}>{right}</span> : null}
    </div>
  );
}

// ---------------- Bullets ----------------

export type BulletMark = "em-dash" | "square" | "hang";

export function normalizeBullets(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.replace(/^\s*[\u2022\u25E6\-\*\u2013\u2014]\s*/, "").trim())
    .filter(Boolean);
}

export function ModernBullets({
  text,
  size,
  lineHeight,
  ink,
  muted,
  mark = "em-dash",
  bodyFamily,
}: {
  text: string;
  size: number;
  lineHeight: number;
  ink: string;
  muted: string;
  mark?: BulletMark;
  bodyFamily: string;
}) {
  const lines = normalizeBullets(text);
  if (!lines.length) return null;
  const markChar = mark === "square" ? "\u25AA" : mark === "em-dash" ? "\u2014" : "";
  const markColor = mark === "square" ? ink : muted;
  const indent = mark === "hang" ? 12 : mark === "square" ? 14 : 18;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "5px 0 0 0" }}>
      {lines.map((line, i) => (
        <li
          key={i}
          style={{
            fontFamily: bodyFamily,
            fontSize: size,
            lineHeight,
            paddingLeft: indent,
            position: "relative",
            marginTop: i === 0 ? 0 : 3,
            breakInside: "avoid",
            letterSpacing: "-0.005em",
            color: ink,
          }}
        >
          {markChar ? (
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: markColor,
                fontSize: mark === "square" ? size * 0.85 : size,
                lineHeight,
                fontWeight: 400,
              }}
            >
              {markChar}
            </span>
          ) : null}
          {line}
        </li>
      ))}
    </ul>
  );
}

// ---------------- Section wrapper ----------------

export function Section({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <section style={{ breakInside: "avoid", ...style }}>{children}</section>;
}
