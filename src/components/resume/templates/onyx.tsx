"use client";

import type { ResumeData } from "@/types/resume";

// Onyx — single-column, ATS-first, executive layout.
//
// Vertical structure:
//   HEADER     Name (accent color, display font) + headline + contact row
//   RULE       thin accent line
//   SUMMARY    paragraph, no heading if short (optional)
//   SECTIONS   Experience / Education / Projects / Skills / ...
//              Each section:
//                - Uppercase letter-spaced heading
//                - Thin 1px accent underline
//                - Items with right-aligned dates, bullet descriptions
//
// Design principles:
//   • Dates and locations are ALWAYS on the same line as the primary row
//     (job title / degree / project name), right-aligned via justify-between.
//   • Bullets use the • character with a hanging indent so wrapped lines
//     align under the text, not under the bullet.
//   • Skills group by bucket on a single comma-separated line per bucket.
//   • Muted text is a proper ink color (#4B5563), not low-contrast gray.
//   • Page padding is driven by metadata.page.marginX / marginY so the user
//     can tune whitespace without editing the template.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyItem = any;

const MUTED = "#4B5563"; // gray-600 — consistent muted ink across the template

function hasItems(section: { visible: boolean; items: AnyItem[] } | undefined) {
  return !!section && section.visible && section.items.some((i) => !i.hidden);
}

function items(section: { items: AnyItem[] } | undefined): AnyItem[] {
  return section ? section.items.filter((i) => !i.hidden) : [];
}

interface TypoVars {
  bodyFamily: string;
  displayFamily: string;
  body: number;     // base body size in px
  small: number;    // muted secondary text
  nameSize: number; // hero name
  sectionSize: number;
}

function typo(data: ResumeData): TypoVars {
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

// ---------------- Shared primitives ----------------

function SectionTitle({ title, color, size, family }: { title: string; color: string; size: number; family: string }) {
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
        }}
      >
        {title}
      </div>
    </div>
  );
}

function RowTitleDate({
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

function MetaLine({
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

function BulletList({
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
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "6px 0 0 0",
      }}
    >
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

// ---------------- Header ----------------

function Header({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  const { basics, picture } = data;
  const contactBits: string[] = [];
  if (basics.location) contactBits.push(basics.location);
  if (basics.email) contactBits.push(basics.email);
  if (basics.phone) contactBits.push(basics.phone);
  if (basics.url.url) contactBits.push(basics.url.label || basics.url.url.replace(/^https?:\/\//, ""));

  const hasPhoto = !!picture.url && !picture.effects.hidden;

  return (
    <header style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 14, marginBottom: 8 }}>
      {hasPhoto ? (
        <img
          src={picture.url}
          alt=""
          style={{
            width: picture.size,
            height: picture.size * (picture.aspectRatio || 1),
            borderRadius: picture.borderRadius ? picture.borderRadius : 4,
            objectFit: "cover",
            border: picture.effects.border ? `2px solid ${accent}` : "none",
            filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
            flexShrink: 0,
          }}
        />
      ) : null}

      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: t.displayFamily,
            fontSize: t.nameSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -0.5,
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
              color: "inherit",
              fontStyle: "italic",
              marginTop: 4,
              letterSpacing: 0.1,
            }}
          >
            {basics.headline}
          </div>
        ) : null}
        {contactBits.length ? (
          <div
            style={{
              fontFamily: t.bodyFamily,
              fontSize: t.small,
              color: muted,
              marginTop: 6,
              lineHeight: 1.4,
            }}
          >
            {contactBits.map((c, i) => (
              <span key={i}>
                {i > 0 ? <span style={{ color: accent, margin: "0 8px" }}>{"\u2022"}</span> : null}
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

// ---------------- Section renderers ----------------

function Summary({ text, t, bulletColor }: { text: string; t: TypoVars; bulletColor: string }) {
  if (!text.trim()) return null;
  return (
    <section style={{ marginTop: 6 }}>
      <SectionTitle title="Summary" color={bulletColor} size={t.sectionSize} family={t.displayFamily} />
      <p
        style={{
          fontFamily: t.bodyFamily,
          fontSize: t.body,
          lineHeight: 1.5,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {text.trim()}
      </p>
    </section>
  );
}

function Experience({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.experience)) return null;
  const list = items(data.sections.experience);
  return (
    <section>
      <SectionTitle title={data.sections.experience.name || "Experience"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {list.map((item) => (
          <div key={item.id} style={{ breakInside: "avoid" }} className="resume-section-item">
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
              right={item.url?.url && !item.url.label ? item.url.url.replace(/^https?:\/\//, "") : item.url?.label}
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
  );
}

function Education({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.education)) return null;
  const list = items(data.sections.education);
  return (
    <section>
      <SectionTitle title={data.sections.education.name || "Education"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((item) => (
          <div key={item.id} style={{ breakInside: "avoid" }} className="resume-section-item">
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
  );
}

function Skills({ data, t, accent }: { data: ResumeData; t: TypoVars; accent: string }) {
  if (!hasItems(data.sections.skills)) return null;
  const list = items(data.sections.skills);
  return (
    <section>
      <SectionTitle title={data.sections.skills.name || "Skills"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {list.map((item) => {
          const keywords = (item.keywords || []).filter(Boolean);
          const label = item.name;
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
              {label ? (
                <span style={{ fontWeight: 700, color: "inherit", minWidth: 120, flexShrink: 0 }}>{label}</span>
              ) : null}
              <span style={{ flex: 1 }}>
                {keywords.length ? keywords.join(", ") : item.description}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Projects({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.projects)) return null;
  const list = items(data.sections.projects);
  return (
    <section>
      <SectionTitle title={data.sections.projects.name || "Projects"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((item) => (
          <div key={item.id} style={{ breakInside: "avoid" }} className="resume-section-item">
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
  );
}

function Certifications({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.certifications)) return null;
  const list = items(data.sections.certifications);
  return (
    <section>
      <SectionTitle title={data.sections.certifications.name || "Certifications"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((item) => (
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
            {item.description ? (
              <div style={{ fontSize: t.small, color: muted, whiteSpace: "pre-wrap", marginTop: 2 }}>{item.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Awards({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.awards)) return null;
  const list = items(data.sections.awards);
  return (
    <section>
      <SectionTitle title={data.sections.awards.name || "Awards"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((item) => (
          <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }} className="resume-section-item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span>
                <span style={{ fontWeight: 700 }}>{item.title}</span>
                {item.awarder ? <span style={{ color: muted }}>{" — "}{item.awarder}</span> : null}
              </span>
              {item.date ? <span style={{ fontSize: t.small, color: muted, whiteSpace: "nowrap" }}>{item.date}</span> : null}
            </div>
            {item.description ? (
              <div style={{ fontSize: t.small, color: muted, whiteSpace: "pre-wrap", marginTop: 2 }}>{item.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Volunteer({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.volunteer)) return null;
  const list = items(data.sections.volunteer);
  return (
    <section>
      <SectionTitle title={data.sections.volunteer.name || "Volunteer"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((item) => (
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
  );
}

function Languages({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.languages)) return null;
  const list = items(data.sections.languages);
  return (
    <section>
      <SectionTitle title={data.sections.languages.name || "Languages"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontFamily: t.bodyFamily, fontSize: t.body }}>
        {list.map((item) => (
          <span key={item.id}>
            <strong>{item.name}</strong>
            {item.description ? <span style={{ color: muted }}>{" — "}{item.description}</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}

function Interests({ data, t, accent }: { data: ResumeData; t: TypoVars; accent: string }) {
  if (!hasItems(data.sections.interests)) return null;
  const list = items(data.sections.interests);
  return (
    <section>
      <SectionTitle title={data.sections.interests.name || "Interests"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ fontFamily: t.bodyFamily, fontSize: t.body }}>
        {list.map((item) => item.name).join(" · ")}
      </div>
    </section>
  );
}

function Profiles({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.profiles)) return null;
  const list = items(data.sections.profiles);
  return (
    <section>
      <SectionTitle title={data.sections.profiles.name || "Online Presence"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontFamily: t.bodyFamily, fontSize: t.body }}>
        {list.map((item) => (
          <span key={item.id}>
            <strong>{item.network}</strong>
            {item.username ? <span style={{ color: muted }}>{" — "}{item.url?.url || item.username}</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}

function Publications({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.publications)) return null;
  const list = items(data.sections.publications);
  return (
    <section>
      <SectionTitle title={data.sections.publications.name || "Publications"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((item) => (
          <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }} className="resume-section-item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span>
                <span style={{ fontWeight: 700 }}>{item.name}</span>
                {item.publisher ? <span style={{ color: muted }}>{" — "}{item.publisher}</span> : null}
              </span>
              {item.date ? <span style={{ fontSize: t.small, color: muted, whiteSpace: "nowrap" }}>{item.date}</span> : null}
            </div>
            {item.description ? (
              <div style={{ fontSize: t.small, color: muted, whiteSpace: "pre-wrap", marginTop: 2 }}>{item.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function References({ data, t, accent, muted }: { data: ResumeData; t: TypoVars; accent: string; muted: string }) {
  if (!hasItems(data.sections.references)) return null;
  const list = items(data.sections.references);
  return (
    <section>
      <SectionTitle title={data.sections.references.name || "References"} color={accent} size={t.sectionSize} family={t.displayFamily} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((item) => (
          <div key={item.id} style={{ fontFamily: t.bodyFamily, fontSize: t.body }} className="resume-section-item">
            <div style={{ fontWeight: 700 }}>{item.name}</div>
            {item.description ? <div style={{ color: muted, fontSize: t.small }}>{item.description}</div> : null}
            {item.summary ? (
              <div style={{ fontStyle: "italic", color: muted, marginTop: 2, fontSize: t.small }}>
                &ldquo;{item.summary}&rdquo;
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- Root ----------------

export function OnyxTemplate({ data }: { data: ResumeData }) {
  const { metadata } = data;
  const accent = metadata.design.colors.primary;
  const muted = MUTED;
  const t = typo(data);
  const m = metadata.page;

  return (
    <div
      className="resume-onyx"
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
      <Header data={data} t={t} accent={accent} muted={muted} />
      <Summary text={data.summary || ""} t={t} bulletColor={accent} />
      <Experience data={data} t={t} accent={accent} muted={muted} />
      <Projects data={data} t={t} accent={accent} muted={muted} />
      <Education data={data} t={t} accent={accent} muted={muted} />
      <Skills data={data} t={t} accent={accent} />
      <Certifications data={data} t={t} accent={accent} muted={muted} />
      <Awards data={data} t={t} accent={accent} muted={muted} />
      <Publications data={data} t={t} accent={accent} muted={muted} />
      <Volunteer data={data} t={t} accent={accent} muted={muted} />
      <Languages data={data} t={t} accent={accent} muted={muted} />
      <Profiles data={data} t={t} accent={accent} muted={muted} />
      <Interests data={data} t={t} accent={accent} />
      <References data={data} t={t} accent={accent} muted={muted} />
    </div>
  );
}
