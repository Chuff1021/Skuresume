"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// react-resizable-panels deferred to Phase 3 — using fixed-width sidebars for now
import { ArrowLeft, FileText } from "lucide-react";
import { useResumeStore } from "@/stores/resume";
import { useBuilderStore } from "@/stores/builder";
import { useAutosave } from "@/hooks/use-autosave";
import { BuilderHeader } from "@/components/builder/header";
import { LeftSidebar } from "@/components/builder/left-sidebar";
import { RightSidebar } from "@/components/builder/right-sidebar";
import { ResumePreview } from "@/components/resume/preview";
import type { ResumeData } from "@/types/resume";

interface ResumeResponse {
  id: string;
  name: string;
  slug: string;
  data: ResumeData;
  updatedAt: string;
}

export default function BuilderPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          initialize(data.id, data.name, data.data);
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
          <FileText className="w-12 h-12 text-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Resume not found</h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <BuilderHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {leftSidebarOpen && (
          <div className="w-80 border-r border-border shrink-0 overflow-hidden">
            <LeftSidebar />
          </div>
        )}

        {/* Center Artboard */}
        <div className="flex-1 overflow-hidden">
          <ResumePreview />
        </div>

        {/* Right Sidebar */}
        {rightSidebarOpen && (
          <div className="w-72 border-l border-border shrink-0 overflow-hidden">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
