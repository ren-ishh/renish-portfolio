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
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(10px)",
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 201,
              width: "min(580px, 92vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            {/* close */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "none",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <X size={14} />
            </button>

            {/* badge */}
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 500,
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.06em",
                marginBottom: "0.8rem",
              }}
            >
              {project.status}
            </span>

            <h2
              style={{
                fontSize: "1.45rem",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "white",
                marginBottom: "0.75rem",
              }}
            >
              {project.title}
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.75,
                fontSize: "0.9rem",
                marginBottom: "1.75rem",
              }}
            >
              {project.longDescription}
            </p>

            {/* tech */}
            <div style={{ marginBottom: "1.75rem" }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  marginBottom: "0.5rem",
                }}
              >
                Stack
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* links */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "white",
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
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: "white",
                    color: "black",
                    border: "none",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}