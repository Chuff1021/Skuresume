import type { ComponentType } from "react";
import type { ResumeData } from "@/types/resume";
import { OnyxTemplate } from "./onyx";
import { DittoTemplate } from "./ditto";
import { GengarTemplate } from "./gengar";
import { PikachuTemplate } from "./pikachu";
import { BronzorTemplate } from "./bronzor";

export interface TemplateProps {
  data: ResumeData;
}

export const templates: Record<string, { name: string; component: ComponentType<TemplateProps> }> = {
  onyx: { name: "Onyx", component: OnyxTemplate },
  ditto: { name: "Ditto", component: DittoTemplate },
  gengar: { name: "Gengar", component: GengarTemplate },
  pikachu: { name: "Pikachu", component: PikachuTemplate },
  bronzor: { name: "Bronzor", component: BronzorTemplate },
};

export function getTemplate(name: string): ComponentType<TemplateProps> {
  return templates[name]?.component || OnyxTemplate;
}

export const templateList = Object.entries(templates).map(([id, t]) => ({
  id,
  name: t.name,
}));
