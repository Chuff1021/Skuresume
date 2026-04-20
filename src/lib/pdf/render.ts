import type { ResumeData } from "@/types/resume";
import { launchBrowser } from "./browser";

// Resolve the absolute URL of the running app so the headless browser can
// navigate to the print page. Falls back to localhost for dev.
export function getAppBaseUrl(requestUrl?: string): string {
  if (process.env.PDF_BASE_URL) return process.env.PDF_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (requestUrl) {
    try {
      const u = new URL(requestUrl);
      return `${u.protocol}//${u.host}`;
    } catch {
      /* ignore */
    }
  }
  return "http://localhost:3000";
}

interface RenderOpts {
  resumeId: string;
  baseUrl: string;
  format?: "a4" | "letter";
}

// Navigate to the print page and produce a PDF buffer. The print page is
// expected to set `window.__RESUME_READY__ = true` once fonts and content
// are fully laid out (see /src/app/print/[resumeId]/page.tsx).
export async function renderResumePdf({ resumeId, baseUrl, format }: RenderOpts): Promise<Uint8Array> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    const url = `${baseUrl}/print/${encodeURIComponent(resumeId)}?mode=pdf${format ? `&format=${format}` : ""}`;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });

    // Wait for the print page to signal it's ready (fonts loaded, data rendered).
    await page.waitForFunction("window.__RESUME_READY__ === true", { timeout: 30000 });

    // Read the actual format the page resolved to (metadata might override our query).
    const pageFormat = await page.evaluate(
      () => (document.documentElement.getAttribute("data-format") as "a4" | "letter") || "letter",
    );
    const targetFormat = format || pageFormat;

    const pdf = await page.pdf({
      format: targetFormat === "a4" ? "A4" : "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    return pdf;
  } finally {
    await browser.close();
  }
}

export function suggestFilename(data: ResumeData): string {
  const name = (data.basics.name || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${name || "resume"}.pdf`;
}
