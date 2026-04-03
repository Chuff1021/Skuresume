"use client";

import { Trophy, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input, TextAreaWithAI } from "../section-base";
import type { AwardItem } from "@/types/resume";

function createAwardItem(): AwardItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    title: "",
    awarder: "",
    date: "",
    description: "",
    url: { url: "", label: "" },
  };
}

export function AwardsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.awards;

  const addItem = () => {
    updateData((d) => {
      d.sections.awards.items.push(createAwardItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.awards.items = d.sections.awards.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.awards.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="Awards"
      icon={<Trophy size={16} />}
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-card border border-border space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                <span className="text-xs font-medium text-muted">
                  {item.title || "New Award"}
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
              <Field label="Title">
                <Input
                  value={item.title}
                  onChange={(v) => updateItem(item.id, "title", v)}
                  placeholder="Award Title"
                />
              </Field>
              <Field label="Awarder">
                <Input
                  value={item.awarder}
                  onChange={(v) => updateItem(item.id, "awarder", v)}
                  placeholder="Awarding Organization"
                />
              </Field>
              <Field label="Date">
                <Input
                  value={item.date}
                  onChange={(v) => updateItem(item.id, "date", v)}
                  placeholder="March 2023"
                />
              </Field>
              <Field label="URL">
                <Input
                  value={item.url.url}
                  onChange={(v) =>
                    updateData((d) => {
                      const i = d.sections.awards.items.find((x) => x.id === item.id);
                      if (i) i.url.url = v;
                    })
                  }
                  placeholder="https://example.com/award"
                />
              </Field>
            </div>
            <Field label="Description">
              <TextAreaWithAI
                aiMode="improve"
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Describe the award..."
                rows={3}
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Award
        </button>
      </div>
    </SectionBase>
  );
}
