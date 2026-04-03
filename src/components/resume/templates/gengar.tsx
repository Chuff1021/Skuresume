"use client";

import type { ResumeData } from "@/types/resume";

// === Shared Helpers ===

function ContactIcon({ type, size }: { type: string; size: number }) {
  const icons: Record<string, string> = { email: "\u2709", phone: "\u2706", location: "\u25C9", website: "\u2197" };
  return <span style={{ fontSize: size, marginRight: 6, verticalAlign: "middle", opacity: 0.85 }}>{icons[type] || ""}</span>;
}

function LevelSquares({ level, color }: { level: number; color: string }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < level ? color : "rgba(255,255,255,0.3)", marginRight: 2, fontSize: 10 }}>{"\u25A0"}</span>
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

// Gengar: TWO COLUMN - sidebar LEFT with PURPLE/INDIGO BACKGROUND filling full height
// Sidebar: Photo at top, Name (white text on purple bg), headline, contact items (vertical, white text with icons), then Certifications, Awards, Languages
// Main: Starts with a LIGHT PURPLE tinted summary box at top, then Online Presence, Skills, Education, Experience
export function GengarTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata, picture } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;

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
      className="w-full h-full overflow-hidden relative"
      style={{
        fontFamily: bf.fontFamily,
        fontSize: bf.fontSize,
        lineHeight: bf.lineHeight,
        color: c.text,
        backgroundColor: c.background,
      }}
    >
      {/* Sidebar purple background panel - full height */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${sw}%`, backgroundColor: c.primary }} />

      <div style={{ position: "relative", display: "flex", height: "100%" }}>
        {/* Sidebar LEFT - on purple bg */}
        <div
          style={{
            width: `${sw}%`,
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Photo */}
          <div style={{ padding: `${m.marginY}px ${m.marginX * 0.7}px 0` }}>
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
                    border: picture.effects.border ? "2px solid rgba(255,255,255,0.5)" : "none",
                    filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
                  }}
                />
              </div>
            )}

            {/* Name + headline */}
            <h1
              style={{
                fontFamily: hf.fontFamily,
                fontWeight: hf.fontWeight,
                fontSize: hf.fontSize * 1.3,
                lineHeight: 1.2,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {basics.name || "Your Name"}
            </h1>
            {basics.headline && (
              <p style={{ fontSize: bf.fontSize - 1, opacity: 0.85, marginTop: 4 }}>{basics.headline}</p>
            )}

            {/* Contact - vertical with icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 14, fontSize: bf.fontSize - 2 }}>
              {basics.email && <span><ContactIcon type="email" size={bf.fontSize - 1} />{basics.email}</span>}
              {basics.phone && <span><ContactIcon type="phone" size={bf.fontSize - 1} />{basics.phone}</span>}
              {basics.location && <span><ContactIcon type="location" size={bf.fontSize - 1} />{basics.location}</span>}
              {basics.url.url && <span><ContactIcon type="website" size={bf.fontSize - 1} />{basics.url.url}</span>}
            </div>
          </div>

          {/* Sidebar sections */}
          <div style={{ padding: `${m.gapY}px ${m.marginX * 0.7}px ${m.marginY}px`, display: "flex", flexDirection: "column", gap: m.gapY }}>
            {/* Certifications */}
            {visible("certifications") && (
              <div>
                <SideHead title={sections.certifications.name} />
                {getItems("certifications").map((item: any) => (
                  <div key={item.id} style={{ marginBottom: 6, fontSize: bf.fontSize - 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    {item.issuer && <div style={{ opacity: 0.7, fontSize: bf.fontSize - 2 }}>{item.issuer}{item.date && ` \u2014 ${item.date}`}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Awards */}
            {visible("awards") && (
              <div>
                <SideHead title={sections.awards.name} />
                {getItems("awards").map((item: any) => (
                  <div key={item.id} style={{ marginBottom: 6, fontSize: bf.fontSize - 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    {item.awarder && <div style={{ opacity: 0.7, fontSize: bf.fontSize - 2 }}>{item.awarder}</div>}
                    {item.date && <div style={{ opacity: 0.5, fontSize: bf.fontSize - 2 }}>{item.date}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {visible("languages") && (
              <div>
                <SideHead title={sections.languages.name} />
                {getItems("languages").map((item: any) => (
                  <div key={item.id} style={{ fontSize: bf.fontSize - 1, marginBottom: 3 }}>
                    <strong>{item.name}</strong>
                    {item.description && <span style={{ opacity: 0.7 }}> \u2014 {item.description}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Interests */}
            {visible("interests") && (
              <div>
                <SideHead title={sections.interests.name} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {getItems("interests").map((item: any) => (
                    <span key={item.id} style={{ padding: "2px 8px", borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", fontSize: bf.fontSize - 2 }}>{item.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {visible("references") && (
              <div>
                <SideHead title={sections.references.name} />
                {getItems("references").map((item: any) => (
                  <div key={item.id} style={{ marginBottom: 6, fontSize: bf.fontSize - 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    {item.description && <div style={{ opacity: 0.7, fontSize: bf.fontSize - 2 }}>{item.description}</div>}
                    {item.summary && <div style={{ fontStyle: "italic", opacity: 0.7, marginTop: 2, fontSize: bf.fontSize - 2 }}>&ldquo;{item.summary}&rdquo;</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main RIGHT */}
        <div
          style={{
            flex: 1,
            padding: `${m.marginY}px ${m.marginX}px`,
            display: "flex",
            flexDirection: "column",
            gap: m.gapY,
          }}
        >
          {/* Summary with tinted bg */}
          {summary && (
            <div style={{ backgroundColor: `${c.primary}15`, padding: `${m.gapY * 0.8}px ${m.gapX}px`, borderRadius: 6 }}>
              <p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap", margin: 0 }}>{summary}</p>
            </div>
          )}

          {/* Online Presence */}
          {visible("profiles") && (
            <div>
              <MainHead title={sections.profiles.name} c={c} hf={hf} />
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

          {/* Skills */}
          {visible("skills") && (
            <div>
              <MainHead title={sections.skills.name} c={c} hf={hf} />
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

          {/* Education */}
          {visible("education") && (
            <div>
              <MainHead title={sections.education.name} c={c} hf={hf} />
              {getItems("education").map((item: any) => (
                <div key={item.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 700 }}>{item.institution}</span>
                    <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize: bf.fontSize - 1, opacity: 0.8 }}>
                    {item.studyType}{item.area && ` in ${item.area}`}{item.score && ` \u2014 ${item.score}`}
                  </div>
                  {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {visible("experience") && (
            <div>
              <MainHead title={sections.experience.name} c={c} hf={hf} />
              {getItems("experience").map((item: any) => (
                <div key={item.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div>
                      <span style={{ fontWeight: 700 }}>{item.position}</span>
                      {item.company && <span style={{ color: c.primary }}> at {item.company}</span>}
                    </div>
                    <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap" }}>{item.date}</span>
                  </div>
                  {item.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.location}</div>}
                  {item.description && <div style={{ marginTop: 4 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {visible("projects") && (
            <div>
              <MainHead title={sections.projects.name} c={c} hf={hf} />
              {getItems("projects").map((item: any) => (
                <div key={item.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>}
                  </div>
                  {item.description && <div style={{ marginTop: 3 }}><BulletDescription text={item.description} fontSize={bf.fontSize} /></div>}
                </div>
              ))}
            </div>
          )}

          {/* Volunteer */}
          {visible("volunteer") && (
            <div>
              <MainHead title={sections.volunteer.name} c={c} hf={hf} />
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
            <div>
              <MainHead title={sections.publications.name} c={c} hf={hf} />
              {getItems("publications").map((item: any) => (
                <div key={item.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {item.publisher && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.publisher}{item.date && ` \u2014 ${item.date}`}</div>}
                  {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SideHead({ title }: { title: string }) {
  return (
    <h6 style={{
      fontWeight: 700,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      borderBottom: "1px solid rgba(255,255,255,0.3)",
      paddingBottom: 3,
      marginBottom: 8,
      color: "#ffffff",
      lineHeight: 1.3,
    }}>
      {title}
    </h6>
  );
}

function MainHead({ title, c, hf }: { title: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return (
    <h6 style={{
      fontFamily: hf.fontFamily,
      fontWeight: hf.fontWeight,
      fontSize: hf.fontSize * 0.75,
      color: c.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
      borderBottom: `2px solid ${c.primary}`,
      paddingBottom: 3,
      marginBottom: 8,
      lineHeight: 1.3,
    }}>
      {title}
    </h6>
  );
}
