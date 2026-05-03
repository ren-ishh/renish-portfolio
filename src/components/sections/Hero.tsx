"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github, Linkedin, Twitter, Instagram, ArrowDown, Mail,
} from "lucide-react";
import { siteConfig, heroRoles } from "@/lib/data";

const socials = [
  { Icon: Github,    href: siteConfig.github,    label: "GitHub"    },
  { Icon: Linkedin,  href: siteConfig.linkedin,  label: "LinkedIn"  },
  { Icon: Twitter,   href: siteConfig.twitter,   label: "Twitter"   },
  { Icon: Instagram, href: siteConfig.instagram, label: "Instagram" },
];

/* ── typewriter ─────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800, deleteSpeed = 45) {
  const [text, setText]       = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDel]    = useState(false);
  useEffect(() => {
    const word = words[wordIdx % words.length];
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setWordIdx(i => i + 1); }
      }
    }, deleting ? deleteSpeed : speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause, deleteSpeed]);
  return text;
}

/* ── floating particle ──────────────────────────── */
function Particle({ live }: { live: boolean }) {
  const x   = `${Math.random() * 100}%`;
  const y   = `${Math.random() * 100}%`;
  const dur = 6 + Math.random() * 8;
  const del = Math.random() * 4;
  const s   = 1 + Math.random() * 2;
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute", left: x, top: y,
        width: s, height: s, borderRadius: "50%",
        background: "rgba(255,255,255,0.55)",
        pointerEvents: "none",
      }}
      animate={live ? {
        opacity: [0, 0.7, 0],
        y: [0, -(30 + Math.random() * 40), 0],
        x: [0, (Math.random() - 0.5) * 20, 0],
      } : { opacity: 0 }}
      transition={live ? { duration: dur, repeat: Infinity, delay: del, ease: "easeInOut" } : {}}
    />
  );
}

/* ── orb ────────────────────────────────────────── */
function Orb({ x, y, size, delay, live }: { x: string; y: string; size: number; delay: number; live: boolean }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
      animate={live ? { y: [-12, 12, -12], opacity: [0.3, 0.6, 0.3] } : { y: 0, opacity: 0.45 }}
      transition={live ? { duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay } : { duration: 0.3 }}
    />
  );
}

/* ── animated name blob circle ──────────────────── */
function NameBlob({ live }: { live: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position:      "absolute",
        width:         280,
        height:        280,
        top:           "50%",
        left:          "50%",
        transform:     "translate(-50%, -54%)",
        pointerEvents: "none",
        zIndex:        0,
      }}
    >
      {/* ring 1 — closest, slower */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        -10,
          borderRadius: "50%",
          border:       "1px solid rgba(255,255,255,0.10)",
          background:   "transparent",
        }}
        animate={live ? { rotate: 360 } : {}}
        transition={live ? { duration: 18, repeat: Infinity, ease: "linear" } : {}}
      >
        <div
          style={{
            position:     "absolute",
            top:          "50%",
            left:         0,
            width:        3,
            height:       3,
            borderRadius: "50%",
            background:   "rgba(255,255,255,0.45)",
            transform:    "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* ring 2 — further out, opposite direction */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        -30,
          borderRadius: "50%",
          border:       "1px solid rgba(255,255,255,0.055)",
          background:   "transparent",
        }}
        animate={live ? { rotate: -360 } : {}}
        transition={live ? { duration: 26, repeat: Infinity, ease: "linear" } : {}}
      >
        <div
          style={{
            position:     "absolute",
            top:          0,
            left:         "50%",
            width:        2,
            height:       2,
            borderRadius: "50%",
            background:   "rgba(255,255,255,0.3)",
            transform:    "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* ring 3 — outermost, very faint */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        -52,
          borderRadius: "50%",
          border:       "1px solid rgba(255,255,255,0.025)",
          background:   "transparent",
        }}
        animate={live ? { rotate: 360 } : {}}
        transition={live ? { duration: 40, repeat: Infinity, ease: "linear" } : {}}
      />

      {/* breathing pulse ring — innermost */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        20,
          borderRadius: "50%",
          border:       "1px solid rgba(255,255,255,0.12)",
          background:   "transparent",
        }}
        animate={live ? { scale: [1, 1.07, 1], opacity: [0.7, 0.15, 0.7] } : {}}
        transition={live ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : {}}
      />

      {/* breathing pulse ring — outer */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        2,
          borderRadius: "50%",
          border:       "1px solid rgba(255,255,255,0.06)",
          background:   "transparent",
        }}
        animate={live ? { scale: [1, 1.10, 1], opacity: [0.5, 0.08, 0.5] } : {}}
        transition={live ? { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : {}}
      />
    </div>
  );
}

const PARTICLE_COUNT = 28;

export default function Hero() {
  const typed       = useTypewriter(heroRoles);
  const sectionRef  = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const live        = reduceMotion !== true;
  
  // FIX: Added mounted state to prevent hydration errors from Math.random()
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const ringParallax  = useTransform(scrollYProgress, [0, 1], live ? [0, 110] : [0, 0]);
  const ringParallax2 = useTransform(scrollYProgress, [0, 1], live ? [0, 170] : [0, 0]);

  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => i)
  );

  const scrollDown = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden", paddingTop: "80px",
      }}
    >
      {/* dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, opacity: 0.028,
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* floating particles (Only renders after client hydration) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {mounted && particles.current.map(i => <Particle key={i} live={live} />)}
      </div>

      {/* soft mesh */}
      <div
        aria-hidden
        style={{
          position: "absolute", left: "12%", top: "18%",
          width: "55%", minHeight: "42%", borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 72%)",
          filter: "blur(56px)", pointerEvents: "none",
        }}
      />

      {/* vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #080808 100%)",
      }} />

      <Orb x="10%" y="20%" size={320} delay={0} live={live} />
      <Orb x="70%" y="15%" size={260} delay={2} live={live} />
      <Orb x="55%" y="65%" size={220} delay={4} live={live} />

      {/* large rotating rings */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute", width: 520, height: 520, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.035)",
          top: "50%", left: "50%", marginTop: -260, marginLeft: -260,
          y: ringParallax,
        }}
        animate={live ? { rotate: 360 } : { rotate: 0 }}
        transition={live ? { duration: 60, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute", width: 780, height: 780, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.02)",
          top: "50%", left: "50%", marginTop: -390, marginLeft: -390,
          y: ringParallax2,
        }}
        animate={live ? { rotate: -360 } : { rotate: 0 }}
        transition={live ? { duration: 90, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />

      {/* ── Main content ─────────────────────────── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          padding: "0 1.5rem", maxWidth: "820px",
        }}
      >
        {/* location badge — glass */}
        <motion.div variants={item} style={{ marginBottom: "1.75rem" }}>
          <motion.span
            className="glass-sm"
            animate={live ? {
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0)",
                "0 0 22px rgba(255,255,255,0.06)",
                "0 0 0 0 rgba(255,255,255,0)",
              ],
            } : {}}
            transition={{ duration: 4, repeat: live ? Infinity : 0, ease: "easeInOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "99px",
              fontSize: "0.72rem", color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
            }}
          >
            <motion.span
              aria-hidden
              animate={live ? { opacity: [0.45, 1, 0.45], scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 2.2, repeat: live ? Infinity : 0, ease: "easeInOut" }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.55)", display: "inline-block" }}
            />
            {siteConfig.location}
          </motion.span>
        </motion.div>

        {/* headline — blob behind name */}
        <motion.h1
          variants={item}
          style={{
            position: "relative",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          Hi, I&apos;m{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            {/* THE ANIMATED BLOB + RINGS behind name */}
            <NameBlob live={live} />
            <span className="shimmer-text" style={{ position: "relative", zIndex: 1 }}>
              {siteConfig.name}
            </span>
          </span>
        </motion.h1>

        {/* typewriter */}
        <motion.div variants={item} style={{ height: "3.2rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
          <span style={{
            fontSize: "clamp(1rem, 2.8vw, 1.45rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.38)",
            fontFamily: "var(--font-geist-mono, monospace)",
            letterSpacing: "-0.01em",
          }}>
            {typed}
            <span className="animate-blink" style={{ marginLeft: "2px", color: "rgba(255,255,255,0.5)" }}>|</span>
          </span>
        </motion.div>

        {/* description */}
        <motion.p variants={item} style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.75, maxWidth: "520px", marginBottom: "2.75rem",
        }}>
          First-year B.Tech CSE student at LPU building real projects, learning fast,
          and working toward a meaningful career in software engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            style={{ padding: "11px 28px", borderRadius: "99px", fontSize: "0.875rem", fontWeight: 500, background: "white", color: "#080808", textDecoration: "none" }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="glass-sm"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "11px 28px", borderRadius: "99px",
              fontSize: "0.875rem", fontWeight: 500,
              color: "white", textDecoration: "none",
            }}
          >
            <Mail size={14} /> Get In Touch
          </motion.a>
        </motion.div>

        {/* socials — glass */}
        <motion.div variants={item} style={{ display: "flex", gap: "10px" }}>
          {socials.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="glass-sm"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 480, damping: 26 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: "10px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={scrollDown}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={live ? { opacity: 1, y: [0, 6, 0] } : { opacity: 1 }}
        transition={live ? {
          opacity: { delay: 1.8, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2 },
        } : { opacity: { delay: 1.8, duration: 0.5 } }}
        style={{
          position: "absolute", bottom: "2.5rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          background: "none", border: "none", color: "rgba(255,255,255,0.2)",
          fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <ArrowDown size={12} />
      </motion.button>
    </section>
  );
}