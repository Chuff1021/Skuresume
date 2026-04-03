"use client";

import { useRef, useEffect, useState } from "react";
import { useResumeStore } from "@/stores/resume";
import { getTemplate } from "./templates";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const LETTER_WIDTH = 816;
const LETTER_HEIGHT = 1056;

export function ResumePreview() {
  const data = useResumeStore((s) => s.data);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const isLetter = data?.metadata.page.format === "letter";
  const pageWidth = isLetter ? LETTER_WIDTH : A4_WIDTH;
  const pageHeight = isLetter ? LETTER_HEIGHT : A4_HEIGHT;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const padding = 48;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;
        const scaleX = availableWidth / pageWidth;
        const scaleY = availableHeight / pageHeight;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [pageWidth, pageHeight]);

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Loading preview...
      </div>
    );
  }

  const TemplateComponent = getTemplate(data.metadata.template);
  const customCss = data.metadata.css.enabled ? data.metadata.css.value : "";

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-secondary flex items-center justify-center overflow-auto p-6"
    >
      {customCss && <style>{customCss}</style>}
      <div
        style={{
          width: pageWidth,
          height: pageHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="bg-white shadow-xl rounded-sm shrink-0"
      >
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
