import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Preloader from "@/components/motion/Preloader";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshuaomeonu.com"), // ← change to your real domain
  title: "Joshua Omeonu — Full-stack engineer, Lagos",
  description:
    "Full-stack engineer in Lagos building production software for retail, property and education businesses. React, Next.js, TypeScript, Node.",
  openGraph: {
    title: "Joshua Omeonu — Full-stack engineer, Lagos",
    description:
      "Production software for retail, property and education businesses. React, Next.js, TypeScript, Node.",
    type: "website",
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* GSAP reveals these; without JS they must simply be visible. */}
        <noscript>
          <style>{`.gsap-hide{visibility:visible!important}.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-[#0B0E13] text-[#E9ECF1] antialiased">
        <SmoothScroll />
        <Preloader />
        <Cursor />
        <div aria-hidden className="grain" />
        <a
          href="#main"
          className="u-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-[#F5F2EC] focus:px-3 focus:py-2 focus:text-xs focus:text-[#0B0E13]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}