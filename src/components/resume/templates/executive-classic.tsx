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

// Executive Classic — single column, centered name header, serif dominant.
// Pairing: Libre Caslon Text body + Libre Franklin display (user can swap via metadata).

const BODY_FALLBACK = "'Libre Caslon Text', 'Source Serif 4', Georgia, serif";
const DISPLAY_FALLBACK = "'Libre Franklin', 'Inter', Helvetica, sans-serif";

export function ExecutiveClassicTemplate({ data }: { data: ResumeData }) {
  const { metadata } = data;
  const accent = metadata.design.colors.primary || "#0A2540";
  const ink = metadata.design.colors.text || INK;
  const muted = MUTED;
  const t = modernTypo(data, { bodyFallback: BODY_FALLBACK, displayFallback: DISPLAY_FALLBACK });
  const m = metadata.page;

  const pad = {
    x: Math.max(56, m.marginX),
    y: Math.max(52, m.marginY),
  };

  return (
    <div
      className="resume-executive-classic"
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
        gap: Math.max(16, m.gapY),
        boxSizing: "border-box",
        letterSpacing: "-0.005em",
      }}
    >
      <Header data={data} accent={accent} ink={ink} muted={muted} t={t} />

      {data.summary.trim() ? (
        <Section>
          <p
            style={{
              margin: 0,
              fontSize: t.body,
              lineHeight: t.lineBody,
              color: ink,
              whiteSpace: "pre-wrap",
              textAlign: "center",
              maxWidth: "88%",
              marginInline: "auto",
              fontStyle: "italic",
            }}
          >
            {data.summary.trim()}
          </p>
        </Section>
      ) : null}

      <Experience data={data} accent={accent} ink={ink} muted={muted} t={t} />
      <Education data={data} accent={accent} ink={ink} muted={muted} t={t} />
      <Projects data={data} accent={accent} ink={ink} muted={muted} t={t} />
      <Skills data={data} ink={ink} muted={muted} t={t} />
      <Certifications data={data} ink={ink} muted={muted} t={t} />
      <Awards data={data} ink={ink} muted={muted} t={t} />
      <Volunteer data={data} ink={ink} muted={muted} t={t} />
      <Languages data={data} ink={ink} muted={muted} t={t} />
      <Publications data={data} ink={ink} muted={muted} t={t} />
      <Profiles data={data} ink={ink} muted={muted} t={t} />
      <Interests data={data} ink={ink} t={t} />
      <References data={data} ink={ink} muted={muted} t={t} />
    </div>
  );
}

function Header({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  const { basics } = data;
  const contactBits: string[] = [];
  if (basics.location) contactBits.push(basics.location);
  if (basics.email) contactBits.push(basics.email);
  if (basics.phone) contactBits.push(basics.phone);
  if (basics.url.url) contactBits.push(basics.url.label || basics.url.url.replace(/^https?:\/\//, ""));

  return (
    <header
      style={{
        textAlign: "center",
        paddingBottom: 20,
        marginBottom: 4,
        borderBottom: `0.5px solid ${withAlpha(ink, 0.25)}`,
      }}
    >
      <h1
        style={{
          fontFamily: t.displayFamily,
          fontSize: t.name,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
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
            fontFamily: t.bodyFamily,
            fontSize: t.body + 1,
            color: ink,
            marginTop: 6,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {basics.headline}
        </div>
      ) : null}
      {contactBits.length ? (
        <div
          style={{
            fontFamily: t.displayFamily,
            fontSize: t.small,
            color: muted,
            marginTop: 10,
            letterSpacing: "0.04em",
          }}
        >
          {contactBits.map((c, i) => (
            <span key={i}>
              {i > 0 ? <span style={{ margin: "0 10px", color: withAlpha(ink, 0.3) }}>{"\u2022"}</span> : null}
              {c}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function Experience({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.experience)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.experience.name || "Experience"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
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

function Education({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.education)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.education.name || "Education"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items(data.sections.education).map((item) => (
          <div key={item.id}>
            <ItemRow
              primary={item.institution || ""}
              secondary={[item.studyType, item.area].filter(Boolean).join(", ")}
              date={item.date}
              bodyFamily={t.bodyFamily}
              size={t.body}
              small={t.small}
              muted={muted}
              accent={accent}
            />
            <MetaRow left={item.score ? `GPA ${item.score}` : undefined} bodyFamily={t.bodyFamily} small={t.small} muted={muted} />
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects({ data, accent, ink, muted, t }: { data: ResumeData; accent: string; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.projects)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.projects.name || "Projects"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items(data.sections.projects).map((item) => (
          <div key={item.id}>
            <ItemRow primary={item.name || ""} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} accent={accent} />
            {item.keywords?.length ? <MetaRow left={item.keywords.join(" · ")} bodyFamily={t.bodyFamily} small={t.small} muted={muted} /> : null}
            {item.description ? <ModernBullets text={item.description} size={t.body} lineHeight={t.lineBody} ink={ink} muted={muted} mark="em-dash" bodyFamily={t.bodyFamily} /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Skills({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.skills)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.skills.name || "Core Competencies"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, lineHeight: t.lineBody, color: ink, textAlign: "center" }}>
        {items(data.sections.skills)
          .map((s) => (s.keywords?.length ? `${s.name} (${s.keywords.join(", ")})` : s.name))
          .join("  ·  ")}
      </div>
    </Section>
  );
}

function Certifications({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.certifications)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.certifications.name || "Certifications"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.certifications).map((item) => (
          <div key={item.id}>
            <ItemRow primary={item.name || ""} secondary={item.issuer} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Awards({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.awards)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.awards.name || "Awards"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items(data.sections.awards).map((item) => (
          <div key={item.id}>
            <ItemRow primary={item.title || ""} secondary={item.awarder} date={item.date} bodyFamily={t.bodyFamily} size={t.body} small={t.small} muted={muted} />
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
      <ModernSectionTitle title={data.sections.volunteer.name || "Volunteer"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
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

function Languages({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.languages)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.languages.name || "Languages"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, lineHeight: t.lineBody, color: ink, textAlign: "center" }}>
        {items(data.sections.languages)
          .map((l) => (l.description ? `${l.name} (${l.description})` : l.name))
          .join("  ·  ")}
      </div>
    </Section>
  );
}

function Publications({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.publications)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.publications.name || "Publications"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
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

function Profiles({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.profiles)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.profiles.name || "Profiles"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, lineHeight: t.lineBody, color: ink, textAlign: "center" }}>
        {items(data.sections.profiles)
          .map((p) => `${p.network}: ${p.username}`)
          .join("  ·  ")}
      </div>
    </Section>
  );
}

function Interests({ data, ink, t }: { data: ResumeData; ink: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.interests)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.interests.name || "Interests"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.body, lineHeight: t.lineBody, color: ink, textAlign: "center" }}>
        {items(data.sections.interests)
          .map((i) => i.name)
          .join("  ·  ")}
      </div>
    </Section>
  );
}

function References({ data, ink, muted, t }: { data: ResumeData; ink: string; muted: string; t: ReturnType<typeof modernTypo> }) {
  if (!hasItems(data.sections.references)) return null;
  return (
    <Section>
      <ModernSectionTitle title={data.sections.references.name || "References"} ink={ink} size={t.section} family={t.displayFamily} align="center" style="rule" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "center" }}>
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
