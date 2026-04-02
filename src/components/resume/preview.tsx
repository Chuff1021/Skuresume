"use client";

import { useRef, useEffect, useState } from "react";
import { useResumeStore } from "@/stores/resume";
import { OnyxTemplate } from "./templates/onyx";

// A4 dimensions at 96 DPI
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export function ResumePreview() {
  const data = useResumeStore((s) => s.data);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const padding = 48;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;

        const scaleX = availableWidth / A4_WIDTH;
        const scaleY = availableHeight / A4_HEIGHT;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted text-sm">
        Loading preview...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-secondary flex items-center justify-center overflow-auto p-6"
    >
      <div
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="bg-white shadow-xl rounded-sm shrink-0"
      >
        <OnyxTemplate data={data} />
      </div>
    </div>
  );
}
