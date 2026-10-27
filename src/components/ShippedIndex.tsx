"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { gsap, useGSAP, FINE_POINTER } from "@/lib/gsap";

type Item = {
  name: string;
  kind: string;
  year: string;
  stack: string;
  href?: string;
  image?: StaticImageData;
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

/**
 * The quiet index, with one loud trick: hovering a row floats a
 * screenshot beside the cursor, tilting with the direction of travel.
 * Touch devices just get the list.
 */
export default function ShippedIndex({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FINE_POINTER, () => {
        const el = preview.current!;
        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
        const x = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
        const rot = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
        let lastX = 0;

        const onMove = (e: PointerEvent) => {
          x(e.clientX + 150);
          y(e.clientY);
          rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root }
  );

  const show = (i: number) => {
    setActive(i);
    if (!items[i].image) return hide();
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "expo.out", overwrite: "auto" });
  };
  const hide = () => {
    gsap.to(preview.current, { autoAlpha: 0, scale: 0.6, duration: 0.35, ease: "power3.in", overwrite: "auto" });
  };

  const shared =
    "group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#151A22] py-4 transition-[border-color,padding] duration-500 hover:border-[#2A3341] md:hover:pl-3";

  return (
    <div ref={root}>
      <ul onPointerLeave={hide}>
        {items.map((item, i) => {
          const body = (
            <>
              <span className="text-[15px] text-[#C7CED8] transition-colors group-hover:text-[#7FA8C9]">
                {item.name}
              </span>
              <span className="u-mono text-[11px] text-[#4E5B6B]">{item.kind}</span>
              <span className="u-mono ml-auto hidden text-[11px] text-[#3A4552] sm:block">
                {item.stack}
              </span>
              <span className="u-mono w-12 text-right text-[11px] text-[#4E5B6B]">
                {item.year}
              </span>
              {item.href && (
                <Arrow className="text-[#2A3341] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7FA8C9]" />
              )}
            </>
          );

          return (
            <li key={item.name} onPointerEnter={() => show(i)}>
              {/* Anchor when there's a link, plain row when there isn't — an
                  <a> with no href is focusable-but-dead to a screen reader. */}
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={shared} data-cursor="Visit">
                  {body}
                </a>
              ) : (
                <div className={shared}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-sm border border-[#2A3341] bg-[#10141B] shadow-2xl shadow-black/60 md:block"
      >
        {items.map((item, i) =>
          item.image ? (
            <Image
              key={item.name}
              src={item.image}
              alt=""
              fill
              sizes="300px"
              className={`scale-[1.35] object-cover transition-opacity duration-300 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null
        )}
        <span className="u-mono absolute bottom-2 left-2 rounded-sm bg-[#0B0E13]/80 px-1.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#7FA8C9]">
          {active !== null ? items[active].name : ""}
        </span>
      </div>
    </div>
  );
}
