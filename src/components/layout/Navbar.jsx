import { useState, useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anseruLogo from '../../assets/Vector.png';

const NAV_LINKS = [
  { label: 'Home', sectionId: 'home' },
  { label: 'How it Works', sectionId: 'how-it-works' },
  { label: 'Product', sectionId: 'product' },
  { label: 'Features', sectionId: 'features' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const pillRef = useRef(null);
  const activeIdxRef = useRef(null);       // tracks which btn is "active"
  const activeBtnRef = useRef(null);

  function movePillTo(btnEl, container, spring = true) {
    const pill = pillRef.current;
    if (!pill || !btnEl) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();
    const left = btnRect.left - containerRect.left;

    // spring = bouncy on hover, snappy on click/return
    pill.style.transition = spring
      ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), width 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease'
      : 'transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease';

    pill.style.transform = `translateX(${left}px)`;
    pill.style.width = `${btnRect.width}px`;
    pill.style.opacity = '1';
  }

  function hidePill() {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.transition = 'opacity 0.25s ease';
    pill.style.opacity = '0';
  }

  function setButtonColors(container, highlightedBtn) {
    container.querySelectorAll('button[data-nav]').forEach(b => {
      b.style.color = b === highlightedBtn ? '#fff' : '#4b5563';
    });
  }

  function handleNavClick(e, sectionId, idx) {
    activeIdxRef.current = idx;
    activeBtnRef.current = e.currentTarget;
    // Use snappy transition on click
    movePillTo(e.currentTarget, e.currentTarget.parentElement, false);
    setButtonColors(e.currentTarget.parentElement, e.currentTarget);
    scrollToSection(sectionId);
  }

  function handleMouseEnter(e) {
    movePillTo(e.currentTarget, e.currentTarget.parentElement, true);
    setButtonColors(e.currentTarget.parentElement, e.currentTarget);
  }

  function handleMouseLeave(container) {
    if (activeBtnRef.current) {
      // Return pill to active item
      movePillTo(activeBtnRef.current, container, false);
      setButtonColors(container, activeBtnRef.current);
    } else {
      hidePill();
      container.querySelectorAll('button[data-nav]').forEach(b => {
        b.style.color = '#4b5563';
      });
    }
  }

  // Show/hide "Go to Top" button based on scroll depth
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safely jump to top smoothly without triggering sliding section animations
  function handleGoToTop() {
    const smoother = typeof window !== 'undefined' && window.ScrollSmoother ? window.ScrollSmoother.get() : null;
    const triggers = ScrollTrigger.getAll();
    
    // 1. Disable all scroll triggers temporarily to avoid backward scrub animations
    triggers.forEach(t => t.disable(false));

    // 2. Temporarily collapse manual heights for sticky horizontal scroll sections.
    // This removes the "sliding" distance so we can smoothly zip past them quickly.
    const tallContainers = document.querySelectorAll('#how-it-works > div, #product > div');
    tallContainers.forEach(el => {
      if (el.style.height !== 'auto') {
        el.dataset.originalHeight = el.style.height || '';
        el.style.height = 'auto';
      }
    });

    // 3. Smooth scroll to top
    if (smoother) {
      ScrollTrigger.refresh(); // Update smoother's height map
      smoother.scrollTo(0, true); // true = smooth scrolling
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // 4. Monitor scroll position to cleanly restore everything once at the top
    let checkScroll;
    let timeout;

    function finishGoToTop() {
      clearInterval(checkScroll);
      clearTimeout(timeout);
      
      // Restore original section heights
      tallContainers.forEach(el => {
        if (el.dataset.originalHeight !== undefined) {
          el.style.height = el.dataset.originalHeight;
        }
      });
      
      // Re-enable and recalculate triggers seamlessly at the top
      triggers.forEach(t => t.enable());
      ScrollTrigger.refresh();
    }

    checkScroll = setInterval(() => {
      const y = smoother ? smoother.scrollTop() : window.scrollY;
      if (y <= 10) {
        finishGoToTop();
      }
    }, 50);

    // Safety fallback in case smooth scroll gets interrupted
    timeout = setTimeout(() => {
      const y = smoother ? smoother.scrollTop() : window.scrollY;
      if (y > 10) {
        finishGoToTop();
      }
    }, 2500);
  }
  

  // Add this state at the top of your component (alongside showTopBtn)
const [showLabel, setShowLabel] = useState(false);

// Add this effect after your scroll effect
useEffect(() => {
  if (!showTopBtn) return;

  // Show label immediately when button appears
  setShowLabel(true);
  const hideTimer = setTimeout(() => setShowLabel(false), 3000);

  // Then repeat every 1 minute
  const interval = setInterval(() => {
    setShowLabel(true);
    setTimeout(() => setShowLabel(false), 3000);
  }, 60000);

  return () => {
    clearTimeout(hideTimer);
    clearInterval(interval);
  };
}, [showTopBtn]);

  return (
    <>
   <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <button className="flex items-center" onClick={() => scrollToSection('home')}>
          <img
            src={anseruLogo}
            alt="Anseru Logo"
            className="w-34 h-7 md:w-42 md:h-9 object-contain"
            loading="eager"
          />
        </button>

        {/* Desktop links */}
        <div
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => {
            isHoveringRef.current = false;
            if (activeBtnRef.current) {
              movePillTo(activeBtnRef.current, activeBtnRef.current.parentElement);
              activeBtnRef.current.parentElement.querySelectorAll('button').forEach(b => {
                b.style.color = b === activeBtnRef.current ? '#fff' : '#4b5563';
              });
            } else {
              hidePill();
              pillRef.current?.parentElement?.querySelectorAll('button').forEach(b => {
                b.style.color = '#4b5563';
              });
            }
          }}
        >
          {/* Sliding pill */}
          <div
            ref={pillRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: '#000',
              borderRadius: '5px',
              pointerEvents: 'none',
              opacity: 0,
              zIndex: 0,
            }}
          />

          {NAV_LINKS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              onClick={(e) => {
                activeBtnRef.current = e.currentTarget;
                scrollToSection(sectionId);
              }}
              onMouseEnter={(e) => {
                isHoveringRef.current = true;
                movePillTo(e.currentTarget, e.currentTarget.parentElement);
                e.currentTarget.parentElement.querySelectorAll('button').forEach(b => {
                  b.style.color = b === e.currentTarget ? '#fff' : '#4b5563';
                });
              }}
              style={{ position: 'relative', zIndex: 1, color: '#4b5563' }}
              className="text-sm font-medium px-5 py-2 rounded-[5px]"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: CTA + mobile menu toggle */}
        <div className="flex items-center gap-4">
          
          <a  href="https://calendly.com/kg-goutham-anseru/30min?back=1&month=2026-04"
            className="bg-black text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-[5px] text-xs sm:text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
          >
            Talk to Founders
          </a>
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4">
          {NAV_LINKS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              onClick={() => handleNavClick(sectionId)}
              className="block text-sm font-medium text-gray-600 hover:text-black"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>

      {/* Go to Top Button */}
<div className={`fixed bottom-8 right-0 z-[9999] flex flex-col items-center gap-1.5 transition-all duration-300 ${
  showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
}`}>

{/* Go to Top Button */}
<button
  onClick={handleGoToTop}
  aria-label="Go to top"
  className={`fixed bottom-0 right-4 z-[9999] group flex items-center gap-0
    overflow-hidden
    bg-black/40 hover:bg-black text-white
    rounded-full shadow-sm border border-white/10
    transition-all duration-500 ease-out backdrop-blur-sm cursor-pointer
    ${showTopBtn ? 'opacity-40 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
  `}
  style={{ padding: '6px 10px' }}
>
  {/* Arrow icon — always visible */}
  <svg
    className="w-3 h-3 flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
  </svg>

  {/* "Top" label — slides in on hover */}
  <span
    className="text-[11px] font-medium max-w-0 group-hover:max-w-[2rem] overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
    style={{ marginLeft: 0 }}
  >
    &nbsp;Top
  </span>
</button>
</div>
    </>
  );
}