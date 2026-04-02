"use client";

import { Folder, Plus, Trash, DotsSixVertical as GripVertical } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input, TextArea } from "../section-base";
import type { ProjectItem } from "@/types/resume";

function createProjectItem(): ProjectItem {
  return {
    id: crypto.randomUUID(),
    hidden: false,
    name: "",
    description: "",
    date: "",
    keywords: [],
    url: { url: "", label: "" },
  };
}

export function ProjectsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { items } = data.sections.projects;

  const addItem = () => {
    updateData((d) => {
      d.sections.projects.items.push(createProjectItem());
    });
  };

  const removeItem = (id: string) => {
    updateData((d) => {
      d.sections.projects.items = d.sections.projects.items.filter(
        (item) => item.id !== id
      );
    });
  };

  const updateItem = (id: string, field: string, value: unknown) => {
    updateData((d) => {
      const item = d.sections.projects.items.find((i) => i.id === id);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[field] = value;
      }
    });
  };

  return (
    <SectionBase
      title="Projects"
      icon={<Folder size={16} />}
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
                  {item.name || "New Project"}
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
              <Field label="Project Name">
                <Input
                  value={item.name}
                  onChange={(v) => updateItem(item.id, "name", v)}
                  placeholder="My Project"
                />
              </Field>
              <Field label="Date">
                <Input
                  value={item.date}
                  onChange={(v) => updateItem(item.id, "date", v)}
                  placeholder="Jan 2023 - Present"
                />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={item.description}
                onChange={(v) => updateItem(item.id, "description", v)}
                placeholder="Describe the project..."
                rows={3}
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
                placeholder="React, TypeScript, AWS"
              />
            </Field>
            <Field label="URL">
              <Input
                value={item.url.url}
                onChange={(v) =>
                  updateData((d) => {
                    const i = d.sections.projects.items.find((x) => x.id === item.id);
                    if (i) i.url.url = v;
                  })
                }
                placeholder="https://github.com/user/project"
              />
            </Field>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/30 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
    </SectionBase>
  );
}
