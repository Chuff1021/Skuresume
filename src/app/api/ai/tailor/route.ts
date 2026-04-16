import { generateText } from "ai";
import { structuredModel, NO_THINK } from "@/lib/ai";
import { extractJson, sanitizeJsonString } from "@/lib/ai-json";

export const maxDuration = 60;

interface ExperienceItem {
  id: string;
  position?: string;
  company?: string;
  description?: string;
}

interface SkillItem {
  id: string;
  name?: string;
  keywords?: string[];
}

const SYSTEM = `${NO_THINK}You are an expert resume tailoring assistant. You will be given a job description and the candidate's current resume. Produce a JSON patch the UI can apply automatically.

Output JSON ONLY with this exact shape (no markdown, no commentary):
{
  "summary": string,                      // rewritten 3-sentence summary tailored to the JD. 60-90 words. No clichés.
  "headline": string,                     // optional rewritten headline that targets the JD title
  "experiences": [
    { "id": string, "description": string }   // rewritten bullets for the most relevant 3-5 experience items only.
                                              // description = 3-5 lines starting with "- ", quantified, action verbs.
                                              // ONLY include experience items whose IDs were provided in the input.
  ],
  "skillKeywords": [
    { "id": string, "addKeywords": string[] }  // for existing skill buckets, list keywords to add (don't duplicate existing).
                                               // Use real IDs from the input.
  ],
  "newSkillBucket": {                     // optional — only if the JD requires a skill area the candidate has none of
    "name": string,
    "keywords": string[]
  } | null,
  "notes": string[]                       // 2-5 short bullet points explaining the changes for the user.
}

Bullet rules for experience.description:
- ONE bullet per line. Each line starts with "- " then a strong past-tense verb (Led, Shipped, Architected, Reduced, Scaled, Drove, Owned, Closed, Automated). Never "Responsible for / Helped / Worked on".
- Separate bullets with literal newlines (\n in the JSON string). Never put multiple bullets on one line.
- Quantify EVERY bullet. If the original lacks numbers, infer plausible ones (mark with "~").
- Each bullet ≤ 220 chars. 3-5 bullets per role.
- Surface keywords from the JD that legitimately match the candidate's experience.
- Do NOT fabricate companies, titles, dates, or schools. Only rewrite descriptions.

Example of correct experience.description value:
"- Reduced p99 latency 35% by rewriting the order service in Go on AWS Lambda.\n- Owned migration of 12-service monolith to event-driven Kafka pipeline serving ~5k req/s.\n- Mentored 4 engineers; led the design review process across the platform pod."

Output JSON object only. Nothing before, nothing after.`;

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json();

    if (!jobDescription) {
      return Response.json({ error: "Job description is required" }, { status: 400 });
    }

    const compactResume = {
      basics: {
        name: resumeData?.basics?.name,
        headline: resumeData?.basics?.headline,
      },
      summary: resumeData?.summary,
      experience: (resumeData?.sections?.experience?.items as ExperienceItem[] | undefined)?.map((e) => ({
        id: e.id,
        position: e.position,
        company: e.company,
        description: e.description,
      })),
      skills: (resumeData?.sections?.skills?.items as SkillItem[] | undefined)?.map((s) => ({
        id: s.id,
        name: s.name,
        keywords: s.keywords,
      })),
    };

    const userPrompt = `JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME (JSON):
${JSON.stringify(compactResume, null, 2)}`;

    const { text } = await generateText({
      model: structuredModel,
      system: SYSTEM,
      prompt: userPrompt,
      temperature: 0.3,
    });

    let patch;
    try {
      patch = JSON.parse(sanitizeJsonString(extractJson(text)));
    } catch (err) {
      console.error("Tailor JSON parse failed:", err, "\nRaw:", text.slice(0, 800));
      return Response.json(
        { error: "AI returned malformed output. Try again." },
        { status: 502 }
      );
    }

    return Response.json(patch);
  } catch (error) {
    console.error("Tailor failed:", error);
    return Response.json({ error: "Tailor failed" }, { status: 500 });
  }
}
