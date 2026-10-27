"use client";

import { createElement, useRef } from "react";
import { gsap, useGSAP, SplitText, MOTION_OK } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
};

/**
 * Heading whose lines slide up out of a mask when scrolled into view.
 * autoSplit re-splits after web fonts load and on resize, so the line
 * breaks always match what's actually rendered.
 */
export default function SplitHeading({ children, as = "h2", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(ref.current, { autoAlpha: 1 });
            return gsap.from(self.words, {
              yPercent: 110,
              rotate: 4,
              duration: 1,
              ease: "expo.out",
              stagger: 0.04,
              scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return createElement(as, { ref, className: `gsap-hide ${className}` }, children);
}
