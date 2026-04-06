import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';
import { SectionBulletItem } from '../primitives/SectionBulletItem.jsx';

import groupImgSrc from '../../assets/Group 1437253216.png';

export function CarouselSlidePanel({ slide, isDesktop = false, isActive = false }) {
  const { step, cardGradientClass,cardImage, cardImageAlt, cardImageWidth, cardImageClass, description, bullets,height } = slide;

  if (isDesktop) {
    return (
      <div className="carousel-slide-panel flex-shrink-0 h-full" style={{ width: '100vw' }}>
        <div className="max-w-[1300px] mx-auto h-full px-8 xl:px-16">
          <div className="grid h-full py-5" style={{ gridTemplateColumns: '5fr 7fr', gap: '2rem' }}>
            {/* Text column */}
            <div
              className="carousel-slide-text flex items-center min-h-0"
              style={{
                transition: 'opacity 0.55s, transform 0.55s',
                opacity: isActive ? 1 : 0.2,
                transform: isActive ? 'translateY(0px)' : 'translateY(16px)',
              }}
            >
              <div className="w-full space-y-5">
                <div className="space-y-3">
                  <h2 className="font-normal text-[#111111] text-[19px] md:text-[23px] leading-snug">{step}</h2>
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

  // Mobile slide — tightened to fit within sticky viewport without inner scrolling
  return (
    <div className="shrink-0 h-full overflow-hidden px-5 pb-2" style={{ width: '100vw' }}>
      {/* Step title */}
      <h2 className="font-normal text-[#111111] text-[13px] sm:text-[15px] leading-snug mb-2">{step}</h2>

      {/* Gradient card — tightened height to fit mobile screen without clipping text below */}
      <div
        className={`text-white relative overflow-hidden shadow-lg rounded-[10px] ${cardGradientClass}`}
        style={{ height: '22vh', minHeight: '150px' }}
      >
        <img
          src={groupImgSrc}
          alt=""
          className="absolute top-0 right-0 w-[40%] h-[40%] object-contain pointer-events-none z-10"
        />
        <NoiseOverlay />
        <div className="absolute top-0 left-0 z-20 p-4">
          <h2 className="font-medium text-[14px] sm:text-[16px] leading-snug max-w-50">
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

      {/* Full description — tightened for mobile viewports */}
      <div className="pt-3 space-y-2">
        <p className="text-[#6b7280] text-[12px] leading-relaxed">{description}</p>
        <div className="space-y-1.5 pt-0.5">
          {bullets.map((bullet, i) => (
            <SectionBulletItem key={i}>{bullet}</SectionBulletItem>
          ))}
        </div>
      </div>
    </div>
  );
}