import type { ResumeData } from "@/types/resume";

// Richer sample data than the sparse createSampleResumeData seed. Used by the
// /sample/[template] preview route and the render-samples script so the
// template visuals can be evaluated with realistic content density.
export function createFullSampleResume(overrides?: { template?: string; primary?: string }): ResumeData {
  return {
    basics: {
      name: "Jordan Reyes",
      headline: "Staff Software Engineer — Platform & Infrastructure",
      email: "jordan@reyes.dev",
      phone: "+1 (415) 555-0134",
      location: "San Francisco, CA",
      url: { url: "https://jordanreyes.dev", label: "jordanreyes.dev" },
      customFields: [],
    },
    picture: {
      url: "",
      size: 72,
      aspectRatio: 1,
      borderRadius: 999,
      effects: { hidden: true, border: false, grayscale: false },
    },
    summary:
      "Staff engineer with 12 years building developer platforms used by 10k+ engineers at scale. Led the migration of a monolith to a distributed services platform supporting $2B in annual revenue. Deep expertise in distributed systems, observability, and engineering productivity.",
    sections: {
      profiles: {
        name: "Profiles",
        columns: 1,
        visible: true,
        items: [
          { id: "p-1", hidden: false, network: "GitHub", username: "jreyes", icon: "", url: { url: "https://github.com/jreyes", label: "github.com/jreyes" } },
          { id: "p-2", hidden: false, network: "LinkedIn", username: "jordan-reyes", icon: "", url: { url: "https://linkedin.com/in/jordan-reyes", label: "linkedin.com/in/jordan-reyes" } },
        ],
      },
      experience: {
        name: "Experience",
        columns: 1,
        visible: true,
        items: [
          {
            id: "e-1",
            hidden: false,
            company: "Linear",
            position: "Staff Software Engineer",
            location: "San Francisco, CA",
            date: "2022 — Present",
            description:
              "Led platform team of 8 engineers rebuilding the sync engine; reduced p99 write latency from 480ms to 110ms.\nDesigned the multi-region replication architecture now serving 60% of enterprise traffic with 99.99% uptime.\nMentored 4 engineers through senior promotion; instituted the weekly architecture review that caught 3 major incidents pre-launch.",
            url: { url: "", label: "" },
          },
          {
            id: "e-2",
            hidden: false,
            company: "Stripe",
            position: "Senior Software Engineer",
            location: "Remote",
            date: "2018 — 2022",
            description:
              "Owned the developer tooling surface used by 600+ internal engineers — CLI, local dev loop, and incident tooling.\nShipped the unified deploy pipeline replacing 14 bespoke scripts; cut average deploy time from 38m to 6m.\nFounded the Platform Reliability Guild; drove adoption of SLO-based alerting across 40 teams.",
            url: { url: "", label: "" },
          },
          {
            id: "e-3",
            hidden: false,
            company: "Mapbox",
            position: "Software Engineer",
            location: "Washington, DC",
            date: "2014 — 2018",
            description:
              "Built the vector tile rendering pipeline serving 3B+ tiles/day at p99 < 50ms.\nLed the GL.js 1.0 release — 40% reduction in bundle size, 3x faster first paint on mobile.",
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
            id: "ed-1",
            hidden: false,
            institution: "Carnegie Mellon University",
            studyType: "B.S.",
            area: "Computer Science",
            score: "3.87",
            date: "2010 — 2014",
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
          { id: "s-1", hidden: false, name: "Languages", description: "", level: 5, keywords: ["TypeScript", "Go", "Rust", "Python", "SQL"] },
          { id: "s-2", hidden: false, name: "Infrastructure", description: "", level: 5, keywords: ["Kubernetes", "Terraform", "AWS", "Postgres", "Kafka", "Redis"] },
          { id: "s-3", hidden: false, name: "Frontend", description: "", level: 4, keywords: ["React", "Next.js", "WebGL"] },
          { id: "s-4", hidden: false, name: "Observability", description: "", level: 5, keywords: ["Prometheus", "Grafana", "OpenTelemetry", "Datadog"] },
        ],
      },
      languages: {
        name: "Languages",
        columns: 2,
        visible: true,
        items: [
          { id: "l-1", hidden: false, name: "English", description: "Native", level: 5 },
          { id: "l-2", hidden: false, name: "Spanish", description: "Fluent", level: 4 },
          { id: "l-3", hidden: false, name: "Portuguese", description: "Conversational", level: 3 },
        ],
      },
      projects: {
        name: "Projects",
        columns: 1,
        visible: true,
        items: [
          {
            id: "pr-1",
            hidden: false,
            name: "pgmq-rs",
            description:
              "Rust client for PostgreSQL-backed message queues. 4k+ stars, used in production by 40+ companies.\nDesigned the exactly-once consumer API inspired by SQS but ACID-safe.",
            date: "2023 — Present",
            keywords: ["Rust", "PostgreSQL", "Distributed Systems"],
            url: { url: "https://github.com/jreyes/pgmq-rs", label: "github.com/jreyes/pgmq-rs" },
          },
          {
            id: "pr-2",
            hidden: false,
            name: "sloctl",
            description:
              "CLI + CI action for managing SLOs-as-code. Deployed internally at Stripe, now OSS.",
            date: "2021",
            keywords: ["Go", "SRE", "GitHub Actions"],
            url: { url: "", label: "" },
          },
        ],
      },
      interests: {
        name: "Interests",
        columns: 2,
        visible: true,
        items: [
          { id: "i-1", hidden: false, name: "Trail running", keywords: [] },
          { id: "i-2", hidden: false, name: "Analog photography", keywords: [] },
          { id: "i-3", hidden: false, name: "Homelab / Self-hosting", keywords: [] },
        ],
      },
      awards: {
        name: "Awards",
        columns: 1,
        visible: true,
        items: [
          {
            id: "a-1",
            hidden: false,
            title: "Stripe Founder's Award",
            awarder: "Stripe",
            date: "2021",
            description: "Recognized for technical leadership on the developer productivity platform.",
            url: { url: "", label: "" },
          },
        ],
      },
      certifications: {
        name: "Certifications",
        columns: 1,
        visible: true,
        items: [
          { id: "c-1", hidden: false, name: "AWS Certified Solutions Architect — Professional", issuer: "Amazon Web Services", date: "2023", description: "", url: { url: "", label: "" } },
          { id: "c-2", hidden: false, name: "CKA — Certified Kubernetes Administrator", issuer: "CNCF", date: "2022", description: "", url: { url: "", label: "" } },
        ],
      },
      publications: { name: "Publications", columns: 1, visible: false, items: [] },
      volunteer: {
        name: "Volunteer",
        columns: 1,
        visible: true,
        items: [
          {
            id: "v-1",
            hidden: false,
            organization: "Code2040",
            position: "Technical Mentor",
            location: "San Francisco, CA",
            date: "2019 — 2022",
            description: "Mentored 12 early-career Black and Latinx engineers through their first industry roles.",
            url: { url: "", label: "" },
          },
        ],
      },
      references: { name: "References", columns: 1, visible: false, items: [] },
    },
    customSections: [],
    metadata: {
      template: overrides?.template || "modern-minimal",
      layout: {
        sidebarWidth: 30,
        pages: [
          {
            fullWidth: false,
            main: ["experience", "projects", "education", "volunteer"],
            sidebar: ["skills", "certifications", "languages", "awards", "interests", "profiles"],
          },
        ],
      },
      css: { enabled: false, value: "" },
      page: { gapX: 20, gapY: 18, marginX: 58, marginY: 52, format: "letter", hideIcons: true },
      design: {
        colors: { primary: overrides?.primary || "#0A2540", text: "#111111", background: "#FFFFFF" },
        level: { type: "rectangle" },
      },
      typography: {
        body: { fontFamily: "Inter", fontWeight: 400, fontSize: 11, lineHeight: 1.35 },
        heading: { fontFamily: "Inter", fontWeight: 600, fontSize: 22, lineHeight: 1.15 },
      },
      notes: "",
    },
  };
}
