import { streamText } from "ai";
import { nvidiaModel } from "@/lib/ai";

export async function POST(request: Request) {
  const { experience, skills, education } = await request.json();

  const context = [
    experience?.length ? `Experience: ${experience.map((e: { position: string; company: string; description: string }) => `${e.position} at ${e.company}: ${e.description}`).join("; ")}` : "",
    skills?.length ? `Skills: ${skills.map((s: { name: string }) => s.name).join(", ")}` : "",
    education?.length ? `Education: ${education.map((e: { studyType: string; area: string; institution: string }) => `${e.studyType} in ${e.area} at ${e.institution}`).join("; ")}` : "",
  ].filter(Boolean).join("\n");

  if (!context) {
    return Response.json({ error: "At least some resume content is required" }, { status: 400 });
  }

  const result = streamText({
    model: nvidiaModel,
    system: "You are a professional resume writer. Generate a compelling 2-3 sentence professional summary based on the provided resume content. Write in first person without using 'I'. Focus on key strengths, experience, and career value. Return ONLY the summary text.",
    prompt: context,
  });

  return result.toTextStreamResponse();
}
