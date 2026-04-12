import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';
import { SectionBulletItem } from '../primitives/SectionBulletItem.jsx';

import groupImgSrc from '../../assets/Group 1437253216.png';

export function CarouselSlidePanel({ slide, isDesktop = false, isActive = false }) {
  const { step, cardGradientClass, cardImage, cardImageAlt, cardImageWidth, cardImageClass, description, bullets } = slide;

  if (isDesktop) {
    return (
      <div className="carousel-slide-panel flex-shrink-0 h-full" style={{ width: '100vw' }}>
        <div className="carousel-slide-inner mx-auto h-full" style={{ padding: '0 clamp(24px, 4vw, 80px)' }}>
          <div
            className="grid h-full"
            style={{
              gridTemplateColumns: '5fr 7fr',
              gap: 'clamp(1rem, 2vw, 2.5rem)',
              padding: 'clamp(12px, 2vh, 28px) 0',
            }}
          >
            {/* Text column */}
            <div
              className="carousel-slide-text flex flex-col items-start min-h-0"
              style={{
                transition: 'opacity 0.55s, transform 0.55s',
                opacity: isActive ? 1 : 0.2,
                transform: isActive ? 'translateY(0px)' : 'translateY(16px)',
              }}
            >
              <h2
                className="font-normal text-[#111111] leading-snug mb-4"
                style={{ fontSize: 'clamp(15px, 1.4vw, 26px)' }}
              >
                {step}
              </h2>
              <div className="w-full space-y-5">
                <p
                  className="anseru-section-description leading-relaxed max-w-[95%]"
                  style={{ fontSize: 'clamp(12px, 1vw, 17px)' }}
                >
                  {description}
                </p>
                <div className="space-y-3 pt-1">
                  {bullets.map((bullet, i) => (
                    <SectionBulletItem key={i} style={{ fontSize: 'clamp(11px, 0.9vw, 15px)' }}>
                      {bullet}
                    </SectionBulletItem>
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
              <div
                className={`text-white w-full flex flex-col justify-start relative overflow-hidden shadow-lg rounded-[10px] ${cardGradientClass} h-full`}
              >
                <img
                  src={groupImgSrc}
                  loading={slide.index === 0 ? 'eager' : 'lazy'}
                  alt=""
                  className="absolute top-0 right-0 w-[40%] h-[40%] object-contain pointer-events-none z-10"
                />
                <NoiseOverlay />

                {/* Title block — fixed height anchor, ~90px tall */}
                <div
                  className="relative z-20 shrink-0"
                  style={{ padding: 'clamp(16px, 2.5vw, 36px)' }}
                >
                  <h2
                    className="font-medium max-w-[360px] leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.3vw, 22px)' }}
                  >
                    Turn complex RFPs <br /> into clear, winning
                    <br /> responses
                  </h2>
                </div>

                {/*
                  Image wrapper: absolutely positioned, starts right below
                  the title block (top: 90px) and fills to the bottom edge.
                  The image itself gets height:100% from CSS (desktop rule)
                  so it fills this wrapper completely.
                  No inline maxHeight — CSS handles everything.
                */}
                <div
  className="absolute z-10 bottom-0 right-0 flex items-end justify-end overflow-hidden"
  style={{
    top: 'clamp(70px, 10vw, 110px)',
    width: '100%',
  }}
>
                  <img
                    src={cardImage}
                    loading={slide.index === 0 ? 'eager' : 'lazy'}
                    alt={cardImageAlt}
                    className={cardImageClass}
                    style={{ width: cardImageWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            @media (min-width: 1024px) and (max-width: 1199px) {
              .carousel-slide-inner { max-width: 960px; }
            }
            @media (min-width: 1200px) and (max-width: 1439px) {
              .carousel-slide-inner { max-width: 1100px; }
            }
            @media (min-width: 1440px) and (max-width: 1919px) {
              .carousel-slide-inner { max-width: 1400px; }
            }
            @media (min-width: 1920px) and (max-width: 2559px) {
              .carousel-slide-inner { max-width: 1800px; }
            }
            @media (min-width: 2560px) {
              .carousel-slide-inner { max-width: 2200px; }
            }
          `}
        </style>
      </div>
    );
  }

  // ── Mobile ──────────────────────────────────────────────────────────────
  return (
    <div className="shrink-0 min-h-full h-full flex flex-col overflow-hidden px-5 pb-5 box-border" style={{ width: '100vw' }}>
      <h2 className="font-normal text-[#111111] text-[15px] leading-snug mb-3">{step}</h2>

      <div
        className={`text-white relative overflow-hidden shadow-lg rounded-[10px] ${cardGradientClass}`}
        style={{ height: 'clamp(200px, 30vh, 320px)' }}
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
            loading={slide.index === 0 ? 'eager' : 'lazy'}
            alt={cardImageAlt}
            className={cardImageClass}
            style={{
              width: cardImageWidth,
              maxHeight: 'clamp(220px, 72%, 520px)',
            }}
          />
        </div>
      </div>

      <div className="pt-4 space-y-3 flex-1 overflow-y-auto">
        <p className="text-[#6b7280] text-[15px] leading-relaxed">{description}</p>
        <div className="space-y-2 pt-1">
          {bullets.map((bullet, i) => (
            <SectionBulletItem key={i}>{bullet}</SectionBulletItem>
          ))}
        </div>
      </div>
    </div>
  );
}