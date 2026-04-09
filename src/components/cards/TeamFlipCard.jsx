import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';

// Inline SVG variants for the front face of each card
function SalesSvg() {
  return (
    <svg viewBox="0 22 220 246" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <path d="M23 36H197" stroke="black" strokeWidth="2" />
      <path d="M52 94H168" stroke="black" strokeWidth="2" />
      <path d="M81 152H139" stroke="black" strokeWidth="2" />
      <path d="M110 227.4C119.609 227.4 127.4 219.609 127.4 210C127.4 200.39 119.609 192.6 110 192.6C100.39 192.6 92.5996 200.39 92.5996 210C92.5996 219.609 100.39 227.4 110 227.4Z" stroke="black" strokeWidth="2" />
      <path d="M110 36V192.6" stroke="#888888" strokeDasharray="4 4" />
    </svg>  
  );
}

function SecuritySvg() {
  return (
    <svg viewBox="0 20 285 285" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block scale-125">
      <path d="M142.5 178.125C162.175 178.125 178.125 162.175 178.125 142.5C178.125 122.825 162.175 106.875 142.5 106.875C122.825 106.875 106.875 122.825 106.875 142.5C106.875 162.175 122.825 178.125 142.5 178.125Z" stroke="black" strokeWidth="2.85" />
      <path d="M142.5 206.625C177.915 206.625 206.625 177.915 206.625 142.5C206.625 107.085 177.915 78.375 142.5 78.375C107.085 78.375 78.375 107.085 78.375 142.5C78.375 177.915 107.085 206.625 142.5 206.625Z" stroke="#444444" strokeWidth="2.85" />
      <path d="M142.5 235.125C193.655 235.125 235.125 193.655 235.125 142.5C235.125 91.3446 193.655 49.875 142.5 49.875C91.3446 49.875 49.875 91.3446 49.875 142.5C49.875 193.655 91.3446 235.125 142.5 235.125Z" stroke="#666666" strokeWidth="2.85" />
      <path d="M142.5 263.625C209.395 263.625 263.625 209.395 263.625 142.5C263.625 75.6045 209.395 21.375 142.5 21.375C75.6045 21.375 21.375 75.6045 21.375 142.5C21.375 209.395 75.6045 263.625 142.5 263.625Z" stroke="#888888" strokeWidth="1.425" strokeDasharray="5.7 5.7" />
      <path d="M142.5 21.375V263.625" stroke="#999999" strokeWidth="1.425" strokeDasharray="5.7 5.7" />
    </svg>
  );
}

function ComplianceSvg() {
  return (
    <svg viewBox="0 22 333 333" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" style={{ scale: '1.55' }}>
      <path d="M266.4 66.5996H66.5996V266.4H266.4V66.5996Z" stroke="black" strokeWidth="2" />
      <path d="M133.199 66.5996V266.4" stroke="#666666" strokeWidth="1.665" />
      <path d="M199.801 66.5996V266.4" stroke="#666666" strokeWidth="1.665" />
      <path d="M66.5996 133.2H266.4" stroke="#666666" strokeWidth="1.665" />
      <path d="M66.5996 199.8H266.4" stroke="#666666" strokeWidth="1.665" />
      <path d="M66.5996 66.5996L266.4 266.4" stroke="#999999" strokeWidth="1.665" strokeDasharray="6.66 6.66" />
    </svg>
  );
}

const FRONT_SVGS = { sales: SalesSvg, security: SecuritySvg, compliance: ComplianceSvg };
const ICON_WIDTHS = { sales: 'w-[75%] md:w-[85%]', security: 'w-[65%] md:w-[85%]', compliance: 'w-[65%] md:w-[85%]' };

const GRID_PATTERN = {
  backgroundImage: 'repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)',
  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
};

const GRID_PATTERN_BOTTOM = {
  backgroundImage: 'repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)',
  maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
};

export function TeamFlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);
  const isPointer = useMediaQuery('(hover: hover)');
  const FrontSvg = FRONT_SVGS[card.frontSvg];

  return (
    <div
      className="team-card relative h-[450px] md:h-135 max-w-[340px] md:max-w-none mx-auto w-full cursor-default"
      style={{ perspective: '1000px' }}
      onClick={() => !isPointer && setFlipped((f) => !f)}
    >
      <div
        className={`team-card-inner relative w-full h-full ${!isPointer && flipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
        }}
      >
        {/* Front */}
        <div
          className="team-card-face team-card-front absolute inset-0 bg-[#F8F9FB] overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
            WebkitTransform: 'translateZ(1px)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-50" style={GRID_PATTERN} />
          <div className="absolute inset-x-0 bottom-0 h-[25%] pointer-events-none opacity-30" style={GRID_PATTERN_BOTTOM} />
          <div className={`absolute bottom-0 right-0 w-6 h-[55%] bg-gradient-to-b ${card.accentGradient}`} />
          <div className="relative p-5 md:p-10 h-full w-full flex flex-col z-10">
            <h3 className="font-normal text-[#111827] mb-2 md:mb-3 text-[18px] md:text-[24px] leading-tight whitespace-pre-line">
              {card.title}
            </h3>
            <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-relaxed pr-4">{card.description}</p>
            <div className="flex flex-col md:flex-row justify-center items-center mt-auto mb-4 md:mb-6 pt-4 md:pt-6">
              <div className={`${ICON_WIDTHS[card.frontSvg]} md:h-50 opacity-90 flex items-center justify-center`}>
                <FrontSvg />
              </div>
              <p className="absolute bottom-1.5 text-[#9CA3AF] text-xs md:hidden">Tap to flip</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="team-card-face team-card-back absolute inset-0 bg-[#F8F9FB] overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg) translateZ(1px)',
            WebkitTransform: 'rotateY(180deg) translateZ(1px)',
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-100"
            style={GRID_PATTERN}
          />
          <div className={`absolute bottom-0 right-0 w-6 h-[55%] bg-gradient-to-b ${card.accentGradient}`} />
          <div className="relative p-6 md:p-10 h-full w-full flex flex-col z-10 md:mt-10">
            <h3 className="font-normal text-[#111827] mb-4 md:mb-10 text-[18px] md:text-[24px] leading-tight whitespace-pre-line">
              {card.title}
            </h3>
            <div className="flex flex-col gap-4 md:gap-6 pr-4">
              {card.benefits.map((benefit, i) => {
                const isHighlight = card.benefitHighlight && card.benefitHighlight.index === i;
                const text = benefit;
                if (isHighlight) {
                  const parts = text.split(card.benefitHighlight.text);
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <img src={card.checkIcon} loading="lazy" alt="" className="w-6 h-6 object-contain mt-0.5 shrink-0" />
                      <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-relaxed">
                        {parts[0]}
                        <span className="text-[#2C48DB] font-semibold">{card.benefitHighlight.text}</span>
                        {parts[1]}
                      </p>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-start gap-4">
                    <img src={card.checkIcon} loading="lazy" alt="" className="w-6 h-6 object-contain mt-0.5 shrink-0" />
                    <p className="anseru-section-description text-[13px] md:text-[15px] leading-normal">{benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}