import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/public/[slug] — Fetch a public resume by slug
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.slug, slug))
      .limit(1);

    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }

    if (!resume.isPublic) {
      return Response.json({ error: "Resume is not public" }, { status: 403 });
    }

    return Response.json(resume);
  } catch (error) {
    console.error("Failed to get public resume:", error);
    return Response.json({ error: "Failed to get resume" }, { status: 500 });
  }
}
