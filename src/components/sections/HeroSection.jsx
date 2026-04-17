import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '../../hooks/useGsapContext.js';
import { DesktopHeroSvg } from '../sections/svg/DesktopHeroSvg.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
const heroMobileSrc = '/images/hero-mob.webp';


// Served from /public/images for <link rel="preload"> in index.html to work
const heroBgSrc = '/images/hero-bg.webp';

const REVEAL_TEXT =
  "We are a vertical AI-Native B2B SaaS Platform that helps Modern Sales Teams win deals faster using AI Agents to draft context-aware responses to RFP's & Security Questionnaire grounded in your knowledge base keeping humans-in-loop";

export function HeroSection() {
  const revealRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useGsapContext(revealRef, () => {
    const words = revealRef.current.querySelectorAll('.reveal-word');
    gsap.to(words, {
      color: '#2c48db',
      stagger: 0.1,
      scrollTrigger: {
        trigger: revealRef.current,
        start: 'top 90%',
        end: 'bottom 40%',
        scrub: true,
      },
    });
  }, []);

  const words = REVEAL_TEXT.split(/\s+/).filter(Boolean);

  return (
    <section data-section id="home" className="scroll-mt-12">
      {/* ── Mobile hero ─────────────────────────────────────────────── */}
      <div
        className="md:hidden w-full flex flex-col justify-center "
        style={{
          backgroundImage: `url(${heroBgSrc})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="hidden">
          Anseru - AI Agents for RFPs and Security Questionnaires | Deal Intelligence Platform
        </div>
        {/* pt-16 clears the fixed navbar (~64px); px/pb give breathing room matching the screenshot */}
        <div className="px-5 pt-18 pb-7">
          <h1
            className="text-white font-normal !leading-[.9] tracking-tight mb-5"
            style={{ fontSize: 'clamp(22px, 6.5vw, 30px)', letterSpacing: '-0.02em' }}
          >
            AI Agents for RFPs and <br />Security Questionnaires <br />Deal Intelligence Platform
          </h1>
          <a
            href="https://calendly.com/kg-goutham-anseru"
            aria-label="Request a demo for Anseru platform (mobile)"
            className="inline-block bg-white text-black text-sm font-medium px-5 py-2.5 rounded-[5px] hover:bg-gray-100 transition"
          >
            Request Demo
          </a>
        </div>
        
      </div>

      {/* ── Desktop hero ─────────────────────────────────────────────── */}
      <div className="hidden md:block relative w-full pt-3 pb-3">
        
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img
            src={heroBgSrc}
            alt="Hero"
            width={1440}
            height={900}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
            <div className="space-y-6 pt-24 pb-10 text-left overflow-visible">

              <h2 className="anseru-section-title text-white">
                AI Agents for RFPs and Security
                <br />
                Questionnaires | Deal Intelligence
                <br />
                Platform
              </h2>
              <a
                href="https://calendly.com/kg-goutham-anseru"
                aria-label="Request a demo for Anseru platform (desktop)"
                className="inline-block bg-white text-black text-sm font-medium px-5 py-2.5 rounded-[5px] hover:bg-gray-100 transition"
              >
                Request Demo
              </a>
            </div>
            <div className="flex h-full md:border-l border-white/20 items-end pb-10 md:px-10 md:pl-16 lg:pl-24">
              <p className="text-white mx-auto whitespace-pre-line max-w-104">
                We are a vertical AI-Native B2B SaaS Platform that helps Modern Sales Teams win deals faster
                using AI Agents to draft context-aware responses to RFP&apos;s &amp; Security Questionnaire
                grounded in your knowledge base keeping humans-in-loop
              </p>
            </div>
          </div>
        </div>
        <div className="hidden-h1 md:hidden hidden">
          Anseru - AI Agents for RFPs and Security Questionnaires | Deal Intelligence Platform
        </div>
      </div>

      {/* Below-fold workflow image */}
      
              <img 
                src={heroMobileSrc} 
                alt="Product Interface Illustration" 
                width={640} 
                height={756} 
                className="block md:hidden w-full" 
                loading="eager" 
                fetchpriority="high"
              />
      
      {isDesktop && (
        <div className="hidden md:block w-full">
          <DesktopHeroSvg className="w-full h-auto" />
        </div>
      )}
      {/* Reveal text (mobile only) */}
      <div className="md:hidden w-full px-5 pt-6 pb-10 min-h-[160px]">
        <p ref={revealRef} className="font-medium leading-[1.4]" style={{ fontSize: 'clamp(14px, 4.5vw, 20px)', color: '#111827' }}>
          {words.map((word, i) => (
            <span key={i} className="reveal-word" style={{ color: '#525252' }}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
