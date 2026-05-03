"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

const links = [
  { Icon: Mail, href: `mailto:${siteConfig.email}`, label: siteConfig.email },
  { Icon: Github, href: siteConfig.github, label: "github.com/ren-ishh" },
  {
    Icon: Linkedin,
    href: siteConfig.linkedin,
    label: "linkedin.com/in/ren-ishh",
  },
];

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-8% 0px" });

  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    background:
      focused === name
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.025)",
    border: `1px solid ${
      focused === name
        ? "rgba(255,255,255,0.18)"
        : "rgba(255,255,255,0.07)"
    }`,
    color: "white",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color .2s, background .2s",
    resize: "none",
    fontFamily: "inherit",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
        }
      );

      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
        console.error("EmailJS error:", err?.text || err?.message || JSON.stringify(err));
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "rgba(255,255,255,0.012)" }}
    >
      <div className="container">
        <div ref={headRef} className="section-head">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            style={{
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "white",
              lineHeight: 1.1,
            }}
          >
            Let&apos;s connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            style={{
              marginTop: "0.75rem",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75,
            }}
          >
            Open to internships, collaborations, and interesting conversations.
            Drop a message — I&apos;ll reply promptly.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
            maxWidth: "56rem",
            marginInline: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "0.25rem",
              }}
            >
              Reach me directly
            </p>

            {links.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  borderColor: "rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.85)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "11px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: "0.845rem",
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span>{label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="glass"
            style={{ borderRadius: "14px", padding: "1.5rem" }}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.22,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
            >
              <input type="hidden" name="to_name" value={siteConfig.fullName} />
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="from_name"
                  required
                  autoComplete="name"
                  style={inputStyle("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="reply_to"
                  type="email"
                  required
                  autoComplete="email"
                  style={inputStyle("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  style={{ ...inputStyle("message"), minHeight: "120px" }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02, y: -1 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "0.25rem",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "white",
                  color: "#080808",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: status === "sending" ? "wait" : "pointer",
                  opacity: status === "sending" ? 0.75 : 1,
                }}
              >
                {status === "sending" ? (
                  <>
                    <Loader size={16} className="animate-spin-slow" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send message
                  </>
                )}
              </motion.button>
              {status === "success" && (
                <p style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(120,220,160,0.95)" }}>
                  <CheckCircle size={16} /> Thanks — I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(255,140,140,0.95)" }}>
                  <AlertCircle size={16} /> Something went wrong. Try email instead?
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}