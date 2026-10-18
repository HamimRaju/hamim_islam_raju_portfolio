"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ==========================================================================
   SCROLL REVEAL  (everything animated on scroll in this file uses this)
   --------------------------------------------------------------------------
   <Reveal from="swing">...</Reveal>      animate any element in
   <RevealWords text="..." />             words fly in from alternating sides
   <RevealChars text="..." />             letters rain down one by one

   Animations REPLAY every time the element comes back into view, both when
   you scroll down and when you scroll back up. Add `once` to play only once.

   Available styles for `from`:
     left, right     slide in from the side (with a small tilt)
     skewLeft,
     skewRight       slide in from the side while straightening out
     up, down        rise from below / drop from above
     zoom            grow from small
     pop             bouncy pop-in
     drop            fall in with a bounce
     spin            spin and grow in
     flip            tilt up in 3D (like a card flipping up)
     swing,
     swingRight      swing open like a door in 3D (left / right hinge)
     wipe            uncover from left to right (for text)
     curtain         uncover from bottom to top
     stretch         grow from the center line (for underlines)
   ========================================================================== */

type RevealFrom =
  | "left"
  | "right"
  | "skewLeft"
  | "skewRight"
  | "up"
  | "down"
  | "zoom"
  | "pop"
  | "drop"
  | "spin"
  | "flip"
  | "swing"
  | "swingRight"
  | "wipe"
  | "curtain"
  | "stretch";

const EASE_SMOOTH = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // slight overshoot

// Tells you when an element is on screen.
// It watches a plain wrapper (never the moving element), so an element that
// starts off to the side or clipped can never get "stuck" hidden.
function useReveal<T extends HTMLElement>({
  once = false,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
}: {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold * 0.99) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!entry.isIntersecting && !once) {
          // Fully out of view: reset so it can play again next time
          setShown(false);
        }
      },
      { threshold: [0, threshold], rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, shown };
}

// Starting look of every animation style
function getVariant(from: RevealFrom, distance: number, blur: boolean) {
  const b = blur ? "blur(10px)" : "none";

  switch (from) {
    case "left":
      return {
        hidden: { opacity: 0, transform: `translate3d(${-distance}px,0,0) rotate(-5deg) scale(0.9)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "right":
      return {
        hidden: { opacity: 0, transform: `translate3d(${distance}px,0,0) rotate(5deg) scale(0.9)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "skewLeft":
      return {
        hidden: { opacity: 0, transform: `translate3d(${-distance}px,0,0) skewX(25deg)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "skewRight":
      return {
        hidden: { opacity: 0, transform: `translate3d(${distance}px,0,0) skewX(-25deg)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "up":
      return {
        hidden: { opacity: 0, transform: `translate3d(0,${distance}px,0) scale(0.95)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "down":
      return {
        hidden: { opacity: 0, transform: `translate3d(0,${-distance}px,0) scale(0.95)`, filter: b },
        ease: EASE_SMOOTH,
      };
    case "zoom":
      return { hidden: { opacity: 0, transform: "scale(0.5)", filter: b }, ease: EASE_SMOOTH };
    case "pop":
      return { hidden: { opacity: 0, transform: "scale(0.3)" }, ease: EASE_SPRING };
    case "drop":
      return {
        hidden: { opacity: 0, transform: `translate3d(0,${-distance}px,0) rotate(-6deg) scale(0.9)` },
        ease: EASE_SPRING,
      };
    case "spin":
      return {
        hidden: { opacity: 0, transform: `translate3d(${-distance * 0.6}px,0,0) rotate(-140deg) scale(0.3)` },
        ease: EASE_SPRING,
      };
    case "flip":
      return {
        hidden: {
          opacity: 0,
          transform: `perspective(1000px) rotateX(55deg) translate3d(0,${distance * 0.4}px,0) scale(0.9)`,
          filter: b,
        },
        ease: EASE_SMOOTH,
      };
    case "swing":
      return {
        hidden: { opacity: 0, transform: "perspective(1200px) rotateY(-80deg)", filter: b },
        origin: "left center",
        ease: EASE_SMOOTH,
      };
    case "swingRight":
      return {
        hidden: { opacity: 0, transform: "perspective(1200px) rotateY(80deg)", filter: b },
        origin: "right center",
        ease: EASE_SMOOTH,
      };
    case "wipe":
      return {
        hidden: { opacity: 1, clipPath: "inset(0 100% 0 0)", transform: `translate3d(${-distance * 0.2}px,0,0)` },
        clip: true,
        ease: EASE_SMOOTH,
      };
    case "curtain":
      return {
        hidden: { opacity: 1, clipPath: "inset(100% 0 0 0)", transform: `translate3d(0,${distance * 0.2}px,0)` },
        clip: true,
        ease: EASE_SMOOTH,
      };
    case "stretch":
      return { hidden: { opacity: 0, transform: "scaleX(0)" }, ease: EASE_SMOOTH };
  }
}

function Reveal({
  children,
  from = "up",
  delay = 0,
  distance = 120,
  duration = 1000,
  blur = true,
  once = false,
  className = "",
  innerClassName = "",
}: {
  children?: ReactNode;
  from?: RevealFrom;
  delay?: number; //            ms to wait before starting
  distance?: number; //         px it travels
  duration?: number; //         ms
  blur?: boolean; //            start blurred and sharpen
  once?: boolean; //            play only the first time
  className?: string; //        layout classes (on the fixed outer wrapper)
  innerClassName?: string; //   classes for the animated inner element
}) {
  const { ref, shown } = useReveal<HTMLDivElement>({ once });
  const variant = getVariant(from, distance, blur);
  const origin = "origin" in variant ? variant.origin : undefined;
  const clip = "clip" in variant && variant.clip;

  const style: CSSProperties = shown
    ? {
        opacity: 1,
        transform: "none",
        filter: "none",
        transformOrigin: origin,
        ...(clip ? { clipPath: "inset(0 0 0 0)" } : {}),
        transition: [
          `transform ${duration}ms ${variant.ease} ${delay}ms`,
          `opacity ${duration * 0.7}ms ease ${delay}ms`,
          `filter ${duration * 0.7}ms ease ${delay}ms`,
          `clip-path ${duration}ms ${EASE_SMOOTH} ${delay}ms`,
        ].join(", "),
      }
    : { ...(variant.hidden as CSSProperties), transformOrigin: origin, transition: "none" };

  return (
    // Outer wrapper never moves: it is the one being watched
    <div ref={ref} className={className}>
      <div
        style={style}
        className={`motion-reduce:!opacity-100 motion-reduce:![clip-path:none] motion-reduce:![filter:none] motion-reduce:![transform:none] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

// Each word flies in, alternating left and right
function RevealWords({
  text,
  baseDelay = 0,
  step = 110,
  distance = 140,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  distance?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>();

  return (
    <span ref={ref} className={`block ${className}`}>
      {text.split(" ").map((word, index) => {
        const fromLeft = index % 2 === 0;
        const delay = baseDelay + index * step;

        const style: CSSProperties = shown
          ? {
              opacity: 1,
              transform: "none",
              filter: "none",
              transition: [
                `transform 1100ms ${EASE_SMOOTH} ${delay}ms`,
                `opacity 800ms ease ${delay}ms`,
                `filter 800ms ease ${delay}ms`,
              ].join(", "),
            }
          : {
              opacity: 0,
              transform: `translate3d(${fromLeft ? -distance : distance}px,0,0) rotate(${fromLeft ? -8 : 8}deg)`,
              filter: "blur(8px)",
              transition: "none",
            };

        return (
          <span key={`${word}-${index}`}>
            <span
              className="inline-block motion-reduce:!opacity-100 motion-reduce:![filter:none] motion-reduce:![transform:none]"
              style={style}
            >
              {word}
            </span>{" "}
          </span>
        );
      })}
    </span>
  );
}

// Every letter drops in with its own tilt, one after another
function RevealChars({
  text,
  baseDelay = 0,
  step = 32,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const words = text.split(" ");

  // Index of the first letter of each word (so the cascade is continuous)
  let total = 0;
  const starts = words.map((word) => {
    const start = total;
    total += word.length;
    return start;
  });

  return (
    <span ref={ref} className={`block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
              const i = starts[wordIndex] + charIndex;
              const delay = baseDelay + i * step;
              const tilt = ((i * 37) % 50) - 25;

              const style: CSSProperties = shown
                ? {
                    opacity: 1,
                    transform: "none",
                    filter: "none",
                    transition: [
                      `transform 900ms ${EASE_SPRING} ${delay}ms`,
                      `opacity 500ms ease ${delay}ms`,
                      `filter 600ms ease ${delay}ms`,
                    ].join(", "),
                  }
                : {
                    opacity: 0,
                    transform: `translate3d(0,-48px,0) rotate(${tilt}deg)`,
                    filter: "blur(6px)",
                    transition: "none",
                  };

              return (
                <span
                  key={charIndex}
                  className="inline-block motion-reduce:!opacity-100 motion-reduce:![filter:none] motion-reduce:![transform:none]"
                  style={style}
                >
                  {char}
                </span>
              );
            })}
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

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

// Heading, name and biography text
const heading = "Engineering Digital Experiences";
const fullName = "Sheikh Hamim Islam Raju";
const biography =
  "I build scalable, modern applications with a strong focus on clean architecture, delightful UX, and performance. My toolkit spans React, Next.js, Node.js, and RESTful APIs — bringing ideas to life from concept to production with robust services and smooth interfaces.";

// The three stats under the biography.
// `from` = how each one animates in (see the list of styles above).
const stats: { label: string; value: string; from: RevealFrom }[] = [
  { label: "Experience", value: "1 year +", from: "skewLeft" },
  { label: "Specialty", value: "Full Stack", from: "pop" },
  { label: "Focus", value: "Development", from: "skewRight" },
];

// Service cards at the bottom of the section.
// `color` must be "emerald" or "cyan" (see `accents` below).
// `from` = how each card animates in.
const services: {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
  from: RevealFrom;
}[] = [
  {
    number: "01",
    title: "Full-Stack Web",
    description:
      "Building responsive, fast web platforms using React, Next.js, Node.js, and modern CSS frameworks with scalable architecture.",
    icon: "code",
    color: "emerald",
    tags: ["React", "Next.js", "Node.js"],
    from: "swing",
  },
  {
    number: "02",
    title: "UI/UX Craftsmanship",
    description:
      "Designing sleek, interactive dark-mode user interfaces focused on performance, accessibility, and micro-interactions.",
    icon: "layers",
    color: "cyan",
    tags: ["Responsive UI", "Design Systems", "UX"],
    from: "flip",
  },
  {
    number: "03",
    title: "Backend & Database",
    description:
      "Architecting secure REST and GraphQL APIs, database schemas, and reliable services for production-ready applications.",
    icon: "server",
    color: "emerald",
    tags: ["REST APIs", "SQL", "Databases"],
    from: "swingRight",
  },
];

// How far each service card drifts while scrolling on desktop (in px).
// Different values per card create a staggered parallax effect.
const cardParallax = [40, -40, 40];

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
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 sm:h-8 sm:w-8">
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
      <path strokeLinecap="round" d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
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
   3. SCROLL PROGRESS HOOK
   --------------------------------------------------------------------------
   Writes a CSS variable `--p` (0 to 1) on the element while you scroll, so
   children can move with the scroll itself (parallax, turning rings, text
   that lights up). No React re-render happens while scrolling.
     "through": 0 as the element enters the screen, 1 as it leaves
     "read":    0 when its top is at 90% of the screen, 1 at 40%
   ========================================================================== */

function useScrollProgress<T extends HTMLElement>(mode: "through" | "read") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      element.style.setProperty("--p", mode === "read" ? "1" : "0.5");
      return;
    }

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const vh = window.innerHeight;

        const value =
          mode === "through"
            ? (vh - rect.top) / (vh + rect.height)
            : (vh * 0.9 - rect.top) / (vh * 0.5);

        element.style.setProperty("--p", Math.min(1, Math.max(0, value)).toFixed(4));
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
  }, [mode]);

  return ref;
}

/* ==========================================================================
   4. SCROLL-LIT PARAGRAPH  (words light up one by one as you scroll)
   ========================================================================== */

function ScrollRevealText({ text }: { text: string }) {
  const ref = useScrollProgress<HTMLParagraphElement>("read");
  const words = text.split(" ");

  return (
    <p ref={ref} className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
      {words.map((word, index) => {
        // Each word has its own moment in the 0 to 1 scroll range
        const start = (index / words.length) * 0.85;

        return (
          <span
            key={`${word}-${index}`}
            style={{
              opacity: `clamp(0.2, calc(0.2 + (var(--p, 0) - ${start.toFixed(3)}) * 8), 1)`,
            }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

/* ==========================================================================
   5. SECTION HEADING  (label wipes in, words fly in, underline stretches)
   ========================================================================== */

function SectionHeading() {
  return (
    <div className="mb-14 text-center sm:mb-20">
      <Reveal from="wipe" duration={900}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-emerald-400 sm:text-sm">
          A little about me
        </p>
      </Reveal>

      <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl lg:text-6xl xl:text-7xl">
        <RevealWords text={heading} baseDelay={200} />
      </h2>

      <Reveal
        from="stretch"
        delay={800}
        duration={1100}
        className="mx-auto mt-5 h-1 w-20"
        innerClassName="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
      />
    </div>
  );
}

/* ==========================================================================
   6. PROFILE + ORBITING TECHNOLOGIES  (rings and picture react to scroll)
   ========================================================================== */

function TechOrbit() {
  return (
    // "group/orbit" lets the whole orbit pause when you hover over it
    <div className="group/orbit relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Outer ring: turns with the scroll, with glowing dots */}
      <div
        className="absolute inset-[1%] rounded-full border border-emerald-400/15 will-change-transform"
        style={{ transform: "rotate(calc(var(--p, 0.5) * 240deg))" }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_12px_3px_rgba(52,211,153,0.7)]" />
        <span className="absolute bottom-[14%] right-[6%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]" />
      </div>

      {/* Orbit path (dashed ring): turns the opposite way */}
      <div
        className="absolute inset-[6%] rounded-full border border-dashed border-cyan-400/30 will-change-transform"
        style={{ transform: "rotate(calc(var(--p, 0.5) * -140deg))" }}
      />

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
          const angle = (((360 / technologies.length) * index - 90) * Math.PI) / 180;
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
                    tech.shape === "square" ? "rounded-xl" : "rounded-full"
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
   7. STATS STRIP  (all three stats: Experience, Specialty, Focus)
   ========================================================================== */

function StatsStrip() {
  return (
    <div className="mt-9 grid grid-cols-3 divide-x divide-slate-700/50 overflow-hidden rounded-2xl border border-slate-700/40 bg-[#101827]/85 backdrop-blur">
      {stats.map((stat, index) => (
        <Reveal
          key={stat.label}
          from={stat.from}
          distance={90}
          delay={index * 140}
          blur={false}
        >
          <div className="group relative px-2 py-4 text-center transition duration-300 hover:bg-emerald-400/[0.06] sm:px-4 sm:py-6">
            {/* Accent line that grows on hover */}
            <span className="absolute inset-x-0 top-0 mx-auto h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />

            <p className="break-words bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-sm font-extrabold text-transparent sm:text-xl lg:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-slate-400 sm:text-sm">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ==========================================================================
   8. BIOGRAPHY  (each part has its own animation style)
   ========================================================================== */

function Biography() {
  return (
    <div>
      {/* Small label: wiped in */}
      <Reveal from="wipe" duration={900}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 sm:text-sm">
          Who I am
        </p>
      </Reveal>

      {/* Name: letters rain down one by one */}
      <h3 className="mb-4 text-3xl font-extrabold leading-tight tracking-[-0.055em] text-cyan-400 sm:text-4xl lg:text-5xl">
        <RevealChars text={fullName} baseDelay={150} />
      </h3>

      {/* Title with blinking cursor: skews in from the right */}
      <Reveal from="skewRight" distance={200} duration={1100} delay={250}>
        <p className="mb-6 font-mono text-lg font-bold tracking-wide text-white sm:text-xl">
          Software Developer <span className="animate-pulse text-cyan-400">|</span>
        </p>
      </Reveal>

      {/* Description: uncovered like a curtain, words light up as you scroll */}
      <Reveal from="curtain" distance={120} duration={1300} delay={350}>
        <ScrollRevealText text={biography} />
      </Reveal>

      {/* Stats */}
      <StatsStrip />

      {/* Action buttons: skew in from each side (side by side, also on mobile) */}
      <div className="mt-8 flex w-full flex-nowrap items-center gap-3 sm:w-auto sm:gap-4">
        {/* Primary: gradient + glow + shine sweep */}
        <Reveal
          from="skewLeft"
          distance={140}
          delay={150}
          className="flex flex-1 sm:flex-none"
          innerClassName="flex flex-1"
        >
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
        </Reveal>

        {/* Secondary: glass outline that fills on hover */}
        <Reveal
          from="skewRight"
          distance={140}
          delay={250}
          className="flex flex-1 sm:flex-none"
          innerClassName="flex flex-1"
        >
          <a
            href="#contact"
            className="group inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/40 bg-cyan-400/[0.06] px-5 text-sm font-bold text-cyan-300 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300 hover:shadow-[0_10px_35px_rgba(0,214,160,0.2)] sm:flex-none sm:px-8 sm:text-base"
          >
            Get in Touch
            <MailIcon />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

/* ==========================================================================
   9. SERVICE CARDS  (door swing / 3D flip / door swing, plus parallax drift)
   ========================================================================== */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const accent = accents[service.color as keyof typeof accents];

  return (
    // Layer 1: parallax amount (desktop only, via --par)
    <div
      className="h-full lg:[--par:1]"
      style={{ "--k": cardParallax[index % cardParallax.length] } as CSSProperties}
    >
      {/* Layer 2: drifts up/down with the scroll of the grid */}
      <div
        className="h-full will-change-transform"
        style={{
          transform:
            "translate3d(0, calc((var(--p, 0.5) - 0.5) * var(--k, 0) * var(--par, 0) * 1px), 0)",
        }}
      >
        {/* Layer 3: entrance animation (its own style per card) */}
        <Reveal
          from={service.from}
          distance={260}
          duration={1300}
          delay={(index % 3) * 100}
          blur={false}
          className="h-full [perspective:1200px]"
          innerClassName="h-full"
        >
          {/* Layer 4: the card (hover effects) */}
          <article className="group relative h-full rounded-[26px] bg-slate-700/40 p-px transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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

              {/* Tags (pop in one by one) */}
              <div className="relative mt-auto flex flex-wrap gap-2">
                {service.tags.map((tag, tagIndex) => (
                  <Reveal
                    key={tag}
                    from="pop"
                    delay={500 + tagIndex * 120}
                    duration={800}
                    className="inline-flex"
                    innerClassName="inline-flex"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition ${accent.tag}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                      {tag}
                    </span>
                  </Reveal>
                ))}
              </div>

              {/* Bar that grows along the bottom on hover */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${accent.bar}`}
              />
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}

/* ==========================================================================
   10. ABOUT SECTION  (background + layout)
   ========================================================================== */

export default function About() {
  // `--p` on the section = how far you have scrolled through it
  const sectionRef = useScrollProgress<HTMLElement>("through");

  // `--p` on the grid = scroll progress for the service-card parallax
  const gridRef = useScrollProgress<HTMLDivElement>("through");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#030a12] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_28%,rgba(0,100,83,0.22),transparent_48%),radial-gradient(ellipse_at_12%_45%,rgba(0,52,91,0.14),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-size:137px_151px] [background-position:25px_30px]" />

      {/* Color orbs that drift while you scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[20%] -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px] will-change-transform"
        style={{ transform: "translate3d(0, calc((var(--p, 0.5) - 0.5) * 220px), 0)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[55%] -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] will-change-transform"
        style={{ transform: "translate3d(0, calc((var(--p, 0.5) - 0.5) * -260px), 0)" }}
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <SectionHeading />

        {/* Profile (left) + biography (right) */}
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16 xl:gap-24">
          {/* Profile spins in from the left */}
          <Reveal
            from="spin"
            distance={260}
            duration={1500}
            blur={false}
            className="mx-auto w-full max-w-[440px]"
          >
            {/* Floats slightly against the scroll direction */}
            <div
              className="will-change-transform"
              style={{
                transform: "translate3d(0, calc((var(--p, 0.5) - 0.5) * -50px), 0)",
              }}
            >
              <TechOrbit />
            </div>
          </Reveal>

          <Biography />
        </div>

        {/* Service cards */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-5 sm:mt-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}