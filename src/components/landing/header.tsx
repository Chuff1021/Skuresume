"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

export function Header() {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 40 });

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 32 && currentY > lastY) {
        y.set(-100);
      } else {
        y.set(0);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ y: springY }}
    >
      <div className="container mx-auto flex items-center justify-between p-3 lg:px-12">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm px-3 tracking-wider">
            SKU
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Dashboard
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="sm:hidden inline-flex items-center justify-center size-10 rounded-md bg-primary text-primary-foreground"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
