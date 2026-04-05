import { useEffect } from 'react';

const SLIDE_COUNT = 4;
const THRESHOLD = 80;
const AGENTS_ENTRY_COOLDOWN = 800;

/**
 * Intercepts wheel events inside the desktop carousel and two-agents sections
 * to advance slides one at a time. Free-scrolls everywhere else.
 *
 * @param {React.RefObject} carouselRef - ref to the 400vh carousel container
 * @param {React.RefObject} agentsRef   - ref to the 200vh agents container
 */
export function useScrollSnap(carouselRef, agentsRef) {
  useEffect(() => {
    let snapping = false;
    let acc = 0;
    let lastWheelTime = 0;
    let twoAgentsWasInside = false;
    let twoAgentsEntryTime = 0;

    function snap(top, duration) {
      snapping = true;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => {
        snapping = false;
      }, duration);
    }

    function handleWheel(e) {
      if (!window.matchMedia('(hover: hover)').matches) return;

      const sy = window.scrollY;
      const viewH = window.innerHeight;

      // Desktop carousel (null on mobile since it's not rendered)
      const carouselEl = carouselRef.current;
      if (carouselEl) {
        const top = carouselEl.offsetTop;
        const lastSlideTop = top + (SLIDE_COUNT - 1) * viewH;
        if (sy >= top && sy <= lastSlideTop) {
          if (snapping) {
            e.preventDefault();
            return;
          }
          const now = Date.now();
          if (now - lastWheelTime > 300) acc = 0;
          lastWheelTime = now;
          acc += e.deltaY;
          if (Math.abs(acc) < THRESHOLD) {
            e.preventDefault();
            return;
          }
          const dir = acc > 0 ? 1 : -1;
          acc = 0;
          const curSlide = Math.round((sy - top) / viewH);
          const nextSlide = Math.max(0, Math.min(curSlide + dir, SLIDE_COUNT - 1));
          if (nextSlide !== curSlide) {
            e.preventDefault();
            snap(top + nextSlide * viewH, 800);
          }
          return;
        }
      }

      // Desktop two-agents (null on mobile since it's not rendered)
      const agentsEl = agentsRef.current;
      if (agentsEl) {
        const top = agentsEl.offsetTop;
        const lastAgentTop = top + viewH;
        if (sy >= top && sy <= lastAgentTop) {
          if (!twoAgentsWasInside) {
            twoAgentsWasInside = true;
            twoAgentsEntryTime = Date.now();
            acc = 0;
          }
          if (Date.now() - twoAgentsEntryTime < AGENTS_ENTRY_COOLDOWN) {
            e.preventDefault();
            return;
          }
          if (snapping) {
            e.preventDefault();
            return;
          }
          const now = Date.now();
          if (now - lastWheelTime > 300) acc = 0;
          lastWheelTime = now;
          acc += e.deltaY;
          if (Math.abs(acc) < THRESHOLD) {
            e.preventDefault();
            return;
          }
          const dir = acc > 0 ? 1 : -1;
          acc = 0;
          const curAgent = Math.round((sy - top) / viewH);
          const nextAgent = Math.max(0, Math.min(curAgent + dir, 1));
          if (nextAgent !== curAgent) {
            e.preventDefault();
            snap(top + nextAgent * viewH, 600);
          }
          return;
        }
      }

      twoAgentsWasInside = false;
      acc = 0;
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [carouselRef, agentsRef]);
}
