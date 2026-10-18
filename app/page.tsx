"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

/* ==========================================================================
   1. DATA  (edit text, links and roles here)
   ========================================================================== */

// Navigation links: [label, href]. The href must match each section's id.
const navItems = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
];

// Section ids (same order as navItems), used to detect the current section
const sectionIds = navItems.map(([, href]) => href.slice(1));

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

function ArrowUpIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
        >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
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

// Returns `visible = true` once the element scrolls into view
function useInView<T extends HTMLElement>(threshold = 0.1) {
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

/*
  Scroll engine. One scroll listener does three jobs:
   1. Writes `--scroll` (pixels) and `--progress` (0 to 1) as CSS variables on
      <main>. Parallax and the progress bar read them, so nothing re-renders
      while you scroll.
   2. Scroll-spy: works out which section you are in (`activeId`).
   3. Shows the "back to top" button after scrolling down (`showTop`).
*/
function useScrollEffects(mainRef: RefObject<HTMLElement | null>) {
    const [activeId, setActiveId] = useState("home");
    const [showTop, setShowTop] = useState(false);

    // While a nav link was just clicked, scroll-spy pauses so the highlight
    // does not flicker through the sections you scroll past.
    const lockUntil = useRef(0);

    // Smooth scrolling + space for the sticky header when jumping to a section
    useEffect(() => {
        const root = document.documentElement;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const previous = {
            behavior: root.style.scrollBehavior,
            padding: root.style.scrollPaddingTop,
        };

        if (!reduce) root.style.scrollBehavior = "smooth";
        root.style.scrollPaddingTop = "80px";

        return () => {
            root.style.scrollBehavior = previous.behavior;
            root.style.scrollPaddingTop = previous.padding;
        };
    }, []);

    useEffect(() => {
        const main = mainRef.current;
        if (!main) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let frame = 0;

        const update = () => {
            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                const root = document.documentElement;
                const y = window.scrollY;
                const max = root.scrollHeight - window.innerHeight;

                // 1. CSS variables for parallax / progress bar
                main.style.setProperty(
                    "--progress",
                    String(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
                );
                main.style.setProperty("--scroll", reduce ? "0" : String(Math.round(y)));

                // 3. Back-to-top visibility
                setShowTop(y > 600);

                // 2. Scroll-spy
                if (Date.now() < lockUntil.current) return;

                const line = window.innerHeight * 0.35;
                let current = sectionIds[0];

                for (const id of sectionIds.slice(1)) {
                    const element = document.getElementById(id);
                    if (element && element.getBoundingClientRect().top <= line) {
                        current = id;
                    }
                }

                // At the very bottom, the last section is the active one
                if (y + window.innerHeight >= root.scrollHeight - 4) {
                    current = sectionIds[sectionIds.length - 1];
                }

                setActiveId(current);
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
    }, [mainRef]);

    // Call when a nav link is clicked: highlight it right away
    function goTo(id: string) {
        lockUntil.current = Date.now() + 1000;
        setActiveId(id);
    }

    return { activeId, showTop, goTo };
}

/* ==========================================================================
   5. SCROLL UI  (progress bar, back-to-top button, section divider)
   ========================================================================== */

// Thin bar at the very top that fills as you scroll down the page
function ScrollProgress() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
        >
            <div
                className="h-full origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                style={{ transform: "scaleX(var(--progress, 0))" }}
            />
        </div>
    );
}

// Round button with a progress ring. Appears after you scroll down.
function BackToTop({ visible, onClick }: { visible: boolean; onClick: () => void }) {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Back to top"
            className={`group fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#071421]/90 text-emerald-400 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(52,211,153,0.45)] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14 ${
                visible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none translate-y-6 scale-75 opacity-0"
            }`}
        >
            <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke="rgba(148,163,184,0.2)"
                    strokeWidth="3"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: `calc(${circumference} * (1 - var(--progress, 0)))`,
                    }}
                />
            </svg>
            <ArrowUpIcon />
        </button>
    );
}

// Glowing line that draws itself between sections when scrolled into view
function SectionDivider() {
    const { ref, visible } = useInView<HTMLDivElement>(0.5);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="relative z-10 mx-auto h-px w-full max-w-[1400px] px-6"
        >
            <div
                className={`h-px origin-center bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent transition-transform duration-1000 ease-out ${
                    visible ? "scale-x-100" : "scale-x-0"
                }`}
            />
            <span
                className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-emerald-300 shadow-[0_0_14px_3px_rgba(52,211,153,0.7)] transition-all delay-500 duration-700 ${
                    visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
            />
        </div>
    );
}

/* ==========================================================================
   6. ROBOT ILLUSTRATION
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
   7. NAVIGATION  (sliding hover pill + sliding active pill)
   ========================================================================== */

type Box = { left: number; top: number; width: number; height: number };

function Nav({
    menuOpen,
    activeId,
    onNavigate,
}: {
    menuOpen: boolean;
    activeId: string;
    onNavigate: (id: string) => void;
}) {
    const navRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Position of every link inside the nav (used to place the pills)
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [hover, setHover] = useState({ index: 0, on: false });

    const activeIndex = sectionIds.indexOf(activeId);
    const activeBox = boxes[activeIndex];
    const hoverBox = boxes[hover.index];

    // Measure the links on mount and whenever sizes change
    useEffect(() => {
        const measure = () => {
            setBoxes(
                itemRefs.current.map((element) =>
                    element
                        ? {
                              left: element.offsetLeft,
                              top: element.offsetTop,
                              width: element.offsetWidth,
                              height: element.offsetHeight,
                          }
                        : { left: 0, top: 0, width: 0, height: 0 }
                )
            );
        };

        const observer = new ResizeObserver(measure);
        if (navRef.current) observer.observe(navRef.current);
        itemRefs.current.forEach((element) => element && observer.observe(element));

        document.fonts?.ready.then(measure);

        return () => observer.disconnect();
    }, []);

    return (
        <nav
            ref={navRef}
            aria-label="Main navigation"
            onMouseLeave={() => setHover((current) => ({ ...current, on: false }))}
            className={`absolute left-4 right-4 top-full z-50 mt-2 flex origin-top flex-col gap-1 rounded-2xl border border-emerald-400/20 bg-[#071421] p-3 shadow-2xl transition-all duration-300 sm:left-6 sm:right-6 ${
                menuOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
            } lg:visible lg:relative lg:left-auto lg:right-auto lg:top-auto lg:mt-0 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:justify-center lg:gap-0 lg:rounded-full lg:bg-slate-950/70 lg:p-2 lg:opacity-100`}
        >
            {/* Hover pill: glides to whichever link the mouse is on */}
            {hoverBox && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-xl bg-white/[0.08] transition-all duration-300 ease-out lg:rounded-full"
                    style={{
                        left: hoverBox.left,
                        top: hoverBox.top,
                        width: hoverBox.width,
                        height: hoverBox.height,
                        opacity: hover.on ? 1 : 0,
                    }}
                />
            )}

            {/* Active pill: springs to the section you are currently in */}
            {activeBox && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-xl border border-emerald-400/40 bg-emerald-400/15 shadow-[0_0_22px_rgba(52,211,153,0.35)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:rounded-full"
                    style={{
                        left: activeBox.left,
                        top: activeBox.top,
                        width: activeBox.width,
                        height: activeBox.height,
                    }}
                />
            )}

            {/* Links */}
            {navItems.map(([label, href], index) => {
                const id = href.slice(1);
                const isActive = id === activeId;

                return (
                    <a
                        key={href}
                        ref={(element) => {
                            itemRefs.current[index] = element;
                        }}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onNavigate(id)}
                        onMouseEnter={() => setHover({ index, on: true })}
                        onFocus={() => setHover({ index, on: true })}
                        style={
                            {
                                "--d": menuOpen ? `${80 + index * 45}ms` : "0ms",
                            } as CSSProperties
                        }
                        className={`relative z-10 rounded-xl px-4 py-3 text-sm font-semibold transition-[color,transform,opacity] duration-300 max-lg:[transition-delay:var(--d)] lg:rounded-full lg:px-3 lg:hover:-translate-y-0.5 xl:px-4 ${
                            menuOpen
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-3 opacity-0"
                        } lg:translate-x-0 lg:opacity-100 ${
                            isActive ? "text-emerald-400" : "text-white"
                        }`}
                    >
                        {label}
                    </a>
                );
            })}

            {/* Social icons inside the mobile menu */}
            <div
                className={`mt-2 flex items-center gap-5 border-t border-emerald-400/10 px-4 pt-4 text-slate-300 transition-all duration-500 lg:hidden ${
                    menuOpen ? "translate-y-0 opacity-100 delay-300" : "translate-y-2 opacity-0"
                }`}
            >
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
    );
}

/* ==========================================================================
   8. HEADER  (logo, nav, social icons, mobile menu button)
   ========================================================================== */

function Header({
    menuOpen,
    setMenuOpen,
    activeId,
    onNavigate,
}: {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    activeId: string;
    onNavigate: (id: string) => void;
}) {
    const headerRef = useRef<HTMLElement>(null);

    // Close the mobile menu when tapping outside it or pressing Escape
    useEffect(() => {
        if (!menuOpen) return;

        const onPointerDown = (event: PointerEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [menuOpen, setMenuOpen]);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 mx-auto flex w-full max-w-[1800px] items-center justify-between gap-3 border-b border-emerald-400/10 bg-[#030710]/95 px-4 py-4 shadow-lg shadow-black/10 backdrop-blur-md sm:px-6 sm:py-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[3.8%] lg:py-5"
        >
            {/* Logo */}
            <a
                href="#home"
                onClick={() => onNavigate("home")}
                className="shrink-0 text-xl font-extrabold tracking-[-1.5px] sm:text-2xl lg:text-[27px]"
            >
                <span className="text-emerald-400">Hamim Islam </span>
                Raju
                <span className="text-emerald-400">.</span>
            </a>

            {/* Navigation */}
            <Nav menuOpen={menuOpen} activeId={activeId} onNavigate={onNavigate} />

            {/* Social icons: top right (desktop only) */}
            <div className="hidden items-center justify-self-end gap-5 text-slate-300 lg:flex xl:gap-7">
                {socialLinks.map(({ label, href, icon, external }) => (
                    <a
                        key={label}
                        href={href}
                        {...linkProps(external)}
                        aria-label={label}
                        title={label}
                        className="transition duration-300 hover:-translate-y-0.5 hover:text-emerald-400"
                    >
                        {icon}
                    </a>
                ))}
            </div>

            {/* Hamburger button (turns into an X when open) */}
            <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-400/25 bg-slate-900 lg:hidden"
            >
                <span
                    className={`h-0.5 w-5 rounded bg-emerald-400 transition-all duration-300 ${
                        menuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                />
                <span
                    className={`h-0.5 w-5 rounded bg-emerald-400 transition-all duration-300 ${
                        menuOpen ? "scale-x-0 opacity-0" : ""
                    }`}
                />
                <span
                    className={`h-0.5 w-5 rounded bg-emerald-400 transition-all duration-300 ${
                        menuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                />
            </button>
        </header>
    );
}

/* ==========================================================================
   9. HERO SECTION  (with parallax on scroll)
   ========================================================================== */

function Hero() {
    const typedRole = useTypewriter(roles);

    return (
        <section className="relative mx-auto grid min-h-0 w-full max-w-[1800px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-10 sm:px-10 sm:pb-16 sm:pt-12 lg:min-h-[calc(100svh-100px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:px-[3.8%] lg:pb-20 lg:pt-10">
            {/* Parallax glow orbs (move at different speeds while scrolling) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] will-change-transform"
                style={{ transform: "translate3d(0, calc(var(--scroll, 0) * 0.25px), 0)" }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px] will-change-transform"
                style={{ transform: "translate3d(0, calc(var(--scroll, 0) * -0.15px), 0)" }}
            />

            {/* ---------- Left: text content (drifts up and fades on scroll) ---------- */}
            <div
                className="relative z-10 will-change-transform"
                style={{
                    transform: "translate3d(0, calc(var(--scroll, 0) * -0.05px), 0)",
                    opacity: "max(0.15, calc(1 - var(--scroll, 0) / 800))",
                }}
            >
                <div className="animate-hero-in">
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
            </div>

            {/* ---------- Right: robot (drifts down and shrinks slightly on scroll) ---------- */}
            <div
                className="relative mx-auto flex w-full max-w-[500px] items-center justify-center will-change-transform lg:max-w-none"
                style={{
                    transform:
                        "translate3d(0, calc(var(--scroll, 0) * 0.12px), 0) scale(max(0.8, calc(1 - var(--scroll, 0) / 3500)))",
                }}
            >
                <Robot />
            </div>

            {/* Scroll cue (desktop): fades out as soon as you start scrolling */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
                style={{ opacity: "max(0, calc(1 - var(--scroll, 0) / 160))" }}
            >
                <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500">
                    SCROLL
                </span>
                <span className="flex h-9 w-5 justify-center rounded-full border border-slate-600 pt-2">
                    <span className="h-2 w-1 animate-bounce rounded-full bg-emerald-400" />
                </span>
            </div>
        </section>
    );
}

/* ==========================================================================
   10. PAGE  (background + section order)
   ========================================================================== */

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const mainRef = useRef<HTMLElement>(null);
    const { activeId, showTop, goTo } = useScrollEffects(mainRef);

    // Clicking a nav link: highlight it right away and close the mobile menu
    function handleNavigate(id: string) {
        goTo(id);
        setMenuOpen(false);
    }

    function scrollToTop() {
        goTo("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <main
            ref={mainRef}
            id="home"
            className="relative isolate min-h-screen overflow-x-clip bg-[#030710] text-white"
        >
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_42%,rgba(0,91,83,0.24),transparent_38%),linear-gradient(115deg,#030610,#030b14_58%,#03151c)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px),radial-gradient(circle,#80aabb_1px,transparent_1.5px)] [background-position:15px_25px,80px_90px] [background-size:181px_163px,263px_229px]" />

            {/* Scroll UI */}
            <ScrollProgress />
            <BackToTop visible={showTop} onClick={scrollToTop} />

            {/* Sections */}
            <Header
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                activeId={activeId}
                onNavigate={handleNavigate}
            />
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Contact />
        </main>
    );
}