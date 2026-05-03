"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/data";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    NAV.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;

      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(href.slice(1));
        },
        { rootMargin: "-38% 0px -58% 0px" }
      );

      o.observe(el);
      obs.push(o);
    });

    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 100 }}
      >
        <div 
          className={scrolled ? "glass" : ""}
          style={{ transition: "background .4s, border-color .4s" }}
        >
          <nav
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "0 2rem",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {siteConfig.name}
              </span>

              <motion.span
                style={{
                  display: "block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "white",
                }}
                animate={{ scale: [1, 1.55, 1], opacity: [1, 0.45, 1] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Link>

            <ul
              style={{ display: "flex", listStyle: "none", gap: "2px" }}
              className="hidden-mobile"
            >
              {NAV.map(({ label, href }) => {
                const isActive = active === href.slice(1);

                return (
                  <li key={href}>
                    <motion.a
                      href={href}
                      onClick={(e) => go(e, href)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 480, damping: 30 }}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        padding: "6px 13px",
                        fontSize: "0.855rem",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                          ? "white"
                          : "rgba(255,255,255,0.42)",
                        textDecoration: "none",
                        borderRadius: "7px",
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pill"
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "7px",
                            background: "rgba(255,255,255,0.07)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                        />
                      )}

                      <span style={{ position: "relative", zIndex: 1 }}>
                        {label}
                      </span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            <div
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
              className="hidden-mobile"
            >
              {[
                { href: siteConfig.github, Icon: Github, label: "GitHub" },
                { href: siteConfig.linkedin, Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2, color: "#fff", backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 460, damping: 26 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.32)",
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}

              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                style={{
                  marginLeft: "4px",
                  padding: "6px 18px",
                  borderRadius: "99px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.17)",
                  color: "white",
                  background: "transparent",
                  textDecoration: "none",
                  transition:
                    "background .25s, color .25s, border-color .25s",
                }}
              >
                Hire Me
              </a>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="show-mobile"
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "8px",
                background: "transparent",
                border: "none",
                color: "white",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.13 }}
                  style={{ display: "flex" }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .hidden-mobile { display: none !important; }
            .show-mobile { display: flex !important; }
            nav { padding: 0 1.1rem !important; }
          }
        `}</style>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(28px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1.2rem 1.2rem 0",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: "2px",
              }}
            >
              {NAV.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.055,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={href}
                    onClick={(e) => go(e, href)}
                    style={{
                      display: "block",
                      padding: "10px 36px",
                      fontSize: "1.85rem",
                      fontWeight: 300,
                      letterSpacing: "-0.025em",
                      color:
                        active === href.slice(1)
                          ? "white"
                          : "rgba(255,255,255,0.3)",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                padding: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.055)",
              }}
            >
              {[
                { href: siteConfig.github, Icon: Github },
                { href: siteConfig.linkedin, Icon: Linkedin },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.32)",
                    transition: "color .2s",
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}