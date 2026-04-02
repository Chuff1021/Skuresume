"use client";

import { motion } from "motion/react";
import {
  CurrencyDollarSimple,
  GithubLogo,
  ShieldCheck,
  Lock,
  Globe,
  Key,
  Fingerprint,
  Infinity as InfinityIcon,
  Sliders,
  Code,
  Layout,
  LinkSimple,
  Password,
  PlugsConnected,
  Sparkle,
  Robot,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Feature {
  icon: Icon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: CurrencyDollarSimple,
    title: "Free, Forever",
    description: "No hidden costs, no premium tiers, no ads. Create unlimited resumes without ever paying a dime.",
  },
  {
    icon: GithubLogo,
    title: "Open Source",
    description: "The source code is available for anyone to review, modify, and contribute to on GitHub.",
  },
  {
    icon: ShieldCheck,
    title: "No Tracking or Ads",
    description: "Your data is never sold, shared, or used for advertising. We respect your privacy completely.",
  },
  {
    icon: Lock,
    title: "Your Data, Your Control",
    description: "Export your data anytime. Delete your account with one click. No vendor lock-in.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Build your resume in any language. The interface supports multiple languages as well.",
  },
  {
    icon: Key,
    title: "One-Click Sign In",
    description: "Sign in instantly with your GitHub, Google, or email account. No lengthy signup forms.",
  },
  {
    icon: Fingerprint,
    title: "Passkeys & 2FA",
    description: "Secure your account with modern passkeys or two-factor authentication.",
  },
  {
    icon: InfinityIcon,
    title: "Unlimited Resumes",
    description: "Create as many resumes as you need. No artificial limits on the number of resumes.",
  },
  {
    icon: Sliders,
    title: "Complete Flexibility",
    description: "Customize every aspect of your resume from fonts and colors to layout and spacing.",
  },
  {
    icon: Code,
    title: "Custom CSS",
    description: "Take full control with custom CSS. Style your resume exactly how you want it.",
  },
  {
    icon: Layout,
    title: "13+ Templates",
    description: "Choose from a curated collection of professionally designed, ATS-friendly templates.",
  },
  {
    icon: LinkSimple,
    title: "Shareable Links",
    description: "Share your resume with a unique link. Track views and downloads with built-in analytics.",
  },
  {
    icon: Password,
    title: "Password Protection",
    description: "Protect shared resumes with a password for an extra layer of privacy.",
  },
  {
    icon: PlugsConnected,
    title: "API Access",
    description: "Access your resumes programmatically through our REST API for custom integrations.",
  },
  {
    icon: Sparkle,
    title: "AI Assistant",
    description: "Let AI help you write compelling descriptions, tailor your resume, and improve content.",
  },
  {
    icon: Robot,
    title: "Smart Tailoring",
    description: "Paste a job description and let AI automatically optimize your resume for it.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="group relative min-h-48 p-6 bg-background border-b border-border last:border-b-0 [&:not(:nth-child(2n))]:border-r xs:[&:not(:nth-child(2n))]:border-r xl:[&:not(:nth-child(2n))]:border-r-0 xl:[&:not(:nth-child(4n))]:border-r transition-colors hover:bg-secondary/30"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, delay: Math.min(0.3, i * 0.03) }}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
          >
            {/* Hover gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative z-10 mb-4 inline-flex rounded-md bg-primary/5 p-2.5 text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <feature.icon size={24} weight="thin" />
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
