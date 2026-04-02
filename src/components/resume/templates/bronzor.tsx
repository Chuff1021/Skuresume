"use client";

import type { ResumeData } from "@/types/resume";

// Bronzor: Classic traditional layout with serif feel
export function BronzorTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: colors.text, backgroundColor: colors.background, padding: `${m.marginY}px ${m.marginX}px` }}>
      {/* Header - centered classic */}
      <div className="text-center" style={{ borderBottom: `3px double ${colors.primary}`, paddingBottom: 12, marginBottom: m.gapY }}>
        <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 2, letterSpacing: 3, textTransform: "uppercase" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && <p className="mt-1" style={{ fontSize: bf.fontSize + 1, fontStyle: "italic", opacity: 0.7 }}>{basics.headline}</p>}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap" style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.email && basics.phone && <span>&#8226;</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {(basics.email || basics.phone) && basics.location && <span>&#8226;</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url.url && <><span>&#8226;</span><span>{basics.url.url}</span></>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: m.gapY }}>
        {summary && (
          <ClassicSection title="Professional Summary" color={colors.primary} hf={hf}>
            <p style={{ fontSize: bf.fontSize - 1, fontStyle: "italic" }}>{summary}</p>
          </ClassicSection>
        )}

        {sections.experience.visible && sections.experience.items.length > 0 && (
          <ClassicSection title={sections.experience.name} color={colors.primary} hf={hf}>
            {sections.experience.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span style={{ fontWeight: 700 }}>{item.company}</span>
                    {item.location && <span style={{ opacity: 0.6 }}>, {item.location}</span>}
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6 }}>{item.date}</span>
                </div>
                <div style={{ fontStyle: "italic", color: colors.primary, fontSize: bf.fontSize - 1 }}>{item.position}</div>
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 4, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </ClassicSection>
        )}

        {sections.education.visible && sections.education.items.length > 0 && (
          <ClassicSection title={sections.education.name} color={colors.primary} hf={hf}>
            {sections.education.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span style={{ fontWeight: 700 }}>{item.institution}</span>
                  </div>
                  <span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6 }}>{item.date}</span>
                </div>
                <div style={{ fontStyle: "italic", fontSize: bf.fontSize - 1 }}>
                  {item.studyType}{item.area && ` in ${item.area}`}{item.score && ` — GPA: ${item.score}`}
                </div>
                {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
              </div>
            ))}
          </ClassicSection>
        )}

        {/* Skills in columns */}
        {sections.skills.visible && sections.skills.items.length > 0 && (
          <ClassicSection title={sections.skills.name} color={colors.primary} hf={hf}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {sections.skills.items.filter(i => !i.hidden).map(item => (
                <div key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.keywords.length > 0 && <span style={{ opacity: 0.6 }}> — {item.keywords.join(", ")}</span>}
                </div>
              ))}
            </div>
          </ClassicSection>
        )}

        {sections.awards.visible && sections.awards.items.length > 0 && (
          <ClassicSection title={sections.awards.name} color={colors.primary} hf={hf}>
            {sections.awards.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 4 }}>
                <div className="flex justify-between items-baseline">
                  <span style={{ fontWeight: 600 }}>{item.title}</span>
                  <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                </div>
                {item.awarder && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.awarder}</div>}
              </div>
            ))}
          </ClassicSection>
        )}

        {sections.certifications.visible && sections.certifications.items.length > 0 && (
          <ClassicSection title={sections.certifications.name} color={colors.primary} hf={hf}>
            {sections.certifications.items.filter(i => !i.hidden).map(item => (
              <div key={item.id} style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.issuer && <span style={{ opacity: 0.6 }}> — {item.issuer}</span>}
                {item.date && <span style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}> ({item.date})</span>}
              </div>
            ))}
          </ClassicSection>
        )}
      </div>
    </div>
  );
}

function ClassicSection({ title, color, hf, children }: { title: string; color: string; hf: { fontFamily: string; fontWeight: number; fontSize: number }; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize, textTransform: "uppercase", letterSpacing: 2, color, borderBottom: `1px solid ${color}`, paddingBottom: 3, marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
