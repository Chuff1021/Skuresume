import Link from "next/link";
import {
  FileText,
  Sparkles,
  Layout,
  Download,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">SKU AI Resume Builder</span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Build your resume with{" "}
            <span className="text-primary">AI-powered</span> precision
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Create stunning, professional resumes in minutes. Choose from 13
            templates, customize every detail, and let AI help you write
            impactful content.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-surface-1 border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Layout className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                13 Professional Templates
              </h3>
              <p className="text-muted text-sm">
                Choose from a curated collection of modern, ATS-friendly
                templates designed by professionals.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-1 border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                AI Content Assistant
              </h3>
              <p className="text-muted text-sm">
                Let AI rewrite your descriptions, generate summaries, and tailor
                your resume to specific job postings.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-1 border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Export &amp; Share
              </h3>
              <p className="text-muted text-sm">
                Download high-quality PDFs, share via public links, or export
                your data as JSON anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted">
          SKU AI Resume Builder — Free &amp; Open Source
        </div>
      </footer>
    </div>
  );
}
