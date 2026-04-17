import { SECURITY_NODES } from '../../data/security.js';
import shieldImg from '../../assets/shield.png?format=webp&quality=80';
import anseruLogo from '../../assets/Anseru_3 2.png?format=webp&quality=80';

export function SecuritySection() {
  return (
    <section data-section id="security" className="scroll-mt-5">
      <div className="w-full bg-white overflow-hidden px-6 md:px-12 font-sans">
        <div className="max-w-300 mx-auto pt-10 md:pt-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-6 md:mb-15">
            <div className="max-w-125">
              <p className="anseru-section-tag">Security And Compliance</p>
              <h2 className="anseru-section-title">
                Safely connect agents to
                <br className="hidden md:block" />
                company knowledge
              </h2>
            </div>
          </div>

          <div className="relative w-full flex flex-col items-center pb-16">
            {/* ── Desktop: orbital diagram (md and above) ──────────────── */}
            <div className="hidden md:flex justify-center w-full pt-10 pb-5">
              <div className="relative" style={{ width: '910px', height: '560px' }}>
                {/* Ambient blobs */}
                <div
                  className="absolute rounded-full"
                  style={{ top: 80, left: 180, width: 340, height: 340, background: '#eef2ff', filter: 'blur(70px)', opacity: 0.8, zIndex: 0 }}
                />
                <div
                  className="absolute rounded-full"
                  style={{ top: 80, left: 390, width: 340, height: 340, background: '#fff1f2', filter: 'blur(70px)', opacity: 0.8, zIndex: 0 }}
                />

                {/* Ring + nodes */}
                <div className="absolute" style={{ left: 205, top: 30, width: 500, height: 500 }}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
                    <circle cx="250" cy="250" r="215" fill="none" stroke="#e5e7eb" strokeWidth="2.5" strokeDasharray="6 6" />
                  </svg>

                  {/* Center shield + logo */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-45 h-50 z-10 flex items-center justify-center">
                    <img src={shieldImg} loading="lazy" alt="" width={180} height={200} className="absolute inset-0 w-full h-full object-contain" />
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
                      <svg viewBox="0 0 100 110" className="w-35 h-40 text-[#eee5e7]">
                        <path d="M50 0 L100 20 L100 60 C100 85 50 110 50 110 C50 110 0 85 0 60 L0 20 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="relative z-20 w-15 h-15 rounded-full shadow-lg flex items-center justify-center overflow-hidden bg-black">
                      <img src={anseruLogo} loading="lazy" alt="Anseru Logo" width={60} height={60} className="w-full h-full object-cover scale-60" />
                    </div>
                  </div>

                  {/* Orbital nodes */}
                  {SECURITY_NODES.map((node) => (
                    <div key={node.id} className="absolute z-20" style={node.desktopStyle}>
                      <div
                        className={`relative w-21.5 h-21.5 rounded-full overflow-hidden flex items-center justify-center p-5 ${node.iconExtraClass ?? ''}`}
                        style={{ background: node.gradient }}
                      >
                         <img src={node.icon} loading="lazy" alt="" width={48} height={48} />
                      </div>
                      <div className={node.labelClass}>
                        <h3 className="font-medium text-[#111827] mb-1.5 leading-tight" style={{ fontSize: '20px' }}>{node.title}</h3>
                        <p className="text-[14px] text-gray-600 leading-relaxed m-1">{node.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Mobile: vertical list (below md) ─────────────────────── */}
            <div className="flex md:hidden flex-col gap-6 w-full">
              {SECURITY_NODES.map((node) => (
                <div key={node.id} className="flex gap-4 jusify-center align-items-center py-4">
                  {/* Large gradient circle matching screenshot */}
                  <div
                    className="shrink-0 w-14.5 h-14.5 rounded-full flex items-center justify-center p-4 m-2"
                    style={{ background: node.gradient }}
                  >
                    <img src={node.icon} loading="lazy" alt="" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <div className="pt-1">
                    <h4
                      className="font-medium text-[#111827] leading-snug mb-1"
                      style={{ fontSize: 'clamp(15px, 4vw, 17px)' }}
                    >
                      {node.title}
                    </h4>
                    <p
                      className="text-gray-600 leading-relaxed"
                      style={{ fontSize: 'clamp(13px, 3.5vw, 14px)' }}
                    >
                      {node.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
