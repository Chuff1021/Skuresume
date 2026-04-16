import { streamText } from "ai";
import { nvidiaModel, NO_THINK } from "@/lib/ai";

export async function POST(request: Request) {
  const { experience, skills, education, headline, targetRole } = await request.json();

  const context = [
    headline ? `Headline: ${headline}` : "",
    targetRole ? `Target role: ${targetRole}` : "",
    experience?.length
      ? `Experience: ${experience
          .map(
            (e: { position: string; company: string; date?: string; description?: string }) =>
              `${e.position} at ${e.company}${e.date ? ` (${e.date})` : ""}${e.description ? ` — ${e.description}` : ""}`
          )
          .join("; ")}`
      : "",
    skills?.length
      ? `Skills: ${skills
          .map((s: { name: string; keywords?: string[] }) =>
            s.keywords?.length ? `${s.name} (${s.keywords.join(", ")})` : s.name
          )
          .join(", ")}`
      : "",
    education?.length
      ? `Education: ${education
          .map(
            (e: { studyType: string; area: string; institution: string }) =>
              `${e.studyType} in ${e.area} at ${e.institution}`
          )
          .join("; ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!context) {
    return Response.json(
      { error: "At least some resume content is required" },
      { status: 400 }
    );
  }

  const result = streamText({
    model: nvidiaModel,
    system: `${NO_THINK}You are a senior resume writer.

Write a 3-sentence professional summary based on the resume content provided.

Rules:
- Sentence 1: years of experience + domain + headline title (e.g., "Senior backend engineer with 7+ years building high-throughput payment systems.").
- Sentence 2: 2-3 strongest accomplishments with quantified impact, drawn from the experience listed.
- Sentence 3: signature strengths or what they're looking to do next, tied to the target role if provided.
- Third person voice without using "I" or the candidate's name. No "passionate", "hard-working", "team player", "dynamic", or other clichés.
- 60-90 words total. ATS-friendly (include the key skill keywords).
- Output ONLY the summary text. No preamble, no markdown, no quotes around the text.`,
    prompt: context,
  });

  return result.toTextStreamResponse();
}
