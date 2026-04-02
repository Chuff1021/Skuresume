"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Plus,
  Trash,
  DotsThree,
  Copy,
  ArrowSquareOut,
  PencilSimple,
  House,
  UploadSimple,
  X,
} from "@phosphor-icons/react";

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
  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);

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

  const handleImportJSON = async (file: File) => {
    setImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const res = await fetch("/api/resumes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, name: data?.basics?.name || file.name.replace(/\.json$/, "") }),
      });
      if (res.ok) {
        const resume = await res.json();
        router.push(`/builder/${resume.id}`);
      }
    } catch (error) {
      console.error("Failed to import:", error);
      alert("Failed to import resume. Make sure it's a valid JSON file.");
    } finally {
      setImporting(false);
      setImportOpen(false);
    }
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
      <header className="border-b border-border bg-popover">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-12">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              <House size={18} />
            </Link>
            <div className="h-5 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs px-2 tracking-wider">
                SKU
              </div>
              <span className="font-semibold text-sm hidden sm:inline">SKU Resume AI Builder</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setImportOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <UploadSimple size={16} />
              Import
            </button>
            <button
              onClick={createResume}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus size={16} />
              {creating ? "Creating..." : "New Resume"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 lg:px-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Resumes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, and manage your resumes
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-page rounded-md bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-24">
            <div className="mx-auto mb-4 size-16 rounded-full bg-secondary flex items-center justify-center">
              <FileText size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Create your first resume to get started
            </p>
            <button
              onClick={createResume}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus size={16} />
              {creating ? "Creating..." : "Create Resume"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {/* Create new card */}
            <motion.button
              onClick={createResume}
              disabled={creating}
              className="aspect-page rounded-md border-2 border-dashed border-border hover:border-primary/30 transition-colors flex flex-col items-center justify-center gap-3 group"
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="size-12 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {creating ? "Creating..." : "New Resume"}
              </span>
            </motion.button>

            {/* Resume cards */}
            {resumes.map((resume, i) => (
              <motion.div
                key={resume.id}
                className="group relative aspect-page rounded-md bg-popover shadow overflow-hidden border border-border hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                whileHover={{ y: -2, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                {/* Preview area */}
                <Link
                  href={`/builder/${resume.id}`}
                  className="block absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <div className="w-3/5 aspect-page bg-white rounded shadow-sm border flex items-center justify-center">
                      <FileText size={32} className="text-muted-foreground/20" />
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5">
                      <PencilSimple size={12} />
                      Edit
                    </span>
                  </div>
                </Link>

                {/* Footer */}
                <div className="absolute bottom-0 inset-x-0 bg-background/40 backdrop-blur-sm p-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm truncate">
                      {resume.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Last updated {formatDate(resume.updatedAt)}
                    </p>
                  </div>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuOpen(menuOpen === resume.id ? null : resume.id);
                      }}
                      className="size-8 rounded-md hover:bg-secondary flex items-center justify-center transition-colors"
                    >
                      <DotsThree size={18} className="text-muted-foreground" />
                    </button>
                    <AnimatePresence>
                      {menuOpen === resume.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuOpen(null)}
                          />
                          <motion.div
                            className="absolute right-0 bottom-full mb-1 z-20 w-44 bg-popover border border-border rounded-md shadow-lg py-1"
                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              href={`/builder/${resume.id}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                              onClick={() => setMenuOpen(null)}
                            >
                              <ArrowSquareOut size={16} />
                              Open
                            </Link>
                            <button
                              onClick={() => duplicateResume(resume)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                            >
                              <Copy size={16} />
                              Duplicate
                            </button>
                            <button
                              onClick={() => deleteResume(resume.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            >
                              <Trash size={16} />
                              Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Import Modal */}
      <AnimatePresence>
        {importOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-lg border border-border bg-popover shadow-2xl"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-base font-semibold">Import Resume</h2>
                <button
                  onClick={() => setImportOpen(false)}
                  className="size-8 rounded-md hover:bg-secondary flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {/* JSON Upload */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Upload JSON</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Import a resume from a JSON file exported from SKU Resume AI Builder or Reactive Resume.
                  </p>
                  <label className="flex flex-col items-center justify-center h-32 rounded-md border-2 border-dashed border-border hover:border-primary/30 cursor-pointer transition-colors group">
                    <UploadSimple size={24} className="text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {importing ? "Importing..." : "Click to upload .json file"}
                    </span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      disabled={importing}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImportJSON(file);
                      }}
                    />
                  </label>
                </div>

                {/* Drag & drop hint */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Supports JSON format from SKU Resume AI Builder and Reactive Resume
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
