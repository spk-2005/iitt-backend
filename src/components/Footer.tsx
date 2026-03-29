import logo from "../assets/Vector.png";
import bg151 from "../assets/151.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full flex flex-col font-[Inter]">
      {/* ── TOP SECTION ───────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Gradient + Glass */}
        <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[520px] overflow-hidden">
          {/* Background */}
          <img
            src={bg151}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />

          {/* Glass Card */}
          <div className="relative z-10 bg-white/10 border border-white/20 rounded-xl p-10 space-y-5 w-full max-w-[480px] shadow-2xl md:translate-x-30">
            {[
              "Autonomous Deal Agents",
              "Living Knowledge Engine",
              "Deep Enterprise Integrations",
              "Multi-Agent Orchestration",
            ].map((item, i) => (
              <div
                style={{ fontFamily: "DM sans" }}
                key={i}
                className="border border-white/40 bg-white/10 text-white px-6 py-2 rounded-md text-[20px] tracking-wide"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Heading + Text */}
        <div className="bg-[#f4f4f4] flex items-center">
          <div className="max-w-xl px-10 md:px-14 space-y-10 py-16 md:py-0">
            <h2 className="anseru-section-title pb-13 mb-8">
              <span className="text-gray-700 text-6xl">The New Layer for</span>{" "}
              <br />
              <span className="text-blue-600 text-6xl font-medium">
                Enterprise Deals
              </span>
            </h2>

            <div className="border-l-[2px] border-gray-300 pl-4 max-w-[450px] ml-28">
              <p className="text-gray-600 text-[16px] leading-[1.7]">
                We’re building a world where AI agents orchestrate complex deal
                workflows, transforming enterprise knowledge into deal-ready
                intelligence so teams can focus on winning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA SECTION ───────────────────────────── */}
      <div className="w-full bg-[#f4f4f4] border-t border-gray-200 py-20 px-10 md:px-14 flex flex-col items-center justify-center text-center gap-8">
        <h2
          style={{letterSpacing : "0.15px", wordSpacing: "3px"}}
          className="font-regular text-xl sm:text-2xl md:text-4xl lg:text-5xl max-w-[900px]"
        >
          Deal Intelligent Infrastructure for Modern Sales teams
        </h2>

        <Link to="https://calendly.com/kg-goutham-anseru" 
          style={{ fontFamily: "DM sans" }}
          className="bg-black text-white px-10 py-3 rounded-md text-[20px] hover:bg-gray-800 transition shadow-sm shrink-0"
        >
          Talk to Founders
        </Link>
      </div>

      {/* ── FOOTER BOTTOM ───────────────────────────────── */}
      <footer className="w-full bg-[#f4f4f4]">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="Anseru Logo" className="h-10 object-contain" />
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[14px] text-gray-500">
            © 2026 Anseru Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-[14px]">
            <a href="#" className="text-gray-500 hover:text-black transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-black transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
