import { useState, useEffect } from 'react';

function getDesktopSize(w, h) {
  // Card column is 7fr of a 5fr+7fr grid inside max-1300px container
  // Effective card column width at each breakpoint (accounting for px-8/xl:px-16 padding)
  const containerWidth = Math.min(w, 1300);
  const horizontalPadding = w >= 1280 ? 128 : 64; // xl:px-16 = 64px each side, px-8 = 32px each side
  const gridWidth = containerWidth - horizontalPadding;
  const cardColumnWidth = (gridWidth * 7) / 12; // 7fr of 12fr total (5+7)

  // Image width: percentage of card column, gets relatively narrower as card gets very wide
  let widthPct;
  if (cardColumnWidth >= 650) widthPct = 68;
  else if (cardColumnWidth >= 550) widthPct = 70;
  else if (cardColumnWidth >= 450) widthPct = 72;
  else widthPct = 74;

  // Available card height = viewport height minus sticky header (~200px: section header + tabs + py-5)
  const cardHeight = h - 200;

  // Image height: fills most of card height, leaving ~80px for the card's <h2> header block
  // Clamped so it never gets too small (short screens) or absurdly tall (ultra-tall screens)
  const imgHeight = Math.min(Math.max(cardHeight - 80, 180), Math.round(h * 0.62));

  // Further scale down width on short screens so image doesn't feel too wide vs its height
  const aspectAdjustedWidth = h < 750 ? Math.max(widthPct - 6, 58) : widthPct;

  return {
    width: `${aspectAdjustedWidth}%`,
    height: `${imgHeight}px`,
  };
}

export function useCardImageSize() {
  const [size, setSize] = useState(() =>
    typeof window !== 'undefined'
      ? getDesktopSize(window.innerWidth, window.innerHeight)
      : { width: '80%', height: '520px' }
  );

  useEffect(() => {
    function update() {
      setSize(getDesktopSize(window.innerWidth, window.innerHeight));
    }
    update(); // run once on mount in case SSR default differs
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}