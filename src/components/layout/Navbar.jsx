import { useState, useEffect, useRef } from 'react';
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

  const pillRef = useRef(null);
  const activeBtnRef = useRef(null);
  const isHoveringRef = useRef(false);

  function movePillTo(btnEl, container) {
    const pill = pillRef.current;
    if (!pill || !btnEl) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();
    const left = btnRect.left - containerRect.left;
    pill.style.transition =
      'transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease';
    pill.style.transform = `translateX(${left}px)`;
    pill.style.width = `${btnRect.width}px`;
    pill.style.opacity = '1';
  }

  function hidePill() {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.transition = 'opacity 0.2s ease';
    pill.style.opacity = '0';
  }

  function handleNavClick(sectionId) {
    scrollToSection(sectionId);
    setMenuOpen(false);
  }

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <button className="flex items-center" onClick={() => scrollToSection('home')}>
          <img
            src={anseruLogo}
            alt="Anseru Logo"
            className="w-24 md:w-32 h-7 object-contain"
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
  );
}