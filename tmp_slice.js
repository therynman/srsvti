const fs = require('fs');

const path = 'src/app/page.tsx';
let pageLines = fs.readFileSync(path, 'utf8').split('\n');

// Replace lines 37 to 226
const before = pageLines.slice(0, 36);
const after = pageLines.slice(226);

const replacement = [
  '  let mm = gsap.matchMedia();',
  '  // GSAP SCROLL STACKING COMPLETELY REMOVED FOR PURE NATIVE FLOW',
  '  return () => {',
  '  clearTimeout(timer);',
  '  if (mm) mm.revert();',
  '  };',
  '  }, []);'
];

const newContent = [...before, ...replacement, ...after].join('\n');
fs.writeFileSync(path, newContent);

console.log('Deterministic line slice successful.');
