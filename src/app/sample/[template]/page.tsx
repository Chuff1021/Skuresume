"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getTemplate, templates } from "@/components/resume/templates";
import { createFullSampleResume } from "@/lib/resume-sample-full";
import type { ResumeData } from "@/types/resume";

const A4 = { w: 794, h: 1123 };
const LETTER = { w: 816, h: 1056 };

declare global {
  interface Window {
    __RESUME_READY__?: boolean;
  }
}

// Client-only preview of a template using built-in sample data. Exists so
// reviewers (and the headless sample renderer) can evaluate visual quality
// without first seeding a resume into the database.
export default function SamplePage() {
  const { template } = useParams<{ template: string }>();
  const search = useSearchParams();
  const mode = search.get("mode");
  const format = search.get("format") === "a4" ? "a4" : "letter";
  const primary = search.get("primary") || undefined;

  const data = useMemo<ResumeData>(() => {
    const resolved = templates[template] ? template : "modern-minimal";
    return createFullSampleResume({ template: resolved, primary });
  }, [template, primary]);

  // Force the resolved format onto metadata so the template picks it up.
  const framed = useMemo<ResumeData>(() => ({
    ...data,
    metadata: { ...data.metadata, page: { ...data.metadata.page, format } },
  }), [data, format]);

  const Template = getTemplate(framed.metadata.template);
  const dims = format === "a4" ? A4 : LETTER;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-format", format);
    let cancelled = false;
    (async () => {
      try {
        if ("fonts" in document) {
          await (document as Document & { fonts: { ready: Promise<void> } }).fonts.ready;
        }
      } catch {
        /* ignore */
      }
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      if (!cancelled) {
        window.__RESUME_READY__ = true;
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [format, framed.metadata.template]);

  const isHeadless = mode === "pdf";

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0; size: ${format === "letter" ? "letter" : "A4"}; }
          html, body {
            margin: 0 !important; padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          .sample-frame { box-shadow: none !important; }
        }
        @media screen {
          body {
            background: ${isHeadless ? "#ffffff" : "#e5e7eb"};
            display: flex;
            justify-content: center;
            padding: ${isHeadless ? "0" : "24px"};
          }
        }
      `}</style>

      <div
        className={isHeadless ? "sample-frame" : "sample-frame shadow-2xl"}
        data-ready={ready ? "1" : "0"}
        style={{ width: dims.w, minHeight: dims.h, backgroundColor: "#ffffff" }}
      >
        <Template data={framed} />
      </div>
    </>
  );
}
