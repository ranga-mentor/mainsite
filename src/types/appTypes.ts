export type Mode =
  | "home"
  | "workbook"
  | "id-tools"
  | "numbers"
  | "java"
  | "ai"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "contact"
  | "sitemap";

export type FeatureCard = {
  title: string;
  description: string;
  action: string;
  mode: Mode;
  image: string;
};

export type AiPosterSlide = {
  src: string;
  alt: string;
  caption: string;
};

export type SearchResult = {
  id: string;
  label: string;
  hint: string;
  mode: Mode;
  numbersMode?: "4d" | "toto";
  idCountryMode?: "sg" | "my" | "hk";
  toolsPage?: "id" | "json" | "sql";
  javaPage?: "core" | "junit" | "spring-boot" | "releases";
  trackIndex?: number;
  lessonIndex?: number;
  keywords?: string[];
};

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
};

export type ParsedRoute = {
  mode: Mode;
  numbersMode?: "4d" | "toto";
  idCountryMode?: "sg" | "my" | "hk";
  toolsPage?: "id" | "json" | "sql";
  javaPage?: "core" | "junit" | "spring-boot" | "releases";
  aiStudioPage?: "visuals" | "heartfulness";
  trackIndex?: number;
  lessonIndex?: number;
};
