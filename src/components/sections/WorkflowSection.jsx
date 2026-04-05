import { RFPWorkflowDiagram } from '../workflow/RFPWorkflowDiagram.jsx';
import { RFP_NODES } from '../../data/rfpWorkflow.js';

// Matches original: step-row height = 82px, node-wrapper = 40px, node-circle = 30px
const ROW_H = 82;
const COL_W = 49.5;   // step-node-col width
const SEG_LEFT = 24.75; // center of col = left for the segment line

// Placeholder icon — brightness(0) invert(1) makes it white on gradient bg
function NodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

// ── Mobile vertical timeline — matches original .wf-wrap / .steps-list ───────
function MobileWorkflowList() {
  return (
    // .wf-wrap
    <div style={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: 600,
      margin: '0 auto',
      fontFamily: 'DM Sans, sans-serif',
      overflow: 'hidden',
      padding: '40px 20px 0',
    }}>

      {/* wf-header */}
      <div style={{ width: '100%' }}>
        <p style={{ fontSize: 'clamp(14px,3vw,15px)', color: '#6B7280', marginBottom: 3 }}>
          The Future of RFP Responses
        </p>
        <h2 style={{
          fontSize: 'clamp(16px,5.5vw,26px)',
          fontWeight: 400,
          color: '#111827',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: 'clamp(8px,2.5vw,14px)',
        }}>
          From RFP to Winning Proposal
        </h2>
      </div>

      {/* wf-title / End-to-End heading */}
      <h4 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(24px,6vw,36px)',
        fontWeight: 400,
        lineHeight: 1.2,
        textAlign: 'center',
        width: '100%',
        margin: '20px 0 clamp(16px,4vw,24px)',
        letterSpacing: '-0.02em',
        color: '#000',
      }}>
        End-to-End<br />
        <span style={{ color: '#2C48DB' }}>Deal Intelligence</span>
      </h4>

      {/* tl-outer */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 6, position: 'relative', width: '100%' }}>

        {/* steps-list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>

          {/* Absolute vertical segment lines — one between each pair of nodes */}
          {RFP_NODES.slice(0, -1).map((_, i) => (
            <div
              key={`seg-${i}`}
              style={{
                position: 'absolute',
                left: SEG_LEFT,
                transform: 'translateX(-50%)',
                top: ROW_H * i + 37,
                width: 1.5,
                height: 48,
                background: '#d9d9d9',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          ))}

          {RFP_NODES.map((node, i) => {
            const isLast = i === RFP_NODES.length - 1;
            return (
              // .step-row
              <div key={node.title} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                height: ROW_H,
                minHeight: ROW_H,
                position: 'relative',
                zIndex: 2,
              }}>

                {/* .step-node-col */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  width: COL_W,
                  minHeight: ROW_H,
                  position: 'relative',
                }}>
                  {/* .node-wrapper */}
                  <div style={{
                    position: 'relative',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#fff',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}>
                    {/* .half-ring — left half arc */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '2px solid #d9d9d9',
                      clipPath: 'inset(0 48% 0 0)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }} />
                    {/* .node-circle — gradient bg + white icon */}
                    <div style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: `linear-gradient(90deg, #1d80f9, #e74f62)`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px #e74f6259',
                      color: 'white',
                    }}>
                      <NodeIcon />
                    </div>
                  </div>

                  {/* .connector-symbols — between this node and next */}
                  {!isLast && (
                    <div style={{
                      position: 'absolute',
                      top: 61,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 3,
                      width: 40,
                      color: '#d9d9d9',
                      opacity: 0.6,
                    }}>
                      {/* up double chevron */}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 11 12 6 17 11" />
                        <polyline points="7 18 12 13 17 18" />
                      </svg>
                      {/* down double chevron */}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 13 12 18 17 13" />
                        <polyline points="7 6 12 11 17 6" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* .step-body */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'flex-start',
                  height: ROW_H,
                  minHeight: ROW_H,
                  padding: '2px 4px 0 0',
                }}>
                  {/* .step-title */}
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(13px,3.8vw,15px)',
                    fontWeight: 500,
                    color: '#111',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {node.title}
                  </p>
                  {/* .step-desc */}
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(11px,3.2vw,13px)',
                    color: '#666',
                    lineHeight: 1.35,
                    minHeight: '2.7em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {node.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* bottom padding */}
      <div style={{ height: 40 }} />
    </div>
  );
}

export function WorkflowSection() {
  return (
    <section data-section id="workflow" className="scroll-mt-5">
      <div className="w-full md:min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ── Desktop header ── */}
        <div className="hidden md:block max-w-300 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between md:items-end pt-16 gap-6">
            <div>
              <p className="anseru-section-tag">The Future Of RFP Responses</p>
              <h2 className="anseru-section-title">
                From RFP to
                <br />
                <span className="text-gradient-brand">Winning Proposal</span>
              </h2>
            </div>
            <p className="max-w-110 text-[15px] text-gray-500 leading-[1.65] pt-2">
              Anseru orchestrates the entire response lifecycle with AI agents analyzing requirements,
              generating drafts, and enabling teams to refine and deliver high-quality proposals with speed
              and precision.
            </p>
          </div>
        </div>

        {/* Desktop: SVG orbital diagram */}
        <div className="hidden md:block">
          <RFPWorkflowDiagram />
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <MobileWorkflowList />
        </div>

      </div>
    </section>
  );
}
