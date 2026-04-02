"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Sparkle } from "@phosphor-icons/react";
import { Spotlight } from "@/components/animation/spotlight";

function ResumePreviewGraphic() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Gradient fade at bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent via-40% to-background pointer-events-none" />

      {/* Mock resume builder UI */}
      <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="h-10 bg-popover border-b border-border flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-destructive/60" />
            <div className="size-3 rounded-full bg-yellow-500/60" />
            <div className="size-3 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="h-5 w-48 rounded bg-secondary" />
          </div>
        </div>

        {/* Builder preview */}
        <div className="flex h-[340px] sm:h-[400px] md:h-[480px]">
          {/* Left sidebar */}
          <div className="w-1/4 border-r border-border bg-background p-3 space-y-3 hidden sm:block">
            <div className="h-3 w-16 rounded bg-muted-foreground/20" />
            <div className="space-y-2">
              <div className="h-8 rounded bg-secondary" />
              <div className="h-8 rounded bg-secondary" />
            </div>
            <div className="h-3 w-12 rounded bg-muted-foreground/20 mt-4" />
            <div className="h-16 rounded bg-secondary" />
            <div className="h-3 w-14 rounded bg-muted-foreground/20 mt-4" />
            <div className="space-y-2">
              <div className="h-20 rounded bg-secondary" />
              <div className="h-20 rounded bg-secondary" />
            </div>
          </div>

          {/* Center - resume */}
          <div className="flex-1 bg-secondary/50 flex items-start justify-center p-4 sm:p-8">
            <div className="w-full max-w-[280px] aspect-page bg-white rounded shadow-lg p-5 sm:p-6">
              {/* Resume header */}
              <div className="text-center mb-4">
                <div className="h-3.5 w-28 rounded bg-zinc-800 mx-auto" />
                <div className="h-2 w-20 rounded bg-zinc-400 mx-auto mt-1.5" />
                <div className="flex justify-center gap-2 mt-2">
                  <div className="h-1.5 w-14 rounded bg-zinc-300" />
                  <div className="h-1.5 w-12 rounded bg-zinc-300" />
                  <div className="h-1.5 w-16 rounded bg-zinc-300" />
                </div>
              </div>

              {/* Summary */}
              <div className="mb-3">
                <div className="h-2 w-14 rounded bg-blue-500 mb-1.5" />
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded bg-zinc-200" />
                  <div className="h-1.5 w-4/5 rounded bg-zinc-200" />
                </div>
              </div>

              {/* Experience */}
              <div className="mb-3">
                <div className="h-2 w-16 rounded bg-blue-500 mb-1.5" />
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <div className="h-2 w-24 rounded bg-zinc-700" />
                      <div className="h-1.5 w-16 rounded bg-zinc-300" />
                    </div>
                    <div className="h-1.5 w-20 rounded bg-zinc-400 mt-1" />
                    <div className="space-y-0.5 mt-1">
                      <div className="h-1.5 w-full rounded bg-zinc-200" />
                      <div className="h-1.5 w-5/6 rounded bg-zinc-200" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="h-2 w-20 rounded bg-zinc-700" />
                      <div className="h-1.5 w-14 rounded bg-zinc-300" />
                    </div>
                    <div className="h-1.5 w-16 rounded bg-zinc-400 mt-1" />
                    <div className="space-y-0.5 mt-1">
                      <div className="h-1.5 w-full rounded bg-zinc-200" />
                      <div className="h-1.5 w-3/4 rounded bg-zinc-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="h-2 w-10 rounded bg-blue-500 mb-1.5" />
                <div className="flex flex-wrap gap-1">
                  {[16, 20, 14, 18, 12, 22, 16].map((w, i) => (
                    <div key={i} className="h-4 rounded-sm bg-blue-50 border border-blue-100" style={{ width: w * 2.5 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-1/5 border-l border-border bg-background p-3 space-y-3 hidden md:block">
            <div className="h-3 w-14 rounded bg-muted-foreground/20" />
            <div className="grid grid-cols-2 gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-page rounded border ${i === 1 ? 'border-primary bg-primary/10' : 'border-border bg-secondary'}`} />
              ))}
            </div>
            <div className="h-3 w-12 rounded bg-muted-foreground/20 mt-3" />
            <div className="space-y-2">
              <div className="h-6 rounded bg-secondary" />
              <div className="h-6 rounded bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden border-b border-border px-4 py-24">
      <Spotlight />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Preview graphic */}
        <motion.div
          className="w-full mb-12"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        >
          <ResumePreviewGraphic />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link
            href="/dashboard"
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:scale-[1.01]"
          >
            <Sparkle size={14} weight="fill" className="text-foreground" />
            <span>AI-powered resume building is here</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground md:text-lg font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          Finally,
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="mt-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          A free and AI-powered resume builder
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.82 }}
        >
          SKU AI Resume Builder simplifies the process of creating, updating,
          and sharing your resume. With AI assistance, build a standout resume
          in minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <BookOpen size={16} />
            Learn More
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="h-8 w-5 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
