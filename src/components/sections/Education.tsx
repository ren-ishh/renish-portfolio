"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { education } from "@/lib/data";

function TimelineItem({ item, index, isLast }: { item: typeof education[0]; index: number; isLast: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
      {/* line + dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {/* dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          style={{
            width: 10, height: 10, borderRadius: "50%",
            background: item.status === "Current" ? "white" : "rgba(255,255,255,0.25)",
            border: "2px solid",
            borderColor: item.status === "Current" ? "white" : "rgba(255,255,255,0.15)",
            boxShadow: item.status === "Current" ? "0 0 12px rgba(255,255,255,0.35)" : "none",
            zIndex: 1,
            marginTop: "4px",
          }}
        />
        {/* connector */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            style={{
              flex: 1, width: "1px",
              background: "rgba(255,255,255,0.08)",
              marginTop: "6px", marginBottom: "-6px",
            }}
          />
        )}
      </div>

      {/* content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        whileHover={{
          x: 5,
          borderColor: "rgba(255,255,255,0.18)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
          transition: { type: "spring", stiffness: 380, damping: 32 },
        }}
        className="glass-sm"
        style={{
          marginBottom: isLast ? 0 : "2.5rem",
          padding: "1.5rem",
          borderRadius: "14px",
          transition: "border-color .25s, box-shadow .25s",
          flex: 1,
        }}
      >
        {/* year badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.68rem", padding: "2px 10px", borderRadius: "99px",
            background: item.status === "Current" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${item.status === "Current" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`,
            color: item.status === "Current" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)",
            letterSpacing: "0.05em",
          }}>
            {item.year}
          </span>
          {item.status === "Current" && (
            <span style={{
              fontSize: "0.62rem", color: "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.6)", display:"inline-block", animation:"pulse-ring 2s infinite" }} />
              Current
            </span>
          )}
        </div>

        <h3 style={{ fontSize:"0.975rem", fontWeight:600, color:"white", letterSpacing:"-0.015em", marginBottom:"4px" }}>
          {item.degree}
        </h3>
        <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", marginBottom:"6px" }}>
          {item.institution}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"0.6rem" }}>
          <MapPin size={11} color="rgba(255,255,255,0.22)" />
          <span style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.25)" }}>{item.location}</span>
        </div>
        {item.description && (
          <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.35)", lineHeight:1.65 }}>
            {item.description}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default function Education() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-8% 0px" });

  return (
    <section id="education" className="section">
      <div className="container">

        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label glass-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ padding: "6px 14px", borderRadius: "99px" }}
          >
            Education
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, letterSpacing:"-0.035em", color:"white", lineHeight:1.1 }}
          >
            Academic journey
          </motion.h2>
        </div>

        {/* timeline */}
        <div style={{ maxWidth: "640px", marginInline: "auto" }}>
          {education.map((edu, i) => (
            <TimelineItem key={edu.id} item={edu} index={i} isLast={i === education.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}