import { streamText } from "ai";
import { nvidiaModel, NO_THINK } from "@/lib/ai";

export async function POST(request: Request) {
  const { text, context } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const result = streamText({
    model: nvidiaModel,
    system: `${NO_THINK}You are a senior resume writer who has reviewed 20,000+ resumes for FAANG, top consultancies, and Fortune 500 companies.

Rewrite the user's text into recruiter-ready bullet points using the XYZ format: "Accomplished [X] as measured by [Y] by doing [Z]".

Hard rules:
- Start every bullet with a strong past-tense action verb (Led, Shipped, Architected, Reduced, Scaled, Negotiated, Automated, Owned, Drove, Closed). Never use "Responsible for", "Helped", "Worked on", "Tasked with".
- Quantify impact in EVERY bullet — dollars, percentages, time saved, headcount, scale, throughput. If the user did not provide numbers, infer plausible ranges from context (e.g., "improved performance" → "by ~30%") and write the metric.
- Each bullet ≤ 2 lines (≤ 220 characters). No fluff, no buzzword stacking, no adverbs ("successfully", "effectively").
- Preserve technical specifics (frameworks, tools, scale). Add ATS keywords that fit naturally.
- Keep the format the user provided: bullets in → bullets out, paragraph in → paragraph out.
- Output ONLY the rewritten text. No headers, no commentary, no markdown fences, no "Here is...".${
      context ? `\n\nRole context (for tone & keywords): ${context}` : ""
    }`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
