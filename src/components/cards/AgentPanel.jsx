import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';

const featureCellStyles = `
.feature-cell {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  height: 100%;
}

.feature-cell-title {
  line-height: 1.35;
  /* NO white-space: pre-line — titles wrap naturally and all share the same min-height */
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  align-self: start;
  /* Reserve exactly 2 lines so all four titles in a row sit at the same height */
  display: -webkit-box;
  -webkit-line-clamp: 2;
    height: calc(1.35em * 2);   /* always reserves 2 lines exactly */
  -webkit-box-orient: vertical;
  overflow: hidden;
  box-sizing: content-box;    
}

.feature-cell-desc {
  text-align: left;
  line-height: 1.55;
  hyphens: none;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  word-break: normal;
  overflow-wrap: normal;
  word-spacing: normal;
  letter-spacing: normal;
  overflow: hidden;
  align-self: start;
}

/* ── 1024–1199px ── */
@media (min-width: 1024px) and (max-width: 1199px) and (max-height: 700px) {
  .feature-cell-title { font-size: 12px; padding: 14px 8px 0 8px; height: calc(1.35em * 2 + 14px); }

  .feature-cell-desc  { font-size: 10px; padding: 6px 8px 0 8px; }
  .agent-hero-title   { font-size: 16px !important; }
  .agent-hero-tag     { font-size: 10px !important; padding: 3px 7px !important; }
  .agent-hero-icon    { width: 52px !important; }
}
@media (min-width: 1024px) and (max-width: 1199px) and (min-height: 700px) {
  .feature-cell-title { font-size: 14px; padding: 18px 10px 0 10px; min-height: calc(1.35em * 2 + 18px); }
  .feature-cell-desc  { font-size: 11px; padding: 6px 10px 0 10px; }
  .agent-hero-title   { font-size: 18px !important; }
  .agent-hero-tag     { font-size: 11px !important; padding: 4px 9px !important; }
  .agent-hero-icon    { width: 60px !important; }
}

/* ── 1200–1439px ── */
@media (min-width: 1200px) and (max-width: 1439px) and (max-height: 750px) {
  .feature-cell-title { font-size: 15px; padding: 18px 10px 0 10px; min-height: calc(1.35em * 2 + 18px); }
  .feature-cell-desc  { font-size: 12px; padding: 7px 10px 0 10px; }
  .agent-hero-title   { font-size: 19px !important; }
  .agent-hero-tag     { font-size: 11px !important; padding: 4px 10px !important; }
  .agent-hero-icon    { width: 70px !important; }
}
@media (min-width: 1200px) and (max-width: 1439px) and (min-height: 750px) {
 .feature-cell-title { font-size: 24px; padding: 30px 5px 0 10px; min-height: calc(1.35em * 2 + 30px); }
  .feature-cell-desc  { font-size: 19px; padding: 10px 14px 0 14px; }
  .agent-hero-title   { font-size: 26px !important; }
  .agent-hero-tag     { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon    { width: 100px !important; }

}

/* ── 1440–1919px (MacBook Air/Pro @1x and @2x) ── */
@media (min-width: 1440px) and (max-width: 1919px) and (max-height: 850px) {
 .feature-cell-title { font-size: 24px; padding: 50px 5px 0 10px; min-height: calc(1.35em * 2 + 30px); }
  .feature-cell-desc  { font-size: 20px; padding: 30px 14px 0 14px; }
  .agent-hero-title   { font-size: 26px !important; }
  .agent-hero-tag     { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon    { width: 100px !important; }
}
@media (min-width: 1440px) and (max-width: 1919px) and (min-height: 850px) {
  .feature-cell-title { font-size: 24px; padding: 60px 5px 0 10px; min-height: calc(1.35em * 2 + 30px); }
  .feature-cell-desc  { font-size: 20px; padding: 30px 14px 0 14px; }
  .agent-hero-title   { font-size: 26px !important; }
  .agent-hero-tag     { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon    { width: 100px !important; }
}

/* ── 1920–2559px (1080p / QHD) ── */
@media (min-width: 1920px) and (max-width: 2559px) and (max-height: 1000px) {
  .feature-cell-title { font-size: 20px; padding: 26px 14px 0 14px; min-height: calc(1.35em * 2 + 26px); }
  .feature-cell-desc  { font-size: 15px; padding: 9px 14px 0 14px; }
  .agent-hero-title   { font-size: 28px !important; }
  .agent-hero-tag     { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon    { width: 110px !important; }
}
@media (min-width: 1920px) and (max-width: 2559px) and (min-height: 1000px) {
  .feature-cell-title { font-size: 24px; padding: 52px 16px 0 16px; min-height: calc(1.35em * 2 + 32px); }
  .feature-cell-desc  { font-size: 22px; padding:50px 16px 0 16px; }
  .agent-hero-title   { font-size: 32px !important; }
  .agent-hero-tag     { font-size: 14px !important; padding: 7px 16px !important; }
  .agent-hero-icon    { width: 124px !important; }
}

/* ── 2560px+ (4K / ultra-wide) ── */
@media (min-width: 2560px) {
  .feature-cell-title { font-size: 28px; padding: 78px 20px 0 20px; min-height: calc(1.35em * 2 + 38px); }
  .feature-cell-desc  { font-size: 25px; padding: 32px 20px 0 20px; }
  .agent-hero-title   { font-size: 38px !important; }
  .agent-hero-tag     { font-size: 16px !important; padding: 8px 18px !important; }
  .agent-hero-icon    { width: 150px !important; }
}
`;

const mobileFeatureGridStyles = `
  .mobile-feature-grid {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    border: 1px solid #00000020;
    border-radius: 4px;
    overflow: hidden;
  }

  .mobile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    align-content: start;
    position: relative;
    overflow: hidden;
  }
  .mobile-row:first-child {
    border-bottom: 1px solid #00000020;
  }

  .mobile-row::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: #00000020;
    pointer-events: none;
  }

  .cell-title {
    font-size: 13px;
    line-height: 1.3;
    font-weight: 400;
    color: #111;
    overflow-wrap: break-word;
    hyphens: none;
    -webkit-hyphens: none;
    white-space: normal;
    grid-row: 1;
    padding: 10px 10px 0 10px;
    align-self: start;
    /* clamp to 3 lines max, overflow hidden */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* all titles same height = 2 lines reserved */
    min-height: calc(1.3em * 2);
  }
  .cell-desc {
    font-size: 10px;
    line-height: 1.4;
    color: #6b7280;
    text-align: left;
    word-break: normal;
    overflow-wrap: normal;
    hyphens: none;
    -webkit-hyphens: none;
    -ms-hyphens: none;
    word-spacing: normal;
    letter-spacing: normal;
    overflow: hidden;
    padding: 5px 10px 10px 10px;
    grid-row: 2;
    align-self: start;
  }

  @media (min-width: 290px) {
    .cell-title { font-size: 15px; padding-top: 5px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 11px; padding-top: 16px; }
  }
  @media (min-width: 360px) {
    .cell-title { font-size: 15px; padding-top: 10px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 12px; padding-top: 20px; }
  }
  @media (min-width: 390px) {
    .cell-title { font-size: 15px; padding-top: 5px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 12px; padding-top: 10px; }
  }
  @media (min-width: 410px) {
    .cell-title { font-size: 18px; padding-top: 4px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 13px; padding-top: 15px; }
  }
  @media (min-width: 420px) {
    .cell-title { font-size: 18px; padding-top: 4px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 13px; padding-top: 15px; }
  }
  @media (min-width: 600px) {
    .cell-title { font-size: 20px; padding: 20px 14px 0 14px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 18px; padding: 10px 14px 20px 14px; }
  }
  @media (min-width: 768px) {
    .cell-title { font-size: 16px; padding: 18px 14px 0 14px; min-height: calc(1.3em * 2); }
    .cell-desc  { font-size: 18px; padding: 10px 14px 18px 14px; }
  }
`;

function MobileFeatureGrid({ features }) {
  return (
    <>
      <style>{mobileFeatureGridStyles}</style>
      <div className="mobile-feature-grid">
        {/* Row 1 */}
        <div className="mobile-row">
          <h4 className="cell-title left">{features[0].title.replace(/\n/g, ' ')}</h4>
          <h4 className="cell-title right">{features[1].title.replace(/\n/g, ' ')}</h4>
          <p className="cell-desc left">{features[0].description}</p>
          <p className="cell-desc right">{features[1].description}</p>
        </div>
        {/* Row 2 */}
        <div className="mobile-row">
          <h4 className="cell-title left">{features[2].title.replace(/\n/g, ' ')}</h4>
          <h4 className="cell-title right">{features[3].title.replace(/\n/g, ' ')}</h4>
          <p className="cell-desc left">{features[2].description}</p>
          <p className="cell-desc right">{features[3].description}</p>
        </div>
      </div>
    </>
  );
}

export function AgentPanel({ agent, isDesktop = false }) {
  const { gradient, agentIcon, title, tags, features } = agent;

  if (isDesktop) {
    return (
      <div className="w-1/2 flex flex-col lg:flex-row shrink-0 items-stretch">
        <style>{featureCellStyles}</style>

        {/* ── Hero card ── */}
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
                className="agent-hero-icon"
                style={{ height: 'auto', opacity: 0.9 }}
              />
            </div>
            <div className="relative mt-auto">
              <h3
                className="agent-hero-title anseru-card-title text-white mb-4 leading-[1.3]"
                style={{ whiteSpace: 'pre-line' }}
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="agent-hero-tag text-white bg-white/20 rounded-lg border border-white/40 font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="p-3 relative border-t border-b border-r border-[#e5e7eb]" style={{ flex: 1 }}>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.1]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '150px 150px',
            }}
          />
          <div
            className="h-full relative z-10 bg-[#f4f4f5]"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              outline: '1px solid rgba(0,0,0,0.125)',
            }}
          >
            <div className="feature-cell border-r border-b border-[#00000020]">
              <h4 className="feature-cell-title anseru-card-title">{features[0].title.replace(/\n/g, ' ')}</h4>
              <p className="feature-cell-desc anseru-section-tag">{features[0].description}</p>
            </div>
            <div className="feature-cell border-b border-[#00000020]">
              <h4 className="feature-cell-title anseru-card-title">{features[1].title.replace(/\n/g, ' ')}</h4>
              <p className="feature-cell-desc anseru-section-tag">{features[1].description}</p>
            </div>
            <div className="feature-cell border-r border-[#00000020]">
              <h4 className="feature-cell-title anseru-card-title">{features[2].title.replace(/\n/g, ' ')}</h4>
              <p className="feature-cell-desc anseru-section-tag">{features[2].description}</p>
            </div>
            <div className="feature-cell">
              <h4 className="feature-cell-title anseru-card-title">{features[3].title.replace(/\n/g, ' ')}</h4>
              <p className="feature-cell-desc anseru-section-tag">{features[3].description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Mobile ──────────────────────────────────────────────────────────────
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
          <div className="relative flex justify-start w-full">
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
        <div className="bg-[#f4f4f5] h-full">
          <MobileFeatureGrid features={features} />
        </div>
      </div>
    </div>
  );
}