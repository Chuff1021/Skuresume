"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, Sliders, Layout, X } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { useBuilderStore } from "@/stores/builder";
import { useAutosave } from "@/hooks/use-autosave";
import { BuilderHeader } from "@/components/builder/header";
import { LeftSidebar } from "@/components/builder/left-sidebar";
import { RightSidebar } from "@/components/builder/right-sidebar";
import { ResumePreview } from "@/components/resume/preview";
import { TailorDialog } from "@/components/builder/tailor-dialog";
import type { ResumeData } from "@/types/resume";

interface ResumeResponse {
  id: string;
  name: string;
  slug: string;
  isPublic: boolean;
  data: ResumeData;
  updatedAt: string;
}

export default function BuilderPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tailorOpen, setTailorOpen] = useState(false);
  // Mobile: which sidebar sheet is open
  const [mobileSheet, setMobileSheet] = useState<"left" | "right" | null>(null);

  const initialize = useResumeStore((s) => s.initialize);
  const isReady = useResumeStore((s) => s.isReady);
  const leftSidebarOpen = useBuilderStore((s) => s.leftSidebarOpen);
  const rightSidebarOpen = useBuilderStore((s) => s.rightSidebarOpen);

  useAutosave();

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (res.ok) {
          const data: ResumeResponse = await res.json();
          initialize(data.id, data.name, data.slug, data.isPublic ?? false, data.data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, [resumeId, initialize]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Resume not found</h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <BuilderHeader onOpenTailor={() => setTailorOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar — desktop */}
        {leftSidebarOpen && (
          <div className="hidden md:block w-80 border-r border-border shrink-0 overflow-hidden">
            <LeftSidebar />
          </div>
        )}

        {/* Center Artboard */}
        <div className="flex-1 overflow-hidden">
          <ResumePreview />
        </div>

        {/* Right Sidebar — desktop */}
        {rightSidebarOpen && (
          <div className="hidden md:block w-72 border-l border-border shrink-0 overflow-hidden">
            <RightSidebar />
          </div>
        )}

        {/* Mobile sidebar sheets */}
        {mobileSheet && (
          <>
            <div
              className="md:hidden fixed inset-0 z-30 bg-black/40"
              onClick={() => setMobileSheet(null)}
            />
            <div
              className={`md:hidden fixed inset-y-0 z-40 w-80 bg-background border-border overflow-hidden flex flex-col ${
                mobileSheet === "left" ? "left-0 border-r" : "right-0 border-l"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-medium">
                  {mobileSheet === "left" ? "Edit" : "Design"}
                </span>
                <button
                  onClick={() => setMobileSheet(null)}
                  className="size-8 rounded-md hover:bg-secondary flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {mobileSheet === "left" ? <LeftSidebar /> : <RightSidebar />}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Bottom Dock */}
      <div className="md:hidden flex items-center justify-around border-t border-border bg-popover py-2 px-4 shrink-0">
        <button
          onClick={() => setMobileSheet(mobileSheet === "left" ? null : "left")}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-md transition-colors ${
            mobileSheet === "left" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Layout size={20} />
          <span className="text-[10px]">Edit</span>
        </button>
        <button
          onClick={() => setTailorOpen(true)}
          className="flex flex-col items-center gap-1 px-4 py-1 rounded-md text-muted-foreground"
        >
          <FileText size={20} />
          <span className="text-[10px]">AI Tailor</span>
        </button>
        <button
          onClick={() => setMobileSheet(mobileSheet === "right" ? null : "right")}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-md transition-colors ${
            mobileSheet === "right" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Sliders size={20} />
          <span className="text-[10px]">Design</span>
        </button>
      </div>

      {/* AI Tailor Dialog */}
      {tailorOpen && <TailorDialog onClose={() => setTailorOpen(false)} />}
    </div>
  );
}
