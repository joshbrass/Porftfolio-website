import Image from "next/image";
import Reveal from "@/components/Reveal";
import { chapters, person } from "@/data/site";
import Section from "./Section";
import TimelineRail from "@/components/motion/TimelineRail";
import ChapterBody from "@/components/ChapterBody";

/**
 * The portrait is set as a plate in a technical document — bordered,
 * numbered, captioned in mono, desaturated until you hover it. It sits
 * inside the story rather than the hero on purpose: a face means more
 * once there's something to attach it to.
 *
 * On phones it becomes a horizontal plate (image + caption block) so it
 * never squeezes the first chapter into a sliver beside it; from md up
 * it floats into the margin of the text.
 */
function Portrait() {
  const { portrait } = person;

  return (
    <Reveal
      as="figure"
      className="mb-10 flex items-end gap-5 pl-8 md:float-right md:mb-8 md:ml-10 md:block md:w-[210px] md:pl-0"
    >
      <div className="group relative aspect-[4/5] w-[124px] shrink-0 overflow-hidden rounded-sm border border-[#1C222C] bg-[#10141B] md:w-full">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(max-width: 768px) 124px, 210px"
          className="object-cover saturate-[0.55] transition-all duration-700 group-hover:saturate-100"
        />
      </div>
      <figcaption className="u-mono min-w-0 text-[10px] uppercase tracking-[0.16em] text-[#4E5B6B] md:mt-3 md:flex md:items-baseline md:justify-between">
        <span className="mb-3 block text-[#3A4552] md:hidden">Fig. 01</span>
        <span className="block text-[#7FA8C9]">{portrait.caption}</span>
        <span className="mt-1 block md:mt-0">{portrait.year}</span>
        <span className="mt-4 block border-t border-[#1C222C] pt-3 normal-case tracking-[0.06em] text-[#8B95A5] md:hidden">
          {person.name}
          <br />
          {person.role}
        </span>
      </figcaption>
    </Reveal>
  );
}

export default function Story() {
  const total = String(chapters.length).padStart(2, "0");

  return (
    <Section
      id="story"
      index="01"
      label="Story"
      title="How I got here"
      lede="Seven years, one detour through mechanical engineering, and a slow education in what production software actually costs."
    >
      <TimelineRail>
        <Portrait />

        {chapters.map((chapter, i) => (
          <Reveal
            as="article"
            key={chapter.title}
            delay={i * 60}
            className="relative grid gap-3 border-t border-[#1C222C] py-9 pl-8 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:gap-8 md:py-10 md:pl-0"
          >
            {/* Node on the rail — lit by TimelineRail as the marker passes. */}
            <span
              aria-hidden
              className="rail-node absolute left-0 top-[2.85rem] h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-[#2A3341] bg-[#0B0E13] transition-colors duration-500 md:-left-8 md:top-[3.05rem]"
            />

            <p className="u-mono flex items-baseline gap-3 pt-1 text-[11px] uppercase tracking-[0.14em] md:block">
              <span className="text-[#7FA8C9]">{chapter.year}</span>
              <span className="text-[#3A4552] md:mt-2 md:block">
                {String(i + 1).padStart(2, "0")}/{total}
              </span>
            </p>

            <div className="max-w-2xl">
              <h3 className="u-display text-[1.35rem] font-normal leading-[1.25] text-[#E9ECF1] sm:text-[1.5rem] md:text-[1.65rem] md:leading-snug">
                {chapter.title}
              </h3>
              <ChapterBody paragraphs={chapter.body} />
            </div>
          </Reveal>
        ))}
      </TimelineRail>
    </Section>
  );
}
