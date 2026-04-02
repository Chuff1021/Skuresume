import type { ResumeData } from "@/types/resume";

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
      size: 64,
      aspectRatio: 1,
      borderRadius: 0,
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
        sidebarWidth: 30,
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
        gapX: 16,
        gapY: 16,
        marginX: 32,
        marginY: 32,
        format: "a4",
        hideIcons: false,
      },
      design: {
        colors: {
          primary: "#2563eb",
          text: "#000000",
          background: "#ffffff",
        },
        level: { type: "progress-bar" },
      },
      typography: {
        body: {
          fontFamily: "IBM Plex Serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
        },
        heading: {
          fontFamily: "Fira Sans Condensed",
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 1.2,
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
