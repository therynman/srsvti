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

      // 1. Swap ALL 'lg:' breakpoints to 'xl:' for precise iPad Pro exclusion 
      // (1024px width tablet portrait mode will now use pure mobile flex-stack!)
      const upgradedGrid = content.replace(/lg:/g, 'xl:');
      if (upgradedGrid !== content) {
          content = upgradedGrid;
          modified = true;
      }
      
      // 2. Eradicate double borders in CTASection.tsx
      if (fullPath.includes('CTASection.tsx')) {
         const strippedBorder = content.replace(/<div className="w-full border-t border-\[\#848484\]" \/>/g, '');
         if (strippedBorder !== content) {
            content = strippedBorder;
            modified = true;
         }
      }

      // 3. Amplify vertical breathing room for tall screens up to 3x limits
      const relaxedLimits = content.replace(/(p[tby]-|m[tb]-)\[clamp\(([^,]+),([^,]+),([0-9]+)px\)\]/g, (match, classPrefix, p1, p2, p3) => {
         const oldMax = parseInt(p3);
         const newMax = oldMax * 3;
         modified = true;
         return `${classPrefix}[clamp(${p1},${p2},${newMax}px)]`;
      });
      if (relaxedLimits !== content) {
          content = relaxedLimits;
          modified = true;
      }

      // 4. Update page.tsx GSAP MatchMedia to strictly 1280px
      if (fullPath.includes('page.tsx')) {
          const newMedia = content.replace(/\(min-width: 1024px\)/g, '(min-width: 1280px)')
                                  .replace(/\(min-width: 1025px\)/g, '(min-width: 1280px)');
          if (newMedia !== content) {
              content = newMedia;
              modified = true;
          }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated bounds and breakpoints in ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
console.log("Processing directory:", targetDir);
processDir(targetDir);
