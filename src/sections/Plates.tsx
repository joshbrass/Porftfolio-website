"use client";

import Image from "next/image";
import { useRef } from "react";
import { featured } from "@/data/site";
import { useVelocityMarquee } from "@/components/motion/useVelocityMarquee";

const plates = featured
  .filter((p) => p.image)
  .map((p, i) => ({ ...p, plate: `PL.${String(i + 1).padStart(2, "0")}` }));

type Plate = (typeof plates)[number];

function PlateCard({ plate, hidden }: { plate: Plate; hidden?: boolean }) {
  const card = (
    <figure className="plate-card w-[300px] shrink-0 sm:w-[420px] md:w-[500px]">
      <div className="overflow-hidden rounded-sm border border-[#1C222C] bg-[#10141B] p-1.5 transition-colors duration-500 group-hover:border-[#2A3341]">
        <div className="relative aspect-[1900/890] overflow-hidden rounded-[2px]">
          <Image
            src={plate.image!}
            alt={hidden ? "" : `${plate.name} interface`}
            fill
            sizes="(max-width: 640px) 300px, 500px"
            className="object-cover object-top opacity-75 saturate-[0.7] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:saturate-100"
          />
        </div>
      </div>
      <figcaption className="u-mono mt-3 flex items-baseline gap-3 text-[10px] uppercase tracking-[0.16em]">
        <span className="text-[#4E5B6B]">{plate.plate}</span>
        <span className="text-[#C7CED8]">{plate.name}</span>
        <span className="ml-auto text-[#3A4552]">{plate.year}</span>
      </figcaption>
    </figure>
  );

  return plate.href ? (
    <a
      href={plate.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      data-cursor="Open"
    >
      {card}
    </a>
  ) : (
    <div className="group" aria-hidden={hidden || undefined}>
      {card}
    </div>
  );
}

function Row({ items, direction }: { items: Plate[]; direction: 1 | -1 }) {
  const scope = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useVelocityMarquee(scope, track, { direction, duration: 55, skewSelector: ".plate-card" });

  return (
    <div ref={scope} className="overflow-hidden motion-reduce:overflow-x-auto">
      <div ref={track} className="flex w-max gap-5 pr-5 sm:gap-8 sm:pr-8">
        {items.map((p) => (
          <PlateCard key={p.name} plate={p} />
        ))}
        {/* Second copy makes the loop seamless; hidden from AT. */}
        {items.map((p) => (
          <PlateCard key={`${p.name}-dup`} plate={p} hidden />
        ))}
      </div>
    </div>
  );
}

/**
 * A wall of screens between the case studies and the principles —
 * the work, seen at a glance. Both rows respond to scroll speed and
 * direction, and slow right down under the cursor.
 */
export default function Plates() {
  if (plates.length === 0) return null;
  const reversed = [...plates].reverse();

  return (
    <section aria-label="Screens from the work" className="relative overflow-hidden border-t border-[#1C222C] py-20 md:py-28">
      <div className="mx-auto mb-10 flex max-w-5xl items-baseline justify-between px-6 sm:px-8 md:mb-14">
        <p className="u-mono text-[11px] uppercase tracking-[0.2em] text-[#7FA8C9]">
          <span className="text-[#4E5B6B]">Plates</span>
          <span className="mx-2 text-[#2A3341]">/</span>
          Screens from the work
        </p>
        <p className="u-mono hidden text-[10px] uppercase tracking-[0.18em] text-[#3A4552] md:block">
          Scroll to steer
        </p>
      </div>

      <div className="space-y-6 sm:space-y-10">
        <Row items={plates} direction={1} />
        <Row items={reversed} direction={-1} />
      </div>

      {/* Edge fades so cards enter and leave the sheet softly. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0E13] to-transparent sm:w-32" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0E13] to-transparent sm:w-32" />
    </section>
  );
}
