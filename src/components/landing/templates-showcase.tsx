"use client";

import { motion } from "motion/react";
import { MarqueeRows } from "@/components/animation/marquee";

const templateNames = [
  "Azurill", "Bronzor", "Chikorita", "Ditgar", "Ditto", "Gengar", "Glalie",
  "Kakuna", "Lapras", "Leafish", "Onyx", "Pikachu", "Rhyhorn",
];

// Split into two rows
const row1 = templateNames.slice(0, 7);
const row2 = templateNames.slice(7);

function TemplateCard({ name }: { name: string }) {
  // Generate unique colors based on template name for visual variety
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <motion.div
      className="group relative aspect-page w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 rounded-md border border-border bg-card shadow-lg overflow-hidden cursor-pointer"
      style={{ minHeight: 280 }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {/* Placeholder resume preview */}
      <div
        className="absolute inset-0 p-4 flex flex-col"
        style={{ background: `linear-gradient(135deg, hsl(${hue}, 15%, 15%) 0%, hsl(${hue}, 10%, 8%) 100%)` }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="size-6 rounded-full" style={{ background: `hsl(${hue}, 40%, 50%)` }} />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-20 rounded-full bg-white/20" />
            <div className="h-1.5 w-14 rounded-full bg-white/10" />
          </div>
        </div>
        {/* Body lines */}
        <div className="flex-1 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-white/8" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/8" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/6" />
          <div className="mt-3 h-1.5 w-12 rounded-full" style={{ background: `hsl(${hue}, 40%, 50%, 0.4)` }} />
          <div className="h-1.5 w-full rounded-full bg-white/6" />
          <div className="h-1.5 w-5/6 rounded-full bg-white/6" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/5" />
          <div className="mt-3 h-1.5 w-16 rounded-full" style={{ background: `hsl(${hue}, 40%, 50%, 0.4)` }} />
          <div className="h-1.5 w-full rounded-full bg-white/5" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine effect on hover */}
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
    <section className="border-b border-border py-16 md:py-24 overflow-hidden">
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
