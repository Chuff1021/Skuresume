import { db } from "@/db";
import { resumes, resumeStatistics } from "@/db/schema";
import { createDefaultResumeData, generateSlug } from "@/lib/resume-defaults";
import type { ResumeData } from "@/types/resume";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: importedData, name: importedName } = body;

    // Merge imported data with defaults to fill any missing fields
    const defaults = createDefaultResumeData();
    const data: ResumeData = {
      basics: { ...defaults.basics, ...importedData?.basics },
      picture: { ...defaults.picture, ...importedData?.picture },
      summary: importedData?.summary || defaults.summary,
      sections: {
        profiles: { ...defaults.sections.profiles, ...importedData?.sections?.profiles },
        experience: { ...defaults.sections.experience, ...importedData?.sections?.experience },
        education: { ...defaults.sections.education, ...importedData?.sections?.education },
        skills: { ...defaults.sections.skills, ...importedData?.sections?.skills },
        languages: { ...defaults.sections.languages, ...importedData?.sections?.languages },
        projects: { ...defaults.sections.projects, ...importedData?.sections?.projects },
        interests: { ...defaults.sections.interests, ...importedData?.sections?.interests },
        awards: { ...defaults.sections.awards, ...importedData?.sections?.awards },
        certifications: { ...defaults.sections.certifications, ...importedData?.sections?.certifications },
        publications: { ...defaults.sections.publications, ...importedData?.sections?.publications },
        volunteer: { ...defaults.sections.volunteer, ...importedData?.sections?.volunteer },
        references: { ...defaults.sections.references, ...importedData?.sections?.references },
      },
      customSections: importedData?.customSections || [],
      metadata: {
        ...defaults.metadata,
        ...importedData?.metadata,
        design: { ...defaults.metadata.design, ...importedData?.metadata?.design },
        typography: { ...defaults.metadata.typography, ...importedData?.metadata?.typography },
        layout: { ...defaults.metadata.layout, ...importedData?.metadata?.layout },
        page: { ...defaults.metadata.page, ...importedData?.metadata?.page },
        css: { ...defaults.metadata.css, ...importedData?.metadata?.css },
      },
    };

    const name = importedName || importedData?.basics?.name || "Imported Resume";
    const slug = generateSlug(name);

    const [resume] = await db
      .insert(resumes)
      .values({ name, slug, data })
      .returning();

    await db.insert(resumeStatistics).values({ resumeId: resume.id });

    return Response.json(resume, { status: 201 });
  } catch (error) {
    console.error("Failed to import resume:", error);
    return Response.json({ error: "Failed to import resume" }, { status: 500 });
  }
}
