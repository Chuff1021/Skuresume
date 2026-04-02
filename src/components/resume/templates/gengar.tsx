"use client";

import type { ResumeData } from "@/types/resume";

// Gengar: Sidebar LEFT with 20% tinted background, header IN sidebar with solid primary bg
export function GengarTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: c.text, backgroundColor: c.background }}>
      {/* Sidebar tinted background panel */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${sw}%`, backgroundColor: `${c.primary}20` }} />

      <div style={{ position: "relative", display: "flex", height: "100%" }}>
        {/* Sidebar */}
        <div style={{ width: `${sw}%`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header in sidebar with solid primary bg */}
          <div style={{ backgroundColor: c.primary, color: c.background, padding: `${m.marginY}px ${m.marginX * 0.7}px` }}>
            <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.2, lineHeight: 1.2, color: c.background }}>{basics.name || "Your Name"}</h1>
            {basics.headline && <p style={{ fontSize: bf.fontSize - 1, opacity: 0.85, marginTop: 4 }}>{basics.headline}</p>}
            {/* Contact vertical */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 10, fontSize: bf.fontSize - 2, opacity: 0.9 }}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>{basics.phone}</span>}
              {basics.location && <span>{basics.location}</span>}
              {basics.url.url && <span>{basics.url.url}</span>}
            </div>
          </div>
          {/* Sidebar sections */}
          <div style={{ padding: `${m.gapY}px ${m.marginX * 0.7}px`, display: "flex", flexDirection: "column", gap: m.gapY }}>
            {["skills", "languages", "interests", "certifications", "profiles"].map(k => {
              const s = sections[k as keyof typeof sections];
              if (!s || !s.visible || s.items.length === 0) return null;
              return <div key={k}><SideH t={s.name} c={c} hf={hf} /><SideItems k={k} items={s.items.filter((i: any) => !i.hidden)} c={c} bf={bf} /></div>;
            })}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: `${m.marginY}px ${m.marginX}px`, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {/* Summary with tinted bg */}
          {summary && (
            <div style={{ backgroundColor: `${c.primary}20`, padding: `${m.gapY * 0.8}px ${m.gapX}px`, borderRadius: 4 }}>
              <p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap" }}>{summary}</p>
            </div>
          )}
          {["experience", "education", "projects", "volunteer", "awards", "publications", "references"].map(k => {
            const s = sections[k as keyof typeof sections];
            if (!s || !s.visible || s.items.length === 0) return null;
            return <div key={k}><MainH t={s.name} c={c} hf={hf} /><MainItems k={k} items={s.items.filter((i: any) => !i.hidden)} c={c} bf={bf} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

function SideH({ t, c, hf }: { t: string; c: { primary: string; text: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.65, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: `1px solid ${c.primary}40`, paddingBottom: 3, marginBottom: 6, color: c.text }}>{t}</h6>;
}

function MainH({ t, c, hf }: { t: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.75, color: c.primary, textTransform: "uppercase", letterSpacing: 1, borderBottom: `2px solid ${c.primary}`, paddingBottom: 3, marginBottom: 8 }}>{t}</h6>;
}

function SideItems({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string }; bf: { fontSize: number } }) {
  if (k === "skills") return <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>{items.map(i => <div key={i.id}><div style={{ fontSize: bf.fontSize - 1, fontWeight: 600, marginBottom: 2 }}>{i.name}</div><div style={{ height: 4, borderRadius: 2, backgroundColor: `${c.primary}15` }}><div style={{ height: "100%", borderRadius: 2, backgroundColor: c.primary, width: `${(i.level / 5) * 100}%`, opacity: 0.7 }} /></div></div>)}</div>;
  if (k === "languages") return <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name}</b>{i.description && <span style={{ opacity: 0.7 }}> — {i.description}</span>}</div>)}</div>;
  if (k === "interests") return <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{items.map(i => <span key={i.id} style={{ padding: "1px 6px", borderRadius: 3, border: `1px solid ${c.primary}30`, fontSize: bf.fontSize - 2 }}>{i.name}</span>)}</div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name || i.network || ""}</b>{(i.issuer || i.username) && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>{i.issuer || i.username}</div>}</div>)}</div>;
}

function MainItems({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string }; bf: { fontSize: number } }) {
  if (k === "experience") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><b>{i.position}</b>{i.company && <span style={{ color: c.primary }}> at {i.company}</span>}</div><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date}</span></div>{i.location && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.location}</div>}{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "education") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b>{i.institution}</b><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date}</span></div><div style={{ fontSize: bf.fontSize - 1, opacity: 0.8 }}>{i.studyType}{i.area && ` in ${i.area}`}{i.score && ` — ${i.score}`}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  return <>{items.map(i => <div key={i.id} style={{ marginBottom: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b>{i.name || i.title || i.organization || ""}</b><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date || ""}</span></div>{(i.issuer || i.publisher || i.awarder || i.position) && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>{i.issuer || i.publisher || i.awarder || i.position}</div>}{(i.description || i.summary) && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description || i.summary}</p>}</div>)}</>;
}
