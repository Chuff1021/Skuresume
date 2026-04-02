"use client";

import { motion } from "motion/react";

export function Spotlight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Left group */}
        <motion.div
          className="absolute -left-1/4 -top-1/4"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div
            className="h-[600px] w-[600px] -rotate-45"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="h-[500px] w-[500px] -rotate-45 -mt-80 ml-20"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="h-[400px] w-[400px] -rotate-45 -mt-60 ml-40"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.04) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Right group */}
        <motion.div
          className="absolute -right-1/4 -top-1/4"
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div
            className="h-[600px] w-[600px] rotate-45"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="h-[500px] w-[500px] rotate-45 -mt-80 -ml-20"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="h-[400px] w-[400px] rotate-45 -mt-60 -ml-40"
            style={{
              background: "radial-gradient(ellipse at center, hsla(210,100%,85%,0.04) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
