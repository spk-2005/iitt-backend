import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';
const featureCellStyles = `
  .feature-cell {
    display: flex;
    flex-direction: column;
    
    overflow: hidden;
  }
  .feature-cell-title {
    font-size: 14px;
    line-height: 1.3;
    padding-top: 12px;
    hyphens: none;
    -webkit-hyphens: none;
    overflow-wrap: break-word;
    flex: 0 0 auto;
    min-height: min(3.9em, 8cqh);
  }
  .feature-cell-desc {
    font-size: 11px;
    line-height: 1.55;
    
    
    hyphens: none;
    -webkit-hyphens: none;
    overflow-wrap: break-word;  
    flex: 0 0 auto;
    overflow: hidden;
  }

  @media (min-width: 1024px) and (max-height: 700px) {
    .feature-cell-title { font-size: 13px; padding-top: 22px; }
    .feature-cell-desc  { font-size: 10px; padding-bottom: 15px; }
  }

  @media (min-width: 1024px) and (min-height: 700px) {
    .feature-cell-title { font-size: 16px; padding-top: 24px; }
    .feature-cell-desc  { font-size: 11px; padding-bottom: 15px; }
  }

  @media (min-width: 1200px) and (max-height: 750px) {
    .feature-cell-title { font-size: 16px; padding-top: 24px; }
    .feature-cell-desc  { font-size: 13px; padding-bottom: 20x; }
  }

  @media (min-width: 1200px) and (min-height: 750px) {
    .feature-cell-title { font-size: 20px; padding-top: 24px; }
    .feature-cell-desc  { font-size: 17px; padding-bottom: 20px; }
  }

  @media (min-width: 1440px) and (max-height: 850px) {
    .feature-cell-title { font-size: 22px; padding-top: 28px; }
    .feature-cell-desc  { font-size: 16px; padding-bottom: 20px; }
  }

  @media (min-width: 1440px) and (min-height: 850px) {
    .feature-cell-title { font-size: 25px; padding-top: 28px; }
    .feature-cell-desc  { font-size: 22px; padding-bottom: 20px; }
  }

  @media (min-width: 1920px) and (max-height: 1000px) {
    .feature-cell-title { font-size: 20px; padding-top: 30px; }
    .feature-cell-desc  { font-size: 15px; padding-bottom: 20px; }
  }

  @media (min-width: 1920px) and (min-height: 1000px) {
    .feature-cell-title { font-size: 26px; padding-top: 30px; }
    .feature-cell-desc  { font-size: 18px; padding-bottom: 25px; }
  }
`;



function DesktopFeatureCell({ feature, borderClasses }) {
  return (
    <>
      <style>{featureCellStyles}</style>
      <div
        className={`feature-cell border-[#e5e7eb] ${borderClasses}`}
        style={{ padding: 'clamp(10px, 1.5cqw, 22px)' }}
      >
        <h4 className="feature-cell-title anseru-card-title">
          {feature.title}
        </h4>
        <p className="feature-cell-desc anseru-section-tag">
          {feature.description}
        </p>
      </div>
    </>
  );

}




const mobileFeatureCellStyles = `
  .mobile-feature-cell {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
  }
  .mobile-feature-title {
    font-size: 13px;
    line-height: 1.25;
    font-weight: 400;
    color: #111;
    min-height: 2.6em;
    display: flex;
    align-items: flex-start;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: none;
    -webkit-hyphens: none;
    flex: 0 0 auto;
  }
  .mobile-feature-desc {
    font-size: 10px;
    line-height: 1.4;
    color: #6b7280;
    padding-top: 6px;
    overflow-wrap: break-word;
    word-break: break-word;
    flex: 1 1 auto;
    overflow: hidden;
  }

  
  @media (min-width: 290px) {
    .mobile-feature-cell  { padding: 8px; }
    .mobile-feature-title { font-size: 17px; min-height: 2.6em;padding-top:15px; }
    .mobile-feature-desc  { font-size: 10px; padding-top: 10px; }
  }

  /* iPhone Pro Max / large phones (430px+) */
  @media (min-width: 390px) {
    .mobile-feature-cell  { padding: 12px; }
    .mobile-feature-title { font-size: 20px; min-height: 2.6em;padding-top:25px; }
    .mobile-feature-desc  { font-size: 13px; padding-top: 8px; }
  }

  /* Small tablets (600px+) */
  @media (min-width: 600px) {
    .mobile-feature-cell  { padding: 12px; }
    .mobile-feature-title { font-size: 20px; min-height: 2.6em;padding-top:25px; }
    .mobile-feature-desc  { font-size: 13px; padding-top: 8px; }
  }

  /* Large tablets (768px+) */
  @media (min-width: 768px) {
    .mobile-feature-cell  { padding: 16px; }
    .mobile-feature-title { font-size: 16px; }
    .mobile-feature-desc  { font-size: 13px; padding-top: 12px; }
  }
`;



function MobileFeatureCell({ feature }) {
  return (
    <>
      <style>{mobileFeatureCellStyles}</style>
      <div className="mobile-feature-cell">
        <h4 className="mobile-feature-title">
          {feature.title}
        </h4>
        <p className="mobile-feature-desc">
          {feature.description}
        </p>
      </div>
    </>
  );
}

function MobileFeatureRow({ left, right, isLast }) {
  return (
    <div className={`flex flex-row flex-1${isLast ? '' : ' border-b border-[#e5e7eb]'}`}>
      <div className="flex-1 border-r border-[#e5e7eb] flex flex-col">
        <MobileFeatureCell feature={left} />
      </div>
      <div className="flex-1 flex flex-col">
        <MobileFeatureCell feature={right} />
      </div>
    </div>
  );
}

export function AgentPanel({ agent, isDesktop = false }) {
  const { gradient, agentIcon, title, tags, features } = agent;

  if (isDesktop) {
    return (
      <div className="w-1/2 flex flex-col lg:flex-row shrink-0 items-stretch">
        {/* Hero card */}
        <div className="lg:w-[48%] p-3.5 bg-white border lg:border-b-0 lg:border-r border-[#e5e7eb] shrink-0">
          <div
            className="relative flex flex-col justify-between p-8 h-full overflow-hidden"
            style={{ background: gradient }}
          >
            <NoiseOverlay />
            <div className="relative">
              <img
                src={agentIcon}
                loading="lazy"
                alt=""
                style={{ width: 'clamp(80px, 8vw, 140px)', height: 'auto', opacity: 0.9 }}
              />
            </div>
            <div className="relative mt-auto">
              <h3
                className="anseru-card-title text-white mb-4 leading-[1.3]"
                style={{
                  whiteSpace: 'pre-line',
                  fontSize: 'clamp(20px, 2vw, 28px)',
                }}
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                    className="text-white px-3 py-1.5 bg-white/20 rounded-lg border border-white/40 font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

     {/* Feature grid */}
<div className="p-3 relative overflow-hidden border border-l-black/60" style={{ flex: 1 }}>
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.1]"
    style={{
      backgroundImage:
        'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
      backgroundSize: '150px 150px',
    }}
  />
  <style>{featureCellStyles}</style>
  <div
  className="h-full relative z-10 bg-[#f4f4f5]"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr auto 1fr auto',
  }}
>
    {/* Top titles — same row so same height */}
    <div className="feature-cell  border-r border-[#e5e7eb]" style={{ padding: 'clamp(10px, 1.5cqw, 22px) clamp(10px, 1.5cqw, 22px) 0' }}>
      <h4 className="feature-cell-title anseru-card-title">{features[0].title}</h4>
    </div>
    <div className="feature-cell " style={{ padding: 'clamp(10px, 1.5cqw, 22px) clamp(10px, 1.5cqw, 22px) 0' }}>
      <h4 className="feature-cell-title anseru-card-title">{features[1].title}</h4>
    </div>
{/* Top descs */}
<div className="feature-cell border-b border-r border-[#e5e7eb]" style={{ padding: '8px clamp(10px, 1.5cqw, 22px) 0 clamp(10px, 1.5cqw, 22px)' }}>
  <p className="feature-cell-desc anseru-section-tag">{features[0].description}</p>
</div>
<div className="feature-cell border-b border-[#e5e7eb]" style={{ padding: '8px clamp(10px, 1.5cqw, 22px) 0 clamp(10px, 1.5cqw, 22px)' }}>
  <p className="feature-cell-desc anseru-section-tag">{features[1].description}</p>
</div>

    {/* Bottom titles — same row */}
    <div className="feature-cell border-r border-[#e5e7eb]" style={{ padding: 'clamp(10px, 1.5cqw, 22px) clamp(10px, 1.5cqw, 22px) 0' }}>
      <h4 className="feature-cell-title anseru-card-title">{features[2].title}</h4>
    </div>
    <div className="feature-cell" style={{ padding: 'clamp(10px, 1.5cqw, 22px) clamp(10px, 1.5cqw, 22px) 0' }}>
      <h4 className="feature-cell-title anseru-card-title">{features[3].title}</h4>
    </div>
{/* Bottom descs */}
<div className="feature-cell border-r border-[#e5e7eb]" style={{ padding: '8px clamp(10px, 1.5cqw, 22px) 0 clamp(10px, 1.5cqw, 22px)' }}>
  <p className="feature-cell-desc anseru-section-tag">{features[2].description}</p>
</div>
<div className="feature-cell" style={{ padding: '8px clamp(10px, 1.5cqw, 22px) 0 clamp(10px, 1.5cqw, 22px)' }}>
  <p className="feature-cell-desc anseru-section-tag">{features[3].description}</p>
</div>
  </div>
</div>
      </div>
    );
  }

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden flex flex-col h-full">
      <div className="bg-white border-b border-[#e5e7eb] shrink-0">
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{
            background: gradient,
            padding: 'clamp(24px, 6vw, 42px)',
            minHeight: 'clamp(180px, 33vh, 260px)',
            borderRadius: '8px',
          }}
        >
          <NoiseOverlay />
          <div className="relative flex justify-center w-full">
            <img
              src={agentIcon}
              loading="lazy"
              alt=""
              style={{ width: 'clamp(40px, 15vw, 92px)', height: 'auto', opacity: 0.9 }}
            />
          </div>
          <div className="relative mt-auto">
            <h3
              className="font-normal text-white leading-[1.1]"
              style={{
                fontSize: 'clamp(16px, 6.7vw, 32px)',
                marginBottom: 'clamp(8px, 2.5vw, 16px)',
                whiteSpace: 'pre-line',
              }}
            >
              {title}
            </h3>
            <div className="flex flex-wrap" style={{ gap: 'clamp(4px, 1.5vw, 8px)' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-white bg-white/20 rounded-lg border border-white/40 font-normal"
                  style={{
                    fontSize: 'clamp(9px, 2.74vw, 13px)',
                    padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 12px)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 relative overflow-hidden flex-1">
        <div className="bg-[#f4f4f5] h-full flex flex-col">
          <MobileFeatureRow left={features[0]} right={features[1]} isLast={false} />
          <MobileFeatureRow left={features[2]} right={features[3]} isLast={true} />
        </div>
      </div>
    </div>
  );
}