"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Chapter copy. On phones only the first paragraph shows until the
 * reader asks for the rest — eight chapters of full text is a long
 * thumb-scroll. From md up everything is always visible.
 */
export default function ChapterBody({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const mounted = useRef(false);
  const [first, ...rest] = paragraphs;

  // Expanding changes the page height; re-measure every ScrollTrigger
  // so the rail and later reveals stay in step.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    ScrollTrigger.refresh();
  }, [open]);

  const para = "prose-note text-[14.5px] leading-[1.75] text-[#8B95A5] md:text-[15px]";

  return (
    <div className="mt-4 space-y-4">
      <p className={para} dangerouslySetInnerHTML={{ __html: first }} />

      {rest.length > 0 && (
        <>
          <div id={id} className={`space-y-4 ${open ? "block" : "hidden"} md:block`}>
            {rest.map((paragraph, j) => (
              <p key={j} className={para} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((o) => !o)}
            className="u-mono inline-flex min-h-[40px] items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#7FA8C9] md:hidden"
          >
            <span className="relative block h-2.5 w-2.5">
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span
                className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 ${
                  open ? "scale-y-0" : ""
                }`}
              />
            </span>
            {open ? "Show less" : "Read more"}
          </button>
        </>
      )}
    </div>
  );
}
