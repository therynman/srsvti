const fs = require('fs');
const path = require('path');

// 1. Remove all xl:min-h variables globally to stop synthetic "huge gap" voids
const sections = [
  'src/app/page.tsx', 
  'src/components/VideoSection.tsx', 
  'src/components/MethodologySection.tsx',
  'src/components/CTASection.tsx',
  'src/components/ROISection.tsx',
  'src/components/CriteriaSection.tsx'
];

sections.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/xl:min-h-\[calc\(100vh-97px\)\]/g, '');
    fs.writeFileSync(filePath, content);
  }
});

// 2. Remove bottom border causing the "two lines" visual glitch
let meth = fs.readFileSync('src/components/MethodologySection.tsx', 'utf8');
meth = meth.replace(/{\/\*\s*Bottom border\s*\*\/}\s*<div className="w-full border-t border-\[\#848484\]" \/>/g, '');
fs.writeFileSync('src/components/MethodologySection.tsx', meth);

let crit = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
crit = crit.replace(/{\/\*\s*Bottom border\s*\*\/}\s*<div className="w-full border-t border-\[\#848484\]" \/>/g, '');
fs.writeFileSync('src/components/CriteriaSection.tsx', crit);

// 3. Make Section 2 'Reality' Graphic bigger and padding richer
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
  /<div className="p-\[clamp\(24px,4\.16vw,60px\)\] border-t border-\[\#848484\]">/g, 
  '<div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(24px,4.16vw,60px)] pb-[clamp(120px,12vw,240px)] border-t border-[#848484] h-full">'
);
page = page.replace(/className="w-full h-auto max-w-\[500px\] object-contain"/g, 'className="w-full h-auto xl:w-[80%] max-w-[80vw] xl:max-w-[800px] object-contain"');
fs.writeFileSync('src/app/page.tsx', page);

// 4. ROI "120" and Criteria breathing space
// Add a strong pb to their main wrappers
let roi = fs.readFileSync('src/components/ROISection.tsx', 'utf8');
roi = roi.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\] "/g, 'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] pb-[clamp(120px,12vw,300px)] "');
roi = roi.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\](\s*)"/g, 'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] pb-[clamp(120px,12vw,300px)]"');
fs.writeFileSync('src/components/ROISection.tsx', roi);

// Do the same for CriteriaSection
let criteria2 = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
criteria2 = criteria2.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\](\s*)"/g, 'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] pb-[clamp(120px,12vw,300px)]"');
fs.writeFileSync('src/components/CriteriaSection.tsx', criteria2);

// Same for CTA Section
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
// remove the extra div spacers that cause ugly static gaps
cta = cta.replace(/{\/\* 60px gap from CTA to bottom border \*\/}\s*<div className="h-\[clamp\(40px,4\.16vw,60px\)\]" \/>/g, '');
cta = cta.replace(/{\/\* 160px gap to next section \*\/}\s*<div className="h-\[clamp\(80px,11\.11vw,160px\)\]" \/>/g, '');
// And inject the uniform breathing space padding
cta = cta.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\](\s*)"/g, 'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] pb-[clamp(120px,12vw,300px)]"');
fs.writeFileSync('src/components/CTASection.tsx', cta);

console.log('Padding and borders rebuilt for natural breathing scale.');
