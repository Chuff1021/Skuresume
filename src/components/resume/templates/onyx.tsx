"use client";

import type { ResumeData } from "@/types/resume";

// Onyx: Clean single-column with horizontal header, picture left, info right
// Matches rxresu.me Onyx - simplest template, no sidebar column
export function OnyxTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;

  const visibleSections = (keys: string[]) =>
    keys.filter((k) => {
      const s = sections[k as keyof typeof sections];
      return s && s.visible && s.items.length > 0;
    });

  const mainKeys = visibleSections(["experience", "education", "projects", "volunteer", "references", "publications", "awards", "certifications"]);
  const sideKeys = visibleSections(["skills", "languages", "interests", "profiles"]);

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: c.text, backgroundColor: c.background, padding: `${m.marginY}px ${m.marginX}px` }}>
      {/* Header: picture left, info right */}
      <div style={{ display: "flex", alignItems: "center", gap: m.gapX, borderBottom: `2px solid ${c.primary}`, paddingBottom: m.marginY }}>
        {data.picture.url && !data.picture.effects.hidden && (
          <img src={data.picture.url} alt="" style={{ width: data.picture.size, height: data.picture.size, borderRadius: data.picture.borderRadius, objectFit: "cover" }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.5, lineHeight: hf.lineHeight, margin: 0 }}>{basics.name || "Your Name"}</h1>
          {basics.headline && <p style={{ fontSize: bf.fontSize + 1, opacity: 0.8, margin: "2px 0 0" }}>{basics.headline}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 12px", marginTop: 6, fontSize: bf.fontSize - 2, opacity: 0.7 }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.location && <span>{basics.location}</span>}
            {basics.url.url && <span>{basics.url.url}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginTop: m.gapY }}>
          <SectionHead title="Summary" c={c} hf={hf} />
          <p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap" }}>{summary}</p>
        </div>
      )}

      {/* Main sections */}
      {mainKeys.map((key) => (
        <div key={key} style={{ marginTop: m.gapY }}>
          <SectionHead title={sections[key as keyof typeof sections].name} c={c} hf={hf} />
          <SectionItems sectionKey={key} sections={sections} c={c} bf={bf} />
        </div>
      ))}

      {/* Side sections */}
      {sideKeys.map((key) => (
        <div key={key} style={{ marginTop: m.gapY }}>
          <SectionHead title={sections[key as keyof typeof sections].name} c={c} hf={hf} />
          <SectionItems sectionKey={key} sections={sections} c={c} bf={bf} />
        </div>
      ))}
    </div>
  );
}

function SectionHead({ title, c, hf }: { title: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.75, color: c.primary, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px", lineHeight: 1.3 }}>{title}</h6>;
}

function SectionItems({ sectionKey, sections, c, bf }: { sectionKey: string; sections: ResumeData["sections"]; c: { primary: string; text: string }; bf: { fontSize: number } }) {
  const section = sections[sectionKey as keyof typeof sections];
  if (!section) return null;
  const items = section.items.filter((i: { hidden: boolean }) => !i.hidden);

  if (sectionKey === "experience") {
    return <>{items.map((item: any) => (
      <div key={item.id} style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div><span style={{ fontWeight: 700 }}>{item.company}</span>{item.location && <span style={{ opacity: 0.6 }}>, {item.location}</span>}</div>
          <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap" }}>{item.date}</span>
        </div>
        <div style={{ color: c.primary, fontSize: bf.fontSize - 1 }}>{item.position}</div>
        {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap", opacity: 0.9 }}>{item.description}</p>}
      </div>
    ))}</>;
  }
  if (sectionKey === "education") {
    return <>{items.map((item: any) => (
      <div key={item.id} style={{ marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontWeight: 700 }}>{item.institution}</span>
          <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
        </div>
        <div style={{ fontSize: bf.fontSize - 1, opacity: 0.8 }}>{item.studyType}{item.area && ` in ${item.area}`}{item.score && ` — ${item.score}`}</div>
        {item.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{item.description}</p>}
      </div>
    ))}</>;
  }
  if (sectionKey === "skills") {
    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>{items.map((item: any) => (
      <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 600, fontSize: bf.fontSize - 1 }}>{item.name}</span>
        <LevelBar level={item.level} color={c.primary} />
      </div>
    ))}</div>;
  }
  if (sectionKey === "languages") {
    return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>{items.map((item: any) => (
      <span key={item.id} style={{ fontSize: bf.fontSize - 1 }}><strong>{item.name}</strong>{item.description && <span style={{ opacity: 0.7 }}> — {item.description}</span>}</span>
    ))}</div>;
  }
  if (sectionKey === "interests") {
    return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{items.map((item: any) => (
      <span key={item.id} style={{ padding: "1px 8px", borderRadius: 3, backgroundColor: `${c.primary}12`, color: c.primary, fontSize: bf.fontSize - 2 }}>{item.name}</span>
    ))}</div>;
  }
  // Generic: projects, awards, certifications, publications, volunteer, references, profiles
  return <>{items.map((item: any) => (
    <div key={item.id} style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontWeight: 600, fontSize: bf.fontSize }}>{item.name || item.title || item.organization || item.network || ""}</span>
        <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date || ""}</span>
      </div>
      {(item.issuer || item.publisher || item.awarder || item.position || item.username) && (
        <div style={{ fontSize: bf.fontSize - 1, opacity: 0.7 }}>{item.issuer || item.publisher || item.awarder || item.position || item.username}</div>
      )}
      {(item.description || item.summary) && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap", opacity: 0.9 }}>{item.description || item.summary}</p>}
    </div>
  ))}</>;
}

function LevelBar({ level, color }: { level: number; color: string }) {
  return <div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }).map((_, i) => (
    <div key={i} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: i < level ? color : `${color}20` }} />
  ))}</div>;
}
