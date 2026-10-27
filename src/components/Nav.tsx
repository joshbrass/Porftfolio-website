"use client";

import { useEffect, useRef, useState } from "react";
import { nav, person } from "@/data/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  // Reading-progress hairline along the bottom edge of the bar.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    });
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-[#1C222C] bg-[#0B0E13]/95 backdrop-blur-md"
          : "border-b border-transparent bg-[#0B0E13]/80 backdrop-blur-sm"
      }`}
    >
      <span
        ref={progress}
        aria-hidden
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[#7FA8C9] motion-reduce:hidden"
      />
      <div className="mx-auto flex h-[68px] w-full max-w-5xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo / Identity */}
        <a
          href="#top"
          onClick={closeMenu}
          className="u-mono flex min-w-0 items-baseline gap-2 text-[11px] tracking-[0.1em] text-[#E9ECF1] sm:gap-3 sm:text-[12px] sm:tracking-[0.12em]"
        >
          <span className="shrink-0">{person.initials}</span>

          <span className="hidden text-[#4E5B6B] sm:inline">—</span>

          <span className="hidden truncate text-[#8B95A5] sm:inline">
            {person.base}
          </span>
        </a>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="u-mono hidden items-center gap-5 text-[11px] tracking-[0.06em] md:flex lg:gap-7 lg:text-[12px] lg:tracking-[0.08em]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="draw-link whitespace-nowrap text-[#8B95A5] transition-colors hover:text-[#E9ECF1]"
            >
              {item.label}
            </a>
          ))}

          <a
            href={person.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-sm border border-[#2A3341] px-3 py-1.5 text-[#E9ECF1] transition-colors hover:border-[#7FA8C9] hover:text-[#7FA8C9]"
          >
            Résumé
          </a>
        </nav>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#2A3341] md:hidden"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`block h-px w-full bg-[#E9ECF1] transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`block h-px w-full bg-[#E9ECF1] transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block h-px w-full bg-[#E9ECF1] transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <div
        className={`overflow-hidden border-t border-[#1C222C] bg-[#0B0E13] transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[calc(100vh-68px)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="u-mono mx-auto flex w-full max-w-5xl flex-col px-4 pb-6 pt-3 sm:px-6">
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex min-h-[52px] items-center border-b border-[#1C222C] text-[12px] tracking-[0.08em] text-[#8B95A5] transition-colors hover:text-[#E9ECF1] active:text-[#E9ECF1]"
              style={{
                transitionDelay: menuOpen ? `${index * 35}ms` : "0ms",
              }}
            >
              <span>{item.label}</span>
            </a>
          ))}

          {/* Mobile Resume */}
          <a
            href={person.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-5 flex min-h-[48px] items-center justify-center rounded-sm border border-[#2A3341] px-4 text-[12px] tracking-[0.08em] text-[#E9ECF1] transition-colors hover:border-[#7FA8C9] hover:text-[#7FA8C9] active:border-[#7FA8C9] active:text-[#7FA8C9]"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}