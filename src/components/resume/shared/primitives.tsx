"use client";

import type { ResumeData } from "@/types/resume";

// Shared rendering primitives used by production templates (Onyx, Bronzor,
// Gengar, etc.). Keeps typography, spacing, bullet shape, and date alignment
// consistent across templates so the quality bar is set in one place.

export const MUTED_INK = "#4B5563"; // gray-600 — default muted color across templates

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyItem = any;

export function hasItems(section: { visible: boolean; items: AnyItem[] } | undefined) {
  return !!section && section.visible && section.items.some((i) => !i.hidden);
}

export function items(section: { items: AnyItem[] } | undefined): AnyItem[] {
  return section ? section.items.filter((i) => !i.hidden) : [];
}

export interface TypoVars {
  bodyFamily: string;
  displayFamily: string;
  body: number;
  small: number;
  nameSize: number;
  sectionSize: number;
}

export function typo(data: ResumeData): TypoVars {
  const bf = data.metadata.typography.body;
  const hf = data.metadata.typography.heading;
  return {
    bodyFamily: `${bf.fontFamily}, Georgia, 'Times New Roman', serif`,
    displayFamily: `${hf.fontFamily}, 'Helvetica Neue', Arial, sans-serif`,
    body: bf.fontSize,
    small: Math.max(9, bf.fontSize - 1),
    nameSize: hf.fontSize,
    sectionSize: Math.max(11, Math.round(bf.fontSize * 1.1)),
  };
}

export interface SectionTitleProps {
  title: string;
  color: string;
  size: number;
  family: string;
  variant?: "ruled" | "accent-bar" | "plain";
  align?: "left" | "center";
}

export function SectionTitle({ title, color, size, family, variant = "ruled", align = "left" }: SectionTitleProps) {
  if (variant === "accent-bar") {
    return (
      <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span style={{ display: "inline-block", width: 22, height: 3, backgroundColor: color, borderRadius: 2 }} />
        <span
          style={{
            fontFamily: family,
            fontSize: size,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color,
            lineHeight: 1.1,
          }}
        >
          {title}
        </span>
      </div>
    );
  }
  if (variant === "plain") {
    return (
      <div
        style={{
          fontFamily: family,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color,
          marginBottom: 6,
          textAlign: align,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          fontFamily: family,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color,
          lineHeight: 1.1,
          paddingBottom: 4,
          borderBottom: `1.5px solid ${color}`,
          textAlign: align,
        }}
      >
        {title}
      </div>
    </div>
  );
}

export function RowTitleDate({
  primary,
  secondary,
  date,
  accent,
  bodyFamily,
  baseSize,
  smallSize,
  muted,
}: {
  primary: string;
  secondary?: string;
  date?: string;
  accent: string;
  bodyFamily: string;
  baseSize: number;
  smallSize: number;
  muted: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: bodyFamily, fontSize: baseSize + 0.5, fontWeight: 700, color: "inherit" }}>{primary}</span>
        {secondary ? (
          <span style={{ fontFamily: bodyFamily, fontSize: baseSize, color: accent, fontWeight: 600 }}>
            {"  ·  "}
            {secondary}
          </span>
        ) : null}
      </div>
      {date ? (
        <span
          style={{
            fontFamily: bodyFamily,
            fontSize: smallSize,
            color: muted,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {date}
        </span>
      ) : null}
    </div>
  );
}

export function MetaLine({
  left,
  right,
  bodyFamily,
  smallSize,
  muted,
}: {
  left?: string;
  right?: string;
  bodyFamily: string;
  smallSize: number;
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
        fontSize: smallSize,
        color: muted,
        marginTop: 1,
        gap: 12,
      }}
    >
      <span>{left}</span>
      {right ? <span style={{ whiteSpace: "nowrap" }}>{right}</span> : null}
    </div>
  );
}

export function BulletList({
  text,
  size,
  lineHeight,
  bulletColor,
}: {
  text: string;
  size: number;
  lineHeight: number;
  bulletColor: string;
}) {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^\s*[\u2022\u25E6\-\*]\s*/, "").trim())
    .filter(Boolean);
  if (!lines.length) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0" }}>
      {lines.map((line, i) => (
        <li
          key={i}
          style={{
            fontSize: size,
            lineHeight,
            paddingLeft: 14,
            position: "relative",
            marginTop: i === 0 ? 0 : 3,
            breakInside: "avoid",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              color: bulletColor,
              fontSize: size + 1,
              lineHeight,
            }}
          >
            {"\u2022"}
          </span>
          {line}
        </li>
      ))}
    </ul>
  );
}
