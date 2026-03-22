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
      
      const newContent = content.replace(/clamp\([^,]+,[^,]+,([0-9]+)px\)/g, (match, p3) => {
        // Divide the max px value by 4 and piece it back together
        // Since we stripped spaces before, the regex should match nicely without spaces, but just in case:
        modified = true;
        const originalVal = parseInt(p3);
        const newVal = originalVal / 4;
        return match.replace(`${originalVal}px`, `${newVal}px`);
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Reverted clamps in ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
console.log("Reverting directory:", targetDir);
processDir(targetDir);
