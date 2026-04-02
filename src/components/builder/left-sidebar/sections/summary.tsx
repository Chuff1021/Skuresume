"use client";

import { useState } from "react";
import { TextAlignLeft as AlignLeft, Sparkle, CircleNotch } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, TextArea } from "../section-base";
import { AIPopover } from "../../ai-popover";

export function SummarySection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  const [generating, setGenerating] = useState(false);

  if (!data) return null;

  const generateSummary = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: data.sections.experience.items,
          skills: data.sections.skills.items,
          education: data.sections.education.items,
        }),
      });
      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          updateData((d) => { d.summary = text; });
        }
      }
    } catch (e) {
      console.error("Failed to generate summary:", e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SectionBase
      title="Summary"
      icon={<AlignLeft size={16} />}
      defaultOpen
    >
      <TextArea
        value={data.summary}
        onChange={(v) =>
          updateData((d) => {
            d.summary = v;
          })
        }
        placeholder="A brief professional summary highlighting your key strengths and career goals..."
        rows={5}
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={generateSummary}
          disabled={generating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {generating ? <CircleNotch size={12} className="animate-spin" /> : <Sparkle size={12} weight="fill" />}
          {generating ? "Generating..." : "AI Generate Summary"}
        </button>
        <AIPopover
          currentText={data.summary}
          onApply={(text) => updateData((d) => { d.summary = text; })}
          mode="rewrite"
        />
      </div>
    </SectionBase>
  );
}
