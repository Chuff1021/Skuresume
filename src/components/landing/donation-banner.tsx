"use client";

import { motion } from "motion/react";
import { Heart, Sparkle, Users, Wrench, Rocket } from "@phosphor-icons/react";

const benefits = [
  {
    icon: Heart,
    title: "Long-term Sustainability",
    description: "Help keep this project free and accessible for everyone, forever.",
  },
  {
    icon: Wrench,
    title: "Ongoing Maintenance",
    description: "Fund continuous improvements, security updates, and new features.",
  },
  {
    icon: Users,
    title: "Growing the Team",
    description: "Support the growth of contributors and maintainers behind the project.",
  },
];

const floatingIcons = [
  { Icon: Heart, x: "10%", y: "15%", delay: 0 },
  { Icon: Sparkle, x: "85%", y: "20%", delay: 0.5 },
  { Icon: Users, x: "20%", y: "75%", delay: 1 },
  { Icon: Wrench, x: "75%", y: "80%", delay: 1.5 },
  { Icon: Rocket, x: "50%", y: "10%", delay: 2 },
];

export function DonationBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/[0.02] to-background py-24 border-b border-border">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 size-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 size-64 rounded-full bg-rose-500/5 blur-3xl" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-primary/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon size={28} />
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heart icon */}
        <div className="relative mx-auto mb-6 inline-flex">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={48} weight="fill" className="text-rose-500" />
          </motion.div>
          {/* Ripple */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          >
            <Heart size={48} weight="fill" className="text-rose-500" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
          Support the Project
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Your support helps keep this project free and continuously improving.
        </p>

        {/* Benefit cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="mx-auto mb-4 size-12 rounded-md bg-primary/10 text-primary flex items-center justify-center"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <benefit.icon size={24} />
              </motion.div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
