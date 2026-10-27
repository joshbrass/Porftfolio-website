"use client";

import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { aiIntro, aiPractices, aiRules, aiTools, aiWorkflow } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import Section from "./Section";

/**
 * The workflow is drawn as a flowchart — horizontal on desktop,
 * vertical on phones. As it scrolls through, the connector draws and
 * each stage lights in turn, so the reader follows a feature from
 * ticket to ship with "me" and "AI" split at every step.
 */
function Workflow() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const nodes = gsap.utils.toArray<HTMLElement>(".ai-node");
      const bodies = gsap.utils.toArray<HTMLElement>(".ai-body");

      const build = (line: string, axis: "scaleX" | "scaleY") => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
        });
        tl.fromTo(line, { [axis]: 0 }, { [axis]: 1, duration: 1, ease: "none" }, 0);
        nodes.forEach((node, i) => {
          const at = (i / Math.max(nodes.length - 1, 1)) * 0.92;
          tl.call(() => node.classList.toggle("is-lit", tl.scrollTrigger!.direction > 0), [], at);
          tl.fromTo(bodies[i], { autoAlpha: 0.25, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.12 }, at);
        });
        return () => nodes.forEach((n) => n.classList.remove("is-lit"));
      };

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
        build(".ai-line-h", "scaleX")
      );
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () =>
        build(".ai-line-v", "scaleY")
      );
      mm.add("(prefers-reduced-motion: reduce)", () => {
        nodes.forEach((n) => n.classList.add("is-lit"));
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      {/* Connectors: vertical on phones, horizontal from md up. */}
      <div aria-hidden className="absolute bottom-6 left-3 top-3 w-px bg-[#151A22] md:hidden">
        <div className="ai-line-v absolute inset-0 origin-top bg-[#7FA8C9]/70" />
      </div>
      <div aria-hidden className="absolute left-0 right-0 top-[14px] hidden h-px bg-[#151A22] md:block">
        <div className="ai-line-h absolute inset-0 origin-left bg-[#7FA8C9]/70" />
      </div>

      <ol className="relative grid gap-9 md:grid-cols-5 md:gap-5">
        {aiWorkflow.map((stage, i) => (
          <li key={stage.step}>
            <p className="ai-node u-mono relative inline-flex items-center gap-2 rounded-sm border border-[#2A3341] bg-[#0B0E13] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#8B95A5] transition-all duration-500">
              <span className="text-[#4E5B6B]">{String(i + 1).padStart(2, "0")}</span>
              {stage.step}
            </p>

            <dl className="ai-body mt-4 space-y-3 pl-8 md:pl-0">
              <div>
                <dt className="u-mono text-[9.5px] uppercase tracking-[0.2em] text-[#4E5B6B]">Me</dt>
                <dd className="mt-1 text-[14px] leading-[1.55] text-[#E9ECF1]">{stage.me}</dd>
              </div>
              <div>
                <dt className="u-mono text-[9.5px] uppercase tracking-[0.2em] text-[#7FA8C9]">AI</dt>
                <dd className="mt-1 text-[13.5px] leading-[1.55] text-[#8B95A5]">{stage.ai}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AiWork() {
  return (
    <Section id="ai" index="04" label="AI" title="How I use AI at work" lede={aiIntro}>
      <Workflow />

      <div className="mt-20 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {aiPractices.map((practice, i) => (
          <Reveal key={practice.title} delay={i * 70} className="border-t border-[#1C222C] pt-7">
            <p className="u-mono mb-4 text-[10px] uppercase tracking-[0.18em] text-[#4E5B6B]">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="u-display text-[1.35rem] font-normal leading-snug text-[#E9ECF1] sm:text-[1.5rem]">
              {practice.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.75] text-[#8B95A5] md:text-[15px]">
              {practice.body}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Ground rules, set like the hero's title block. */}
      <Reveal className="mt-16">
        <div className="relative border border-[#1C222C]">
          <span aria-hidden className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[#7FA8C9]" />
          <span aria-hidden className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[#7FA8C9]" />
          <div className="u-mono flex items-center justify-between border-b border-[#1C222C] px-4 py-3 text-[10px] uppercase tracking-[0.2em]">
            <span className="text-[#7FA8C9]">Where I don&apos;t use it</span>
            <span className="text-[#3A4552]">Ground rules</span>
          </div>
          <ul>
            {aiRules.map((rule, i) => (
              <li
                key={rule}
                className={`flex gap-4 px-4 py-3.5 ${i === 0 ? "" : "border-t border-[#1C222C]"}`}
              >
                <span className="u-mono shrink-0 pt-[3px] text-[10px] tracking-[0.14em] text-[#4E5B6B]">
                  R.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] leading-[1.6] text-[#C7CED8]">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="u-mono mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[11px] text-[#4E5B6B]">
          <span className="uppercase tracking-[0.18em] text-[#3A4552]">In my editor</span>
          {aiTools.map((tool) => (
            <span key={tool} className="text-[#8B95A5]">
              {tool}
            </span>
          ))}
        </p>
      </Reveal>
    </Section>
  );
}
