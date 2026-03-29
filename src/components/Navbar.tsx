import { useState } from "react";
import logo from "../assets/Vector.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", target: "home" },
    { label: "How it Works", target: "how-it-works" },
    { label: "Product", target: "product" },
    { label: "Features", target: "features" },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // close mobile menu
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          className="flex items-center"
          onClick={() => handleScroll("home")}
        >
          <img
            src={logo}
            alt="Anseru Logo"
            className="w-24 md:w-32 h-7 object-contain"
          />
        </button>

        {/* Desktop Navigation menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.target)}
              className="text-sm font-medium px-4 py-2 rounded-[5px] transition text-gray-600 hover:text-black hover:bg-gray-100"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="https://calendly.com/kg-goutham-anseru" 
            className="bg-black text-white px-5 py-2 rounded-[5px] text-sm font-medium 
          hover:bg-gray-800 transition cursor-pointer"
          >
            Talk to Founders
          </Link>

          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.target)}
              className="block text-sm font-medium text-gray-600 hover:text-black"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
