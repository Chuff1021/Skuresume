"use client";

import { motion } from "motion/react";
import { MarqueeRows } from "@/components/animation/marquee";
import { createSampleResumeData } from "@/lib/resume-sample";
import { getTemplate, templateList } from "@/components/resume/templates";

// Additional template names that don't have implementations yet (shown as wireframes)
const upcomingTemplates = ["Chikorita", "Ditgar", "Glalie", "Kakuna", "Lapras", "Leafish", "Azurill", "Rhyhorn"];

const templateConfigs: Record<string, { primary: string }> = {
  onyx: { primary: "#2563eb" },
  ditto: { primary: "#6366f1" },
  gengar: { primary: "#8b5cf6" },
  pikachu: { primary: "#eab308" },
  bronzor: { primary: "#ef4444" },
};

function RealTemplateCard({ templateId, name }: { templateId: string; name: string }) {
  const primary = templateConfigs[templateId]?.primary || "#2563eb";
  const sampleData = createSampleResumeData({ template: templateId, primary });
  const TemplateComponent = getTemplate(templateId);

  return (
    <motion.div
      className="group relative aspect-page w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 rounded-md border border-border bg-white shadow-lg overflow-hidden cursor-pointer"
      style={{ minHeight: 280 }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {/* Actual template render scaled down */}
      <div className="absolute inset-0 origin-top-left" style={{ width: 794, height: 1123, transform: "scale(0.24)", transformOrigin: "top left" }}>
        <TemplateComponent data={sampleData} />
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

function WireframeTemplateCard({ name }: { name: string }) {
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <motion.div
      className="group relative aspect-page w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 rounded-md border border-border bg-white shadow-lg overflow-hidden cursor-pointer"
      style={{ minHeight: 280 }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div className="absolute inset-0 p-3 sm:p-4 flex flex-col">
        <div className="text-center mb-3">
          <div className="h-2.5 w-24 rounded-full bg-zinc-800 mx-auto" />
          <div className="h-1.5 w-16 rounded-full bg-zinc-400 mx-auto mt-1.5" />
          <div className="flex justify-center gap-1.5 mt-2">
            <div className="h-1 w-10 rounded-full bg-zinc-300" />
            <div className="h-1 w-8 rounded-full bg-zinc-300" />
            <div className="h-1 w-12 rounded-full bg-zinc-300" />
          </div>
        </div>
        <div className="h-px w-full mb-2" style={{ background: `hsl(${hue}, 50%, 50%, 0.3)` }} />
        <div className="space-y-2 flex-1">
          <div className="h-1.5 w-12 rounded-full" style={{ background: `hsl(${hue}, 50%, 50%)` }} />
          <div className="h-1 w-full rounded-full bg-zinc-200" />
          <div className="h-1 w-4/5 rounded-full bg-zinc-200" />
          <div className="h-1.5 w-14 rounded-full mt-2" style={{ background: `hsl(${hue}, 50%, 50%)` }} />
          <div className="h-1 w-full rounded-full bg-zinc-200" />
          <div className="h-1 w-5/6 rounded-full bg-zinc-200" />
          <div className="h-1 w-3/4 rounded-full bg-zinc-200" />
          <div className="h-1.5 w-10 rounded-full mt-2" style={{ background: `hsl(${hue}, 50%, 50%)` }} />
          <div className="h-1 w-full rounded-full bg-zinc-200" />
          <div className="h-1 w-2/3 rounded-full bg-zinc-200" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-sm font-medium text-white drop-shadow-lg">{name}</span>
        <span className="text-xs text-white/60 ml-2">Coming Soon</span>
      </div>
    </motion.div>
  );
}

export function TemplatesShowcase() {
  // Real templates first, then wireframes
  const realCards = templateList.map((t) => (
    <RealTemplateCard key={t.id} templateId={t.id} name={t.name} />
  ));
  const wireframeCards = upcomingTemplates.map((name) => (
    <WireframeTemplateCard key={name} name={name} />
  ));

  const allCards = [...realCards, ...wireframeCards];
  const row1 = allCards.slice(0, Math.ceil(allCards.length / 2));
  const row2 = allCards.slice(Math.ceil(allCards.length / 2));

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
          Professional Templates
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Each template is designed to be ATS-friendly and visually striking.
        </p>
      </motion.div>

      <div className="-rotate-3 sm:-rotate-4 lg:-rotate-5">
        <MarqueeRows
          row1={row1}
          row2={row2}
          row1Duration={45}
          row2Duration={50}
          gap={24}
        />
      </div>
    </section>
  );
}
