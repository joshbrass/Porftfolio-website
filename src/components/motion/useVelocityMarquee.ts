"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

type Options = {
  /** 1 scrolls left, -1 scrolls right. */
  direction?: 1 | -1;
  /** Seconds for one full loop at rest. */
  duration?: number;
  /** Elements to skew with scroll speed. */
  skewSelector?: string;
};

/**
 * Infinite marquee whose speed follows the scroll: it idles slowly,
 * surges when you scroll fast, and reverses when you scroll back up.
 * The track must contain its items twice so -50% loops seamlessly.
 */
export function useVelocityMarquee(
  scope: RefObject<HTMLElement>,
  track: RefObject<HTMLElement>,
  { direction = 1, duration = 40, skewSelector }: Options = {}
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const loop = gsap.fromTo(
          track.current,
          { xPercent: direction === 1 ? 0 : -50 },
          { xPercent: direction === 1 ? -50 : 0, duration, ease: "none", repeat: -1 }
        );

        const skew = skewSelector
          ? gsap.quickTo(gsap.utils.toArray(skewSelector, scope.current), "skewX", {
              duration: 0.5,
              ease: "power3",
            })
          : null;
        const clampSkew = gsap.utils.clamp(-8, 8);

        let scrollDir = 1;
        let boost = 0;
        let hoverDamp = 1;

        const st = ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const v = self.getVelocity();
            scrollDir = self.direction;
            boost = Math.min(Math.abs(v) / 250, 6);
            skew?.(clampSkew(v / -250));
          },
        });

        const tick = () => {
          boost *= 0.92;
          const target = scrollDir * (1 + boost) * hoverDamp;
          loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.1));
        };
        gsap.ticker.add(tick);

        const el = scope.current;
        const slow = () => (hoverDamp = 0.2);
        const resume = () => (hoverDamp = 1);
        el?.addEventListener("pointerenter", slow);
        el?.addEventListener("pointerleave", resume);

        return () => {
          gsap.ticker.remove(tick);
          st.kill();
          el?.removeEventListener("pointerenter", slow);
          el?.removeEventListener("pointerleave", resume);
        };
      });
    },
    { scope }
  );
}
