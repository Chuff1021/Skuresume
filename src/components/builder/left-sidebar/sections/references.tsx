"use client";

import { UserCircle, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input, TextArea } from "../section-base";
import type { ReferenceItem } from "@/types/resume";

function createReferenceItem(): ReferenceItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    name: "",
    description: "",
    summary: "",
    url: { url: "", label: "" },
  };
}

export function ReferencesSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.references;

  const addItem = () => {
    updateData((d) => {
      d.sections.references.items.push(createReferenceItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.references.items = d.sections.references.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.references.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="References"
      icon={<UserCircle size={16} />}
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
                  {item.name || "New Reference"}
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
              <Field label="Name">
                <Input
                  value={item.name}
                  onChange={(v) => updateItem(item.id, "name", v)}
                  placeholder="Reference Name"
                />
              </Field>
              <Field label="Description">
                <Input
                  value={item.description}
                  onChange={(v) => updateItem(item.id, "description", v)}
                  placeholder="Title at Company"
                />
              </Field>
            </div>
            <Field label="Summary">
              <TextArea
                value={item.summary}
                onChange={(v) => updateItem(item.id, "summary", v)}
                placeholder="Reference summary or quote..."
                rows={3}
              />
            </Field>
            <Field label="URL">
              <Input
                value={item.url.url}
                onChange={(v) =>
                  updateData((d) => {
                    const i = d.sections.references.items.find((x) => x.id === item.id);
                    if (i) i.url.url = v;
                  })
                }
                placeholder="https://linkedin.com/in/reference"
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Reference
        </button>
      </div>
    </SectionBase>
  );
}
