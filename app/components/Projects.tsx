
"use client";

import { useEffect, useRef, useState } from "react";

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
};

const projects: Project[] = [
  {
    id: 1,
    title: "Nexus Analytics Platform",
    description:
      "Real-time data visualization dashboard with user authentication, custom chart builders, and automated report generators.",
    category: "Full-Stack",
    technologies: ["Next.js", "Tailwind", "Prisma"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
  },
  {
    id: 2,
    title: "Aura AI Content Studio",
    description:
      "Generative AI assistant app enabling content creators to generate code snippets, copy, and vector graphics smoothly.",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "OpenAI API"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
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

const filters: Category[] = ["All", "Full-Stack", "Frontend"];

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
      strokeWidth="2"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "All" || project.category === activeFilter
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  function changeFilter(filter: Category) {
    setActiveFilter(filter);
    setShowAll(false);
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#030710] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-[3.8%] lg:py-24"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_45%,rgba(0,94,83,0.18),transparent_42%),linear-gradient(120deg,#030710,#041019_60%,#03151b)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:15px_25px] [background-size:181px_163px]" />

      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <div
          className={`mb-10 flex flex-col gap-6 transition-all duration-700 sm:mb-12 lg:flex-row lg:items-end lg:justify-between ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="mb-2 font-mono text-xs font-semibold tracking-[0.22em] text-emerald-400 sm:text-sm">
                PORTFOLIO
            </p>

            <h2 className="text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Featured Projects
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 lg:hidden" />
          </div>

          {/* Working category filters */}
          <div
            className="flex w-fit max-w-full flex-wrap gap-1 rounded-2xl border border-slate-700/50 bg-[#101827]/90 p-1.5"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => changeFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:min-w-[82px] sm:px-4 sm:text-sm ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project cards: three initially */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {displayedProjects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[23px] border bg-[#0b1322]/95 transition-all duration-500 ${
                project.id === 2
                  ? "border-emerald-400/30"
                  : "border-slate-700/45"
              } ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } hover:-translate-y-1.5 hover:border-emerald-400/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]`}
              style={{
                transitionDelay: visible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Project image */}
              <div className="relative aspect-[1.8/1] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1322]/65 via-transparent to-black/10" />

                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/65 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Compact project content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                {/* Black technology badges */}
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

                <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-emerald-400 sm:text-xl">
                  {project.title}
                </h3>

                <p className="mb-5 flex-1 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>

                {/* Red Live Demo + black GitHub */}
                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-700/40 pt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(220,38,38,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.3)]"
                  >
                    View Live
                    <ExternalLinkIcon />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full border border-neutral-700 bg-[#090909] px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-500 hover:bg-neutral-900 hover:text-white"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Subtle hover accent */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* View more / View less */}
        {filteredProjects.length > 3 && (
          <div
            className={`mt-10 flex flex-col items-center gap-3 transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setShowAll((previous) => !previous)}
              aria-expanded={showAll}
              className="group inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-[#0b1322] px-5 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-emerald-400/70 hover:bg-emerald-400/10 hover:text-emerald-300"
            >
              {showAll ? "View Less Projects" : "View More Projects"}

              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/10 text-emerald-400 transition-all duration-300 group-hover:translate-y-0.5 group-hover:bg-emerald-400/20">
                <ArrowIcon direction={showAll ? "up" : "down"} />
              </span>
            </button>

            <p className="text-xs text-slate-500">
              {showAll
                ? `Showing all ${filteredProjects.length} projects`
                : `${filteredProjects.length - 3} more ${
                    filteredProjects.length - 3 === 1 ? "project" : "projects"
                  } to explore`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
