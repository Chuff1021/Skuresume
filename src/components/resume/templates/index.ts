import type { ComponentType } from "react";
import type { ResumeData } from "@/types/resume";
import { OnyxTemplate } from "./onyx";

export interface TemplateProps {
  data: ResumeData;
}

export const templates: Record<string, ComponentType<TemplateProps>> = {
  onyx: OnyxTemplate,
};

export function getTemplate(name: string): ComponentType<TemplateProps> {
  return templates[name] || OnyxTemplate;
}
