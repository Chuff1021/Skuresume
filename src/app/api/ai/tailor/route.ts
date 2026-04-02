import { streamText } from "ai";
import { nvidiaModel } from "@/lib/ai";

export async function POST(request: Request) {
  const { resumeData, jobDescription } = await request.json();

  if (!jobDescription) {
    return Response.json({ error: "Job description is required" }, { status: 400 });
  }

  const resumeSummary = JSON.stringify({
    basics: resumeData?.basics,
    summary: resumeData?.summary,
    experience: resumeData?.sections?.experience?.items?.map((e: { position: string; company: string; description: string }) => ({
      position: e.position,
      company: e.company,
      description: e.description,
    })),
    skills: resumeData?.sections?.skills?.items?.map((s: { name: string }) => s.name),
    education: resumeData?.sections?.education?.items?.map((e: { studyType: string; area: string; institution: string }) => ({
      degree: e.studyType,
      field: e.area,
      school: e.institution,
    })),
  });

  const result = streamText({
    model: nvidiaModel,
    system: `You are an expert resume tailoring assistant. Analyze the job description and the current resume, then provide specific, actionable suggestions to optimize the resume for this role. Format your response as a numbered list of concrete changes. Focus on:
1. Keywords and skills to add or emphasize
2. Experience descriptions to rewrite or reorder
3. Summary adjustments
4. Any sections to add or remove
Be specific — don't just say "add keywords", say exactly which keywords and where.`,
    prompt: `Job Description:\n${jobDescription}\n\nCurrent Resume:\n${resumeSummary}`,
  });

  return result.toTextStreamResponse();
}
