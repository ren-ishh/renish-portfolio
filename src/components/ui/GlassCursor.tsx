"use client";

import { useEffect, useRef } from "react";

export default function GlassCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef<number>(0);
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device — hide elements and bail entirely
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (dotRef.current)  dotRef.current.style.display  = "none";
      if (ringRef.current) ringRef.current.style.display = "none";
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`;
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         4,
          height:        4,
          borderRadius:  "50%",
          background:    "#ffffff",
          pointerEvents: "none",
          zIndex:        99999,
          willChange:    "transform",
          // Start off-screen until mouse moves
          transform:     "translate(-200px, -200px)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position:             "fixed",
          top:                  0,
          left:                 0,
          width:                20,
          height:               20,
          borderRadius:         "50%",
          border:               "1px solid rgba(255,255,255,0.25)",
          background:           "transparent",
          backdropFilter:       "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          pointerEvents:        "none",
          zIndex:               99998,
          willChange:           "transform",
          // Start off-screen until mouse moves
          transform:            "translate(-200px, -200px)",
        }}
      />
    </>
  );
}