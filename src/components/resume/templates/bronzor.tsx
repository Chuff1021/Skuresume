"use client";

import type { ResumeData } from "@/types/resume";

// === Shared Helpers ===

function ContactIcon({ type, color, size }: { type: string; color: string; size: number }) {
  const icons: Record<string, string> = { email: "\u2709", phone: "\u2706", location: "\u25C9", website: "\u2197" };
  return <span style={{ color, fontSize: size, marginRight: 4, verticalAlign: "middle" }}>{icons[type] || ""}</span>;
}

function LevelSquares({ level, color }: { level: number; color: string }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < level ? color : "#d1d5db", marginRight: 2, fontSize: 10 }}>{"\u25A0"}</span>
      ))}
    </span>
  );
}

function BulletDescription({ text, fontSize }: { text: string; fontSize: number }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} style={{ fontSize: fontSize - 1, paddingLeft: 12, textIndent: -12, marginTop: i > 0 ? 3 : 0 }}>
          {"\u2022"} {line.replace(/^[\u2022\-\*]\s*/, "")}
        </div>
      ))}
    </div>
  );
}

function proficiencyLabel(level: number): string {
  if (level >= 5) return "Expert";
  if (level >= 4) return "Advanced";
  if (level >= 3) return "Intermediate";
  if (level >= 2) return "Beginner";
  return "Novice";
}

// Bronzor: Single column with GRID LAYOUT for sections
// Header: Photo centered at top, name centered (large), headline (italic), contact row centered with bullet separators
// Each section is a 2-COLUMN GRID: section title on LEFT (~20% width), content on RIGHT (~80%)
// Section title and content separated by thin primary-colored top border
export function BronzorTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata, picture } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;

  const visible = (key: string) => {
    const s = sections[key as keyof typeof sections];
    return s && s.visible && s.items.filter((i: any) => !i.hidden).length > 0;
  };

  const getItems = (key: string) => {
    const s = sections[key as keyof typeof sections];
    return s ? s.items.filter((i: any) => !i.hidden) : [];
  };

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        fontFamily: bf.fontFamily,
        fontSize: bf.fontSize,
        lineHeight: bf.lineHeight,
        color: c.text,
        backgroundColor: c.background,
        padding: `${m.marginY}px ${m.marginX}px`,
      }}
    >
      {/* Header - centered */}
      <div style={{ textAlign: "center", paddingBottom: m.gapY, borderBottom: `2px solid ${c.primary}` }}>
        {picture.url && !picture.effects.hidden && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <img
              src={picture.url}
              alt=""
              style={{
                width: picture.size,
                height: picture.size / picture.aspectRatio,
                borderRadius: picture.borderRadius,
                objectFit: "cover",
                border: picture.effects.border ? `2px solid ${c.primary}` : "none",
                filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
              }}
            />
          </div>
        )}
        <h1
          style={{
            fontFamily: hf.fontFamily,
            fontWeight: hf.fontWeight,
            fontSize: hf.fontSize * 1.8,
            lineHeight: 1.1,
            margin: 0,
            color: c.text,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ fontSize: bf.fontSize + 1, fontStyle: "italic", opacity: 0.7, marginTop: 4 }}>{basics.headline}</p>
        )}
        {/* Contact centered with bullet separators and icons */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 4px", marginTop: 8, fontSize: bf.fontSize - 2, opacity: 0.7 }}>
          {[
            basics.email && { type: "email", value: basics.email },
            basics.phone && { type: "phone", value: basics.phone },
            basics.location && { type: "location", value: basics.location },
            basics.url.url && { type: "website", value: basics.url.url },
          ].filter(Boolean).map((item: any, idx, arr) => (
            <span key={idx}>
              <ContactIcon type={item.type} color={c.primary} size={bf.fontSize - 1} />
              {item.value}
              {idx < arr.length - 1 && <span style={{ margin: "0 6px", opacity: 0.4 }}>{"\u2022"}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Grid sections: label left, content right */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Summary */}
        {summary && (
          <GridRow title="Summary" c={c} hf={hf}>
            <p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap", margin: 0 }}>{summary}</p>
          </GridRow>
        )}

        {/* Profiles */}
        {visible("profiles") && (
          <GridRow title={sections.profiles.name} c={c} hf={hf}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {getItems("profiles").map((item: any) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {item.icon && <span style={{ fontSize: bf.fontSize + 2 }}>{item.icon}</span>}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: bf.fontSize - 1 }}>{item.network}</div>
                    <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>@{item.username}</div>
                  </div>
                </div>
              ))}
            </div>
          </GridRow>
        )}

        {/* Skills */}
        {visible("skills") && (
          <GridRow title={sections.skills.name} c={c} hf={hf}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              {getItems("skills").map((item: any) => (
                <div key={item.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: bf.fontSize - 1 }}>{item.name}</span>
                      <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, marginLeft: 6 }}>{proficiencyLabel(item.level)}</span>
                    </div>
                    <LevelSquares level={item.level} color={c.primary} />
                  </div>
                  {item.keywords?.length > 0 && (
                    <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5, marginTop: 2 }}>{item.keywords.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          </GridRow>
        )}

        {/* Experience */}
        {visible("experience") && (
          <GridRow title={sections.experience.name} c={c} hf={hf}>
            {getItems("experience").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{item.company}</span>
                    {item.location && <span style={{ opacity: 0.6 }}>, {item.location}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6, whiteSpace: "nowrap" }}>{item.date}</span>
                </div>
                <div style={{ fontStyle: "italic", color: c.primary, fontSize: bf.fontSize - 1 }}>{item.position}</div>
                {item.description && <div style={{ marginTop: 4 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </GridRow>
        )}

        {/* Education */}
        {visible("education") && (
          <GridRow title={sections.education.name} c={c} hf={hf}>
            {getItems("education").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700 }}>{item.institution}</span>
                  <span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6 }}>{item.date}</span>
                </div>
                <div style={{ fontStyle: "italic", fontSize: bf.fontSize - 1, opacity: 0.8 }}>
                  {item.studyType}{item.area && ` in ${item.area}`}{item.score && ` \u2014 ${item.score}`}
                </div>
                {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </GridRow>
        )}

        {/* Projects */}
        {visible("projects") && (
          <GridRow title={sections.projects.name} c={c} hf={hf}>
            {getItems("projects").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>}
                </div>
                {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
                {item.keywords?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                    {item.keywords.map((kw: string, idx: number) => (
                      <span key={idx} style={{ padding: "1px 6px", borderRadius: 3, backgroundColor: `${c.primary}12`, color: c.primary, fontSize: bf.fontSize - 2 }}>{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </GridRow>
        )}

        {/* Awards */}
        {visible("awards") && (
          <GridRow title={sections.awards.name} c={c} hf={hf}>
            {getItems("awards").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600 }}>{item.title}</span>
                  {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>}
                </div>
                {item.awarder && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.awarder}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </GridRow>
        )}

        {/* Certifications */}
        {visible("certifications") && (
          <GridRow title={sections.certifications.name} c={c} hf={hf}>
            {getItems("certifications").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 4, fontSize: bf.fontSize - 1 }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.issuer && <span style={{ opacity: 0.6 }}> \u2014 {item.issuer}</span>}
                {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}> ({item.date})</span>}
              </div>
            ))}
          </GridRow>
        )}

        {/* Languages */}
        {visible("languages") && (
          <GridRow title={sections.languages.name} c={c} hf={hf}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
              {getItems("languages").map((item: any) => (
                <span key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                  <strong>{item.name}</strong>
                  {item.description && <span style={{ opacity: 0.7 }}> \u2014 {item.description}</span>}
                </span>
              ))}
            </div>
          </GridRow>
        )}

        {/* Interests */}
        {visible("interests") && (
          <GridRow title={sections.interests.name} c={c} hf={hf}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {getItems("interests").map((item: any) => (
                <span key={item.id} style={{ padding: "2px 8px", borderRadius: 3, backgroundColor: `${c.primary}12`, color: c.primary, fontSize: bf.fontSize - 2 }}>{item.name}</span>
              ))}
            </div>
          </GridRow>
        )}

        {/* Volunteer */}
        {visible("volunteer") && (
          <GridRow title={sections.volunteer.name} c={c} hf={hf}>
            {getItems("volunteer").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.position}</span>
                    {item.organization && <span style={{ color: c.primary }}> at {item.organization}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                </div>
                {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </GridRow>
        )}

        {/* Publications */}
        {visible("publications") && (
          <GridRow title={sections.publications.name} c={c} hf={hf}>
            {getItems("publications").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.publisher && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.publisher}{item.date && ` \u2014 ${item.date}`}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </GridRow>
        )}

        {/* References */}
        {visible("references") && (
          <GridRow title={sections.references.name} c={c} hf={hf}>
            {getItems("references").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.description && <div style={{ opacity: 0.6, fontSize: bf.fontSize - 2 }}>{item.description}</div>}
                {item.summary && <div style={{ fontStyle: "italic", opacity: 0.7, marginTop: 2, fontSize: bf.fontSize - 2 }}>&ldquo;{item.summary}&rdquo;</div>}
              </div>
            ))}
          </GridRow>
        )}
      </div>
    </div>
  );
}

function GridRow({
  title,
  c,
  hf,
  children,
}: {
  title: string;
  c: { primary: string };
  hf: { fontFamily: string; fontWeight: number; fontSize: number };
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20% 80%",
        borderTop: `1px solid ${c.primary}40`,
        marginTop: 12,
        paddingTop: 10,
      }}
    >
      <div
        style={{
          fontFamily: hf.fontFamily,
          fontWeight: hf.fontWeight,
          fontSize: hf.fontSize * 0.65,
          color: c.primary,
          textTransform: "uppercase",
          letterSpacing: 1,
          lineHeight: 1.4,
          paddingRight: 10,
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
