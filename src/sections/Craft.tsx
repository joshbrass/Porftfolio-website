
import Reveal from "@/components/Reveal";
import { principles, toolkit } from "@/data/site";
import Section from "./Section";

export default function Craft() {
  return (
    <Section
      id="craft"
      index="03"
      label="Craft"
      title="How I work"
      lede="Not a process diagram. Three things I actually believe, learned the expensive way."
    >
      <div className="max-w-2xl">
        {principles.map((principle, i) => (
          <Reveal
            key={principle.title}
            delay={i * 70}
            className="border-t border-[#1C222C] py-10 first:border-t-0 first:pt-0"
          >
            <h3 className="u-display text-[1.5rem] font-normal italic leading-snug text-[#E9ECF1] sm:text-[1.75rem]">
              “{principle.title}”
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#8B95A5]">
              {principle.body}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border-t border-[#1C222C] pt-10">
        <h3 className="u-mono mb-8 text-[11px] uppercase tracking-[0.2em] text-[#4E5B6B]">
          Toolkit
        </h3>
        <div className="space-y-8">
          {toolkit.map((group) => (
            <div key={group.group} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
              <p className="u-mono mb-3 text-[11px] uppercase tracking-[0.14em] text-[#7FA8C9] sm:mb-0 sm:pt-1">
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[14.5px] text-[#C7CED8]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}