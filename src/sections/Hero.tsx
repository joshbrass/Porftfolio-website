"use client";

import { useRef } from "react";
import { hero, person } from "@/data/site";
import Magnetic from "@/components/motion/Magnetic";
import {
  gsap,
  useGSAP,
  SplitText,
  MOTION_OK,
  FINE_POINTER,
  SCRAMBLE_CHARS,
} from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";

/**
 * Signature element: the title block.
 * Every engineering drawing carries one in the bottom-right corner —
 * name, part, scale, revision, date. Josh has a mechanical engineering
 * degree, so the page opens with his. It does the job a stats-and-gradient
 * hero normally does, but it says something true about him instead.
 */
function TitleBlock() {
  const rows: [string, React.ReactNode][] = [
    ["Name", <span key="n" data-scramble>{person.name}</span>],
    ["Role", <span key="r" data-scramble>{person.role}</span>],
    [
      "Base",
      <span key="b" data-scramble>{`${person.base} · ${person.timezone}`}</span>,
    ],
    ["Shipping since", <span key="y" data-scramble>{person.since}</span>],
    [
      "Status",
      <span key="s" className="inline-flex items-center gap-2">
        <span className="relative inline-flex h-[6px] w-[6px] shrink-0">
          {person.availability.open && (
            <span className="hero-ping absolute inset-0 rounded-full bg-[#7FA8C9]" />
          )}
          <span
            className={`relative inline-block h-[6px] w-[6px] rounded-full ${
              person.availability.open ? "bg-[#7FA8C9]" : "bg-[#4E5B6B]"
            }`}
          />
        </span>
        <span className="leading-snug">{person.availability.label}</span>
      </span>,
    ],
  ];

  return (
    <dl className="hero-tb gsap-hide u-mono relative w-full max-w-md border border-[#1C222C] bg-[#0B0E13]/70 text-[11px] leading-none backdrop-blur-[2px]">
      {/* Drawing-sheet corner ticks */}
      <span aria-hidden className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[#7FA8C9]" />
      <span aria-hidden className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[#7FA8C9]" />
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`hero-tb-row flex items-start gap-3 px-3.5 py-3 sm:items-center sm:gap-4 sm:px-4 ${
            i === 0 ? "" : "border-t border-[#1C222C]"
          }`}
        >
          <dt className="w-[5.75rem] shrink-0 uppercase tracking-[0.14em] text-[#4E5B6B] sm:w-[6.5rem]">
            {label}
          </dt>
          <dd className="min-w-0 text-[#C7CED8]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The drafting sheet behind the hero: a faint grid, construction lines
 * that get drawn on load, and registration marks where they cross.
 */
function Blueprint() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="hero-grid absolute" />
      <div className="absolute inset-0 mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative h-full">
          <span className="hero-vline absolute bottom-0 left-0 top-0 hidden w-px bg-[#1C222C] md:block" />
          <span className="hero-vline absolute bottom-0 right-0 top-0 hidden w-px bg-[#1C222C] md:block" />
          {["top-[18%]", "bottom-[14%]"].map((pos) => (
            <span key={pos} className={`absolute left-0 right-0 ${pos}`}>
              <span className="hero-mark absolute -left-[5px] -top-[5px] hidden h-[11px] w-[11px] md:block">
                <span className="absolute left-1/2 top-0 h-full w-px bg-[#7FA8C9]" />
                <span className="absolute left-0 top-1/2 h-px w-full bg-[#7FA8C9]" />
              </span>
              <span className="hero-mark absolute -right-[5px] -top-[5px] hidden h-[11px] w-[11px] md:block">
                <span className="absolute left-1/2 top-0 h-full w-px bg-[#7FA8C9]" />
                <span className="absolute left-0 top-1/2 h-px w-full bg-[#7FA8C9]" />
              </span>
            </span>
          ))}
        </div>
      </div>
      <span className="hero-hline absolute inset-x-0 top-[18%] h-px bg-[#1C222C]" />
      <span className="hero-hline absolute inset-x-0 bottom-[14%] h-px bg-[#1C222C]" />
    </div>
  );
}

/**
 * A bearing housing, drawn the way it would be on a GA sheet — bolt
 * circle, bore, centre lines, and a bore callout with an H7 fit. It's
 * the abstract shape behind the headline, and a quiet nod to the line
 * in the story: you can't argue a shaft into a bearing.
 */
const BOLTS = Array.from({ length: 8 }, (_, k) => {
  const a = (k * Math.PI) / 4;
  return { cx: 300 + 210 * Math.cos(a), cy: 300 + 210 * Math.sin(a) };
});

function Drawing() {
  return (
    <div
      aria-hidden
      className="hero-drawing-wrap gsap-hide pointer-events-none absolute right-[-150px] top-[6%] w-[380px] opacity-70 md:right-[-90px] md:top-1/2 md:w-[600px] md:-translate-y-1/2 md:opacity-100 lg:right-[-40px] lg:w-[660px]"
    >
      <div className="hero-glow absolute inset-[-25%] rounded-full bg-[radial-gradient(circle,rgba(127,168,201,0.16)_0%,rgba(127,168,201,0.05)_35%,transparent_65%)]" />
      <svg viewBox="0 0 600 600" className="hero-drawing relative w-full overflow-visible" fill="none">
        <g className="hero-spin">
          {/* Centre lines (dash-dot) — faded in, not drawn */}
          <g className="hero-fade" stroke="#1C222C" strokeWidth="1" strokeDasharray="18 6 3 6">
            <line x1="10" y1="300" x2="590" y2="300" />
            <line x1="300" y1="10" x2="300" y2="590" />
            <circle cx="300" cy="300" r="210" />
          </g>

          {/* Housing outline, shoulders and bore */}
          <g className="hero-draw" strokeWidth="1.2">
            <circle cx="300" cy="300" r="255" stroke="#2A3341" />
            <circle cx="300" cy="300" r="170" stroke="#2A3341" />
            <circle cx="300" cy="300" r="128" stroke="#1C222C" />
            <circle cx="300" cy="300" r="62" stroke="rgba(127,168,201,0.55)" />
            <path d="M291 238.6 V226 H309 V238.6" stroke="rgba(127,168,201,0.55)" />
          </g>

          {/* Bolt circle — this group slowly turns */}
          <g className="hero-bolts">
            {BOLTS.map((b, k) => (
              <g key={k} className="hero-draw">
                <circle cx={b.cx} cy={b.cy} r="13" stroke="#2A3341" strokeWidth="1.2" />
                <circle cx={b.cx} cy={b.cy} r="6" stroke="#1C222C" strokeWidth="1" />
              </g>
            ))}
          </g>
        </g>

        {/* Dimensioning stays upright while the part turns */}
        <g className="hero-draw" stroke="#2A3341" strokeWidth="1">
          <line x1="45" y1="300" x2="45" y2="18" />
          <line x1="555" y1="300" x2="555" y2="18" />
          <line x1="45" y1="30" x2="555" y2="30" />
          <path d="M45 30 l10 -4 v8 z M555 30 l-10 -4 v8 z" fill="#2A3341" />
          <polyline points="344,256 430,170 520,170" stroke="rgba(127,168,201,0.5)" />
        </g>
        <g className="hero-fade u-mono" fontSize="12" letterSpacing="2">
          <text x="300" y="22" textAnchor="middle" fill="#4E5B6B">Ø 510</text>
          <text x="434" y="162" fill="#7FA8C9" fillOpacity="0.8">Ø 124 H7</text>
          <text x="555" y="590" textAnchor="end" fill="#3A4552" fontSize="10">DWG 01 · SCALE 1:2</text>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Held until the preloader lifts, then played.
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });

        // Scrambling to the element's own text shows drafting glyphs for
        // the unrevealed part, then resolves left-to-right into the copy.
        const scrambled = gsap.utils.toArray<HTMLElement>(".hero-eyebrow, .hero-tb [data-scramble]");
        const scrambleIn = (el: HTMLElement, at: string, duration: number) =>
          tl.to(
            el,
            {
              duration,
              scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.6 },
              ease: "none",
            },
            at
          );

        /* Choreography — one thing leads at a time:
             sheet   (quiet backdrop, runs underneath everything)
             name  → headline → intro → role & stack → CTAs
             title block and scroll cue settle in last.            */
        tl.addLabel("sheet", 0)
          .addLabel("name", 0.35)
          .addLabel("headline", 0.5)
          .addLabel("copy", 1.45)
          .addLabel("stack", 1.75)
          .addLabel("cta", 2.05)
          .addLabel("block", 2.25);

        tl.set(".hero-drawing-wrap", { visibility: "visible" }, "sheet");

        // 1. The sheet: glow blooms, grid fades up, lines and part are drawn.
        tl.fromTo(".hero-glow", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 2.4, ease: "power2.out" }, "sheet")
          .from(".hero-grid", { autoAlpha: 0, duration: 1.6, ease: "power2.out" }, "sheet")
          .from(".hero-hline", { scaleX: 0, transformOrigin: "left", duration: 1.4, stagger: 0.15 }, "sheet+=0.1")
          .from(".hero-vline", { scaleY: 0, transformOrigin: "top", duration: 1.4, stagger: 0.15 }, "sheet+=0.2")
          .from(".hero-mark", { scale: 0, rotate: 90, duration: 0.8, stagger: 0.06 }, "sheet+=0.7")
          .from(".hero-draw :is(circle, line, path, polyline)", { drawSVG: "0%", duration: 2.2, ease: "power2.inOut", stagger: 0.04 }, "sheet+=0.2")
          .from(".hero-fade", { autoAlpha: 0, duration: 1.2, ease: "power1.out", stagger: 0.2 }, "sheet+=1.2")
          .from(".hero-spin", { rotation: -40, svgOrigin: "300 300", duration: 3, ease: "power3.out" }, "sheet");

        // 2. Name resolves out of drafting glyphs.
        tl.set(".hero-eyebrow", { autoAlpha: 1 }, "name");
        scrambleIn(scrambled[0], "name", 1.1);

        // 3. Headline — characters rise out of each line's mask.
        const split = SplitText.create(".hero-line-inner", { type: "chars" });
        tl.set(".hero-h1", { autoAlpha: 1 }, "headline").from(
          split.chars,
          { yPercent: 115, rotate: 6, duration: 1.2, stagger: 0.018 },
          "headline"
        );

        // 4. Intro copy wipes down into place.
        tl.fromTo(
          ".hero-intro",
          { autoAlpha: 0, y: 14, clipPath: "inset(0 0 100% 0)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.1, stagger: 0.1 },
          "copy"
        );

        // 5. Role, then each stack chip — a subtle stagger.
        tl.from(".hero-role", { autoAlpha: 0, x: -8, duration: 0.6 }, "stack").from(
          ".hero-chip",
          { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.06 },
          "stack+=0.1"
        );

        // 6. CTAs follow the headline — wiped open left to right.
        tl.fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 12, clipPath: "inset(0 100% 0 0)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.out", stagger: 0.12 },
          "cta"
        );

        // 7. Title block: frame, then rows wipe in, then values resolve.
        tl.set(".hero-tb", { autoAlpha: 1 }, "block")
          .from(".hero-tb", { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, "block")
          .from(".hero-tb-row", { autoAlpha: 0, x: -10, duration: 0.6, stagger: 0.07 }, "block+=0.3");

        scrambled.slice(1).forEach((el, i) => scrambleIn(el, `block+=${0.05 + i * 0.08}`, 1));

        tl.from(".hero-scroll", { autoAlpha: 0, duration: 0.8 }, "block+=0.8");

        // Ambient: the bolt circle keeps turning, very slowly.
        gsap.to(".hero-bolts", { rotation: 360, svgOrigin: "300 300", duration: 160, ease: "none", repeat: -1 });

        // Scrolling away turns the whole part a little.
        gsap.to(".hero-drawing", {
          rotation: 30,
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Scroll cue: a tick that keeps drawing downward.
        gsap.fromTo(
          ".hero-scroll-tick",
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.1, ease: "power2.inOut", repeat: -1, yoyo: true, delay: 2 }
        );

        // Leaving the hero: headline lines exit upward through their own
        // masks, one after another; the rest of the block fades back.
        const leave = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-line-inner", { yPercent: -110, ease: "none", stagger: 0.12, scrollTrigger: { ...leave, end: "65% top" } });
        gsap.to(".hero-content", { yPercent: -8, ease: "none", scrollTrigger: leave });
        gsap.to(".hero-rest", { opacity: 0, y: -30, ease: "none", scrollTrigger: { ...leave, start: "10% top", end: "70% top" } });

        const stopWaiting = onPreloaderDone(() => tl.play());

        return () => {
          stopWaiting();
          split.revert();
        };
      });

      // Drafting crosshair with live coordinates — mouse only.
      mm.add(FINE_POINTER, () => {
        const section = root.current!;
        const hx = gsap.quickTo(".hero-cross-v", "x", { duration: 0.35, ease: "power3" });
        const vy = gsap.quickTo(".hero-cross-h", "y", { duration: 0.35, ease: "power3" });
        const gx = gsap.quickTo(".hero-grid", "x", { duration: 1.2, ease: "power3" });
        const gy = gsap.quickTo(".hero-grid", "y", { duration: 1.2, ease: "power3" });
        const readout = section.querySelector<HTMLElement>(".hero-coords");
        const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          hx(x);
          vy(y);
          gx((x / r.width - 0.5) * -14);
          gy((y / r.height - 0.5) * -14);
          if (readout) {
            readout.textContent = `X ${pad(x)}  Y ${pad(y)}`;
            gsap.set(readout, { x: x + 14, y: y + 14 });
          }
        };
        const show = () => gsap.to(".hero-cross", { autoAlpha: 1, duration: 0.4 });
        const hide = () => gsap.to(".hero-cross", { autoAlpha: 0, duration: 0.4 });

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerenter", show);
        section.addEventListener("pointerleave", hide);
        return () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerenter", show);
          section.removeEventListener("pointerleave", hide);
        };
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-12 sm:pt-32"
    >
      <Blueprint />
      <Drawing />

      {/* Crosshair layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="hero-cross hero-cross-h invisible absolute left-0 right-0 top-0 h-px bg-[#7FA8C9]/20" />
        <span className="hero-cross hero-cross-v invisible absolute bottom-0 left-0 top-0 w-px bg-[#7FA8C9]/20" />
        <span className="hero-cross hero-coords u-mono invisible absolute left-0 top-0 whitespace-pre text-[10px] tracking-[0.14em] text-[#7FA8C9]/70" />
      </div>

      <div className="hero-content relative mx-auto w-full max-w-5xl">
        <p className="hero-eyebrow gsap-hide u-mono mb-6 text-[10px] uppercase tracking-[0.24em] text-[#7FA8C9] sm:mb-8 sm:text-[11px]">
          {person.name} — {person.base}
        </p>

        <h1 className="hero-h1 gsap-hide u-display text-[clamp(2.25rem,8.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.028em] text-[#E9ECF1] sm:leading-[1.02]">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span
                className={`hero-line-inner block ${
                  i === hero.headline.length - 1 ? "italic text-[#7FA8C9]" : ""
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-rest mt-8 grid gap-8 sm:mt-10 sm:gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <p className="hero-intro gsap-hide text-[14.5px] leading-relaxed text-[#8B95A5] sm:text-[15px] sm:leading-relaxed md:text-base">
              {hero.intro}
            </p>
            <p className="hero-intro gsap-hide u-mono mt-4 text-[11.5px] leading-relaxed text-[#7FA8C9] sm:mt-5 sm:text-[12px]">
              {hero.now}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:mt-7">
              <span className="hero-role gsap-hide u-mono mr-1.5 text-[10px] uppercase tracking-[0.18em] text-[#4E5B6B]">
                {person.role}
              </span>
              {hero.stack.map((tech) => (
                <span
                  key={tech}
                  className="hero-chip gsap-hide u-mono rounded-sm border border-[#1C222C] bg-[#0B0E13]/60 px-2 py-1 text-[10.5px] text-[#C7CED8]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              <Magnetic className="hero-cta gsap-hide">
                <a
                  href={`mailto:${person.email}`}
                  className="u-mono inline-block rounded-sm bg-[#F5F2EC] px-3.5 py-2.5 text-[11.5px] tracking-[0.06em] text-[#0B0E13] transition-opacity hover:opacity-85 sm:px-4 sm:text-[12px]"
                >
                  Start a conversation
                </a>
              </Magnetic>
              <Magnetic className="hero-cta gsap-hide">
                <a
                  href="#work"
                  className="u-mono inline-block rounded-sm border border-[#2A3341] px-3.5 py-2.5 text-[11.5px] tracking-[0.06em] text-[#C7CED8] transition-colors hover:border-[#7FA8C9] hover:text-[#7FA8C9] sm:px-4 sm:text-[12px]"
                >
                  See the work
                </a>
              </Magnetic>
            </div>
          </div>

          <TitleBlock />
        </div>
      </div>

      <div className="hero-scroll pointer-events-none absolute inset-x-0 bottom-5 mx-auto flex max-w-5xl items-center gap-3 px-5 sm:bottom-6 sm:px-8">
        <span className="hero-scroll-tick block h-6 w-px bg-[#7FA8C9]/60" />
        <span className="u-mono text-[10px] uppercase tracking-[0.28em] text-[#3A4552]">
          Scroll
        </span>
      </div>
    </section>
  );
}
