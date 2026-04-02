"use client";

import { motion } from "motion/react";
import { MarqueeRows } from "@/components/animation/marquee";
import { createSampleResumeData } from "@/lib/resume-sample";
import { getTemplate, templateList } from "@/components/resume/templates";

const templateConfigs: Record<string, { primary: string }> = {
  onyx: { primary: "#2563eb" },
  ditto: { primary: "#6366f1" },
  gengar: { primary: "#8b5cf6" },
  pikachu: { primary: "#eab308" },
  bronzor: { primary: "#ef4444" },
  azurill: { primary: "#06b6d4" },
  chikorita: { primary: "#22c55e" },
  glalie: { primary: "#0ea5e9" },
  kakuna: { primary: "#f59e0b" },
  rhyhorn: { primary: "#a855f7" },
  leafish: { primary: "#10b981" },
  lapras: { primary: "#3b82f6" },
  ditgar: { primary: "#ec4899" },
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

export function TemplatesShowcase() {
  const allCards = templateList.map((t) => (
    <RealTemplateCard key={t.id} templateId={t.id} name={t.name} />
  ));

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
          13 Professional Templates
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
