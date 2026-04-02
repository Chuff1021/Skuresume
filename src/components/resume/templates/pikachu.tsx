"use client";

import type { ResumeData } from "@/types/resume";

// Pikachu: Two-column layout with colored header band
export function PikachuTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: colors.text, backgroundColor: colors.background }}>
      {/* Header band */}
      <div style={{ backgroundColor: colors.primary, color: "#ffffff", padding: `${m.marginY * 0.8}px ${m.marginX}px` }}>
        <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.8, lineHeight: 1.1, color: "#fff" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && <p style={{ fontSize: bf.fontSize + 1, opacity: 0.9, marginTop: 4 }}>{basics.headline}</p>}
        <div className="flex flex-wrap gap-4 mt-3" style={{ fontSize: bf.fontSize - 2, opacity: 0.85 }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url.url && <span>{basics.url.url}</span>}
        </div>
      </div>

      {/* Two columns */}
      <div className="flex" style={{ padding: `${m.gapY}px ${m.marginX}px ${m.marginY}px`, gap: m.gapX }}>
        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {summary && (
            <Sec title="Profile" color={colors.primary} hf={hf}>
              <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
            </Sec>
          )}

          {sections.experience.visible && sections.experience.items.length > 0 && (
            <Sec title={sections.experience.name} color={colors.primary} hf={hf}>
              {sections.experience.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: bf.fontSize }}>{item.position}</div>
                  <div style={{ color: colors.primary, fontSize: bf.fontSize - 1 }}>{item.company}{item.location && ` — ${item.location}`}</div>
                  <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5, marginTop: 2 }}>{item.date}</div>
                  {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 4, whiteSpace: "pre-wrap" }}>{item.description}</p>}
                </div>
              ))}
            </Sec>
          )}

          {sections.education.visible && sections.education.items.length > 0 && (
            <Sec title={sections.education.name} color={colors.primary} hf={hf}>
              {sections.education.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 700 }}>{item.studyType}{item.area && ` in ${item.area}`}</div>
                  <div style={{ color: colors.primary, fontSize: bf.fontSize - 1 }}>{item.institution}</div>
                  <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}>{item.date}{item.score && ` — GPA: ${item.score}`}</div>
                  {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
                </div>
              ))}
            </Sec>
          )}

          {sections.projects.visible && sections.projects.items.length > 0 && (
            <Sec title={sections.projects.name} color={colors.primary} hf={hf}>
              {sections.projects.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {item.date && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}>{item.date}</div>}
                  {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
                </div>
              ))}
            </Sec>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ width: `${metadata.layout.sidebarWidth}%`, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {sections.skills.visible && sections.skills.items.length > 0 && (
            <Sec title={sections.skills.name} color={colors.primary} hf={hf}>
              {sections.skills.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ marginBottom: 6 }}>
                  <div className="flex justify-between" style={{ fontSize: bf.fontSize - 1 }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, backgroundColor: `${colors.primary}15`, marginTop: 3 }}>
                    <div style={{ height: "100%", borderRadius: 3, backgroundColor: colors.primary, width: `${(item.level / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </Sec>
          )}

          {sections.languages.visible && sections.languages.items.length > 0 && (
            <Sec title={sections.languages.name} color={colors.primary} hf={hf}>
              {sections.languages.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ fontSize: bf.fontSize - 1, marginBottom: 3 }}>
                  <strong>{item.name}</strong>{item.description && <span style={{ opacity: 0.6 }}> — {item.description}</span>}
                </div>
              ))}
            </Sec>
          )}

          {sections.interests.visible && sections.interests.items.length > 0 && (
            <Sec title={sections.interests.name} color={colors.primary} hf={hf}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {sections.interests.items.filter(i => !i.hidden).map(item => (
                  <span key={item.id} style={{ padding: "2px 8px", borderRadius: 4, backgroundColor: `${colors.primary}10`, color: colors.primary, fontSize: bf.fontSize - 2 }}>{item.name}</span>
                ))}
              </div>
            </Sec>
          )}

          {sections.certifications.visible && sections.certifications.items.length > 0 && (
            <Sec title={sections.certifications.name} color={colors.primary} hf={hf}>
              {sections.certifications.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ marginBottom: 4, fontSize: bf.fontSize - 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {item.issuer && <div style={{ opacity: 0.6, fontSize: bf.fontSize - 2 }}>{item.issuer}{item.date && ` — ${item.date}`}</div>}
                </div>
              ))}
            </Sec>
          )}
        </div>
      </div>
    </div>
  );
}

function Sec({ title, color, hf, children }: { title: string; color: string; hf: { fontFamily: string; fontWeight: number; fontSize: number }; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.85, color, marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${color}` }}>{title}</div>
      {children}
    </div>
  );
}
