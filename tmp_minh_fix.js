const fs = require('fs');
const path = require('path');

const sections = [
  'src/app/page.tsx', 
  'src/components/VideoSection.tsx', 
  'src/components/MethodologySection.tsx',
  'src/components/CTASection.tsx',
  'src/components/ROISection.tsx',
  'src/components/CriteriaSection.tsx'
];

sections.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for the main wrapper div of each section.
  // In page.tsx:
  // <div ref={heroRef} className="w-full flex flex-col bg-[#121212]" style={{ zIndex: 1 }}>
  // <div ref={nextSectionRef} className="w-full flex flex-col bg-[#121212] border-t border-[#848484] " style={{ zIndex: ...
  
  // In components:
  // <div className="w-full flex flex-col bg-[#121212] border-t border-[#848484]" style={{ zIndex: ...
  
  // Replace "w-full flex flex-col bg-[#121212]" with "w-full flex flex-col bg-[#121212] xl:min-h-[calc(100vh-97px)]"
  // But make sure we don't accidentally match sub-containers.
  // We can target specific patterns.

  if (filePath.includes('page.tsx')) {
    content = content.replace(/className="w-full flex flex-col bg-\[\#121212\]"/g, 'className="w-full flex flex-col bg-[#121212] xl:min-h-[calc(100vh-97px)]"');
    content = content.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\] "/g, 'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] xl:min-h-[calc(100vh-97px)]"');
  } else {
    // For components, the main wrapper is typically the first <div className="w-full flex flex-col bg-[#121212] border-t border-[#848484]"
    // Or it might have a trailing space. Let's just use a safer regex.
    content = content.replace(/className="w-full flex flex-col bg-\[\#121212\] border-t border-\[\#848484\](\s*)"/, 
      'className="w-full flex flex-col bg-[#121212] border-t border-[#848484] xl:min-h-[calc(100vh-97px)]"');
  }

  // Double check ROI section specific issues
  // The user says "The 120 doesn't have any breathing space in the bottom"
  // Adding min-h should fix it.

  fs.writeFileSync(filePath, content);
  console.log(`Injected xl:min-h into ${filePath}`);
});

