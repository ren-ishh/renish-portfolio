"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Blog() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-8% 0px" });

  return (
    <section id="blog" className="section" style={{ background: "rgba(255,255,255,0.012)" }}>
      <div className="container">
        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label glass-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ padding: "6px 14px", borderRadius: "99px" }}
          >
            Blog
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "white", lineHeight: 1.1 }}
          >
            Coming Soon
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}
          >
            I'm currently working on some technical articles and project deep-dives. Check back later!
          </motion.p>
        </div>
      </div>
    </section>
  );
}