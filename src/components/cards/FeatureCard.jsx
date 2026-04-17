export function FeatureCard({ feature, isActive, onActivate, onDeactivate, isMobile }) {
  const { title, textPosition, shortDesc, longDesc, iconSrc, bullets } = feature;

  const isTop = textPosition === 'top';

  const iconBlock = (
    <div className="h-20 md:h-[104px] flex w-full">
      {isTop && (
        <div
          className="w-20 md:w-[104px] flex items-center justify-center"
          style={{ backgroundColor: '#1c36e4' }}
        >
          <img src={iconSrc} loading="lazy" width={64} height={64} className="w-10 md:w-16" alt="" />
        </div>
      )}
      <div
        className="flex-grow"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #f3f4f6 0px, #f3f4f6 1px, transparent 1px, transparent 12px)',
        }}
      />
      {!isTop && (
        <div
          className="w-20 md:w-[104px] flex items-center justify-center"
          style={{ backgroundColor: '#1c36e4' }}
        >
          <img src={iconSrc} loading="lazy" width={64} height={64} className="w-10 md:w-16" alt="" />
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div
      className={`feature-text p-6 md:p-8 flex flex-col ${isTop ? 'justify-end' : ''} flex-grow transition-all duration-500 ${isActive ? (isTop ? 'pl-12 md:pl-16' : 'pl-12 md:pl-16') : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3
          className="text-gray-900 whitespace-pre-line leading-tight font-normal"
          style={{ fontSize: 'clamp(22px, 6vw, 28px)', letterSpacing: '-0.02em' }}
        >{title}</h3>
        <button
          className="lg:hidden shrink-0 mt-0.5 text-black hover:text-gray-700 transition-all duration-300 w-11 h-11 flex items-center justify-center -mr-2 -mt-2"
          style={{ transform: isActive && isMobile ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-label="Expand feature details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <p className={`text-gray-700 leading-relaxed ${isActive ? 'hidden' : ''}`} style={{ fontSize: 'clamp(13px, 3.5vw, 15px)' }}>
        {shortDesc}
      </p>
      <p className={`text-gray-700 leading-relaxed ${isActive ? '' : 'hidden'}`} style={{ fontSize: 'clamp(13px, 3.5vw, 15px)' }}>
        {longDesc}
      </p>

      <div
        className="grid overflow-hidden transition-all duration-500"
        style={{
          gridTemplateRows: isActive ? '1fr' : '0fr',
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? '1.5rem' : '0',
        }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-4 pb-4 pt-6">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A1A1AA"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-[2px]"
                >
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
                <span className="text-sm md:text-[15px] text-gray-700">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="feature-card relative bg-[#f8f9fa] flex flex-col transition-all duration-500 overflow-hidden w-full cursor-pointer lg:h-[480px]"
      style={{ flex: isActive ? 2 : 1 }}
      onMouseEnter={!isMobile ? onActivate : undefined}
      onMouseLeave={!isMobile ? onDeactivate : undefined}
      onClick={isMobile ? onActivate : undefined}
    >
      <div className="flex flex-col flex-grow h-full">
        {isTop ? (
          <>
            {iconBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            <div className="mt-auto">{iconBlock}</div>
          </>
        )}
      </div>
    </div>
  );
}
