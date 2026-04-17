import { INTEGRATION_COLUMNS } from '../../data/integrations.js';

function IntegrationIcon({ name, src }) {
  return (
    <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-xl md:rounded-2xl border border-gray-100 bg-[#F3F3F3] flex items-center justify-center shadow-sm shrink-0">
      <img src={src} loading="lazy" alt={name} width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
    </div>
  );
}

function IntegrationColumn({ column }) {
  const animationName = column.direction === 'up' ? 'integrationUp' : 'integrationDown';

  return (
    <div className={column.direction === 'up' ? 'mt-10 md:mt-20 overflow-visible' : 'overflow-visible'}>
      <div
        className="integration-col flex flex-col gap-3 md:gap-4"
        style={{ animation: `${animationName} ${column.duration} linear infinite` }}
      >
        {/* Render icons twice for seamless infinite loop */}
        {[...column.icons, ...column.icons].map((icon, i) => (
          <IntegrationIcon key={`${icon.name}-${i}`} name={icon.name} src={icon.src} />
        ))}
      </div>
    </div>
  );
}

export function IntegrationSection() {
  return (
    <section data-section id="integration" className="scroll-mt-5">
      <section className="pb-12 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-24 items-center">

          {/* Text */}
{/* Text */}
<div className="text-center md:text-left flex-1 order-first md:order-last flex flex-col justify-center items-center md:items-start">
  <p className="anseru-section-tag">Integrations</p>
  <h2 className="anseru-section-title mb-2 md:mb-6">
    Connect to the Tools
    <br />
    You Already Use
  </h2>
  <div>
    
     <a href="https://calendly.com/kg-goutham-anseru/30min?back=1&month=2026-04"
      aria-label="Request a demo for Tool Integrations"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        padding: '10px 28px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 400,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      Request Demo
    </a>
  </div>
</div>

          {/* Animated columns */}
          <div className="w-full max-w-105 aspect-square bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center relative pointer-events-none order-last md:order-first">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10" />
            <div className="flex gap-3 md:gap-4 items-center h-[200%]">
              {INTEGRATION_COLUMNS.map((col) => (
                <IntegrationColumn key={col.id} column={col} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </section>
  );
}
