"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import {
  Atom,
  Brush,
  Code2,
  Coffee,
  Database,
  FileCode2,
  GitBranch,
  Laptop,
  Palette,
  ShieldCheck,
  Terminal,
  Triangle,
  Wind,
  Zap,
  Braces,
} from "lucide-react";

/* ==========================================================================
   1. DATA  (add, remove or reorder skills here)
   --------------------------------------------------------------------------
   name : label shown on the tile
   icon : any lucide-react icon
   rgb  : accent color as "r,g,b" (used for the glow, border and icon)
   ========================================================================== */

const skills = [
  { name: "HTML", icon: Code2, rgb: "244,114,82" },
  { name: "CSS", icon: Brush, rgb: "167,139,250" },
  { name: "JavaScript", icon: Braces, rgb: "250,204,21" },
  { name: "TypeScript", icon: FileCode2, rgb: "59,130,246" },
  { name: "React", icon: Atom, rgb: "34,211,238" },

  { name: "Next.js", icon: Triangle, rgb: "226,232,240" },
  { name: "Tailwind CSS", icon: Wind, rgb: "45,212,191" },
  { name: "HeroUI", icon: Zap, rgb: "217,70,239" },
  { name: "Better Auth", icon: ShieldCheck, rgb: "129,140,248" },
  { name: "MongoDB", icon: Database, rgb: "52,211,153" },

  { name: "Java", icon: Coffee, rgb: "248,113,113" },
  { name: "Python", icon: Terminal, rgb: "56,189,248" },
  { name: "Figma", icon: Palette, rgb: "244,63,94" },
  { name: "Git / GitHub", icon: GitBranch, rgb: "251,146,60" },
  { name: "VS Code", icon: Laptop, rgb: "96,165,250" },
];

// Cut-corner (angular) shape used by the card layers
const CUT = "14px";
const cutShape: CSSProperties = {
  clipPath: `polygon(${CUT} 0, 100% 0, 100% calc(100% - ${CUT}), calc(100% - ${CUT}) 100%, 0 100%, 0 ${CUT})`,
};

/* ==========================================================================
   2. HOOKS
   ========================================================================== */

// Returns `visible = true` once the element has scrolled into view
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

/* ==========================================================================
   3. SECTION HEADING
   ========================================================================== */

function SectionHeading({ visible }: { visible: boolean }) {
  return (
    <header
      className={`mb-12 text-center transition-all duration-700 sm:mb-16 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
    >
      <p className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400 sm:text-sm">
        TECH STACK
      </p>

      <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl lg:text-6xl">
        Skills &amp; Tools
      </h2>

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(0,220,190,0.4)]" />

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
        The languages, frameworks, and tools I use to design, build, and ship
        full-stack applications.
      </p>
    </header>
  );
}

/* ==========================================================================
   4. SKILL CARD  (3D tilt, floating icon, depth layer, neon edge)
   ========================================================================== */

function SkillCard({
  skill,
  index,
  visible,
}: {
  skill: (typeof skills)[number];
  index: number;
  visible: boolean;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;
  const rgb = skill.rgb;

  // Tilt the card toward the cursor and move the spotlight with it
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const element = tiltRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.transform = `rotateX(${(0.5 - y) * 26}deg) rotateY(${(x - 0.5) * 26}deg)`;
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  }

  function resetTilt() {
    const element = tiltRef.current;
    if (element) element.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    // Outer layer: perspective + entrance animation
    <div
      className={`[perspective:900px] transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-10 scale-90 opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      {/* Tilting layer */}
      <div
        ref={tiltRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        className="group relative aspect-square cursor-pointer transition-transform duration-200 ease-out [transform-style:preserve-3d] active:scale-95"
      >
        {/* Floor glow under the card */}
        <span
          className="pointer-events-none absolute inset-x-3 -bottom-3 h-5 rounded-full opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `rgba(${rgb},0.8)` }}
        />

        {/* Depth layer (sits behind, gives the card thickness) */}
        <span
          className="absolute inset-0 translate-y-1.5"
          style={{
            ...cutShape,
            background: `rgba(${rgb},0.4)`,
            transform: "translateZ(-18px)",
          }}
        />

        {/* Neon edge */}
        <span
          className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            ...cutShape,
            background: `linear-gradient(135deg, rgba(${rgb},0.95), rgba(${rgb},0.12) 45%, rgba(${rgb},0.65))`,
          }}
        />

        {/* Card face */}
        <span
          className="absolute inset-px overflow-hidden"
          style={{
            ...cutShape,
            background: "linear-gradient(160deg, #0f1a2c, #070e1a)",
          }}
        >
          {/* Cursor spotlight */}
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(160px circle at var(--mx, 50%) var(--my, 0%), rgba(${rgb},0.25), transparent 70%)`,
            }}
          />
          {/* Fine scan lines */}
          <span className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />
        </span>

        {/* Floating content (pushed forward in 3D) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-1 sm:gap-3.5 [transform-style:preserve-3d]">
          <div
            className="grid h-12 w-12 place-items-center rounded-xl border transition-transform duration-300 [transform:translateZ(46px)] group-hover:[transform:translateZ(72px)_scale(1.1)] sm:h-14 sm:w-14"
            style={{
              color: `rgb(${rgb})`,
              borderColor: `rgba(${rgb},0.4)`,
              background: `rgba(${rgb},0.12)`,
              boxShadow: `0 0 26px rgba(${rgb},0.35)`,
            }}
          >
            <Icon
              className="h-6 w-6 sm:h-7 sm:w-7"
              style={{ filter: `drop-shadow(0 0 6px rgba(${rgb},0.8))` }}
            />
          </div>

          <span className="text-center text-[11px] font-bold leading-tight tracking-wide text-white [transform:translateZ(28px)] sm:text-sm">
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. SKILLS SECTION  (background + layout)
   ========================================================================== */

export default function Skills() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#030710] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,95,100,0.16),transparent_55%),linear-gradient(120deg,#030710,#041019_65%,#03151b)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:20px_30px] [background-size:167px_149px]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* 3D floor grid at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 [mask-image:linear-gradient(to_top,black,transparent)] [perspective:600px]">
        <div className="absolute inset-0 origin-bottom [background-image:linear-gradient(rgba(34,211,238,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.22)_1px,transparent_1px)] [background-size:48px_48px] [transform:rotateX(62deg)]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionHeading visible={visible} />

        {/* Skills grid: 3 columns on phones, 5 on larger screens */}
        <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-5 sm:gap-5 lg:gap-7">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}