"use client";

/**
 * Handshake between the preloader and anything that should wait for it
 * (the hero entrance). The preloader calls markPreloaderDone() as its
 * curtain starts to lift; listeners registered later fire immediately.
 */
let done = false;
const listeners = new Set<() => void>();

export function markPreloaderDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onPreloaderDone(fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
