"use client";

import { useState } from "react";
import { Sparkle, CircleNotch, X } from "@phosphor-icons/react";
import { useResumeStore } from "@/stores/resume";

export function TailorDialog({ onClose }: { onClose: () => void }) {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const data = useResumeStore((s) => s.data);

  const handleTailor = async () => {
    if (!jobDescription.trim() || !data) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, jobDescription }),
      });
      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setResult(text);
        }
      }
    } catch (e) {
      console.error("Tailor failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-lg border border-border bg-popover shadow-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkle size={20} weight="fill" className="text-primary" />
            <h2 className="text-base font-semibold">Tailor Resume to Job</h2>
          </div>
          <button onClick={onClose} className="size-8 rounded-md hover:bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Paste the job description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={8}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <button
            onClick={handleTailor}
            disabled={loading || !jobDescription.trim()}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><CircleNotch size={16} className="animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkle size={16} /> Analyze &amp; Suggest Changes</>
            )}
          </button>

          {result && (
            <div className="rounded-md border border-border bg-card p-4">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Sparkle size={14} className="text-primary" weight="fill" />
                Suggestions
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
