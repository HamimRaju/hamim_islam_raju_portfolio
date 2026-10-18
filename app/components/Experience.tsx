"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

/* ==========================================================================
   1. TYPES
   ========================================================================== */

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

/* ==========================================================================
   2. DATA  (edit your experience and education here)
   ========================================================================== */

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: "WORK EXPERIENCE",
    title: "WEB DEVELOPER INTERN",
    organization: "Syntecxhub Ltd",
    date: "May 2026 – Sep 2026",
    location: "Remote",
    details: [
      "Worked 4 months full-time as a web Developer.",
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
    title: "Bachelor of Science in Computer Science and Engineering",
    organization: "Brac University",
    date: "2022 – 2027",
    location: "Dhaka",
    description:
      "Specializing in Software Engineering, Data Structures & Algorithms, Database Management Systems, and Web Application Development.",
    color: "cyan",
    icon: "graduation",
  },
  {
    id: 3,
    type: "EDUCATION",
    title: "HSC",
    organization: "Military Collegiate School, Khulna (MCSK)",
    date: "2021",
    location: "Khulna",
    color: "emerald",
    icon: "award",
  },
  {
    id: 4,
    type: "EDUCATION",
    title: "SSC",
    organization: "Military Collegiate School, Khulna (MCSK)",
    date: "2021",
    location: "Khulna",
    color: "cyan",
    icon: "code",
  },
];

// Color themes. (Full class names are written out so Tailwind can detect them.)
const palettes = {
  emerald: {
    text: "text-emerald-400",
    badge: "border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-400",
    edge: "bg-emerald-400/25",
    node: "border-emerald-400 text-emerald-400 bg-emerald-400/10 shadow-[0_0_30px_rgba(52,211,153,0.5)]",
    ping: "border-emerald-400",
    dot: "bg-emerald-400",
    glow: "rgba(52,211,153,0.85)",
    soft: "rgba(52,211,153,0.09)",
  },
  cyan: {
    text: "text-cyan-400",
    badge: "border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-400",
    edge: "bg-cyan-400/25",
    node: "border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.5)]",
    ping: "border-cyan-400",
    dot: "bg-cyan-400",
    glow: "rgba(34,211,238,0.85)",
    soft: "rgba(34,211,238,0.09)",
  },
  violet: {
    text: "text-violet-400",
    badge: "border-violet-400/30 bg-violet-400/[0.07] text-violet-400",
    edge: "bg-violet-400/25",
    node: "border-violet-400 text-violet-400 bg-violet-400/10 shadow-[0_0_30px_rgba(167,139,250,0.5)]",
    ping: "border-violet-400",
    dot: "bg-violet-400",
    glow: "rgba(167,139,250,0.85)",
    soft: "rgba(167,139,250,0.09)",
  },
};

/* ==========================================================================
   3. ICONS
   ========================================================================== */

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

/* ==========================================================================
   4. HOOKS
   ========================================================================== */

// Returns `visible = true` once the element scrolls into view
function useInView<T extends HTMLElement>(threshold = 0.1, rootMargin = "0px") {
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
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

// Tracks scroll position along the timeline:
//  - `progress`    0 → 1, how far the glowing light has travelled
//  - `activeCount` how many milestone nodes the light has already passed
function useTimelineProgress() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = timeline.getBoundingClientRect();
        const lightLine = window.innerHeight * 0.68;

        // Light position along the timeline
        const next =
          rect.height > 0
            ? Math.max(0, Math.min(1, (lightLine - rect.top) / rect.height))
            : 0;
        setProgress(next);

        // Count the nodes the light has reached
        let passed = 0;
        timeline.querySelectorAll<HTMLElement>("[data-node]").forEach((node) => {
          const r = node.getBoundingClientRect();
          if (r.top + r.height / 2 <= lightLine) passed += 1;
        });
        setActiveCount(passed);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { timelineRef, progress, activeCount };
}

/* ==========================================================================
   5. SECTION HEADING
   ========================================================================== */

function SectionHeading({ visible }: { visible: boolean }) {
  return (
    <header
      className={`mb-16 text-center transition-all duration-700 sm:mb-20 lg:mb-24 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
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
  );
}

/* ==========================================================================
   6. TIMELINE TRACK  (vertical line + glowing light that follows scroll)
   ========================================================================== */

function TimelineTrack({ progress }: { progress: number }) {
  return (
    <>
      {/* Static track + filled part */}
      <div className="pointer-events-none absolute bottom-7 left-[17px] top-7 w-px bg-slate-700/60 sm:left-[21px] md:left-1/2 md:-translate-x-1/2">
        <div
          className="absolute left-0 top-0 w-full bg-linear-to-b from-emerald-400 via-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
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
    </>
  );
}

/* ==========================================================================
   7. MILESTONE NODE  (dim until the light reaches it, then glows)
   ========================================================================== */

function MilestoneNode({
  item,
  active,
  current,
}: {
  item: TimelineItem;
  active: boolean;
  current: boolean;
}) {
  const palette = palettes[item.color];

  return (
    <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
      <div
        data-node
        className={`relative grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-700 sm:h-11 sm:w-11 md:h-[58px] md:w-[58px] ${
          active
            ? `scale-100 ${palette.node}`
            : "scale-90 border-slate-600 bg-[#06121a] text-slate-500"
        }`}
      >
        {/* Outer ring */}
        <span
          className={`absolute inset-[-7px] rounded-full border transition-opacity duration-700 ${
            active ? `${palette.ping} opacity-30` : "border-slate-600 opacity-20"
          }`}
        />

        {/* Pulsing ring on the milestone the light just reached */}
        {current && (
          <span
            className={`absolute inset-[-7px] animate-ping rounded-full border ${palette.ping} opacity-40`}
          />
        )}

        <Icon
          name={item.icon}
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   8. TIMELINE CARD  (cursor spotlight, glowing border, staggered content)
   ========================================================================== */

function TimelineCard({
  item,
  isLeft,
  visible,
}: {
  item: TimelineItem;
  isLeft: boolean;
  visible: boolean;
}) {
  const palette = palettes[item.color];

  // Tracks the mouse so the spotlight and border glow follow the cursor
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  // Small helper: staggered fade-up for the content inside the card
  const stagger = (order: number) => ({
    transitionDelay: visible ? `${250 + order * 90}ms` : "0ms",
  });
  const staggerClass = `transition-all duration-700 ${
    visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`;

  return (
    <article
      onMouseMove={handleMouseMove}
      className={`group relative col-start-2 row-start-1 min-w-0 rounded-2xl p-px transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${palette.edge} ${
        isLeft ? "md:col-start-1" : "md:col-start-3"
      }`}
    >
      {/* Border glow that follows the cursor */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), ${palette.glow}, transparent 70%)`,
        }}
      />

      {/* Card body */}
      <div className="relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-[15px] bg-[#0a1220]/95 p-4 backdrop-blur-md sm:p-5 md:min-h-[220px] md:p-6">
        {/* Spotlight inside the card */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), ${palette.soft}, transparent 65%)`,
          }}
        />

        {/* Gradient top edge */}
        <div
          className={`absolute left-0 top-0 h-px w-3/4 bg-linear-to-r from-transparent via-current to-transparent opacity-60 ${palette.text}`}
        />

        {/* Badge + date + location */}
        <div
          className={`relative mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between ${staggerClass}`}
          style={stagger(0)}
        >
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

        {/* Title + organization */}
        <div className={`relative ${staggerClass}`} style={stagger(1)}>
          <h3 className="text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-white sm:text-xl">
            {item.title}
          </h3>

          <p className={`mt-1 text-sm font-semibold sm:text-base ${palette.text}`}>
            {item.organization}
          </p>
        </div>

        {/* Work details (bullets) */}
        {item.details && (
          <ul className="relative mt-4 space-y-2">
            {item.details.map((detail, i) => (
              <li
                key={detail}
                className={`flex items-start gap-2.5 text-sm leading-6 text-slate-300 ${staggerClass}`}
                style={stagger(2 + i)}
              >
                <span
                  className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${palette.dot}`}
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Education description */}
        {item.description && (
          <p
            className={`relative mt-3 text-sm leading-6 text-slate-300 ${staggerClass}`}
            style={stagger(2)}
          >
            {item.description}
          </p>
        )}

        {/* Technology chips (pop in one by one) */}
        {item.technologies && (
          <div className="relative mt-auto flex flex-wrap gap-1.5 border-t border-slate-700/50 pt-4 md:mt-5">
            {item.technologies.map((technology, i) => (
              <span
                key={technology}
                className={`rounded-lg border border-slate-700/70 bg-[#111a2a] px-2.5 py-1.5 font-mono text-[10px] text-slate-300 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300 sm:text-xs ${
                  visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                style={{
                  transitionDelay: visible ? `${600 + i * 80}ms` : "0ms",
                }}
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {/* Line that grows along the bottom on hover */}
        <div
          className={`pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-current opacity-60 transition-all duration-500 group-hover:w-full ${palette.text}`}
        />
      </div>
    </article>
  );
}

/* ==========================================================================
   9. TIMELINE ENTRY  (node + card, slides in from the side when scrolled to)
   ========================================================================== */

function TimelineEntry({
  item,
  index,
  active,
  current,
}: {
  item: TimelineItem;
  index: number;
  active: boolean;
  current: boolean;
}) {
  const isLeft = index % 2 === 0;
  const { ref, visible } = useInView<HTMLDivElement>(0.15, "0px 0px -8% 0px");

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[36px_minmax(0,1fr)] items-start gap-x-4 transition-all duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[44px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-0 ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `translate-y-10 opacity-0 ${
              isLeft ? "md:-translate-x-14" : "md:translate-x-14"
            } md:translate-y-0`
      }`}
    >
      <MilestoneNode item={item} active={active} current={current} />
      <TimelineCard item={item} isLeft={isLeft} visible={visible} />
    </div>
  );
}

/* ==========================================================================
   10. EXPERIENCE SECTION  (background + layout)
   ========================================================================== */

export default function Experience() {
  const { ref, visible } = useInView<HTMLElement>(0.06);
  const { timelineRef, progress, activeCount } = useTimelineProgress();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#030710] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_45%,rgba(0,95,100,0.15),transparent_48%),linear-gradient(120deg,#030710,#041019_65%,#03151b)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:12px_20px] [background-size:173px_157px]" />
      {/* Soft color orbs */}
      <div className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading visible={visible} />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <TimelineTrack progress={progress} />

          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
            {timelineItems.map((item, index) => (
              <TimelineEntry
                key={item.id}
                item={item}
                index={index}
                active={index < activeCount}
                current={index === activeCount - 1}
              />
            ))}
          </div>
        </div>

        {/* Footer line */}
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