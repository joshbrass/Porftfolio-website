
import Reveal from "@/components/Reveal";
import { direction, directionClose } from "@/data/site";
import Section from "./Section";

/**
 * Each track carries a status tag borrowed from drawing revision
 * marks. The tag is the point of the section: it's what separates
 * "I'm learning AI" from a claim someone can actually assess.
 */
export default function Direction() {
  return (
    <Section
      id="direction"
      index="04"
      label="Next"
      title="Where I'm heading"
      lede="Three things I'm pointed at, and an honest account of how far along each one is."
    >
      <div className="max-w-2xl">
        {direction.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 70}
            className="border-t border-[#1C222C] py-10 first:border-t-0 first:pt-0"
          >
            <p className="u-mono mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]">
              <span className="text-[#4E5B6B]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-6 bg-[#2A3341]" />
              <span className="rounded-sm border border-[#1C222C] px-2 py-0.5 text-[#7FA8C9]">
                {item.status}
              </span>
            </p>

            <h3 className="u-display text-[1.4rem] font-normal leading-snug text-[#E9ECF1] sm:text-[1.7rem]">
              {item.title}
            </h3>

            <p className="mt-4 text-[15px] leading-[1.75] text-[#8B95A5]">
              {item.body}
            </p>

            <p className="mt-6 flex flex-col gap-1.5 border-l border-[#1C222C] pl-4 sm:flex-row sm:gap-4 sm:pl-5">
              <span className="u-mono shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#4E5B6B] sm:pt-[0.3rem]">
                Standing
              </span>
              <span className="text-[14px] leading-[1.7] text-[#C7CED8]">
                {item.standing}
              </span>
            </p>
          </Reveal>
        ))}

        <Reveal className="mt-14 border-t border-[#1C222C] pt-10">
          <p className="u-display text-[1.15rem] font-light italic leading-[1.65] text-[#C7CED8] sm:text-[1.3rem]">
            {directionClose}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}