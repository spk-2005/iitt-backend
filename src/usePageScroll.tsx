import { useEffect, useRef } from "react";

const SCROLL_THRESHOLD = 120;  // accumulated delta before triggering
const SNAP_DURATION = 900;    // ms to lock out further snaps

export function usePageSroll(sectionSelector: string) {
  const isSnappingRef = useRef(false);
  const accDeltaRef = useRef(0);
  const lastWheelTimeRef = useRef(0);


  useEffect(() => {
    
    const handleWheel = (e: WheelEvent) => {
      // Only on pointer devices
      if (!window.matchMedia("(hover: hover)").matches) return;
      if (isSnappingRef.current) return;

      e.preventDefault();

      const now = Date.now();
      // Reset accumulator if user paused
      if (now - lastWheelTimeRef.current > 300) {
        accDeltaRef.current = 0;
      }
      lastWheelTimeRef.current = now;
      accDeltaRef.current += e.deltaY;

      if (Math.abs(accDeltaRef.current) < SCROLL_THRESHOLD) return;

      const direction = accDeltaRef.current > 0 ? 1 : -1;
      accDeltaRef.current = 0;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(sectionSelector)
      );
      if (!sections.length) return;

      // Find which section is currently most in view
      const viewportMid = window.scrollY + window.innerHeight / 2;
      let currentIdx = 0;
      let minDist = Infinity;
      sections.forEach((section, i) => {
        const dist = Math.abs(
          section.offsetTop + section.offsetHeight / 2 - viewportMid
        );
        if (dist < minDist) {
          minDist = dist;
          currentIdx = i;
        }
      });

      const currentSection = sections[currentIdx];
      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // Scrolling DOWN: only snap if user is past 90% of section
      if (direction === 1) {
        const remainingBelowViewport =
          sectionBottom - (window.scrollY + window.innerHeight);
        const remainingRatio = remainingBelowViewport / sectionHeight;
        // Still more than 10% of section below the fold → don't snap yet
        if (remainingRatio > 0.1) {
          accDeltaRef.current = 0;
          return;
        }
      }

      // For scrolling UP: check how far section top is above viewport top.
      if (direction === -1) {
        const aboveViewport = window.scrollY - sectionTop;
        const aboveRatio = aboveViewport / sectionHeight;
        // Still more than 10% of section above viewport top → don't snap yet
        if (aboveRatio > 0.1) {
          accDeltaRef.current = 0;
          return;
        }
      }

      const nextIdx = Math.max(
        0,
        Math.min(currentIdx + direction, sections.length - 1)
      );
      if (nextIdx === currentIdx) return;

      e.preventDefault();
      isSnappingRef.current = true;

      window.scrollTo({
        top: sections[nextIdx].offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        isSnappingRef.current = false;
      }, SNAP_DURATION);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [sectionSelector]);
}