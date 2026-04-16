const fs = require('fs');

const content = fs.readFileSync('d:/anseru-final/src/components/sections/svg/DesktopHeroSvg.jsx', 'utf8');

// Simple regex to find lines and groups
const lineRegex = /<line[^>]+x1="([\d.]+)"\s+y1="([\d.]+)"\s+x2="([\d.]+)"\s+y2="([\d.]+)"[^>]*>/g;
const groupRegex = /<g\s+className="connected-item[^"]*"[^>]*>[\s\S]*?<rect\s+x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/g;

const lines = [];
let match;
while ((match = lineRegex.exec(content)) !== null) {
  lines.push({
    x1: parseFloat(match[1]),
    y1: parseFloat(match[2]),
    x2: parseFloat(match[3]),
    y2: parseFloat(match[4]),
    full: match[0]
  });
}

const groups = [];
while ((match = groupRegex.exec(content)) !== null) {
  groups.push({
    x: parseFloat(match[1]),
    y: parseFloat(match[2]),
    w: parseFloat(match[3]),
    h: parseFloat(match[4]),
    full: match[0]
  });
}

console.log(`Found ${lines.length} lines and ${groups.length} connected item groups.`);

// Find which lines end near which labels
groups.forEach((g, i) => {
  const cx = g.x + g.w / 2;
  const cy = g.y + g.h / 2;
  
  lines.forEach((l, li) => {
    const dist1 = Math.sqrt((l.x1 - cx)**2 + (l.y1 - cy)**2);
    const dist2 = Math.sqrt((l.x2 - cx)**2 + (l.y2 - cy)**2);
    
    if (dist1 < 50 || dist2 < 50) {
       // console.log(`Group ${i} at (${cx}, ${cy}) is near Line ${li}`);
    }
  });
});
