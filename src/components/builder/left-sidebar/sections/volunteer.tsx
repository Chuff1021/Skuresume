"use client";

import { HandHeart, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input, TextAreaWithAI } from "../section-base";
import type { VolunteerItem } from "@/types/resume";

function createVolunteerItem(): VolunteerItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    organization: "",
    position: "",
    location: "",
    date: "",
    description: "",
    url: { url: "", label: "" },
  };
}

export function VolunteerSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.volunteer;

  const addItem = () => {
    updateData((d) => {
      d.sections.volunteer.items.push(createVolunteerItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.volunteer.items = d.sections.volunteer.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.volunteer.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="Volunteer"
      icon={<HandHeart size={16} />}
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
                  {item.position || item.organization || "New Volunteer"}
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
              <Field label="Organization">
                <Input
                  value={item.organization}
                  onChange={(v) => updateItem(item.id, "organization", v)}
                  placeholder="Organization Name"
                />
              </Field>
              <Field label="Position">
                <Input
                  value={item.position}
                  onChange={(v) => updateItem(item.id, "position", v)}
                  placeholder="Volunteer Role"
                />
              </Field>
              <Field label="Date">
                <Input
                  value={item.date}
                  onChange={(v) => updateItem(item.id, "date", v)}
                  placeholder="Jan 2022 - Present"
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
                aiMode="improve"
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Describe your volunteer work..."
                rows={3}
              />
            </Field>
            <Field label="URL">
              <Input
                value={item.url.url}
                onChange={(v) =>
                  updateData((d) => {
                    const i = d.sections.volunteer.items.find((x) => x.id === item.id);
                    if (i) i.url.url = v;
                  })
                }
                placeholder="https://example.org"
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Volunteer
        </button>
      </div>
    </SectionBase>
  );
}
