"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTemplate } from "@/components/resume/templates";
import type { ResumeData } from "@/types/resume";
import { FileText, ArrowSquareOut } from "@phosphor-icons/react";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const LETTER_WIDTH = 816;
const LETTER_HEIGHT = 1056;

export default function PublicResumePage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [notPublic, setNotPublic] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/public/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
        } else if (res.status === 403) {
          setNotPublic(true);
        } else if (res.ok) {
          const resume = await res.json();
          setData(resume.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || notPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">
            {notPublic ? "This resume is private" : "Resume not found"}
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {notPublic
              ? "The owner has not made this resume public."
              : "This resume doesn't exist or the link is incorrect."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Create your own resume
            <ArrowSquareOut size={16} />
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isLetter = data.metadata.page.format === "letter";
  const width = isLetter ? LETTER_WIDTH : A4_WIDTH;
  const height = isLetter ? LETTER_HEIGHT : A4_HEIGHT;
  const TemplateComponent = getTemplate(data.metadata.template);

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center py-8 px-4">
      {/* Top bar */}
      <div className="w-full max-w-[850px] flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs px-2 tracking-wider">
            SKU
          </div>
          <span className="text-sm font-medium text-foreground">Resume AI Builder</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Save as PDF
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Build yours
            <ArrowSquareOut size={14} />
          </Link>
        </div>
      </div>

      {/* Resume */}
      <div
        className="shadow-2xl bg-white"
        style={{ width, minHeight: height }}
      >
        <TemplateComponent data={data} />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center">
        Built with{" "}
        <Link href="/" className="underline hover:text-foreground transition-colors">
          SKU Resume AI Builder
        </Link>
      </p>

      <style>{`
        @media print {
          @page { margin: 0; size: ${isLetter ? "letter" : "A4"}; }
          body { margin: 0; padding: 0; background: white; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
