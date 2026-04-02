"use client";

import { BasicsSection } from "./sections/basics";
import { SummarySection } from "./sections/summary";
import { ProfilesSection } from "./sections/profiles";
import { ExperienceSection } from "./sections/experience";
import { EducationSection } from "./sections/education";
import { SkillsSection } from "./sections/skills";
import { ProjectsSection } from "./sections/projects";
import { LanguagesSection } from "./sections/languages";
import { InterestsSection } from "./sections/interests";
import { AwardsSection } from "./sections/awards";
import { CertificationsSection } from "./sections/certifications";
import { PublicationsSection } from "./sections/publications";
import { VolunteerSection } from "./sections/volunteer";
import { ReferencesSection } from "./sections/references";

export function LeftSidebar() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-4 space-y-2">
        <BasicsSection />
        <SummarySection />
        <ProfilesSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <VolunteerSection />
        <LanguagesSection />
        <InterestsSection />
        <AwardsSection />
        <CertificationsSection />
        <PublicationsSection />
        <ReferencesSection />
      </div>
    </div>
  );
}
