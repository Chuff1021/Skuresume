"use client";

import { motion } from "motion/react";
import { MarqueeRows } from "@/components/animation/marquee";

const templateNames = [
  "Azurill", "Bronzor", "Chikorita", "Ditgar", "Ditto", "Gengar", "Glalie",
  "Kakuna", "Lapras", "Leafish", "Onyx", "Pikachu", "Rhyhorn",
];

const row1 = templateNames.slice(0, 7);
const row2 = templateNames.slice(7);

// Layout variants per template for visual variety
const layouts: Record<string, { accent: string; sidebar: boolean; headerAlign: "left" | "center"; }> = {
  Azurill:    { accent: "#3b82f6", sidebar: false, headerAlign: "center" },
  Bronzor:    { accent: "#8b5cf6", sidebar: true,  headerAlign: "left" },
  Chikorita:  { accent: "#22c55e", sidebar: false, headerAlign: "left" },
  Ditgar:     { accent: "#f59e0b", sidebar: true,  headerAlign: "center" },
  Ditto:      { accent: "#ec4899", sidebar: false, headerAlign: "center" },
  Gengar:     { accent: "#6366f1", sidebar: true,  headerAlign: "left" },
  Glalie:     { accent: "#06b6d4", sidebar: false, headerAlign: "left" },
  Kakuna:     { accent: "#ef4444", sidebar: true,  headerAlign: "center" },
  Lapras:     { accent: "#0ea5e9", sidebar: false, headerAlign: "center" },
  Leafish:    { accent: "#10b981", sidebar: true,  headerAlign: "left" },
  Onyx:       { accent: "#2563eb", sidebar: false, headerAlign: "center" },
  Pikachu:    { accent: "#eab308", sidebar: true,  headerAlign: "left" },
  Rhyhorn:    { accent: "#a855f7", sidebar: false, headerAlign: "left" },
};

function TemplateCard({ name }: { name: string }) {
  const layout = layouts[name] || { accent: "#3b82f6", sidebar: false, headerAlign: "center" as const };

  return (
    <motion.div
      className="group relative aspect-page w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 rounded-md border border-border bg-white shadow-lg overflow-hidden cursor-pointer"
      style={{ minHeight: 280 }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {/* Resume preview content */}
      <div className="absolute inset-0 p-3 sm:p-4 flex">
        {/* Sidebar variant */}
        {layout.sidebar && (
          <div className="w-[30%] pr-2 sm:pr-3 border-r border-zinc-100 flex flex-col gap-2">
            {/* Photo placeholder */}
            <div className="w-full aspect-square rounded-sm" style={{ background: `${layout.accent}15` }}>
              <div className="w-full h-full rounded-sm flex items-center justify-center">
                <div className="size-6 sm:size-8 rounded-full" style={{ background: `${layout.accent}30` }} />
              </div>
            </div>
            {/* Contact block */}
            <div className="space-y-1">
              <div className="h-1 w-8 rounded-full" style={{ background: layout.accent }} />
              <div className="h-0.5 w-full rounded-full bg-zinc-200" />
              <div className="h-0.5 w-4/5 rounded-full bg-zinc-200" />
              <div className="h-0.5 w-full rounded-full bg-zinc-200" />
            </div>
            {/* Skills block */}
            <div className="space-y-1 mt-1">
              <div className="h-1 w-6 rounded-full" style={{ background: layout.accent }} />
              {[60, 80, 45, 70, 55].map((w, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="h-0.5 w-8 rounded-full bg-zinc-300" />
                  <div className="h-1 flex-1 rounded-full bg-zinc-100">
                    <div className="h-full rounded-full" style={{ width: `${w}%`, background: `${layout.accent}40` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 flex flex-col gap-2 ${layout.sidebar ? 'pl-2 sm:pl-3' : ''}`}>
          {/* Header */}
          <div className={`mb-1 ${layout.headerAlign === 'center' ? 'text-center' : ''}`}>
            <div className={`h-2 sm:h-2.5 w-24 sm:w-28 rounded-full bg-zinc-800 ${layout.headerAlign === 'center' ? 'mx-auto' : ''}`} />
            <div className={`h-1 sm:h-1.5 w-16 sm:w-20 rounded-full bg-zinc-400 mt-1 ${layout.headerAlign === 'center' ? 'mx-auto' : ''}`} />
            {!layout.sidebar && (
              <div className={`flex gap-1.5 mt-1.5 ${layout.headerAlign === 'center' ? 'justify-center' : ''}`}>
                <div className="h-0.5 w-10 rounded-full bg-zinc-300" />
                <div className="h-0.5 w-8 rounded-full bg-zinc-300" />
                <div className="h-0.5 w-12 rounded-full bg-zinc-300" />
              </div>
            )}
          </div>

          {/* Section divider */}
          <div className="h-px w-full" style={{ background: `${layout.accent}30` }} />

          {/* Summary */}
          <div>
            <div className="h-1 w-10 rounded-full mb-1" style={{ background: layout.accent }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded-full bg-zinc-200" />
              <div className="h-0.5 w-5/6 rounded-full bg-zinc-200" />
              <div className="h-0.5 w-4/5 rounded-full bg-zinc-150" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="h-1 w-12 rounded-full mb-1" style={{ background: layout.accent }} />
            <div className="space-y-1.5">
              {[1, 2].map((j) => (
                <div key={j}>
                  <div className="flex justify-between items-center">
                    <div className="h-1 w-16 rounded-full bg-zinc-700" />
                    <div className="h-0.5 w-10 rounded-full bg-zinc-300" />
                  </div>
                  <div className="h-0.5 w-12 rounded-full bg-zinc-400 mt-0.5" />
                  <div className="space-y-0.5 mt-0.5">
                    <div className="h-0.5 w-full rounded-full bg-zinc-150" />
                    <div className="h-0.5 w-4/5 rounded-full bg-zinc-150" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="h-1 w-10 rounded-full mb-1" style={{ background: layout.accent }} />
            <div className="flex justify-between items-center">
              <div className="h-1 w-20 rounded-full bg-zinc-700" />
              <div className="h-0.5 w-8 rounded-full bg-zinc-300" />
            </div>
            <div className="h-0.5 w-14 rounded-full bg-zinc-400 mt-0.5" />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

      {/* Name on hover */}
      <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-sm font-medium text-white drop-shadow-lg">{name}</span>
      </div>
    </motion.div>
  );
}

export function TemplatesShowcase() {
  return (
    <section id="templates" className="border-b border-border py-16 md:py-24 overflow-hidden">
      <motion.div
        className="text-center mb-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
          13 Professional Templates
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Each template is designed to be ATS-friendly and visually striking.
        </p>
      </motion.div>

      <div className="-rotate-3 sm:-rotate-4 lg:-rotate-5">
        <MarqueeRows
          row1={row1.map((name) => <TemplateCard key={name} name={name} />)}
          row2={row2.map((name) => <TemplateCard key={name} name={name} />)}
          row1Duration={45}
          row2Duration={50}
          gap={24}
        />
      </div>
    </section>
  );
}
