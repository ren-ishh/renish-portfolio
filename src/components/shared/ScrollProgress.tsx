"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "2px",
        zIndex: 9997,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "white",
          boxShadow: "0 0 6px rgba(255,255,255,0.5)",
          width: `${progress}%`,
          opacity: progress > 1 ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}