"use client";

import { Translate, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input } from "../section-base";
import type { LanguageItem } from "@/types/resume";

function createLanguageItem(): LanguageItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    name: "",
    description: "",
    level: 3,
  };
}

export function LanguagesSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.languages;

  const addItem = () => {
    updateData((d) => {
      d.sections.languages.items.push(createLanguageItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.languages.items = d.sections.languages.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: unknown) => {
    updateData((d) => {
      const item = d.sections.languages.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title={data.sections.languages.name}
      icon={<Translate size={16} />}
      visible={data.sections.languages.visible}
      onToggleVisible={() =>
        updateData((d) => {
          d.sections.languages.visible = !d.sections.languages.visible;
        })
      }
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-card border border-border space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                <span className="text-xs font-medium text-muted">
                  {item.name || "New Language"}
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
              <Field label="Language">
                <Input
                  value={item.name}
                  onChange={(v) => updateItem(item.id, "name", v)}
                  placeholder="English, Spanish, etc."
                />
              </Field>
              <Field label="Level (0-5)">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={item.level}
                  onChange={(e) =>
                    updateItem(item.id, "level", Number(e.target.value))
                  }
                  className="w-full mt-2 accent-primary"
                />
              </Field>
            </div>
            <Field label="Description">
              <Input
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Native, Fluent, Conversational..."
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Language
        </button>
      </div>
    </SectionBase>
  );
}
