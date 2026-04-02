"use client";

import { AlignLeft } from "lucide-react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, TextArea } from "../section-base";

export function SummarySection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;

  return (
    <SectionBase
      title="Summary"
      icon={<AlignLeft className="w-4 h-4" />}
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
    </SectionBase>
  );
}
