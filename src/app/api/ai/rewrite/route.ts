import { streamText } from "ai";
import { nvidiaModel, NO_THINK } from "@/lib/ai";

export async function POST(request: Request) {
  const { text, tone = "professional" } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const toneGuide: Record<string, string> = {
    professional:
      "Confident, executive tone. Past-tense action verbs, quantified outcomes, ATS-friendly. No clichés.",
    friendly:
      "Warm and human while staying credible. Active voice, plain words, no slang. Still quantify impact.",
    concise:
      "Ruthlessly tight. Cut filler, adjectives, and adverbs. Aim for ~30% shorter than the input. Preserve every fact and number.",
  };

  const result = streamText({
    model: nvidiaModel,
    system: `${NO_THINK}You are a senior resume writer. Rewrite the user's text for a resume.

Tone: ${toneGuide[tone] || toneGuide.professional}

Hard rules:
- Preserve every concrete fact (companies, dates, numbers, tools).
- Strong action verbs, no "Responsible for / Helped / Worked on".
- Keep the input format (bullets → bullets, paragraph → paragraph).
- Output ONLY the rewritten text. No preamble, no markdown fences, no "Here is...".`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
