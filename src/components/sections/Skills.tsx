"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
        <span style={{ fontSize:"0.845rem", fontWeight:500, color:"rgba(255,255,255,0.78)" }}>{name}</span>
        <span style={{ fontSize:"0.72rem", fontFamily:"var(--font-geist-mono, monospace)", color:"rgba(255,255,255,0.25)" }}>
          {level}%
        </span>
      </div>
      {/* track */}
      <div style={{ height:"3px", borderRadius:"99px", background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ height:"100%", borderRadius:"99px", background:"white", boxShadow:"0 0 6px rgba(255,255,255,0.35)" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-8% 0px" });

  return (
    <section id="skills" className="section" style={{ background:"rgba(255,255,255,0.012)" }}>
      <div className="container">

        {/* header */}
        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label glass-sm"
            initial={{ opacity:0, y:10 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}
            style={{ padding: "6px 14px", borderRadius: "99px" }}
          >
            Skills
          </motion.p>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.65, delay:0.1, ease:[0.16,1,0.3,1] as const }}
            style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, letterSpacing:"-0.035em", color:"white", lineHeight:1.1 }}
          >
            What I work with
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:16 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.65, delay:0.18 }}
            style={{ marginTop:"0.75rem", fontSize:"0.95rem", color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}
          >
            Technologies I&apos;ve studied, used in projects, and am actively deepening.
          </motion.p>
        </div>

        {/* skill categories grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",
          gap:"1.25rem",
        }}>
          {skills.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity:0, y:28 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.65, delay:ci * 0.12, ease:[0.16,1,0.3,1] as const }}
              className="glass-sm"
              whileHover={{
                y: -5,
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: "0 20px 44px rgba(0,0,0,0.4)",
                transition: { type: "spring", stiffness: 400, damping: 26 },
              }}
              style={{ padding:"1.75rem", borderRadius: "14px", transition: "border-color .25s, box-shadow .25s" }}
            >
              {/* category label */}
              <p style={{
                fontSize:"0.68rem", fontWeight:600,
                letterSpacing:"0.14em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.25)", marginBottom:"1.5rem",
              }}>
                {cat.category}
              </p>

              {cat.items.map((skill, si) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={ci * 5 + si} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* disclaimer */}
        <motion.p
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.8 }}
          style={{
            marginTop:"2rem", textAlign:"center",
            fontSize:"0.72rem", color:"rgba(255,255,255,0.17)",
            letterSpacing:"0.04em",
          }}
        >
          Percentages reflect current comfort level — always growing.
        </motion.p>
      </div>
    </section>
  );
}