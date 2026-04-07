import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';
import { SectionBulletItem } from '../primitives/SectionBulletItem.jsx';

import groupImgSrc from '../../assets/Group 1437253216.png';

export function CarouselSlidePanel({ slide, isDesktop = false, isActive = false }) {
  const { step, cardGradientClass, cardImage, cardImageAlt, cardImageWidth, cardImageClass, description, bullets, height } = slide;

  if (isDesktop) {
    return (
      <div className="carousel-slide-panel flex-shrink-0 h-full" style={{ width: '100vw' }}>
        <div className="max-w-[1300px] mx-auto h-full px-8 xl:px-16">
          <div className="grid h-full py-5" style={{ gridTemplateColumns: '5fr 7fr', gap: '2rem' }}>
         {/* Text column */}
<div
  className="carousel-slide-text flex flex-col items-start min-h-0 pt-0"
  style={{
    transition: 'opacity 0.55s, transform 0.55s',
    opacity: isActive ? 1 : 0.2,
    transform: isActive ? 'translateY(0px)' : 'translateY(16px)',
  }}
>

  <h2 className="font-normal text-[#111111] text-[19px] md:text-[23px] leading-snug mb-4">
    {step}
  </h2>

  <div className="w-full space-y-5">
    <div className="space-y-3">
      <p className="anseru-section-description text-[14px] md:text-[15px] leading-relaxed max-w-[95%]">
        {description}
      </p>
    </div>
    <div className="space-y-3 pt-1">
      {bullets.map((bullet, i) => (
        <SectionBulletItem key={i}>{bullet}</SectionBulletItem>
      ))}
    </div>
  </div>
</div>

            {/* Card column */}
            <div
              className="carousel-slide-card min-h-0 flex"
              style={{
                transition: 'opacity 0.55s, transform 0.55s',
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1 : 0.96,
              }}
            >
              <div className={`text-white w-full flex flex-col justify-start relative overflow-hidden shadow-lg rounded-[10px] ${cardGradientClass} h-full`}>
                <img
                  src={groupImgSrc}
                  loading={slide.index === 0 ? 'eager' : 'lazy'}
                  alt=""
                  className="absolute top-0 right-0 w-[40%] h-[40%] object-contain pointer-events-none z-10"
                />
                <NoiseOverlay />
                <div className="relative z-20 p-6 md:p-8 space-y-2">
                  <h2 className="font-medium max-w-[360px] text-[17px] md:text-[21px] leading-snug">
                    Turn complex RFPs <br /> into clear, winning
                    <br /> responses
                  </h2>
                </div>
                <div className="absolute z-10 bottom-0 right-0 flex justify-end">
                  <img
                    src={cardImage}
                    loading={slide.index === 0 ? 'eager' : 'lazy'}
                    alt={cardImageAlt}
                    className={`${cardImageClass} `}
                    style={{ width: cardImageWidth, maxHeight: height }}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile slide — scrolls vertically so full content is always reachable
  return (
    <div className="shrink-0 min-h-full h-full flex flex-col overflow-hidden px-5 pb-5 box-border" style={{ width: '100vw' }}>
      {/* Step title */}
      <h2 className="font-normal text-[#111111] text-[15px] leading-snug mb-3">{step}</h2>

      {/* Gradient card — natural height, no clipping */}
      <div
        className={`text-white relative overflow-hidden shadow-lg rounded-[10px] ${cardGradientClass}`}
        style={{ minHeight: '30vh', maxHeight: '320px', height: '34vh' }}
      >
        <img
          src={groupImgSrc}
          alt=""
          className="absolute top-0 right-0 w-[40%] h-[40%] object-contain pointer-events-none z-10"
        />
        <NoiseOverlay />
        <div className="absolute top-0 left-0 z-20 p-5">
          <h2 className="font-medium text-[16px] leading-snug max-w-55">
            Turn complex RFPs into clear, winning responses
          </h2>
        </div>
        <div className="absolute z-10 bottom-0 right-0 flex justify-end">
          <img
            src={cardImage}
            loading={slide?.index === 0 ? 'eager' : 'lazy'}
            alt={cardImageAlt}
            className={cardImageClass}
            style={{ width: cardImageWidth }}
          />
        </div>
      </div>

      {/* Full description — flows naturally, no clipping */}
      <div className="pt-4 space-y-3 flex-1 overflow-hidden">
        <p className="text-[#6b7280] text-[13px] leading-relaxed">{description}</p>
        <div className="space-y-2 pt-1">
          {bullets.map((bullet, i) => (
            <SectionBulletItem key={i}>{bullet}</SectionBulletItem>
          ))}
        </div>
      </div>
    </div>
  );
}