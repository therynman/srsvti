const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/{\/\*\s*Bottom border\s*\*\/}\s*<div className="w-full border-t border-\[\#848484\]"><\/div>/g, '');
fs.writeFileSync('src/app/page.tsx', page);

let roi = fs.readFileSync('src/components/ROISection.tsx', 'utf8');
roi = roi.replace(/{\/\*\s*Bottom border\s*\*\/}\s*<div className="w-full border-t border-\[\#848484\]" \/>/g, '');
fs.writeFileSync('src/components/ROISection.tsx', roi);

console.log('Removed bottom borders');
