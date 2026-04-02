"use client";

import type { ResumeData } from "@/types/resume";

// Bronzor: Single-column centered, grid section layout (title 1/5, content 4/5)
export function BronzorTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const c = metadata.design.colors;
  const bf = metadata.typography.body;
  const hf = metadata.typography.heading;
  const m = metadata.page;

  return (
    <div className="w-full h-full overflow-hidden" style={{ fontFamily: bf.fontFamily, fontSize: bf.fontSize, lineHeight: bf.lineHeight, color: c.text, backgroundColor: c.background, padding: `${m.marginY}px ${m.marginX}px` }}>
      {/* Centered header */}
      <div style={{ textAlign: "center", marginBottom: m.gapY }}>
        {data.picture.url && !data.picture.effects.hidden && (
          <img src={data.picture.url} alt="" style={{ width: data.picture.size, height: data.picture.size, borderRadius: data.picture.borderRadius, objectFit: "cover", margin: "0 auto 8px" }} />
        )}
        <h1 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 1.5, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: 3 }}>{basics.name || "Your Name"}</h1>
        {basics.headline && <p style={{ fontSize: bf.fontSize + 1, opacity: 0.7, fontStyle: "italic", marginTop: 4 }}>{basics.headline}</p>}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 8px", marginTop: 8, fontSize: bf.fontSize - 2, opacity: 0.6 }}>
          {[basics.email, basics.phone, basics.location, basics.url.url].filter(Boolean).map((v, i, arr) => (
            <span key={i}>{v}{i < arr.length - 1 && <span style={{ margin: "0 4px" }}>&#8226;</span>}</span>
          ))}
        </div>
      </div>

      {/* Sections in grid layout: title 1/5 | content 4/5 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {summary && (
          <GridSection title="Summary" c={c} hf={hf}>
            <p style={{ fontSize: bf.fontSize - 1, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{summary}</p>
          </GridSection>
        )}
        {["experience", "education", "projects", "skills", "languages", "interests", "volunteer", "awards", "certifications", "publications", "references", "profiles"].map(k => {
          const s = sections[k as keyof typeof sections];
          if (!s || !s.visible || s.items.length === 0) return null;
          return (
            <GridSection key={k} title={s.name} c={c} hf={hf}>
              <Items k={k} items={s.items.filter((i: any) => !i.hidden)} c={c} bf={bf} />
            </GridSection>
          );
        })}
      </div>
    </div>
  );
}

function GridSection({ title, c, hf, children }: { title: string; c: { primary: string }; hf: { fontFamily: string; fontWeight: number; fontSize: number }; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: 12, borderTop: `1px solid ${c.primary}`, paddingTop: 8, paddingBottom: 8 }}>
      <h6 style={{ fontFamily: hf.fontFamily, fontWeight: hf.fontWeight, fontSize: hf.fontSize * 0.65, color: c.primary, textTransform: "uppercase", letterSpacing: 1 }}>{title}</h6>
      <div>{children}</div>
    </div>
  );
}

function Items({ k, items, c, bf }: { k: string; items: any[]; c: { primary: string; text: string }; bf: { fontSize: number } }) {
  if (k === "experience") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><b>{i.company}</b>{i.location && <span style={{ opacity: 0.6 }}>, {i.location}</span>}</div><span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6 }}>{i.date}</span></div><div style={{ fontStyle: "italic", color: c.primary, fontSize: bf.fontSize - 1 }}>{i.position}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "education") return <>{items.map(i => <div key={i.id} style={{ marginBottom: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b>{i.institution}</b><span style={{ fontSize: bf.fontSize - 2, fontStyle: "italic", opacity: 0.6 }}>{i.date}</span></div><div style={{ fontStyle: "italic", fontSize: bf.fontSize - 1 }}>{i.studyType}{i.area && ` in ${i.area}`}{i.score && ` — ${i.score}`}</div>{i.description && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description}</p>}</div>)}</>;
  if (k === "skills") return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>{items.map(i => <div key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name}</b>{i.keywords?.length > 0 && <span style={{ opacity: 0.6 }}> — {i.keywords.join(", ")}</span>}</div>)}</div>;
  if (k === "languages") return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>{items.map(i => <span key={i.id} style={{ fontSize: bf.fontSize - 1 }}><b>{i.name}</b>{i.description && <span style={{ opacity: 0.7 }}> ({i.description})</span>}</span>)}</div>;
  if (k === "interests") return <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{items.map(i => <span key={i.id} style={{ fontSize: bf.fontSize - 2 }}>{i.name}</span>)}</div>;
  return <>{items.map(i => <div key={i.id} style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between" }}><b>{i.name || i.title || i.organization || i.network || ""}</b><span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{i.date || ""}</span></div>{(i.issuer || i.publisher || i.awarder || i.position || i.username) && <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7 }}>{i.issuer || i.publisher || i.awarder || i.position || i.username}</div>}{(i.description || i.summary) && <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>{i.description || i.summary}</p>}</div>)}</>;
}
