"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate toward end
        const increment = p < 60 ? 3 : p < 85 ? 2 : 0.8;
        return Math.min(p + increment, 100);
      });
    }, 30);

    // Dismiss after ~1.6s
    const timer = setTimeout(() => setLoading(false), 1700);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#080808" }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 text-center"
          >
            <span
              className="text-white font-bold"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              {siteConfig.name}
            </span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-sm tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}
            >
              {siteConfig.title}
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 relative"
          >
            {/* Track */}
            <div
              className="w-full h-[1px] rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-[1px] rounded-full"
              style={{
                background: "white",
                width: `${progress}%`,
                boxShadow: "0 0 8px rgba(255,255,255,0.6)",
              }}
            />
            {/* Percent */}
            <div
              className="mt-3 text-right text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {Math.floor(progress)}
            </div>
          </motion.div>

          {/* Subtle bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 text-xs"
            style={{ color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}
          >
            portfolio · {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}