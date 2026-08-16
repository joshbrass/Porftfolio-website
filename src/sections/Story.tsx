import Image from "next/image";
import Reveal from "@/components/Reveal";
import { chapters, person } from "@/data/site";
import Section from "./Section";

/**
 * The portrait is set as a plate in a technical document — bordered,
 * numbered, captioned in mono, desaturated until you hover it. It sits
 * inside the story rather than the hero on purpose: a face means more
 * once there's something to attach it to.
 */
function Portrait() {
  const { portrait } = person;

  return (
    <Reveal
      as="figure"
      className="mb-10 w-full max-w-[210px] sm:float-right sm:ml-10 sm:mb-8 sm:w-[210px]"
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#1C222C] bg-[#10141B]">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="210px"
          className="object-cover saturate-[0.55] transition-all duration-700 group-hover:saturate-100"
        />
      </div>
      <figcaption className="u-mono mt-3 flex items-baseline justify-between text-[10px] uppercase tracking-[0.16em] text-[#4E5B6B]">
        <span className="text-[#7FA8C9]">{portrait.caption}</span>
        <span>{portrait.year}</span>
      </figcaption>
    </Reveal>
  );
}

export default function Story() {
  return (
    <Section
      id="story"
      index="01"
      label="Story"
      title="How I got here"
      lede="Seven years, one detour through mechanical engineering, and a slow education in what production software actually costs."
    >
      <div>
        <Portrait />

        {chapters.map((chapter, i) => (
          <Reveal
            as="article"
            key={chapter.year}
            delay={i * 60}
            className="grid gap-4 border-t border-[#1C222C] py-10 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:gap-8"
          >
            <p className="u-mono pt-1 text-[11px] uppercase tracking-[0.14em] text-[#7FA8C9]">
              {chapter.year}
            </p>

            <div className="max-w-2xl">
              <h3 className="u-display text-[1.4rem] font-normal leading-snug text-[#E9ECF1] sm:text-[1.65rem]">
                {chapter.title}
              </h3>
              <div className="mt-4 space-y-4">
                {chapter.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="prose-note text-[15px] leading-[1.75] text-[#8B95A5]"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}