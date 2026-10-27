"use client";

import { useRef } from "react";
import { statement } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The words are the visual. A tall section with a sticky stage: as you
 * scroll, each lead line rises through its mask and fills from graphite
 * to chalk, word by word. Then the highlighted phrase swaps once per
 * audience — old phrase out the top, new one up from below — while the
 * project that proves it changes underneath and a segmented bar tracks
 * where you are.
 *
 * Sticky positioning (not a GSAP pin) keeps it compatible with Lenis and
 * leaves no pin-spacer in the DOM. Reduced motion collapses it to a
 * normal-height block showing the first phrase.
 */
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const { lead, audiences } = statement;
  const total = String(audiences.length).padStart(2, "0");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const phrases = gsap.utils.toArray<HTMLElement>(".stmt-phrase");
        const projects = gsap.utils.toArray<HTMLElement>(".stmt-project");
        const segments = gsap.utils.toArray<HTMLElement>(".stmt-seg");

        gsap.set(phrases.slice(1), { yPercent: 110 });
        gsap.set(projects.slice(1), { yPercent: 110 });
        gsap.set([...phrases, ...projects], { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // 1. Lead lines: words rise out of each line's mask and fill in.
        tl.fromTo(
          ".stmt-word",
          { yPercent: 115, color: "#2A3341" },
          { yPercent: 0, color: "#E9ECF1", duration: 0.5, stagger: 0.12, ease: "power3.out" },
          0
        );

        // 2. First phrase wipes up into place; the meta row arrives with it.
        const firstAt = 0.12 * (lead.join(" ").split(" ").length - 1) + 0.3;
        tl.fromTo(phrases[0], { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, firstAt)
          .fromTo(projects[0], { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, firstAt)
          .fromTo(".stmt-meta", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, firstAt)
          .fromTo(segments[0], { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, firstAt);

        const counter = root.current?.querySelector<HTMLElement>(".stmt-count");
        const setCount = (i: number) => {
          // Scrubbing backwards fires the call too — read the direction.
          const n = tl.scrollTrigger && tl.scrollTrigger.direction < 0 ? i : i + 1;
          if (counter) counter.textContent = String(n).padStart(2, "0");
        };

        // 3. Each later audience replaces the one before it.
        for (let i = 1; i < audiences.length; i++) {
          const at = firstAt + 0.6 + (i - 1) * 1.1 + 0.4;
          tl.to(phrases[i - 1], { yPercent: -110, duration: 0.5 }, at)
            .to(phrases[i], { yPercent: 0, duration: 0.5 }, at + 0.1)
            .to(projects[i - 1], { yPercent: -110, duration: 0.4 }, at)
            .to(projects[i], { yPercent: 0, duration: 0.4 }, at + 0.1)
            .fromTo(segments[i], { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, at + 0.1)
            .call(() => setCount(i), [], at + 0.3);
        }

        // Hold on the last audience before the section scrolls away.
        tl.to({}, { duration: 0.6 });

      });
    },
    { scope: root }
  );

  // Words are flattened so the stagger runs across lines in reading order.
  let wordIndex = 0;

  return (
    <section
      ref={root}
      aria-label="What I build"
      className="relative h-[380vh] border-t border-[#1C222C] motion-reduce:h-auto md:h-[420vh]"
    >
      {/* Full sentence for assistive tech — the visual is animated pieces. */}
      <p className="sr-only">
        {lead.join(" ")} {audiences.map((a) => a.phrase.replace(/\.$/, "")).join(", ")}.
      </p>

      <div
        aria-hidden
        className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-6 sm:px-8 motion-reduce:static motion-reduce:h-auto motion-reduce:py-28"
      >
        <div className="mx-auto w-full max-w-5xl">
          <p className="u-mono mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#4E5B6B] md:mb-12">
            <span className="text-[#7FA8C9]">Statement</span>
            <span className="h-px w-8 bg-[#2A3341]" />
            <span>What I build</span>
          </p>

          <h2 className="u-display text-[clamp(2.5rem,9vw,7rem)] font-light leading-[1.02] tracking-[-0.03em] text-[#E9ECF1]">
            {lead.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                {line.split(" ").map((word) => (
                  <span key={`${word}-${wordIndex++}`} className="stmt-word mr-[0.24em] inline-block last:mr-0">
                    {word}
                  </span>
                ))}
              </span>
            ))}

            {/* Swapping phrase: every option stacked in one grid cell, so the
                line reserves the width of the longest and never reflows. */}
            <span className="grid overflow-hidden pb-[0.1em] -mb-[0.1em] [grid-template-areas:'s']">
              {audiences.map((a, i) => (
                <span
                  key={a.phrase}
                  className={`stmt-phrase whitespace-nowrap italic text-[#7FA8C9] [grid-area:s] ${
                    i === 0 ? "" : "invisible"
                  }`}
                >
                  {a.phrase}
                </span>
              ))}
            </span>
          </h2>

          <div className="stmt-meta mt-10 md:mt-14">
            <div className="flex gap-1.5">
              {audiences.map((a) => (
                <span key={a.phrase} className="h-px flex-1 bg-[#1C222C]">
                  <span className="stmt-seg block h-full origin-left bg-[#7FA8C9]" />
                </span>
              ))}
            </div>
            <div className="u-mono mt-4 flex items-baseline gap-4 text-[11px] uppercase tracking-[0.16em]">
              <span className="text-[#4E5B6B]">
                <span className="stmt-count text-[#C7CED8]">01</span> / {total}
              </span>
              <span className="text-[#3A4552]">See</span>
              <span className="grid overflow-hidden [grid-template-areas:'s']">
                {audiences.map((a, i) => (
                  <span
                    key={a.project}
                    className={`stmt-project text-[#7FA8C9] [grid-area:s] ${i === 0 ? "" : "invisible"}`}
                  >
                    {a.project}
                  </span>
                ))}
              </span>
              <span className="ml-auto hidden text-[#3A4552] md:inline">Keep scrolling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
