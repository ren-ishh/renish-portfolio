"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, GraduationCap, Code2, Rocket } from "lucide-react";
import { siteConfig } from "@/lib/data";

const cards = [
  { Icon: GraduationCap, title: "Student",    body: "1st-year B.Tech CSE at Lovely Professional University, Punjab." },
  { Icon: Code2,         title: "Builder",    body: "Turning ideas into real projects with Python, JavaScript & the web stack." },
  { Icon: Rocket,        title: "Ambitious",  body: "Obsessed with growth — building skills and a career in software engineering." },
  { Icon: MapPin,        title: "Location",   body: "Based in India · studying in Punjab · open to remote opportunities." },
];

function Card({ Icon, title, body, index }: typeof cards[0] & { index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="glass"
      whileHover={{
        y: -6,
        borderColor: "rgba(255,255,255,0.14)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
        transition: { type: "spring", stiffness: 380, damping: 28 },
      }}
      style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: "9px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <Icon size={17} color="rgba(255,255,255,0.75)" />
      </div>
      <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "white" }}>{title}</p>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{body}</p>
    </motion.div>
  );
}

export default function About() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-8% 0px" });

  return (
    <section id="about" className="section">
      <div className="container">

        {/* header */}
        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Aspiring engineer.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Always building.</span>
          </motion.h2>

          <motion.p
            className="section-prose"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8,
            }}
          >
            I&apos;m Renish — a first-year Computer Science student from India with a clear goal: 
            build a meaningful career in software engineering. I&apos;m drawn to the craft of writing 
            clean code, solving real problems, and turning ideas into things people can actually use.
            <br /><br />
            Right now I&apos;m focused on deepening my fundamentals in Python and JavaScript while 
            exploring full-stack web development. Every project, course, and late-night debugging 
            session is a step forward.
          </motion.p>
        </div>

        {/* cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}>
          {cards.map((c, i) => (
            <Card key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}