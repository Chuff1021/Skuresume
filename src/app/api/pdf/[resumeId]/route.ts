import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAppBaseUrl, renderResumePdf, suggestFilename } from "@/lib/pdf/render";
import type { ResumeData } from "@/types/resume";

export const runtime = "nodejs";
export const maxDuration = 60;

// GET /api/pdf/[resumeId] — render the resume as a PDF using headless Chromium.
// Query params:
//   format=a4|letter  (optional, defaults to the resume's metadata.page.format)
//   disposition=attachment|inline  (defaults to attachment)
export async function GET(request: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  try {
    const { resumeId } = await params;
    const url = new URL(request.url);
    const formatParam = url.searchParams.get("format");
    const disposition = url.searchParams.get("disposition") === "inline" ? "inline" : "attachment";
    const format =
      formatParam === "a4" || formatParam === "letter" ? formatParam : undefined;

    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, resumeId))
      .limit(1);

    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }

    const baseUrl = getAppBaseUrl(request.url);
    const data = resume.data as ResumeData;
    const pdf = await renderResumePdf({ resumeId, baseUrl, format });
    const filename = suggestFilename(data);

    const body = new Uint8Array(pdf);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "Content-Length": String(body.byteLength),
      },
    });
  } catch (error) {
    console.error("PDF render failed:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to render PDF" },
      { status: 500 },
    );
  }
}
