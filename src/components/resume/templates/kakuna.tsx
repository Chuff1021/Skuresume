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

// Kakuna: Single column, CENTERED layout
// Header: Photo centered, name centered (large), headline centered, contact centered with icons
// Section headings: CENTERED, primary colored, with bottom border
// All content centered alignment
// GOLDEN/AMBER primary color with thin borders
export function KakunaTemplate({ data }: { data: ResumeData }) {
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
      {/* Header - Centered */}
      <div style={{ textAlign: "center", marginBottom: m.gapY + 4 }}>
        {picture.url && !picture.effects.hidden && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
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
            fontSize: hf.fontSize * 2,
            lineHeight: 1.1,
            color: c.primary,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ fontSize: bf.fontSize + 2, opacity: 0.7, marginTop: 6 }}>{basics.headline}</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0 14px",
            marginTop: 10,
            fontSize: bf.fontSize - 1,
            opacity: 0.6,
          }}
        >
          {basics.email && <span><ContactIcon type="email" color={c.primary} size={bf.fontSize} />{basics.email}</span>}
          {basics.phone && <span><ContactIcon type="phone" color={c.primary} size={bf.fontSize} />{basics.phone}</span>}
          {basics.location && <span><ContactIcon type="location" color={c.primary} size={bf.fontSize} />{basics.location}</span>}
          {basics.url.url && <span><ContactIcon type="website" color={c.primary} size={bf.fontSize} />{basics.url.url}</span>}
        </div>
      </div>

      {/* Sections stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: m.gapY }}>
        {/* Profiles */}
        {visible("profiles") && (
          <div>
            <CenterHead title={sections.profiles.name} c={c} hf={hf} />
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
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div>
            <CenterHead title="Summary" c={c} hf={hf} />
            <p style={{ fontSize: bf.fontSize - 1, textAlign: "center", whiteSpace: "pre-wrap", margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Skills */}
        {visible("skills") && (
          <div>
            <CenterHead title={sections.skills.name} c={c} hf={hf} />
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
          </div>
        )}

        {/* Experience */}
        {visible("experience") && (
          <div>
            <CenterHead title={sections.experience.name} c={c} hf={hf} />
            {getItems("experience").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.position}</span>
                    {item.company && <span style={{ color: c.primary }}> at {item.company}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>{item.date}</span>
                </div>
                {item.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6, marginTop: 1 }}>{item.location}</div>}
                {item.description && <div style={{ marginTop: 4 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {visible("education") && (
          <div>
            <CenterHead title={sections.education.name} c={c} hf={hf} />
            {getItems("education").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.studyType}{item.area && ` in ${item.area}`}</span>
                    {item.institution && <span style={{ color: c.primary }}> at {item.institution}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>{item.date}</span>
                </div>
                {item.score && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7, marginTop: 1 }}>GPA: {item.score}</div>}
                {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {visible("projects") && (
          <div>
            <CenterHead title={sections.projects.name} c={c} hf={hf} />
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
          </div>
        )}

        {/* Languages */}
        {visible("languages") && (
          <div>
            <CenterHead title={sections.languages.name} c={c} hf={hf} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, fontSize: bf.fontSize - 1 }}>
              {getItems("languages").map((item: any) => (
                <span key={item.id}>
                  <strong>{item.name}</strong>
                  {item.description && <span style={{ opacity: 0.6 }}> \u2014 {item.description}</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {visible("awards") && (
          <div>
            <CenterHead title={sections.awards.name} c={c} hf={hf} />
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
          </div>
        )}

        {/* Certifications */}
        {visible("certifications") && (
          <div>
            <CenterHead title={sections.certifications.name} c={c} hf={hf} />
            {getItems("certifications").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 4, fontSize: bf.fontSize - 1 }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.issuer && <span style={{ opacity: 0.6 }}> \u2014 {item.issuer}</span>}
                {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}> ({item.date})</span>}
              </div>
            ))}
          </div>
        )}

        {/* Volunteer */}
        {visible("volunteer") && (
          <div>
            <CenterHead title={sections.volunteer.name} c={c} hf={hf} />
            {getItems("volunteer").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.position}</span>
                    {item.organization && <span style={{ color: c.primary }}> at {item.organization}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>{item.date}</span>
                </div>
                {item.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.location}</div>}
                {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {visible("publications") && (
          <div>
            <CenterHead title={sections.publications.name} c={c} hf={hf} />
            {getItems("publications").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.publisher && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.publisher}{item.date && ` \u2014 ${item.date}`}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {visible("interests") && (
          <div>
            <CenterHead title={sections.interests.name} c={c} hf={hf} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
              {getItems("interests").map((item: any) => (
                <span key={item.id} style={{ padding: "2px 10px", borderRadius: 4, backgroundColor: `${c.primary}12`, color: c.primary, fontSize: bf.fontSize - 2 }}>{item.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {visible("references") && (
          <div>
            <CenterHead title={sections.references.name} c={c} hf={hf} />
            {getItems("references").map((item: any) => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.description && <div style={{ opacity: 0.6, fontSize: bf.fontSize - 2 }}>{item.description}</div>}
                {item.summary && <div style={{ fontStyle: "italic", opacity: 0.7, marginTop: 2, fontSize: bf.fontSize - 2 }}>&ldquo;{item.summary}&rdquo;</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CenterHead({ title, c, hf }: { title: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return (
    <div style={{
      textAlign: "center",
      fontFamily: hf.fontFamily,
      fontWeight: hf.fontWeight,
      fontSize: hf.fontSize,
      color: c.primary,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 8,
      paddingBottom: 6,
      borderBottom: `2px solid ${c.primary}`,
    }}>
      {title}
    </div>
  );
}
