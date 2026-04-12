    import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';

const featureCellStyles = `
.feature-cell {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  --cell-left: 10px;
  --num-width: 28px;
}

.feature-cell-title-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-right: 10px;
}

.feature-cell-number {
  line-height: 1.35;
  white-space: nowrap;
  flex-shrink: 0;
  box-sizing: content-box;
  color: #111 !important;
  width: var(--num-width);
  padding-left: var(--cell-left);
}

.feature-cell-title-text {
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  height: calc(1.35em * 2);
  -webkit-box-orient: vertical;
  overflow: hidden;
  box-sizing: content-box;
  flex: 1;
  color: #111 !important;
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
  color: #6b7280 !important;
  /* always starts exactly under the title text, not the number */
  padding-left: calc(var(--cell-left) + var(--num-width));
  padding-right: 10px;
}

/* ── 1024–1199px, short ── */
@media (min-width: 1024px) and (max-width: 1199px) and (max-height: 700px) {
  .feature-cell          { --cell-left: 8px; --num-width: 22px; }
  .feature-cell-number   { font-size: 12px; padding-top: 10px; }
  .feature-cell-title-text { font-size: 12px; height: calc(1.35em * 2); padding-top: 10px; }
  .feature-cell-desc     { font-size: 10px; padding-top: 10px; padding-right: 8px; }
  .agent-hero-title      { font-size: 16px !important; }
  .agent-hero-tag        { font-size: 10px !important; padding: 3px 7px !important; }
  .agent-hero-icon       { width: 52px !important; }
}
/* ── 1024–1199px, tall ── */
@media (min-width: 1024px) and (max-width: 1199px) and (min-height: 700px) {
  .feature-cell          { --cell-left: 10px; --num-width: 24px; }
  .feature-cell-number   { font-size: 14px; padding-top: 12px; }
  .feature-cell-title-text { font-size: 14px; height: calc(1.35em * 2); padding-top: 12px; }
  .feature-cell-desc     { font-size: 11px; padding-top: 10px; padding-right: 10px; }
  .agent-hero-title      { font-size: 18px !important; }
  .agent-hero-tag        { font-size: 11px !important; padding: 4px 9px !important; }
  .agent-hero-icon       { width: 60px !important; }
}

/* ── 1200–1439px, short ── */
@media (min-width: 1200px) and (max-width: 1439px) and (max-height: 750px) {
  .feature-cell          { --cell-left: 10px; --num-width: 26px; }
  .feature-cell-number   { font-size: 15px; padding-top: 12px; }
  .feature-cell-title-text { font-size: 15px; height: calc(1.35em); padding-top: 12px; }
  .feature-cell-desc     { font-size: 12px; padding-top: 10px; padding-right: 10px; }
  .agent-hero-title      { font-size: 19px !important; }
  .agent-hero-tag        { font-size: 11px !important; padding: 4px 10px !important; }
  .agent-hero-icon       { width: 70px !important; }
}
/* ── 1200–1439px, tall ── */
@media (min-width: 1200px) and (max-width: 1439px) and (min-height: 750px) {
  .feature-cell          { --cell-left: 10px; --num-width: 38px; }
  .feature-cell-number   { font-size: 24px; padding-top: 16px; }
  .feature-cell-title-text { font-size: 24px; height: calc(1.35em); padding-top: 16px; }
  .feature-cell-desc     { font-size: 19px; padding-top: 10px; padding-right: 10px; }
  .agent-hero-title      { font-size: 26px !important; }
  .agent-hero-tag        { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon       { width: 100px !important; }
}

/* ── 1440–1919px, short ── */
@media (min-width: 1440px) and (max-width: 1919px) and (max-height: 850px) {
  .feature-cell          { --cell-left: 10px; --num-width: 38px; }
  .feature-cell-number   { font-size: 24px; padding-top: 16px; }
  .feature-cell-title-text { font-size: 24px; height: calc(1.35em); padding-top: 16px; }
  .feature-cell-desc     { font-size: 20px; padding-top: 10px; padding-right: 10px; }
  .agent-hero-title      { font-size: 26px !important; }
  .agent-hero-tag        { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon       { width: 100px !important; }
}
/* ── 1440–1919px, tall ── */
@media (min-width: 1440px) and (max-width: 1919px) and (min-height: 850px) {
  .feature-cell          { --cell-left: 10px; --num-width: 38px; }
  .feature-cell-number   { font-size: 24px; padding-top: 20px; }
  .feature-cell-title-text { font-size: 24px; height: calc(1.35em); padding-top: 20px; }
  .feature-cell-desc     { font-size: 20px; padding-top: 10px; padding-right: 10px; }
  .agent-hero-title      { font-size: 26px !important; }
  .agent-hero-tag        { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon       { width: 100px !important; }
}

/* ── 1920–2559px, short ── */
@media (min-width: 1920px) and (max-width: 2559px) and (max-height: 1000px) {
  .feature-cell          { --cell-left: 14px; --num-width: 34px; }
  .feature-cell-number   { font-size: 20px; padding-top: 16px; }
  .feature-cell-title-text { font-size: 20px; height: calc(1.35em); padding-top: 16px; }
  .feature-cell-desc     { font-size: 15px; padding-top: 10px; padding-right: 14px; }
  .agent-hero-title      { font-size: 28px !important; }
  .agent-hero-tag        { font-size: 13px !important; padding: 6px 14px !important; }
  .agent-hero-icon       { width: 110px !important; }
}
/* ── 1920–2559px, tall ── */
@media (min-width: 1920px) and (max-width: 2559px) and (min-height: 1000px) {
  .feature-cell          { --cell-left: 16px; --num-width: 40px; }
  .feature-cell-number   { font-size: 24px; padding-top: 22px; }
  .feature-cell-title-text { font-size: 24px; height: calc(1.35em); padding-top: 22px; }
  .feature-cell-desc     { font-size: 22px; padding-top: 10px; padding-right: 16px; }
  .agent-hero-title      { font-size: 32px !important; }
  .agent-hero-tag        { font-size: 14px !important; padding: 7px 16px !important; }
  .agent-hero-icon       { width: 124px !important; }
}

/* ── 2560px+ ── */
@media (min-width: 2560px) {
  .feature-cell          { --cell-left: 20px; --num-width: 48px; }
  .feature-cell-number   { font-size: 28px; padding-top: 28px; }
  .feature-cell-title-text { font-size: 28px; height: calc(1.35em); padding-top: 28px; }
  .feature-cell-desc     { font-size: 25px; padding-top: 10px; padding-right: 20px; }
  .agent-hero-title      { font-size: 38px !important; }
  .agent-hero-tag        { font-size: 16px !important; padding: 8px 18px !important; }
  .agent-hero-icon       { width: 150px !important; }
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
  <div className="p-2 relative border-t border-b border-r border-[#e5e7eb]" style={{ flex: 1, overflow: 'hidden' }}>
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.1]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
        backgroundSize: '150px 150px',
      }}
    />
    <div
      className="h-full relative z-10 bg-[#f4f4f5] flex flex-col"
      style={{ outline: '1px solid rgba(0,0,0,0.125)', justifyContent: 'space-evenly' }}
    >
      {features.map((feature, i) => (
        <div key={i} className="feature-cell" style={{ flex: '0 0 auto' }}>
          <div className="feature-cell-title-row">
            <span className="feature-cell-number">{i + 1}.</span>
            <span className="feature-cell-title-text anseru-card-title">
              {feature.title.replace(/\n/g, ' ')}
            </span>
          </div>
          <p className="feature-cell-desc">{feature.description}</p>
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