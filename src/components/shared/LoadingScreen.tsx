"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function LoadingScreen() {
  const [visible,  setVisible]  = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        const step = p < 60 ? 4 : p < 85 ? 2 : 0.7;
        return Math.min(p + step, 100);
      });
    }, 28);

    const t = setTimeout(() => setVisible(false), 1800);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#080808",
          }}
        >
          {/* subtle dot-grid bg */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, opacity: 0.03,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span
              style={{
                fontSize: "clamp(2.4rem, 7vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "white",
              }}
            >
              {siteConfig.name}
            </span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: "0.4rem",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              {siteConfig.title}
            </motion.p>
          </motion.div>

          {/* progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ width: "160px" }}
          >
            <div style={{
              width: "100%", height: "1px",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "99px",
              position: "relative",
            }}>
              <div
                className="loading-bar-glow"
                style={{
                position: "absolute", left: 0, top: 0,
                height: "100%", borderRadius: "99px",
                boxShadow: "0 0 12px rgba(255,255,255,0.45)",
                width: `${progress}%`,
                transition: "width 0.1s linear",
              }}
              />
            </div>
            <div style={{
              marginTop: "0.6rem",
              textAlign: "right",
              fontSize: "0.65rem",
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "rgba(255,255,255,0.15)",
            }}>
              {Math.floor(progress)}
            </div>
          </motion.div>

          <p style={{
            position: "absolute", bottom: "2rem",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.1)",
          }}>
            portfolio · {new Date().getFullYear()}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}