import { db } from "@/db";
import { resumes, resumeStatistics } from "@/db/schema";
import { createDefaultResumeData, generateSlug } from "@/lib/resume-defaults";
import { desc } from "drizzle-orm";

// GET /api/resumes — List all resumes
export async function GET() {
  try {
    const results = await db
      .select()
      .from(resumes)
      .orderBy(desc(resumes.updatedAt));

    return Response.json(results);
  } catch (error) {
    console.error("Failed to list resumes:", error);
    return Response.json({ error: "Failed to list resumes" }, { status: 500 });
  }
}

// POST /api/resumes — Create a new resume
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || "Untitled Resume";
    const slug = generateSlug(name);
    const data = createDefaultResumeData();

    const [resume] = await db
      .insert(resumes)
      .values({ name, slug, data })
      .returning();

    // Create statistics entry
    await db.insert(resumeStatistics).values({ resumeId: resume.id });

    return Response.json(resume, { status: 201 });
  } catch (error) {
    console.error("Failed to create resume:", error);
    return Response.json({ error: "Failed to create resume" }, { status: 500 });
  }
}
