import ctaBgSrc from '../../assets/151.png';
import { Footer } from '../layout/Footer.jsx';

export function CTASection() {
  return (
    <div data-section className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {/* Left: visual panel */}
        <div className="relative flex items-center justify-center min-h-65 md:min-h-130 overflow-hidden">
          <img
            src={ctaBgSrc}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
          <div className="relative z-10 bg-white/10 border border-white/20 rounded-xl p-6 md:p-10 space-y-3 md:space-y-5 w-full max-w-120 shadow-2xl md:translate-x-30">
            {['Autonomous Deal Agents', 'Living Knowledge Engine', 'Deep Enterprise Integrations', 'Multi-Agent Orchestration'].map(
              (label) => (
                <div
                  key={label}
                  className="border border-white/40 bg-white/10 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-xl tracking-wide"
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: text panel */}
        <div className="bg-white md:bg-[#f4f4f4] flex items-center">
          <div className="w-full px-6 md:px-14 space-y-5 md:space-y-10 py-8 md:py-0">
            <h2 className="anseru-section-title md:pb-13 text-left">
              <span className="text-gray-700 text-2xl md:text-6xl">The New Layer for</span>
              <br />
              <span className="text-blue-600 text-3xl md:text-6xl font-medium">Enterprise Deals</span>
            </h2>
            <div className="border-l-[2px] border-gray-300 pl-4 max-w-[450px] md:ml-28">
              <p className="text-gray-600 leading-[1.7]" style={{ fontSize: 'clamp(13px,3.5vw,16px)' }}>
                We&apos;re building a world where AI agents orchestrate complex deal workflows, transforming
                enterprise knowledge into deal-ready intelligence so teams can focus on winning.
              </p>
            </div>
            {/* Request Demo button — mobile only */}
            <div className="md:hidden">
              <a
                href="https://calendly.com/kg-goutham-anseru"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000',
                  color: '#fff',
                  padding: `clamp(10px,2vw,14px) clamp(24px,5vw,40px)`,
                  borderRadius: '6px',
                  fontSize: 'clamp(13px,3.5vw,15px)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Request Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="w-full bg-[#f4f4f5] border-t border-gray-200 py-10 md:py-20 px-6 md:px-14 flex flex-col items-center justify-center text-center gap-6 md:gap-8">
        <h2
          className="font-normal text-[22px] md:text-4xl lg:text-5xl max-w-225 leading-snug md:leading-tight"
          style={{ letterSpacing: '0.15px' }}
        >
          Deal Intelligent Infrastructure for Modern Sales teams
        </h2>
        <a
          href="https://calendly.com/kg-goutham-anseru"
          className="bg-black text-white px-8 py-2.5 md:px-10 md:py-3 rounded-md text-sm md:text-xl hover:bg-gray-800 transition shadow-sm shrink-0"
        >
          Talk to Founders
        </a>
      </div>

      <Footer />
    </div>
  );
}
