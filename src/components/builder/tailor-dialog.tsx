"use client";

import { useState } from "react";
import { Sparkle, CircleNotch, X, CheckCircle } from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import { useResumeStore } from "@/stores/resume";

interface TailorPatch {
  summary?: string;
  headline?: string;
  experiences?: { id: string; description: string }[];
  skillKeywords?: { id: string; addKeywords: string[] }[];
  newSkillBucket?: { name: string; keywords: string[] } | null;
  notes?: string[];
}

export function TailorDialog({ onClose }: { onClose: () => void }) {
  const [jobDescription, setJobDescription] = useState("");
  const [patch, setPatch] = useState<TailorPatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  const handleTailor = async () => {
    if (!jobDescription.trim() || !data) return;
    setLoading(true);
    setPatch(null);
    setApplied(false);
    setError(null);
    try {
      const res = await fetch("/api/ai/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, jobDescription }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Tailor failed");
      }
      const result: TailorPatch = await res.json();
      setPatch(result);
    } catch (e) {
      console.error("Tailor failed:", e);
      setError(e instanceof Error ? e.message : "Tailor failed");
    } finally {
      setLoading(false);
    }
  };

  const applyPatch = () => {
    if (!patch || !data) return;

    updateData((d) => {
      if (patch.summary) d.summary = patch.summary;
      if (patch.headline) d.basics.headline = patch.headline;

      if (patch.experiences?.length) {
        for (const ex of patch.experiences) {
          const item = d.sections.experience.items.find((i) => i.id === ex.id);
          if (item) item.description = ex.description;
        }
      }

      if (patch.skillKeywords?.length) {
        for (const sk of patch.skillKeywords) {
          const item = d.sections.skills.items.find((i) => i.id === sk.id);
          if (item) {
            const existing = new Set(item.keywords.map((k) => k.toLowerCase()));
            for (const kw of sk.addKeywords || []) {
              if (kw && !existing.has(kw.toLowerCase())) {
                item.keywords.push(kw);
                existing.add(kw.toLowerCase());
              }
            }
          }
        }
      }

      if (patch.newSkillBucket?.name) {
        d.sections.skills.items.push({
          id: nanoid(8),
          hidden: false,
          name: patch.newSkillBucket.name,
          description: "",
          level: 4,
          keywords: patch.newSkillBucket.keywords || [],
        });
      }
    });

    setApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-lg border border-border bg-popover shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Sparkle size={20} weight="fill" className="text-primary" />
            <h2 className="text-base font-semibold">Tailor Resume to Job</h2>
          </div>
          <button onClick={onClose} className="size-8 rounded-md hover:bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Paste the job description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={8}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <button
            onClick={handleTailor}
            disabled={loading || !jobDescription.trim()}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><CircleNotch size={16} className="animate-spin" /> Analyzing &amp; rewriting...</>
            ) : (
              <><Sparkle size={16} weight="fill" /> Tailor Resume</>
            )}
          </button>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {patch && (
            <div className="space-y-3">
              <div className="rounded-md border border-border bg-card p-4 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-1.5">
                  <Sparkle size={14} className="text-primary" weight="fill" />
                  What will change
                </h3>

                {patch.headline && (
                  <Section label="Headline">
                    <p className="text-xs text-muted-foreground">New: <span className="text-foreground">{patch.headline}</span></p>
                  </Section>
                )}

                {patch.summary && (
                  <Section label="Summary (rewritten)">
                    <p className="text-xs text-muted-foreground leading-relaxed">{patch.summary}</p>
                  </Section>
                )}

                {patch.experiences && patch.experiences.length > 0 && (
                  <Section label={`Experience bullets rewritten (${patch.experiences.length})`}>
                    {patch.experiences.map((ex) => {
                      const original = data?.sections.experience.items.find((i) => i.id === ex.id);
                      return (
                        <div key={ex.id} className="text-xs">
                          <div className="font-medium text-foreground">{original?.position} @ {original?.company}</div>
                          <pre className="text-muted-foreground whitespace-pre-wrap font-sans mt-1">{ex.description}</pre>
                        </div>
                      );
                    })}
                  </Section>
                )}

                {patch.skillKeywords && patch.skillKeywords.some((s) => s.addKeywords?.length) && (
                  <Section label="Skills to add">
                    {patch.skillKeywords
                      .filter((s) => s.addKeywords?.length)
                      .map((s) => {
                        const bucket = data?.sections.skills.items.find((i) => i.id === s.id);
                        return (
                          <div key={s.id} className="text-xs">
                            <span className="font-medium text-foreground">{bucket?.name || "Bucket"}:</span>{" "}
                            <span className="text-muted-foreground">+ {s.addKeywords.join(", ")}</span>
                          </div>
                        );
                      })}
                  </Section>
                )}

                {patch.newSkillBucket && (
                  <Section label="New skill bucket">
                    <p className="text-xs">
                      <span className="font-medium text-foreground">{patch.newSkillBucket.name}:</span>{" "}
                      <span className="text-muted-foreground">{patch.newSkillBucket.keywords.join(", ")}</span>
                    </p>
                  </Section>
                )}

                {patch.notes && patch.notes.length > 0 && (
                  <Section label="Notes">
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      {patch.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                  </Section>
                )}
              </div>

              {applied ? (
                <div className="w-full py-2.5 rounded-md bg-success/10 text-success text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle size={16} weight="fill" />
                  Applied to resume — close to review
                </div>
              ) : (
                <button
                  onClick={applyPatch}
                  className="w-full py-2.5 rounded-md bg-success text-white text-sm font-medium hover:bg-success/90 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} weight="fill" />
                  Apply All Changes
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
