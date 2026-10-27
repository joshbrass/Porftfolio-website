"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, useGSAP);
}

/** Every animation is gated behind this, so reduced-motion users get
 *  the static page exactly as the markup describes it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Cursor-driven effects only make sense with a real mouse. */
export const FINE_POINTER =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Characters used while text "resolves" — mono drafting glyphs. */
export const SCRAMBLE_CHARS = "▪▫+×/\\|—01";

export { gsap, ScrollTrigger, SplitText, useGSAP };
