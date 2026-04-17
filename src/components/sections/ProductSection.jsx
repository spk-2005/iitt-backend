import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useGsapContext } from '../../hooks/useGsapContext.js';
import { AGENTS } from '../../data/agents.js';
import { AgentPanel } from '../cards/AgentPanel.jsx';

const AGENT_COUNT = AGENTS.length;

// ── Shared tab pill component ────────────────────────────────────────────────
function AgentTabs({ activeAgent, onAgentChange, variant = 'mobile' }) {
  return (
    <div
      className={
        variant === 'desktop'
          ? 'inline-flex w-fit items-center gap-1 bg-gray-100 p-1 rounded-xl'
          : 'inline-flex w-fit items-center gap-0.5 min-[250px]:gap-1 bg-gray-100 p-0.5 min-[250px]:p-1 rounded-xl flex-wrap'
      }
    >
      {AGENTS.map((agent, i) => {
        const isActive = i === activeAgent;
        const baseClasses = 'flex items-center gap-2 font-medium transition-all cursor-pointer rounded-lg';
        const sizeClasses =
          variant === 'desktop'
            ? 'px-4 sm:px-5 py-2.5 text-sm md:text-base'
            : 'gap-1 min-[250px]:gap-2 px-2 min-[250px]:px-4 sm:px-5 py-1.5 min-[250px]:py-2.5 whitespace-nowrap';
        return (
          <button
            key={agent.id}
            onClick={() => onAgentChange(i)}
            className={`${baseClasses} ${sizeClasses} ${isActive ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-200'
              }`}
            style={variant === 'mobile' ? { fontSize: 'clamp(9px,2.74vw,14px)' } : undefined}
          >
            {agent.tabLabel}
            <img
              src={agent.tabIcon}
              loading="lazy"
              alt={agent.id}
              width={16}
              height={16}
              className={isActive ? 'brightness-0 invert' : ''}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function ProductSection({ agentsRef }) {
  const [activeAgent, setActiveAgent] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Desktop refs
  const internalRef = useRef(null);
  const effectiveRef = agentsRef || internalRef;
  const stripRef = useRef(null);

  // Mobile refs
  const mobileContainerRef = useRef(null);
  const mobileTrackRef = useRef(null);

  // ── Desktop: GSAP ScrollTrigger horizontal strip animation ─────────────
  useGsapContext(effectiveRef, () => {
    if (!isDesktop) return;
    const container = effectiveRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        const xPct = -self.progress * ((AGENT_COUNT - 1) / AGENT_COUNT) * 100;
        gsap.set(strip, { xPercent: xPct });
        setActiveAgent(Math.round(self.progress * (AGENT_COUNT - 1)));
      },
    });
  }, [isDesktop]);

  // ── Desktop: IntersectionObserver (plain useEffect, no GSAP) ────────────
  const sentinelRefs = useRef([]);

  useEffect(() => {
    if (!isDesktop) return;

    const observers = [];

    sentinelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveAgent(i);
        },
        {
          root: null,        // viewport
          threshold: 0.5,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop]);

  // ── Mobile: scroll-driven sticky ────────────────────────────────────────
  useEffect(() => {
    if (isDesktop) return;
    const container = mobileContainerRef.current;
    if (!container) return;

    function handleScroll() {
      const sectionTop = container.offsetTop;
      const range = container.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / range));
      const zoneSize = 1 / AGENT_COUNT;
      const idx = Math.min(Math.floor(progress / zoneSize), AGENT_COUNT - 1);
      setActiveAgent(idx);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Update mobile track transform whenever activeAgent changes
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (track) {
      track.style.transform = `translateX(-${activeAgent * 100}vw)`;
    }
  }, [activeAgent]);

  // Scroll to appropriate vertical position for a given agent (mobile)
  function goToAgent(i) {
    if (isDesktop) return;
    const container = mobileContainerRef.current;
    if (!container) return;
    const sectionTop = container.offsetTop;
    const range = container.offsetHeight - window.innerHeight;
    const zoneSize = 1 / AGENT_COUNT;
    const targetY = sectionTop + (i * zoneSize + zoneSize * 0.5) * range;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  return (
    <section data-section id="product" className="scroll-mt-4">
      {isDesktop ? (
        /* ── Desktop: 200vh GSAP horizontal strip ─────────────────────── */
        <div
          ref={effectiveRef}
          id="two-agents-desktop"
          className="relative w-full bg-white"
          style={{ height: `${AGENT_COUNT * 100}vh` }}
        >
          {/* Sentinels — 100vh each, stacked */}
          {AGENTS.map((_, i) => (
            <div
              key={i}
              ref={(el) => (sentinelRefs.current[i] = el)}
              style={{
                position: 'absolute',
                top: `${i * 100}vh`,
                height: '100vh',
                width: '1px',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Sticky panel */}
          <div className="sticky top-0 h-screen flex flex-col md:pt-26   pb-7 overflow-hidden">
            {/* Header */}
            <div className="max-w-300 mx-auto px-6 w-full mb-5">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                <div className="space-y-1">
                  <p className="anseru-section-tag">Proven Results</p>
                  <h2 className="anseru-section-title">Two Super Agents</h2>
                </div>
                <AgentTabs
                  activeAgent={activeAgent}
                  onAgentChange={(i) => {
                    sentinelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  variant="desktop"
                />
              </div>
            </div>

            {/* Sliding strip */}
            <div className="flex-1 w-full overflow-hidden">
              <div className="max-w-300 mx-auto px-6 w-full h-full">
                <div className="border border-black/30 rounded-xl overflow-hidden h-full">
                  <div
                    className="flex h-full"
                    style={{
                      width: `${AGENT_COUNT * 100}%`,
                      transform: `translateX(-${(activeAgent * 100) / AGENT_COUNT}%)`,
                      transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                      willChange: 'transform',
                    }}
                  >
                    {AGENTS.map((agent) => (
                      <AgentPanel key={agent.id} agent={agent} isDesktop />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile: scroll-driven sticky carousel ────────────────────── */
        <div
          ref={mobileContainerRef}
          className="relative w-full bg-white pt-6"
          style={{ height: `${AGENT_COUNT * 100}vh` }}
        >
          {/* Section tag — scrolls away */}
          <div className="px-5 mb-1 pt-10">
            <p className="anseru-section-tag">Proven Results</p>
          </div>

          <div
            className="sticky w-full bg-white flex flex-col"
            style={{ top: '53px', height: 'calc(100vh - 53px)', overflow: 'hidden' }}
          >
            {/* Header — remains sticky */}
            <div className="shrink-0 pt-2 pb-3 px-5">
              <h2 className="anseru-section-title mt-0 mb-3">Two Super Agents</h2>
              <AgentTabs activeAgent={activeAgent} onAgentChange={goToAgent} variant="mobile" />
            </div>

            {/* Sliding track — fills remaining height, each slide scrolls vertically */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <div
                ref={mobileTrackRef}
                className="flex h-full"
                style={{
                  width: `${AGENT_COUNT * 100}vw`,
                  transform: 'translateX(0)',
                  transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform',
                }}
              >
                {AGENTS.map((agent) => (
                 <div
  key={agent.id}
  className="shrink-0 h-full overflow-hidden px-4 sm:px-6 pb-4"
  style={{ width: '100vw' }}
>
                    <AgentPanel agent={agent} isDesktop={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators — fixed height */}
            <div className="shrink-0 flex justify-center gap-2 py-3">
              {AGENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToAgent(i)}
                  aria-label={`Go to agent ${i + 1}`}
                  className="flex items-center justify-center w-11 h-11"
                >
                  <div className={`rounded-full transition-all duration-300 ${i === activeAgent ? 'w-5 h-2 bg-gray-700' : 'w-2 h-2 bg-gray-300'
                    }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
