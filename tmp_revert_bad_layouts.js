const fs = require('fs');
const path = require('path');

// 1. Fix page.tsx GSAP parallax and grids
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/y: -350/g, 'y: -100');
page = page.replace(/className="w-full xl:col-span-8"/g, 'className="w-full xl:col-span-6"');
page = page.replace(/className="w-full xl:col-span-12"/g, 'className="w-full xl:col-span-6"');
fs.writeFileSync('src/app/page.tsx', page);

// 2. Fix CTASection.tsx grids
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
cta = cta.replace(/xl:col-span-7 pr-6/g, 'xl:col-span-6 pr-6');
cta = cta.replace(/xl:col-start-8 xl:col-span-5/g, 'xl:col-start-9 xl:col-span-4');
cta = cta.replace(/xl:col-span-12/g, 'xl:col-span-6 pr-6'); // just in case
fs.writeFileSync('src/components/CTASection.tsx', cta);

// 3. Fix VideoSection.tsx grids
let video = fs.readFileSync('src/components/VideoSection.tsx', 'utf8');
video = video.replace(/xl:col-span-5/g, 'xl:col-span-4');
fs.writeFileSync('src/components/VideoSection.tsx', video);

// 4. Fix Criteria CTA Text
let criteria = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
criteria = criteria.replace(/Buy Now/g, 'Apply for a Revenue Diagnosis');
fs.writeFileSync('src/components/CriteriaSection.tsx', criteria);

// 5. Revert the x3 multiplier globally on vertical padding/margins!
function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const revertedLimits = content.replace(/(p[tby]-|m[tb]-)\[clamp\(([^,]+),([^,]+),([0-9]+)px\)\]/g, (match, classPrefix, p1, p2, p3) => {
         const oldMax = parseInt(p3);
         const originalMax = Math.round(oldMax / 3);
         return `${classPrefix}[clamp(${p1},${p2},${originalMax}px)]`;
      });

      if (revertedLimits !== content) {
          fs.writeFileSync(fullPath, revertedLimits);
          console.log(`Reverted padding bounds in ${fullPath}`);
      }
    }
  }
}
processDir(path.join(__dirname, 'src'));
console.log("Revert complete!");
