"use client";

import { Palette, Layout, Type, FileDown } from "lucide-react";

export function RightSidebar() {
  return (
    <div className="h-full overflow-y-auto bg-surface-1">
      <div className="p-4 space-y-2">
        <SidebarSection icon={<Layout className="w-4 h-4" />} title="Template">
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[3/4] rounded-md bg-primary/10 border-2 border-primary flex items-center justify-center">
              <span className="text-[10px] font-medium text-primary">Onyx</span>
            </div>
            {["Ditto", "Gengar", "Pikachu", "Glalie", "Kakuna"].map((name) => (
              <div
                key={name}
                className="aspect-[3/4] rounded-md bg-surface-2 border border-border flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                <span className="text-[10px] font-medium text-muted">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted mt-2">More templates coming in Phase 3</p>
        </SidebarSection>

        <SidebarSection icon={<Palette className="w-4 h-4" />} title="Colors">
          <p className="text-xs text-muted">Color customization coming soon</p>
        </SidebarSection>

        <SidebarSection icon={<Type className="w-4 h-4" />} title="Typography">
          <p className="text-xs text-muted">Font customization coming soon</p>
        </SidebarSection>

        <SidebarSection icon={<FileDown className="w-4 h-4" />} title="Export">
          <p className="text-xs text-muted">PDF export coming in Phase 4</p>
        </SidebarSection>
      </div>
    </div>
  );
}

function SidebarSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}
