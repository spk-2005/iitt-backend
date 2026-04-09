import { useState, useEffect, useRef } from 'react';
import { TEAM_CARDS } from '../../data/teamCards.js';
import { TeamFlipCard } from '../cards/TeamFlipCard.jsx';

const CARD_COUNT = TEAM_CARDS.length;
const AUTO_ADVANCE_MS = 5000;

export function ProblemSection() {
  const [activeCard, setActiveCard] = useState(0);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  function goTo(i) {
    setActiveCard(Math.max(0, Math.min(CARD_COUNT - 1, i)));
  }

  function resetInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % CARD_COUNT);
    }, AUTO_ADVANCE_MS);
  }

  // Auto-advance
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);
function onDragStart(e) {
  dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  isDragging.current = true;
  // Pause auto-advance while user is holding
  clearInterval(intervalRef.current);
}

function onDragEnd(e) {
  if (!isDragging.current || dragStartX.current === null) return;
  isDragging.current = false;
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
  dragStartX.current = null;
  // Resume auto-advance after user releases
  resetInterval();
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

          {/* ── Mobile: auto-carousel ───────────────────────────────────── */}
          <div
            className="md:hidden overflow-hidden -mx-6"
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
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
              <div key={card.id} className="shrink-0 px-6 flex justify-center" style={{ width: '100vw' }}>
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
    </section>
  );
}