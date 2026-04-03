"use client";

import { Heart, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input } from "../section-base";
import type { InterestItem } from "@/types/resume";

function createInterestItem(): InterestItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    name: "",
    keywords: [],
  };
}

export function InterestsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.interests;

  const addItem = () => {
    updateData((d) => {
      d.sections.interests.items.push(createInterestItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.interests.items = d.sections.interests.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: unknown) => {
    updateData((d) => {
      const item = d.sections.interests.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title={data.sections.interests.name}
      icon={<Heart size={16} />}
      visible={data.sections.interests.visible}
      onToggleVisible={() =>
        updateData((d) => {
          d.sections.interests.visible = !d.sections.interests.visible;
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
                  {item.name || "New Interest"}
                </span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="w-6 h-6 rounded hover:bg-destructive/10 flex items-center justify-center transition-colors"
              >
                <Trash size={14} className="text-destructive" />
              </button>
            </div>
            <Field label="Interest">
              <Input
                value={item.name}
                onChange={(v) => updateItem(item.id, "name", v)}
                placeholder="Photography, Hiking, etc."
              />
            </Field>
            <Field label="Keywords (comma-separated)">
              <Input
                value={item.keywords.join(", ")}
                onChange={(v) =>
                  updateItem(
                    item.id,
                    "keywords",
                    v
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="Landscape, Portrait, Street"
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Interest
        </button>
      </div>
    </SectionBase>
  );
}
