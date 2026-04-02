"use client";

import { useState } from "react";
import { Sparkle, CircleNotch } from "@phosphor-icons/react";

interface AIPopoverProps {
  currentText: string;
  onApply: (text: string) => void;
  mode?: "rewrite" | "improve";
}

export function AIPopover({ currentText, onApply, mode = "rewrite" }: AIPopoverProps) {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`/api/ai/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "rewrite" ? { text: currentText, tone } : { text: currentText }),
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
      console.error("AI generation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      setOpen(false);
      setResult("");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="size-6 rounded hover:bg-primary/10 flex items-center justify-center transition-colors"
        title="AI Assist"
      >
        <Sparkle size={14} className="text-primary" />
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-md border border-border bg-popover p-3 shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium flex items-center gap-1.5">
          <Sparkle size={14} className="text-primary" weight="fill" />
          AI {mode === "rewrite" ? "Rewrite" : "Improve"}
        </span>
        <button onClick={() => { setOpen(false); setResult(""); }} className="text-xs text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>

      {mode === "rewrite" && (
        <div className="flex gap-1">
          {["professional", "friendly", "concise"].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-2 py-1 rounded text-xs capitalize ${tone === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading || !currentText}
        className="w-full py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
      >
        {loading ? <><CircleNotch size={12} className="animate-spin" /> Generating...</> : "Generate"}
      </button>

      {result && (
        <div className="space-y-2">
          <div className="p-2 rounded bg-secondary text-xs leading-relaxed max-h-32 overflow-y-auto">
            {result}
          </div>
          <button
            onClick={handleApply}
            className="w-full py-1.5 rounded-md bg-success text-white text-xs font-medium hover:bg-success/90"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
