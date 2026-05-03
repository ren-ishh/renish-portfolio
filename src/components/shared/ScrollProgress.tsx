"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 9997, pointerEvents: "none",
    }}>
      <div style={{
        height: "100%",
        width:  `${pct}%`,
        background: "linear-gradient(90deg, rgba(255,255,255,0.72), #fff 42%, rgba(255,255,255,0.88))",
        boxShadow: "0 0 14px rgba(255,255,255,0.35)",
        opacity: pct > 1 ? 1 : 0,
        transition: "width 0.12s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease",
      }} />
    </div>
  );
}