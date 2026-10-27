"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** A hairline that draws itself left-to-right as it scrolls into view —
 *  the pen stroke that opens each section. */
export default function DrawRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 45%", scrub: 0.6 },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`h-px origin-left bg-gradient-to-r from-[#7FA8C9]/60 via-[#1C222C] to-[#1C222C] ${className}`}
    />
  );
}
