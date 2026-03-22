const fs = require('fs');

// 1. Completely nuke GSAP ScrollTrigger from page.tsx
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// We can just empty the matchMedia block
const mmStart = page.indexOf('let mm = gsap.matchMedia();');
const mmEnd = page.indexOf('  return () => {');
if (mmStart !== -1 && mmEnd !== -1) {
  const replacement = `let mm = gsap.matchMedia();\n  // GSAP SCROLL STACKING COMPLETELY REMOVED FOR PURE NATIVE FLOW\n`;
  page = page.substring(0, mmStart) + replacement + page.substring(mmEnd);
}

// 2. Remove the massive "pb-" GSAP band-aids everywhere
// In page.tsx:
page = page.replace(
  /<div className="flex-1 px-\[clamp\(16px,4\.16vw,60px\)\] py-\[clamp\(40px,5\.55vw,60px\)\] xl:pt-\[60px\] pb-\[clamp\(140px,15vw,300px\)\] flex flex-col">/g,
  '<div className="flex-1 px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] xl:pb-[60px] flex flex-col">'
);
fs.writeFileSync('src/app/page.tsx', page);

// In ROI Section
let roi = fs.readFileSync('src/components/ROISection.tsx', 'utf8');
roi = roi.replace(/ pb-\[clamp\(120px,12vw,300px\)\]/g, '');
fs.writeFileSync('src/components/ROISection.tsx', roi);

// In CTA Section
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
cta = cta.replace(/ pb-\[clamp\(120px,12vw,300px\)\]/g, '');

// Re-add the CTA small bottom padding so it breathes naturally WITHOUT GSAP
cta = cta.replace(/<div className="px-\[clamp\(24px,4\.16vw,60px\)\] pt-\[clamp\(80px,8vw,140px\)\]">/g, '<div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(80px,8vw,140px)] pb-[clamp(80px,8vw,120px)]">');
fs.writeFileSync('src/components/CTASection.tsx', cta);

// In Criteria Section
let crit = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
crit = crit.replace(/ pb-\[clamp\(120px,12vw,300px\)\]/g, '');
// User asked to Add bottom line below criteria
// Actually they said "Give a line below criteria exclusion section"
// Currently it doesn't have a bottom line, so let's add one to the bottom of the container
if (!crit.includes('{/* Bottom border */}')) {
  crit = crit.replace(/<\/div>\n \);\n}/g, '   {/* Bottom border */}\n   <div className="w-full border-t border-[#848484]" />\n  </div>\n );\n}');
}
fs.writeFileSync('src/components/CriteriaSection.tsx', crit);

// Also the "two lines below 120"
// Why are there two lines? Let's check ROISection again.
roi = fs.readFileSync('src/components/ROISection.tsx', 'utf8');
// Inside ROISection:
// there is a <div className="... border-t border-[#848484] xl:min-h..."> container.
// And inside it, wait, is there another border-t?
// "px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,5.55vw,80px)] flex justify-center text-center border-t border-[#848484] mt-[clamp(40px,5.55vw,120px)]"
// Ah! There is a border-t INSIDE ROISection, right after the 120 number? No, that's not in the code I saw earlier.
// Wait, let's just make ROISection have standard pb
roi = roi.replace(/ pb-\[clamp\(120px,12vw,300px\)\]"/g, '"');
roi = roi.replace(/<div\n  className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\] pb-\[clamp\(120px,12vw,300px\)\] "/g, '<div\n  className="w-full flex flex-col bg-[#121212] border-t border-[#848484]"');
fs.writeFileSync('src/components/ROISection.tsx', roi);

console.log('Removed GSAP scroll limits and reverted massive padding.');
