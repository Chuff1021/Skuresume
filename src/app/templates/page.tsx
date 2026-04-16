"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, House, CircleNotch, Check } from "@phosphor-icons/react";
import { getTemplate, templateList } from "@/components/resume/templates";
import { createSampleResumeData } from "@/lib/resume-sample";
import { createDefaultResumeData } from "@/lib/resume-defaults";

// Full-size template gallery. Every card renders the real template at readable
// scale against the same sample resume, so users can compare layouts side by
// side and pick one. Clicking a card creates a new blank resume with that
// template selected and jumps to the builder.

const PAGE_WIDTH = 816;   // Letter width in px @ 96dpi
const PAGE_HEIGHT = 1056; // Letter height in px @ 96dpi

// Card width (desktop) — compact enough to fit 2-3 per row, big enough to read
// the key headings without zooming.
const CARD_WIDTH = 440;
const SCALE = CARD_WIDTH / PAGE_WIDTH;

export default function TemplatesPage() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUse = async (templateId: string) => {
    setLoadingId(templateId);
    try {
      const defaults = createDefaultResumeData();
      defaults.metadata.template = templateId;

      const res = await fetch("/api/resumes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: defaults,
          name: `New ${templateList.find((t) => t.id === templateId)?.name || "Resume"}`,
        }),
      });
      if (!res.ok) throw new Error("Failed to create resume");
      const resume = await res.json();
      router.push(`/builder/${resume.id}`);
    } catch (err) {
      console.error(err);
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-popover sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-12">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              <House size={18} />
            </Link>
            <div className="h-5 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs px-2 tracking-wider">
                SKU
              </div>
              <span className="font-semibold text-sm hidden sm:inline">SKU Resume AI Builder</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="container mx-auto px-4 pt-10 pb-6 lg:px-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Template Gallery</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Every template rendered at full size with the same sample resume so
          you can compare them side by side. Click any card to start a new
          resume with that template — you can always switch later from the
          builder.
        </p>
      </section>

      {/* Grid */}
      <main className="container mx-auto px-4 pb-16 lg:px-12">
        <div
          className="grid gap-8 justify-items-center"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${CARD_WIDTH}px, 1fr))` }}
        >
          {templateList.map((t, i) => {
            const sample = createSampleResumeData({ template: t.id });
            const TemplateComponent = getTemplate(t.id);
            const isLoading = loadingId === t.id;

            return (
              <motion.div
                key={t.id}
                className="w-full max-w-[480px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-lg font-semibold">{t.name}</h2>
                  <button
                    onClick={() => handleUse(t.id)}
                    disabled={!!loadingId}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <><CircleNotch size={12} className="animate-spin" /> Starting…</>
                    ) : (
                      <>Use this template</>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => handleUse(t.id)}
                  disabled={!!loadingId}
                  className="group block w-full relative overflow-hidden rounded-md border border-border bg-white shadow-sm hover:shadow-2xl transition-shadow"
                  style={{ width: CARD_WIDTH, height: PAGE_HEIGHT * SCALE }}
                >
                  <div
                    style={{
                      width: PAGE_WIDTH,
                      height: PAGE_HEIGHT,
                      transform: `scale(${SCALE})`,
                      transformOrigin: "top left",
                    }}
                  >
                    <TemplateComponent data={sample} />
                  </div>
                  {/* Hover overlay with CTA */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                      {isLoading ? <CircleNotch size={12} className="animate-spin" /> : <Check size={12} weight="bold" />}
                      {isLoading ? "Starting…" : "Use this template"}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
