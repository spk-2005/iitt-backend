import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useGsapContext } from '../../hooks/useGsapContext.js';
import { CAROUSEL_SLIDES } from '../../data/carousel.js';
import { CarouselSlidePanel } from '../cards/CarouselSlidePanel.jsx';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_COUNT = CAROUSEL_SLIDES.length;

// ── Desktop tab indicators ───────────────────────────────────────────────────
function DesktopIndicators({ activeSlide, containerRef }) {
  function goTo(i) {
    const container = containerRef.current;
    if (!container) return;
    window.scrollTo({ top: container.offsetTop + i * window.innerHeight, behavior: 'smooth' });
  }

  return (
    <div className="flex justify-center items-center gap-0 max-w-145 mx-auto px-4">
      {CAROUSEL_SLIDES.map((slide, i) => (
        <div key={slide.index} className="flex items-center">
          <button
            onClick={() => goTo(i)}
            className={`text-[13px] sm:text-[15px] font-medium transition-colors cursor-pointer px-3 sm:px-4 py-2 rounded-full ${activeSlide === i ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {slide.tabLabel}
          </button>
          {i < SLIDE_COUNT - 1 && <div className="w-5 sm:w-10 h-px bg-gray-200 -mx-1 sm:-mx-2" />}
        </div>
      ))}
    </div>
  );
}

// ── Mobile pill indicators ───────────────────────────────────────────────────
function MobileIndicators({ activeSlide, onGoTo }) {
  return (
    <div className="bg-gray-50 flex justify-between items-center w-full p-1 rounded-xl">
      {CAROUSEL_SLIDES.map((slide, i) => (
        <button
          key={slide.index}
          onClick={() => onGoTo(i)}
          className={`text-[11px] font-medium transition-all cursor-pointer px-2 py-1.5 rounded-[8px] flex-1 text-center ${activeSlide === i ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-200'
            }`}
        >
          {slide.tabLabel}
        </button>
      ))}
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function HowItWorksSection({ carouselRef }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Desktop refs
  const internalRef = useRef(null);
  const effectiveRef = carouselRef || internalRef;
  const stripRef = useRef(null);

  // Mobile refs
  const mobileContainerRef = useRef(null);
  const mobileTrackRef = useRef(null);

  // ── Desktop: GSAP ScrollTrigger ─────────────────────────────────────────
  useGsapContext(effectiveRef, () => {
    const container = effectiveRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: 1 / (SLIDE_COUNT - 1),
        duration: { min: 0.2, max: 0.5 },
        delay: 0,
        ease: 'power1.inOut',
      },
      onUpdate(self) {
        const xPct = -self.progress * ((SLIDE_COUNT - 1) / SLIDE_COUNT) * 100;
        gsap.set(strip, { xPercent: xPct });
        setActiveSlide(Math.round(self.progress * (SLIDE_COUNT - 1)));
      },
    });
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
      const zoneSize = 1 / SLIDE_COUNT;
      const idx = Math.min(Math.floor(progress / zoneSize), SLIDE_COUNT - 1);
      setActiveSlide(idx);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Update mobile track transform whenever activeSlide changes
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (track) {
      track.style.transform = `translateX(-${activeSlide * 100}vw)`;
    }
  }, [activeSlide]);

  // Scroll to appropriate vertical position for a given slide (mobile)
  function goToSlide(i) {
    if (isDesktop) return;
    const container = mobileContainerRef.current;
    if (!container) return;
    const sectionTop = container.offsetTop;
    const range = container.offsetHeight - window.innerHeight;
    const zoneSize = 1 / SLIDE_COUNT;
    // Scroll to the midpoint of that zone so the scroll handler resolves correctly
    const targetY = sectionTop + (i * zoneSize + zoneSize * 0.5) * range;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  return (
    <section data-section id="how-it-works" className="scroll-mt-5">
      {isDesktop ? (
        /* ── Desktop: 400vh GSAP horizontal carousel ─────────────────── */
        <div
          ref={effectiveRef}
          id="carousel-desktop"
          className="relative w-full bg-white"
          style={{ height: '400vh' }}
        >
          <div
            className="sticky w-full bg-white overflow-hidden"
            style={{ top: '12px', height: 'calc(100vh - 12px)' }}
          >
            <div className="relative z-20 pt-6 pb-2">
              <div className="text-center">
                <p className="anseru-section-tag">How It Works</p>
                <h2 className="anseru-section-title mt-2 mb-4">
                  How Anseru Turns Knowledge
                  <br />
                  Into Winning Deals
                </h2>
                <DesktopIndicators activeSlide={activeSlide} containerRef={effectiveRef} />
              </div>
            </div>

            <div className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: '200px' }}>
              <div
                ref={stripRef}
                className="flex h-full"
                style={{ width: `${SLIDE_COUNT * 100}vw`, willChange: 'transform' }}
              >
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselSlidePanel
                    key={slide.index}
                    slide={slide}
                    isDesktop
                    isActive={activeSlide === slide.index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile: scroll-driven sticky carousel ────────────────────── */
        <div
          ref={mobileContainerRef}
          className="relative w-full bg-white pt-10" 
          style={{ height: `${SLIDE_COUNT * 100}vh` }}
        >
          {/* Sticky panel sits below the fixed navbar (53px) and fills the remaining viewport */}
          <div
            className="sticky w-full bg-white flex flex-col"
            style={{ top: '53px', height: 'calc(100vh - 53px)', overflow: 'hidden' }}
          >
            {/* Header — fixed height */}
            <div className="shrink-0 pt-5 pb-3 px-5">
              <p className="anseru-section-tag">How It Works</p>
              <h2 className="anseru-section-title mt-1 mb-3">
                How Anseru Turns Knowledge Into Winning Deals
              </h2>
              <MobileIndicators activeSlide={activeSlide} onGoTo={goToSlide} />
            </div>

            {/* Sliding track — grows to fill remaining space */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <div
                ref={mobileTrackRef}
                className="flex h-full"
                style={{
                  width: `${SLIDE_COUNT * 100}vw`,
                  transform: 'translateX(0)',
                  transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform',
                }}
              >
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselSlidePanel key={slide.index} slide={slide} isDesktop={false} />
                ))}
              </div>
            </div>

            {/* Dot indicators — fixed height */}
            <div className="shrink-0 flex justify-center gap-2 py-3">
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === activeSlide ? 'w-5 h-2 bg-gray-700' : 'w-2 h-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}