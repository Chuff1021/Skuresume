"use client";

import { motion } from "motion/react";
import { Users, FileText } from "@phosphor-icons/react";
import { CountUp } from "@/components/animation/count-up";

const stats = [
  { icon: Users, thinIcon: Users, label: "Users", count: 850000 },
  { icon: FileText, thinIcon: FileText, label: "Resumes Created", count: 2400000 },
];

export function Statistics() {
  return (
    <section className="border-b border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="relative flex flex-col items-center justify-center p-8 xl:py-12 overflow-hidden border-b sm:border-b-0 last:border-b-0 sm:even:border-l border-border transition-colors hover:bg-secondary/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <stat.thinIcon
                size={180}
                weight="thin"
                className="text-primary opacity-[0.02]"
              />
            </div>

            {/* Icon */}
            <motion.div
              className="relative z-10 mb-4 rounded-full bg-primary/10 p-3 text-primary"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <stat.icon size={24} />
            </motion.div>

            {/* Counter */}
            <CountUp
              target={stat.count}
              duration={0.8}
              className="relative z-10 text-5xl font-bold tracking-tight md:text-6xl"
            />

            {/* Label */}
            <p className="relative z-10 mt-2 text-base font-medium tracking-tight text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
