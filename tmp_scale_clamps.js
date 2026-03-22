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
      // Multiply clamp max values by 4
      const newContent = content.replace(/clamp\(([^,]+),\s*([^,]+),\s*([0-9]+)px\)/g, (match, p1, p2, p3) => {
        modified = true;
        return `clamp(${p1}, ${p2}, ${parseInt(p3) * 4}px)`;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated clamps in ${fullPath}`);
      }
    }
  }
}

// Ensure correct execution dir
const targetDir = path.join(__dirname, 'src');
console.log("Processing directory:", targetDir);
processDir(targetDir);
