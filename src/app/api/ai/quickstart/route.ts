import { generateText } from "ai";
import { nanoid } from "nanoid";
import { structuredModel, NO_THINK } from "@/lib/ai";
import { extractJson, sanitizeJsonString } from "@/lib/ai-json";
import { createDefaultResumeData } from "@/lib/resume-defaults";
import type { ResumeData } from "@/types/resume";

// Single endpoint that takes a free-form intake (pasted resume / "tell me about
// yourself" / LinkedIn dump) plus an optional target role and returns a
// fully-populated ResumeData. The AI does the heavy lift: extracting structured
// experience entries, writing strong summary, drafting quantified bullets,
// inferring skills.

export const maxDuration = 60;

const SYSTEM = `${NO_THINK}You are a senior resume writer with 15+ years of experience.

You will be given a free-form description of a person's career — could be a pasted resume, a LinkedIn dump, an unstructured "here's my story" paragraph, or a bulleted brain-dump. Your job is to convert it into a complete, recruiter-ready resume in JSON format.

Output JSON ONLY (no markdown, no \`\`\`json fences, no commentary). Match this exact schema:

{
  "basics": {
    "name": string,
    "headline": string,           // e.g. "Senior Software Engineer · Distributed Systems"
    "email": string,              // empty string if not provided
    "phone": string,
    "location": string,           // "City, State" or "City, Country"
    "url": { "url": string, "label": string }   // personal site / portfolio if mentioned
  },
  "summary": string,              // 3 sentences, 60-90 words, third person, NO clichés. See rules.
  "profiles": [                   // LinkedIn / GitHub / Twitter / etc — only if mentioned or strongly implied
    { "network": "LinkedIn"|"GitHub"|"Twitter"|"Portfolio"|"Dribbble"|"Other", "username": string, "url": string }
  ],
  "experience": [                 // most recent first
    {
      "company": string,
      "position": string,
      "location": string,         // "City, State" or "Remote" — empty if unknown
      "date": string,             // "Jan 2022 - Present" or "2019 - 2022" — preserve user's specificity
      "description": string,      // 3-5 bullets, each starting with "- ". See bullet rules below.
      "url": string               // company website if known, else empty
    }
  ],
  "education": [
    {
      "institution": string,
      "studyType": string,        // "Bachelor of Science", "MBA", "High School Diploma", etc.
      "area": string,             // major / field of study
      "score": string,            // GPA if mentioned, else empty
      "date": string,             // "2018 - 2022" or just "2022"
      "description": string       // honors, relevant coursework, leadership — empty if nothing notable
    }
  ],
  "skills": [                     // group into 3-6 themed buckets, NOT a flat list of 30 things
    {
      "name": string,             // bucket name e.g. "Languages", "Frontend", "Cloud & DevOps"
      "keywords": string[],       // 4-10 specific tools/techs in that bucket
      "level": number             // 1-5, default 4
    }
  ],
  "projects": [                   // include side projects, OSS, hackathons if mentioned
    {
      "name": string,
      "date": string,
      "description": string,      // 1-3 bullets each starting with "- "
      "keywords": string[],       // tech stack
      "url": string
    }
  ],
  "certifications": [
    { "name": string, "issuer": string, "date": string, "description": string, "url": string }
  ],
  "awards": [
    { "title": string, "awarder": string, "date": string, "description": string, "url": string }
  ],
  "languages": [
    { "name": string, "description": string, "level": number }   // level 1-5
  ]
}

Bullet rules (apply to every experience.description and project.description):
- Format: ONE bullet per line. Each line MUST start with "- " (dash + space). Separate bullets with literal newline characters (\n in the JSON string). NEVER put multiple bullets on the same line.
- Start each bullet with a strong past-tense verb (Led, Shipped, Architected, Reduced, Scaled, Drove, Owned, Closed, Automated, Negotiated). NEVER use "Responsible for", "Helped", "Worked on", "Tasked with".
- Quantify impact in EVERY bullet — dollars, percentages, time saved, headcount, scale, throughput. If the user did not give numbers, infer plausible specifics from context (e.g. "improved performance" → "by ~30%"; "led team" → "of 6 engineers"). Round, hedge with "~" if inferring.
- Each bullet ≤ 220 chars. 3-5 bullets per role.
- Mention concrete tools / frameworks / scale where relevant (ATS keywords).
- No fluff: no "successfully", "effectively", "various", "many", "responsible".

Example of correct experience.description value (note the \n separators in the JSON string):
"- Led the disputes platform processing ~$2B/yr, reducing chargeback false positives 28% by rebuilding the rules engine in Go.\n- Architected an event-driven risk pipeline on Kafka serving 4k req/s with p99 < 80ms.\n- Mentored 6 engineers across two pods, raising on-call resolution time by ~40%."

Summary rules:
- 3 sentences, 60-90 words, third-person without using "I" or the candidate's name.
- Sentence 1: years of experience + domain + most senior title.
- Sentence 2: 2-3 strongest quantified accomplishments.
- Sentence 3: signature strengths or what they're targeting next.
- No clichés ("passionate", "hard-working", "team player", "results-driven", "dynamic", "synergy").

General:
- If a field is unknown, use "" for strings and [] for arrays. Do not fabricate names, companies, schools, or dates.
- DO fabricate plausible quantified outcomes for vague accomplishments (mark with "~" so user knows to verify).
- Always include skills, even if you have to infer them from job titles.
- If the user provides a target role, tilt the summary, headline, and skill bucket ordering toward that role's keywords.
- Output the JSON object only. Nothing before, nothing after.`;

interface AIBasics {
  name?: string;
  headline?: string;
  email?: string;
  phone?: string;
  location?: string;
  url?: { url?: string; label?: string };
}
interface AIProfile { network?: string; username?: string; url?: string }
interface AIExperience { company?: string; position?: string; location?: string; date?: string; description?: string; url?: string }
interface AIEducation { institution?: string; studyType?: string; area?: string; score?: string; date?: string; description?: string }
interface AISkill { name?: string; keywords?: string[]; level?: number }
interface AIProject { name?: string; date?: string; description?: string; keywords?: string[]; url?: string }
interface AICertification { name?: string; issuer?: string; date?: string; description?: string; url?: string }
interface AIAward { title?: string; awarder?: string; date?: string; description?: string; url?: string }
interface AILanguage { name?: string; description?: string; level?: number }

interface AIPayload {
  basics?: AIBasics;
  summary?: string;
  profiles?: AIProfile[];
  experience?: AIExperience[];
  education?: AIEducation[];
  skills?: AISkill[];
  projects?: AIProject[];
  certifications?: AICertification[];
  awards?: AIAward[];
  languages?: AILanguage[];
}

function url(u?: { url?: string; label?: string } | string) {
  if (typeof u === "string") return { url: u || "", label: "" };
  return { url: u?.url || "", label: u?.label || "" };
}

function clamp(n: number | undefined, min: number, max: number, fallback: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function aiToResumeData(ai: AIPayload): ResumeData {
  const d = createDefaultResumeData();

  d.basics = {
    name: ai.basics?.name || "",
    headline: ai.basics?.headline || "",
    email: ai.basics?.email || "",
    phone: ai.basics?.phone || "",
    location: ai.basics?.location || "",
    url: url(ai.basics?.url),
    customFields: [],
  };

  d.summary = ai.summary || "";

  d.sections.profiles.items = (ai.profiles || []).map((p) => ({
    id: nanoid(8),
    hidden: false,
    network: p.network || "Other",
    username: p.username || "",
    icon: "",
    url: url(p.url),
  }));

  d.sections.experience.items = (ai.experience || []).map((e) => ({
    id: nanoid(8),
    hidden: false,
    company: e.company || "",
    position: e.position || "",
    location: e.location || "",
    date: e.date || "",
    description: e.description || "",
    url: url(e.url),
  }));

  d.sections.education.items = (ai.education || []).map((e) => ({
    id: nanoid(8),
    hidden: false,
    institution: e.institution || "",
    studyType: e.studyType || "",
    area: e.area || "",
    score: e.score || "",
    date: e.date || "",
    description: e.description || "",
    url: { url: "", label: "" },
  }));

  d.sections.skills.items = (ai.skills || []).map((s) => ({
    id: nanoid(8),
    hidden: false,
    name: s.name || "",
    description: "",
    level: clamp(s.level, 1, 5, 4),
    keywords: Array.isArray(s.keywords) ? s.keywords.filter((k) => typeof k === "string") : [],
  }));

  d.sections.projects.items = (ai.projects || []).map((p) => ({
    id: nanoid(8),
    hidden: false,
    name: p.name || "",
    description: p.description || "",
    date: p.date || "",
    keywords: Array.isArray(p.keywords) ? p.keywords.filter((k) => typeof k === "string") : [],
    url: url(p.url),
  }));

  d.sections.certifications.items = (ai.certifications || []).map((c) => ({
    id: nanoid(8),
    hidden: false,
    name: c.name || "",
    issuer: c.issuer || "",
    date: c.date || "",
    description: c.description || "",
    url: url(c.url),
  }));

  d.sections.awards.items = (ai.awards || []).map((a) => ({
    id: nanoid(8),
    hidden: false,
    title: a.title || "",
    awarder: a.awarder || "",
    date: a.date || "",
    description: a.description || "",
    url: url(a.url),
  }));

  d.sections.languages.items = (ai.languages || []).map((l) => ({
    id: nanoid(8),
    hidden: false,
    name: l.name || "",
    description: l.description || "",
    level: clamp(l.level, 1, 5, 4),
  }));

  return d;
}

export async function POST(request: Request) {
  try {
    const { intake, targetRole } = await request.json();

    if (!intake || typeof intake !== "string" || intake.trim().length < 30) {
      return Response.json(
        { error: "Tell us a bit more about your background (at least a few sentences)." },
        { status: 400 }
      );
    }

    const userPrompt = [
      targetRole ? `TARGET ROLE: ${targetRole}\n` : "",
      "BACKGROUND / RESUME INTAKE:\n",
      intake.trim(),
    ].join("");

    const { text } = await generateText({
      model: structuredModel,
      system: SYSTEM,
      prompt: userPrompt,
      temperature: 0.4,
    });

    let parsed: AIPayload;
    try {
      parsed = JSON.parse(sanitizeJsonString(extractJson(text)));
    } catch (err) {
      console.error("Quickstart JSON parse failed:", err, "\nRaw:", text.slice(0, 800));
      return Response.json(
        { error: "AI returned malformed output. Try again or shorten your intake." },
        { status: 502 }
      );
    }

    const data = aiToResumeData(parsed);
    const name = data.basics.name || parsed.basics?.name || "AI-Generated Resume";

    return Response.json({ name, data });
  } catch (error) {
    console.error("Quickstart failed:", error);
    return Response.json({ error: "AI generation failed" }, { status: 500 });
  }
}
