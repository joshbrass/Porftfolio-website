"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Screenshot opens out from a smaller frame, then drifts slightly
 * against the scroll — enough parallax to feel physical, not enough
 * to crop anything important.
 */
export default function ImageReveal({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          outer.current,
          { clipPath: "inset(14% 10% 14% 10% round 2px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2px)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: outer.current, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          inner.current,
          { scale: 1.18, yPercent: -4 },
          {
            scale: 1.04,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: outer.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: outer }
  );

  return (
    <div ref={outer} className="overflow-hidden rounded-[2px]">
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
