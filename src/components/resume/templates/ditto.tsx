"use client";

import type { ResumeData } from "@/types/resume";

// Ditto: Colored header banner + two-column with sidebar LEFT
export function DittoTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: c.text, backgroundColor: c.background }}>
      {/* Colored header banner */}
      <div style={{ backgroundColor: c.primary, color: c.background, padding: `${m.marginY}px ${m.marginX}px` }}>
        <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.5, lineHeight: 1.1, color: c.background }}>{basics.name || "Your Name"}</h1>
        {basics.headline && <p style={{ fontSize: bf.fontSize + 1, opacity: 0.85, marginTop: 4 }}>{basics.headline}</p>}
      </div>

      {/* Contact bar below banner */}
      <div style={{ padding: `8px ${m.marginX}px`, borderBottom: `1px solid ${c.primary}20`, display: "flex", flexWrap: "wrap", gap: "0 12px", fontSize: bf.fontSize - 2, opacity: 0.7 }}>
        {basics.email && <span>{basics.email}</span>}
        {basics.phone && <span>{basics.phone}</span>}
        {basics.location && <span>{basics.location}</span>}
        {basics.url.url && <span>{basics.url.url}</span>}
      </div>

      {/* Two columns: sidebar LEFT */}
      <div style={{ display: "flex", padding: `${m.gapY}px ${m.marginX}px ${m.marginY}px`, gap: m.gapX }}>
        {/* Sidebar */}
        <div style={{ width: `${sw}%`, display: "flex", flexDirection: "column", gap: m.gapY }}>
          <RenderSections keys={["skills", "languages", "interests", "certifications", "profiles"]} sections={sections} c={c} bf={bf} hf={hf} />
        </div>
        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {summary && <div><Heading t="Summary" c={c} hf={hf} /><p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap" }}>{summary}</p></div>}
          <RenderSections keys={["experience", "education", "projects", "volunteer", "awards", "publications", "references"]} sections={sections} c={c} bf={bf} hf={hf} />
        </div>
      </div>
    </div>
  );
}

function Heading({ t, c, hf }: { t: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.75, color: c.primary, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.primary}`, paddingBottom: 3, marginBottom: 6, lineHeight: 1.3 }}>{t}</h6>;
}

function RenderSections({ keys, sections, c, bf, hf }: { keys: string[]; sections: ResumeData["sections"]; c: { primary: string; text: string }; bf: { fontSize: number }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <>{keys.filter(k => { const s = sections[k as keyof typeof sections]; return s && s.visible && s.items.length > 0; }).map(k => {
    const section = sections[k as keyof typeof sections];
    return <div key={k}><Heading t={section.name} c={c} hf={hf} /><Items k={k} items={section.items.filter((i: any) => !i.hidden)} c={c} bf={bf} /></div>;
  })}</>;
}

function Items({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string; text: string }; bf: { fontSize: number } }) {
  if (k === "experience") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><b>{i.position}</b>{i.company && <span style={{ color: c.primary }}> at {i.company}</span>}</div><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date}</span></div>{i.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.location}</div>}{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "education") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b>{i.institution}</b><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date}</span></div><div style={{ fontSize: bf.fontSize - 1, opacity: 0.8 }}>{i.studyType}{i.area && ` in ${i.area}`}{i.score && ` — ${i.score}`}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "skills") return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{items.map(i => <div key={i.id}><div style={{ display: "flex", justifyContent: "space-between", fontSize: bf.fontSize - 1 }}><b>{i.name}</b></div><div style={{ display: "flex", gap: 2, marginTop: 3 }}>{Array.from({ length: 5 }).map((_, j) => <div key={j} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: j < i.level ? c.primary : `${c.primary}20` }} />)}</div>{i.keywords?.length > 0 && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6, marginTop: 2 }}>{i.keywords.join(", ")}</div>}</div>)}</div>;
  if (k === "languages") return <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name}</b>{i.description && <span style={{ opacity: 0.7 }}> — {i.description}</span>}</div>)}</div>;
  if (k === "interests") return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{items.map(i => <span key={i.id} style={{ padding: "2px 8px", borderRadius: 4, backgroundColor: `${c.primary}10`, color: c.primary, fontSize: bf.fontSize - 2 }}>{i.name}</span>)}</div>;
  return <>{items.map(i => <div key={i.id} style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontSize: bf.fontSize }}>{i.name || i.title || i.organization || i.network || ""}</b><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date || ""}</span></div>{(i.issuer || i.publisher || i.awarder || i.position || i.username) && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>{i.issuer || i.publisher || i.awarder || i.position || i.username}</div>}{(i.description || i.summary) && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description || i.summary}</p>}</div>)}</>;
}
