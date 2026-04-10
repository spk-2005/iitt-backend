import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';

function DesktopFeatureCell({ feature, borderClasses }) {
  return (
    <div className={`flex flex-col border-[#e5e7eb] ${borderClasses}`}
      style={{ padding: 'clamp(10px, 1vw, 20px)' }}
    >
      <h4
        className="anseru-card-title"
        style={{
          whiteSpace: 'pre-line',
          fontSize: 'clamp(22px, 1.5vw, 18px)',
          lineHeight: '1.3',
          minHeight: '1.6em',
          marginBottom: 'clamp(8px, 1vw, 14px)',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {feature.title}
      </h4>
      <p
        className="anseru-section-tag text-justify hyphens-auto"
        style={{
          fontSize: 'clamp(15px, 1.1vw, 19px)',
          lineHeight: '1.5',
          paddingTop: 'clamp(22px, 1.5vw, 18px)',
          WebkitHyphens: 'auto',
          textAlign:'justify',
          hyphens: 'auto',
          wordSpacing: '-0.05em',
          textJustify: 'inter-character',
        }}
      >
        {feature.description}
      </p>
    </div>
  );
}

function MobileFeatureCell({ feature }) {
  return (
    <div className="flex flex-col h-full" style={{ padding: 'clamp(10px, 3.5vw, 20px)' }}>
      <h4
  className="font-normal text-black leading-[1.25]"
  style={{
    fontSize: 'clamp(11px, 3.5vw, 15px)',
    whiteSpace: 'pre-line',
    minHeight: '2.6em',
    display: 'flex',
    alignItems: 'flex-start',
    wordBreak: 'break-word',
  }}
>
        {feature.title}
      </h4>
      <p
  className="text-[#6b7280] leading-[1.4] md:p-[clamp(5px,1.5vw,10px)]"
  style={{
    fontSize: 'clamp(10px, 2.8vw, 13px)',
    paddingTop: 'clamp(10px, 3.5vw, 20px)',
    wordSpacing: 'normal',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  }}
>
  {feature.description}
      </p>
    </div>
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
          {/* Use CSS grid with align-items:stretch so all 4 cells share the same row heights */}
          <div
            className="h-full relative z-10 bg-[#f4f4f5]"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              alignItems: 'stretch',
            }}
          >
            <DesktopFeatureCell feature={features[0]} borderClasses="border-b border-r" />
            <DesktopFeatureCell feature={features[1]} borderClasses="border-b" />
            <DesktopFeatureCell feature={features[2]} borderClasses="border-r" />
            <DesktopFeatureCell feature={features[3]} borderClasses="" />
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