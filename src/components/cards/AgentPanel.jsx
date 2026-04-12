    import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';

const featureCellStyles = `
.feature-cell {
  flex: 1;
  border-radius: 8px;
  background: #fafafa;
  position: relative;
  overflow: visible;
  border: 1px solid rgba(255,255,255,0.9);
  outline: 1px solid rgba(0,0,0,0.07);
  display: flex;
  align-items: flex-start;   /* ← back to flex-start */
  padding: 10px 12px 10px 10px;   /* ← uniform padding on cell itself */
  gap: 10px;

  box-shadow:
    0 1px 0px rgba(255,255,255,0.95) inset,
    0 -1px 0px rgba(0,0,0,0.04) inset,
    0 2px 4px rgba(0,0,0,0.04),
    0 4px 12px rgba(0,0,0,0.05);

  transform: translateY(0px) scale(1);
  transition:
    box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    transform  0.32s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s ease;

  will-change: transform, box-shadow;
}
.feature-cell::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%);
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.feature-cell:hover {
  background: #ffffff;
  transform: translateY(-3px) scale(1.012);
  box-shadow:
    0 1px 0px rgba(255,255,255,1) inset,
    0 4px 8px rgba(0,0,0,0.06),
    0 8px 24px rgba(0,0,0,0.09),
    0 16px 40px rgba(0,0,0,0.05);
}

.feature-cell:active {
  transform: translateY(-1px) scale(1.005);
  transition-duration: 0.1s;
}

.feature-cell-badge {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: rgba(0,0,0,0.055);
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 1px 2px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.7) inset;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: #444 !important;
  position: relative;
  z-index: 2;
  /* aligns badge center to title's first-line cap height */
  margin-top: 0.1em;
  align-self: flex-start;
}.feature-cell-badge-inner {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: rgba(0,0,0,0.055);
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 1px 2px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.7) inset;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: #444 !important;
}

.feature-cell-body {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.feature-cell-title-text {
  display: block;
  line-height: 1.35;
  color: #111 !important;
  overflow-wrap: break-word;
  word-break: break-word;
}

.feature-cell-desc {
  display: block;
  line-height: 1.55;
  color: #6b7280 !important;
  hyphens: none;
  -webkit-hyphens: none;
  word-break: normal;
  overflow-wrap: normal;
  margin: 0;
}

/* ── 1024–1199px, short ── */
@media (min-width: 1024px) and (max-width: 1199px) and (max-height: 700px) {
  .feature-cell            { padding: 8px 10px 8px 8px; gap: 8px; }
  .feature-cell-badge      { width: 16px; height: 16px; font-size: 9px; border-radius: 4px; }
  .feature-cell-title-text { font-size: 12px; }
  .feature-cell-desc       { font-size: 10px; }
  .agent-hero-title        { font-size: 16px !important; }
  .agent-hero-tag          { font-size: 10px !important; padding: 3px 7px !important; }
  .agent-hero-icon         { width: 52px !important; }
}
@media (min-width: 1024px) and (max-width: 1199px) and (min-height: 700px) {
  .feature-cell            { padding: 39px 10px 9px 10px; gap: 9px; }
  .feature-cell-badge      { width: 18px; height: 18px; font-size: 10px; border-radius: 4px; }
  .feature-cell-title-text { font-size: 20px; }
  .feature-cell-desc       { font-size: 16px; }
  .agent-hero-title        { font-size: 18px !important; }
  .agent-hero-tag          { font-size: 11px !important; padding: 4px 9px !important; }
  .agent-hero-icon         { width: 60px !important; }
}
@media (min-width: 1200px) and (max-width: 1439px) and (max-height: 750px) {
  .feature-cell            { padding: 9px 12px 9px 10px; gap: 9px; }
  .feature-cell-badge      { width: 18px; height: 18px; font-size: 10px; border-radius: 4px; }
  .feature-cell-title-text { font-size: 15px; }
  .feature-cell-desc       { font-size: 12px; }
  .agent-hero-title        { font-size: 19px !important; }
  .agent-hero-tag          { font-size: 11px !important; padding: 4px 10px !important; }
  .agent-hero-icon         { width: 70px !important; }
}
@media (min-width: 1200px) and (max-width: 1439px) and (min-height: 750px) {
  .feature-cell            { padding: 32px 14px 12px 12px; gap: 10px; }
  .feature-cell-badge      { width: 24px; height: 24px; font-size: 12px; border-radius: 5px; }
  .feature-cell-title-text { font-size: 20px; }
  .feature-cell-desc       { font-size: 16px; }
  .agent-hero-title        { font-size: 26px !important; }
  .agent-hero-tag          { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon         { width: 100px !important; }
}
@media (min-width: 1440px) and (max-width: 1919px) and (max-height: 800px) {
  .feature-cell            { padding: 32px 14px 12px 12px; gap: 10px; }
  .feature-cell-badge      { width: 24px; height: 24px; font-size: 12px; border-radius: 5px; }
  .feature-cell-title-text { font-size: 20px; }
  .feature-cell-desc       { font-size: 16px; }
  .agent-hero-title        { font-size: 26px !important; }
  .agent-hero-tag          { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon         { width: 100px !important; }
}
@media (min-width: 1440px) and (max-width: 1919px) and (min-height: 800px) {
  .feature-cell            { padding: 40px 16px 14px 14px; gap: 12px; }
  .feature-cell-badge      { width: 26px; height: 26px; font-size: 13px; border-radius: 6px; }
  .feature-cell-title-text { font-size: 22px; }
  .feature-cell-desc       { font-size: 17px; }
  .agent-hero-title        { font-size: 26px !important; }
  .agent-hero-tag          { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon         { width: 100px !important; }
}
@media (min-width: 1920px) and (max-width: 2559px) and (max-height: 1000px) {
  .feature-cell            { padding: 14px 18px 14px 14px; gap: 12px; }
  .feature-cell-badge      { width: 26px; height: 26px; font-size: 13px; border-radius: 6px; }
  .feature-cell-title-text { font-size: 20px; }
  .feature-cell-desc       { font-size: 15px; }
  .agent-hero-title        { font-size: 28px !important; }
  .agent-hero-tag          { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon         { width: 110px !important; }
}
@media (min-width: 1920px) and (max-width: 2559px) and (min-height: 1000px) {
  .feature-cell            { padding: 16px 20px 16px 16px; gap: 14px; }
  .feature-cell-badge      { width: 30px; height: 30px; font-size: 14px; border-radius: 6px; }
  .feature-cell-title-text { font-size: 24px; }
  .feature-cell-desc       { font-size: 18px; }
  .agent-hero-title        { font-size: 32px !important; }
  .agent-hero-tag          { font-size: 14px !important; padding: 7px 16px !important; }
  .agent-hero-icon         { width: 124px !important; }
}
@media (min-width: 2560px) {
  .feature-cell            { padding: 20px 24px 20px 20px; gap: 16px; }
  .feature-cell-badge      { width: 36px; height: 36px; font-size: 16px; border-radius: 7px; }
  .feature-cell-title-text { font-size: 28px; }
  .feature-cell-desc       { font-size: 22px; }
  .agent-hero-title        { font-size: 38px !important; }
  .agent-hero-tag          { font-size: 16px !important; padding: 8px 18px !important; }
  .agent-hero-icon         { width: 150px !important; }
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
  <div className="p-2 relative border-t border-b border-r border-[#e5e7eb] " style={{ flex: 1, overflow: 'hidden'}}>
    <div
      className="absolute inset-0 pointer-events-none opacity-[0]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
        backgroundSize: '150px 150px',
      }}
    />
    <div
  className="h-full relative z-10 bg-[#f4f4f5] flex flex-col"
  style={{
    outline: '1px solid rgba(0,0,0,0.125)',
    gap: '4px',              /* ← replaces space-evenly */
    padding: '4px',          /* ← outer breathing room */
    borderRadius:'6px' ,
  }}
>
 {features.map((feature, i) => (
  <div key={i} className="feature-cell">
    <span className="feature-cell-badge">{i + 1}</span>
    <div className="feature-cell-body">
      <span className="feature-cell-title-text anseru-card-title">
        {feature.title.replace(/\n/g, ' ')}
      </span>
      <p className="feature-cell-desc">{feature.description}</p>
    </div>
  </div>
))}
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