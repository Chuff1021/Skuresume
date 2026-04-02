import type { ComponentType } from "react";
import type { ResumeData } from "@/types/resume";
import { OnyxTemplate } from "./onyx";
import { DittoTemplate } from "./ditto";
import { GengarTemplate } from "./gengar";
import { PikachuTemplate } from "./pikachu";
import { BronzorTemplate } from "./bronzor";
import { AzurillTemplate } from "./azurill";
import { ChikoritaTemplate } from "./chikorita";
import { GlalieTemplate } from "./glalie";
import { KakunaTemplate } from "./kakuna";
import { RhyhornTemplate } from "./rhyhorn";
import { LeafishTemplate } from "./leafish";
import { LaprasTemplate } from "./lapras";
import { DitgarTemplate } from "./ditgar";

export interface TemplateProps {
  data: ResumeData;
}

export const templates: Record<string, { name: string; component: ComponentType<TemplateProps> }> = {
  onyx: { name: "Onyx", component: OnyxTemplate },
  ditto: { name: "Ditto", component: DittoTemplate },
  gengar: { name: "Gengar", component: GengarTemplate },
  pikachu: { name: "Pikachu", component: PikachuTemplate },
  bronzor: { name: "Bronzor", component: BronzorTemplate },
  azurill: { name: "Azurill", component: AzurillTemplate },
  chikorita: { name: "Chikorita", component: ChikoritaTemplate },
  glalie: { name: "Glalie", component: GlalieTemplate },
  kakuna: { name: "Kakuna", component: KakunaTemplate },
  rhyhorn: { name: "Rhyhorn", component: RhyhornTemplate },
  leafish: { name: "Leafish", component: LeafishTemplate },
  lapras: { name: "Lapras", component: LaprasTemplate },
  ditgar: { name: "Ditgar", component: DitgarTemplate },
};

export function getTemplate(name: string): ComponentType<TemplateProps> {
  return templates[name]?.component || OnyxTemplate;
}

export const templateList = Object.entries(templates).map(([id, t]) => ({
  id,
  name: t.name,
}));
