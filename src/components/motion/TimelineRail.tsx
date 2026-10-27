"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * A vertical rail that fills as you read down the story, with a marker
 * riding its leading edge. Each chapter's `.rail-node` lights up as the
 * marker reaches it. On phones the rail sits at the content's left edge
 * (chapters are padded to clear it); from md up it moves into the gutter.
 */
export default function TimelineRail({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = {
          trigger: root.current,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 0.4,
        };
        gsap.fromTo(".rail-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger });
        gsap.fromTo(".rail-marker", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger });

        gsap.utils.toArray<HTMLElement>(".rail-node").forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top 65%",
            toggleClass: { targets: node, className: "is-lit" },
          });
        });
      });

      // Without motion, every node is simply lit.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".rail-node").forEach((n) => n.classList.add("is-lit"));
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-[#151A22] md:-left-8">
        <div className="rail-fill absolute inset-0 origin-top bg-[#7FA8C9]/70" />
        <div className="rail-marker absolute left-1/2 top-0 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#7FA8C9] bg-[#0B0E13]" />
      </div>
      {children}
    </div>
  );
}
