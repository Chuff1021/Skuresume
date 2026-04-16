"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Sparkle, CircleNotch, X, Lightbulb } from "@phosphor-icons/react";

interface QuickStartDialogProps {
  onClose: () => void;
}

const PLACEHOLDER = `Paste your existing resume, copy your LinkedIn About + Experience, or just tell your story — anything works.

Example:
"I'm Jane Doe, a senior software engineer in Austin with 8 years of backend experience.
- Stripe (2021-present, Staff Eng): own the disputes platform, processes ~$2B/yr.
  Cut chargeback false positives 28% by rebuilding the rules engine in Go.
- Square (2017-2021, Senior Eng): built risk service handling 4k req/s.
- BS Computer Science, UT Austin, 2015.
Skills: Go, Python, Postgres, Kafka, AWS, Terraform.
Want my next role to be Principal at a payments or infra company."`;

export function QuickStartDialog({ onClose }: QuickStartDialogProps) {
  const router = useRouter();
  const [intake, setIntake] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    if (intake.trim().length < 30) {
      setError("Add a bit more — at least a sentence or two about your background.");
      return;
    }

    setGenerating(true);
    try {
      // 1) Ask AI to build a complete ResumeData from the intake.
      const aiRes = await fetch("/api/ai/quickstart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intake, targetRole: targetRole.trim() || undefined }),
      });

      if (!aiRes.ok) {
        const body = await aiRes.json().catch(() => ({}));
        throw new Error(body.error || "AI generation failed");
      }

      const { name, data } = await aiRes.json();

      // 2) Save it via the existing import endpoint (merges with defaults).
      const saveRes = await fetch("/api/resumes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, name }),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save the generated resume");
      }

      const resume = await saveRes.json();
      router.push(`/builder/${resume.id}`);
    } catch (err) {
      console.error("Quickstart failed:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setGenerating(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !generating) onClose();
      }}
    >
      <motion.div
        className="w-full max-w-2xl rounded-lg border border-border bg-popover shadow-2xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Sparkle size={18} weight="fill" className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">AI Quick Start</h2>
              <p className="text-xs text-muted-foreground">Drop your background — get a recruiter-ready first draft.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={generating}
            className="size-8 rounded-md hover:bg-secondary flex items-center justify-center disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
              Target role <span className="text-muted-foreground/60">(optional — tilts the writing toward this role)</span>
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Backend Engineer at a fintech"
              disabled={generating}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
              Your background
            </label>
            <textarea
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={14}
              disabled={generating}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono leading-relaxed disabled:opacity-50"
            />
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lightbulb size={12} />
                The more specific you are about companies, dates, and impact numbers, the better.
              </p>
              <span className="text-xs text-muted-foreground tabular-nums">
                {intake.length} chars
              </span>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-border shrink-0">
          <button
            onClick={onClose}
            disabled={generating}
            className="px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || intake.trim().length < 30}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {generating ? (
              <>
                <CircleNotch size={14} className="animate-spin" />
                Generating resume...
              </>
            ) : (
              <>
                <Sparkle size={14} weight="fill" />
                Generate Resume
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
