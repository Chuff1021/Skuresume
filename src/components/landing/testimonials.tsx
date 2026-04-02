"use client";

import { motion } from "motion/react";
import { MarqueeRows } from "@/components/animation/marquee";

const testimonials = [
  "This is hands down the best resume builder I've ever used. The interface is intuitive and the templates are gorgeous.",
  "I landed my dream job thanks to this tool. The AI suggestions made my resume stand out from hundreds of applicants.",
  "Finally a resume builder that doesn't feel like it was designed in 2005. Modern, clean, and incredibly easy to use.",
  "The live preview feature is a game changer. I can see exactly how my resume looks as I type.",
  "I've tried every resume builder out there. This one is the only one that's truly free with no hidden catches.",
  "The custom CSS feature is incredible. I was able to create a completely unique resume that perfectly matches my brand.",
  "Great site. The interactive interface is intuitive, fluid, and enables rapid customization of resumes.",
  "As a developer, I appreciate the open-source nature. Being able to self-host gives me full control over my data.",
  "The AI tailoring feature saved me hours. I just paste the job description and it optimizes my resume automatically.",
  "Everything about the UX is intuitive. Seamless resume personalization without any learning curve.",
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

function TestimonialCard({ text }: { text: string }) {
  return (
    <motion.div
      className="w-[320px] sm:w-[360px] md:w-[400px] shrink-0 rounded-md border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-xl"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <p className="leading-relaxed text-muted-foreground">
        &ldquo;{text}&rdquo;
      </p>
    </motion.div>
  );
}

export function Testimonials() {
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
          What people are saying
        </h2>
      </motion.div>

      <MarqueeRows
        row1={row1.map((text, i) => <TestimonialCard key={i} text={text} />)}
        row2={row2.map((text, i) => <TestimonialCard key={i} text={text} />)}
        row1Duration={50}
        row2Duration={55}
        gap={16}
      />
    </section>
  );
}
