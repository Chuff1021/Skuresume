"use client";

import { useRef } from "react";
import { User, Camera, Trash, Eye, EyeSlash } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { SectionBase, Field, Input } from "../section-base";

export function BasicsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!data) return null;
  const { basics, picture } = data;

  const update = (field: string, value: string) => {
    updateData((d) => {
      (d.basics as any)[field] = value;
    });
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        updateData((d) => {
          d.picture.url = url;
          d.picture.aspectRatio = img.width / img.height;
        });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  return (
    <SectionBase title="Basics" icon={<User size={16} />} defaultOpen>
      {/* Profile photo */}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          {picture.url ? (
            <img
              src={picture.url}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center border border-dashed border-border">
              <User size={24} className="text-muted-foreground" />
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
            title="Upload photo"
          >
            <Camera size={12} />
          </button>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium">Profile Photo</p>
          <p className="text-xs text-muted-foreground">JPG, PNG or WebP</p>
          <div className="flex gap-1">
            {picture.url && (
              <>
                <button
                  onClick={() =>
                    updateData((d) => {
                      d.picture.effects.hidden = !d.picture.effects.hidden;
                    })
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-secondary hover:bg-muted transition-colors"
                  title={picture.effects.hidden ? "Show photo" : "Hide photo"}
                >
                  {picture.effects.hidden ? <Eye size={12} /> : <EyeSlash size={12} />}
                  {picture.effects.hidden ? "Show" : "Hide"}
                </button>
                <button
                  onClick={() =>
                    updateData((d) => {
                      d.picture.url = "";
                    })
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <Trash size={12} />
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {picture.url && (
        <div className="grid grid-cols-2 gap-2">
          <Field label="Size">
            <input
              type="range"
              min={40}
              max={140}
              step={4}
              value={picture.size}
              onChange={(e) =>
                updateData((d) => {
                  d.picture.size = Number(e.target.value);
                })
              }
              className="w-full accent-primary mt-1"
            />
          </Field>
          <Field label="Radius">
            <input
              type="range"
              min={0}
              max={70}
              step={4}
              value={picture.borderRadius}
              onChange={(e) =>
                updateData((d) => {
                  d.picture.borderRadius = Number(e.target.value);
                })
              }
              className="w-full accent-primary mt-1"
            />
          </Field>
          <div className="col-span-2 flex gap-3">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={picture.effects.border}
                onChange={(e) =>
                  updateData((d) => {
                    d.picture.effects.border = e.target.checked;
                  })
                }
                className="accent-primary"
              />
              Border
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={picture.effects.grayscale}
                onChange={(e) =>
                  updateData((d) => {
                    d.picture.effects.grayscale = e.target.checked;
                  })
                }
                className="accent-primary"
              />
              Grayscale
            </label>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handlePhotoUpload(file);
          e.target.value = "";
        }}
      />

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
