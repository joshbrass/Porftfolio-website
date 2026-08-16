import Image from "next/image";
import Reveal from "@/components/Reveal";
import { featured, alsoBuilt } from "@/data/site";
import type { Project } from "@/data/site";
import Section from "./Section";

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

function Entry({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="article"
      className="group border-t border-[#1C222C] py-12 first:border-t-0 first:pt-0"
    >
      <div className="u-mono mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]">
        <span className="text-[#4E5B6B]">{num}</span>
        <span className="h-px w-6 bg-[#2A3341]" />
        <span className="text-[#7FA8C9]">{project.kind}</span>
        <span className="ml-auto text-[#4E5B6B]">{project.year}</span>
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-2.5"
        >
          <h3 className="u-display text-[2rem] font-normal leading-none tracking-[-0.02em] text-[#E9ECF1] transition-colors group-hover:text-[#7FA8C9] sm:text-[2.4rem]">
            {project.name}
          </h3>
          <Arrow className="text-[#4E5B6B] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#7FA8C9]" />
        </a>
      ) : (
        <h3 className="u-display text-[2rem] font-normal leading-none tracking-[-0.02em] text-[#E9ECF1] sm:text-[2.4rem]">
          {project.name}
        </h3>
      )}

      <p className="u-mono mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[#4E5B6B]">
        <span>{project.role}</span>
        {project.status && (
          <span className="rounded-sm border border-[#1C222C] px-2 py-0.5 text-[#7FA8C9]">
            {project.status}
          </span>
        )}
      </p>

      <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-[#8B95A5]">
        {project.summary}
      </p>

      <ul className="mt-8 max-w-2xl space-y-3.5">
        {project.contributions.map((item) => (
          <li key={item} className="flex gap-4">
            <span
              aria-hidden
              className="mt-[0.7rem] h-px w-4 shrink-0 bg-[#2A3341]"
            />
            <span className="text-[14.5px] leading-[1.7] text-[#C7CED8]">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <ul className="u-mono mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#4E5B6B]">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {project.image && (
        <a
          href={project.href ?? undefined}
          target={project.href ? "_blank" : undefined}
          rel={project.href ? "noopener noreferrer" : undefined}
          aria-label={project.href ? `Open ${project.name}` : undefined}
          className="mt-10 block overflow-hidden rounded-sm border border-[#1C222C] transition-colors group-hover:border-[#2A3341]"
        >
          <div className="relative h-[380px] w-full bg-[#10141B]">
            <Image
              src={project.image}
              alt={`${project.name} interface`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain object-center opacity-70 saturate-[0.75] transition-all duration-500 group-hover:opacity-100 group-hover:saturate-100"
            />
          </div>
        </a>
      )}
    </Reveal>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      index="02"
      label="Work"
      title="Selected work"
      lede="Five projects I can talk about for an hour. Different domains, but a recurring problem: several front-ends, one API, and a permission model that decides what a person is even allowed to see."
    >
      <div>
        {featured.map((project, i) => (
          <Entry key={project.name} project={project} index={i} />
        ))}
      </div>

      <Reveal className="mt-16 border-t border-[#1C222C] pt-10">
        <h3 className="u-mono mb-6 text-[11px] uppercase tracking-[0.2em] text-[#4E5B6B]">
          Also shipped
        </h3>
        <ul>
          {alsoBuilt.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#151A22] py-4 transition-colors hover:border-[#2A3341]"
              >
                <span className="text-[15px] text-[#C7CED8] transition-colors group-hover:text-[#7FA8C9]">
                  {item.name}
                </span>
                <span className="u-mono text-[11px] text-[#4E5B6B]">
                  {item.kind}
                </span>
                <span className="u-mono ml-auto hidden text-[11px] text-[#3A4552] sm:block">
                  {item.stack}
                </span>
                <span className="u-mono w-12 text-right text-[11px] text-[#4E5B6B]">
                  {item.year}
                </span>
                <Arrow className="text-[#2A3341] transition-colors group-hover:text-[#7FA8C9]" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
