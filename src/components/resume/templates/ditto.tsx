"use client";

import type { ResumeData } from "@/types/resume";

// Ditto: Clean minimal single-column layout
export function DittoTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight,
        color: colors.text, backgroundColor: colors.background,
        padding: `${m.marginY}px ${m.marginX}px`,
      }}
    >
      {/* Header - left aligned minimal */}
      <div className="mb-6">
        <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 2, lineHeight: 1.1 }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p className="mt-1" style={{ fontSize: bf.fontSize + 1, opacity: 0.7 }}>{basics.headline}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3" style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url.url && <span>{basics.url.url}</span>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: m.gapY }}>
        {summary && (
          <Section title="Summary" colors={colors} hf={hf}>
            <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
          </Section>
        )}

        {sections.experience.visible && sections.experience.items.length > 0 && (
          <Section title={sections.experience.name} colors={colors} hf={hf}>
            {sections.experience.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{item.position}{item.company && `, ${item.company}`}</div>
                <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6, display: "flex", gap: 8 }}>
                  {item.date && <span>{item.date}</span>}
                  {item.location && <span>{item.location}</span>}
                </div>
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 4, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {sections.education.visible && sections.education.items.length > 0 && (
          <Section title={sections.education.name} colors={colors} hf={hf}>
            {sections.education.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.studyType}{item.area && ` in ${item.area}`}{item.institution && `, ${item.institution}`}</div>
                <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                  {item.date}{item.score && ` — GPA: ${item.score}`}
                </div>
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {sections.skills.visible && sections.skills.items.length > 0 && (
          <Section title={sections.skills.name} colors={colors} hf={hf}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {sections.skills.items.filter(i => !i.hidden).map(item => (
                <span key={item.id} style={{ padding: "2px 10px", borderRadius: 4, border: `1px solid ${colors.primary}30`, fontSize: bf.fontSize - 2 }}>
                  {item.name}
                </span>
              ))}
            </div>
          </Section>
        )}

        {sections.projects.visible && sections.projects.items.length > 0 && (
          <Section title={sections.projects.name} colors={colors} hf={hf}>
            {sections.projects.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.date && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</div>}
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {sections.languages.visible && sections.languages.items.length > 0 && (
          <Section title={sections.languages.name} colors={colors} hf={hf}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {sections.languages.items.filter(i => !i.hidden).map(item => (
                <span key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                  <strong>{item.name}</strong>{item.description && ` — ${item.description}`}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, colors, hf, children }: {
  title: string; colors: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number }; children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.8, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6, borderBottom: `1px solid ${colors.primary}20`, paddingBottom: 4, opacity: 0.8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
