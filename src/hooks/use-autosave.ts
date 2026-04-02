"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/stores/resume";

export function useAutosave(debounceMs = 1000) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { id, name, data, isDirty, markSaving, markSaved } = useResumeStore();

  useEffect(() => {
    if (!isDirty || !id || !data) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      markSaving();
      try {
        const res = await fetch(`/api/resumes/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, data }),
        });
        if (res.ok) {
          markSaved();
        }
      } catch (error) {
        console.error("Autosave failed:", error);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, id, name, data, debounceMs, markSaving, markSaved]);
}
