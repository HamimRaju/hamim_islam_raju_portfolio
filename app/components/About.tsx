"use client";

import { useEffect, useRef, useState } from "react";

const technologies = [
    {
        label: "JS",
        position: "left-[30%] top-[2%]",
        color: "text-yellow-300",
        bg: "bg-yellow-400",
        shape: "square",
    },
    {
        label: "⑂",
        position: "right-[17%] top-[9%]",
        color: "text-blue-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "◆",
        position: "right-[0%] top-[37%]",
        color: "text-cyan-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "✿",
        position: "right-[0%] bottom-[19%]",
        color: "text-cyan-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "TS",
        position: "left-[48%] bottom-[0%]",
        color: "text-cyan-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "≋",
        position: "left-[13%] bottom-[3%]",
        color: "text-cyan-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "JS",
        position: "left-[0%] top-[55%]",
        color: "text-emerald-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
    {
        label: "✦",
        position: "left-[2%] top-[25%]",
        color: "text-emerald-400",
        bg: "bg-slate-950",
        shape: "circle",
    },
];

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

function ServiceIcon({ type }: { type: string }) {
    if (type === "code") {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                className="h-8 w-8"
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
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
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
            className="h-8 w-8"
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

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

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
            { threshold: 0.12 },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative isolate overflow-hidden bg-[#030a12] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_28%,rgba(0,100,83,0.22),transparent_48%),radial-gradient(ellipse_at_12%_45%,rgba(0,52,91,0.14),transparent_40%)]" />

            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-size:137px_151px] [background-position:25px_30px]" />

            <div className="mx-auto max-w-[1400px]">
                {/* Section heading */}
                <div
                    className={`mb-14 text-center transition-all duration-1000 sm:mb-20 ${
                        visible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
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

                {/* Profile and introduction */}
                <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16 xl:gap-24">
                    {/* Animated technology orbit */}
                    <div
                        className={`mx-auto w-full max-w-[440px] transition-all delay-150 duration-1000 ${
                            visible
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-10 scale-95 opacity-0"
                        }`}
                    >
                        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                            {/* Orbit path */}
                            <div className="absolute inset-[9%] animate-orbit rounded-full border border-dashed border-cyan-400/30" />

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

                            {/* Orbiting technology badges */}
                            {technologies.map((tech, index) => (
                                <div
                                    key={`${tech.label}-${index}`}
                                    className={`absolute z-20 ${tech.position} animate-float`}
                                    style={{
                                        animationDelay: `${index * -0.35}s`,
                                    }}
                                >
                                    <div
                                        className={`grid h-10 w-10 place-items-center border border-cyan-400/40 text-sm font-extrabold shadow-[0_0_20px_rgba(0,214,230,0.15)] transition duration-300 hover:scale-125 sm:h-11 sm:w-11 ${
                                            tech.shape === "square"
                                                ? "rounded-xl"
                                                : "rounded-full"
                                        } ${tech.bg} ${tech.color}`}
                                    >
                                        {tech.label}
                                    </div>
                                </div>
                            ))}

                            {/* Floating accent dots */}
                            <span className="absolute right-[5%] top-[72%] h-4 w-4 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_20px_#06b6d4]" />
                            <span className="absolute left-[58%] top-[6%] h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                        </div>
                    </div>

                    {/* Biography */}
                    <div
                        className={`transition-all delay-300 duration-1000 ${
                            visible
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 sm:text-sm">
                            Who I am
                        </p>

                        <h3 className="mb-4 text-3xl font-extrabold leading-tight tracking-[-0.055em] text-cyan-400 sm:text-4xl lg:text-5xl">
                            Sheikh Hamim Islam Raju
                        </h3>

                        <p className="mb-6 font-mono text-lg font-bold tracking-wide text-white sm:text-xl">
                            Software Developer{" "}
                            <span className="animate-pulse text-cyan-400">
                                |
                            </span>
                        </p>

                        <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                            I build scalable, modern applications with a strong
                            focus on clean architecture, delightful UX, and
                            performance. My toolkit spans React, Next.js,
                            Node.js, and RESTful APIs — bringing ideas to life
                            from concept to production with robust services and
                            smooth interfaces.
                        </p>

                        {/* Stats */}
                        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                            {[
                                { label: "Experience", value: "1 year +" },
                                { label: "Specialty", value: "Full Stack" },
                                { label: "Focus", value: "Development" },
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="group rounded-2xl border border-slate-700/40 bg-[#101827]/85 px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#12232d]"
                                    style={{
                                        transitionDelay: visible
                                            ? `${index * 100}ms`
                                            : "0ms",
                                    }}
                                >
                                    <p className="mb-2 text-sm text-slate-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-lg font-extrabold text-white sm:text-xl">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-50"
                            >
                                View Projects <span className="ml-2">↗</span>
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700/60 bg-[#101827] px-7 font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-400"
                            >
                                Get in Touch <span className="ml-2">↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Service cards */}
                <div className="mt-20 grid gap-6 sm:mt-24 lg:grid-cols-3 lg:gap-7">
                    {services.map((service, index) => (
                        <article
                            key={service.number}
                            className={`group relative overflow-hidden rounded-[26px] border border-slate-700/45 bg-[#0c1524]/90 p-7 transition-all duration-700 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)] sm:p-9 ${
                                visible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }`}
                            style={{
                                transitionDelay: visible
                                    ? `${450 + index * 150}ms`
                                    : "0ms",
                            }}
                        >
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/[0.04] blur-3xl transition duration-500 group-hover:bg-emerald-400/10" />

                            <div
                                className={`relative mb-7 grid h-16 w-16 place-items-center rounded-[19px] border transition duration-300 group-hover:scale-110 ${
                                    service.color === "cyan"
                                        ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-400"
                                        : "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400"
                                }`}
                            >
                                <ServiceIcon type={service.icon} />
                            </div>

                            <div className="mb-3 flex items-center justify-between gap-3">
                                <h4 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                                    {service.title}
                                </h4>
                                <span className="font-mono text-xs text-slate-600">
                                    {service.number}
                                </span>
                            </div>

                            <p className="mb-6 text-sm leading-7 text-slate-400 sm:text-base">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-slate-700/60 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition group-hover:border-emerald-400/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
