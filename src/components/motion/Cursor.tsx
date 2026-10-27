"use client";

import { useRef } from "react";
import { gsap, useGSAP, FINE_POINTER } from "@/lib/gsap";

/**
 * A drafting-pen cursor: a dot that tracks exactly and a ring that
 * lags behind it. The ring opens up over anything clickable, and
 * over elements with `data-cursor="Label"` it shows that label.
 * Native cursor stays visible — this is decoration, not a replacement.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(FINE_POINTER, () => {
      gsap.set([dot.current, ring.current], {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      });

      const dotX = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
      const dotY = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
      const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

      let visible = false;

      const onMove = (e: PointerEvent) => {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
        if (!visible) {
          visible = true;
          gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        }
      };

      const onOver = (e: PointerEvent) => {
        const target = (e.target as Element).closest?.("a, button, [data-cursor]");
        const text = target?.getAttribute("data-cursor") ?? "";
        const size = text ? 84 : target ? 46 : 28;

        gsap.to(ring.current, {
          width: size,
          height: size,
          backgroundColor: text ? "rgba(127,168,201,0.14)" : "rgba(127,168,201,0)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });

        if (label.current) label.current.textContent = text;
        gsap.to(label.current, { autoAlpha: text ? 1 : 0, duration: 0.2 });
      };

      const onLeave = () => {
        visible = false;
        gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ring}
        className="invisible fixed left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#7FA8C9]/70"
      >
        <span
          ref={label}
          className="u-mono invisible text-[9px] uppercase tracking-[0.16em] text-[#E9ECF1]"
        />
      </div>
      <div
        ref={dot}
        className="invisible fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-[#7FA8C9]"
      />
    </div>
  );
}
