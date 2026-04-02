"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";

interface MarqueeProps {
  children: ReactNode[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  gap?: number;
}

export function Marquee({
  children,
  direction = "left",
  duration = 45,
  className = "",
  gap = 24,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!containerRef.current) return;
    const firstSet = containerRef.current.querySelector("[data-marquee-set]");
    if (firstSet) {
      setContentWidth(firstSet.scrollWidth);
    }
  }, [children]);

  useEffect(() => {
    if (contentWidth === 0) return;
    const startX = direction === "left" ? 0 : -contentWidth;
    const endX = direction === "left" ? -contentWidth : 0;

    controls.start({
      x: [startX, endX],
      transition: {
        x: {
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      },
    });
  }, [contentWidth, direction, duration, controls]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        ref={containerRef}
        className="flex will-change-transform"
        animate={controls}
        style={{ gap }}
      >
        <div data-marquee-set className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

interface MarqueeRowsProps {
  row1: ReactNode[];
  row2: ReactNode[];
  row1Duration?: number;
  row2Duration?: number;
  gap?: number;
  className?: string;
}

export function MarqueeRows({
  row1,
  row2,
  row1Duration = 45,
  row2Duration = 50,
  gap = 24,
  className = "",
}: MarqueeRowsProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent" />

      <div className="space-y-4 sm:space-y-6">
        <Marquee direction="left" duration={row1Duration} gap={gap}>
          {row1}
        </Marquee>
        <Marquee direction="right" duration={row2Duration} gap={gap}>
          {row2}
        </Marquee>
      </div>
    </div>
  );
}
