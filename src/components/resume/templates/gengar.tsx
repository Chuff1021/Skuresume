"use client";

import type { ResumeData } from "@/types/resume";

// Gengar: Dark sidebar layout with accent color header
export function GengarTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;

  return (
    <div
      className="w-full h-full overflow-hidden flex"
      style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, backgroundColor: colors.background }}
    >
      {/* Sidebar */}
      <div style={{ width: `${sw}%`, backgroundColor: colors.primary, color: "#ffffff", padding: `${m.marginY}px ${m.marginX * 0.6}px`, display: "flex", flexDirection: "column", gap: m.gapY }}>
        {/* Name */}
        <div>
          <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.2, lineHeight: 1.2, color: "#ffffff" }}>
            {basics.name || "Your Name"}
          </h1>
          {basics.headline && <p style={{ fontSize: bf.fontSize - 1, opacity: 0.8, marginTop: 4 }}>{basics.headline}</p>}
        </div>

        {/* Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: bf.fontSize - 2 }}>
          <SidebarHeading text="Contact" />
          {basics.email && <span style={{ opacity: 0.9 }}>{basics.email}</span>}
          {basics.phone && <span style={{ opacity: 0.9 }}>{basics.phone}</span>}
          {basics.location && <span style={{ opacity: 0.9 }}>{basics.location}</span>}
          {basics.url.url && <span style={{ opacity: 0.9 }}>{basics.url.url}</span>}
        </div>

        {/* Skills */}
        {sections.skills.visible && sections.skills.items.length > 0 && (
          <div>
            <SidebarHeading text={sections.skills.name} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sections.skills.items.filter(i => !i.hidden).map(item => (
                <div key={item.id}>
                  <div style={{ fontSize: bf.fontSize - 1, fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)" }}>
                    <div style={{ height: "100%", borderRadius: 2, backgroundColor: "rgba(255,255,255,0.8)", width: `${(item.level / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {sections.languages.visible && sections.languages.items.length > 0 && (
          <div>
            <SidebarHeading text={sections.languages.name} />
            {sections.languages.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ fontSize: bf.fontSize - 1, marginBottom: 2 }}>
                <strong>{item.name}</strong>{item.description && <span style={{ opacity: 0.7 }}> — {item.description}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {sections.interests.visible && sections.interests.items.length > 0 && (
          <div>
            <SidebarHeading text={sections.interests.name} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {sections.interests.items.filter(i => !i.hidden).map(item => (
                <span key={item.id} style={{ padding: "1px 8px", borderRadius: 3, backgroundColor: "rgba(255,255,255,0.15)", fontSize: bf.fontSize - 2 }}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: `${m.marginY}px ${m.marginX}px`, color: colors.text, display: "flex", flexDirection: "column", gap: m.gapY }}>
        {summary && (
          <div>
            <MainHeading text="Summary" color={colors.primary} hf={hf} />
            <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
          </div>
        )}

        {sections.experience.visible && sections.experience.items.length > 0 && (
          <div>
            <MainHeading text={sections.experience.name} color={colors.primary} hf={hf} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.experience.items.filter(i => !i.hidden).map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <div><span style={{ fontWeight: 600 }}>{item.position}</span>{item.company && <span style={{ color: colors.primary }}> at {item.company}</span>}</div>
                    <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap" }}>{item.date}</span>
                  </div>
                  {item.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.location}</div>}
                  {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.education.visible && sections.education.items.length > 0 && (
          <div>
            <MainHeading text={sections.education.name} color={colors.primary} hf={hf} />
            {sections.education.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div className="flex justify-between items-baseline">
                  <div><span style={{ fontWeight: 600 }}>{item.studyType}{item.area && ` in ${item.area}`}</span>{item.institution && <span style={{ color: colors.primary }}> at {item.institution}</span>}</div>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                </div>
                {item.score && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>GPA: {item.score}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {sections.projects.visible && sections.projects.items.length > 0 && (
          <div>
            <MainHeading text={sections.projects.name} color={colors.primary} hf={hf} />
            {sections.projects.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.date && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarHeading({ text }: { text: string }) {
  return <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 3 }}>{text}</div>;
}

function MainHeading({ text, color, hf }: { text: string; color: string; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <div style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize, color, borderBottom: `2px solid ${color}`, paddingBottom: 3, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{text}</div>;
}
