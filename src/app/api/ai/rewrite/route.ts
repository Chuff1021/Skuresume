import { streamText } from "ai";
import { nvidiaModel } from "@/lib/ai";

export async function POST(request: Request) {
  const { text, tone = "professional" } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const toneGuide: Record<string, string> = {
    professional: "Use a confident, professional tone with strong action verbs and quantified results.",
    friendly: "Use a warm, approachable tone while maintaining professionalism.",
    concise: "Be extremely concise and direct. Remove filler words. Keep only the most impactful points.",
  };

  const result = streamText({
    model: nvidiaModel,
    system: `You are a professional resume writer. Rewrite the provided text to be more impactful for a resume. ${toneGuide[tone] || toneGuide.professional} Return ONLY the rewritten text, nothing else.`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
