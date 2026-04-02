"use client";

import { User } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input } from "../section-base";

export function BasicsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);

  if (!data) return null;
  const { basics } = data;

  const update = (field: string, value: string) => {
    updateData((d) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (d.basics as any)[field] = value;
    });
  };

  return (
    <SectionBase
      title="Basics"
      icon={<User size={16} />}
      defaultOpen
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label="Full Name">
            <Input
              value={basics.name}
              onChange={(v) => update("name", v)}
              placeholder="John Doe"
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Headline">
            <Input
              value={basics.headline}
              onChange={(v) => update("headline", v)}
              placeholder="Software Engineer"
            />
          </Field>
        </div>
        <Field label="Email">
          <Input
            value={basics.email}
            onChange={(v) => update("email", v)}
            placeholder="john@example.com"
            type="email"
          />
        </Field>
        <Field label="Phone">
          <Input
            value={basics.phone}
            onChange={(v) => update("phone", v)}
            placeholder="+1 234 567 8900"
          />
        </Field>
        <div className="col-span-2">
          <Field label="Location">
            <Input
              value={basics.location}
              onChange={(v) => update("location", v)}
              placeholder="San Francisco, CA"
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Website">
            <Input
              value={basics.url.url}
              onChange={(v) =>
                updateData((d) => {
                  d.basics.url.url = v;
                })
              }
              placeholder="https://example.com"
            />
          </Field>
        </div>
      </div>
    </SectionBase>
  );
}
