"use client";

import type { ResumeData } from "@/types/resume";

// === Shared Helpers ===

function ContactIcon({ type, color, size }: { type: string; color: string; size: number }) {
  const icons: Record<string, string> = { email: "\u2709", phone: "\u2706", location: "\u25C9", website: "\u2197" };
  return <span style={{ color, fontSize: size, marginRight: 4, verticalAlign: "middle" }}>{icons[type] || ""}</span>;
}

function LevelSquares({ level, color }: { level: number; color: string }) {
  return (
    <span style={{ letterSpacing: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < level ? color : "#d1d5db", marginRight: 2, fontSize: 10 }}>
          {"\u25A0"}
        </span>
      ))}
    </span>
  );
}

function BulletDescription({ text, fontSize }: { text: string; fontSize: number }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: fontSize - 1,
            paddingLeft: 12,
            textIndent: -12,
            marginTop: i > 0 ? 3 : 0,
          }}
        >
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

// Onyx: Single-column, NO sidebar
// Header: PHOTO (large, top-left square), name + headline to right, contact row with icons below
// Then: Online Presence grid, Professional Summary, Technical Skills (2-col grid with name/proficiency/keywords/level-squares), Experience (bullet points), Education
export function OnyxTemplate({ data }: { data: ResumeData }) {
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
      {/* Header: photo left, info right */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: m.gapY, borderBottom: `2px solid ${c.primary}` }}>
        {picture.url && !picture.effects.hidden && (
          <img
            src={picture.url}
            alt=""
            style={{
              width: picture.size,
              height: picture.size,
              borderRadius: picture.borderRadius,
              objectFit: "cover",
              border: picture.effects.border ? `2px solid ${c.primary}` : "none",
              filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: hf.fontFamily,
              fontWeight: hf.fontWeight,
              fontSize: hf.fontSize * 1.5,
              lineHeight: hf.lineHeight,
              margin: 0,
              color: c.text,
            }}
          >
            {basics.name || "Your Name"}
          </h1>
          {basics.headline && (
            <p style={{ fontSize: bf.fontSize + 1, opacity: 0.8, margin: "2px 0 0" }}>{basics.headline}</p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0 14px",
              marginTop: 8,
              fontSize: bf.fontSize - 2,
              opacity: 0.75,
            }}
          >
            {basics.email && (
              <span><ContactIcon type="email" color={c.primary} size={bf.fontSize - 1} />{basics.email}</span>
            )}
            {basics.phone && (
              <span><ContactIcon type="phone" color={c.primary} size={bf.fontSize - 1} />{basics.phone}</span>
            )}
            {basics.location && (
              <span><ContactIcon type="location" color={c.primary} size={bf.fontSize - 1} />{basics.location}</span>
            )}
            {basics.url.url && (
              <span><ContactIcon type="website" color={c.primary} size={bf.fontSize - 1} />{basics.url.url}</span>
            )}
          </div>
        </div>
      </div>

      {/* Online Presence / Profiles */}
      {visible("profiles") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.profiles.name} c={c} hf={hf} />
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

      {/* Professional Summary */}
      {summary && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title="Summary" c={c} hf={hf} />
          <p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap", margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Technical Skills - 2-col grid with name/proficiency/keywords/level-squares */}
      {visible("skills") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.skills.name} c={c} hf={hf} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
            {getItems("skills").map((item: any) => (
              <div key={item.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: bf.fontSize - 1 }}>{item.name}</span>
                    <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, marginLeft: 6 }}>
                      {proficiencyLabel(item.level)}
                    </span>
                  </div>
                  <LevelSquares level={item.level} color={c.primary} />
                </div>
                {item.keywords?.length > 0 && (
                  <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5, marginTop: 2 }}>
                    {item.keywords.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {visible("experience") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.experience.name} c={c} hf={hf} />
          {getItems("experience").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700 }}>{item.company}</span>
                  {item.location && <span style={{ opacity: 0.6 }}>, {item.location}</span>}
                </div>
                <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap" }}>{item.date}</span>
              </div>
              <div style={{ color: c.primary, fontSize: bf.fontSize - 1 }}>{item.position}</div>
              {item.description && (
                <div style={{ marginTop: 4 }}>
                  <BulletDescription text={item.description} fontSize={bf.fontSize} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {visible("education") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.education.name} c={c} hf={hf} />
          {getItems("education").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700 }}>{item.institution}</span>
                <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
              </div>
              <div style={{ fontSize: bf.fontSize - 1, opacity: 0.8 }}>
                {item.studyType}
                {item.area && ` in ${item.area}`}
                {item.score && ` \u2014 ${item.score}`}
              </div>
              {item.description && (
                <div style={{ marginTop: 3 }}>
                  <BulletDescription text={item.description} fontSize={bf.fontSize} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {visible("projects") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.projects.name} c={c} hf={hf} />
          {getItems("projects").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>}
              </div>
              {item.description && (
                <div style={{ marginTop: 3 }}>
                  <BulletDescription text={item.description} fontSize={bf.fontSize} />
                </div>
              )}
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

      {/* Awards */}
      {visible("awards") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.awards.name} c={c} hf={hf} />
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
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.certifications.name} c={c} hf={hf} />
          {getItems("certifications").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              {item.issuer && <span style={{ opacity: 0.6 }}> \u2014 {item.issuer}</span>}
              {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}> ({item.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {visible("languages") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.languages.name} c={c} hf={hf} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
            {getItems("languages").map((item: any) => (
              <span key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                <strong>{item.name}</strong>
                {item.description && <span style={{ opacity: 0.7 }}> \u2014 {item.description}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {visible("interests") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.interests.name} c={c} hf={hf} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {getItems("interests").map((item: any) => (
              <span key={item.id} style={{ padding: "2px 8px", borderRadius: 3, backgroundColor: `${c.primary}12`, color: c.primary, fontSize: bf.fontSize - 2 }}>{item.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {visible("volunteer") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.volunteer.name} c={c} hf={hf} />
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
        </div>
      )}

      {/* Publications */}
      {visible("publications") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.publications.name} c={c} hf={hf} />
          {getItems("publications").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              {item.publisher && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.publisher}{item.date && ` \u2014 ${item.date}`}</div>}
              {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {visible("references") && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title={sections.references.name} c={c} hf={hf} />
          {getItems("references").map((item: any) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              {item.description && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.description}</div>}
              {item.summary && <div style={{ fontStyle: "italic", opacity: 0.7, marginTop: 2, fontSize: bf.fontSize - 2 }}>&ldquo;{item.summary}&rdquo;</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHead({
  title,
  c,
  hf,
}: {
  title: string;
  c: { primary: string };
  hf: { fontFamily: string; fontWeight: number; fontSize: number };
}) {
  return (
    <h6
      style={{
        fontFamily: hf.fontFamily,
        fontWeight: hf.fontWeight,
        fontSize: hf.fontSize * 0.75,
        color: c.primary,
        textTransform: "uppercase",
        letterSpacing: 1,
        margin: "0 0 8px",
        lineHeight: 1.3,
        borderBottom: `1px solid ${c.primary}40`,
        paddingBottom: 4,
      }}
    >
      {title}
    </h6>
  );
}
