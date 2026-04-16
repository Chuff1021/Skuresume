"use client";

import type { ResumeData } from "@/types/resume";
import {
  BulletList,
  MUTED_INK,
  MetaLine,
  RowTitleDate,
  SectionTitle,
  hasItems,
  items,
  typo,
} from "../shared/primitives";

// Bronzor — classic centered single-column, the traditional "consulting /
// finance" resume silhouette. Centered name header, thick accent underline,
// centered section headings with an accent bar underneath.

export function BronzorTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, metadata, picture } = data;
  const accent = metadata.design.colors.primary;
  const muted = MUTED_INK;
  const t = typo(data);
  const m = metadata.page;
  const hasPhoto = !!picture.url && !picture.effects.hidden;

  const contactBits: string[] = [];
  if (basics.location) contactBits.push(basics.location);
  if (basics.email) contactBits.push(basics.email);
  if (basics.phone) contactBits.push(basics.phone);
  if (basics.url.url) contactBits.push(basics.url.label || basics.url.url.replace(/^https?:\/\//, ""));

  return (
    <div
      className="resume-bronzor"
      style={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: metadata.design.colors.background,
        color: metadata.design.colors.text,
        fontFamily: t.bodyFamily,
        fontSize: t.body,
        lineHeight: metadata.typography.body.lineHeight,
        padding: `${m.marginY}px ${m.marginX}px`,
        display: "flex",
        flexDirection: "column",
        gap: Math.max(14, m.gapY),
        boxSizing: "border-box",
      }}
    >
      {/* Centered header */}
      <header style={{ textAlign: "center", paddingBottom: 14, borderBottom: `2px solid ${accent}` }}>
        {hasPhoto ? (
          <img
            src={picture.url}
            alt=""
            style={{
              width: picture.size,
              height: picture.size,
              borderRadius: picture.borderRadius ? picture.borderRadius : 999,
              objectFit: "cover",
              marginBottom: 10,
              border: picture.effects.border ? `2px solid ${accent}` : "none",
              filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
            }}
          />
        ) : null}
        <h1
          style={{
            fontFamily: t.displayFamily,
            fontSize: t.nameSize,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: accent,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline ? (
          <div
            style={{
              fontFamily: t.bodyFamily,
              fontSize: t.body + 1,
              fontStyle: "italic",
              color: muted,
              marginTop: 4,
            }}
          >
            {basics.headline}
          </div>
        ) : null}
        {contactBits.length ? (
          <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, color: muted, marginTop: 8 }}>
            {contactBits.map((c, i) => (
              <span key={i}>
                {i > 0 ? <span style={{ margin: "0 8px", color: accent }}>{"|"}</span> : null}
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Summary */}
      {summary ? (
        <section>
          <SectionTitle title="Summary" color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <p
            style={{
              fontFamily: t.bodyFamily,
              fontSize: t.body,
              lineHeight: 1.5,
              margin: 0,
              whiteSpace: "pre-wrap",
              textAlign: "center",
            }}
          >
            {summary}
          </p>
        </section>
      ) : null}

      {/* Experience */}
      {hasItems(data.sections.experience) ? (
        <section>
          <SectionTitle title={data.sections.experience.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items(data.sections.experience).map((item) => (
              <div key={item.id} className="resume-section-item">
                <RowTitleDate
                  primary={item.position || ""}
                  date={item.date}
                  accent={accent}
                  bodyFamily={t.bodyFamily}
                  baseSize={t.body}
                  smallSize={t.small}
                  muted={muted}
                />
                <MetaLine
                  left={[item.company, item.location].filter(Boolean).join(" — ")}
                  bodyFamily={t.bodyFamily}
                  smallSize={t.small}
                  muted={muted}
                />
                {item.description ? (
                  <BulletList text={item.description} size={t.body} lineHeight={1.45} bulletColor={accent} />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Projects */}
      {hasItems(data.sections.projects) ? (
        <section>
          <SectionTitle title={data.sections.projects.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items(data.sections.projects).map((item) => (
              <div key={item.id} className="resume-section-item">
                <RowTitleDate
                  primary={item.name || ""}
                  date={item.date}
                  accent={accent}
                  bodyFamily={t.bodyFamily}
                  baseSize={t.body}
                  smallSize={t.small}
                  muted={muted}
                />
                {item.keywords?.length ? (
                  <MetaLine
                    left={item.keywords.join(" · ")}
                    bodyFamily={t.bodyFamily}
                    smallSize={t.small}
                    muted={muted}
                  />
                ) : null}
                {item.description ? (
                  <BulletList text={item.description} size={t.body} lineHeight={1.45} bulletColor={accent} />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Education */}
      {hasItems(data.sections.education) ? (
        <section>
          <SectionTitle title={data.sections.education.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items(data.sections.education).map((item) => (
              <div key={item.id} className="resume-section-item">
                <RowTitleDate
                  primary={[item.studyType, item.area].filter(Boolean).join(", ") || item.institution || ""}
                  date={item.date}
                  accent={accent}
                  bodyFamily={t.bodyFamily}
                  baseSize={t.body}
                  smallSize={t.small}
                  muted={muted}
                />
                <MetaLine
                  left={item.institution}
                  right={item.score ? `GPA ${item.score}` : undefined}
                  bodyFamily={t.bodyFamily}
                  smallSize={t.small}
                  muted={muted}
                />
                {item.description ? (
                  <BulletList text={item.description} size={t.body} lineHeight={1.4} bulletColor={accent} />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Skills */}
      {hasItems(data.sections.skills) ? (
        <section>
          <SectionTitle title={data.sections.skills.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {items(data.sections.skills).map((item) => {
              const keywords = (item.keywords || []).filter(Boolean);
              return (
                <div
                  key={item.id}
                  style={{
                    fontFamily: t.bodyFamily,
                    fontSize: t.body,
                    lineHeight: 1.45,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  {item.name ? (
                    <span style={{ fontWeight: 700, color: "inherit", minWidth: 120, flexShrink: 0 }}>{item.name}</span>
                  ) : null}
                  <span style={{ flex: 1 }}>{keywords.length ? keywords.join(", ") : item.description}</span>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Certifications */}
      {hasItems(data.sections.certifications) ? (
        <section>
          <SectionTitle title={data.sections.certifications.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {items(data.sections.certifications).map((item) => (
              <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }} className="resume-section-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span>
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                    {item.issuer ? <span style={{ color: muted }}>{" — "}{item.issuer}</span> : null}
                  </span>
                  {item.date ? (
                    <span style={{ fontSize: t.small, color: muted, whiteSpace: "nowrap" }}>{item.date}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Awards */}
      {hasItems(data.sections.awards) ? (
        <section>
          <SectionTitle title={data.sections.awards.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="accent-bar" align="center" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {items(data.sections.awards).map((item) => (
              <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }} className="resume-section-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span>
                    <span style={{ fontWeight: 700 }}>{item.title}</span>
                    {item.awarder ? <span style={{ color: muted }}>{" — "}{item.awarder}</span> : null}
                  </span>
                  {item.date ? <span style={{ fontSize: t.small, color: muted, whiteSpace: "nowrap" }}>{item.date}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Languages / Interests inline row */}
      {(hasItems(data.sections.languages) || hasItems(data.sections.interests)) ? (
        <section style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {hasItems(data.sections.languages) ? (
            <div style={{ flex: 1, minWidth: 180 }}>
              <SectionTitle title={data.sections.languages.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" align="center" />
              <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, textAlign: "center" }}>
                {items(data.sections.languages).map((l, i, a) => (
                  <span key={l.id}>
                    <strong>{l.name}</strong>
                    {l.description ? <span style={{ color: muted }}> ({l.description})</span> : null}
                    {i < a.length - 1 ? <span style={{ color: muted }}>{"  ·  "}</span> : null}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {hasItems(data.sections.interests) ? (
            <div style={{ flex: 1, minWidth: 180 }}>
              <SectionTitle title={data.sections.interests.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" align="center" />
              <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, textAlign: "center", color: muted }}>
                {items(data.sections.interests).map((i) => i.name).join(" · ")}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
