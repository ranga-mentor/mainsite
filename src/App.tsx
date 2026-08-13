import { useEffect, useMemo, useRef, useState } from "react";
import { CssBaseline, IconButton, ThemeProvider, createTheme } from "@mui/material";
import { trackEvent } from "./analytics";
import AiHeartfulnessToolsPage from "./components/AiHeartfulnessToolsPage";
import HomeSection from "./components/sections/HomeSection";
import LegalSection from "./components/sections/LegalSection";
import SiteMapSection from "./components/sections/SiteMapSection";
import WorkbookSection from "./components/sections/WorkbookSection";
import JavaFeaturesPage from "./components/JavaFeaturesPage";
import JsonTools from "./components/JsonTools";
import NricTools from "./components/NricTools";
import SingaporeTotoPage from "./components/SingaporeTotoPage";
import SqlTools from "./components/SqlTools";
import TotoPredictor from "./components/TotoPredictor";
import { aiPosterSlides, featureCards, seoByMode } from "./constants/appContent";
import { learningTracks } from "./data/learningContent";
import type { Mode, ParsedRoute, SearchResult, SeoMeta } from "./types/appTypes";
import "./App.css";

const SEO_BASE_URL = "https://pandutadaka.com";
const ADSTERRA_CONTAINER_ID = "container-0a036d967800ce753294879aa59b9f8d";
const ADSTERRA_SCRIPT_SRC =
  "https://pl28814063.effectivegatecpm.com/0a036d967800ce753294879aa59b9f8d/invoke.js";

function getTrackLessons(trackIdx: number) {
  return learningTracks[trackIdx].modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ moduleTitle: module.title, lesson })),
  );
}

function buildRoute(
  mode: Mode,
  numbersMode: "4d" | "toto",
  idCountryMode: "sg" | "my" | "hk",
  toolsPage: "id" | "json" | "sql",
  javaPage: "core" | "junit" | "spring-boot" | "releases",
  aiStudioPage: "visuals" | "heartfulness",
  trackIndex: number,
  lessonIndex: number,
): string {
  if (mode === "workbook") {
    const safeTrackIndex = Math.max(0, Math.min(trackIndex, learningTracks.length - 1));
    const lessons = getTrackLessons(safeTrackIndex);
    const safeLessonIndex = Math.max(0, Math.min(lessonIndex, lessons.length - 1));
    const params = new URLSearchParams({
      track: learningTracks[safeTrackIndex].id,
      lesson: lessons[safeLessonIndex].lesson.id,
    });
    return `/dev-notes?${params.toString()}`;
  }
  if (mode === "id-tools") {
    if (toolsPage === "json") {
      return "/tools/json";
    }
    if (toolsPage === "sql") {
      return "/tools/sql";
    }
    return `/tools/id/${idCountryMode}`;
  }
  if (mode === "numbers") {
    return `/number-lab/${numbersMode}`;
  }
  if (mode === "ai") {
    return aiStudioPage === "heartfulness" ? "/ai-studio/tools" : "/ai-studio/visuals";
  }
  if (mode === "java") {
    return `/java/${javaPage}`;
  }
  return seoByMode[mode].path;
}

function parseRoute(pathname: string, search: string): ParsedRoute {
  if (pathname === "/dev-notes") {
    const params = new URLSearchParams(search);
    const requestedTrack = params.get("track");
    const trackIndex = Math.max(
      0,
      learningTracks.findIndex((track) => track.id === requestedTrack),
    );
    const lessons = getTrackLessons(trackIndex);
    const requestedLesson = params.get("lesson");
    const lessonIndex = Math.max(
      0,
      lessons.findIndex((entry) => entry.lesson.id === requestedLesson),
    );
    return { mode: "workbook", trackIndex, lessonIndex };
  }
  if (pathname === "/tools/json") {
    return { mode: "id-tools", toolsPage: "json" };
  }
  if (pathname === "/tools/sql") {
    return { mode: "id-tools", toolsPage: "sql" };
  }
  if (pathname === "/tools/id/hk" || pathname === "/id-tools/hk") {
    return { mode: "id-tools", toolsPage: "id", idCountryMode: "hk" };
  }
  if (pathname === "/tools/id/my" || pathname === "/id-tools/my") {
    return { mode: "id-tools", toolsPage: "id", idCountryMode: "my" };
  }
  if (pathname === "/tools/id/sg" || pathname === "/tools/id" || pathname === "/tools" || pathname === "/id-tools/sg" || pathname === "/id-tools") {
    return { mode: "id-tools", toolsPage: "id", idCountryMode: "sg" };
  }
  if (pathname === "/number-lab/toto") {
    return { mode: "numbers", numbersMode: "toto" };
  }
  if (pathname === "/number-lab/4d" || pathname === "/number-lab") {
    return { mode: "numbers", numbersMode: "4d" };
  }
  if (pathname === "/java/releases") {
    return { mode: "java", javaPage: "releases" };
  }
  if (pathname === "/java/spring-boot") {
    return { mode: "java", javaPage: "spring-boot" };
  }
  if (pathname === "/java/junit") {
    return { mode: "java", javaPage: "junit" };
  }
  if (pathname === "/java/core" || pathname === "/java") {
    return { mode: "java", javaPage: "core" };
  }
  if (pathname === "/ai-studio/tools") {
    return { mode: "ai", aiStudioPage: "heartfulness" };
  }
  if (pathname === "/ai-studio/visuals" || pathname === "/ai-studio") {
    return { mode: "ai", aiStudioPage: "visuals" };
  }
  if (pathname === "/privacy-policy") {
    return { mode: "privacy" };
  }
  if (pathname === "/terms-of-use") {
    return { mode: "terms" };
  }
  if (pathname === "/disclaimer") {
    return { mode: "disclaimer" };
  }
  if (pathname === "/contact") {
    return { mode: "contact" };
  }
  if (pathname === "/sitemap") {
    return { mode: "sitemap" };
  }
  return { mode: "home" };
}

function getSeoMeta(
  mode: Mode,
  numbersMode: "4d" | "toto",
  idCountryMode: "sg" | "my" | "hk",
  toolsPage: "id" | "json" | "sql",
  javaPage: "core" | "junit" | "spring-boot" | "releases",
  aiStudioPage: "visuals" | "heartfulness",
  activeTrackTitle: string,
  activeLessonTitle: string,
): Pick<SeoMeta, "title" | "description"> {
  if (mode === "id-tools" && toolsPage === "json") {
    return {
      title: "Json Tools | Learning Lab",
      description: "Validate, format, minify, and copy JSON payloads in Learning Lab.",
    };
  }
  if (mode === "id-tools" && toolsPage === "sql") {
    return {
      title: "SQL Syntax Checker | Learning Lab",
      description: "Check common PostgreSQL and MSSQL syntax issues with line and column feedback.",
    };
  }
  if (mode === "id-tools" && idCountryMode === "sg") {
    return {
      title: "Singapore NRIC/FIN Tools | Learning Lab",
      description: "Validate and generate Singapore NRIC/FIN format examples for educational use.",
    };
  }
  if (mode === "id-tools" && idCountryMode === "my") {
    return {
      title: "Malaysia MyKad Tools | Learning Lab",
      description: "Validate and generate Malaysia MyKad format examples for educational use.",
    };
  }
  if (mode === "id-tools" && idCountryMode === "hk") {
    return {
      title: "Hong Kong HKID Tools | Learning Lab",
      description: "Validate and generate Hong Kong HKID format examples for educational use.",
    };
  }
  if (mode === "numbers" && numbersMode === "4d") {
    return {
      title: "Singapore 4D Predictor | Learning Lab",
      description:
        "Educational Singapore 4D predictor page with probability-driven picks and data-source references.",
    };
  }
  if (mode === "numbers" && numbersMode === "toto") {
    return {
      title: "Singapore Toto Predictor | Learning Lab",
      description:
        "Educational Singapore Toto analyzer with history-based generated sets and weighted number insights.",
    };
  }
  if (mode === "java" && javaPage === "core") {
    return {
      title: "Core Java Essentials | Learning Lab",
      description: "Core Java fundamentals and daily coding essentials for practical development.",
    };
  }
  if (mode === "java" && javaPage === "junit") {
    return {
      title: "JUnit 5 Guide | Learning Lab",
      description: "JUnit 5 basics, assertions, lifecycle annotations, and practical testing workflow.",
    };
  }
  if (mode === "java" && javaPage === "spring-boot") {
    return {
      title: "Spring Boot Guide | Learning Lab",
      description: "Spring Boot essentials for REST APIs, configuration, data access, testing, and deployment.",
    };
  }
  if (mode === "java" && javaPage === "releases") {
    return {
      title: "Java Features | Learning Lab",
      description: "Release-wise Java feature highlights from Java 11 through Java 25.",
    };
  }
  if (mode === "ai" && aiStudioPage === "heartfulness") {
    return {
      title: "AI Tools | Learning Lab",
      description:
        "Useful AI tools and use cases for research, writing, automation, video, and productivity workflows.",
    };
  }
  if (mode === "workbook") {
    return {
      title: `${activeLessonTitle} | ${activeTrackTitle} | Learning Lab`,
      description: `Dev Notes lesson: ${activeLessonTitle} in ${activeTrackTitle}.`,
    };
  }
  return {
    title: seoByMode[mode].title,
    description: seoByMode[mode].description,
  };
}

function GitZonesDiagram() {
  return (
    <figure className="zone-figure git-poster-figure" aria-label="Daily Git commands visual guide">
      <img
        src="/GIT.jpg"
        alt="Daily Git commands visual guide for busy developers"
        width={1024}
        height={1536}
      />
      <figcaption>Daily Git commands quick guide</figcaption>
    </figure>
  );
}

function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [numbersMode, setNumbersMode] = useState<"4d" | "toto">("4d");
  const [idCountryMode, setIdCountryMode] = useState<"sg" | "my" | "hk">("sg");
  const [toolsPage, setToolsPage] = useState<"id" | "json" | "sql">("id");
  const [javaPage, setJavaPage] = useState<"core" | "junit" | "spring-boot" | "releases">("core");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });
  const [trackIndex, setTrackIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [aiStudioPage, setAiStudioPage] = useState<"visuals" | "heartfulness">("visuals");
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const aiCarouselRef = useRef<HTMLDivElement | null>(null);
  const [aiSlideIndex, setAiSlideIndex] = useState(0);
  const [aiFlipDirection, setAiFlipDirection] = useState<"next" | "prev" | null>(null);
  const [aiFullscreenOpen, setAiFullscreenOpen] = useState(false);
  const flipResetTimerRef = useRef<number | null>(null);
  const aiNavLockTimerRef = useRef<number | null>(null);
  const aiNavLockedRef = useRef(false);
  const aiProgrammaticScrollRef = useRef(false);
  const aiProgrammaticScrollTimerRef = useRef<number | null>(null);
  const skipHistoryPushRef = useRef(false);
  const hasInitializedRouteRef = useRef(false);

  const activeTrack = learningTracks[trackIndex];
  const flatLessons = useMemo(
    () =>
      activeTrack.modules.flatMap((module) =>
        module.lessons.map((lesson) => ({ moduleTitle: module.title, lesson })),
      ),
    [activeTrack],
  );
  const activeLesson = flatLessons[lessonIndex];
  const searchItems = useMemo(() => {
    const items: SearchResult[] = [
      {
        id: "home",
        label: "Learning Lab",
        hint: "Home page",
        mode: "home",
        keywords: ["home", "dashboard"],
      },
      {
        id: "dev-notes",
        label: "Dev Notes",
        hint: "Workbook track navigation",
        mode: "workbook",
        keywords: ["dev notes", "workbook", "tracks"],
      },
      {
        id: "id-tools",
        label: "Tools",
        hint: "ID tools and JSON tools",
        mode: "id-tools",
        toolsPage: "id",
        keywords: ["tools", "nric", "mykad", "hkid", "json", "validator", "generator"],
      },
      {
        id: "json-tools",
        label: "Json Tools",
        hint: "Validate, format, and minify JSON",
        mode: "id-tools",
        toolsPage: "json",
        keywords: ["json", "formatter", "minifier", "validator"],
      },
      {
        id: "sql-tools",
        label: "SQL Syntax Checker",
        hint: "PostgreSQL and MSSQL syntax checks",
        mode: "id-tools",
        toolsPage: "sql",
        keywords: ["sql", "postgres", "postgresql", "mssql", "syntax", "checker"],
      },
      {
        id: "id-tools-sg",
        label: "Singapore NRIC/FIN",
        hint: "ID tools - Singapore",
        mode: "id-tools",
        toolsPage: "id",
        idCountryMode: "sg",
        keywords: ["singapore", "nric", "fin"],
      },
      {
        id: "id-tools-my",
        label: "Malaysia MyKad",
        hint: "ID tools - Malaysia",
        mode: "id-tools",
        toolsPage: "id",
        idCountryMode: "my",
        keywords: ["malaysia", "mykad"],
      },
      {
        id: "id-tools-hk",
        label: "Hong Kong HKID",
        hint: "ID tools - Hong Kong",
        mode: "id-tools",
        toolsPage: "id",
        idCountryMode: "hk",
        keywords: ["hong kong", "hkid"],
      },
      {
        id: "numbers-4d",
        label: "4D Predictor",
        hint: "Singapore 4D probability picks",
        mode: "numbers",
        numbersMode: "4d",
        keywords: ["4d", "lottery", "predictor"],
      },
      {
        id: "numbers-toto",
        label: "Toto Predictor",
        hint: "Singapore Toto history-based picks",
        mode: "numbers",
        numbersMode: "toto",
        keywords: ["toto", "lottery", "jackpot"],
      },
      {
        id: "singapore-lottery",
        label: "Singapore Lottery",
        hint: "Singapore 4D and Toto tools",
        mode: "numbers",
        keywords: ["singapore lottery", "4d", "toto", "number lab"],
      },
      {
        id: "java",
        label: "Java Feature Explorer",
        hint: "Core Java, features, JUnit, Spring Boot",
        mode: "java",
        keywords: ["java", "jdk", "features"],
      },
      {
        id: "java-core",
        label: "Core Java",
        hint: "Java fundamentals and daily coding essentials",
        mode: "java",
        javaPage: "core",
        keywords: ["core java", "oop", "collections", "streams"],
      },
      {
        id: "java-junit",
        label: "JUnit 5",
        hint: "Unit testing guide for Java",
        mode: "java",
        javaPage: "junit",
        keywords: ["junit", "unit tests", "assertions", "testing"],
      },
      {
        id: "java-spring-boot",
        label: "Spring Boot",
        hint: "Build Java backend services quickly",
        mode: "java",
        javaPage: "spring-boot",
        keywords: ["spring boot", "rest api", "spring data", "actuator"],
      },
      {
        id: "java-releases",
        label: "Java Features",
        hint: "Java 11 to 25 highlights",
        mode: "java",
        javaPage: "releases",
        keywords: ["java 11", "java 17", "java 21", "java 25", "release notes"],
      },
      {
        id: "ai",
        label: "AI Studio",
        hint: "Prompting, AI workflows, and Heartfulness tools",
        mode: "ai",
        keywords: ["ai", "prompt", "llm", "assistant", "heartfulness", "notebooklm", "perplexity", "gemini"],
      },
      {
        id: "privacy",
        label: "Privacy Policy",
        hint: "Data handling and analytics",
        mode: "privacy",
        keywords: ["privacy", "data", "cookie", "analytics"],
      },
      {
        id: "terms",
        label: "Terms of Use",
        hint: "Usage terms and conditions",
        mode: "terms",
        keywords: ["terms", "conditions", "usage"],
      },
      {
        id: "disclaimer",
        label: "Disclaimer",
        hint: "Educational and legal disclaimer",
        mode: "disclaimer",
        keywords: ["disclaimer", "legal", "educational", "responsibility"],
      },
      {
        id: "contact",
        label: "Contact",
        hint: "Reach out for support",
        mode: "contact",
        keywords: ["contact", "support", "feedback"],
      },
      {
        id: "sitemap",
        label: "Site Map",
        hint: "All major page links",
        mode: "sitemap",
        keywords: ["sitemap", "site map", "pages", "links"],
      },
    ];

    learningTracks.forEach((track, tIndex) => {
      items.push({
        id: `track-${track.id}`,
        label: track.title,
        hint: "Workbook track",
        mode: "workbook",
        trackIndex: tIndex,
        lessonIndex: 0,
        keywords: [track.subtitle],
      });

      const lessons = track.modules.flatMap((module) =>
        module.lessons.map((lesson) => ({ moduleTitle: module.title, lesson })),
      );

      lessons.forEach((entry, index) => {
        items.push({
          id: `lesson-${track.id}-${entry.lesson.id}`,
          label: entry.lesson.title,
          hint: `${track.title} • ${entry.moduleTitle}`,
          mode: "workbook",
          trackIndex: tIndex,
          lessonIndex: index,
          keywords: [entry.lesson.objective],
        });
      });
    });

    return items;
  }, []);

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }
    return searchItems
      .filter((item) => {
        const haystack = `${item.label} ${item.hint} ${(item.keywords ?? []).join(" ")}`.toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 8);
  }, [searchItems, searchQuery]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: { main: themeMode === "light" ? "#0056d2" : "#8cb5ff" },
          secondary: { main: themeMode === "light" ? "#0a8f5b" : "#4fd69f" },
          background: {
            default: themeMode === "light" ? "#f5f7fa" : "#0f1728",
            paper: themeMode === "light" ? "#ffffff" : "#17233a",
          },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: '"Lato", "Noto Sans", "Segoe UI", sans-serif',
        },
      }),
    [themeMode],
  );

  useEffect(() => {
    function applyRoute() {
      const parsed = parseRoute(window.location.pathname, window.location.search);
      skipHistoryPushRef.current = true;
      setMode(parsed.mode);
      if (parsed.numbersMode) {
        setNumbersMode(parsed.numbersMode);
      }
      if (parsed.idCountryMode) {
        setIdCountryMode(parsed.idCountryMode);
      }
      if (parsed.toolsPage) {
        setToolsPage(parsed.toolsPage);
      }
      if (parsed.javaPage) {
        setJavaPage(parsed.javaPage);
      }
      if (parsed.aiStudioPage) {
        setAiStudioPage(parsed.aiStudioPage);
      }
      if (typeof parsed.trackIndex === "number") {
        setTrackIndex(parsed.trackIndex);
      }
      if (typeof parsed.lessonIndex === "number") {
        setLessonIndex(parsed.lessonIndex);
      }
    }

    applyRoute();
    hasInitializedRouteRef.current = true;
    window.addEventListener("popstate", applyRoute);
    return () => {
      window.removeEventListener("popstate", applyRoute);
    };
  }, []);

  useEffect(() => {
    if (!hasInitializedRouteRef.current) {
      return;
    }
    if (skipHistoryPushRef.current) {
      skipHistoryPushRef.current = false;
      return;
    }
    const nextRoute = buildRoute(mode, numbersMode, idCountryMode, toolsPage, javaPage, aiStudioPage, trackIndex, lessonIndex);
    const currentRoute = `${window.location.pathname}${window.location.search}`;
    if (nextRoute !== currentRoute) {
      window.history.pushState({}, "", nextRoute);
    }
  }, [mode, numbersMode, idCountryMode, toolsPage, javaPage, aiStudioPage, trackIndex, lessonIndex]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    window.localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    const scriptId = "adsterra-invoke-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = ADSTERRA_SCRIPT_SRC;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const routePath = buildRoute(mode, numbersMode, idCountryMode, toolsPage, javaPage, aiStudioPage, trackIndex, lessonIndex);
    const canonical = `${SEO_BASE_URL}${routePath}`;
    const seo = getSeoMeta(
      mode,
      numbersMode,
      idCountryMode,
      toolsPage,
      javaPage,
      aiStudioPage,
      activeTrack.title,
      activeLesson.lesson.title,
    );
    document.title = seo.title;

    function upsertMeta(
      selector: string,
      attributeName: "name" | "property",
      attributeValue: string,
      content: string,
    ) {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.content = content;
    }

    upsertMeta('meta[name="description"]', "name", "description", seo.description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    let structuredData = document.head.querySelector(
      'script[data-seo="learninglab"]',
    ) as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.seo = "learninglab";
      document.head.appendChild(structuredData);
    }
    structuredData.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Learning Lab",
      url: SEO_BASE_URL,
      description: seo.description,
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: "Learning Lab",
      },
    });
  }, [mode, numbersMode, idCountryMode, toolsPage, javaPage, aiStudioPage, trackIndex, lessonIndex, activeTrack.title, activeLesson.lesson.title]);

  useEffect(() => {
    if (mode !== "workbook" || !activeLesson) {
      return;
    }
    trackEvent("lesson_view", {
      track: activeTrack.id,
      lesson: activeLesson.lesson.id,
      module: activeLesson.moduleTitle,
    });
  }, [activeLesson, activeTrack.id, mode]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!searchBoxRef.current) {
        return;
      }
      if (!searchBoxRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function openSearchResult(item: SearchResult) {
    setMode(item.mode);
    if (item.mode === "numbers" && item.numbersMode) {
      setNumbersMode(item.numbersMode);
    }
    if (item.mode === "id-tools" && item.idCountryMode) {
      setIdCountryMode(item.idCountryMode);
    }
    if (item.mode === "id-tools" && item.toolsPage) {
      setToolsPage(item.toolsPage);
    }
    if (item.mode === "java" && item.javaPage) {
      setJavaPage(item.javaPage);
    }
    if (item.mode === "workbook") {
      if (typeof item.trackIndex === "number") {
        setTrackIndex(item.trackIndex);
      }
      if (typeof item.lessonIndex === "number") {
        setLessonIndex(item.lessonIndex);
      }
    }
    setSearchQuery("");
    setSearchOpen(false);
  }

  function scrollToAiSlide(nextIndex: number, smooth = true) {
    const viewport = aiCarouselRef.current;
    const clampedIndex = Math.max(0, Math.min(nextIndex, aiPosterSlides.length - 1));
    const direction = clampedIndex > aiSlideIndex ? "next" : clampedIndex < aiSlideIndex ? "prev" : null;
    if (direction && !aiFullscreenOpen) {
      setAiFlipDirection(direction);
      if (flipResetTimerRef.current) {
        window.clearTimeout(flipResetTimerRef.current);
      }
      flipResetTimerRef.current = window.setTimeout(() => {
        setAiFlipDirection(null);
        flipResetTimerRef.current = null;
      }, 420);
    }
    if (aiFullscreenOpen) {
      if (aiNavLockedRef.current) {
        return;
      }
      aiNavLockedRef.current = true;
      if (aiNavLockTimerRef.current) {
        window.clearTimeout(aiNavLockTimerRef.current);
      }
      aiNavLockTimerRef.current = window.setTimeout(() => {
        aiNavLockedRef.current = false;
        aiNavLockTimerRef.current = null;
      }, 420);
      setAiSlideIndex(clampedIndex);
      return;
    }
    if (!viewport) {
      aiNavLockedRef.current = false;
      return;
    }
    aiProgrammaticScrollRef.current = true;
    if (aiProgrammaticScrollTimerRef.current) {
      window.clearTimeout(aiProgrammaticScrollTimerRef.current);
    }
    aiProgrammaticScrollTimerRef.current = window.setTimeout(() => {
      aiProgrammaticScrollRef.current = false;
      aiProgrammaticScrollTimerRef.current = null;
    }, smooth ? 460 : 80);
    const left = clampedIndex * viewport.clientWidth;
    viewport.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    setAiSlideIndex(clampedIndex);
  }

  useEffect(() => {
    if (mode !== "ai") {
      return;
    }
    setAiSlideIndex(0);
    setAiStudioPage("visuals");
    requestAnimationFrame(() => {
      scrollToAiSlide(0, false);
    });
  }, [mode]);

  useEffect(() => {
    if (mode !== "ai" || aiFullscreenOpen) {
      return;
    }
    const viewport = aiCarouselRef.current;
    if (!viewport) {
      return;
    }
    const left = aiSlideIndex * viewport.clientWidth;
    aiProgrammaticScrollRef.current = true;
    if (aiProgrammaticScrollTimerRef.current) {
      window.clearTimeout(aiProgrammaticScrollTimerRef.current);
    }
    aiProgrammaticScrollTimerRef.current = window.setTimeout(() => {
      aiProgrammaticScrollRef.current = false;
      aiProgrammaticScrollTimerRef.current = null;
    }, 80);
    viewport.scrollTo({ left, behavior: "auto" });
  }, [aiFullscreenOpen, mode]);

  useEffect(() => {
    return () => {
      if (flipResetTimerRef.current) {
        window.clearTimeout(flipResetTimerRef.current);
      }
      if (aiNavLockTimerRef.current) {
        window.clearTimeout(aiNavLockTimerRef.current);
      }
      if (aiProgrammaticScrollTimerRef.current) {
        window.clearTimeout(aiProgrammaticScrollTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!aiFullscreenOpen) {
      return;
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAiFullscreenOpen(false);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToAiSlide(aiSlideIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToAiSlide(aiSlideIndex + 1);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [aiFullscreenOpen, aiSlideIndex]);

  if (!activeLesson) {
    return <main className="ca-shell">No lessons available.</main>;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <main className="ca-shell">
        <header className="ca-header">
          <button
            className={`ca-brand ca-brand-link ${mode === "home" ? "is-active" : ""}`}
            onClick={() => setMode("home")}
            type="button"
            aria-label="Go to Learning Lab"
          >
            <span className="ca-brand-dot" />
            <strong>Learning Lab</strong>
          </button>
          <nav className="ca-nav" aria-label="Primary sections">
            <button className={mode === "workbook" ? "is-active" : ""} onClick={() => setMode("workbook")} type="button">
              Dev Notes
            </button>
            <button className={mode === "ai" ? "is-active" : ""} onClick={() => setMode("ai")} type="button">
              <span className="ai-icon" aria-hidden="true">🤖</span> AI
            </button>
            <button className={mode === "id-tools" ? "is-active" : ""} onClick={() => setMode("id-tools")} type="button">
              Tools
            </button>
            <button className={mode === "numbers" ? "is-active" : ""} onClick={() => setMode("numbers")} type="button">
              <span className="sg-icon" aria-hidden="true">🇸🇬</span> Singapore Lottery
            </button>
            <button className={mode === "java" ? "is-active" : ""} onClick={() => setMode("java")} type="button">
              <span className="java-icon" aria-hidden="true">☕</span> Java
            </button>
          </nav>
          <div className="ca-header-actions">
            <div className="ca-search-box" ref={searchBoxRef}>
              <input
                className="ca-search"
                type="search"
                placeholder="Search courses or tools"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    if (filteredSearchItems[0]) {
                      openSearchResult(filteredSearchItems[0]);
                    }
                  }
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
              />
              {searchOpen && searchQuery.trim() && (
                <div className="ca-search-dropdown" role="listbox" aria-label="Search results">
                  {filteredSearchItems.length > 0 ? (
                    filteredSearchItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="ca-search-result"
                        onClick={() => openSearchResult(item)}
                      >
                        <strong>{item.label}</strong>
                        <span>{item.hint}</span>
                      </button>
                    ))
                  ) : (
                    <p className="ca-search-empty">No matching results</p>
                  )}
                </div>
              )}
            </div>
            <IconButton
              className={`theme-toggle ${themeMode === "dark" ? "is-dark" : ""}`}
              onClick={() =>
                setThemeMode((current) => (current === "light" ? "dark" : "light"))
              }
              aria-label={themeMode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <span aria-hidden="true" className="theme-toggle-icon sun">☀</span>
              <span aria-hidden="true" className="theme-toggle-thumb" />
              <span aria-hidden="true" className="theme-toggle-icon moon">☾</span>
            </IconButton>
          </div>
          <p className="ca-header-note">
            This site is a personal learning notebook, curated to organize and revisit practical concepts.
          </p>
        </header>

        {mode === "home" && <HomeSection cards={featureCards} onOpenMode={setMode} />}

        {mode === "workbook" && (
          <WorkbookSection
            tracks={learningTracks}
            activeTrack={activeTrack}
            flatLessons={flatLessons}
            lessonIndex={lessonIndex}
            activeLesson={activeLesson}
            onTrackChange={(index) => {
              setTrackIndex(index);
              setLessonIndex(0);
            }}
            onLessonChange={setLessonIndex}
            gitVisual={<GitZonesDiagram />}
          />
        )}

        {mode === "id-tools" && (
          <section className="workspace-shell">
            <div className="workspace-head">
              <h2>Tools</h2>
            </div>
            <section className="country-switcher" aria-label="Tool categories">
              <button
                className={toolsPage === "id" ? "is-active" : ""}
                onClick={() => setToolsPage("id")}
                type="button"
              >
                ID Tools
              </button>
              <button
                className={toolsPage === "json" ? "is-active" : ""}
                onClick={() => setToolsPage("json")}
                type="button"
              >
                Json Tools
              </button>
              <button
                className={toolsPage === "sql" ? "is-active" : ""}
                onClick={() => setToolsPage("sql")}
                type="button"
              >
                SQL Tools
              </button>
            </section>
            {toolsPage === "id" && <NricTools countryPage={idCountryMode} onCountryPageChange={setIdCountryMode} />}
            {toolsPage === "json" && <JsonTools />}
            {toolsPage === "sql" && <SqlTools />}
          </section>
        )}

        {mode === "numbers" && (
          <section className="workspace-shell">
            <div className="workspace-head">
              <h2>Singapore Lottery</h2>
            </div>
            <section className="country-switcher">
              <button
                className={numbersMode === "4d" ? "is-active" : ""}
                onClick={() => setNumbersMode("4d")}
                type="button"
              >
                <span className="sg-icon" aria-hidden="true">🇸🇬</span> 4D Predictor
              </button>
              <button
                className={numbersMode === "toto" ? "is-active" : ""}
                onClick={() => setNumbersMode("toto")}
                type="button"
              >
                <span className="sg-icon" aria-hidden="true">🇸🇬</span> Toto Predictor
              </button>
            </section>
            {numbersMode === "4d" && <TotoPredictor />}
            {numbersMode === "toto" && <SingaporeTotoPage />}
            <article className="tool-card legal-note">
              <h3>Educational Disclaimer</h3>
              <p>
                Singapore Lottery predictions are educational demonstrations only and do not guarantee outcomes.
                Please use responsibly and follow local regulations.
              </p>
            </article>
          </section>
        )}

        {mode === "java" && (
          <section className="workspace-shell">
            <div className="workspace-head">
              <h2>Java Learning</h2>
            </div>
            <JavaFeaturesPage javaPage={javaPage} onJavaPageChange={setJavaPage} />
          </section>
        )}

        {mode === "ai" && (
          <section className="workspace-shell">
            <div className="workspace-head">
              <h2>AI Studio</h2>
            </div>
            <section className="country-switcher ai-page-switcher" aria-label="AI Studio pages">
              <button
                className={aiStudioPage === "visuals" ? "is-active" : ""}
                onClick={() => setAiStudioPage("visuals")}
                type="button"
              >
                Visual Flipbook
              </button>
              <button
                className={aiStudioPage === "heartfulness" ? "is-active" : ""}
                onClick={() => setAiStudioPage("heartfulness")}
                type="button"
              >
                AI Tools
              </button>
            </section>
            {aiStudioPage === "visuals" ? (
              <>
                <section className="ai-carousel" aria-label="AI visual pages">
                  <div className="ai-carousel-track">
                    <button
                      type="button"
                      className="ai-carousel-arrow"
                      onClick={() => scrollToAiSlide(aiSlideIndex - 1)}
                      disabled={aiSlideIndex === 0}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    <div
                      className={[
                        "ai-carousel-viewport",
                        aiFlipDirection === "next" ? "is-flipping-next" : "",
                        aiFlipDirection === "prev" ? "is-flipping-prev" : "",
                      ].filter(Boolean).join(" ")}
                      ref={aiCarouselRef}
                      onScroll={(event) => {
                        if (aiProgrammaticScrollRef.current) {
                          return;
                        }
                        const target = event.currentTarget;
                        if (!target.clientWidth) {
                          return;
                        }
                        const nextIndex = Math.round(target.scrollLeft / target.clientWidth);
                        if (nextIndex !== aiSlideIndex) {
                          setAiSlideIndex(nextIndex);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowLeft") {
                          event.preventDefault();
                          scrollToAiSlide(aiSlideIndex - 1);
                        }
                        if (event.key === "ArrowRight") {
                          event.preventDefault();
                          scrollToAiSlide(aiSlideIndex + 1);
                        }
                      }}
                      tabIndex={0}
                    >
                      {aiPosterSlides.map((slide) => (
                        <figure
                          className="ai-poster ai-slide"
                          key={slide.src}
                          onClick={() => setAiFullscreenOpen(true)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setAiFullscreenOpen(true);
                            }
                          }}
                          aria-label="Open page in fullscreen"
                        >
                          <img src={slide.src} alt={slide.alt} width={1024} height={1536} />
                          <figcaption>{slide.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ai-carousel-arrow"
                      onClick={() => scrollToAiSlide(aiSlideIndex + 1)}
                      disabled={aiSlideIndex === aiPosterSlides.length - 1}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                  <div className="ai-carousel-dots" role="tablist" aria-label="AI page indicators">
                    {aiPosterSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        type="button"
                        className={index === aiSlideIndex ? "is-active" : ""}
                        onClick={() => scrollToAiSlide(index)}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>
                  {aiFullscreenOpen && (
                    <div
                      className="ai-fullscreen-overlay"
                      role="dialog"
                      aria-modal="true"
                      aria-label="AI page fullscreen"
                      onClick={(event) => {
                        if (event.target === event.currentTarget) {
                          setAiFullscreenOpen(false);
                        }
                      }}
                    >
                      <div className="ai-fullscreen-content">
                        <button
                          type="button"
                          className="ai-fullscreen-nav prev"
                          onClick={(event) => {
                            event.stopPropagation();
                            scrollToAiSlide(aiSlideIndex - 1, false);
                          }}
                          disabled={aiSlideIndex === 0}
                          aria-label="Previous page"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="ai-fullscreen-close"
                          onClick={(event) => {
                            event.stopPropagation();
                            setAiFullscreenOpen(false);
                          }}
                          aria-label="Close fullscreen"
                        >
                          ✕
                        </button>
                        <img
                          src={aiPosterSlides[aiSlideIndex].src}
                          alt={aiPosterSlides[aiSlideIndex].alt}
                          width={1024}
                          height={1536}
                        />
                        <button
                          type="button"
                          className="ai-fullscreen-nav next"
                          onClick={(event) => {
                            event.stopPropagation();
                            scrollToAiSlide(aiSlideIndex + 1, false);
                          }}
                          disabled={aiSlideIndex === aiPosterSlides.length - 1}
                          aria-label="Next page"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}
                </section>
                <section className="bite-grid" aria-label="AI learning blocks">
                  <article className="bite-card">
                    <h3>Prompt Basics</h3>
                    <p>Define role, goal, inputs, and output format in one short prompt block.</p>
                  </article>
                  <article className="bite-card">
                    <h3>Workflow Pattern</h3>
                    <p>Draft, critique, refine, and verify. This loop improves quality quickly.</p>
                  </article>
                  <article className="bite-card">
                    <h3>Safety Check</h3>
                    <p>For finance, legal, or medical topics, cross-check with trusted primary sources.</p>
                  </article>
                </section>
                <section className="tool-card ai-hero">
                  <h2>How to use AI in this lab</h2>
                  <p>
                    Start with clear prompts, provide context, and ask for structured output.
                    Validate important results before using them in production workflows.
                  </p>
                </section>
              </>
            ) : (
              <AiHeartfulnessToolsPage />
            )}
          </section>
        )}

        {(mode === "privacy" || mode === "terms" || mode === "disclaimer" || mode === "contact") && (
          <LegalSection mode={mode} />
        )}

        {mode === "sitemap" && <SiteMapSection />}

        <footer className="ca-footer" aria-label="Footer links">
          <p>© {new Date().getFullYear()} Learning Lab</p>
          <div className="ca-footer-links">
            <button type="button" onClick={() => setMode("privacy")}>Privacy Policy</button>
            <button type="button" onClick={() => setMode("terms")}>Terms of Use</button>
            <button type="button" onClick={() => setMode("disclaimer")}>Disclaimer</button>
            <button type="button" onClick={() => setMode("contact")}>Contact</button>
            <button type="button" onClick={() => setMode("sitemap")}>Site Map</button>
          </div>
        </footer>

        <section className="ca-ad-slot" aria-label="Advertisement">
          <div id={ADSTERRA_CONTAINER_ID} />
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
