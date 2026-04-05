import { useState } from 'react';
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
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              onClick={() => scrollToSection(sectionId)}
              className="text-sm font-medium px-4 py-2 rounded-[5px] transition text-gray-600 hover:text-black hover:bg-gray-100"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: CTA + mobile menu toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://calendly.com/kg-goutham-anseru"
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
