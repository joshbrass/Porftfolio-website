"use client";

import type Lenis from "lenis";

/** The page's single Lenis instance, so other components can pause
 *  scrolling (e.g. while the preloader is up). Null when Lenis is off. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
