"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes, SKU Resume AI Builder is completely free to use. There are no hidden costs, premium tiers, or ads. You can create unlimited resumes without ever paying anything.",
  },
  {
    q: "How is my data protected?",
    a: "Your data is stored securely and is never sold or shared with third parties. We use industry-standard encryption and you can delete your account and all associated data at any time.",
  },
  {
    q: "Can I export my resume as a PDF?",
    a: "Absolutely. You can export your resume as a high-quality PDF at any time. We also support JSON export for portability between platforms.",
  },
  {
    q: "Does it support multiple languages?",
    a: "Yes, you can write your resume content in any language. The templates are designed to handle various character sets and writing systems.",
  },
  {
    q: "How is this different from other resume builders?",
    a: "Unlike most resume builders, we're completely free with no limitations. Our AI assistant helps you write better content, and you get features like custom CSS, password-protected sharing, and 13+ professional templates.",
  },
  {
    q: "Can I customize the look of my resume?",
    a: "Yes, extensively. You can change templates, fonts, colors, spacing, margins, and more. For advanced users, we even support custom CSS to style your resume exactly how you want.",
  },
  {
    q: "Can I share my resume with others?",
    a: "Yes. Every resume gets a unique shareable link. You can optionally protect it with a password and track view/download statistics.",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="border-b border-border">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-16 p-4 md:p-8 xl:py-16 container mx-auto">
        {/* Title */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-2xl md:text-4xl xl:text-5xl font-semibold tracking-tight lg:flex lg:flex-col">
            <span>Frequently</span>{" "}
            <span>Asked</span>{" "}
            <span>Questions</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex-[2] max-w-2xl 2xl:max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-t border-border last:border-b"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.24, delay: Math.min(0.16, i * 0.03) }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left text-sm font-medium transition-colors hover:text-primary"
              >
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: openItems.has(i) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CaretDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence>
                {openItems.has(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 leading-relaxed text-muted-foreground text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
