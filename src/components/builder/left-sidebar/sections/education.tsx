"use client";

import { GraduationCap, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input, TextArea } from "../section-base";
import type { EducationItem } from "@/types/resume";

function createEducationItem(): EducationItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    institution: "",
    studyType: "",
    area: "",
    score: "",
    date: "",
    description: "",
    url: { url: "", label: "" },
  };
}

export function EducationSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.education;

  const addItem = () => {
    updateData((d) => {
      d.sections.education.items.push(createEducationItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.education.items = d.sections.education.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.education.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="Education"
      icon={<GraduationCap size={16} />}
    >
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-card border border-border space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                <span className="text-xs font-medium text-muted">
                  {item.institution || item.area || "New Education"}
                </span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="w-6 h-6 rounded hover:bg-destructive/10 flex items-center justify-center transition-colors"
              >
                <Trash size={14} className="text-destructive" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Institution">
                <Input
                  value={item.institution}
                  onChange={(v) => updateItem(item.id, "institution", v)}
                  placeholder="University Name"
                />
              </Field>
              <Field label="Degree">
                <Input
                  value={item.studyType}
                  onChange={(v) => updateItem(item.id, "studyType", v)}
                  placeholder="Bachelor of Science"
                />
              </Field>
              <Field label="Field of Study">
                <Input
                  value={item.area}
                  onChange={(v) => updateItem(item.id, "area", v)}
                  placeholder="Computer Science"
                />
              </Field>
              <Field label="Date">
                <Input
                  value={item.date}
                  onChange={(v) => updateItem(item.id, "date", v)}
                  placeholder="2016 - 2020"
                />
              </Field>
              <Field label="Score / GPA">
                <Input
                  value={item.score}
                  onChange={(v) => updateItem(item.id, "score", v)}
                  placeholder="3.8 / 4.0"
                />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Notable achievements, courses, activities..."
                rows={2}
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>
    </SectionBase>
  );
}
