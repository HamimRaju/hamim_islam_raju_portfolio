"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   1. DATA  (edit text, tags and stats here)
   ========================================================================== */

// Technology badges that orbit around the profile picture.
// They are spaced evenly around the circle automatically.
const technologies = [
    { label: "JS", color: "text-blue-300", shape: "square" },
    { label: "Java", color: "text-blue-400", shape: "circle" },
    { label: "python", color: "text-cyan-400", shape: "circle" },
    { label: "DSA", color: "text-cyan-400", shape: "circle" },
    { label: "TS", color: "text-cyan-400", shape: "circle" },
    { label: "Nextjs", color: "text-cyan-400", shape: "circle" },
    { label: "figma", color: "text-emerald-400", shape: "circle" },
    { label: "db", color: "text-emerald-400", shape: "circle" },
];

// Distance of the badges from the center, as a % of the container (max ~44)
const ORBIT_RADIUS = 44;

// Stats shown in the strip under the biography
const stats = [
    { label: "Experience", value: "1 year +" },
    { label: "Specialty", value: "Full Stack" },
    { label: "Focus", value: "Development" },
];

// Service cards at the bottom of the section.
// `color` must be "emerald" or "cyan" (see `accents` below).
const services = [
    {
        number: "01",
        title: "Full-Stack Web",
        description:
            "Building responsive, fast web platforms using React, Next.js, Node.js, and modern CSS frameworks with scalable architecture.",
        icon: "code",
        color: "emerald",
        tags: ["React", "Next.js", "Node.js"],
    },
    {
        number: "02",
        title: "UI/UX Craftsmanship",
        description:
            "Designing sleek, interactive dark-mode user interfaces focused on performance, accessibility, and micro-interactions.",
        icon: "layers",
        color: "cyan",
        tags: ["Responsive UI", "Design Systems", "UX"],
    },
    {
        number: "03",
        title: "Backend & Database",
        description:
            "Architecting secure REST and GraphQL APIs, database schemas, and reliable services for production-ready applications.",
        icon: "server",
        color: "emerald",
        tags: ["REST APIs", "SQL", "Databases"],
    },
];

// Color themes for the service cards.
// (Full class names are written out so Tailwind can detect them.)
const accents = {
    emerald: {
        topLine: "via-emerald-400/60",
        border: "from-emerald-400/70 to-cyan-400/30",
        glow: "bg-emerald-400/[0.07] group-hover:bg-emerald-400/20",
        tile: "border-emerald-400/30 bg-gradient-to-br from-emerald-400/25 to-emerald-400/[0.04] text-emerald-400 shadow-[0_0_30px_rgba(0,214,160,0.18)]",
        number: "group-hover:text-emerald-400/15",
        bar: "from-emerald-400 to-cyan-400",
        dot: "bg-emerald-400",
        tag: "group-hover:border-emerald-400/30",
    },
    cyan: {
        topLine: "via-cyan-400/60",
        border: "from-cyan-400/70 to-emerald-400/30",
        glow: "bg-cyan-400/[0.07] group-hover:bg-cyan-400/20",
        tile: "border-cyan-400/30 bg-gradient-to-br from-cyan-400/25 to-cyan-400/[0.04] text-cyan-400 shadow-[0_0_30px_rgba(0,214,230,0.18)]",
        number: "group-hover:text-cyan-400/15",
        bar: "from-cyan-400 to-emerald-400",
        dot: "bg-cyan-400",
        tag: "group-hover:border-cyan-400/30",
    },
};

/* ==========================================================================
   2. ICONS
   ========================================================================== */

// Icons used inside the service cards
function ServiceIcon({ type }: { type: string }) {
    if (type === "code") {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                className="h-7 w-7 sm:h-8 sm:w-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"
                />
            </svg>
        );
    }

    if (type === "layers") {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 sm:h-8 sm:w-8"
            >
                <path d="m12 2 10 5-10 5L2 7l10-5Zm-9.5 9.2L12 16l9.5-4.8L24 13l-12 6L0 13l2.5-1.8Zm0 5L12 21l9.5-4.8L24 18l-12 6L0 18l2.5-1.8Z" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-7 w-7 sm:h-8 sm:w-8"
        >
            <rect x="3" y="4" width="18" height="7" rx="2" />
            <rect x="3" y="13" width="18" height="7" rx="2" />
            <path
                strokeLinecap="round"
                d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6"
            />
        </svg>
    );
}

// Arrow used in the "View Projects" button (slides up-right on hover)
function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
            aria-hidden="true"
        >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
        </svg>
    );
}

// Mail icon used in the "Get in Touch" button
function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}

/* ==========================================================================
   3. HOOKS
   ========================================================================== */

// Returns `visible = true` once the element has scrolled into view
function useInView<T extends HTMLElement>(threshold = 0.12) {
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
            { threshold },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

/* ==========================================================================
   4. SECTION HEADING
   ========================================================================== */

function SectionHeading({ visible }: { visible: boolean }) {
    return (
        <div
            className={`mb-14 text-center transition-all duration-1000 sm:mb-20 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-emerald-400 sm:text-sm">
                A little about me
            </p>

            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Engineering Digital Experiences
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
        </div>
    );
}

/* ==========================================================================
   5. PROFILE + ORBITING TECHNOLOGIES
   ========================================================================== */

function TechOrbit() {
    return (
        // "group/orbit" lets the whole orbit pause when you hover over it
        <div className="group/orbit relative mx-auto aspect-square w-full max-w-[420px]">
            {/* Orbit path (dashed ring) */}
            <div className="absolute inset-[6%] rounded-full border border-dashed border-cyan-400/30" />

            {/* Soft glow behind the picture */}
            <div className="absolute inset-[18%] rounded-full bg-cyan-400/[0.07] blur-2xl" />

            {/* Profile portrait */}
            <div className="absolute left-1/2 top-1/2 z-10 aspect-square w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-500 p-[3px] shadow-[0_0_45px_rgba(0,214,230,0.20)] transition duration-500 hover:scale-[1.04] hover:shadow-[0_0_65px_rgba(0,214,230,0.35)]">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-[#07111c] bg-[#111c30]">
                    <img
                        src="/my_picture.png"
                        alt="Sheikh Hamim Islam Raju"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>

            {/* Rotating layer: carries every badge around the picture */}
            <div className="absolute inset-0 z-20 animate-orbit group-hover/orbit:[animation-play-state:paused]">
                {technologies.map((tech, index) => {
                    // Evenly spaced angle, starting from the top
                    const angle =
                        (((360 / technologies.length) * index - 90) * Math.PI) /
                        180;
                    const left = (50 + ORBIT_RADIUS * Math.cos(angle)).toFixed(2);
                    const top = (50 + ORBIT_RADIUS * Math.sin(angle)).toFixed(2);

                    return (
                        <div
                            key={tech.label}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${left}%`, top: `${top}%` }}
                        >
                            {/* Counter-rotation keeps the text upright */}
                            <div className="animate-orbit [animation-direction:reverse] group-hover/orbit:[animation-play-state:paused]">
                                <div
                                    className={`grid h-10 w-10 place-items-center border border-cyan-400/40 bg-slate-950 text-xs font-extrabold shadow-[0_0_20px_rgba(0,214,230,0.15)] transition duration-300 hover:scale-125 sm:h-11 sm:w-11 sm:text-sm ${
                                        tech.shape === "square"
                                            ? "rounded-xl"
                                            : "rounded-full"
                                    } ${tech.color}`}
                                >
                                    {tech.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating accent dots */}
            <span className="absolute right-[5%] top-[72%] h-4 w-4 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_20px_#06b6d4]" />
            <span className="absolute left-[58%] top-[6%] h-2 w-2 animate-ping rounded-full bg-emerald-400" />
        </div>
    );
}

/* ==========================================================================
   6. STATS STRIP  (one panel, 3 columns on every screen size)
   ========================================================================== */

function StatsStrip() {
    return (
        <div className="mt-9 grid grid-cols-3 divide-x divide-slate-700/50 overflow-hidden rounded-2xl border border-slate-700/40 bg-[#101827]/85 backdrop-blur">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="group relative px-2 py-4 text-center transition duration-300 hover:bg-emerald-400/[0.06] sm:px-4 sm:py-6"
                >
                    {/* Accent line that grows on hover */}
                    <span className="absolute inset-x-0 top-0 mx-auto h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                    <p className="break-words bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-sm font-extrabold text-transparent sm:text-xl lg:text-2xl">
                        {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400 sm:text-sm">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

/* ==========================================================================
   7. BIOGRAPHY (text, stats, buttons)
   ========================================================================== */

function Biography({ visible }: { visible: boolean }) {
    return (
        <div
            className={`transition-all delay-300 duration-1000 ${
                visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
        >
            {/* Small label */}
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 sm:text-sm">
                Who I am
            </p>

            {/* Name */}
            <h3 className="mb-4 text-3xl font-extrabold leading-tight tracking-[-0.055em] text-cyan-400 sm:text-4xl lg:text-5xl">
                Sheikh Hamim Islam Raju
            </h3>

            {/* Title with blinking cursor */}
            <p className="mb-6 font-mono text-lg font-bold tracking-wide text-white sm:text-xl">
                Software Developer{" "}
                <span className="animate-pulse text-cyan-400">|</span>
            </p>

            {/* Description */}
            <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                I build scalable, modern applications with a strong focus on
                clean architecture, delightful UX, and performance. My toolkit
                spans React, Next.js, Node.js, and RESTful APIs — bringing
                ideas to life from concept to production with robust services
                and smooth interfaces.
            </p>

            {/* Stats */}
            <StatsStrip />

            {/* Action buttons (side by side, also on mobile) */}
            <div className="mt-8 flex w-full flex-nowrap items-center gap-3 sm:w-auto sm:gap-4">
                {/* Primary: gradient + glow + shine sweep */}
                <a
                    href="#projects"
                    className="group relative inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 text-sm font-bold text-slate-950 shadow-[0_8px_30px_rgba(0,214,160,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,214,200,0.45)] sm:flex-none sm:px-8 sm:text-base"
                >
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-all duration-700 group-hover:left-[150%]" />
                    <span className="relative">View Projects</span>
                    <span className="relative">
                        <ArrowIcon />
                    </span>
                </a>

                {/* Secondary: glass outline that fills on hover */}
                <a
                    href="#contact"
                    className="group inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/40 bg-cyan-400/[0.06] px-5 text-sm font-bold text-cyan-300 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300 hover:shadow-[0_10px_35px_rgba(0,214,160,0.2)] sm:flex-none sm:px-8 sm:text-base"
                >
                    Get in Touch
                    <MailIcon />
                </a>
            </div>
        </div>
    );
}

/* ==========================================================================
   8. SERVICE CARDS
   ========================================================================== */

function ServiceCard({
    service,
    index,
    visible,
}: {
    service: (typeof services)[number];
    index: number;
    visible: boolean;
}) {
    const accent = accents[service.color as keyof typeof accents];

    return (
        // Outer wrapper = 1px border. The gradient border fades in on hover.
        <article
            className={`group relative rounded-[26px] bg-slate-700/40 p-px transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
                transitionDelay: visible ? `${450 + index * 150}ms` : "0ms",
            }}
        >
            {/* Gradient border (visible on hover) */}
            <span
                className={`pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100 ${accent.border}`}
            />

            {/* Card body */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] bg-[#0a1220] p-6 sm:p-8">
                {/* Thin glowing line along the top edge */}
                <span
                    className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${accent.topLine}`}
                />

                {/* Corner glow */}
                <span
                    className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition duration-500 ${accent.glow}`}
                />

                {/* Big faded number in the background */}
                <span
                    className={`pointer-events-none absolute right-5 top-3 select-none font-mono text-6xl font-extrabold text-white/[0.04] transition duration-500 sm:text-7xl ${accent.number}`}
                >
                    {service.number}
                </span>

                {/* Icon + title */}
                <div className="relative mb-5 flex items-center gap-4 sm:mb-6">
                    <div
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition duration-300 group-hover:scale-110 group-hover:-rotate-3 sm:h-16 sm:w-16 ${accent.tile}`}
                    >
                        <ServiceIcon type={service.icon} />
                    </div>

                    <h4 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                        {service.title}
                    </h4>
                </div>

                {/* Description */}
                <p className="relative mb-6 text-sm leading-7 text-slate-400 sm:text-base">
                    {service.description}
                </p>

                {/* Tags (pushed to the bottom so all cards line up) */}
                <div className="relative mt-auto flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition ${accent.tag}`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                            />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bar that grows along the bottom on hover */}
                <span
                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${accent.bar}`}
                />
            </div>
        </article>
    );
}

/* ==========================================================================
   9. ABOUT SECTION  (background + layout)
   ========================================================================== */

export default function About() {
    const { ref, visible } = useInView<HTMLElement>();

    return (
        <section
            id="about"
            ref={ref}
            className="relative isolate overflow-hidden bg-[#030a12] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
        >
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_28%,rgba(0,100,83,0.22),transparent_48%),radial-gradient(ellipse_at_12%_45%,rgba(0,52,91,0.14),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-size:137px_151px] [background-position:25px_30px]" />

            <div className="mx-auto max-w-[1400px]">
                {/* Heading */}
                <SectionHeading visible={visible} />

                {/* Profile (left) + biography (right) */}
                <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16 xl:gap-24">
                    <div
                        className={`mx-auto w-full max-w-[440px] transition-all delay-150 duration-1000 ${
                            visible
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-10 scale-95 opacity-0"
                        }`}
                    >
                        <TechOrbit />
                    </div>

                    <Biography visible={visible} />
                </div>

                {/* Service cards */}
                <div className="mt-16 grid gap-5 sm:mt-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.number}
                            service={service}
                            index={index}
                            visible={visible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}