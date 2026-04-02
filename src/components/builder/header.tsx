"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Undo2,
  Redo2,
  Check,
  Loader2,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { useResumeStore } from "@/stores/resume";
import { useBuilderStore } from "@/stores/builder";

export function BuilderHeader() {
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
    <header className="h-12 border-b border-border bg-surface-1 flex items-center px-3 gap-2 shrink-0">
      <Link
        href="/dashboard"
        className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
        title="Back to Dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <div className="w-px h-5 bg-border mx-1" />

      <button
        onClick={toggleLeftSidebar}
        className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
        title="Toggle left sidebar"
      >
        <PanelLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 min-w-0 flex-1">
        <FileText className="w-4 h-4 text-primary shrink-0" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm font-medium bg-transparent border-none outline-none min-w-0 flex-1 hover:bg-surface-2 focus:bg-surface-2 px-1.5 py-1 rounded transition-colors"
        />
      </div>

      {/* Save status */}
      <div className="flex items-center gap-1.5 text-xs text-muted shrink-0">
        {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
        {!isSaving && !isDirty && lastSavedAt && (
          <Check className="w-3 h-3 text-success" />
        )}
        <span>{saveStatus}</span>
      </div>

      <div className="w-px h-5 bg-border mx-1" />

      {/* Undo / Redo */}
      <button
        onClick={() => undo()}
        className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => redo()}
        className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <button
        onClick={toggleRightSidebar}
        className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
        title="Toggle right sidebar"
      >
        <PanelRight className="w-4 h-4" />
      </button>
    </header>
  );
}
