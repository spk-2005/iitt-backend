import { RFPWorkflowDiagram } from '../workflow/RFPWorkflowDiagram.jsx';
import { RFP_NODES } from '../../data/rfpWorkflow.js';

// Matches original: step-row height = 82px, node-wrapper = 40px, node-circle = 30px
const ROW_H = 82;
const COL_W = 49.5;   // step-node-col width
const SEG_LEFT = 24.75; // center of col = left for the segment line

// Placeholder icon — brightness(0) invert(1) makes it white on gradient bg
const NODE_ICONS = {
  proposal: (
    <svg width="29" height="20" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.644 0.678711H2.7154C1.59111 0.678711 0.679688 1.59013 0.679688 2.71443V23.0716C0.679688 24.1959 1.59111 25.1073 2.7154 25.1073H17.644C18.7683 25.1073 19.6797 24.1959 19.6797 23.0716V2.71443C19.6797 1.59013 18.7683 0.678711 17.644 0.678711Z" stroke="white" stroke-width="1.35714" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.39453 6.10645H16.966" stroke="white" stroke-width="1.35714" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.14453 8.82129H4.0731C3.69834 8.82129 3.39453 9.1251 3.39453 9.49986V13.5713C3.39453 13.9461 3.69834 14.2499 4.0731 14.2499H8.14453C8.5193 14.2499 8.8231 13.9461 8.8231 13.5713V9.49986C8.8231 9.1251 8.5193 8.82129 8.14453 8.82129Z" stroke="white" stroke-width="1.35714" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.2852 8.82129H12.2137C11.839 8.82129 11.5352 9.1251 11.5352 9.49986V13.5713C11.5352 13.9461 11.839 14.2499 12.2137 14.2499H16.2852C16.6599 14.2499 16.9637 13.9461 16.9637 13.5713V9.49986C16.9637 9.1251 16.6599 8.82129 16.2852 8.82129Z" stroke="white" stroke-width="1.35714" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.39453 16.9639H16.966" stroke="white" stroke-width="1.35714" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
  draft: (
  <svg width="18" height="20" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.572 0.713867H2.8577C1.67423 0.713867 0.714844 1.67326 0.714844 2.85672V24.2853C0.714844 25.4688 1.67423 26.4282 2.8577 26.4282H18.572C19.7555 26.4282 20.7148 25.4688 20.7148 24.2853V2.85672C20.7148 1.67326 19.7555 0.713867 18.572 0.713867Z" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.57422 6.42676H17.8599" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.57422 10.7139H15.0028" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 17.8571L9.28571 22.1429L16.4286 15" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
  collaboration: (
 <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.69922 8.7002C8.90836 8.7002 10.6992 6.90933 10.6992 4.7002C10.6992 2.49106 8.90836 0.700195 6.69922 0.700195C4.49008 0.700195 2.69922 2.49106 2.69922 4.7002C2.69922 6.90933 4.49008 8.7002 6.69922 8.7002Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.699219 16.7002C0.699219 12.7002 4.69922 10.7002 6.69922 10.7002C8.69922 10.7002 12.6992 12.7002 12.6992 16.7002" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.6992 8.7002C28.9084 8.7002 30.6992 6.90933 30.6992 4.7002C30.6992 2.49106 28.9084 0.700195 26.6992 0.700195C24.4901 0.700195 22.6992 2.49106 22.6992 4.7002C22.6992 6.90933 24.4901 8.7002 26.6992 8.7002Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6992 16.7002C20.6992 12.7002 24.6992 10.7002 26.6992 10.7002C28.6992 10.7002 32.6992 12.7002 32.6992 16.7002" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6992 6.7002H22.6992" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
  final: (
<svg width="15" height="22" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.1936 0.549805H2.90792C1.60611 0.549805 0.550781 1.60513 0.550781 2.90695V26.4784C0.550781 27.7802 1.60611 28.8355 2.90792 28.8355H20.1936C21.4955 28.8355 22.5508 27.7802 22.5508 26.4784V2.90695C22.5508 1.60513 21.4955 0.549805 20.1936 0.549805Z" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.69531 6.83496H19.4096" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.69531 11.5498H16.2667" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.69531 16.2637H14.6953" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.2651 28.8348C18.8687 28.8348 20.9794 26.7242 20.9794 24.1205C20.9794 21.5169 18.8687 19.4062 16.2651 19.4062C13.6614 19.4062 11.5508 21.5169 11.5508 24.1205C11.5508 26.7242 13.6614 28.8348 16.2651 28.8348Z" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9062 24.1212L15.4777 25.6927L18.6205 22.5498" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  ),
  winLoss: (
<svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.60156 16.5996C13.0198 16.5996 16.6016 13.0179 16.6016 8.59961C16.6016 4.18133 13.0198 0.599609 8.60156 0.599609C4.18328 0.599609 0.601562 4.18133 0.601562 8.59961C0.601562 13.0179 4.18328 16.5996 8.60156 16.5996Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.40234 8.59922L7.80234 10.9992L11.8023 6.19922" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.6016 16.5996C29.0198 16.5996 32.6016 13.0179 32.6016 8.59961C32.6016 4.18133 29.0198 0.599609 24.6016 0.599609C20.1833 0.599609 16.6016 4.18133 16.6016 8.59961C16.6016 13.0179 20.1833 16.5996 24.6016 16.5996Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.4023 5.39941L27.8023 11.7994" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.8023 5.39941L21.4023 11.7994" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>




  ),
  smarterDeal: (
<svg width="37" height="18" viewBox="0 0 37 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9158 5.36914H2.18857C1.30993 5.36914 0.597656 6.08141 0.597656 6.96005V14.9146C0.597656 15.7932 1.30993 16.5055 2.18857 16.5055H14.9158C15.7945 16.5055 16.5067 15.7932 16.5067 14.9146V6.96005C16.5067 6.08141 15.7945 5.36914 14.9158 5.36914Z" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5078 10.9375H27.6442" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.4609 7.75488L27.6428 10.9367L24.4609 14.1185" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.8253 6.96014C31.7039 6.96014 32.4162 6.24786 32.4162 5.36923C32.4162 4.49059 31.7039 3.77832 30.8253 3.77832C29.9466 3.77832 29.2344 4.49059 29.2344 5.36923C29.2344 6.24786 29.9466 6.96014 30.8253 6.96014Z" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.8242 0.59668V2.98304" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.8242 7.75488V10.1412" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.0508 5.36914H28.4371" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.2109 5.36914H35.5973" stroke="white" stroke-width="1.19318" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  ),
  decomposition: (
 <svg width="20" height="15" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6425 0.357422H1.49847C0.867208 0.357422 0.355469 0.869161 0.355469 1.50042V15.2164C0.355469 15.8477 0.867208 16.3594 1.49847 16.3594H10.6425C11.2737 16.3594 11.7855 15.8477 11.7855 15.2164V1.50042C11.7855 0.869161 11.2737 0.357422 10.6425 0.357422Z" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.63672 3.78613H9.49472" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.63672 6.07227H8.35172" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.63672 8.3584H7.20872" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.7852 8.3584H17.5002" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2109 6.07227L17.4969 8.35827L15.2109 10.6443" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.7841 1.5H19.2121C18.8965 1.5 18.6406 1.75587 18.6406 2.0715V4.3575C18.6406 4.67313 18.8965 4.929 19.2121 4.929H23.7841C24.0998 4.929 24.3556 4.67313 24.3556 4.3575V2.0715C24.3556 1.75587 24.0998 1.5 23.7841 1.5Z" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.7841 7.21582H19.2121C18.8965 7.21582 18.6406 7.47169 18.6406 7.78732V10.0733C18.6406 10.389 18.8965 10.6448 19.2121 10.6448H23.7841C24.0998 10.6448 24.3556 10.389 24.3556 10.0733V7.78732C24.3556 7.47169 24.0998 7.21582 23.7841 7.21582Z" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.7841 12.9307H19.2121C18.8965 12.9307 18.6406 13.1865 18.6406 13.5022V15.7882C18.6406 16.1038 18.8965 16.3597 19.2121 16.3597H23.7841C24.0998 16.3597 24.3556 16.1038 24.3556 15.7882V13.5022C24.3556 13.1865 24.0998 12.9307 23.7841 12.9307Z" stroke="white" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
  qualification: (
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3125 6.5625H5.625C5.10723 6.5625 4.6875 6.98223 4.6875 7.5V10.3125C4.6875 10.8303 5.10723 11.25 5.625 11.25H10.3125C10.8303 11.25 11.25 10.8303 11.25 10.3125V7.5C11.25 6.98223 10.8303 6.5625 10.3125 6.5625Z" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.3125 14.0625H5.625C5.10723 14.0625 4.6875 14.4822 4.6875 15V17.8125C4.6875 18.3303 5.10723 18.75 5.625 18.75H10.3125C10.8303 18.75 11.25 18.3303 11.25 17.8125V15C11.25 14.4822 10.8303 14.0625 10.3125 14.0625Z" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.3125 21.5625H5.625C5.10723 21.5625 4.6875 21.9822 4.6875 22.5V25.3125C4.6875 25.8303 5.10723 26.25 5.625 26.25H10.3125C10.8303 26.25 11.25 25.8303 11.25 25.3125V22.5C11.25 21.9822 10.8303 21.5625 10.3125 21.5625Z" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0625 6.5625H25.3125L20.625 13.125V19.6875L18.75 21.5625V13.125L14.0625 6.5625Z" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.4375 25.3125C24.9908 25.3125 26.25 24.0533 26.25 22.5C26.25 20.9467 24.9908 19.6875 23.4375 19.6875C21.8842 19.6875 20.625 20.9467 20.625 22.5C20.625 24.0533 21.8842 25.3125 23.4375 25.3125Z" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0312 22.5L22.9688 23.4375L24.8438 21.5625" stroke="white" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
  requirement: (
<svg width="14" height="20" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8438 0.78125H2.34375C1.48081 0.78125 0.78125 1.48081 0.78125 2.34375V21.0938C0.78125 21.9567 1.48081 22.6562 2.34375 22.6562H14.8438C15.7067 22.6562 16.4062 21.9567 16.4062 21.0938V2.34375C16.4062 1.48081 15.7067 0.78125 14.8438 0.78125Z" stroke="white" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.90625 5.46875H13.2812" stroke="white" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.90625 8.59375H11.7188" stroke="white" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.90625 11.7188H10.1562" stroke="white" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ),
};

// Fallback icon (requirement SVG) if node.icon key is missing
const FALLBACK_ICON = NODE_ICONS.requirement;

function NodeIcon({ type }) {
  return NODE_ICONS[type] ?? FALLBACK_ICON;
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
                      padding:4,
                      height: 30,
                      borderRadius: '50%',
                      background: `linear-gradient(90deg, #1d80f9, #e74f62)`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 2,
                      overflow: 'hidden',
                      
                      color: 'white',
                    }}>
                      <NodeIcon type={node.icon}/>
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
