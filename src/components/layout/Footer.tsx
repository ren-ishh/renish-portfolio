import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-white/50 text-center md:text-left max-w-md">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="p-2.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {currentYear} {siteConfig.fullName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}