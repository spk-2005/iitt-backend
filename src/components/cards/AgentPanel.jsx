import { NoiseOverlay } from '../primitives/NoiseOverlay.jsx';

function DesktopFeatureCell({ feature, borderClasses }) {
  return (
    <div className={`p-8 md:p-5 flex flex-col border-[#e5e7eb] ${borderClasses}`}>
      <h4 className="anseru-card-title mb-3" style={{ whiteSpace: 'pre-line', minHeight: '2.2em' }}>
        {feature.title}
      </h4>
      <p className="anseru-section-tag">{feature.description}</p>
    </div>
  );
}

function MobileFeatureCell({ feature }) {
  return (
    <div className="flex flex-col h-full" style={{ padding: 'clamp(10px,3.5vw,24px)' }}>
      <h4
        className="font-normal text-black leading-[1.2]"
        style={{
          fontSize: 'clamp(11px,3.73vw,16px)',
          whiteSpace: 'pre-line',
          minHeight: '3em'
        }}
      >
        {feature.title}
      </h4>
      <p
        className="text-[#6b7280] leading-[1.4]"
        style={{ fontSize: 'clamp(10px,3vw,13px)', paddingTop: 'clamp(8px,7vw,10px)' }}
      >
        {feature.description}
      </p>
    </div>
  );
}

function MobileFeatureRow({ left, right, isLast }) {
  return (
    <div
      className={`flex flex-row flex-1${isLast ? '' : ' border-b border-[#e5e7eb]'}`}
    >
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
        {/* Hero card — left column */}
        <div className="lg:w-[48%] p-3.5 bg-white border lg:border-b-0 lg:border-r border-[#e5e7eb] shrink-0">
          <div
            className="relative flex flex-col justify-between p-10 h-full overflow-hidden"
            style={{ background: gradient }}
          >
            <NoiseOverlay />
            <div className="relative">
              <img src={agentIcon} loading="lazy" alt="" className="w-36 h-auto opacity-90" />
            </div>
            <div className="relative mt-auto">
              <h3
                className="anseru-card-title text-white mb-4 leading-[1.3] md:leading-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-white text-[13px] md:text-[14px] px-3.5 py-1.5 bg-white/20 rounded-lg border border-white/40 font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid — right column */}
        <div className="p-4 relative overflow-hidden border border-l-black/60" style={{ flex: 1 }}>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.1]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '150px 150px',
            }}
          />
          <div className="h-full grid grid-cols-2 grid-rows-2 bg-[#f4f4f5] relative z-10">
            <DesktopFeatureCell feature={features[0]} borderClasses="border-b border-r" />
            <DesktopFeatureCell feature={features[1]} borderClasses="border-b" />
            <DesktopFeatureCell feature={features[2]} borderClasses="border-r" />
            <DesktopFeatureCell feature={features[3]} borderClasses="" />
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout — hero on top, feature grid below
  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden flex flex-col h-full">
      <div className="bg-white border-b border-[#e5e7eb] shrink-0">
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{
            background: gradient,
            padding: 'clamp(16px,5vw,32px)',
            minHeight: '290px',
            borderRadius: '8px',
          }}
        >
          <NoiseOverlay />
          <div className="relative">
            <img
              src={agentIcon}
              loading="lazy"
              alt=""
              style={{ width: 'clamp(40px,15vw,92px)', height: 'auto', opacity: 0.9 }}
            />
          </div>
          <div className="relative mt-auto">
            <h3
              className="font-normal text-white leading-[1.1]"
              style={{
                fontSize: 'clamp(16px,6.7vw,32px)',
                marginBottom: 'clamp(8px,2.5vw,16px)',
                whiteSpace: 'pre-line',
              }}
            >
              {title}
            </h3>
            <div className="flex flex-wrap" style={{ gap: 'clamp(4px,1.5vw,8px)' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-white bg-white/20 rounded-lg border border-white/40 font-normal"
                  style={{
                    fontSize: 'clamp(9px,2.74vw,13px)',
                    padding: 'clamp(3px,1vw,4px) clamp(6px,2vw,12px)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature grid — equal-height cards on mobile */}
      <div className="p-4 relative overflow-hidden flex-1">
        <div className="bg-[#f4f4f5] grid grid-cols-2 grid-rows-2 gap-px h-full">
          <div className="bg-[#f4f4f5] flex">
            <MobileFeatureCell feature={features[0]} />
          </div>
          <div className="bg-[#f4f4f5] flex">
            <MobileFeatureCell feature={features[1]} />
          </div>
          <div className="bg-[#f4f4f5] flex">
            <MobileFeatureCell feature={features[2]} />
          </div>
          <div className="bg-[#f4f4f5] flex">
            <MobileFeatureCell feature={features[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}