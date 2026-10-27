"use client";

import { useRef, useState } from "react";
import { person } from "@/data/site";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { markPreloaderDone } from "@/lib/preloader";

const SESSION_KEY = "oj-preloaded";

/** Read once per page load, so an effect re-run (Strict Mode, remount)
 *  doesn't see the flag it just wrote and play the short version. */
let firstVisitThisLoad: boolean | null = null;
function isFirstVisit() {
  if (firstVisitThisLoad === null) {
    try {
      firstVisitThisLoad = sessionStorage.getItem(SESSION_KEY) !== "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      firstVisitThisLoad = true; // storage blocked — play the full version
    }
  }
  return firstVisitThisLoad;
}

/**
 * Opening card: full name rises out of its masks, the role decodes from
 * drafting glyphs, a counter runs to 100, then the sheet lifts and hands
 * over to the hero entrance. It's rendered on the server so it covers the
 * page from the first paint — no flash of the site underneath.
 *
 * First visit in a session gets the full ~2.8s sequence; later loads in
 * the same tab get a ~1.4s version so returning visitors aren't made to
 * wait. Reduced motion gets a short fade.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;

      // Always start at the top — the hero is what the preloader reveals.
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      html.classList.add("is-preloading");
      getLenis()?.stop();

      const release = () => {
        html.classList.remove("is-preloading");
        getLenis()?.start();
      };

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        onComplete: () => {
          release();
          setGone(true);
        },
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = SplitText.create(".pl-word", { type: "chars" });

      if (reduce) {
        tl.set(".pl-name, .pl-role", { autoAlpha: 1 })
          .call(markPreloaderDone, [], 0.6)
          .to(el, { autoAlpha: 0, duration: 0.4, ease: "none" }, 0.6);
      } else {
        const full = isFirstVisit();
        const counter = { v: 0 };
        const countEl = el.querySelector<HTMLElement>(".pl-count");
        const hold = full ? 2.15 : 0.85;

        tl.set(".pl-name", { autoAlpha: 1 }, 0)
          .from(split.chars, { yPercent: 115, rotate: 5, duration: full ? 1.1 : 0.7, stagger: full ? 0.035 : 0.018 }, 0.1)
          .from(".pl-meta", { autoAlpha: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, 0.2)
          .from(".pl-rule", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, full ? 0.55 : 0.25)
          .set(".pl-role", { autoAlpha: 1 }, full ? 0.65 : 0.3)
          .to(".pl-role", {
            duration: full ? 1 : 0.6,
            scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.6 },
            ease: "none",
          }, full ? 0.65 : 0.3)
          .to(counter, {
            v: 100,
            duration: hold - 0.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          }, 0)
          .fromTo(".pl-bar", { scaleX: 0 }, { scaleX: 1, duration: hold - 0.1, ease: "power2.inOut" }, 0);

        // Exit: name leaves upward through the same masks, then the sheet lifts.
        tl.to(split.chars, { yPercent: -115, duration: 0.6, ease: "power3.in", stagger: 0.015 }, hold)
          .to(".pl-role, .pl-rule, .pl-meta, .pl-count, .pl-track", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, hold)
          .call(markPreloaderDone, [], hold + 0.45)
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power4.inOut" }, hold + 0.45);
      }

      // Wait for the display face so the name doesn't swap fonts mid-reveal.
      let cancelled = false;
      Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => setTimeout(r, 1500)),
      ]).then(() => {
        if (!cancelled) tl.play();
      });

      return () => {
        cancelled = true;
        split.revert();
        release();
      };
    },
    { scope: root }
  );

  if (gone) return null;

  const words = person.name.split(" ");

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[200] flex flex-col justify-between bg-[#0B0E13] px-6 py-6 sm:px-10 sm:py-8"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="u-mono flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#4E5B6B]">
        <span className="pl-meta">{person.initials} — Portfolio</span>
        <span className="pl-meta">{person.base}</span>
      </div>

      <div>
        <p className="pl-name gsap-hide u-display text-[clamp(3.6rem,17vw,10.5rem)] font-light leading-[0.95] tracking-[-0.035em] text-[#E9ECF1]">
          {words.map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.1em] -mb-[0.05em]">
              <span className={`pl-word block ${i === words.length - 1 ? "italic text-[#7FA8C9]" : ""}`}>
                {word}
              </span>
            </span>
          ))}
        </p>
        <div className="mt-5 flex items-center gap-4 sm:mt-7">
          <span className="pl-rule block h-px w-10 origin-left bg-[#7FA8C9] sm:w-14" />
          <p className="pl-role gsap-hide u-mono text-[11px] uppercase tracking-[0.24em] text-[#C7CED8] sm:text-[13px]">
            {person.role}
          </p>
        </div>
      </div>

      <div>
        <div className="u-mono flex items-end justify-between">
          <span className="pl-meta text-[10px] uppercase tracking-[0.2em] text-[#3A4552]">
            Drafting the sheet
          </span>
          <span className="pl-count text-[clamp(2rem,6vw,3.5rem)] leading-none tabular-nums text-[#E9ECF1]">
            000
          </span>
        </div>
        <div className="pl-track mt-4 h-px bg-[#1C222C]">
          <div className="pl-bar h-full origin-left scale-x-0 bg-[#7FA8C9]" />
        </div>
      </div>
    </div>
  );
}
