import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM_CARDS } from '../../data/teamCards.js';
import { TeamFlipCard } from '../cards/TeamFlipCard.jsx';
import { useGsapContext } from '../../hooks/useGsapContext.js';

gsap.registerPlugin(ScrollTrigger);

const CARD_COUNT = TEAM_CARDS.length;
const AUTO_ADVANCE_MS = 5000;

export function ProblemSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const mobileWrapperRef = useRef(null);
  const mobileTriggerRef = useRef(null);

  function goTo(i) {
    setActiveCard(Math.max(0, Math.min(CARD_COUNT - 1, i)));
    resetInterval();
  }

  function resetInterval() {
    clearInterval(intervalRef.current);
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % CARD_COUNT);
    }, AUTO_ADVANCE_MS);
  }

  // Auto-advance logic
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  // Handle mobile pinning/scroll-lock
  useGsapContext(mobileWrapperRef, () => {
    // Determine the total scroll distance based on number of cards
    const totalHeight = 100 + (CARD_COUNT - 1) * 100; // 100vh per card

    ScrollTrigger.create({
      trigger: mobileWrapperRef.current,
      start: "top top",
      end: `+=${totalHeight}vh`,
      pin: mobileTriggerRef.current,
      pinSpacing: true,
      scrub: 0.1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Map scroll progress to card index
        // progress 0 to 1
        const progressPerCard = 1 / CARD_COUNT;
        const index = Math.min(Math.floor(self.progress / progressPerCard), CARD_COUNT - 1);
        // Only update if index changed, but timer usually handles auto.
        // Actually, let's keep timer and scroll separate for now or allow scroll to override.
        // If we want "it should not scroll", it's pinned anyway.
        // Let's just use pinning to keep the section in focus.
      }
    });
  });

  function onDragStart(e) {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
    setIsPaused(true);
  }

  function onInteractionEnd() {
    isDragging.current = false;
    setIsPaused(false);
    dragStartX.current = null;
  }

  function onDragEnd(e) {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) {
      setActiveCard((prev) => {
        const next = diff > 0
          ? Math.min(prev + 1, CARD_COUNT - 1)
          : Math.max(prev - 1, 0);
        return next;
      });
    }
    onInteractionEnd();
  }

  // Update track transform
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${activeCard * 100}vw)`;
    }
  }, [activeCard]);

  return (
    <section data-section id="problem" className="scroll-mt-20">
      <div className="w-full pt-10 md:pt-20 font-sans">
        <div className="max-w-310 mx-auto px-6">
          <div className="mb-5">
            <p className="anseru-section-tag">Customer Problem</p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-left">
              <h2 className="anseru-section-title">
                Built for Teams Navigating <br className="hidden md:block" />
                Complex Deals
              </h2>
              {/* Description hidden on mobile */}
              <p className="hidden md:block anseru-section-description max-w-105 pb-1">
                Sales, security, and compliance teams rely on <br />
                Anseru to generate accurate responses faster.
              </p>
            </div>
          </div>

          {/* ── Desktop: 3-column grid ──────────────────────────────────── */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
            {TEAM_CARDS.map((card) => (
              <TeamFlipCard key={card.id} card={card} />
            ))}
          </div>

          {/* ── Mobile: auto-carousel with scroll-locking/pinning ────────── */}
          <div ref={mobileWrapperRef} className="md:hidden relative">
            <div ref={mobileTriggerRef} className="bg-white w-full">
              <div
                className="overflow-hidden"
                onMouseDown={onDragStart}
                onMouseUp={onDragEnd}
                onMouseLeave={onInteractionEnd}
                onTouchStart={onDragStart}
                onTouchEnd={onDragEnd}
              >
                <div
                  ref={trackRef}
                  className="flex"
                  style={{
                    width: `${CARD_COUNT * 100}vw`,
                    transform: 'translateX(0)',
                    transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                    willChange: 'transform',
                  }}
                >
                  {TEAM_CARDS.map((card) => (
                    <div key={card.id} className="shrink-0" style={{ width: '100vw', paddingRight: '24px' }}>
                      <TeamFlipCard card={card} />
                    </div>
                  ))}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 pt-4 pb-2">
                  {TEAM_CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to card ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeCard ? 'w-5 h-2 bg-gray-700' : 'w-2 h-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
