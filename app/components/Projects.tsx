"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

/* ==========================================================================
   1. TYPES
   ========================================================================== */

type Category = "All" | "Full-Stack" | "Frontend";

type Project = {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured?: boolean; // gives the card a permanent emerald glow border
};

/* ==========================================================================
   2. DATA  (edit your projects and filters here)
   ========================================================================== */

const filters: Category[] = ["All", "Full-Stack", "Frontend"];

// How many cards show before "View More Projects" is clicked
const INITIAL_COUNT = 3;

const projects: Project[] = [
{
    id: 1,
    title: "Bazar-Dor",
    description:
     "Real-time market price tracker with secure login, live vegetable rate updates, and instant price comparisons.",
    category: "Full-Stack",
    technologies: ["Next.js", "Tailwind", "MongoDB"],
    image: "/Bazar-Dor.png",
    liveUrl: "https://ph-b14-a07.vercel.app",
    githubUrl: "https://github.com/HamimRaju/Bazar-Dor",
  },
  {
    id: 2,
    title: "Muscle Maker FITLOG",
    description:
      "Fitness tracking dashboard featuring custom workout logs, progress monitoring, and dynamic exercise insights for an optimal gym experience.",
    category: "Full-Stack",
    technologies: ["Next.js", "Typescript", "Tailwind CSS"],
    image:
      "/Muscle-Maker.png",
    liveUrl: "https://ph-b14-a06.vercel.app",
    githubUrl: "https://github.com/HamimRaju/Muscle-Maker",
    featured: true,
  },
  {
    id: 3,
    title: "Cyber3D Developer Hub",
    description:
      "Interactive 3D web experience with WebGL canvas shaders, dynamic lighting, and responsive UI interactions.",
    category: "Frontend",
    technologies: ["Three.js", "GSAP", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
  {
    id: 4,
    title: "DevFlow Task Manager",
    description:
      "A productivity workspace for managing projects, tracking tasks, and collaborating through a clean, responsive interface.",
    category: "Full-Stack",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
  {
    id: 5,
    title: "Lumina Landing Page",
    description:
      "A modern product landing page featuring fluid transitions, bold typography, responsive layouts, and reusable UI components.",
    category: "Frontend",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
  {
    id: 6,
    title: "CloudSync API Platform",
    description:
      "A backend service for managing application data with authentication, structured API endpoints, and database integration.",
    category: "Full-Stack",
    technologies: ["Node.js", "Express", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
];

/* ==========================================================================
   3. ICONS
   ========================================================================== */

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M7 7h10v10"
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "down" | "up" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 transition-transform duration-300 ${
        direction === "up" ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

/* ==========================================================================
   4. HOOKS
   ========================================================================== */

// Returns `visible = true` once the element has scrolled into view
function useInView<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ==========================================================================
   5. SECTION HEADING + FILTER TABS
   ========================================================================== */

function SectionHeading({ visible }: { visible: boolean }) {
  return (
    <div
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <p className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.22em] text-emerald-400 sm:text-sm">
        <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-transparent" />
        PORTFOLIO
      </p>

      <h2 className="text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
        Featured Projects
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
        A selection of full-stack and frontend work, built with clean
        architecture and a focus on real-world use.
      </p>

      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
    </div>
  );
}

function FilterTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (filter: Category) => void;
}) {
  return (
    <div
      className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-slate-700/50 bg-[#0d1626]/90 p-1.5 shadow-[0_0_30px_rgba(0,214,200,0.05)] backdrop-blur sm:w-fit"
      role="group"
      aria-label="Filter projects by category"
    >
      {filters.map((filter) => {
        const count =
          filter === "All"
            ? projects.length
            : projects.filter((p) => p.category === filter).length;
        const isActive = active === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:min-w-[110px] sm:px-4 sm:text-sm ${
              isActive
                ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,214,180,0.35)]"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {filter}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                isActive
                  ? "bg-slate-950/20 text-slate-950"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   6. PROJECT CARD  (futuristic: cursor spotlight, HUD corners, scan line)
   ========================================================================== */

// Four corner brackets that grow on hover (HUD look)
function CornerBrackets() {
  const base =
    "pointer-events-none absolute h-3 w-3 border-cyan-300/80 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-emerald-300";

  return (
    <>
      <span className={`${base} left-2.5 top-2.5 rounded-tl-md border-l-2 border-t-2`} />
      <span className={`${base} right-2.5 top-2.5 rounded-tr-md border-r-2 border-t-2`} />
      <span className={`${base} bottom-2.5 left-2.5 rounded-bl-md border-b-2 border-l-2`} />
      <span className={`${base} bottom-2.5 right-2.5 rounded-br-md border-b-2 border-r-2`} />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Tracks the mouse so the spotlight and border glow follow the cursor
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  const isFullStack = project.category === "Full-Stack";

  return (
    // Outer layer = 1px border area (glows where the cursor is)
    <article
      onMouseMove={handleMouseMove}
      className={`group relative h-full rounded-[24px] p-px transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(0,0,0,0.4),0_0_40px_rgba(0,214,200,0.08)] ${
        project.featured ? "bg-emerald-400/35" : "bg-slate-700/40"
      }`}
    >
      {/* Border glow that follows the cursor */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(34,211,238,0.85), rgba(52,211,153,0.35) 45%, transparent 70%)",
        }}
      />

      {/* Card body */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-[#0a1220]">
        {/* Spotlight inside the card */}
        <span
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(0,214,200,0.09), transparent 65%)",
          }}
        />

        {/* ---------- Image ---------- */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Color tint + fade into the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-[#0a1220]/20 to-cyan-500/10" />

          {/* Fine scan lines */}
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_3px)]" />

          {/* Scan line that sweeps down on hover */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-300 opacity-0 shadow-[0_0_14px_3px_rgba(103,232,249,0.7)] transition-all duration-1000 ease-in-out group-hover:top-full group-hover:opacity-100" />

          <CornerBrackets />

          {/* Category chip */}
          <span className="absolute bottom-3.5 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md sm:text-[11px]">
            <span
              className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${
                isFullStack
                  ? "bg-emerald-400 text-emerald-400"
                  : "bg-cyan-400 text-cyan-400"
              }`}
            />
            {project.category}
          </span>
        </div>

        {/* ---------- Content ---------- */}
        <div className="relative z-20 flex flex-1 flex-col p-5 sm:p-6">
          {/* Technology badges */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-neutral-700 bg-[#090909] px-2.5 py-1 text-[10px] font-medium text-neutral-200 transition-colors duration-300 hover:border-red-500 hover:text-red-400 sm:text-[11px]"
              >
                {technology}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-emerald-300 sm:text-[22px]">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 flex-1 text-sm leading-6 text-slate-400 sm:leading-7">
            {project.description}
          </p>

          {/* Buttons */}
          <div className="mt-auto flex items-center gap-2.5 border-t border-slate-700/40 pt-5">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_14px_rgba(220,38,38,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(239,68,68,0.45)] sm:flex-none sm:px-5 sm:text-sm"
            >
              View Live
              <ExternalLinkIcon />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-700 bg-[#090909] px-4 py-2 text-xs font-semibold text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-neutral-900 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] sm:flex-none sm:px-5 sm:text-sm"
            >
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>

        {/* Line that grows along the bottom on hover */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  );
}

/* ==========================================================================
   7. VIEW MORE / VIEW LESS BUTTON
   ========================================================================== */

function ViewMoreButton({
  showAll,
  total,
  visible,
  onToggle,
}: {
  showAll: boolean;
  total: number;
  visible: boolean;
  onToggle: () => void;
}) {
  const remaining = total - INITIAL_COUNT;

  return (
    <div
      className={`mt-10 flex flex-col items-center gap-3 transition-all duration-700 sm:mt-12 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={showAll}
        className="group relative rounded-full bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-emerald-400/60 p-px transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,214,200,0.3)]"
      >
        <span className="inline-flex items-center gap-3 rounded-full bg-[#0b1322] px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-300 group-hover:bg-[#0f1d2e] group-hover:text-emerald-300">
          {showAll ? "View Less Projects" : "View More Projects"}

          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/10 text-emerald-400 transition-all duration-300 group-hover:translate-y-0.5 group-hover:bg-emerald-400/20">
            <ArrowIcon direction={showAll ? "up" : "down"} />
          </span>
        </span>
      </button>

      <p className="text-xs text-slate-500">
        {showAll
          ? `Showing all ${total} projects`
          : `${remaining} more ${remaining === 1 ? "project" : "projects"} to explore`}
      </p>
    </div>
  );
}

/* ==========================================================================
   8. PROJECTS SECTION  (background + layout)
   ========================================================================== */

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [showAll, setShowAll] = useState(false);
  const { ref, visible } = useInView<HTMLElement>();

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_COUNT);

  function changeFilter(filter: Category) {
    setActiveFilter(filter);
    setShowAll(false);
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#030710] px-4 py-16 text-white sm:px-8 sm:py-20 lg:min-h-screen lg:px-[3.8%] lg:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_45%,rgba(0,94,83,0.18),transparent_42%),linear-gradient(120deg,#030710,#041019_60%,#03151b)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:15px_25px] [background-size:181px_163px]" />
      {/* Soft color orbs */}
      <div className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-[1400px]">
        {/* Heading + filters */}
        <div className="mb-10 flex flex-col gap-7 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading visible={visible} />
          <FilterTabs active={activeFilter} onChange={changeFilter} />
        </div>

        {/* Project cards (key on filter so cards re-animate when it changes) */}
        <div
          key={activeFilter}
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7"
        >
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`min-w-0 ${visible ? "animate-hero-in" : "opacity-0"}`}
              style={{ animationDelay: `${(index % INITIAL_COUNT) * 110}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View more / View less */}
        {filteredProjects.length > INITIAL_COUNT && (
          <ViewMoreButton
            showAll={showAll}
            total={filteredProjects.length}
            visible={visible}
            onToggle={() => setShowAll((previous) => !previous)}
          />
        )}
      </div>
    </section>
  );
}