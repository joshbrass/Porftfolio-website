
import Reveal from "@/components/Reveal";
import { chapters } from "@/data/site";
import Section from "@/sections/Section";

export default function Story() {
  return (
    <Section
      id="story"
      index="01"
      label="Story"
      title="How I got here"
      lede="Six years, one detour through mechanical engineering, and a slow education in what production software actually costs."
    >
      <div>
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