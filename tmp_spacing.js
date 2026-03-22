const fs = require('fs');

// 1. Hero text: reduce top/bottom from clamp(100px,10vw,180px)
// Make it more compact: pt ~80px, pb ~60px at 1440
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
  /pt-\[clamp\(100px,10vw,180px\)\] pb-\[clamp\(100px,10vw,180px\)\] w-full/,
  'pt-[clamp(60px,5.55vw,80px)] pb-[clamp(40px,4.16vw,60px)] w-full'
);
fs.writeFileSync('src/app/page.tsx', page);

// 2. Other sections: top=160px, bottom=80px at 1440vw
// 160/1440 = 11.11vw, 80/1440 = 5.55vw
// Current: pt-[clamp(100px,10vw,180px)]
// New:     pt-[clamp(80px,11.11vw,160px)] pb-[clamp(40px,5.55vw,80px)]

const files = [
  'src/app/page.tsx',           // Section 2 heading
  'src/components/VideoSection.tsx',
  'src/components/MethodologySection.tsx',
  'src/components/CTASection.tsx',
  'src/components/ROISection.tsx',
  'src/components/CriteriaSection.tsx',
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/pt-\[clamp\(100px,10vw,180px\)\]/g, 'pt-[clamp(80px,11.11vw,160px)]');
  fs.writeFileSync(f, content);
});

console.log('Done: Hero reduced, other sections set to 160/80 at 1440vw.');
