"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";
import ProjectModal from "@/components/shared/ProjectModal";
import type { Project } from "@/types";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const { ref, inView } = useScrollAnimation("-5% 0px");
  const [hovered, setHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) return;
    onSelect(project);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 420, damping: 28 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      className="glass-sm"
      style={{
        position:       "relative",
        padding:        "1.75rem",
        borderRadius:  "14px",
        border:        `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "var(--border)"}`,
        transition:    "border-color .25s, box-shadow .25s",
        boxShadow:     hovered
          ? "0 16px 32px rgba(0,0,0,0.4)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        display:       "flex",
        flexDirection: "column",
        gap:           "1rem",
        cursor:        "pointer",
        touchAction:   "manipulation",
      }}
    >
      {/* top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontSize:      "0.65rem",
          fontWeight:    500,
          padding:       "3px 10px",
          borderRadius:  "99px",
          background:    "rgba(255,255,255,0.05)",
          border:        "1px solid rgba(255,255,255,0.07)",
          color:         "rgba(255,255,255,0.3)",
          letterSpacing: "0.06em",
        }}>
          {project.status}
        </span>

        <div style={{ display: "flex", gap: "6px" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          36,
              height:         36,
              minWidth:       44,
              minHeight:      44,
              borderRadius:   "8px",
              border:         "1px solid rgba(255,255,255,0.07)",
              color:          "rgba(255,255,255,0.35)",
              transition:     "color .2s, border-color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            <GitBranch size={13} />
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label="View live demo"
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          36,
                height:         36,
                minWidth:       44,
                minHeight:      44,
                borderRadius:   "8px",
                border:         "1px solid rgba(255,255,255,0.07)",
                color:          "rgba(255,255,255,0.35)",
                transition:     "color .2s, border-color .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* title */}
      <div>
        <h3 style={{
          fontSize:      "1rem",
          fontWeight:    600,
          letterSpacing: "-0.015em",
          color:         "white",
          marginBottom:  "0.4rem",
          display:       "flex",
          alignItems:    "center",
          gap:           "6px",
        }}>
          {project.title}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={14} color="rgba(255,255,255,0.4)" />
          </motion.span>
        </h3>
        <p style={{
          fontSize:   "0.82rem",
          color:      "rgba(255,255,255,0.4)",
          lineHeight: 1.65,
        }}>
          {project.description}
        </p>
      </div>

      {/* tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            padding:      "3px 10px",
            borderRadius: "5px",
            fontSize:     "11px",
            background:   "rgba(255,255,255,0.04)",
            border:       "1px solid rgba(255,255,255,0.07)",
            color:        "rgba(255,255,255,0.5)",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* click hint */}
      <p style={{
        fontSize:      "0.68rem",
        color:         "rgba(255,255,255,0.18)",
        letterSpacing: "0.04em",
        opacity:       hovered ? 1 : 0,
        transition:    "opacity .2s",
      }}>
        Click to read more →
      </p>
    </motion.div>
  );
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { ref: headRef, inView } = useScrollAnimation();
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* header */}
        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label glass-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ padding: "6px 14px", borderRadius: "99px" }}
          >
            Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize:      "clamp(2rem,5vw,3rem)",
              fontWeight:    700,
              letterSpacing: "-0.035em",
              color:         "white",
              lineHeight:    1.1,
            }}
          >
            Things I&apos;ve built
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            style={{
              marginTop:  "0.75rem",
              fontSize:   "0.95rem",
              color:      "rgba(255,255,255,0.38)",
              lineHeight: 1.75,
            }}
          >
            A collection of projects built while learning — from Python games to
            web interfaces. Click any card for details.
          </motion.p>
        </div>

        {/* grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            No starred repos yet.{/* */}
            <br />
            <a
              href="https://github.com/ren-ishh"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Browse GitHub →
            </a>
          </motion.div>
        ) : (
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap:                 "1rem",
          }}>
            {displayedProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}

        {/* View All / GitHub CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ 
            marginTop: "2.5rem", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "1.25rem" 
          }}
        >
          {/* Toggle Button */}
          {projects.length > displayedProjects.length || showAll ? (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "10px 24px", 
                borderRadius: "99px", 
                fontSize: "0.845rem", 
                fontWeight: 500,
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white", 
                cursor: "pointer", 
                transition: "background .2s, border-color .2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          ) : null}

          <a
            href="https://github.com/ren-ishh"
            target="_blank"
            rel="noreferrer"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "8px",
              fontSize:       "0.8rem",
              color:          "rgba(255,255,255,0.4)",
              textDecoration: "none",
              transition:     "color .2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "white"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
          >
            <GitBranch size={13} /> Explore more on GitHub
          </a>
        </motion.div>
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}