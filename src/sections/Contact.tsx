"use client";

import { useRef } from "react";
import Reveal from "@/components/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import Magnetic from "@/components/motion/Magnetic";
import { useVelocityMarquee } from "@/components/motion/useVelocityMarquee";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { person } from "@/data/site";

/** The word that keeps changing in the headline. First one is what
 *  screen readers and no-JS visitors get. */
const WORDS = ["work", "scale", "last", "ship"];

function RotatingWord() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current!;
        let i = 0;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 1.6 });
        tl.to(el, { yPercent: -110, rotate: -4, duration: 0.45, ease: "power3.in" })
          .call(() => {
            i = (i + 1) % WORDS.length;
            el.textContent = WORDS[i];
          })
          .fromTo(el, { yPercent: 110, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 0.7, ease: "expo.out" });
        return () => {
          el.textContent = WORDS[0];
        };
      });
    },
    { scope: ref }
  );

  return (
    <>
      <span className="sr-only">{WORDS[0]}</span>
      <span aria-hidden className="inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
        <span ref={ref} className="inline-block italic text-[#7FA8C9]">
          {WORDS[0]}
        </span>
      </span>
    </>
  );
}

/** Oversized marquee that closes the page — it's one big mailto. */
function SignOff() {
  const scope = useRef<HTMLAnchorElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useVelocityMarquee(scope, track, { direction: 1, duration: 28 });

  const phrase = (hidden: boolean, key: string) => (
    <span key={key} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      <span className="text-[#E9ECF1]">Let&apos;s build</span>
      <span className="text-[0.4em] text-[#7FA8C9]">✦</span>
      <span className="signoff-outline italic">something that works</span>
      <span className="text-[0.4em] text-[#7FA8C9]">✦</span>
    </span>
  );

  return (
    <a
      ref={scope}
      href={`mailto:${person.email}`}
      data-cursor="Email"
      aria-label={`Let's build something that works — email ${person.email}`}
      className="u-display block overflow-hidden border-t border-[#1C222C] py-8 text-[clamp(3rem,11vw,9.5rem)] font-light leading-none tracking-[-0.03em] md:py-12"
    >
      <div ref={track} className="flex w-max">
        {[0, 1].map((n) => phrase(n === 1, String(n)))}
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <>
      <section id="contact" className="relative scroll-mt-24 px-6 sm:px-8">
        <DrawRule className="absolute inset-x-0 top-0" />
        <div className="mx-auto max-w-5xl py-28 md:py-36">
          <Reveal>
            <div className="md:grid md:grid-cols-[7rem_1fr] md:gap-10">
              <p className="u-mono mb-6 text-[11px] uppercase tracking-[0.2em] text-[#7FA8C9] md:mb-0 md:pt-[0.8rem]">
                <span className="text-[#4E5B6B]">07</span>
                <span className="mx-2 text-[#2A3341]">/</span>
                Contact
              </p>

              <div>
                <h2 className="u-display max-w-2xl text-[clamp(2rem,5.5vw,3.4rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#E9ECF1]">
                  If you are building something that has to <RotatingWord />,{" "}
                  <span className="italic text-[#7FA8C9]">let&apos;s talk.</span>
                </h2>

                <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-[#8B95A5]">
                  I read everything and reply within a day. A sentence about
                  what you are building is enough to start.
                </p>

                <Magnetic strength={0.2} className="mt-10">
                  <a
                    href={`mailto:${person.email}`}
                    className="u-display inline-block text-[clamp(1.15rem,3.5vw,1.9rem)] text-[#E9ECF1] transition-colors hover:text-[#7FA8C9]"
                  >
                    <span className="draw-link">{person.email}</span>
                  </a>
                </Magnetic>

                <ul className="u-mono mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[12px] tracking-[0.08em]">
                  {person.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="draw-link text-[#8B95A5] transition-colors hover:text-[#E9ECF1]"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={person.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="draw-link text-[#8B95A5] transition-colors hover:text-[#E9ECF1]"
                    >
                      Résumé
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SignOff />

      <footer className="border-t border-[#1C222C] px-6 sm:px-8">
        <div className="u-mono mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 py-7 text-[11px] tracking-[0.1em] text-[#3A4552]">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <span>
            Built in Lagos · Next.js · GSAP · Newsreader &amp; IBM Plex
          </span>
        </div>
      </footer>
    </>
  );
}
