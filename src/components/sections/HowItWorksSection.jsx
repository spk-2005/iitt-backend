import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useGsapContext } from '../../hooks/useGsapContext.js';
import { CAROUSEL_SLIDES } from '../../data/carousel.js';
import { CarouselSlidePanel } from '../cards/CarouselSlidePanel.jsx';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_COUNT = CAROUSEL_SLIDES.length;

function MobileIndicators({ activeSlide, onGoTo }) {
  return (
    <div className="bg-gray-50 flex justify-between items-center w-full p-1 rounded-xl border border-gray-100">
      {CAROUSEL_SLIDES.map((slide, i) => (
        <button
          key={slide.index}
          onClick={() => onGoTo(i)}
          className={`text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer px-1.5 py-1.5 rounded-[8px] flex-1 text-center leading-tight ${
            activeSlide === i ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-200'
          }`}
        >
          {slide.tabLabel}
        </button>
      ))}
    </div>
  );
}

export function HowItWorksSection({ carouselRef }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(53);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const internalRef = useRef(null);
  const effectiveRef = carouselRef || internalRef;
  const stripRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const mobileTrackRef = useRef(null);

  // Dynamically measure the actual navbar height
  useEffect(() => {
    const navbar = document.querySelector('nav, header, [data-navbar]');
    if (navbar) setNavbarHeight(navbar.offsetHeight);
  }, []);

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
      const idx = Math.min(Math.floor(progress * SLIDE_COUNT), SLIDE_COUNT - 1);
      setActiveSlide(idx);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (track) track.style.transform = `translateX(-${activeSlide * 100}vw)`;
  }, [activeSlide]);

  function goToSlide(i) {
    if (isDesktop) return;
    const container = mobileContainerRef.current;
    if (!container) return;
    const sectionTop = container.offsetTop;
    const range = container.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (i / SLIDE_COUNT) * range + 4;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  const stickyTop = navbarHeight;
  const stickyHeight = `calc(100dvh - ${stickyTop}px)`;

  return (
    <section data-section id="how-it-works" className="scroll-mt-5">
      {isDesktop ? (
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
                <div className="max-w-2xl mx-auto px-4">
                  <div className="bg-gray-50 flex justify-between items-center w-full p-1.5 rounded-xl border border-gray-100">
                    {CAROUSEL_SLIDES.map((slide, i) => (
                      <button
                        key={slide.index}
                        onClick={() => {
                          const container = effectiveRef.current;
                          if (!container) return;
                          window.scrollTo({
                            top: container.offsetTop + i * window.innerHeight,
                            behavior: 'smooth',
                          });
                        }}
                        className={`text-[13px] font-medium transition-all cursor-pointer px-5 py-2.5 rounded-[8px] flex-1 text-center ${
                          activeSlide === i
                            ? 'bg-black text-white shadow-sm'
                            : 'text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {slide.tabLabel}
                      </button>
                    ))}
                  </div>
                </div>
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
        /* ── Mobile ── */
        <div
          ref={mobileContainerRef}
          className="relative w-full bg-white pt-10"
          style={{ height: `${SLIDE_COUNT * 100}vh` }}
        >
          <div
            className="sticky w-full bg-white flex flex-col"
            style={{ top: `${stickyTop - 26}px`, height: stickyHeight }}
          >
            {/* ── Header: uses clamp so it compresses on short screens ── */}
            <div
              className="shrink-0 px-4"
              style={{ paddingTop: 'clamp(6px, 1.5dvh, 16px)', paddingBottom: 'clamp(4px, 1dvh, 10px)' }}
            >
              <p
                className="anseru-section-tag"
                
              >
                How It Works
              </p>
              <h2
                className="anseru-section-title font-semibold leading-tight"
                style={{
                  fontSize: 'clamp(15px, 4.5vw, 22px)',
                  marginTop: 'clamp(2px, 0.5dvh, 6px)',
                  marginBottom: 'clamp(4px, 1dvh, 10px)',
                }}
              >
                How Anseru Turns Knowledge Into Winning Deals
              </h2>
              <MobileIndicators activeSlide={activeSlide} onGoTo={goToSlide} />
            </div>

            {/* ── Sliding track ── */}
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
                  <CarouselSlidePanel
                    key={slide.index}
                    slide={slide}
                    isDesktop={false}
                    className="h-full shrink-0 overflow-hidden"
                    style={{ width: '100vw' }}
                  />
                ))}
              </div>
            </div>

            {/* ── Dots ── */}
            <div
              className="shrink-0 flex justify-center gap-2"
              style={{ paddingTop: 'clamp(4px, 0.8dvh, 10px)', paddingBottom: 'clamp(4px, 0.8dvh, 10px)' }}
            >
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeSlide ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  style={{
                    width: i === activeSlide ? '20px' : '6px',
                    height: '6px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}