"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, motion } from "motion/react";

interface CountUpProps {
  target: number;
  duration?: number;
  separator?: boolean;
  className?: string;
}

export function CountUp({ target, duration = 0.8, separator = true, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100 / duration,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const value = Math.round(latest);
        ref.current.textContent = separator
          ? new Intl.NumberFormat("en-US").format(value)
          : String(value);
      }
    });
    return unsubscribe;
  }, [springValue, separator]);

  return <motion.span ref={ref} className={className}>0</motion.span>;
}
