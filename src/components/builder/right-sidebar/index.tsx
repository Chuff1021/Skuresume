"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resume";
import { templateList } from "@/components/resume/templates";
import {
  Layout,
  Palette,
  TextAa,
  FileArrowDown,
  Ruler,
  Code,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";

export function RightSidebar() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-4 space-y-2">
        <TemplateSection />
        <ColorsSection />
        <TypographySection />
        <PageSection />
        <ExportSection />
      </div>
    </div>
  );
}

// === Collapsible wrapper ===
function SidebarSection({
  icon,
  title,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
      >
        {open ? <CaretDown size={14} className="text-muted-foreground" /> : <CaretRight size={14} className="text-muted-foreground" />}
        {icon}
        <span>{title}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// === Template Picker ===
function TemplateSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  if (!data) return null;
  const current = data.metadata.template;

  return (
    <SidebarSection icon={<Layout size={16} />} title="Template" defaultOpen>
      <div className="grid grid-cols-3 gap-2">
        {templateList.map((t) => (
          <button
            key={t.id}
            onClick={() => updateData((d) => { d.metadata.template = t.id; })}
            className={`aspect-page rounded-md border-2 flex items-center justify-center text-[10px] font-medium transition-colors ${
              current === t.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </SidebarSection>
  );
}

// === Colors ===
function ColorsSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  if (!data) return null;
  const { colors } = data.metadata.design;

  const presets = ["#2563eb", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b", "#22c55e", "#06b6d4", "#6366f1", "#000000", "#475569"];

  return (
    <SidebarSection icon={<Palette size={16} />} title="Colors">
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Primary Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colors.primary}
              onChange={(e) => updateData((d) => { d.metadata.design.colors.primary = e.target.value; })}
              className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={colors.primary}
              onChange={(e) => updateData((d) => { d.metadata.design.colors.primary = e.target.value; })}
              className="flex-1 px-2 py-1 text-xs bg-card border border-border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1 mt-2">
            {presets.map((c) => (
              <button
                key={c}
                onClick={() => updateData((d) => { d.metadata.design.colors.primary = c; })}
                className={`size-5 rounded-full border-2 transition-transform hover:scale-110 ${colors.primary === c ? "border-foreground" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Text Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={colors.text} onChange={(e) => updateData((d) => { d.metadata.design.colors.text = e.target.value; })} className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent" />
            <input type="text" value={colors.text} onChange={(e) => updateData((d) => { d.metadata.design.colors.text = e.target.value; })} className="flex-1 px-2 py-1 text-xs bg-card border border-border rounded-md outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input type="color" value={colors.background} onChange={(e) => updateData((d) => { d.metadata.design.colors.background = e.target.value; })} className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent" />
            <input type="text" value={colors.background} onChange={(e) => updateData((d) => { d.metadata.design.colors.background = e.target.value; })} className="flex-1 px-2 py-1 text-xs bg-card border border-border rounded-md outline-none" />
          </div>
        </div>
      </div>
    </SidebarSection>
  );
}

// === Typography ===
const fontOptions = [
  "IBM Plex Serif", "IBM Plex Sans", "Inter", "Roboto", "Open Sans",
  "Lato", "Merriweather", "Fira Sans Condensed", "Montserrat", "Source Sans 3",
  "PT Serif", "Nunito", "Raleway", "Georgia", "Times New Roman", "Arial",
];

function TypographySection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  if (!data) return null;
  const { body, heading } = data.metadata.typography;

  return (
    <SidebarSection icon={<TextAa size={16} />} title="Typography">
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Heading Font</label>
          <select
            value={heading.fontFamily}
            onChange={(e) => updateData((d) => { d.metadata.typography.heading.fontFamily = e.target.value; })}
            className="w-full px-2 py-1.5 text-xs bg-card border border-border rounded-md outline-none"
          >
            {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Body Font</label>
          <select
            value={body.fontFamily}
            onChange={(e) => updateData((d) => { d.metadata.typography.body.fontFamily = e.target.value; })}
            className="w-full px-2 py-1.5 text-xs bg-card border border-border rounded-md outline-none"
          >
            {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Body Size: {body.fontSize}px</label>
          <input type="range" min={10} max={18} step={1} value={body.fontSize} onChange={(e) => updateData((d) => { d.metadata.typography.body.fontSize = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Heading Size: {heading.fontSize}px</label>
          <input type="range" min={14} max={28} step={1} value={heading.fontSize} onChange={(e) => updateData((d) => { d.metadata.typography.heading.fontSize = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Line Height: {body.lineHeight}</label>
          <input type="range" min={1} max={2.5} step={0.1} value={body.lineHeight} onChange={(e) => updateData((d) => { d.metadata.typography.body.lineHeight = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
      </div>
    </SidebarSection>
  );
}

// === Page Settings ===
function PageSection() {
  const data = useResumeStore((s) => s.data);
  const updateData = useResumeStore((s) => s.updateData);
  if (!data) return null;
  const page = data.metadata.page;
  const layout = data.metadata.layout;

  return (
    <SidebarSection icon={<Ruler size={16} />} title="Page">
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Format</label>
          <div className="flex gap-2">
            {(["a4", "letter"] as const).map((f) => (
              <button
                key={f}
                onClick={() => updateData((d) => { d.metadata.page.format = f; })}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium border transition-colors ${page.format === f ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Margin X: {page.marginX}px</label>
          <input type="range" min={16} max={64} step={4} value={page.marginX} onChange={(e) => updateData((d) => { d.metadata.page.marginX = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Margin Y: {page.marginY}px</label>
          <input type="range" min={16} max={64} step={4} value={page.marginY} onChange={(e) => updateData((d) => { d.metadata.page.marginY = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Gap X: {page.gapX}px</label>
          <input type="range" min={8} max={48} step={4} value={page.gapX} onChange={(e) => updateData((d) => { d.metadata.page.gapX = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Gap Y: {page.gapY}px</label>
          <input type="range" min={8} max={48} step={4} value={page.gapY} onChange={(e) => updateData((d) => { d.metadata.page.gapY = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Sidebar Width: {layout.sidebarWidth}%</label>
          <input type="range" min={15} max={45} step={1} value={layout.sidebarWidth} onChange={(e) => updateData((d) => { d.metadata.layout.sidebarWidth = Number(e.target.value); })} className="w-full accent-primary" />
        </div>
      </div>
    </SidebarSection>
  );
}

// === Export ===
function ExportSection() {
  const { id, data } = useResumeStore();

  const exportPDF = () => {
    if (!id) return;
    window.open(`/print/${id}`, "_blank");
  };

  const exportJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SidebarSection icon={<FileArrowDown size={16} />} title="Export">
      <div className="space-y-2">
        <button
          onClick={exportPDF}
          className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Export as PDF
        </button>
        <button
          onClick={exportJSON}
          className="w-full py-2 rounded-md border border-border bg-card text-foreground text-sm font-medium hover:bg-secondary transition-colors"
        >
          Export as JSON
        </button>
      </div>
    </SidebarSection>
  );
}
