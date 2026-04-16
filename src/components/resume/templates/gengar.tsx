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

// Gengar — 32% sidebar with tinted background on the LEFT.
// Sidebar: name, photo, contact, skills, languages, certifications, interests
// Main: summary, experience, education, projects, awards

export function GengarTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, metadata, picture } = data;
  const accent = metadata.design.colors.primary;
  const muted = MUTED_INK;
  const t = typo(data);
  const m = metadata.page;
  const sidebarW = Math.min(38, Math.max(26, metadata.layout.sidebarWidth));
  const hasPhoto = !!picture.url && !picture.effects.hidden;
  const sidebarBg = `${accent}0E`;
  const sidebarMuted = muted;

  return (
    <div
      className="resume-gengar"
      style={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: metadata.design.colors.background,
        color: metadata.design.colors.text,
        fontFamily: t.bodyFamily,
        fontSize: t.body,
        lineHeight: metadata.typography.body.lineHeight,
        display: "flex",
        boxSizing: "border-box",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: `${sidebarW}%`,
          backgroundColor: sidebarBg,
          padding: `${m.marginY}px ${Math.max(20, Math.round(m.marginX * 0.55))}px`,
          display: "flex",
          flexDirection: "column",
          gap: Math.max(14, m.gapY),
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          boxSizing: "border-box",
        }}
      >
        <div>
          {hasPhoto ? (
            <img
              src={picture.url}
              alt=""
              style={{
                width: picture.size,
                height: picture.size,
                borderRadius: picture.borderRadius ? picture.borderRadius : 999,
                objectFit: "cover",
                marginBottom: 12,
                border: picture.effects.border ? `2px solid ${accent}` : "none",
                filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
              }}
            />
          ) : null}
          <h1
            style={{
              fontFamily: t.displayFamily,
              fontSize: Math.max(22, t.nameSize - 2),
              fontWeight: 700,
              color: accent,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -0.5,
            }}
          >
            {basics.name || "Your Name"}
          </h1>
          {basics.headline ? (
            <div style={{ fontSize: t.body, fontStyle: "italic", marginTop: 4, color: sidebarMuted }}>
              {basics.headline}
            </div>
          ) : null}
        </div>

        {(basics.email || basics.phone || basics.location || basics.url.url) ? (
          <section>
            <SectionTitle title="Contact" color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: t.bodyFamily, fontSize: t.small, color: sidebarMuted }}>
              {basics.location ? <div>{basics.location}</div> : null}
              {basics.email ? <div>{basics.email}</div> : null}
              {basics.phone ? <div>{basics.phone}</div> : null}
              {basics.url.url ? <div>{basics.url.label || basics.url.url.replace(/^https?:\/\//, "")}</div> : null}
            </div>
          </section>
        ) : null}

        {hasItems(data.sections.skills) ? (
          <section>
            <SectionTitle title={data.sections.skills.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items(data.sections.skills).map((item) => (
                <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.small, lineHeight: 1.4 }}>
                  {item.name ? <div style={{ fontWeight: 700, color: "inherit" }}>{item.name}</div> : null}
                  {item.keywords?.length ? (
                    <div style={{ color: sidebarMuted }}>{item.keywords.join(", ")}</div>
                  ) : item.description ? (
                    <div style={{ color: sidebarMuted }}>{item.description}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {hasItems(data.sections.languages) ? (
          <section>
            <SectionTitle title={data.sections.languages.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: t.small }}>
              {items(data.sections.languages).map((l) => (
                <div key={l.id}>
                  <strong>{l.name}</strong>
                  {l.description ? <span style={{ color: sidebarMuted }}> — {l.description}</span> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {hasItems(data.sections.certifications) ? (
          <section>
            <SectionTitle title={data.sections.certifications.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: t.small }}>
              {items(data.sections.certifications).map((c) => (
                <div key={c.id}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: sidebarMuted }}>
                    {[c.issuer, c.date].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {hasItems(data.sections.profiles) ? (
          <section>
            <SectionTitle title={data.sections.profiles.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: t.small }}>
              {items(data.sections.profiles).map((p) => (
                <div key={p.id}>
                  <strong>{p.network}</strong>
                  {p.username || p.url?.url ? (
                    <div style={{ color: sidebarMuted }}>{p.url?.url || p.username}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {hasItems(data.sections.interests) ? (
          <section>
            <SectionTitle title={data.sections.interests.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="plain" />
            <div style={{ fontSize: t.small, color: sidebarMuted }}>
              {items(data.sections.interests).map((i) => i.name).join(" · ")}
            </div>
          </section>
        ) : null}
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: `${m.marginY}px ${m.marginX}px`,
          display: "flex",
          flexDirection: "column",
          gap: Math.max(14, m.gapY),
          boxSizing: "border-box",
        }}
      >
        {summary ? (
          <section>
            <SectionTitle title="Summary" color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
            <p style={{ fontSize: t.body, lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>{summary}</p>
          </section>
        ) : null}

        {hasItems(data.sections.experience) ? (
          <section>
            <SectionTitle title={data.sections.experience.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
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

        {hasItems(data.sections.projects) ? (
          <section>
            <SectionTitle title={data.sections.projects.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
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

        {hasItems(data.sections.education) ? (
          <section>
            <SectionTitle title={data.sections.education.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
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

        {hasItems(data.sections.awards) ? (
          <section>
            <SectionTitle title={data.sections.awards.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items(data.sections.awards).map((item) => (
                <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }}>
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

        {hasItems(data.sections.volunteer) ? (
          <section>
            <SectionTitle title={data.sections.volunteer.name} color={accent} size={t.sectionSize} family={t.displayFamily} variant="ruled" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items(data.sections.volunteer).map((item) => (
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
                    left={[item.organization, item.location].filter(Boolean).join(" — ")}
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
      </main>
    </div>
  );
}
