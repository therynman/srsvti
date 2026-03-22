const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Strip out section 4 through 7 ScrollTriggers safely.
// We find "// Pin Section 4" and remove everything up to the end of the matchMedia block
const hookStart = page.indexOf('// Pin Section 4');
if (hookStart !== -1) {
    const endMatch = page.indexOf('});\n  });\n\n  return () => {');
    if (endMatch !== -1) {
        // Find the specific last }}); belonging to the ScrollTrigger logic before the matchMedia closer
        // Actually, let's just use substring up to the last known logic point
        page = page.substring(0, hookStart) + '  });\n\n  return () => {';
    }
}

// Ensure the Reality Box padding updates
page = page.replace(
  /<div className="flex flex-col h-auto xl:h-\[640px\]">/g,
  '<div className="flex flex-col h-full">'
);

page = page.replace(
  /<div className="h-auto xl:h-\[320px\] border-b border-\[\#848484\] px-\[clamp\(16px,4\.16vw,60px\)\] py-\[clamp\(40px,5\.55vw,60px\)\] xl:pt-\[60px\] xl:pb-0 flex flex-col">/g,
  '<div className="flex-1 border-b border-[#848484] px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] xl:pb-[60px] flex flex-col">'
);

page = page.replace(
  /<div className="px-\[clamp\(24px,4\.16vw,60px\)\] pt-\[clamp\(24px,4\.16vw,60px\)\] pb-\[clamp\(120px,12vw,240px\)\] border-t border-\[\#848484\] h-full">/g,
  '<div className="flex-1 px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] pb-[clamp(140px,15vw,300px)] flex flex-col">'
);

// Fallback search if the previous script didn't apply exactly as expected
page = page.replace(
  /<div className="h-auto xl:h-\[320px\] px-\[clamp\(16px,4\.16vw,60px\)\] py-\[clamp\(40px,5\.55vw,60px\)\] xl:pt-\[60px\] xl:pb-0 flex flex-col">/g,
  '<div className="flex-1 px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] pb-[clamp(140px,15vw,300px)] flex flex-col">'
);

page = page.replace(
  /<div className="border-b xl:border-b-0 xl:border-r border-\[\#848484\] bg-dotted-pattern flex items-center justify-center p-\[clamp\(24px,4\.16vw,60px\)\] h-\[320px\] xl:h-\[640px\]">/g,
  '<div className="border-b xl:border-b-0 xl:border-r border-[#848484] bg-dotted-pattern flex items-center justify-center p-[clamp(24px,4.16vw,60px)] min-h-[400px] xl:min-h-[800px]">'
);

page = page.replace(
  /<img src="\/Delusion vs Reality Graphics\.svg" alt="Delusion vs Reality" className="w-full h-full object-contain" \/>/g,
  '<img src="/Delusion vs Reality Graphics.svg" alt="Delusion vs Reality" className="w-full h-auto xl:w-[80%] max-w-[80vw] xl:max-w-[700px] object-contain" />'
);

fs.writeFileSync('src/app/page.tsx', page);

// Double check CTA section bottom gap
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
// Making sure there's zero bottom border as the user requested
cta = cta.replace(/<div className="w-full border-t border-\[\#848484\]" \/>/g, '');
fs.writeFileSync('src/components/CTASection.tsx', cta);

console.log('Cleaned page.tsx and graphics padding');
