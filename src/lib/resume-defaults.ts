import type { ResumeData } from "@/types/resume";

// Default typography/color system tuned for production-quality output.
// Body sits at 10.5pt (11.5 px at 72dpi ~ 14 px at 96dpi) which is the sweet
// spot for a printed resume: small enough to fit real content, big enough to
// read without eye strain. Name is 26pt for a strong visual anchor.
// Margins are 0.65 inch (~62 px @ 96dpi) — the spec calls for 0.5-0.75.
export function createDefaultResumeData(): ResumeData {
  return {
    basics: {
      name: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      url: { url: "", label: "" },
      customFields: [],
    },
    picture: {
      url: "",
      size: 88,
      aspectRatio: 1,
      borderRadius: 999,
      effects: { hidden: false, border: false, grayscale: false },
    },
    summary: "",
    sections: {
      profiles: { name: "Profiles", columns: 1, visible: true, items: [] },
      experience: { name: "Experience", columns: 1, visible: true, items: [] },
      education: { name: "Education", columns: 1, visible: true, items: [] },
      skills: { name: "Skills", columns: 2, visible: true, items: [] },
      languages: { name: "Languages", columns: 2, visible: true, items: [] },
      projects: { name: "Projects", columns: 1, visible: true, items: [] },
      interests: { name: "Interests", columns: 2, visible: true, items: [] },
      awards: { name: "Awards", columns: 1, visible: true, items: [] },
      certifications: { name: "Certifications", columns: 1, visible: true, items: [] },
      publications: { name: "Publications", columns: 1, visible: true, items: [] },
      volunteer: { name: "Volunteer", columns: 1, visible: true, items: [] },
      references: { name: "References", columns: 1, visible: true, items: [] },
    },
    customSections: [],
    metadata: {
      template: "onyx",
      layout: {
        sidebarWidth: 32,
        pages: [
          {
            fullWidth: false,
            main: ["experience", "education", "projects", "volunteer", "references"],
            sidebar: ["profiles", "skills", "languages", "interests", "awards", "certifications", "publications"],
          },
        ],
      },
      css: { enabled: false, value: "" },
      page: {
        gapX: 20,
        gapY: 18,
        marginX: 62,
        marginY: 56,
        format: "letter",
        hideIcons: false,
      },
      design: {
        colors: {
          primary: "#0F4C81",   // Modern executive navy
          text: "#1F2937",      // Gray-800 (softer than pure black)
          background: "#FFFFFF",
        },
        level: { type: "rectangle" },
      },
      typography: {
        body: {
          fontFamily: "Source Serif 4",
          fontWeight: 400,
          fontSize: 11,
          lineHeight: 1.45,
        },
        heading: {
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 26,
          lineHeight: 1.15,
        },
      },
      notes: "",
    },
  };
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    || "untitled";
}
