"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { achievements } from "@/lib/data";

const typeIcon: Record<string, React.ElementType> = {
  Certification: Award,
  Academic:      GraduationCap,
};

function AchievementCard({ item, index }: { item: typeof achievements[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const Icon   = typeIcon[item.type] ?? Award;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="glass-sm"
      whileHover={{
        y: -3,
        x: 4,
        borderColor: "rgba(255,255,255,0.18)",
        boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      style={{
        display: "flex", gap: "1.25rem", alignItems: "flex-start",
        padding: "1.5rem",
        borderRadius: "14px",
        transition: "border-color .25s, box-shadow .25s",
      }}
    >
      {/* icon */}
      <div style={{
        flexShrink: 0,
        width: 40, height: 40, borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <Icon size={17} color="rgba(255,255,255,0.7)" />
      </div>

      {/* content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>
            {item.title}
          </h3>
          <span style={{
            fontSize: "0.62rem", padding: "2px 8px", borderRadius: "99px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.05em",
          }}>
            {item.type}
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{item.issuer}</span>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>·</span>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>{item.year}</span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-8% 0px" });

  return (
    <section id="achievements" className="section" style={{ background: "rgba(255,255,255,0.012)" }}>
      <div className="container">

        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label glass-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ padding: "6px 14px", borderRadius: "99px" }}
          >
            Achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "white", lineHeight: 1.1 }}
          >
            Certifications &amp; milestones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}
          >
            What I&apos;ve completed outside the classroom — always adding more.
          </motion.p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "48rem", marginInline: "auto" }}>
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} item={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}