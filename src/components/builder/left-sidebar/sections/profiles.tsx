"use client";

import { Globe, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input } from "../section-base";
import type { ProfileItem } from "@/types/resume";

function createProfileItem(): ProfileItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    network: "",
    username: "",
    icon: "",
    url: { url: "", label: "" },
  };
}

export function ProfilesSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.profiles;

  const addItem = () => {
    updateData((d) => {
      d.sections.profiles.items.push(createProfileItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.profiles.items = d.sections.profiles.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    updateData((d) => {
      const item = d.sections.profiles.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="Profiles"
      icon={<Globe size={16} />}
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
                  {item.network || item.username || "New Profile"}
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
              <Field label="Network">
                <Input
                  value={item.network}
                  onChange={(v) => updateItem(item.id, "network", v)}
                  placeholder="LinkedIn, GitHub, etc."
                />
              </Field>
              <Field label="Username">
                <Input
                  value={item.username}
                  onChange={(v) => updateItem(item.id, "username", v)}
                  placeholder="johndoe"
                />
              </Field>
              <Field label="Icon">
                <Input
                  value={item.icon}
                  onChange={(v) => updateItem(item.id, "icon", v)}
                  placeholder="fa-linkedin"
                />
              </Field>
              <Field label="URL">
                <Input
                  value={item.url.url}
                  onChange={(v) =>
                    updateData((d) => {
                      const i = d.sections.profiles.items.find((x) => x.id === item.id);
                      if (i) i.url.url = v;
                    })
                  }
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Profile
        </button>
      </div>
    </SectionBase>
  );
}
