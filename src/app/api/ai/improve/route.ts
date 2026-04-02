import { streamText } from "ai";
import { nvidiaModel } from "@/lib/ai";

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const result = streamText({
    model: nvidiaModel,
    system: `You are a professional resume writer. Improve the provided resume bullet points or description text. Use the STAR method (Situation, Task, Action, Result) where applicable. Use strong action verbs. Quantify results with numbers, percentages, or dollar amounts when possible. Make each point impactful and ATS-friendly. Return ONLY the improved text, maintaining the same format (bullet points if input was bullets, paragraph if input was a paragraph).`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
