"use client";

import type { ResumeData } from "@/types/resume";
import {
  INK,
  MUTED,
  ItemRow,
  MetaRow,
  ModernBullets,
  ModernSectionTitle,
  Section,
  hasItems,
  items,
  modernTypo,
  withAlpha,
} from "../shared/modern";

// Two-Column Technical — 25% left rail sidebar (contact / skills / education /
// languages / profiles / certifications) + 75% right rail (experience /
// projects / volunteer). Pairing: Geist Sans display + Geist Mono for
// secondary text. Ideal for engineers where tool stack is a core signal.

const BODY_FALLBACK = "'Geist', 'Inter', system-ui, -apple-system, sans-serif";
const DISPLAY_FALLBACK = "'Geist', 'Inter', system-ui, -apple-system, sans-serif";
const MONO_FALLBACK = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export function TwoColumnTechnicalTemplate({ data }: { data: ResumeData }) {
  const { metadata } = data;
  const accent = metadata.design.colors.primary || "#0A2540";
  const ink = metadata.design.colors.text || INK;
  const muted = MUTED;
  const t = modernTypo(data, { bodyFallback: BODY_FALLBACK, displayFallback: DISPLAY_FALLBACK });
  const m = metadata.page;

  const pad = {
    x: Math.max(48, m.marginX),
    y: Math.max(48, m.marginY),
  };

  const sidebarWidth = "27%";
  const mainWidth = "73%";
  const colGap = 28;

  return (
    <div
      className="resume-two-column-technical"
      style={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: metadata.design.colors.background || "#FFFFFF",
        color: ink,
        fontFamily: t.bodyFamily,
        fontSize: t.body,
        lineHeight: t.lineBody,
        padding: `${pad.y}px ${pad.x}px`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        letterSpacing: "-0.01em",
      }}
    >
      <Header data={data} accent={accent} ink={ink} muted={muted} t={t} />

      <div style={{ display: "flex", flexDirection: "row", gap: colGap, alignItems: "flex-start" }}>
        <aside
          style={{
            width: sidebarWidth,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            borderRight: `0.5px solid ${withAlpha(ink, 0.15)}`,
            paddingRight: colGap,
          }}
        >
          {data.summary.trim() ? (
            <Section>
              <ModernSectionTitle title="Profile" ink={ink} size={t.section} family={t.displayFamily} />
              <p style={{ margin: 0, fontSize: t.small, lineHeight: t.lineBody, color: ink, whiteSpace: "pre-wrap" }}>
                {data.summary.trim()}
              </p>
            </Section>
          ) : null}

          <Contact data={data} accent={accent} ink={ink} muted={muted} t={t} />
          <SidebarSkills data={data} ink={ink} muted={muted} t={t} mono={MONO_FALLBACK} />
          <SidebarEducation data={data} accent={accent} ink={ink} muted={muted} t={t} />
          <SidebarLanguages data={data} ink={ink} muted={muted} t={t} />
          <SidebarCertifications data={data} ink={ink} muted={muted} t={t} />
          <SidebarAwards data={data} ink={ink} muted={muted} t={t} />
          <SidebarInterests data={data} ink={ink} t={t} />
          <SidebarProfiles data={data} ink={ink} muted={muted} t={t} />
        </aside>

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
          <Experience data={data} accent={accent} ink={ink} muted={muted} t={t} />
          <Projects data={data} accent={accent} ink={ink} muted={muted} t={t} mono={MONO_FALLBACK} />
          <Publications data={data} ink={ink} muted={muted} t={t} />
          <Volunteer data={data} ink={ink} muted={muted} t={t} />
          <References data={data} ink={ink} muted={muted} t={t} />
        </main>
      </div>
    </div>
  );
}

function Header({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  const { basics, picture } = data;
  const hasPhoto = !!picture.url && !picture.effects.hidden;
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 18,
        paddingBottom: 14,
        borderBottom: `0.5px solid ${withAlpha(ink, 0.2)}`,
      }}
    >
      {hasPhoto ? (
        <img
          src={picture.url}
          alt=""
          style={{
            width: picture.size,
            height: picture.size * (picture.aspectRatio || 1),
            borderRadius: picture.borderRadius || 2,
            objectFit: "cover",
            filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
            flexShrink: 0,
          }}
        />
      ) : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: t.displayFamily,
            fontSize: t.name,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: t.lineHead,
            color: accent,
            margin: 0,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline ? (
          <div
            style={{
              fontFamily: t.displayFamily,
              fontSize: t.body + 1,
              color: ink,
              marginTop: 3,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {basics.headline}
          </div>
        ) : null}
      </div>
    </header>
  );
}

// ---------------- Sidebar sections ----------------

function Contact({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  const { basics } = data;
  const rows: { label: string; value: string }[] = [];
  if (basics.email) rows.push({ label: "Email", value: basics.email });
  if (basics.phone) rows.push({ label: "Phone", value: basics.phone });
  if (basics.location) rows.push({ label: "Location", value: basics.location });
  if (basics.url.url) rows.push({ label: "Web", value: basics.url.label || basics.url.url.replace(/^https?:\/\//, "") });
  basics.customFields.forEach((f) => {
    if (f.value) rows.push({ label: f.name, value: f.value });
  });

  if (!rows.length) return null;
  return (
    <Section>
      <ModernSectionTitle title="Contact" ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ fontFamily: t.bodyFamily, fontSize: t.small, lineHeight: 1.4, color: ink, wordBreak: "break-word" }}>
            <div style={{ color: muted, fontSize: t.micro, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>{r.label}</div>
            <div style={{ color: ink }}>{r.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SidebarSkills({ data, ink, muted, t, mono }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo>; mono: string }) {
  if (!hasItems(data.sections.skills)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.skills.name || "Skills"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items(data.sections.skills).map((item) => {
          const kw = (item.keywords || []).filter(Boolean);
          return (
            <div key={item.id}>
              {item.name ? (
                <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, fontWeight: 600, color: ink, marginBottom: 3, letterSpacing: "-0.01em" }}>
                  {item.name}
                </div>
              ) : null}
              {kw.length ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 6px" }}>
                  {(kw as string[]).map((k: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: mono,
                        fontSize: t.micro,
                        color: ink,
                        backgroundColor: withAlpha(ink, 0.06),
                        padding: "1px 6px",
                        borderRadius: 3,
                        lineHeight: 1.4,
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              ) : item.description ? (
                <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, color: muted, lineHeight: 1.4 }}>{item.description}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SidebarEducation({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.education)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.education.name || "Education"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items(data.sections.education).map((item) => (
          <div key={item.id}>
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, fontWeight: 600, color: ink, letterSpacing: "-0.01em" }}>{item.institution}</div>
            {[item.studyType, item.area].filter(Boolean).length ? (
              <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, color: ink, fontWeight: 400 }}>
                {[item.studyType, item.area].filter(Boolean).join(", ")}
              </div>
            ) : null}
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.micro, color: muted, marginTop: 1 }}>
              {item.date}
              {item.score ? `  ·  GPA ${item.score}` : ""}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SidebarLanguages({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.languages)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.languages.name || "Languages"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items(data.sections.languages).map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontFamily: t.bodyFamily, fontSize: t.small, color: ink }}>
            <span style={{ fontWeight: 500 }}>{item.name}</span>
            {item.description ? <span style={{ color: muted }}>{item.description}</span> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function SidebarCertifications({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.certifications)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.certifications.name || "Certifications"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.certifications).map((item) => (
          <div key={item.id}>
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, fontWeight: 600, color: ink }}>{item.name}</div>
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.micro, color: muted, marginTop: 1 }}>
              {[item.issuer, item.date].filter(Boolean).join("  ·  ")}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SidebarAwards({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.awards)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.awards.name || "Awards"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.awards).map((item) => (
          <div key={item.id}>
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, fontWeight: 600, color: ink }}>{item.title}</div>
            <div style={{ fontFamily: t.bodyFamily, fontSize: t.micro, color: muted, marginTop: 1 }}>
              {[item.awarder, item.date].filter(Boolean).join("  ·  ")}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SidebarInterests({ data, ink, t }: { data: ResumeData; ink: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.interests)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.interests.name || "Interests"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.small, lineHeight: t.lineBody, color: ink }}>
        {items(data.sections.interests)
          .map((i) => i.name)
          .join(" · ")}
      </div>
    </Section>
  );
}

function SidebarProfiles({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.profiles)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.profiles.name || "Profiles"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items(data.sections.profiles).map((item) => (
          <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.small, color: ink }}>
            <span style={{ color: muted, fontSize: t.micro, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.network}</span>
            <span style={{ marginLeft: 6 }}>{item.username}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------------- Main column sections ----------------

function Experience({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.experience)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.experience.name || "Experience"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items(data.sections.experience).map((item) => (
          <div key={item.id} style={{ breakInside: "avoid" }}>
            <ItemRow
              primary={item.position || ""}
              secondary={item.company}
              date={item.date}
              bodyFamily={t.bodyFamily}
              size={t.body}
              small={t.small}
              muted={muted}
              accent={accent}
            />
            <MetaRow
              left={item.location}
              right={item.url?.label || (item.url?.url ? item.url.url.replace(/^https?:\/\//, "") : undefined)}
              bodyFamily={t.bodyFamily}
              small={t.small}
              muted={muted}
            />
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects({ data, accent, ink, muted, t, mono }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo>; mono: string }) {
  if (!hasItems(data.sections.projects)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.projects.name || "Projects"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items(data.sections.projects).map((item) => (
          <div key={item.id} style={{ breakInside: "avoid" }}>
            <ItemRow primary={item.name || ""} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} accent={accent} />
            {item.keywords?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 6px", marginTop: 3 }}>
                {(item.keywords as string[]).filter(Boolean).map((k: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: mono,
                      fontSize: t.micro,
                      color: ink,
                      backgroundColor: withAlpha(ink, 0.06),
                      padding: "1px 6px",
                      borderRadius: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            ) : null}
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Publications({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.publications)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.publications.name || "Publications"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.publications).map((item) => (
          <div key={item.id}>
            <ItemRow primary={item.name || ""} secondary={item.publisher} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} />
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Volunteer({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.volunteer)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.volunteer.name || "Volunteer"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items(data.sections.volunteer).map((item) => (
          <div key={item.id}>
            <ItemRow primary={item.position || ""} secondary={item.organization} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} />
            <MetaRow left={item.location} bodyFamily={t.bodyFamily} small={t.small} muted={muted} />
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function References({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.references)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.references.name || "References"} ink={ink} size={t.section} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.references).map((item) => (
          <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body, lineHeight: t.lineBody }}>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            {item.description ? <div style={{ color: muted, fontSize: t.small }}>{item.description}</div> : null}
            {item.summary ? <div style={{ color: muted, marginTop: 2, fontSize: t.small, fontStyle: "italic" }}>&ldquo;{item.summary}&rdquo;</div> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
