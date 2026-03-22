const fs = require('fs');

// Current top padding pattern: pt-[clamp(80px,8vw,140px)]
// New: pt-[clamp(100px,10vw,180px)] — significantly more breathing space

const files = [
  'src/app/page.tsx',
  'src/components/VideoSection.tsx',
  'src/components/MethodologySection.tsx',
  'src/components/CTASection.tsx',
  'src/components/ROISection.tsx',
  'src/components/CriteriaSection.tsx',
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  // Increase the main section top padding
  content = content.replace(/pt-\[clamp\(80px,8vw,140px\)\]/g, 'pt-[clamp(100px,10vw,180px)]');
  fs.writeFileSync(f, content);
  console.log(`Updated top padding in ${f}`);
});

console.log('Done — all section top paddings increased.');
