"use client";

import { Briefcase, Plus } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, ItemCard, Field, Input, TextAreaWithAI } from "../section-base";
import type { ExperienceItem } from "@/types/resume";

function createExperienceItem(): ExperienceItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    company: "",
    position: "",
    location: "",
    date: "",
    description: "",
    url: { url: "", label: "" },
  };
}

export function ExperienceSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.experience;

  const addItem = () => {
    updateData((d) => {
      d.sections.experience.items.push(createExperienceItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.experience.items = d.sections.experience.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.experience.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title={data.sections.experience.name}
      icon={<Briefcase size={16} />}
      visible={data.sections.experience.visible}
      onToggleVisible={() =>
        updateData((d) => {
          d.sections.experience.visible = !d.sections.experience.visible;
        })
      }
    >
      <div className="space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            label={item.position || item.company || "New Position"}
            hidden={item.hidden}
            onToggleHidden={() => updateData((d) => { const i = d.sections.experience.items.find((x) => x.id === item.id); if (i) i.hidden = !i.hidden; })}
            onDelete={() => removeItem(item.id)}
          >
            <div className="grid grid-cols-2 gap-2">
              <Field label="Company">
                <Input
                  value={item.company}
                  onChange={(v) => updateItem(item.id, "company", v)}
                  placeholder="Company Name"
                />
              </Field>
              <Field label="Position">
                <Input
                  value={item.position}
                  onChange={(v) => updateItem(item.id, "position", v)}
                  placeholder="Job Title"
                />
              </Field>
              <Field label="Date">
                <Input
                  value={item.date}
                  onChange={(v) => updateItem(item.id, "date", v)}
                  placeholder="Jan 2020 - Present"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={item.location}
                  onChange={(v) => updateItem(item.id, "location", v)}
                  placeholder="City, State"
                />
              </Field>
            </div>
            <Field label="Description">
              <TextAreaWithAI
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                aiMode="improve"
              />
            </Field>
          </ItemCard>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>
    </SectionBase>
  );
}
