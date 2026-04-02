import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/resumes/[resumeId] — Get a single resume
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, resumeId))
      .limit(1);

    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }

    return Response.json(resume);
  } catch (error) {
    console.error("Failed to get resume:", error);
    return Response.json({ error: "Failed to get resume" }, { status: 500 });
  }
}

// PATCH /api/resumes/[resumeId] — Update a resume
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;
    const body = await request.json();

    const [updated] = await db
      .update(resumes)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(resumes.id, resumeId))
      .returning();

    if (!updated) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error("Failed to update resume:", error);
    return Response.json({ error: "Failed to update resume" }, { status: 500 });
  }
}

// DELETE /api/resumes/[resumeId] — Delete a resume
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;
    const [deleted] = await db
      .delete(resumes)
      .where(eq(resumes.id, resumeId))
      .returning();

    if (!deleted) {
      return Response.json({ error: "Resume not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return Response.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
