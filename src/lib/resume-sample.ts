import type { ResumeData } from "@/types/resume";

export function createSampleResumeData(overrides?: Partial<{ template: string; primary: string }>): ResumeData {
  return {
    basics: {
      name: "Alex Johnson",
      headline: "Senior Software Engineer",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      url: { url: "https://alexjohnson.dev", label: "Portfolio" },
      customFields: [],
    },
    picture: {
      url: "",
      size: 64,
      aspectRatio: 1,
      borderRadius: 0,
      effects: { hidden: true, border: false, grayscale: false },
    },
    summary:
      "Results-driven software engineer with 8+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud architecture. Led teams that delivered products serving 2M+ users.",
    sections: {
      profiles: { name: "Profiles", columns: 1, visible: true, items: [] },
      experience: {
        name: "Experience",
        columns: 1,
        visible: true,
        items: [
          {
            id: "exp-1",
            hidden: false,
            company: "TechCorp",
            position: "Senior Software Engineer",
            location: "San Francisco, CA",
            date: "2021 - Present",
            description:
              "Led a team of 6 engineers to rebuild the core platform, reducing page load times by 60%. Architected microservices handling 10K+ requests/second.",
            url: { url: "", label: "" },
          },
          {
            id: "exp-2",
            hidden: false,
            company: "StartupXYZ",
            position: "Full Stack Developer",
            location: "Remote",
            date: "2018 - 2021",
            description:
              "Built the entire frontend from scratch using React and TypeScript. Implemented CI/CD pipelines that reduced deployment time by 75%.",
            url: { url: "", label: "" },
          },
        ],
      },
      education: {
        name: "Education",
        columns: 1,
        visible: true,
        items: [
          {
            id: "edu-1",
            hidden: false,
            institution: "UC Berkeley",
            studyType: "B.S.",
            area: "Computer Science",
            score: "3.8",
            date: "2014 - 2018",
            description: "",
            url: { url: "", label: "" },
          },
        ],
      },
      skills: {
        name: "Skills",
        columns: 2,
        visible: true,
        items: [
          { id: "sk-1", hidden: false, name: "React / Next.js", description: "", level: 5, keywords: [] },
          { id: "sk-2", hidden: false, name: "TypeScript", description: "", level: 5, keywords: [] },
          { id: "sk-3", hidden: false, name: "Node.js", description: "", level: 4, keywords: [] },
          { id: "sk-4", hidden: false, name: "PostgreSQL", description: "", level: 4, keywords: [] },
          { id: "sk-5", hidden: false, name: "AWS / Cloud", description: "", level: 4, keywords: [] },
          { id: "sk-6", hidden: false, name: "Python", description: "", level: 3, keywords: [] },
        ],
      },
      languages: {
        name: "Languages",
        columns: 2,
        visible: true,
        items: [
          { id: "lang-1", hidden: false, name: "English", description: "Native", level: 5 },
          { id: "lang-2", hidden: false, name: "Spanish", description: "Conversational", level: 3 },
        ],
      },
      projects: {
        name: "Projects",
        columns: 1,
        visible: true,
        items: [
          {
            id: "proj-1",
            hidden: false,
            name: "Open Source Analytics",
            description: "Built an open-source analytics dashboard used by 500+ companies.",
            date: "2023",
            keywords: ["React", "D3.js"],
            url: { url: "", label: "" },
          },
        ],
      },
      interests: {
        name: "Interests",
        columns: 2,
        visible: true,
        items: [
          { id: "int-1", hidden: false, name: "Open Source", keywords: [] },
          { id: "int-2", hidden: false, name: "Rock Climbing", keywords: [] },
          { id: "int-3", hidden: false, name: "Photography", keywords: [] },
        ],
      },
      awards: { name: "Awards", columns: 1, visible: false, items: [] },
      certifications: {
        name: "Certifications",
        columns: 1,
        visible: true,
        items: [
          { id: "cert-1", hidden: false, name: "AWS Solutions Architect", issuer: "Amazon", date: "2022", description: "", url: { url: "", label: "" } },
        ],
      },
      publications: { name: "Publications", columns: 1, visible: false, items: [] },
      volunteer: { name: "Volunteer", columns: 1, visible: false, items: [] },
      references: { name: "References", columns: 1, visible: false, items: [] },
    },
    customSections: [],
    metadata: {
      template: overrides?.template || "onyx",
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
      page: { gapX: 16, gapY: 16, marginX: 32, marginY: 32, format: "a4", hideIcons: false },
      design: {
        colors: { primary: overrides?.primary || "#2563eb", text: "#000000", background: "#ffffff" },
        level: { type: "progress-bar" },
      },
      typography: {
        body: { fontFamily: "IBM Plex Serif", fontWeight: 400, fontSize: 13, lineHeight: 1.4 },
        heading: { fontFamily: "Fira Sans Condensed", fontWeight: 700, fontSize: 18, lineHeight: 1.2 },
      },
      notes: "",
    },
  };
}
