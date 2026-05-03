"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      dot.style.opacity   = "1";
      ring.style.opacity  = "1";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      rx = lerp(rx, mx, 0.11);
      ry = lerp(ry, my, 0.11);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const enter = () => {
      ring.style.width           = "54px";
      ring.style.height          = "54px";
      ring.style.borderColor     = "rgba(255,255,255,0.65)";
      ring.style.backgroundColor = "rgba(255,255,255,0.03)";
      dot.style.opacity = "0";
    };
    const leave = () => {
      ring.style.width           = "28px";
      ring.style.height          = "28px";
      ring.style.borderColor     = "rgba(255,255,255,0.22)";
      ring.style.backgroundColor = "transparent";
      dot.style.opacity = "1";
    };

    const attach = () =>
      document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });

    document.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed", top: 0, left: 0,
    pointerEvents: "none", willChange: "transform",
  };

  return (
    <>
      <div ref={dotRef} style={{
        ...base, zIndex: 99999,
        width: "5px", height: "5px", borderRadius: "50%",
        background: "white", opacity: 0,
        transition: "opacity 0.2s",
      }} />
      <div ref={ringRef} style={{
        ...base, zIndex: 99998,
        width: "28px", height: "28px", borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.22)",
        opacity: 0,
        transition:
          "width .22s ease, height .22s ease, border-color .22s ease, background-color .22s ease, opacity .3s",
      }} />
    </>
  );
}