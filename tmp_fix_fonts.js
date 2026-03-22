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
      
      // 1. Remove all 'lg:min-h-[calc(100vh-97px)]' and 'lg:justify-center' globally
      const unpadded = content.replace(/lg:min-h-\[calc\(100vh-97px\)\]/g, '')
                              .replace(/lg:justify-center/g, '')
                              .replace(/  /g, ' '); // remove double spaces created
      
      if (unpadded !== content) {
          content = unpadded;
          modified = true;
      }
      
      // 2. Increment fontSize clamp logic ONLY
      // Look for fontSize: "clamp(MIN, VW, MAXpx)" or similar
      const fontScaled = content.replace(/(fontSize:\s*['"]?)clamp\(([^,]+),([^,]+),([0-9]+)px\)(['"]?)/g, (match, prefix, p1, p2, p3, suffix) => {
         const oldMax = parseInt(p3);
         // only scale if it's currently low
         if (oldMax <= 200) {
            const newMax = oldMax * 4;
            modified = true;
            return `${prefix}clamp(${p1}, ${p2}, ${newMax}px)${suffix}`;
         }
         return match;
      });
      
      if (fontScaled !== content) {
          content = fontScaled;
          modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated fonts and layout classes in ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
console.log("Processing directory:", targetDir);
processDir(targetDir);
