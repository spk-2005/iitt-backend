import bwlogo from "../assets/Anseru_3 2.png";
import shieldImg from "../assets/shield.png";

import verified from "../assets/material-symbols-light_verified-outline.png"
import accessai from "../assets/ri_ai.png" 
import lock from "../assets/arcticons_secure-tan.png"
import chip from "../assets/material-symbols_switch-access-outline.png"

// Each node descriptor for the mobile fallback list
const nodeData = [
  {
    img: accessai,
    gradient: "linear-gradient(135deg, #2837A2 0%, #5B82E2 100%)",
    title: "Responsible AI & Model Usage",
    desc: "Customer data is never used to train shared or public AI models.",
  },
  {
    img: verified,
    gradient: "linear-gradient(180deg, #fe404b 0%, #61b6ef 100%)",
    title: "Verifiable & Trusted Answers",
    desc: "Every response is grounded in your company knowledge with traceable sources and review workflows.",
  },
  {
    img: chip,
    gradient: "linear-gradient(180deg, #2b2b2bff 0%, #5B21B6 100%)",
    title: "Access Control & Governance",
    desc: "Granular permissions and audit logs ensure only authorized users can access sensitive information.",
  },
  {
    img: lock,
    gradient: "linear-gradient(180deg, #71B2CC 0%, #D4D145 100%)",
    title: "Secure Infrastructure",
    desc: "Your data is protected with encryption, secure storage, and isolated customer environments.",
  },
];

export default function SecurityComplianceDiagram() {
  return (
    <div className="w-full bg-white overflow-hidden px-6 md:px-12 font-sans">
      <div className="max-w-[1200px] mx-auto pt-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-15">
          <div className="max-w-[500px]">
            <p className="anseru-section-tag">
              Security And Compliance
            </p>
            <h2 className="anseru-section-title">
              Safely connect agents to<br className="hidden md:block" /> company knowledge
            </h2>
          </div>
         
        </div>

        {/* Diagram Section */}
        <div className="relative w-full flex flex-col items-center pb-16">

          {/* ── DESKTOP DIAGRAM (md+) ────────────────────────────────────── */}
          {/*
            We wrap the fixed-size 500×500 diagram in a container whose
            intrinsic size matches the diagram, so no CSS-scale collapse.
            Labels are absolutely positioned outside the box — that's fine
            on md+ where there's plenty of room.
          */}
          <div className="hidden md:flex justify-center w-full pt-10 pb-5">
            {/* Outer positioning context – sized to include the label overhang */}
            <div className="relative" style={{ width: "910px", height: "560px" }}>

              {/* Soft Background Glows */}
              <div className="absolute" style={{ top: "80px", left: "180px", width: "340px", height: "340px", background: "#eef2ff", borderRadius: "50%", filter: "blur(70px)", opacity: 0.8, zIndex: 0 }} />
              <div className="absolute" style={{ top: "80px", left: "390px", width: "340px", height: "340px", background: "#fff1f2", borderRadius: "50%", filter: "blur(70px)", opacity: 0.8, zIndex: 0 }} />

              {/* The 500×500 diagram – centred horizontally within the 910px box */}
              <div className="absolute" style={{ left: "205px", top: "30px", width: "500px", height: "500px" }}>

                {/* Dashed Connecting Ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
                  <circle cx="250" cy="250" r="215" fill="none" stroke="#e5e7eb" strokeWidth="2.5" strokeDasharray="6 6" />
                </svg>

                {/* Center Shield */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[200px] z-10 flex items-center justify-center">
                  <img src={shieldImg} alt="" className="absolute inset-0 w-full h-full object-contain opacity-100" />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
                    <svg viewBox="0 0 100 110" className="w-[140px] h-[160px] text-[#eee5e7]">
                      <path d="M50 0 L100 20 L100 60 C100 85 50 110 50 110 C50 110 0 85 0 60 L0 20 Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="relative z-20 w-[60px] h-[60px] rounded-full shadow-lg flex items-center justify-center overflow-hidden bg-black">
                    <img src={bwlogo} alt="Anseru Logo" className="w-full h-full object-cover scale-60" />
                  </div>
                </div>

                {/* Node 1 – Top (Responsible AI) */}
                <div className="absolute z-20" style={{ top: "8%", left: "50%", transform: "translate(-50%, -80%)" }}>
                  <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden flex items-center justify-center p-5 translate-y-8" style={{ background: "linear-gradient(135deg, #2837A2 0%, #5B82E2 100%)" }}>
                    <img src={accessai} alt="" />
                  </div>
                  <div className="absolute -left-3/4 -top-1/4 -translate-y-1/2 w-[280px] text-left">
                    <h4 className="font-medium text-[#111827] mb-1.5 leading-tight">Responsible AI & Model Usage</h4>
                    <p className="text-[14px] text-[#6b7280] leading-relaxed">Customer data is never used to train shared or public AI models.</p>
                  </div>
                </div>

                {/* Node 2 – Right (Verifiable) */}
                <div className="absolute z-20" style={{ top: "50%", left: "93%", transform: "translate(-50%, -50%)" }}>
                  <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden flex items-center justify-center p-5" style={{ background: "linear-gradient(180deg, #fe404b 0%, #61b6ef 100%)" }}>
                    <img src={verified} alt="" />
                  </div>
                  <div className="absolute left-[calc(100%+24px)] top-1/2 -translate-y-1/2 w-[280px] text-left">
                    <h4 className="font-medium text-[#111827] mb-1.5 leading-tight">Verifiable & Trusted Answers</h4>
                    <p className="text-[14px] text-[#6b7280] leading-relaxed">Every response is grounded in your company knowledge with traceable sources and review workflows.</p>
                  </div>
                </div>

                {/* Node 3 – Bottom (Access Control) */}
                <div className="absolute z-20" style={{ top: "100%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden flex items-center justify-center p-5 -translate-y-10" style={{ background: "linear-gradient(180deg, #2b2b2bff 0%, #5B21B6 100%)" }}>
                    <img src={chip} alt="" />
                  </div>
                  <div className="absolute -right-[calc(100%)] top-[125%] -translate-y-1/2 w-[280px] text-left">
                    <h4 className="font-medium text-[#111827] mb-1.5 leading-tight">Access Control & Governance</h4>
                    <p className="text-[14px] text-[#6b7280] leading-relaxed">Granular permissions and audit logs ensure only authorized users can access sensitive information.</p>
                  </div>
                </div>

                {/* Node 4 – Left (Secure Infrastructure) */}
                <div className="absolute z-20" style={{ top: "50%", left: "9%", transform: "translate(-50%, -50%)" }}>
                  <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden flex items-center justify-center p-5" style={{ background: "linear-gradient(180deg, #71B2CC 0%, #D4D145 100%)" }}>
                    <img src={lock} alt="" />
                  </div>
                  <div className="absolute right-[calc(80%)] top-1/2 -translate-y-1/2 w-[280px] text-left">
                    <h4 className="font-medium text-[#111827] mb-1.5 leading-tight">Secure Infrastructure</h4>
                    <p className="text-[14px] text-[#6b7280] leading-relaxed">Your data is protected with encryption, secure storage, and isolated customer environments.</p>
                  </div>
                </div>

              </div>{/* end 500×500 */}
            </div>{/* end 910×560 */}
          </div>

          {/* ── MOBILE / TABLET LAYOUT (< md) ────────────────────────────── */}
          <div className="flex md:hidden flex-col items-center gap-10 w-full">

        

            {/* Feature cards – 2-column grid on sm, single on xs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {nodeData.map((node, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div
                    className="w-[52px] h-[52px] rounded-full shrink-0 flex items-center justify-center p-3"
                    style={{ background: node.gradient }}
                  >
                    <img src={node.img} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111827] mb-1 text-[15px] leading-tight">{node.title}</h4>
                    <p className="text-[13px] text-[#6b7280] leading-relaxed">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}