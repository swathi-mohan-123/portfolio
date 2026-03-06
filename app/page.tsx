"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─── Data ─── */

const tiles = [
  {
    id: "msr",
    section: "experience",
    label: "Microsoft Research",
    sublabel: "Research Fellow · 2024–Present",
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    emoji: "🔬",
    span: "col-span-2 row-span-2",
  },
  {
    id: "code-repair",
    section: "projects",
    label: "Autonomous Code Repair",
    sublabel: "Multi-agent AI for Rust",
    gradient: "linear-gradient(135deg, #F43F5E, #FB923C)",
    emoji: "🤖",
    span: "col-span-1 row-span-2",
  },
  {
    id: "c-to-rust",
    section: "projects",
    label: "C → Rust Translation",
    sublabel: "Ownership inference + RL",
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    emoji: "🦀",
    span: "col-span-1 row-span-1",
  },
  {
    id: "fischer",
    section: "experience",
    label: "FischerJordan",
    sublabel: "ML Intern · 2023–2024",
    gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    emoji: "📊",
    span: "col-span-1 row-span-1",
  },
  {
    id: "rag",
    section: "projects",
    label: "Hybrid RAG Pipeline",
    sublabel: "Financial chatbot · 2M+ records",
    gradient: "linear-gradient(135deg, #14B8A6, #22C55E)",
    emoji: "🔍",
    span: "col-span-1 row-span-1",
  },
  {
    id: "sap",
    section: "experience",
    label: "SAP Labs India",
    sublabel: "SDE Intern · 2023",
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    emoji: "⚙️",
    span: "col-span-1 row-span-1",
  },
  {
    id: "distributed",
    section: "projects",
    label: "File Sharding System",
    sublabel: "Distributed systems",
    gradient: "linear-gradient(135deg, #22C55E, #3B82F6)",
    emoji: "🗂️",
    span: "col-span-1 row-span-1",
  },
  {
    id: "skills",
    section: "skills",
    label: "Skills",
    sublabel: "Python · Rust · LLMs · MCP",
    gradient: "linear-gradient(135deg, #A855F7, #6366F1)",
    emoji: "🛠️",
    span: "col-span-1 row-span-1",
  },
];

const experiences = [
  {
    id: "msr",
    role: "Research Fellow",
    company: "Microsoft Research",
    period: "Jul 2024 — Present",
    color: "#7df263",
    summary:
      "Building multi-agent AI systems for autonomous code repair and C→Rust translation.",
    bullets: [
      "Agentic system combining AST-based static analysis with LLM-driven classification for Rust code repair. [95–100% recall] across [200+ crates] and [170k+ LoC].",
      "Pointer ownership inference for C→Rust using call graphs, topological propagation, and RL-based translation with backtracking.  [Reduced manual annotation ~80%].",
      "Implemented on Model Context Protocol (MCP), integrated with GitHub Copilot and Claude Code. ",
      "[Featured in Rust@M365 newsletter].",
    ],
  },
  {
    id: "fischer",
    role: "Machine Learning Intern",
    company: "FischerJordan",
    period: "Nov 2023 — Jul 2024",
    color: "#3B82F6",
    summary:
      "Built production ML systems for invoice processing, RAG search, and financial intelligence.",
    bullets: [
      "Invoice understanding with PaddleOCR + LLM extraction [(92%+ accuracy)]. SVM email classifier at [99.6% accuracy].",
      "Hybrid RAG architecture with SQL reasoning — [95%+ answer accuracy] for e-commerce social media platform. ",
      "Built recommendation engine for commerce-focused social platform; improved [engagement by 40%] and [CTR by 25%].",
      "Django backend serving [2M+ company records] for finance chatbot. Deployed ML pipelines via Docker + AWS.",
    ],
  },
  {
    id: "sap",
    role: "Software Development Intern",
    company: "SAP Labs India",
    period: "Jun — Jul 2023",
    color: "#F59E0B",
    summary:
      "Built a shift roster application improving scheduling efficiency.",
    bullets: [
      "Vue.js + Flask application with [30% scheduling accuracy improvement], saving [15+ hours per week].",
      "Streamlined API testing with Postman, reducing [system errors by 40%] and [increasing uptime 20%].",
    ],
  },
];

const projects = [
  {
    id: "code-repair",
    name: "Autonomous Code Repair",
    color: "#F43F5E",
    description:
      "Multi-agent system that detects and fixes coding guideline violations in Rust codebases. Combines AST-based static analysis to extract structural code features with LLM-driven classification.",
    detail:
      "Designed a multi-agent architecture with an orchestrator delegating to specialized subagents for violation detection, classification, and fix generation — operating in an autonomous loop with build/test validation. Achieved 95–100% recall (vs. 10–50% with vanilla LLM) and <5% missed violations; deployed across 200+ Rust crates and 170k+ LoC.",
    tags: ["Agentic AI", "Rust", "MCP", "Multi-Agent", "AST"],
  },
  {
    id: "c-to-rust",
    name: "C → Rust Ownership Inference",
    color: "#8B5CF6",
    description:
      "Pointer ownership inference system analyzing semantics (singleton vs. array vs. null-terminated) by constructing call graphs and propagating annotations in reverse topological order.",
    detail:
      "Built type summarization pipeline extracting field-level ownership patterns from C structs via usage-site analysis. Implemented RL-based translation with backtracking: exploration stack of competing approaches, LLM-as-judge scoring, and reward-based approach selection. Reduced manual type annotation effort ~80%.",
    tags: ["Type Systems", "Graph Algorithms", "RL", "AST"],
  },
  {
  id: "invoice-ai",
  name: "Invoice Understanding System",
  color: "#F43F5E",
  description:
    "Production ML pipeline for automated invoice understanding using OCR and LLM-based structured extraction.",
  detail:
    "Built an end-to-end invoice processing system combining PaddleOCR with LLM-based field extraction, achieving 92%+ extraction accuracy. Trained and optimized an SVM (RBF kernel) classifier for invoice email detection with 99.6% accuracy and 99%+ precision/recall. Designed scalable ML inference pipelines and deployed them via Docker and AWS for production use.",
  tags: ["PaddleOCR", "Scikit-learn", "LLMs", "AWS", "Docker"]
},

{
  id: "financial-backend",
  name: "Financial Intelligence Backend",
  color: "#14B8A6",
  description:
    "Scalable backend serving financial intelligence queries across millions of company records.",
  detail:
    "Architected and deployed a Django-based backend serving financial data across 2M+ company records. Implemented optimized database querying with PostgreSQL and integrated secure authentication using Auth0. Designed APIs enabling LLM-powered financial query responses over structured databases.",
  tags: ["Django", "PostgreSQL", "Auth0", "APIs", "AWS"]
},

{
  id: "meeting-assistant",
  name: "LLM Meeting Assistant",
  color: "#8B5CF6",
  description:
    "Chrome extension that captures live meeting transcripts and generates summaries and action items.",
  detail:
    "Built a browser extension using TypeScript, React, and Chrome APIs to capture live meeting transcripts and process them with LLMs for summarization and action-item extraction. Implemented scenario-aware prompting to generate context-specific outputs for meetings.",
  tags: ["TypeScript", "React", "Chrome APIs", "LLMs"]
},
  {
    id: "distributed",
    name: "Distributed File Sharding",
    color: "#22C55E",
    description:
      "Client-server architecture with consistent hashing for fault-tolerant file partitioning and retrieval.",
    detail:
      "98% sharding efficiency by evenly distributing files across 10 servers using MD5 hash-based sharding. Reduced data retrieval time by 75% compared to a non-sharded system, with average retrieval of 3ms per file.",
    tags: ["Distributed Systems", "Consistent Hashing", "Python"],
    link: "https://github.com/swathi-mohan-123/distributed-file-system",
  },
];

const skillGroups = [
  {
    cat: "Languages",
    items: ["Python", "Rust", "C/C++", "C#", "TypeScript"],
    color: "#6366F1",
  },
  {
    cat: "ML & AI",
    items: ["LLMs", "Agentic AI", "Multi-Agent Systems", "RAG", "AST Analysis"],
    color: "#F43F5E",
  },
  {
    cat: "Frameworks",
    items: ["LangChain", "FAISS", "PaddleOCR", "Django", "FastAPI"],
    color: "#F59E0B",
  },
  {
    cat: "Infrastructure",
    items: ["Model Context Protocol", "PostgreSQL", "Docker", "AWS"],
    color: "#22C55E",
  },
];

/* ─── Hotspot data for the hero illustration ─── */

const hotspots = [
  {
    
  id: "contact",
  label: "Say hi 👋",
  section: "contact",
  x: "42%", 
  y: "18%", 
  w: "22%", 
  h: "40%",
  color: "#EC4899",
  },
  {
    id: "experience",
    label: "Experience",
    section: "experience",
    // Whiteboard with "Experience" text — upper left
    x: "3%", y: "6%", w: "48%", h: "36%",
    color: "#6366F1",
  },
  {
    id: "projects",
    label: "Projects",
    section: "projects",
    // Open notebook on the desk — lower center-left
    x: "10%", y: "64%", w: "30%", h: "30%",
    color: "#F43F5E",
  },
  {
    id: "extracurriculars",
    label: "Extracurriculars",
    section: "extracurriculars",
    // Duck rug — lower right
    x: "60%", y: "60%", w: "38%", h: "38%",
    color: "#A855F7",
  },
  {
    id: "education",
    label: "Education",
    section: "education",
    // Manipal framed photo — upper right
    x: "58%", y: "6%", w: "45%", h: "36%",
    color: "#F59E0B",
  },
  {
    id: "books",
    label: "Skills",
    section: "skills",
    // Book stack (Data Structures, Web Dev, System Design) — left side
    x: "5%", y: "43%", w: "16%", h: "30%",
    color: "#22C55E",
  },
];

/* ─── Components ─── */

function InteractiveHero() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tapped, setTapped] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // On mobile: tap toggles active state; tapping outside dismisses
  const handleSpotInteraction = (spotId: string) => {
    if (isTouchDevice) {
      setTapped((prev) => (prev === spotId ? null : spotId));
    }
  };

  // The active spot is whichever is hovered (desktop) or tapped (mobile)
  const activeSpot = isTouchDevice ? tapped : hovered;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl group"
      onClick={(e) => {
        // Tap outside any hotspot to dismiss on mobile
        if (isTouchDevice && (e.target as HTMLElement).closest('[data-hotspot]') === null) {
          setTapped(null);
        }
      }}
    >
      {/* Hero illustration */}
      <img
        src="/hero.jpg"
        alt="Swathi's desk — hover over items to explore"
        className="w-full h-auto block"
        draggable={false}
      />

      {/* Dim overlay when any hotspot is active */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: activeSpot ? 1 : 0 }}
      />

      {/* Hotspot regions */}
      {hotspots.map((spot) => {
        const isActive = activeSpot === spot.id;
        return (
          <div
  key={spot.id}
  data-hotspot
  onClick={(e) => {
    handleSpotInteraction(spot.id);
    // On desktop or if already active on mobile, navigate
    if (!isTouchDevice && spot.id !== "contact") {
      const el = document.getElementById(spot.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    if (isTouchDevice && isActive && spot.id !== "contact") {
      const el = document.getElementById(spot.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: spot.x,
              top: spot.y,
              width: spot.w,
              height: spot.h,
              // "Cut out" this region from the dimming overlay
              backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              boxShadow: isActive
                ? `0 0 30px ${spot.color}60, inset 0 0 20px ${spot.color}20`
                : "none",
              borderRadius: "16px",
              border: isActive ? `2px solid ${spot.color}90` : "2px solid transparent",
              zIndex: 10,
              // Bright reveal: undo the dimming for this region
              backdropFilter: isActive ? "brightness(2.2) saturate(1.2)" : "none",
              WebkitBackdropFilter: isActive ? "brightness(2.2) saturate(1.2)" : "none",
            }}
            onMouseEnter={() => !isTouchDevice && setHovered(spot.id)}
            onMouseLeave={() => !isTouchDevice && setHovered(null)}
          >
            {/* Tooltip label */}
            {(() => {
              const nearTop = parseFloat(spot.y) < 15;
              return (
                <span
                  className="absolute left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full whitespace-nowrap transition-all duration-300 pointer-events-none"
                  style={{
                    ...(nearTop
                      ? { top: "100%", marginTop: "4px" }
                      : { bottom: "100%", marginBottom: "4px" }),
                    background: isActive ? spot.color : "transparent",
                    color: isActive ? "white" : "transparent",
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateX(-50%) translateY(0)"
                      : `translateX(-50%) translateY(${nearTop ? "-4px" : "4px"})`,
                  }}
                >
                  {spot.label}
                </span>
              );
            })()}
{spot.id === "contact" && isActive && (
  <div
    className="absolute top-full mt-2 sm:mt-3 p-3 sm:p-4 rounded-xl shadow-xl text-xs sm:text-sm font-mono bg-white border border-gray-200 z-50"
    style={{
      width: "min(220px, calc(100vw - 2rem))",
      left: "50%",
      transform: "translateX(-50%)",
    }}
    onClick={(e) => e.stopPropagation()}
  >
   
<p className="text-gray-700 mb-2">
  Let&#39;s get coffee! For collaborations or conversations, hmu on{" "}
  <a
    href="https://linkedin.com/in/swathi-mohan-01333721a"
    target="_blank"
    className="text-indigo-500 hover:underline"
    onClick={(e) => e.stopPropagation()}
  >
    LinkedIn
  </a>
</p>

    
  </div>
)}
          </div>
        );
      })}

      {/* Instruction text */}
      <div
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-[8px] sm:text-[10px] md:text-xs font-mono px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-opacity duration-500 pointer-events-none whitespace-nowrap max-w-[90%] text-center"
        style={{ opacity: activeSpot ? 0 : 1 }}
      >
        <span className="hidden sm:inline">Hover over items to explore · Click to jump ↓</span>
        <span className="sm:hidden">Tap items to explore · </span>
      </div>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ borderLeftColor: exp.color, borderLeftWidth: "4px" }}
    >
      {/* timeline dot */}
      <div
        className="absolute -left-[10px] top-8 w-4 h-4 rounded-full border-2 bg-white"
        style={{ borderColor: exp.color }}
      />

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 sm:p-6 cursor-pointer"
      >
          <div className="flex items-start justify-between">
  <div className="flex gap-3 items-start">

    {/* company logo */}
    <img
      src={`/logos/${exp.id}.png`}
      className="w-10 h-10 rounded-md object-contain mt-1"
      alt={exp.company}
    />

    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
        {exp.role}
        <span className="text-gray-400 font-normal">
          {" "}
          · {exp.company}
        </span>
      </h3>

      <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1">
        {exp.period}
      </p>
    </div>

  </div>

          <span
            className="text-xl font-light transition-transform duration-300 mt-1"
            style={{
              color: exp.color,
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            +
          </span>
        </div>

        <p className="text-[15px] text-gray-500 mt-3 leading-relaxed">
          {exp.summary}
        </p>
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: open ? "600px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 space-y-3">
          {exp.bullets.map((b, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span
                className="w-2 h-2 rounded-full mt-2 shrink-0"
                style={{ background: exp.color }}
              />

              <p
                className="text-sm text-gray-500 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: b.replace(
                    /\[(.*?)\]/g,
                    `<span class="text-xs font-mono px-2 py-1 rounded bg-indigo-50 text-indigo-600">$1</span>`
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const colors = [
    "#FEF9C3",
    "#DBEAFE",
    "#DCFCE7",
    "#F5D0FE",
    "#FFE4E6",
    "#E0F2FE",
  ];

  const rotations = [-2, 1.5, -1.5, 2, -1, 1];

  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:rotate-0"
      style={{
        background: colors[index % colors.length],
        transform: `rotate(${rotations[index % rotations.length]}deg)`,
        borderRadius: "12px",
      }}
    >
      {/* fake tape */}
      <div
        className="absolute w-10 h-3 bg-yellow-100 opacity-70 left-1/2 -translate-x-1/2 -top-1 rotate-2"
        style={{ borderRadius: "2px" }}
      />

      <h3 className="font-semibold text-gray-900 text-lg">
        {project.name}
      </h3>

      <p className="text-sm text-gray-700 mt-2">
        {project.description}
      </p>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "300px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-sm text-gray-700 mt-3">
          {project.detail}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 bg-white/70 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="block mt-3 text-sm font-mono text-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Floating Nav ─── */

function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);

      const sections = ["experience", "projects", "skills", "education"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const links = [
    { id: "experience", label: "Exp" },
    { id: "projects", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "extracurriculars", label: "Extra" },
    { id: "education", label: "Edu" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full px-1.5 py-1.5 sm:px-2 sm:py-2 flex gap-0.5 sm:gap-1 shadow-lg transition-all duration-300 max-w-[95vw]">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className="text-[10px] sm:text-xs font-mono px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-200"
          style={{
            background: active === l.id ? "#6366F1" : "transparent",
            color: active === l.id ? "white" : "#9ca3af",
          }}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

/* ─── Page ─── */

export default function Home() {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Cursor glow ─── */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-[0.04] transition-opacity duration-700 z-0"
        style={{
          background:
            "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* ─── Top Nav ─── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-mono text-sm font-semibold text-gray-900 tracking-tight">
            sm<span className="text-indigo-500">.</span>
          </a>
          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/swathi-mohan-123/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-400 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/swathi-mohan-01333721a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-400 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:swathi15mohan@gmail.com"
              className="text-xs font-mono text-gray-400 hover:text-gray-900 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        {/* ─── Hero ─── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Photo placeholder
          <div className="relative w-48 h-60 lg:w-64 lg:h-80 rounded-3xl shrink-0 overflow-hidden">
            <Image src="/photo.jpg" alt="Swathi Mohan" fill className="object-cover" />
          </div> */}

          <div>
            {/* <p className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-500 mb-3">
              Portfolio
            </p> */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Ciao, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                Swathi
              </span>
              .
            </h1>
            <p className="text-xl text-gray-400 mt-4 leading-relaxed max-w-md font-mono">
              Applied AI engineer building agentic systems and autonomous
              tooling.
            </p>
            <p className="text-sm text-gray-400 mt-3 font-mono">
              Research Fellow @{" "}
              <span className="text-gray-700 font-semibold">
                Microsoft Research
              </span>
            </p>
          </div>
        </div>

        {/* ─── Interactive Hero Illustration ─── */}
        <section className="mt-12">
          <InteractiveHero />
        </section>

        {/* ─── Experience ─── */}
        <section id="experience" className="mt-28 scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-8">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-indigo-500 shrink-0" />
            <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 shrink-0">
              Experience
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="space-y-4"><div className="relative space-y-6 pl-6">
  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
        </section>

        {/* ─── Projects ─── */}
        <section id="projects" className="mt-28 scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-8">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 shrink-0" />
            <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 shrink-0">
              Projects
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {projects.map((p, i) => (
    <ProjectCard key={p.id} project={p} index={i} />
  ))}
</div>
        </section>

        {/* ─── Skills ─── */}
        <section id="skills" className="mt-28 scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-8">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500 shrink-0" />
            <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 shrink-0">
              Skills
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="grid md:grid-cols-2 gap-10">
  {skillGroups.map((group) => (
    <div key={group.cat}>

      <h3 className="text-sm font-mono text-gray-400 mb-4">
        {group.cat}
      </h3>

<div
  className="pl-4 sm:pl-6 space-y-4 sm:space-y-6 relative overflow-visible"
  style={{ borderLeft: `2px solid ${group.color}40` }}
>

        {group.items.map((item) => (
          <div key={item} className="relative flex items-center gap-3 group">

{/* ladder dot */}
<span
  className="absolute -left-[6px] w-3 h-3 rounded-full shadow-md transition-all duration-200 group-hover:scale-125"
  style={{ background: group.color }}
/>

{/* ladder rung */}
<span
  className="absolute left-0 w-4 h-[2px]"
  style={{ background: group.color, opacity: 0.5 }}
/>

<span className="text-xs sm:text-sm font-mono text-gray-700 group-hover:text-gray-900 transition-colors ml-4 break-words">
        {item}
  </span>

</div>
        ))}

      </div>

    </div>
  ))}
</div>
        </section>


        <section id="extracurriculars" className="mt-28 scroll-mt-20">
  <div className="flex items-center gap-2 sm:gap-3 mb-8">
    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500 shrink-0" />
    <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 shrink-0">
      Extracurriculars
    </h2>
    <div className="flex-1 h-px bg-gray-100" />
  </div>

  <div className="flex flex-wrap gap-2 sm:gap-3">
  {[
    "Running — signing up for marathons to remember pain is temporary",
    "Public speaking & debates",
    "Netflix — competitive long-form content consumption",
    "Beaches ",
    "True crime documentaries",
    "Learning to surf ",
    "Learning to tuft — including the slightly unhinged duck rug",
  ].map((item, i) => (
    <span
      key={i}
      className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-mono transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg,#f5f3ff,#eef2ff)",
        color: "#6b21a8",
        border: "1.5px solid #e9d5ff",
      }}
    >
      {item}
    </span>
  ))}
</div>
</section>


        {/* ─── Education ─── */}
        <section id="education" className="mt-28 scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-8">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 shrink-0" />
            <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 shrink-0">
              Education
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div
            className="rounded-2xl p-6 border border-gray-100"
            style={{ borderLeftWidth: "4px", borderLeftColor: "#F59E0B" }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Manipal Institute of Technology
            </h3>
            <p className="text-xs sm:text-sm font-mono text-gray-400 mt-1 break-words">
              B.Tech CS & Engineering (Minor: Data Science) · CGPA 9.26 ·
              2020—2024
            </p>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Computer Networks, Database Management, Distributed Systems, Data Science, Compiler Design,
Operating System, Computer Vision, Data Structures and Algorithms
            </p>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="mt-28 pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-gray-300 font-mono">
          <span>&copy; 2026 Swathi Mohan</span>
          <div className="flex gap-4">
            <a
              href="https://github.com/swathi-mohan-123/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/swathi-mohan-01333721a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>

      <FloatingNav />
    </main>
  );
}