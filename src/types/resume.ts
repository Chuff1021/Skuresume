// Resume data types — plain TypeScript interfaces
// Validation is handled at API boundaries, not in the type system

export interface Url {
  url: string;
  label: string;
}

export interface CustomField {
  id: string;
  icon: string;
  name: string;
  value: string;
}

export interface Picture {
  url: string;
  size: number;
  aspectRatio: number;
  borderRadius: number;
  effects: {
    hidden: boolean;
    border: boolean;
    grayscale: boolean;
  };
}

export interface Basics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  url: Url;
  customFields: CustomField[];
}

// === SECTION ITEMS ===

interface BaseItem {
  id: string;
  hidden: boolean;
}

export interface ProfileItem extends BaseItem {
  network: string;
  username: string;
  icon: string;
  url: Url;
}

export interface ExperienceItem extends BaseItem {
  company: string;
  position: string;
  location: string;
  date: string;
  description: string;
  url: Url;
}

export interface EducationItem extends BaseItem {
  institution: string;
  studyType: string;
  area: string;
  score: string;
  date: string;
  description: string;
  url: Url;
}

export interface SkillItem extends BaseItem {
  name: string;
  description: string;
  level: number;
  keywords: string[];
}

export interface LanguageItem extends BaseItem {
  name: string;
  description: string;
  level: number;
}

export interface ProjectItem extends BaseItem {
  name: string;
  description: string;
  date: string;
  keywords: string[];
  url: Url;
}

export interface AwardItem extends BaseItem {
  title: string;
  awarder: string;
  date: string;
  description: string;
  url: Url;
}

export interface CertificationItem extends BaseItem {
  name: string;
  issuer: string;
  date: string;
  description: string;
  url: Url;
}

export interface PublicationItem extends BaseItem {
  name: string;
  publisher: string;
  date: string;
  description: string;
  url: Url;
}

export interface VolunteerItem extends BaseItem {
  organization: string;
  position: string;
  location: string;
  date: string;
  description: string;
  url: Url;
}

export interface InterestItem extends BaseItem {
  name: string;
  keywords: string[];
}

export interface ReferenceItem extends BaseItem {
  name: string;
  description: string;
  summary: string;
  url: Url;
}

export interface CustomSectionItem extends BaseItem {
  name: string;
  description: string;
  date: string;
  location: string;
  keywords: string[];
  url: Url;
}

// === SECTIONS ===

export interface Section<T> {
  name: string;
  columns: number;
  visible: boolean;
  items: T[];
}

export interface CustomSection {
  id: string;
  name: string;
  columns: number;
  visible: boolean;
  items: CustomSectionItem[];
}

// === METADATA ===

export interface PageLayout {
  fullWidth: boolean;
  main: string[];
  sidebar: string[];
}

export interface Metadata {
  template: string;
  layout: {
    sidebarWidth: number;
    pages: PageLayout[];
  };
  css: {
    enabled: boolean;
    value: string;
  };
  page: {
    gapX: number;
    gapY: number;
    marginX: number;
    marginY: number;
    format: "a4" | "letter";
    hideIcons: boolean;
  };
  design: {
    colors: {
      primary: string;
      text: string;
      background: string;
    };
    level: {
      type: "hidden" | "circle" | "square" | "rectangle" | "progress-bar" | "icon";
    };
  };
  typography: {
    body: {
      fontFamily: string;
      fontWeight: number;
      fontSize: number;
      lineHeight: number;
    };
    heading: {
      fontFamily: string;
      fontWeight: number;
      fontSize: number;
      lineHeight: number;
    };
  };
  notes: string;
}

// === ROOT RESUME DATA ===

export interface ResumeData {
  basics: Basics;
  picture: Picture;
  summary: string;
  sections: {
    profiles: Section<ProfileItem>;
    experience: Section<ExperienceItem>;
    education: Section<EducationItem>;
    skills: Section<SkillItem>;
    languages: Section<LanguageItem>;
    projects: Section<ProjectItem>;
    interests: Section<InterestItem>;
    awards: Section<AwardItem>;
    certifications: Section<CertificationItem>;
    publications: Section<PublicationItem>;
    volunteer: Section<VolunteerItem>;
    references: Section<ReferenceItem>;
  };
  customSections: CustomSection[];
  metadata: Metadata;
}

export type SectionKey = keyof ResumeData["sections"];

export type SectionItem =
  | ProfileItem
  | ExperienceItem
  | EducationItem
  | SkillItem
  | LanguageItem
  | ProjectItem
  | AwardItem
  | CertificationItem
  | PublicationItem
  | VolunteerItem
  | InterestItem
  | ReferenceItem
  | CustomSectionItem;
