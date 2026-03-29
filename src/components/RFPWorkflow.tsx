import { useState, useEffect, useRef } from "react";

/* ── Node data with exact Figma positioning ──────────────────────── */
const nodes = [
  {
    title: ["Proposal Architecture"],
    desc: ["Generate a structured proposal outline and response flow."],
    angle: 0,
    tx: -100, ty: -85, 
    g1: "#6DA8EF", g2: "#F3E21F", // A4
  },
  {
    title: ["First Winnable Draft"],
    desc: ["Generate contextual first drafts using enterprise knowledge."],
    angle: 40,
    tx: 35, ty: -65,
    g1: "#320a6a", g2: "#5713d0", // Card-A4
  },
  {
    title: ["SME Collaboration"],
    desc: ["Route complex responses to subject matter experts for review."],
    angle: 80,
    tx: 43, ty: -25,
    g1: "#201CAE", g2: "#6AA4EE", // A2
  },
  {
    title: ["Final Proposal"],
    desc: ["Deliver a polished proposal ready for submission."],
    angle: 120,
    tx: 45, ty: -10,
    g1: "#fe3f49", g2: "#49abf5", // Card-A1
  },
  {
    title: ["Win–Loss Capture"],
    desc: ["Capture deal outcomes and key insights automatically."],
    angle: 160,
    tx: 40, ty: 20,
    g1: "#6DA8EF", g2: "#F3E21F", // Custom
  },
  {
    title: ["Smarter Next Deal"],
    desc: ["Feed insights back to improve future responses iteratively."],
    angle: 200,
    tx: -95, ty: 60, 
    g1: "#fe3f49", g2: "#49abf5", // Custom
  },
  {
    title: ["RFP Decomposition"],
    desc: ["Break complex RFPs and extract key requirements into structured sections."],
    angle: 240,
    tx: -270, ty: -5,
    g1: "#367AE6", g2: "#CE5575", // Custom
  },
  {
    title: ["Deal Qualification"],
    desc: ["Evaluate fit, assess win probability, and decide whether to pursue."],
    angle: 280,
    tx: -240, ty: -30,
    g1: "#201CAE", g2: "#6AA4EE", // Custom
  },
  {
    title: ["Requirement Intelligence"],
    desc: ["Categorize questions, tag by topic, and route to the right teams."],
    angle: 320,
    tx: -220, ty: -70,
    g1: "#367AE6", g2: "#CE5575", // Custom
  },
];

/* ── Geometry & Math ────────────────────────────────────────────── */
const CX = 550, CY = 530, R = 280;
const NR = 22; // Increased base radius of the balls

const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
  const rad = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

/* ── Generate the "Stacked Dash" Ring ───────────────────────────── */
const NUM_TICKS = 400; 
const ticks = Array.from({ length: NUM_TICKS }).map((_, i) => {
  const angle = (i * 360) / NUM_TICKS;
  const start = polarToCartesian(CX, CY, R - 2, angle); 
  const end = polarToCartesian(CX, CY, R + 2, angle);   
  return { id: i, start, end };
});

/* ── Layout Constants ───────────────────────────────────────────── */
const TLH = 22;
const DLH = 18;

export default function RFPWorkflow() {
  const [activeNode, setActiveNode] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const outerStart = polarToCartesian(CX, CY, 310, 206);
  const outerEnd = polarToCartesian(CX, CY, 310, 234);
  const innerStart = polarToCartesian(CX, CY, 250, 234);
  const innerEnd = polarToCartesian(CX, CY, 250, 206);

  return (
    <div className="w-full md:min-h-screen " style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* ── Header ── */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end pt-16 gap-6">
          <div>
            <p className="anseru-section-tag">
              The Future Of RFP Responses
            </p>
            <h2 className="anseru-section-title">
              From RFP to<br />Winning Proposal
            </h2>
          </div>
          <p className="max-w-[440px] text-[15px] text-gray-500 leading-[1.65] md:pt-2">
            Anseru orchestrates the entire response lifecycle with AI agents analyzing requirements,
            generating drafts, and enabling teams to refine and deliver high-quality proposals with speed and precision.
          </p>
        </div>
      </div>

      {/* ── Graphic ── */}
      <svg viewBox="0 150 1100 800" className="pt-20 bg-white mx-auto block w-full max-w-[1100px]">
        <defs>
          {nodes.map((n, i) => (
            <linearGradient key={i} id={`g${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={n.g1} />
              <stop offset="100%" stopColor={n.g2} />
            </linearGradient>
          ))}
          
          <marker id="arrow-outer" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#4f46e5" />
          </marker>
          <marker id="arrow-inner" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#8b5cf6" />
          </marker>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Central Text ── */}
        <text x={CX} y={CY - 12} fontFamily="DM Sans" textAnchor="middle" fontSize="38" fill="#111827" fontWeight="400">
          End-to-End
        </text>
        <text x={CX} y={CY + 38} fontFamily="DM Sans" textAnchor="middle" fontSize="48" fill="#1C32E6" fontWeight="400" letterSpacing="-0.5">
          Deal Intelligence
        </text>

        {/* ── Custom Stacked Dashes Ring ── */}
        <g opacity="0.8">
          {ticks.map((t) => (
            <line
              key={`tick-${t.id}`}
              x1={t.start.x}
              y1={t.start.y}
              x2={t.end.x}
              y2={t.end.y}
              fontFamily="DM Sans"
              stroke="#6b7280" /* Softened tick color to match original design */
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* ── Feedback Loop Arrows ── */}
        <path
          d={`M ${outerStart.x} ${outerStart.y} A 310 310 0 0 1 ${outerEnd.x} ${outerEnd.y}`}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrow-outer)"
        />
        <path
          d={`M ${innerStart.x} ${innerStart.y} A 250 250 0 0 0 ${innerEnd.x} ${innerEnd.y}`}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrow-inner)"
        />

        {/* ── Nodes ── */}
        {nodes.map((node, i) => {
          const p = polarToCartesian(CX, CY, R, node.angle);
          const isActive = i === activeNode;
          const currentRadius = isActive ? NR + 4 : NR;

          return (
            <g key={i}>
              {/* Animated Glow Ring */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? currentRadius + 10 : currentRadius}
                fill="none"
                stroke={node.g1}
                strokeWidth="3"
                opacity={isActive ? 0.6 : 0}
                style={{ transition: "all 0.6s ease-in-out" }}
              />

              {/* SOLID MASK: This hides the ticks underneath the ball */}
              <circle
                cx={p.x}
                cy={p.y}
                r={currentRadius}
                fill="#f8f9fa" /* Matches background color exactly */
                style={{ transition: "all 0.6s ease-in-out" }}
              />

              {/* Gradient Node */}
              <circle
                cx={p.x}
                cy={p.y}
                r={currentRadius}
                fill={`url(#g${i})`}
                opacity={isActive ? 1 : 0.4}
                filter={isActive ? "url(#glow)" : undefined}
                style={{ transition: "all 0.6s ease-in-out" }}
              />

              {/* Text Positioning */}
              <g 
                transform={`translate(${p.x + node.tx}, ${p.y + node.ty})`}
                style={{ transition: "opacity 0.6s ease-in-out", opacity: isActive ? 1 : 0.6 }}
              >
                {/* One line title */}
                <text
                  x={0}
                  y={0}
                  className="anseru-h4"
                >
                  {node.title.join(" ")}
                </text>

                {/* Two line description with manual wrap split */}
                {(() => {
                  const fullDesc = node.desc.join(" ");
                  const words = fullDesc.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  const line1 = words.slice(0, mid).join(" ");
                  const line2 = words.slice(mid).join(" ");
                  return (
                    <>
                      <text x={0} y={TLH} fontSize="13" fill="#6b7280" dominantBaseline="middle">
                        {line1}
                      </text>
                      <text x={0} y={TLH + DLH} fontSize="13" fill="#6b7280" dominantBaseline="middle">
                        {line2}
                      </text>
                    </>
                  );
                })()}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}