import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a gsap.context() scoped to a ref and runs the setup function inside it.
 * Automatically reverts on cleanup (unmount or deps change).
 *
 * @param {React.RefObject} scopeRef - ref to the container element
 * @param {Function} setupFn - function that creates GSAP animations
 * @param {Array} deps - dependency array (re-run when these change)
 */
export function useGsapContext(scopeRef, setupFn, deps = []) {
  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(setupFn, scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
