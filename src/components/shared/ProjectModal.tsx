"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitBranch, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position:             "fixed",
            inset:                0,
            zIndex:               200,
            background:           "rgba(0,0,0,0.75)",
            backdropFilter:       "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display:              "flex",
            alignItems:           "center",
            justifyContent:       "center",
            padding:              "1rem",
            overflowY:            "auto",
          }}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 12,  scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position:       "relative",
              width:          "100%",
              maxWidth:       "560px",
              maxHeight:      "calc(100dvh - 2rem)",
              overflowY:      "auto",
              background:     "#0f0f0f",
              border:         "1px solid rgba(255,255,255,0.09)",
              borderRadius:   "16px",
              padding:        "2rem",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
              flexShrink:     0,
            }}
          >
            {/* close */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position:       "absolute",
                top:            "1rem",
                right:          "1rem",
                width:          30,
                height:         30,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                borderRadius:   "8px",
                border:         "none",
                background:     "rgba(255,255,255,0.06)",
                color:          "rgba(255,255,255,0.5)",
                flexShrink:     0,
              }}
            >
              <X size={14} />
            </button>

            {/* badge */}
            <span style={{
              display:       "inline-block",
              padding:       "2px 10px",
              borderRadius:  "99px",
              fontSize:      "11px",
              fontWeight:    500,
              background:    "rgba(255,255,255,0.05)",
              color:         "rgba(255,255,255,0.35)",
              letterSpacing: "0.06em",
              marginBottom:  "0.8rem",
            }}>
              {project.status}
            </span>

            {/* title */}
            <h2 style={{
              fontSize:      "1.4rem",
              fontWeight:    700,
              letterSpacing: "-0.025em",
              color:         "white",
              marginBottom:  "0.75rem",
              paddingRight:  "2rem",
              lineHeight:    1.2,
            }}>
              {project.title}
            </h2>

            {/* description */}
            <p style={{
              color:         "rgba(255,255,255,0.48)",
              lineHeight:    1.75,
              fontSize:      "0.9rem",
              marginBottom:  "1.75rem",
            }}>
              {project.longDescription}
            </p>

            {/* stack */}
            <div style={{ marginBottom: "1.75rem" }}>
              <p style={{
                fontSize:      "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.22)",
                marginBottom:  "0.5rem",
              }}>
                Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    padding:      "4px 12px",
                    borderRadius: "6px",
                    fontSize:     "12px",
                    background:   "rgba(255,255,255,0.05)",
                    border:       "1px solid rgba(255,255,255,0.08)",
                    color:        "rgba(255,255,255,0.65)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* links */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "7px",
                  padding:        "8px 18px",
                  borderRadius:   "8px",
                  fontSize:       "13px",
                  fontWeight:     500,
                  background:     "rgba(255,255,255,0.07)",
                  border:         "1px solid rgba(255,255,255,0.09)",
                  color:          "white",
                  textDecoration: "none",
                }}
              >
                <GitBranch size={14} /> GitHub
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "7px",
                    padding:        "8px 18px",
                    borderRadius:   "8px",
                    fontSize:       "13px",
                    fontWeight:     500,
                    background:     "white",
                    color:          "black",
                    border:         "none",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}