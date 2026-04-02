"use client";

import { Palette, Layout, TextAa, FileArrowDown } from "@phosphor-icons/react";

export function RightSidebar() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-4 space-y-2">
        <SidebarSection icon={<Layout size={16} />} title="Template">
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-page rounded-md bg-primary/10 border-2 border-primary flex items-center justify-center">
              <span className="text-[10px] font-medium text-primary">Onyx</span>
            </div>
            {["Ditto", "Gengar", "Pikachu", "Glalie", "Kakuna"].map((name) => (
              <div
                key={name}
                className="aspect-page rounded-md bg-secondary border border-border flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                <span className="text-[10px] font-medium text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">More templates coming soon</p>
        </SidebarSection>

        <SidebarSection icon={<Palette size={16} />} title="Colors">
          <p className="text-xs text-muted-foreground">Color customization coming soon</p>
        </SidebarSection>

        <SidebarSection icon={<TextAa size={16} />} title="Typography">
          <p className="text-xs text-muted-foreground">Font customization coming soon</p>
        </SidebarSection>

        <SidebarSection icon={<FileArrowDown size={16} />} title="Export">
          <p className="text-xs text-muted-foreground">PDF export coming soon</p>
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
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}
