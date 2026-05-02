"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else         document.body.style.overflow = "";
    return ()  => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 201,
              width: "min(560px, 92vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "32px", height: "32px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
                border: "none",
              }}
            >
              <X size={15} />
            </button>

            {/* Status badge */}
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 500,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
              }}
            >
              {project.status}
            </span>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              {project.title}
            </h2>

            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.925rem" }}>
              {project.longDescription}
            </p>

            {/* Tech stack */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px", fontWeight: 500,
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                }}
              >
                <Github size={14} /> GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px", fontWeight: 500,
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