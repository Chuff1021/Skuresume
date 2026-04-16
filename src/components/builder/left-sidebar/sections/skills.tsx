"use client";

import { Wrench, Plus } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, ItemCard, Field, Input } from "../section-base";
import type { SkillItem } from "@/types/resume";

function createSkillItem(): SkillItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    name: "",
    description: "",
    level: 3,
    keywords: [],
  };
}

export function SkillsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.skills;

  const addItem = () => {
    updateData((d) => {
      d.sections.skills.items.push(createSkillItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.skills.items = d.sections.skills.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: unknown) => {
    updateData((d) => {
      const item = d.sections.skills.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title={data.sections.skills.name}
      icon={<Wrench size={16} />}
      visible={data.sections.skills.visible}
      onToggleVisible={() =>
        updateData((d) => {
          d.sections.skills.visible = !d.sections.skills.visible;
        })
      }
    >
      <div className="space-y-3">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            label={item.name || "New Skill"}
            hidden={item.hidden}
            onToggleHidden={() => updateData((d) => { const i = d.sections.skills.items.find((x) => x.id === item.id); if (i) i.hidden = !i.hidden; })}
            onDelete={() => removeItem(item.id)}
          >
            <div className="grid grid-cols-2 gap-2">
              <Field label="Skill Name">
                <Input
                  value={item.name}
                  onChange={(v) => updateItem(item.id, "name", v)}
                  placeholder="React, Python, etc."
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
                placeholder="TypeScript, Node.js, GraphQL"
              />
            </Field>
          </ItemCard>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>
    </SectionBase>
  );
}
