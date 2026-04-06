import { useRef, useEffect } from 'react';
import { RFP_NODES, SVG_CONSTANTS } from '../../data/rfpWorkflow.js';

const { CX, CY, R, NR, NUM_TICKS } = SVG_CONSTANTS;

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildSVG(container) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 150 1100 800');
  svg.style.cssText = 'display:block;width:100%;max-width:1100px;margin:0 auto;padding-top:80px;background:white';

  // defs: gradients + glow filter + arrowhead markers
  const defs = document.createElementNS(ns, 'defs');
  RFP_NODES.forEach((n, i) => {
    const lg = document.createElementNS(ns, 'linearGradient');
    lg.setAttribute('id', `rfpg${i}`);
    lg.setAttribute('x1', '0%');
    lg.setAttribute('y1', '0%');
    lg.setAttribute('x2', '0%');
    lg.setAttribute('y2', '100%');
    [n.g1, n.g2].forEach((color, si) => {
      const s = document.createElementNS(ns, 'stop');
      s.setAttribute('offset', si === 0 ? '0%' : '100%');
      s.setAttribute('stop-color', color);
      lg.appendChild(s);
    });
    defs.appendChild(lg);
  });

  const filt = document.createElementNS(ns, 'filter');
  filt.setAttribute('id', 'rfpglow');
  filt.setAttribute('x', '-50%');
  filt.setAttribute('y', '-50%');
  filt.setAttribute('width', '200%');
  filt.setAttribute('height', '200%');
  const blur = document.createElementNS(ns, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '5');
  blur.setAttribute('result', 'coloredBlur');
  const merge = document.createElementNS(ns, 'feMerge');
  ['coloredBlur', 'SourceGraphic'].forEach((v) => {
    const n = document.createElementNS(ns, 'feMergeNode');
    if (v === 'coloredBlur') n.setAttribute('in', v);
    merge.appendChild(n);
  });
  filt.appendChild(blur);
  filt.appendChild(merge);
  defs.appendChild(filt);

  ['arrow-outer', 'arrow-inner'].forEach((id, i) => {
    const m = document.createElementNS(ns, 'marker');
    m.setAttribute('id', id);
    m.setAttribute('viewBox', '0 0 10 10');
    m.setAttribute('refX', '8');
    m.setAttribute('refY', '5');
    m.setAttribute('markerWidth', '6');
    m.setAttribute('markerHeight', '6');
    m.setAttribute('orient', 'auto-start-reverse');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M 0 1 L 10 5 L 0 9 z');
    p.setAttribute('fill', i === 0 ? '#4f46e5' : '#8b5cf6');
    m.appendChild(p);
    defs.appendChild(m);
  });
  svg.appendChild(defs);

  // Center text
  const t1 = document.createElementNS(ns, 'text');
  t1.setAttribute('x', CX); t1.setAttribute('y', CY - 12);
  t1.setAttribute('font-family', 'DM Sans'); t1.setAttribute('text-anchor', 'middle');
  t1.setAttribute('font-size', '38'); t1.setAttribute('fill', '#111827'); t1.setAttribute('font-weight', '400');
  t1.textContent = 'End-to-End';
  const t2 = document.createElementNS(ns, 'text');
  t2.setAttribute('x', CX); t2.setAttribute('y', CY + 38);
  t2.setAttribute('font-family', 'DM Sans'); t2.setAttribute('text-anchor', 'middle');
  t2.setAttribute('font-size', '48'); t2.setAttribute('fill', '#1C32E6');
  t2.setAttribute('font-weight', '400'); t2.setAttribute('letter-spacing', '-0.5');
  t2.textContent = 'Deal Intelligence';
  svg.appendChild(t1);
  svg.appendChild(t2);

  // Tick marks
  const tickG = document.createElementNS(ns, 'g');
  tickG.setAttribute('opacity', '0.8');
  for (let i = 0; i < NUM_TICKS; i++) {
    const a = (i * 360) / NUM_TICKS;
    const s = polar(CX, CY, R - 2, a), e = polar(CX, CY, R + 2, a);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', s.x); line.setAttribute('y1', s.y);
    line.setAttribute('x2', e.x); line.setAttribute('y2', e.y);
    line.setAttribute('stroke', '#6b7280'); line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-linecap', 'round');
    tickG.appendChild(line);
  }
  svg.appendChild(tickG);

  // Arrow paths
  const outerS = polar(CX, CY, 310, 206), outerE = polar(CX, CY, 310, 234);
  const innerS = polar(CX, CY, 250, 234), innerE = polar(CX, CY, 250, 206);
  const pa1 = document.createElementNS(ns, 'path');
  pa1.setAttribute('d', `M ${outerS.x} ${outerS.y} A 310 310 0 0 1 ${outerE.x} ${outerE.y}`);
  pa1.setAttribute('fill', 'none'); pa1.setAttribute('stroke', '#4f46e5');
  pa1.setAttribute('stroke-width', '1'); pa1.setAttribute('stroke-dasharray', '4 4');
  pa1.setAttribute('marker-end', 'url(#arrow-outer)');
  const pa2 = document.createElementNS(ns, 'path');
  pa2.setAttribute('d', `M ${innerS.x} ${innerS.y} A 250 250 0 0 0 ${innerE.x} ${innerE.y}`);
  pa2.setAttribute('fill', 'none'); pa2.setAttribute('stroke', '#8b5cf6');
  pa2.setAttribute('stroke-width', '1'); pa2.setAttribute('stroke-dasharray', '4 4');
  pa2.setAttribute('marker-end', 'url(#arrow-inner)');
  svg.appendChild(pa1);
  svg.appendChild(pa2);

  // Nodes
  const nodeGroups = RFP_NODES.map((node, i) => {
    const p = polar(CX, CY, R, node.angle);
    const g = document.createElementNS(ns, 'g');

    const glow = document.createElementNS(ns, 'circle');
    glow.setAttribute('cx', p.x); glow.setAttribute('cy', p.y);
    glow.setAttribute('r', NR + 10); glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', node.g1); glow.setAttribute('stroke-width', '3');
    glow.setAttribute('opacity', '0');
    glow.style.transition = 'all 0.6s ease-in-out';

    const mask = document.createElementNS(ns, 'circle');
    mask.setAttribute('cx', p.x); mask.setAttribute('cy', p.y);
    mask.setAttribute('r', NR); mask.setAttribute('fill', '#f8f9fa');
    mask.style.transition = 'all 0.6s ease-in-out';

    const ball = document.createElementNS(ns, 'circle');
    ball.setAttribute('cx', p.x); ball.setAttribute('cy', p.y);
    ball.setAttribute('r', NR); ball.setAttribute('fill', `url(#rfpg${i})`);
    ball.setAttribute('opacity', '0.4');
    ball.style.transition = 'all 0.6s ease-in-out';

    const words = node.desc.split(' ');
    const mid = Math.ceil(words.length / 2);
    const tg = document.createElementNS(ns, 'g');
    tg.setAttribute('transform', `translate(${p.x + node.tx},${p.y + node.ty})`);
    tg.style.transition = 'opacity 0.6s ease-in-out';
    tg.style.opacity = '0.6';

    const titleT = document.createElementNS(ns, 'text');
    titleT.setAttribute('x', '0'); titleT.setAttribute('y', '0');
    titleT.setAttribute('font-size', '14'); titleT.setAttribute('fill', '#111827');
    titleT.setAttribute('font-weight', '400');
    titleT.textContent = node.title;

    const d1 = document.createElementNS(ns, 'text');
    d1.setAttribute('x', '0'); d1.setAttribute('y', '22');
    d1.setAttribute('font-size', '13'); d1.setAttribute('fill', '#6b7280');
    d1.setAttribute('dominant-baseline', 'middle');
    d1.textContent = words.slice(0, mid).join(' ');

    const d2 = document.createElementNS(ns, 'text');
    d2.setAttribute('x', '0'); d2.setAttribute('y', '40');
    d2.setAttribute('font-size', '13'); d2.setAttribute('fill', '#6b7280');
    d2.setAttribute('dominant-baseline', 'middle');
    d2.textContent = words.slice(mid).join(' ');

    tg.appendChild(titleT); tg.appendChild(d1); tg.appendChild(d2);
    g.appendChild(glow); g.appendChild(mask); g.appendChild(ball); g.appendChild(tg);
    svg.appendChild(g);
    return { glow, mask, ball, tg };
  });

  container.appendChild(svg);
  return nodeGroups;
}

export function RFPWorkflowDiagram() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodeGroups = buildSVG(container);

    function updateNodes(idx) {
      nodeGroups.forEach((ng, i) => {
        const isActive = i === idx;
        ng.glow.setAttribute('r', isActive ? NR + 14 : NR + 10);
        ng.glow.setAttribute('opacity', isActive ? '0.6' : '0');
        ng.mask.setAttribute('r', isActive ? NR + 4 : NR);
        ng.ball.setAttribute('r', isActive ? NR + 4 : NR);
        ng.ball.setAttribute('opacity', isActive ? '1' : '0.4');
        ng.tg.style.opacity = isActive ? '1' : '0.6';
      });
    }

    updateNodes(0);
    let activeNode = 0;
    const intervalId = setInterval(() => {
      activeNode = (activeNode + 1) % RFP_NODES.length;
      updateNodes(activeNode);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className=" bg-white mx-auto block w-full max-w-275"
    />
  );
}
