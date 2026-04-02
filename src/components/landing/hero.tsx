"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Sparkle } from "@phosphor-icons/react";
import { Spotlight } from "@/components/animation/spotlight";

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden border-b border-border px-4 py-24">
      <Spotlight />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
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
