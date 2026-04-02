"use client";

import { BasicsSection } from "./sections/basics";
import { SummarySection } from "./sections/summary";
import { ExperienceSection } from "./sections/experience";
import { EducationSection } from "./sections/education";
import { SkillsSection } from "./sections/skills";

export function LeftSidebar() {
  return (
    <div className="h-full overflow-y-auto bg-surface-1">
      <div className="p-4 space-y-2">
        <BasicsSection />
        <SummarySection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
      </div>
    </div>
  );
}
