"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ChangeEvent, FormEvent, MouseEvent, ReactNode } from "react";
import {
  ArrowUp,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  User,
} from "lucide-react";

/* ==========================================================================
   1. DATA  (edit your contact details here)
   ========================================================================== */

const contact = {
  email: "sheikhhamim@gmail.com",
  location: "Dhaka, Bangladesh",
};

const MESSAGE_LIMIT = 500;

/* ==========================================================================
   2. ICONS  (brand icons, since lucide-react has none)
   ========================================================================== */

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M5.1 3.4a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.3 9.1h3.6v11.6H3.3V9.1Zm5.8 0h3.45v1.58h.05c.48-.91 1.65-1.87 3.4-1.87 3.64 0 4.32 2.4 4.32 5.52v6.37h-3.6v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.75H9.1V9.1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8h3.4Z" />
    </svg>
  );
}

const socials = [
  { label: "GitHub", href: "https://github.com/HamimRaju", icon: <GithubIcon /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheikh-hamim-islam-raju-506a1b270/?isSelfProfile=true",
    icon: <LinkedInIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/hamim.islam.raju.2025/",
    icon: <FacebookIcon />,
  },
];

/* ==========================================================================
   3. HOOKS
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
   4. SECTION HEADING
   ========================================================================== */

function SectionHeading({ visible }: { visible: boolean }) {
  return (
    <header
      className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-700 sm:mb-16 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
    >
      <p className="mb-4 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400 sm:text-sm">
        CONTACT
      </p>

      <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.055em] sm:text-5xl lg:text-6xl">
        Get In{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Touch
        </span>
      </h2>

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(0,220,190,0.4)]" />

      <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>
    </header>
  );
}

/* ==========================================================================
   5. INFO CARDS  (email with copy button, location)
   ========================================================================== */

function InfoCard({
  icon,
  label,
  color,
  children,
  action,
}: {
  icon: ReactNode;
  label: string;
  color: "emerald" | "cyan";
  children: ReactNode;
  action?: ReactNode;
}) {
  const tile =
    color === "emerald"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400 shadow-[0_0_28px_rgba(52,211,153,0.2)]"
      : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.2)]";
  const hover =
    color === "emerald" ? "hover:border-emerald-400/50" : "hover:border-cyan-400/50";

  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl border border-slate-700/50 bg-[#0a1220]/90 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:p-5 ${hover}`}
    >
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 sm:h-14 sm:w-14 ${tile}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-400 sm:text-sm">{label}</p>
        <div className="truncate text-sm font-semibold text-white sm:text-base">
          {children}
        </div>
      </div>

      {action}
    </div>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available: do nothing
    }
  }

  return (
    <InfoCard
      icon={<Mail size={24} />}
      label="Email Me"
      color="emerald"
      action={
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-700/60 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-emerald-400/50 hover:text-emerald-400"
        >
          {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
        </button>
      }
    >
      <a href={`mailto:${contact.email}`} className="transition hover:text-emerald-300">
        {contact.email}
      </a>
    </InfoCard>
  );
}

function SocialLinks() {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-[#0a1220]/90 p-4 backdrop-blur-md sm:p-5">
      <p className="mb-4 text-xs text-slate-400 sm:text-sm">Find me online</p>

      <div className="flex flex-wrap gap-3">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-[0_10px_30px_rgba(0,214,160,0.15)]"
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   6. FORM FIELD  (icon + label + input, glows on focus)
   ========================================================================== */

const fieldClass =
  "w-full rounded-xl border border-slate-700/60 bg-slate-950/70 py-3.5 pl-11 pr-4 text-base text-white placeholder:text-slate-600 transition-all duration-300 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/10 sm:text-[15px]";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="group/field block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-[15px] text-slate-500 transition-colors duration-300 group-focus-within/field:text-emerald-400">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}

/* ==========================================================================
   7. CONTACT FORM  (cursor spotlight + glowing border + send states)
   ========================================================================== */

type Status = "idle" | "sending" | "sent";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    // TODO: replace this block with your real sending code
    // (for example EmailJS, Formspree, or a Next.js API route).
    console.log("Form Submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    window.setTimeout(() => setStatus("idle"), 3500);
  };

  // Tracks the mouse so the spotlight and border glow follow the cursor
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-[26px] bg-slate-700/40 p-px"
    >
      {/* Border glow that follows the cursor */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 0%), rgba(34,211,238,0.8), rgba(52,211,153,0.35) 45%, transparent 70%)",
        }}
      />

      <div className="relative overflow-hidden rounded-[25px] bg-[#0a1220] p-5 sm:p-8">
        {/* Spotlight inside the card */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(0,214,200,0.07), transparent 65%)",
          }}
        />
        {/* Top edge line */}
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

        <div className="relative mb-6">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Send me a message
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Fill out the form and I&apos;ll get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5">
          <Field label="Your Name" icon={<User size={18} />}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={fieldClass}
              placeholder="Sheikh Hamim"
            />
          </Field>

          <Field label="Your Email" icon={<Mail size={18} />}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={fieldClass}
              placeholder="hamim@example.com"
            />
          </Field>

          <Field label="Your Message" icon={<MessageSquare size={18} />}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              maxLength={MESSAGE_LIMIT}
              className={`${fieldClass} resize-none`}
              placeholder="Write your message here..."
            />
            <span className="mt-1.5 block text-right text-xs text-slate-500">
              {formData.message.length}/{MESSAGE_LIMIT}
            </span>
          </Field>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className={`group/btn relative flex min-h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl font-bold text-slate-950 shadow-[0_8px_30px_rgba(0,214,160,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,214,200,0.45)] disabled:cursor-not-allowed disabled:opacity-80 ${
              status === "sent"
                ? "bg-emerald-400"
                : "bg-gradient-to-r from-emerald-400 to-cyan-400"
            }`}
          >
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-all duration-700 group-hover/btn:left-[150%]" />

            {status === "idle" && (
              <>
                <span className="relative">Send Message</span>
                <Send
                  size={18}
                  className="relative transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1"
                />
              </>
            )}

            {status === "sending" && (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                <span className="relative">Sending...</span>
              </>
            )}

            {status === "sent" && (
              <>
                <Check size={20} className="relative" />
                <span className="relative">Message Sent</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   8. FOOTER
   ========================================================================== */

// The year never changes while the page is open, so there is nothing to subscribe to
const subscribeNoop = () => () => {};

// Quick links shown in the footer
const footerLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

// Cut-corner (angular) shape for the "Back to top" button
const cutShape = {
  clipPath:
    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
};

function Footer() {
  const { ref, visible } = useInView<HTMLElement>(0.1);

  // Current year: the server renders 2026, the browser then shows the real
  // year. No setState inside an effect, and no hydration mismatch.
  const year = useSyncExternalStore(
    subscribeNoop,
    () => new Date().getFullYear(),
    () => 2026
  );

  return (
    <footer
      ref={ref}
      className="relative isolate overflow-hidden bg-[#02050c] px-4 pt-14 sm:px-8 sm:pt-20 lg:px-12"
    >
      {/* ---------- Background effects ---------- */}
      {/* Neon top edge with a glow falling downward */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-cyan-400/[0.08] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 animate-pulse bg-emerald-300 shadow-[0_0_22px_4px_rgba(52,211,153,0.8)]" />

      {/* Stars + color orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:10px_16px] [background-size:163px_147px]" />
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div
        className={`mx-auto max-w-6xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* ---------- Main columns ---------- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-14">
          {/* Brand + social buttons */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="inline-block text-2xl font-extrabold tracking-[-1.5px] sm:text-[27px]"
            >
              <span className="text-emerald-400">Hamim Islam </span>
              Raju
              <span className="text-emerald-400">.</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Turning vision into reality through elegant code. Full-stack web
              applications, scalable APIs, and interfaces built to last.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-slate-700/60 bg-slate-900/80 text-slate-300 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-400 hover:shadow-[0_10px_30px_rgba(0,214,160,0.25)]"
                >
                  {icon}
                </a>
              ))}

              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="grid h-12 w-12 place-items-center rounded-xl border border-slate-700/60 bg-slate-900/80 text-slate-300 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-400 hover:shadow-[0_10px_30px_rgba(0,214,160,0.25)]"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-5 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400">
              NAVIGATE
            </p>

            {/* Water-drop buttons (alternate cyan / emerald) */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-4">
              {footerLinks.map(([label, href], index) => {
                const isCyan = index % 2 === 0;

                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={`group relative block overflow-hidden rounded-full border bg-gradient-to-b px-3 py-3.5 text-center text-[13px] font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] active:scale-95 sm:text-sm ${
                        isCyan
                          ? "border-cyan-300/35 from-cyan-300/30 via-cyan-400/10 to-cyan-500/25 shadow-[inset_0_6px_10px_rgba(255,255,255,0.22),inset_0_-8px_14px_rgba(34,211,238,0.3),0_8px_20px_rgba(34,211,238,0.15)] hover:border-cyan-200/70 hover:shadow-[inset_0_6px_10px_rgba(255,255,255,0.3),inset_0_-8px_14px_rgba(34,211,238,0.45),0_14px_32px_rgba(34,211,238,0.4)]"
                          : "border-emerald-300/35 from-emerald-300/30 via-emerald-400/10 to-emerald-500/25 shadow-[inset_0_6px_10px_rgba(255,255,255,0.22),inset_0_-8px_14px_rgba(52,211,153,0.3),0_8px_20px_rgba(52,211,153,0.15)] hover:border-emerald-200/70 hover:shadow-[inset_0_6px_10px_rgba(255,255,255,0.3),inset_0_-8px_14px_rgba(52,211,153,0.45),0_14px_32px_rgba(52,211,153,0.4)]"
                      }`}
                    >
                      {/* Light pooling at the bottom of the drop */}
                      <span
                        className={`pointer-events-none absolute inset-x-5 bottom-0 h-1/2 rounded-full blur-md transition-opacity duration-300 group-hover:opacity-100 ${
                          isCyan ? "bg-cyan-300/30" : "bg-emerald-300/30"
                        } opacity-70`}
                      />

                      {/* Main glossy highlight (top-left) */}
                      <span className="pointer-events-none absolute left-[9%] top-[10%] h-[38%] w-[46%] -rotate-6 rounded-full bg-gradient-to-b from-white/70 to-white/0 transition-all duration-500 group-hover:left-[14%] group-hover:w-[52%]" />

                      {/* Small secondary shine dot (bottom-right) */}
                      <span className="pointer-events-none absolute bottom-[20%] right-[11%] h-1.5 w-1.5 rounded-full bg-white/60" />

                      {/* Light that glides across on hover */}
                      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/3 -skew-x-12 bg-white/25 blur-sm transition-all duration-700 group-hover:left-[140%]" />

                      <span className="relative [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]">
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <p className="mb-5 font-mono text-xs font-bold tracking-[0.3em] text-cyan-400">
              CONNECT
            </p>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-start gap-3 text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-400" />
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-800/80 pt-7 sm:flex-row">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {year} Sheikh Hamim Islam Raju. Built with{" "}
            <span className="font-medium text-emerald-400">Next.js</span> &amp;{" "}
            <span className="font-medium text-cyan-400">Tailwind CSS</span>.
          </p>

          {/* Back to top: angular neon button */}
          <a
            href="#home"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
            style={cutShape}
          >
            Back to top
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>

      {/* ---------- Giant outlined wordmark (fades out at the bottom) ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[clamp(2rem,8vw,8rem)] font-black uppercase leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(34,211,238,0.35)] [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)] sm:mt-8"
      >
        Hamim Raju
      </div>
    </footer>
  );
}

/* ==========================================================================
   9. CONTACT SECTION  (background + layout)
   ========================================================================== */

function ContactSection() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#030710] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,95,100,0.16),transparent_55%),linear-gradient(120deg,#030710,#041019_65%,#03151b)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,#d8f2ff_1px,transparent_1.5px)] [background-position:18px_26px] [background-size:171px_153px]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading visible={visible} />

        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Left: contact info */}
          <div
            className={`space-y-4 transition-all duration-1000 sm:space-y-5 ${
              visible
                ? "translate-x-0 translate-y-0 opacity-100"
                : "translate-y-8 opacity-0 lg:-translate-x-10 lg:translate-y-0"
            }`}
          >
            <EmailCard />

            <InfoCard icon={<MapPin size={24} />} label="Location" color="cyan">
              {contact.location}
            </InfoCard>

            <SocialLinks />
          </div>

          {/* Right: form */}
          <div
            className={`transition-all delay-200 duration-1000 ${
              visible
                ? "translate-x-0 translate-y-0 opacity-100"
                : "translate-y-8 opacity-0 lg:translate-x-10 lg:translate-y-0"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10. EXPORT  (contact section + full-width footer)
   ========================================================================== */

export default function Contact() {
  return (
    <>
      <ContactSection />
      <Footer />
    </>
  );
}