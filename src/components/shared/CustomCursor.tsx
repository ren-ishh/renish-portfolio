"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      dot.style.opacity    = "1";
      ring.style.opacity   = "1";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animate);
    };

    const onLinkEnter = () => {
      ring.style.width           = "52px";
      ring.style.height          = "52px";
      ring.style.borderColor     = "rgba(255,255,255,0.7)";
      ring.style.backgroundColor = "rgba(255,255,255,0.04)";
      dot.style.transform        = dot.style.transform.replace("translate(-50%, -50%)", "translate(-50%, -50%) scale(0)");
      dot.style.opacity          = "0";
    };

    const onLinkLeave = () => {
      ring.style.width           = "28px";
      ring.style.height          = "28px";
      ring.style.borderColor     = "rgba(255,255,255,0.25)";
      ring.style.backgroundColor = "transparent";
      dot.style.opacity          = "1";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(animate);

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        (el as HTMLElement).addEventListener("mouseenter", onLinkEnter);
        (el as HTMLElement).addEventListener("mouseleave", onLinkLeave);
      });
    };

    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          zIndex: 99999,
          width: "5px", height: "5px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0,
          pointerEvents: "none",
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          zIndex: 99998,
          width: "28px", height: "28px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          opacity: 0,
          pointerEvents: "none",
          willChange: "transform",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, opacity 0.3s",
        }}
      />
    </>
  );
}