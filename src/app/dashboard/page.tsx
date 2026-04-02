"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Trash2,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Pencil,
} from "lucide-react";

interface Resume {
  id: string;
  name: string;
  slug: string;
  isPublic: boolean;
  updatedAt: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const createResume = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Untitled Resume" }),
      });
      if (res.ok) {
        const resume = await res.json();
        router.push(`/builder/${resume.id}`);
      }
    } catch (error) {
      console.error("Failed to create resume:", error);
    } finally {
      setCreating(false);
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
    setMenuOpen(null);
  };

  const duplicateResume = async (resume: Resume) => {
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${resume.name} (Copy)` }),
      });
      if (res.ok) {
        fetchResumes();
      }
    } catch (error) {
      console.error("Failed to duplicate resume:", error);
    }
    setMenuOpen(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface-1">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">SKU AI Resume Builder</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Resumes</h1>
            <p className="text-muted text-sm mt-1">
              Create, edit, and manage your resumes
            </p>
          </div>
          <button
            onClick={createResume}
            disabled={creating}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Creating..." : "New Resume"}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-surface-1 border border-border animate-pulse"
              />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
            <p className="text-muted mb-6">
              Create your first resume to get started
            </p>
            <button
              onClick={createResume}
              disabled={creating}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {creating ? "Creating..." : "Create Resume"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create new card */}
            <button
              onClick={createResume}
              disabled={creating}
              className="h-64 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-surface-1 transition-colors flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-2 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-muted group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                {creating ? "Creating..." : "New Resume"}
              </span>
            </button>

            {/* Resume cards */}
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative h-64 rounded-xl bg-surface-1 border border-border hover:border-primary/30 transition-colors overflow-hidden group"
              >
                {/* Preview area */}
                <Link
                  href={`/builder/${resume.id}`}
                  className="block h-40 bg-surface-2 relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-28 bg-white rounded shadow-sm border flex items-center justify-center">
                      <FileText className="w-8 h-8 text-surface-3" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5">
                      <Pencil className="w-3 h-3" />
                      Edit
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm truncate">
                      {resume.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      Updated {formatDate(resume.updatedAt)}
                    </p>
                  </div>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === resume.id ? null : resume.id)
                      }
                      className="w-8 h-8 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-muted" />
                    </button>
                    {menuOpen === resume.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setMenuOpen(null)}
                        />
                        <div className="absolute right-0 bottom-full mb-1 z-20 w-44 bg-surface-1 border border-border rounded-lg shadow-lg py-1">
                          <Link
                            href={`/builder/${resume.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-2 transition-colors"
                            onClick={() => setMenuOpen(null)}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open
                          </Link>
                          <button
                            onClick={() => duplicateResume(resume)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-2 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => deleteResume(resume.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
