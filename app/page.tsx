"use client";

import { useEffect, useState } from "react";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

/* ==========================================================================
   1. DATA  (edit text, links and roles here)
   ========================================================================== */

// Navigation links: [label, href]
const navItems = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
];

// Roles shown with the typing animation in the hero
const roles = ["Software Engineer", "MERN Stack Developer", "Problem Solver"];

/* ==========================================================================
   2. ICONS
   ========================================================================== */

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M5.1 3.4a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.3 9.1h3.6v11.6H3.3V9.1Zm5.8 0h3.45v1.58h.05c.48-.91 1.65-1.87 3.4-1.87 3.64 0 4.32 2.4 4.32 5.52v6.37h-3.6v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.75H9.1V9.1Z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8h3.4Z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 group-hover:animate-bounce"
            aria-hidden="true"
        >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
        </svg>
    );
}

/* ==========================================================================
   3. SOCIAL LINKS DATA  (used in header, mobile menu and hero)
   ========================================================================== */

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/HamimRaju",
        icon: <GithubIcon />,
        external: true,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sheikh-hamim-islam-raju-506a1b270/?isSelfProfile=true",
        icon: <LinkedInIcon />,
        external: true,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/hamim.islam.raju.2025/",
        icon: <FacebookIcon />,
        external: true,
    },
    {
        label: "Email",
        href: "mailto:rajumcsk@gmail.com",
        icon: <EmailIcon />,
        external: false,
    },
];

// Only external links open in a new tab; mailto: stays in the same tab
const linkProps = (external: boolean) =>
    external ? { target: "_blank", rel: "noreferrer" } : {};

/* ==========================================================================
   4. HOOKS
   ========================================================================== */

// Typing animation: types a word, pauses, deletes it, then moves to the next
function useTypewriter(
    words: string[],
    typingSpeed = 90,
    deletingSpeed = 50,
    pauseTime = 1400
) {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const isFullWord = text === current;

        let delay = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && isFullWord) delay = pauseTime;
        if (isDeleting && text === "") delay = 300;

        const timer = window.setTimeout(() => {
            if (!isDeleting && isFullWord) {
                setIsDeleting(true);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setWordIndex((i) => (i + 1) % words.length);
            } else {
                setText(current.slice(0, text.length + (isDeleting ? -1 : 1)));
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}

/* ==========================================================================
   5. ROBOT ILLUSTRATION
   ========================================================================== */

function Robot() {
    return (
        <div className="relative mx-auto aspect-[1/1.08] w-full max-w-[300px] animate-float sm:max-w-[380px] lg:max-w-[450px]">
            {/* Background circle + glow */}
            <div className="absolute left-1/2 top-[8%] aspect-square w-full -translate-x-1/2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.07] shadow-[inset_0_0_80px_rgba(0,214,160,0.06)]" />
            <div className="absolute left-1/2 top-[20%] aspect-square w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

            {/* Antenna */}
            <div className="absolute left-1/2 top-[10%] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-400/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_15px_#00e6ed]" />
            </div>

            {/* Head + eyes */}
            <div className="absolute left-1/2 top-[17%] flex h-[47%] w-[67%] -translate-x-1/2 items-center justify-center rounded-[42%_42%_30%_30%] border-2 border-teal-400 bg-gradient-to-br from-teal-700 via-teal-950 to-teal-700 shadow-[inset_0_0_0_12px_rgba(0,20,28,0.35)]">
                <div className="flex h-[64%] w-[77%] items-center justify-evenly rounded-[24%] border-[3px] border-teal-600 bg-gradient-to-br from-slate-900 to-slate-950">
                    <span className="h-[38%] w-[12%] animate-pulse rounded-md bg-rose-500 shadow-[0_0_12px_#ff416d]" />
                    <span className="h-[38%] w-[12%] animate-pulse rounded-md bg-rose-500 shadow-[0_0_12px_#ff416d]" />
                </div>
            </div>

            {/* Neck */}
            <div className="absolute left-1/2 top-[62%] flex h-[7%] w-[32%] -translate-x-1/2 justify-between px-2">
                <span className="h-full w-1.5 rounded-full bg-teal-500" />
                <span className="h-full w-1.5 rounded-full bg-teal-500" />
            </div>

            {/* Body + arms */}
            <div className="absolute left-1/2 top-[66%] h-[29%] w-[78%] -translate-x-1/2 rounded-[18%_18%_15%_15%] border border-teal-400/30 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-950">
                <span className="absolute left-1/2 top-[35%] h-[42%] w-[49%] -translate-x-1/2 bg-teal-950 [clip-path:polygon(0_0,100%_0,81%_100%,19%_100%)]" />
                <span className="absolute -left-[7%] top-[35%] h-[28%] w-[13%] rounded-xl border-2 border-cyan-400 bg-slate-900" />
                <span className="absolute -right-[7%] top-[35%] h-[28%] w-[13%] rounded-xl border-2 border-cyan-400 bg-slate-900" />
            </div>

            {/* Feet */}
            <div className="absolute left-1/2 top-[91%] flex h-[8%] w-[58%] -translate-x-1/2 justify-between">
                <span className="h-[85%] w-[40%] rounded-[50%] border-2 border-emerald-400 bg-slate-900" />
                <span className="h-[85%] w-[40%] rounded-[50%] border-2 border-emerald-400 bg-slate-900" />
            </div>

            {/* Ground shadow */}
            <div className="absolute bottom-0 left-1/2 -z-10 h-5 w-2/3 -translate-x-1/2 rounded-full bg-black/70 blur-sm" />
        </div>
    );
}

/* ==========================================================================
   6. HEADER  (logo, nav, social icons, mobile menu button)
   ========================================================================== */

function Header({
    menuOpen,
    setMenuOpen,
}: {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}) {
    return (
        <header className="sticky top-0 z-50 mx-auto flex w-full max-w-[1800px] items-center justify-between gap-3 border-b border-emerald-400/10 bg-[#030710]/95 px-4 py-4 shadow-lg shadow-black/10 backdrop-blur-md sm:px-6 sm:py-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[3.8%] lg:py-5">
            {/* Logo */}
            <a
                href="#home"
                className="shrink-0 text-xl font-extrabold tracking-[-1.5px] sm:text-2xl lg:text-[27px]"
            >
                <span className="text-emerald-400">Hamim Islam </span>
                Raju
                <span className="text-emerald-400">.</span>
            </a>

            {/* Navigation (dropdown on mobile, pill on desktop) */}
            <nav
                className={`${menuOpen ? "flex" : "hidden"} absolute left-4 right-4 top-full mt-2 flex-col gap-1 rounded-2xl border border-emerald-400/20 bg-[#071421] p-3 shadow-2xl sm:left-6 sm:right-6 lg:static lg:mt-0 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-0 lg:rounded-full lg:border lg:bg-slate-950/70 lg:p-2`}
            >
                {navItems.map(([label, href], index) => (
                    <a
                        key={href}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition hover:text-emerald-400 lg:rounded-full lg:px-3 xl:px-4 ${
                            index === 0 ? "text-emerald-400" : "text-slate-300"
                        }`}
                    >
                        {label}
                        {index === 0 && (
                            <span className="ml-2 inline-block h-1 w-6 rounded-full bg-emerald-400 align-middle lg:hidden" />
                        )}
                    </a>
                ))}

                {/* Social icons inside the mobile menu */}
                <div className="mt-2 flex items-center gap-5 border-t border-emerald-400/10 px-4 pt-4 text-slate-300 lg:hidden">
                    {socialLinks.map(({ label, href, icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            {...linkProps(external)}
                            aria-label={label}
                            className="transition hover:text-emerald-400"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Social icons: top right (desktop only) */}
            <div className="hidden items-center justify-self-end gap-5 text-slate-300 lg:flex xl:gap-7">
                {socialLinks.map(({ label, href, icon, external }) => (
                    <a
                        key={label}
                        href={href}
                        {...linkProps(external)}
                        aria-label={label}
                        title={label}
                        className="transition hover:text-emerald-400"
                    >
                        {icon}
                    </a>
                ))}
            </div>

            {/* Hamburger button (mobile only) */}
            <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-400/25 bg-slate-900 lg:hidden"
            >
                <span className="h-0.5 w-5 rounded bg-emerald-400" />
                <span className="h-0.5 w-5 rounded bg-emerald-400" />
                <span className="h-0.5 w-5 rounded bg-emerald-400" />
            </button>
        </header>
    );
}

/* ==========================================================================
   7. HERO SECTION
   ========================================================================== */

function Hero() {
    const typedRole = useTypewriter(roles);

    return (
        <section className="mx-auto grid min-h-0 w-full max-w-[1800px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-10 sm:px-10 sm:pb-16 sm:pt-12 lg:min-h-[calc(100svh-100px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:px-[3.8%] lg:pb-20 lg:pt-10">
            {/* ---------- Left: text content ---------- */}
            <div className="animate-hero-in relative z-10">
                {/* Role badge with typing animation */}
                <div className="mb-6 inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.07] px-4 py-2 font-mono text-sm font-bold text-emerald-400 sm:mb-7 sm:text-lg">
                    <span>{typedRole}</span>
                    <span className="h-5 w-0.5 animate-pulse bg-emerald-400" />
                </div>

                {/* Greeting */}
                <p className="mb-4 text-xl font-bold tracking-tight text-cyan-400 sm:mb-5 sm:text-3xl lg:text-4xl">
                    Hello, I&apos;m
                </p>

                {/* Name */}
                <h1 className="mb-5 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-white sm:mb-6">
                    Sheikh Hamim
                    <br />
                    Islam Raju
                </h1>

                {/* Intro text */}
                <p className="mb-8 max-w-2xl text-base leading-7 tracking-tight text-slate-400 sm:text-lg sm:leading-8 lg:text-xl">
                    Turning vision into reality through elegant code. I
                    specialize in building full-stack web applications,
                    scalable APIs, and intuitive user experiences that
                    inspire and leave a lasting impression.
                </p>

                {/* Buttons (always side by side, even on mobile) */}
                <div className="flex w-full flex-nowrap items-center gap-3 sm:w-auto sm:gap-4">
                    <a
                        href="#projects"
                        className="inline-flex min-h-[50px] flex-1 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,214,160,0.22)] sm:min-h-[58px] sm:flex-none sm:px-8 sm:text-base"
                    >
                        View My Work
                    </a>

                    <a
                        href="/resume.pdf"
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)] sm:min-h-[58px] sm:flex-none sm:px-8 sm:text-base"
                    >
                        My Resume
                        <DownloadIcon />
                    </a>
                </div>

                {/* Social links */}
                <div className="mt-10 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
                    {socialLinks.map(({ label, href, icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            {...linkProps(external)}
                            aria-label={`${label}${external ? " profile" : ""}`}
                            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-700/40 bg-slate-800/50 text-slate-300 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-400 sm:h-[60px] sm:w-[60px] sm:rounded-[19px]"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* ---------- Right: robot illustration ---------- */}
            <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none">
                <Robot />
            </div>
        </section>
    );
}

/* ==========================================================================
   8. PAGE  (background + section order)
   ========================================================================== */

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main
            id="home"
            className="relative isolate min-h-screen overflow-x-clip bg-[#030710] text-white"
        >
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_42%,rgba(0,91,83,0.24),transparent_38%),linear-gradient(115deg,#030610,#030b14_58%,#03151c)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px),radial-gradient(circle,#80aabb_1px,transparent_1.5px)] [background-position:15px_25px,80px_90px] [background-size:181px_163px,263px_229px]" />

            {/* Sections */}
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
        </main>
    );
}