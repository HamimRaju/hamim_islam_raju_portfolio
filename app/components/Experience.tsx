
"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItem = {
  id: number;
  type: "WORK EXPERIENCE" | "EDUCATION";
  title: string;
  organization: string;
  date: string;
  location: string;
  description?: string;
  details?: string[];
  technologies?: string[];
  color: "emerald" | "cyan" | "violet";
  icon: "briefcase" | "graduation" | "award" | "code";
};

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: "WORK EXPERIENCE",
    title: "MERN Stack Developer",
    organization: "Itsybizz AI Private Ltd",
    date: "Feb 2026 – May 2026",
    location: "Dhaka",
    details: [
      "Worked 4 months full-time as a MERN Stack Developer.",
      "Built and maintained the company's QC Dashboard using React.js and Tailwind CSS.",
      "Integrated REST APIs to fetch, display, and update QC data in real time.",
    ],
    technologies: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express"],
    color: "emerald",
    icon: "briefcase",
  },
  {
    id: 2,
    type: "EDUCATION",
    title: "Bachelor of Computer Applications",
    organization: "United International University",
    date: "2025 – 2028",
    location: "Dhaka",
    description:
      "Specializing in Software Engineering, Data Structures & Algorithms, Database Management Systems, and Web Application Development.",
    color: "cyan",
    icon: "graduation",
  },
  {
    id: 3,
    type: "EDUCATION",
    title: "12th Grade",
    organization: "Sarvodaya Bal Vidyalaya No. 3",
    date: "2025",
    location: "Delhi",
    color: "emerald",
    icon: "award",
  },
  {
    id: 4,
    type: "EDUCATION",
    title: "10th Grade",
    organization: "Sarvodaya Bal Vidyalaya No. 3",
    date: "2023",
    location: "Delhi",
    color: "cyan",
    icon: "code",
  },
];

const palettes = {
  emerald: {
    text: "text-emerald-400",
    badge: "border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-400",
    border: "border-emerald-400/25 hover:border-emerald-400/60",
    node: "border-emerald-400 text-emerald-400",
    dot: "bg-emerald-400",
    glow: "rgba(52,211,153,0.8)",
  },
  cyan: {
    text: "text-cyan-400",
    badge: "border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-400",
    border: "border-cyan-400/25 hover:border-cyan-400/60",
    node: "border-cyan-400 text-cyan-400",
    dot: "bg-cyan-400",
    glow: "rgba(34,211,238,0.8)",
  },
  violet: {
    text: "text-violet-400",
    badge: "border-violet-400/30 bg-violet-400/[0.07] text-violet-400",
    border: "border-violet-400/25 hover:border-violet-400/60",
    node: "border-violet-400 text-violet-400",
    dot: "bg-violet-400",
    glow: "rgba(167,139,250,0.8)",
  },
};

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: TimelineItem["icon"];
  className?: string;
}) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "briefcase":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="m2 9 10-5 10 5-10 5L2 9Z" />
          <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
        </svg>
      );
    case "award":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="5" />
          <path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      );
  }
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section || !timeline) return;

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = timeline.getBoundingClientRect();

        // The light travels along the timeline as the page scrolls.
        const travelDistance = rect.height;
        const lightPosition = window.innerHeight * 0.68 - rect.top;
        const nextProgress =
          travelDistance > 0
            ? Math.max(0, Math.min(1, lightPosition / travelDistance))
            : 0;

        setProgress(nextProgress);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );

    observer.observe(section);

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#030710] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-linear(ellipse_at_72%_45%,rgba(0,95,100,0.15),transparent_48%),linear-linear(120deg,#030710,#041019_65%,#03151b)]" />

      {/* Star field */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-linear(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:12px_20px] [background-size:173px_157px]" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <header
          className={`mb-16 text-center transition-all duration-700 sm:mb-20 lg:mb-24 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-7 opacity-0"
          }`}
        >
          <p className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400 sm:text-sm">
             MY JOURNEY
          </p>

          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[64px]">
            Experience &amp;{" "}
            <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(0,220,190,0.4)]" />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            The milestones, experiences, and knowledge shaping my journey as a
            software developer.
          </p>
        </header>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static timeline track */}
          <div className="pointer-events-none absolute bottom-7 left-[17px] top-7 w-px bg-slate-700/60 sm:left-[21px] md:left-1/2 md:-translate-x-1/2">
            <div
              className="absolute left-0 top-0 w-full bg-linear-to-b from-emerald-400 via-cyan-400 to-violet-400"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          {/* Moving light with a soft beam */}
          <div
            className="pointer-events-none absolute left-[17px] z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 sm:left-[21px] md:left-1/2"
            style={{
              top: `${progress * 100}%`,
              opacity: progress > 0 && progress < 1 ? 1 : 0.65,
            }}
          >
            <div className="absolute inset-[-26px] rounded-full bg-cyan-400/10 blur-2xl" />

            <div className="absolute left-1/2 top-1/2 h-16 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-transparent via-cyan-300/80 to-transparent blur-[3px]" />

            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-cyan-300 shadow-[0_0_8px_3px_rgba(34,211,238,0.75),0_0_28px_8px_rgba(34,211,238,0.35)]" />
          </div>

          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const palette = palettes[item.color];

              return (
                <div
                  key={item.id}
                  className={`relative grid grid-cols-[36px_minmax(0,1fr)] items-start gap-x-4 sm:grid-cols-[44px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-0 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  } transition-[opacity,transform] duration-700 motion-reduce:transform-none motion-reduce:transition-none`}
                  style={{ transitionDelay: `${index * 140}ms` }}
                >
                  {/* Milestone node */}
                  <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <div
                      className={`relative grid h-9 w-9 place-items-center rounded-full border-2 bg-[#06121a] shadow-[0_0_18px_rgba(34,211,238,0.13)] sm:h-11 sm:w-11 md:h-[58px] md:w-[58px] ${palette.node}`}
                    >
                      <span
                        className={`absolute inset-[-7px] rounded-full border ${palette.node.split(" ")[0]} opacity-30`}
                      />
                      <Icon
                        name={item.icon}
                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      />
                    </div>
                  </div>

                  {/* Alternating cards; consistent desktop column widths */}
                  <article
                    className={`group relative col-start-2 row-start-1 flex min-h-[190px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-[#0b1322]/95 p-4 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 sm:p-5 md:min-h-[220px] md:p-6 ${
                      isLeft
                        ? "md:col-start-1"
                        : "md:col-start-3"
                    } ${palette.border} hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(0,0,0,0.25)]`}
                  >
                    {/* linear top edge */}
                    <div
                      className={`absolute left-0 top-0 h-px w-3/4 bg-linear-to-r from-transparent via-current to-transparent opacity-60 ${palette.text}`}
                    />

                    {/* Card metadata */}
                    <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <span
                        className={`w-fit rounded-full border px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-[0.12em] sm:text-[10px] ${palette.badge}`}
                      >
                        {item.type}
                      </span>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-slate-400 sm:text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarIcon />
                          {item.date}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <LocationIcon />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
                      {item.title}
                    </h3>

                    <p
                      className={`mt-1 text-sm font-semibold sm:text-base ${palette.text}`}
                    >
                      {item.organization}
                    </p>

                    {item.details && (
                      <ul className="mt-4 space-y-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2.5 text-sm leading-6 text-slate-300"
                          >
                            <span
                              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${palette.dot}`}
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.description && (
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {item.description}
                      </p>
                    )}

                    {item.technologies && (
                      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-slate-700/50 pt-4 md:mt-5">
                        {item.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-slate-700/70 bg-[#111a2a] px-2.5 py-1.5 font-mono text-[10px] text-slate-300 transition-colors duration-300 hover:border-emerald-400/40 hover:text-emerald-300 sm:text-xs"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Subtle bottom highlight */}
                    <div
                      className={`pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-current opacity-60 transition-all duration-500 group-hover:w-full ${palette.text}`}
                    />
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <footer
          className={`mt-16 text-center transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm text-slate-500">
            Always learning. Always building.{" "}
            <span className="font-medium text-emerald-400">
              Always moving forward.
            </span>
          </p>
        </footer>
      </div>
    </section>
  );
}
