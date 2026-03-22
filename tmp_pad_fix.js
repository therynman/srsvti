const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // 1. Eradicate all xl:justify-center / xl:min-h stretching that causes variable top-padding voids
      const removedFlex = content.replace(/xl:min-h-\[calc\(100vh-97px\)\]/g, '')
                                 .replace(/xl:justify-center/g, '')
                                 .replace(/  +/g, ' '); // cleanup spaces
      if (removedFlex !== content) {
          content = removedFlex;
          modified = true;
      }

      // 2. Uniform top and bottom paddings for major headers
      // Target existing pt-[clamp...] and replace with a uniform pt-[clamp(80px,8vw,120px)]
      // Exception: leave mt/mb alone, only target pt- and pb- that are structural.
      // Actually, let's just do it directly on the files.

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Cleaned flex bounds in ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
processDir(targetDir);

// 2. Fix Hero Padding:
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/py-\[clamp\(40px,5\.55vw,80px\)\]/g, 'pt-[clamp(80px,8vw,140px)] pb-[clamp(40px,5.55vw,80px)]');
// Also Section 2 padding:
page = page.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\] pb-\[clamp\(40px,5\.55vw,80px\)\]/g, 'pt-[clamp(80px,8vw,140px)] pb-[clamp(40px,5.55vw,80px)]');
fs.writeFileSync('src/app/page.tsx', page);

// 3. Fix VideoSection Padding:
let video = fs.readFileSync('src/components/VideoSection.tsx', 'utf8');
video = video.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\]/g, 'pt-[clamp(80px,8vw,140px)]');
fs.writeFileSync('src/components/VideoSection.tsx', video);

// 4. Fix Methodology Padding:
let method = fs.readFileSync('src/components/MethodologySection.tsx', 'utf8');
method = method.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\]/g, 'pt-[clamp(80px,8vw,140px)]');
fs.writeFileSync('src/components/MethodologySection.tsx', method);

// 5. Fix CTASection Padding:
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
cta = cta.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\]/g, 'pt-[clamp(80px,8vw,140px)]');
fs.writeFileSync('src/components/CTASection.tsx', cta);

// 6. Fix CriteriaSection Padding:
let criteria = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
criteria = criteria.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\] pb-\[clamp\(40px,5\.55vw,80px\)\]/g, 'pt-[clamp(80px,8vw,140px)] pb-[clamp(40px,5.55vw,80px)]');
fs.writeFileSync('src/components/CriteriaSection.tsx', criteria);

// 7. Fix ROISection Padding:
let roi = fs.readFileSync('src/components/ROISection.tsx', 'utf8');
roi = roi.replace(/pt-\[clamp\(80px,11\.11vw,160px\)\]/g, 'pt-[clamp(80px,8vw,140px)]');
fs.writeFileSync('src/components/ROISection.tsx', roi);

console.log("Re-aligned standardized paddings");
