"use client";

import type { ResumeData } from "@/types/resume";

// Pikachu: Two-column sidebar LEFT, colored rounded header box in main column
export function PikachuTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: c.text, backgroundColor: c.background, padding: `${m.marginY}px ${m.marginX}px` }}>
      <div style={{ display: "flex", gap: m.gapX }}>
        {/* Sidebar LEFT */}
        <div style={{ width: `${sw}%`, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {/* Picture */}
          {data.picture.url && !data.picture.effects.hidden && (
            <img src={data.picture.url} alt="" style={{ width: "100%", borderRadius: data.picture.borderRadius, objectFit: "cover" }} />
          )}
          {["skills", "languages", "interests", "certifications", "profiles"].map(k => {
            const s = sections[k as keyof typeof sections];
            if (!s || !s.visible || s.items.length === 0) return null;
            return <div key={k}><H t={s.name} c={c} hf={hf} /><SideItems k={k} items={s.items.filter((i: any) => !i.hidden)} c={c} bf={bf} /></div>;
          })}
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gapY }}>
          {/* Colored header box */}
          <div style={{ backgroundColor: c.primary, color: c.background, padding: `${m.marginY * 0.8}px ${m.marginX * 0.8}px`, borderRadius: data.picture.borderRadius || 8 }}>
            <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.5, lineHeight: 1.1, color: c.background }}>{basics.name || "Your Name"}</h1>
            {basics.headline && <p style={{ fontSize: bf.fontSize + 1, opacity: 0.85, marginTop: 2 }}>{basics.headline}</p>}
            <div style={{ borderTop: `1px solid ${c.background}50`, marginTop: 8, paddingTop: 8, display: "flex", flexWrap: "wrap", gap: "0 12px", fontSize: bf.fontSize - 2, opacity: 0.85 }}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>{basics.phone}</span>}
              {basics.location && <span>{basics.location}</span>}
              {basics.url.url && <span>{basics.url.url}</span>}
            </div>
          </div>

          {summary && <div><H t="Summary" c={c} hf={hf} /><p style={{ fontSize: bf.fontSize - 1, whiteSpace: "pre-wrap" }}>{summary}</p></div>}
          {["experience", "education", "projects", "volunteer", "awards", "publications", "references"].map(k => {
            const s = sections[k as keyof typeof sections];
            if (!s || !s.visible || s.items.length === 0) return null;
            return <div key={k}><H t={s.name} c={c} hf={hf} /><MainItems k={k} items={s.items.filter((i: any) => !i.hidden)} c={c} bf={bf} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

function H({ t, c, hf }: { t: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number } }) {
  return <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.75, color: c.primary, borderBottom: `2px solid ${c.primary}`, paddingBottom: 3, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{t}</h6>;
}

function SideItems({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string }; bf: { fontSize: number } }) {
  if (k === "skills") return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{items.map(i => <div key={i.id}><div style={{ fontSize: bf.fontSize - 1, fontWeight: 600 }}>{i.name}</div><div style={{ display: "flex", gap: 2, marginTop: 3 }}>{Array.from({ length: 5 }).map((_, j) => <div key={j} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: j < i.level ? c.primary : `${c.primary}15` }} />)}</div></div>)}</div>;
  if (k === "languages") return <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name}</b>{i.description && <span style={{ opacity: 0.7 }}> — {i.description}</span>}</div>)}</div>;
  if (k === "interests") return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{items.map(i => <span key={i.id} style={{ padding: "2px 8px", borderRadius: 4, backgroundColor: `${c.primary}10`, color: c.primary, fontSize: bf.fontSize - 2 }}>{i.name}</span>)}</div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name || i.network || ""}</b>{(i.issuer || i.username) && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>{i.issuer || i.username}</div>}{i.date && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date}</div>}</div>)}</div>;
}

function MainItems({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string }; bf: { fontSize: number } }) {
  if (k === "experience") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 10 }}><div style={{ fontWeight: 700 }}>{i.position}</div><div style={{ color: c.primary, fontSize: bf.fontSize - 1 }}>{i.company}{i.location && ` — ${i.location}`}</div><div style={{ fontSize: bf.fontSize - 2, opacity: 0.5, marginTop: 2 }}>{i.date}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 4, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "education") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 8 }}><div style={{ fontWeight: 700 }}>{i.studyType}{i.area && ` in ${i.area}`}</div><div style={{ color: c.primary, fontSize: bf.fontSize - 1 }}>{i.institution}</div><div style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}>{i.date}{i.score && ` — GPA: ${i.score}`}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  return <>{items.map(i => <div key={i.id} style={{ marginBottom: 6 }}><div style={{ fontWeight: 600 }}>{i.name || i.title || i.organization || ""}</div>{(i.issuer || i.publisher || i.awarder || i.position) && <div style={{ fontSize: bf.fontSize - 1, opacity: 0.7 }}>{i.issuer || i.publisher || i.awarder || i.position}</div>}{i.date && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}>{i.date}</div>}{(i.description || i.summary) && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description || i.summary}</p>}</div>)}</>;
}
