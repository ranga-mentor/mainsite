import type { AiPosterSlide, FeatureCard, Mode, SeoMeta } from "../types/appTypes";

export const featureCards: FeatureCard[] = [
  {
    title: "Dev Notes",
    description: "Practical day-to-day engineering notes with guided steps and quick checks.",
    action: "Open Dev Notes",
    mode: "workbook",
    image: "/workbook-tracks.jpg",
  },
  {
    title: "Tools",
    description: "Validate IDs, work with JSON payloads, and check SQL syntax in one place.",
    action: "Open Tools",
    mode: "id-tools",
    image: "/id-tools-neon-theme.svg",
  },
  {
    title: "🇸🇬 Singapore Lottery",
    description: "Use probability-driven predictors for Singapore 4D and Toto as one toolkit.",
    action: "Open Singapore Lottery",
    mode: "numbers",
    image: "/number-lab-lottery.svg",
  },
  {
    title: "Java Feature Explorer",
    description: "Review practical updates from Java 11 through Java 21 in a single release map.",
    action: "Open Java",
    mode: "java",
    image: "/java-feature-explorer.jpg",
  },
  {
    title: "AI Tools & Studio",
    description: "Hands-on AI playbook with visual explainers, useful tools, and practical use cases.",
    action: "Open AI Studio",
    mode: "ai",
    image: "/ai-studio.jpg",
  },
];

export const aiPosterSlides: AiPosterSlide[] = [
  {
    src: "/AIinnutshell.jpg",
    alt: "What is AI quick visual guide with simple definition, examples, business use, and AI versus ML",
    caption: "AI basics poster: sense, think, act, examples, and AI vs ML.",
  },
  {
    src: "/MLHF.jpg",
    alt: "What is ML visual guide explaining machine learning basics, workflow, real-life examples, and learning types",
    caption: "ML basics poster: how ML works, real-life usage, and learning types.",
  },
  {
    src: "/GenAI.jpg",
    alt: "What is Generative AI visual guide covering what it is, how it works, capabilities, and practical examples",
    caption: "Generative AI poster: concept, workflow, and what GenAI can create.",
  },
  {
    src: "/LLM.jpg",
    alt: "What are LLMs visual guide covering what large language models are, how they work, uses, and examples",
    caption: "LLM poster: what LLMs are, how they work, and common use cases.",
  },
  {
    src: "/RAG.jpg",
    alt: "What is RAG visual guide explaining retrieval-augmented generation and how search plus generation improves answers",
    caption: "RAG poster: retrieval + generation workflow for more reliable AI answers.",
  },
];

export const seoByMode: Record<Mode, SeoMeta> = {
  home: {
    title: "Learning Lab | AI, Java, Tools, and Singapore Lottery",
    description:
      "Learning Lab with AI Studio, Java feature explorer, practical tools, and Singapore number lab for 4D and Toto learning workflows.",
    path: "/",
  },
  workbook: {
    title: "Dev Notes | Learning Lab",
    description: "Structured workbook tracks and guided lessons with practice and quick checks.",
    path: "/dev-notes",
  },
  "id-tools": {
    title: "Tools | Learning Lab",
    description:
      "Use ID, JSON, and SQL tools for practical validation, formatting, generation, and syntax-check workflows.",
    path: "/tools/id/sg",
  },
  numbers: {
    title: "Singapore Lottery | Learning Lab",
    description:
      "Explore Singapore 4D and Toto analysis tools with historical, probability-based educational views.",
    path: "/number-lab",
  },
  java: {
    title: "Java Learning | Learning Lab",
    description: "Java 11 to Java 21 feature explorer with practical release-by-release highlights.",
    path: "/java",
  },
  ai: {
    title: "AI Studio | Learning Lab",
    description:
      "AI Studio with flipbook guides, prompt workflows, and practical AI tool usage patterns.",
    path: "/ai-studio",
  },
  privacy: {
    title: "Privacy Policy | Learning Lab",
    description: "Privacy practices, analytics usage, and data handling policy for Learning Lab.",
    path: "/privacy-policy",
  },
  terms: {
    title: "Terms of Use | Learning Lab",
    description: "Terms governing usage of Learning Lab educational content and tools.",
    path: "/terms-of-use",
  },
  disclaimer: {
    title: "Disclaimer | Learning Lab",
    description:
      "Educational disclaimer for AI, Java, ID, and number-analysis content and tools on Learning Lab.",
    path: "/disclaimer",
  },
  contact: {
    title: "Contact | Learning Lab",
    description: "Contact Learning Lab for feedback, collaboration, and support.",
    path: "/contact",
  },
  sitemap: {
    title: "Site Map | Learning Lab",
    description: "Browse all key Learning Lab pages and direct links in one place.",
    path: "/sitemap",
  },
};
