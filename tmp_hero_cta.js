const fs = require('fs');

// 1. Hero: make top padding equal to bottom padding
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
  /pt-\[clamp\(100px,10vw,180px\)\] pb-\[clamp\(40px,5\.55vw,80px\)\] w-full/,
  'pt-[clamp(100px,10vw,180px)] pb-[clamp(100px,10vw,180px)] w-full'
);
fs.writeFileSync('src/app/page.tsx', page);

// 2. CTA Section: paragraph grid from col-start-9 col-span-4 -> col-start-7 col-span-6
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
cta = cta.replace(
  /xl:col-start-9 xl:col-span-4/,
  'xl:col-start-7 xl:col-span-6'
);
fs.writeFileSync('src/components/CTASection.tsx', cta);

console.log('Done: Hero padding equalized, CTA grid updated to 6/6.');
