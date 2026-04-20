import Link from "next/link";

const SAMPLES = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    tag: "Single column · Inter + Source Serif 4",
    blurb: "Left-aligned, heavy whitespace, em-dash bullets. Tech-forward.",
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    tag: "Single column · Libre Caslon + Libre Franklin",
    blurb: "Centered serif header, italic summary, stately for finance/ops.",
  },
  {
    id: "two-column-technical",
    name: "Two-Column Technical",
    tag: "27% sidebar · Geist Sans + Geist Mono",
    blurb: "Pill-tag skills, left rail for contact/skills/education.",
  },
];

export default function SampleIndex() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-8 py-14">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight">Template previews</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Live-rendered samples using the built-in dummy data. Click a card to open the preview; append{" "}
          <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs">?format=a4</code> for A4.
        </p>

        <div className="mt-10 grid gap-4">
          {SAMPLES.map((s) => (
            <Link
              key={s.id}
              href={`/sample/${s.id}`}
              className="group block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-lg font-medium">{s.name}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{s.tag}</div>
                </div>
                <span className="text-sm text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  Open →
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{s.blurb}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-xs text-neutral-500 space-y-1">
          <div>Generated PDFs are saved at <code>/samples/*.pdf</code> (not a web route).</div>
          <div>Run <code>node scripts/render-samples.mjs</code> against a live dev server to regenerate.</div>
        </div>
      </div>
    </div>
  );
}
