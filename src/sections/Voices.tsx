
import Reveal from "@/components/Reveal";
import { voices } from "@/data/site";
import Section from "./Section";

export default function Voices() {
  return (
    <Section
      id="references"
      index="04"
      label="References"
      title="People I've built with"
    >
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
        {voices.map((voice, i) => (
          <Reveal
            key={voice.name}
            delay={i * 80}
            className="border-t border-[#1C222C] pt-8"
          >
            <blockquote className="u-display text-[1.15rem] font-light leading-[1.6] text-[#C7CED8] sm:text-[1.25rem]">
              {voice.quote}
            </blockquote>
            <figcaption className="u-mono mt-6 text-[11px] uppercase tracking-[0.14em] leading-relaxed">
              <span className="text-[#7FA8C9]">{voice.name}</span>
              <br />
              <span className="text-[#4E5B6B]">{voice.title}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}