"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/data";

const socials = [
  { Icon: Github,    href: siteConfig.github,    label: "GitHub"    },
  { Icon: Linkedin,  href: siteConfig.linkedin,  label: "LinkedIn"  },
  { Icon: Twitter,   href: siteConfig.twitter,   label: "Twitter"   },
  { Icon: Instagram, href: siteConfig.instagram, label: "Instagram" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.055)",
      background: "#080808",
    }}>
      <div className="container" style={{ padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}>

        {/* logo */}
        <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.035em", color: "white" }}>
          {siteConfig.name}
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", fontWeight: 400, marginLeft: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            portfolio
          </span>
        </span>

        {/* socials */}
        <div style={{ display: "flex", gap: "8px" }}>
          {socials.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.08, y: -2, color: "#fff", borderColor: "rgba(255,255,255,0.22)", backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 460, damping: 26 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, borderRadius: "9px",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>

        {/* divider + bottom row */}
        <div style={{ width: "100%", maxWidth: "400px", height: "1px", background: "rgba(255,255,255,0.055)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "400px" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.03em" }}>
            © {new Date().getFullYear()} {siteConfig.fullName} · Built with Next.js
          </p>
          <motion.button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            whileHover={{ scale: 1.08, y: -2, color: "#fff", borderColor: "rgba(255,255,255,0.28)" }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 480, damping: 28 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "rgba(255,255,255,0.3)",
            }}
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}