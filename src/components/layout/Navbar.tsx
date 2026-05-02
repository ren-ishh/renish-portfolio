"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education",    href: "#education" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeSection, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <div
          style={{
            background: scrolled ? "rgba(8,8,8,0.8)" : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
          }}
        >
          <nav
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 2.5rem",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {siteConfig.name}
              </span>
              <motion.span
                style={{
                  display: "block",
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: "white",
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>

            {/* ── Desktop nav ── */}
            <ul
              style={{
                display: "none",
                listStyle: "none",
              }}
              className="md-nav"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href} style={{ display: "inline-block" }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        padding: "6px 12px",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)",
                        textDecoration: "none",
                        borderRadius: "6px",
                        transition: "color 0.2s",
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          style={{
                            position: "absolute", inset: 0,
                            borderRadius: "6px",
                            background: "rgba(255,255,255,0.07)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ── Desktop right ── */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
              className="desktop-right"
            >
              {[
                { href: siteConfig.github,   Icon: FiGithub,   label: "GitHub" },
                { href: siteConfig.linkedin, Icon: FiLinkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "34px", height: "34px",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.35)",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                style={{
                  padding: "6px 18px",
                  borderRadius: "99px",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "white",
                  background: "transparent",
                  textDecoration: "none",
                  transition: "background 0.25s, border-color 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "black";
                  e.currentTarget.style.borderColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                Hire Me
              </a>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                display: "none",
                alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px",
                borderRadius: "8px",
                background: "transparent",
                border: "none",
                color: "white",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </div>

        {/* Responsive styles injected */}
        <style>{`
          @media (min-width: 768px) {
            .md-nav { display: flex !important; gap: 2px; }
            .desktop-right { display: flex !important; }
            .mobile-menu-btn { display: none !important; }
          }
          @media (max-width: 767px) {
            .md-nav { display: none !important; }
            .desktop-right { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
            nav { padding: 0 1.25rem !important; }
          }
        `}</style>
      </motion.header>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", inset: 0,
              zIndex: 99,
              display: "flex", flexDirection: "column",
              background: "rgba(5,5,5,0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "1.25rem 1.25rem 0" }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", padding: "8px",
                  borderRadius: "8px", border: "none",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                flex: 1, gap: "4px",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      display: "block",
                      padding: "10px 32px",
                      fontSize: "1.75rem",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      color: activeSection === link.href.slice(1)
                        ? "white"
                        : "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom socials */}
            <div
              style={{
                display: "flex", justifyContent: "center", gap: "20px",
                padding: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <a href={siteConfig.github} target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                <FiGithub size={18} />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}