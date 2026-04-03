"use client";

import Link from "next/link";
import {
  House,
  FileText,
  ArrowUUpLeft,
  ArrowUUpRight,
  Check,
  CircleNotch,
  SidebarSimple,
  Sparkle,
} from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";
import { useBuilderStore } from "@/stores/builder";
import { ThemeToggle } from "@/components/theme-toggle";

export function BuilderHeader({ onOpenTailor }: { onOpenTailor?: () => void }) {
  const { name, setName, isDirty, isSaving, lastSavedAt } = useResumeStore();
  const { undo, redo } = useResumeStore.temporal.getState();
  const { toggleLeftSidebar, toggleRightSidebar } = useBuilderStore();

  const saveStatus = isSaving
    ? "Saving..."
    : isDirty
      ? "Unsaved changes"
      : lastSavedAt
        ? "Saved"
        : "";

  return (
    <header className="h-14 border-b border-border bg-popover flex items-center px-3 gap-2 shrink-0 z-10">
      {/* Left sidebar toggle */}
      <button
        onClick={toggleLeftSidebar}
        className="size-8 rounded-md hover:bg-secondary flex items-center justify-center transition-colors"
        title="Toggle left sidebar"
      >
        <SidebarSimple size={18} />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Link
          href="/dashboard"
          className="size-7 rounded-md hover:bg-secondary flex items-center justify-center transition-colors shrink-0"
          title="Dashboard"
        >
          <House size={16} />
        </Link>
        <span className="text-muted-foreground text-sm">/</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm font-medium bg-transparent border-none outline-none min-w-0 flex-1 hover:bg-secondary focus:bg-secondary px-1.5 py-1 rounded-md transition-colors truncate"
        />
      </div>

      {/* Save status */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
        {isSaving && <CircleNotch size={12} className="animate-spin" />}
        {!isSaving && !isDirty && lastSavedAt && (
          <Check size={12} weight="bold" className="text-success" />
        )}
        <span>{saveStatus}</span>
      </div>

      <div className="w-px h-5 bg-border mx-1" />

      {/* Undo / Redo */}
      <button
        onClick={() => undo()}
        className="size-8 rounded-md hover:bg-secondary flex items-center justify-center transition-colors"
        title="Undo"
      >
        <ArrowUUpLeft size={18} />
      </button>
      <button
        onClick={() => redo()}
        className="size-8 rounded-md hover:bg-secondary flex items-center justify-center transition-colors"
        title="Redo"
      >
        <ArrowUUpRight size={18} />
      </button>

      <ThemeToggle />

      {/* AI Tailor */}
      {onOpenTailor && (
        <button
          onClick={onOpenTailor}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
        >
          <Sparkle size={14} weight="fill" />
          Tailor to Job
        </button>
      )}

      <div className="w-px h-5 bg-border mx-1" />

      {/* Right sidebar toggle */}
      <button
        onClick={toggleRightSidebar}
        className="size-8 rounded-md hover:bg-secondary flex items-center justify-center transition-colors"
        title="Toggle right sidebar"
      >
        <SidebarSimple size={18} className="scale-x-[-1]" />
      </button>
    </header>
  );
}
