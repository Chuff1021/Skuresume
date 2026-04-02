"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTemplate } from "@/components/resume/templates";
import type { ResumeData } from "@/types/resume";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const LETTER_WIDTH = 816;
const LETTER_HEIGHT = 1056;

export default function PrintPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (res.ok) {
          const resume = await res.json();
          setData(resume.data);
        }
      } catch (e) {
        console.error("Failed to load resume for print:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [resumeId]);

  useEffect(() => {
    if (data && !loading) {
      // Auto-trigger print after render
      setTimeout(() => window.print(), 500);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Resume not found</p>
      </div>
    );
  }

  const isLetter = data.metadata.page.format === "letter";
  const width = isLetter ? LETTER_WIDTH : A4_WIDTH;
  const height = isLetter ? LETTER_HEIGHT : A4_HEIGHT;
  const TemplateComponent = getTemplate(data.metadata.template);

  return (
    <>
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: ${isLetter ? "letter" : "A4"};
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
        }
        @media screen {
          body {
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            padding: 24px;
          }
        }
      `}</style>

      {/* Print button (screen only) */}
      <button
        onClick={() => window.print()}
        className="no-print fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-black text-white text-sm font-medium shadow-lg hover:bg-black/80"
      >
        Save as PDF
      </button>

      <div
        style={{ width, minHeight: height, backgroundColor: "#ffffff" }}
        className="shadow-xl"
      >
        <TemplateComponent data={data} />
      </div>
    </>
  );
}
