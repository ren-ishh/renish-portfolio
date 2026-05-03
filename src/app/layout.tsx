import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";

// 1. Import the new GlassCursor (and remove the old CustomCursor import)
import GlassCursor   from "@/components/ui/GlassCursor"; 

import ScrollProgress from "@/components/shared/ScrollProgress";
import LoadingScreen from "@/components/shared/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renish Kanzariya — Full Stack Developer",
  description:
    "First-year B.Tech CSE student at LPU building real-world projects. Open to internships and collaborations.",
  keywords: ["Renish", "Kanzariya", "Full Stack Developer", "React", "Next.js", "LPU", "DevOps"],
  authors: [{ name: "Renish Kanzariya" }],
  creator: "Renish Kanzariya",
  metadataBase: new URL("https://renish.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://renish.vercel.app",
    title: "Renish Kanzariya — Full Stack Developer",
    description: "Building real-world projects. Open to internships.",
    siteName: "Renish Kanzariya",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Renish Kanzariya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renish Kanzariya",
    description: "Full Stack Developer — React, Next.js, Node.js",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor:  "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingScreen />
        
        {/* 2. Add GlassCursor here (replaced CustomCursor) */}
        <GlassCursor /> 
        
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}