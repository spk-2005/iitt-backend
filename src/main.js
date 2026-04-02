import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Asset imports ────────────────────────────────────────────────────────────
import noiseSrc from "./assets/noise.png";
import vectorSrc from "./assets/Vector copy.png";
const anseruIconSrc = vectorSrc; // same file, used as center watermark

function applyAssets() {
  document.querySelectorAll(".noise-overlay").forEach((el) => {
    el.style.backgroundImage = `url(${noiseSrc})`;
    el.style.backgroundSize = "200px 200px";
  });
}


// ── Carousel ──────────────────────────────────────────────────────────────────
const SLIDE_COUNT = 4;

/**
 * Update both sets of indicator buttons (mobile + desktop) to reflect
 * the currently active slide index.
 */
function updateCarouselIndicators(activeSlide) {
  ["carousel-indicators-mobile", "carousel-indicators-desktop"].forEach((id) => {
    const container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll(".carousel-ind-btn").forEach((btn) => {
      const isActive = Number(btn.dataset.idx) === activeSlide;
      btn.className = `carousel-ind-btn text-[13px] sm:text-[15px] font-medium transition-colors cursor-pointer px-3 sm:px-4 py-2 rounded-full ${
        isActive ? "text-black bg-gray-100" : "text-gray-400 hover:text-gray-600"
      }`;
    });
  });
}

/**
 * Update the dot indicators below the mobile scroll carousel.
 */
function updateMobileDots(activeSlide) {
  const container = document.getElementById("carousel-dots-mobile");
  if (!container) return;
  container.querySelectorAll(".carousel-dot").forEach((dot) => {
    const isActive = Number(dot.dataset.dot) === activeSlide;
    dot.className = `carousel-dot rounded-full transition-all duration-300 ${
      isActive ? "w-5 h-2 bg-gray-700" : "w-2 h-2 bg-gray-300"
    }`;
  });
}

// ── Mobile carousel (scroll-snap track) ──────────────────────────────────────
function initMobileCarousel() {
  const track = document.getElementById("carousel-mobile-track");
  if (!track) return;

  let currentSlide = 0;

  // Scroll to a given slide index by moving the track's scroll position
  function goToSlide(index) {
    index = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  // Keep indicators in sync as the user scrolls (or snaps)
  track.addEventListener(
    "scroll",
    () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      if (idx !== currentSlide) {
        currentSlide = idx;
        updateCarouselIndicators(idx);
        updateMobileDots(idx);
      }
    },
    { passive: true }
  );

  // Wire up the pill indicator buttons (Connect / Upload / Respond / Approve)
  const mobileIndicators = document.getElementById("carousel-indicators-mobile");
  if (mobileIndicators) {
    mobileIndicators.querySelectorAll(".carousel-ind-btn").forEach((btn) => {
      btn.addEventListener("click", () => goToSlide(Number(btn.dataset.idx)));
    });
  }

  // Wire up the dot buttons below the track
  const dotsContainer = document.getElementById("carousel-dots-mobile");
  if (dotsContainer) {
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.addEventListener("click", () => goToSlide(Number(dot.dataset.dot)));
    });
  }

  // Paint the initial state
  updateCarouselIndicators(0);
  updateMobileDots(0);
}

// ── Desktop carousel (sticky horizontal scroll strip) ────────────────────────
function initDesktopCarousel() {
  const container = document.getElementById("carousel-desktop");
  const strip = document.getElementById("carousel-strip");
  if (!container || !strip) return;

  // Scroll the strip programmatically when a pill button is clicked
  function goToSlide(index) {
    index = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    strip.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
  }

  // Update indicators as the strip scrolls
  strip.addEventListener(
    "scroll",
    () => {
      const scrollLeft = strip.scrollLeft;
      const activeSlide = Math.round(scrollLeft / window.innerWidth);
      updateCarouselIndicators(activeSlide);

      // Progress bars (if present)
      for (let i = 0; i < SLIDE_COUNT; i++) {
        const fillBar = document.getElementById(`prog-${i}`);
        if (fillBar) {
          const fill = Math.max(0, Math.min(1, scrollLeft / window.innerWidth - i));
          fillBar.style.width = `${fill * 100}%`;
        }
      }
    },
    { passive: true }
  );

  // Wire up the desktop pill indicator buttons
  const desktopIndicators = document.getElementById("carousel-indicators-desktop");
  if (desktopIndicators) {
    desktopIndicators.querySelectorAll(".carousel-ind-btn").forEach((btn) => {
      btn.addEventListener("click", () => goToSlide(Number(btn.dataset.idx)));
    });
  }

  // Expose for any inline onclick usage
  window.scrollToDesktopSlide = goToSlide;

  // Paint initial state
  strip.dispatchEvent(new Event("scroll"));
}

function offsetHero() {
  const navbar = document.getElementById('navbar');
  const heroContent = document.getElementById('hero-content');
  if (navbar && heroContent) {
    const navH = navbar.offsetHeight;
    heroContent.style.top = navH + 'px';
    heroContent.style.bottom = '0';
  }
}
document.addEventListener('DOMContentLoaded', offsetHero);
window.addEventListener('resize', offsetHero);

// ── Two Agents ────────────────────────────────────────────────────────────────
window.switchAgent = function (name) {
  document
    .getElementById("mobile-agent-archer")
    .classList.toggle("hidden", name !== "archer");
  document
    .getElementById("mobile-agent-knox")
    .classList.toggle("hidden", name !== "knox");
  ["archer", "knox"].forEach((a) => {
    const tab = document.getElementById(`tab-${a}`);
    const icon = tab.querySelector("img");
    if (a === name) {
      tab.className = tab.className.replace(
        "bg-transparent text-black hover:bg-gray-200",
        "bg-black text-white",
      );
      icon.classList.add("brightness-0", "invert");
    } else {
      tab.className = tab.className.replace(
        "bg-black text-white",
        "bg-transparent text-black hover:bg-gray-200",
      );
      icon.classList.remove("brightness-0", "invert");
    }
  });
};

function initDesktopTwoAgents() {
  const strip = document.getElementById("two-agents-strip");
  if (!strip) return;

  let activeAgent = 0;

  function updateDesktopTabs(idx) {
    ["archer", "knox"].forEach((name, i) => {
      const tab = document.getElementById(`desk-tab-${name}`);
      const icon = tab.querySelector("img");
      if (i === idx) {
        tab.className = tab.className.replace(
          "bg-transparent text-black hover:bg-gray-200",
          "bg-black text-white",
        );
        icon.classList.add("brightness-0", "invert");
      } else {
        tab.className = tab.className.replace(
          "bg-black text-white",
          "bg-transparent text-black hover:bg-gray-200",
        );
        icon.classList.remove("brightness-0", "invert");
      }
    });
  }

  window.desktopGoToAgent = function (index) {
    const cont = document.getElementById("two-agents-desktop");
    if (!cont) return;
    window.scrollTo({
      top: cont.offsetTop + index * window.innerHeight,
      behavior: "smooth",
    });
  };

  const cont = document.getElementById("two-agents-desktop");
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: cont,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        gsap.set(strip, { xPercent: -self.progress * 50 });
        const idx = Math.round(self.progress);
        if (idx !== activeAgent) {
          activeAgent = idx;
          updateDesktopTabs(idx);
        }
      },
    });
  });
}

// ── RFP Workflow SVG ─────────────────────────────────────────────────────────
const rfpNodes = [



  
  { title: 'Proposal Architecture', desc: 'Generate a structured proposal outline and response flow.', angle: 0, tx: -100, ty: -85, g1: '#6DA8EF', g2: '#F3E21F' },
  { title: 'First Winnable Draft', desc: 'Generate contextual first drafts using enterprise knowledge.', angle: 40, tx: 35, ty: -65, g1: '#320a6a', g2: '#5713d0' },
  { title: 'SME Collaboration', desc: 'Route complex responses to subject matter experts for review.', angle: 80, tx: 43, ty: -25, g1: '#201CAE', g2: '#6AA4EE' },
  { title: 'Final Proposal', desc: 'Deliver a polished proposal ready for submission.', angle: 120, tx: 45, ty: -10, g1: '#fe3f49', g2: '#49abf5' },
  { title: 'Win–Loss Capture', desc: 'Capture deal outcomes and key insights automatically.', angle: 160, tx: 40, ty: 20, g1: '#6DA8EF', g2: '#F3E21F' },
  { title: 'Smarter Next Deal', desc: 'Feed insights back to improve future responses iteratively.', angle: 200, tx: -95, ty: 38, g1: '#fe3f49', g2: '#49abf5' },
  { title: 'RFP Decomposition', desc: 'Break complex RFPs and extract key requirements into structured sections.', angle: 240, tx: -270, ty: -5, g1: '#367AE6', g2: '#CE5575' },
  { title: 'Deal Qualification', desc: 'Evaluate fit, assess win probability, and decide whether to pursue.', angle: 280, tx: -240, ty: -30, g1: '#201CAE', g2: '#6AA4EE' },
  { title: 'Requirement Intelligence', desc: 'Categorize questions, tag by topic, and route to the right teams.', angle: 320, tx: -220, ty: -70, g1: '#367AE6', g2: '#CE5575' },
];

const CX = 550, CY = 530, R = 280, NR = 22, NUM_TICKS = 400;

function polar(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildRFPWorkflow() {
  const container = document.getElementById('rfp-workflow-svg-container');
  if (!container) return;

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 150 1100 800');
  svg.style.cssText = 'display:block;width:100%;max-width:1100px;margin:0 auto;background:white;';

  function polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // ── defs ──────────────────────────────────────────────────────────────────
  const defs = document.createElementNS(ns, 'defs');

  // Node gradients
  rfpNodes.forEach((n, i) => {
    const lg = document.createElementNS(ns, 'linearGradient');
    lg.setAttribute('id', `rfpg${i}`);
    lg.setAttribute('x1', '0%'); lg.setAttribute('y1', '0%');
    lg.setAttribute('x2', '0%'); lg.setAttribute('y2', '100%');
    ['stop', 'stop'].forEach((_, si) => {
      const s = document.createElementNS(ns, 'stop');
      s.setAttribute('offset', si === 0 ? '0%' : '100%');
      s.setAttribute('stop-color', si === 0 ? n.g1 : n.g2);
      lg.appendChild(s);
    });
    defs.appendChild(lg);
  });

  // Blue text gradient for "Deal Intelligence"
  const textGrad = document.createElementNS(ns, 'linearGradient');
  textGrad.setAttribute('id', 'centerTextGrad');
  textGrad.setAttribute('x1', '0%'); textGrad.setAttribute('y1', '0%');
  textGrad.setAttribute('x2', '100%'); textGrad.setAttribute('y2', '0%');
  [['0%', '#1C32E6'], ['50%', '#4A6CF7'], ['100%', '#1C32E6']].forEach(([offset, color]) => {
    const s = document.createElementNS(ns, 'stop');
    s.setAttribute('offset', offset);
    s.setAttribute('stop-color', color);
    textGrad.appendChild(s);
  });
  defs.appendChild(textGrad);

  // Clip circle — keeps everything inside the tick ring
  const clipCircle = document.createElementNS(ns, 'clipPath');
  clipCircle.setAttribute('id', 'centerClip');
  const clipC = document.createElementNS(ns, 'circle');
  clipC.setAttribute('cx', CX); clipC.setAttribute('cy', CY);
  clipC.setAttribute('r', String(R - 8));
  clipCircle.appendChild(clipC);
  defs.appendChild(clipCircle);

  // Radial glow behind the icon — soft blue halo
  const iconGlowGrad = document.createElementNS(ns, 'radialGradient');
  iconGlowGrad.setAttribute('id', 'iconGlowGrad');
  iconGlowGrad.setAttribute('cx', '50%'); iconGlowGrad.setAttribute('cy', '50%');
  iconGlowGrad.setAttribute('r', '50%');
  [
    ['0%',   '#2C48DB', '0.22'],
    ['45%',  '#1C32E6', '0.10'],
    ['100%', '#1C32E6', '0.0'],
  ].forEach(([offset, color, opacity]) => {
    const s = document.createElementNS(ns, 'stop');
    s.setAttribute('offset', offset);
    s.setAttribute('stop-color', color);
    s.setAttribute('stop-opacity', opacity);
    iconGlowGrad.appendChild(s);
  });
  defs.appendChild(iconGlowGrad);

  // Arrow markers
  ['arrow-outer', 'arrow-inner'].forEach((id, i) => {
    const m = document.createElementNS(ns, 'marker');
    m.setAttribute('id', id);
    m.setAttribute('viewBox', '0 0 10 10');
    m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
    m.setAttribute('markerWidth', '6'); m.setAttribute('markerHeight', '6');
    m.setAttribute('orient', 'auto-start-reverse');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M 0 1 L 10 5 L 0 9 z');
    p.setAttribute('fill', i === 0 ? '#4f46e5' : '#8b5cf6');
    m.appendChild(p);
    defs.appendChild(m);
  });

  svg.appendChild(defs);

  // ── Tick ring ─────────────────────────────────────────────────────────────
  const tickG = document.createElementNS(ns, 'g');
  tickG.setAttribute('opacity', '0.8');
  for (let i = 0; i < NUM_TICKS; i++) {
    const a = (i * 360) / NUM_TICKS;
    const s = polar(CX, CY, R - 2, a), e = polar(CX, CY, R + 2, a);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', s.x); line.setAttribute('y1', s.y);
    line.setAttribute('x2', e.x); line.setAttribute('y2', e.y);
    line.setAttribute('stroke', '#6b7280');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-linecap', 'round');
    tickG.appendChild(line);
  }
  svg.appendChild(tickG);

  // ── Arc feedback arrows ───────────────────────────────────────────────────
  const outerS = polar(CX, CY, 310, 206), outerE = polar(CX, CY, 310, 234);
  const innerS = polar(CX, CY, 250, 234), innerE = polar(CX, CY, 250, 206);

  const pa1 = document.createElementNS(ns, 'path');
  pa1.setAttribute('d', `M ${outerS.x} ${outerS.y} A 310 310 0 0 1 ${outerE.x} ${outerE.y}`);
  pa1.setAttribute('fill', 'none');
  pa1.setAttribute('stroke', '#4f46e5');
  pa1.setAttribute('stroke-width', '1');
  pa1.setAttribute('stroke-dasharray', '4 4');
  pa1.setAttribute('marker-end', 'url(#arrow-outer)');
  svg.appendChild(pa1);

  const pa2 = document.createElementNS(ns, 'path');
  pa2.setAttribute('d', `M ${innerS.x} ${innerS.y} A 250 250 0 0 0 ${innerE.x} ${innerE.y}`);
  pa2.setAttribute('fill', 'none');
  pa2.setAttribute('stroke', '#8b5cf6');
  pa2.setAttribute('stroke-width', '1');
  pa2.setAttribute('stroke-dasharray', '4 4');
  pa2.setAttribute('marker-end', 'url(#arrow-inner)');
  svg.appendChild(pa2);

  // ── CENTER: soft radial glow disc ─────────────────────────────────────────
  const glowDisc = document.createElementNS(ns, 'circle');
  glowDisc.setAttribute('cx', CX);
  glowDisc.setAttribute('cy', CY);
  glowDisc.setAttribute('r', String(R - 8));
  glowDisc.setAttribute('fill', 'url(#iconGlowGrad)');
  glowDisc.setAttribute('clip-path', 'url(#centerClip)');
  svg.appendChild(glowDisc);

  // ── CENTER: Anseru icon as large faint watermark drop ─────────────────────
  // Fill the inner circle — icon is 1.6× the inner radius so it bleeds edge-to-edge
  const iconSize = (R - 8) * 1.6;
  const iconImg = document.createElementNS(ns, 'image');
  iconImg.setAttribute('href', anseruIconSrc);
  iconImg.setAttribute('x', String(CX - iconSize / 2));
  iconImg.setAttribute('y', String(CY - iconSize / 2));
  iconImg.setAttribute('width', String(iconSize));
  iconImg.setAttribute('height', String(iconSize));
  iconImg.setAttribute('opacity', '0.08');   // faint but visible as a drop shape
  iconImg.setAttribute('clip-path', 'url(#centerClip)');
  iconImg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.appendChild(iconImg);

  // ── CENTER TEXT ───────────────────────────────────────────────────────────
  const centerGroup = document.createElementNS(ns, 'g');

  const line1 = document.createElementNS(ns, 'text');
  line1.setAttribute('x', String(CX));
  line1.setAttribute('y', String(CY - 32));
  line1.setAttribute('text-anchor', 'middle');
  line1.setAttribute('dominant-baseline', 'central');
  line1.setAttribute('font-family', '"DM Sans", sans-serif');
  line1.setAttribute('font-size', '46');
  line1.setAttribute('font-weight', '400');
  line1.setAttribute('letter-spacing', '-1.5');
  line1.setAttribute('fill', '#111827');
  line1.textContent = 'End-to-End';

  const line2 = document.createElementNS(ns, 'text');
  line2.setAttribute('x', String(CX));
  line2.setAttribute('y', String(CY + 34));
  line2.setAttribute('text-anchor', 'middle');
  line2.setAttribute('dominant-baseline', 'central');
  line2.setAttribute('font-family', '"DM Sans", sans-serif');
  line2.setAttribute('font-size', '54');
  line2.setAttribute('font-weight', '500');
  line2.setAttribute('letter-spacing', '-2');
  line2.setAttribute('fill', 'url(#centerTextGrad)');
  line2.textContent = 'Deal Intelligence';

  centerGroup.appendChild(line1);
  centerGroup.appendChild(line2);
  svg.appendChild(centerGroup);

 // ── NODES ─────────────────────────────────────────────────────────────────
  const nodeGroups = rfpNodes.map((node, i) => {
    const p = polar(CX, CY, R, node.angle);
    const g = document.createElementNS(ns, 'g');

    const glow = document.createElementNS(ns, 'circle');
    glow.setAttribute('cx', p.x); glow.setAttribute('cy', p.y);
    glow.setAttribute('r', String(NR + 10));
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', node.g1);
    glow.setAttribute('stroke-width', '3');
    glow.setAttribute('opacity', '0');
    glow.style.transition = 'all 0.6s ease-in-out';

    const mask = document.createElementNS(ns, 'circle');
    mask.setAttribute('cx', p.x); mask.setAttribute('cy', p.y);
    mask.setAttribute('r', String(NR));
    mask.setAttribute('fill', '#f8f9fa');
    mask.style.transition = 'all 0.6s ease-in-out';

    const ball = document.createElementNS(ns, 'circle');
    ball.setAttribute('cx', p.x); ball.setAttribute('cy', p.y);
    ball.setAttribute('r', String(NR));
    ball.setAttribute('fill', `url(#rfpg${i})`);
    ball.setAttribute('opacity', '0.4');
    ball.style.transition = 'all 0.6s ease-in-out';

    const tg = document.createElementNS(ns, 'g');
    tg.setAttribute('transform', `translate(${p.x + node.tx}, ${p.y + node.ty})`);
    tg.style.transition = 'opacity 0.6s ease-in-out';
    tg.style.opacity = '0.6';

    // ── Title only — no description ──────────────────────────────────────
    // Use larger font; wrap to 2 lines if title > 16 chars
    const CHAR_LIMIT = 16;
    const titleFontSize = 34;
    const lineHeight = 44;

    const titleWords = node.title.split(' ');
    const titleT = document.createElementNS(ns, 'text');
    titleT.setAttribute('font-size', String(titleFontSize));
    titleT.setAttribute('fill', '#111827');
    titleT.setAttribute('font-weight', '500');
    titleT.setAttribute('font-family', '"DM Sans", sans-serif');

    if (node.title.length <= CHAR_LIMIT) {
      // Single line — vertically center on node
      titleT.setAttribute('x', '0');
      titleT.setAttribute('y', '0');
      const span = document.createElementNS(ns, 'tspan');
      span.setAttribute('x', '0');
      span.setAttribute('dy', '0');
      span.textContent = node.title;
      titleT.appendChild(span);
    } else {
      // Split into 2 lines at the natural word boundary closest to the middle
      let splitIdx = 1;
      let bestDiff = Infinity;
      for (let w = 1; w < titleWords.length; w++) {
        const line1Len = titleWords.slice(0, w).join(' ').length;
        const line2Len = titleWords.slice(w).join(' ').length;
        const diff = Math.abs(line1Len - line2Len);
        if (diff < bestDiff) { bestDiff = diff; splitIdx = w; }
      }
      const l1 = titleWords.slice(0, splitIdx).join(' ');
      const l2 = titleWords.slice(splitIdx).join(' ');

      // Offset upward by half a line so both lines stay centered on the node
      titleT.setAttribute('x', '0');
      titleT.setAttribute('y', String(-lineHeight / 2));

      const span1 = document.createElementNS(ns, 'tspan');
      span1.setAttribute('x', '0');
      span1.setAttribute('dy', '0');
      span1.textContent = l1;

      const span2 = document.createElementNS(ns, 'tspan');
      span2.setAttribute('x', '0');
      span2.setAttribute('dy', String(lineHeight));
      span2.textContent = l2;

      titleT.appendChild(span1);
      titleT.appendChild(span2);
    }

    tg.appendChild(titleT);
    g.appendChild(glow); g.appendChild(mask); g.appendChild(ball); g.appendChild(tg);
    svg.appendChild(g);

    return { glow, mask, ball, tg };
  });
  container.appendChild(svg);

  // ── Active node cycling ───────────────────────────────────────────────────
  let activeNode = 0;
  function updateNodes(idx) {
    nodeGroups.forEach((ng, i) => {
      const isActive = i === idx;
      ng.glow.setAttribute('r', isActive ? String(NR + 14) : String(NR + 10));
      ng.glow.setAttribute('opacity', isActive ? '0.65' : '0');
      ng.mask.setAttribute('r', isActive ? String(NR + 4) : String(NR));
      ng.ball.setAttribute('r', isActive ? String(NR + 4) : String(NR));
      ng.ball.setAttribute('opacity', isActive ? '1' : '0.4');
      ng.tg.style.opacity = isActive ? '1' : '0.6';
    });
  }
  updateNodes(0);
  setInterval(() => {
    activeNode = (activeNode + 1) % rfpNodes.length;
    updateNodes(activeNode);
  }, 2000);
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function initFAQ() {
  let openIndex = null;
  const items = document.querySelectorAll(".faq-item");
  
  items.forEach((item, idx) => {
    item._idx = idx; 
    item.querySelector(".faq-trigger").addEventListener("click", () => {
      const isOpen = openIndex === idx;
      
      if (openIndex !== null && openIndex !== idx) {
        const prev = items[openIndex];
        const prevAns = prev.querySelector(".faq-answer");
        const prevInner = prevAns.firstElementChild;
        
        const curW = prev.getBoundingClientRect().width;
        prev.style.transition = "none";
        prev.style.width = "fit-content";
        const targetW = prev.getBoundingClientRect().width;
        prev.style.width = curW + "px";
        
        prevAns.style.transition = "none";
        prevAns.style.maxHeight = prevAns.scrollHeight + "px";
        
        if (prevInner) prevInner.style.width = curW + "px";
        
        prev.offsetHeight;
        
        prev.style.transition = "width 0.4s cubic-bezier(0.04,0.62,0.23,0.98)";
        prevAns.style.transition = "max-height 0.4s cubic-bezier(0.04,0.62,0.23,0.98), opacity 0.3s ease";
        prev.style.width = targetW + "px";
        prevAns.style.maxHeight = "0px";
        prevAns.style.opacity = "0";
        prev.querySelector(".faq-icon").textContent = "+";
        
        setTimeout(() => {
          if (openIndex !== prev._idx) {
             prev.style.width = "";
             if (prevInner) prevInner.style.width = "";
          }
        }, 400);
      }
      
      openIndex = isOpen ? null : idx;
      const ans = item.querySelector(".faq-answer");
      const inner = ans.firstElementChild;
      
      if (!isOpen) {
        const curW = item.getBoundingClientRect().width;
        
        item.style.transition = "none";
        ans.style.transition = "none";
        item.style.width = "100%";
        ans.style.maxHeight = "none";
        if (inner) inner.style.width = "";
        
        const targetW = item.getBoundingClientRect().width;
        const targetH = ans.scrollHeight;
        
        item.style.width = curW + "px";
        ans.style.maxHeight = "0px";
        
        if (inner) inner.style.width = targetW + "px";
        item.offsetHeight;
        
        item.style.transition = "width 0.4s cubic-bezier(0.04,0.62,0.23,0.98)";
        ans.style.transition = "max-height 0.4s cubic-bezier(0.04,0.62,0.23,0.98), opacity 0.4s ease";
        item.style.width = targetW + "px";
        ans.style.maxHeight = targetH + "px";
        ans.style.opacity = "1";
        item.querySelector(".faq-icon").textContent = "−";
        
        setTimeout(() => {
          if (openIndex === idx) {
            item.style.width = "100%";
            ans.style.maxHeight = "1500px";
            if (inner) inner.style.width = "";
          }
        }, 400);
        
      } else {
        const curW = item.getBoundingClientRect().width;
        
        item.style.transition = "none";
        item.style.width = "fit-content";
        const targetW = item.getBoundingClientRect().width;
        item.style.width = curW + "px";
        
        ans.style.transition = "none";
        ans.style.maxHeight = ans.scrollHeight + "px";
        if (inner) inner.style.width = curW + "px";
        
        item.offsetHeight;
        
        item.style.transition = "width 0.4s cubic-bezier(0.04,0.62,0.23,0.98)";
        ans.style.transition = "max-height 0.4s cubic-bezier(0.04,0.62,0.23,0.98), opacity 0.3s ease";
        
        item.style.width = targetW + "px";
        ans.style.maxHeight = "0px";
        ans.style.opacity = "0";
        item.querySelector(".faq-icon").textContent = "+";
        
        setTimeout(() => {
          if (openIndex !== idx) {
            item.style.width = "";
            if (inner) inner.style.width = "";
          }
        }, 400);
      }
    });
  });
}

// ── Features hover expand ─────────────────────────────────────────────────────
function initFeatures() {
  const cards = document.querySelectorAll(".feature-card");
  const isPointer = () => window.matchMedia("(hover: hover)").matches;
  cards.forEach((card, idx) => {
    function activate() {
      if (!isPointer()) return;
      cards.forEach((c, i) => {
        const isThis = i === idx;
        c.style.flex = isThis ? "2" : "1";
        const s = c.querySelector(".feature-short");
        const l = c.querySelector(".feature-long");
        const b = c.querySelector(".feature-bullets");
        const t = c.querySelector(".feature-text");
        if (s) s.classList.toggle("hidden", isThis);
        if (l) l.classList.toggle("hidden", !isThis);
        if (b) {
          b.style.gridTemplateRows = isThis ? "1fr" : "0fr";
          b.style.opacity = isThis ? "1" : "0";
          b.style.marginTop = isThis ? "1.5rem" : "0";
        }
        if (t) {
          if (isThis) t.classList.add("pl-12", "md:pl-16");
          else t.classList.remove("pl-12", "md:pl-16");
        }
      });
    }
    function deactivate() {
      if (!isPointer()) return;
      cards.forEach((c) => {
        c.style.flex = "1";
        const s = c.querySelector(".feature-short");
        const l = c.querySelector(".feature-long");
        const b = c.querySelector(".feature-bullets");
        const t = c.querySelector(".feature-text");
        if (s) s.classList.remove("hidden");
        if (l) l.classList.add("hidden");
        if (b) {
          b.style.gridTemplateRows = "0fr";
          b.style.opacity = "0";
          b.style.marginTop = "0";
        }
        if (t) t.classList.remove("pl-12", "md:pl-16");
      });
    }
    card.addEventListener("mouseenter", activate);
    card.addEventListener("mouseleave", deactivate);
  });
}

// ── Navbar mobile menu ────────────────────────────────────────────────────────
function initNavbar() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  if (!btn || !menu || !iconOpen || !iconClose) return;
  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    iconOpen.classList.toggle("hidden", !isOpen);
    iconClose.classList.toggle("hidden", isOpen);
  });
}

window.closeMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  if (menu) menu.classList.add("hidden");
  if (iconOpen) iconOpen.classList.remove("hidden");
  if (iconClose) iconClose.classList.add("hidden");
};

// ── Section scroll helper ─────────────────────────────────────────────────────
window.scrollToSection = function (id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// ── Problem section gap elimination ──────────────────────────────────────────
function eliminateGap() {
  const pSection = document.getElementById("problem");
  const pMobileGsap = document.getElementById("problem-mobile-gsap");
  const hSection = document.getElementById("how-it-works");

  if (!pMobileGsap || !hSection) return;

  const stickyContent = pMobileGsap.querySelector(".sticky");
  if (!stickyContent) return;

  // Reset to calculate cleanly
  hSection.style.marginTop = "0px";
  hSection.style.paddingTop = "0px";

  // Only apply if we are on mobile where the 150vh layout is active
  if (window.innerWidth >= 768) return;

  const problemHeight = pMobileGsap.offsetHeight;
  const stickyHeight = stickyContent.offsetHeight;
  const gap = problemHeight - stickyHeight;

  if (gap > 0) {
    // We add margin-top to pull How It Works up so there is no gap.
    // We add padding-top so its background covers the gap, but its content starts right below the sticky element.
    hSection.style.marginTop = `-${gap}px`;
    hSection.style.paddingTop = `${gap}px`;
    
    // Ensure layering is correct (Problem on top during scroll)
    if (pSection) pSection.style.position = "relative";
    if (pSection) pSection.style.zIndex = "10";
    hSection.style.position = "relative";
    hSection.style.zIndex = "5";
  }
}

// ── Problem section scroll animation ───────────────────────────────────────
function initProblemCarousel() {
  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      const parentWrap = document.getElementById("problem-how-wrapper");
      const pinTarget = document.getElementById("problem-pin-target");
      const track = document.getElementById("problem-carousel-track");
      if (!parentWrap || !pinTarget || !track) return;

      setTimeout(() => {
        const maxScrollDist = track.scrollWidth - window.innerWidth + 32;

        gsap.to(track, {
          x: () => -maxScrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: parentWrap,
            start: "top top",
            end: () => `+=${maxScrollDist * 2}`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / 2,
              duration: 0.3,
              delay: 0.1,
              ease: "power1.inOut"
            }
          }
        });
      }, 50);
    }
  });
}
function getSlideWidth() {
  const wrapper = document.getElementById('prob-track-wrapper');
  return wrapper ? wrapper.offsetWidth : window.innerWidth;
}

function goToSlide(idx) {
  idx = Math.max(0, Math.min(SLIDES - 1, idx));
  currentIdx = idx;
  const slideWidth = getSlideWidth();
  pTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  pTrack.style.transform = `translateX(-${idx * slideWidth}px)`;
  updateDots(idx);
}

window.addEventListener('resize', () => goToSlide(currentIdx));

// ── 3D flip cards ────────────────────────────────────────────────────────────
function initFlipCards() {
  document.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
}

// ── Workflow Section Animations ────────────────────────────────────────────────
function initWorkflowHeaderAnimations() {
  const items = document.querySelectorAll(".workflow-anim-item");
  const container = document.getElementById("workflow-header-container");

  if (!items.length || !container) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  tl.to(items[0], {
    y: 0, opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  })
  .to(items[1], {
    y: 0, opacity: 1,
    duration: 1.0,
    ease: "expo.out"
  }, "-=0.3")
  .to(items[2], {
    y: 0, opacity: 1,
    duration: 0.7,
    ease: "power2.out"
  }, "-=0.5");
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  applyAssets();
  initNavbar();
  initFlipCards();
  initProblemCarousel();
  
  // Call gap eliminator on load and resize
  eliminateGap();
  window.addEventListener("resize", eliminateGap);

  initMobileCarousel();
  initDesktopCarousel();
  initDesktopTwoAgents();
  buildRFPWorkflow();
  initWorkflowHeaderAnimations();
  initFAQ();
  initFeatures();
});