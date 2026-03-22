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
      
      // Remove spaces ONLY inside clamp() functions
      const newContent = content.replace(/clamp\([^)]+\)/g, (match) => {
        const noSpaces = match.replace(/\s+/g, '');
        if (noSpaces !== match) {
           modified = true;
        }
        return noSpaces;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Removed spaces from clamps in ${fullPath}`);
      }
    }
  }
}

// Ensure correct execution dir
const targetDir = path.join(__dirname, 'src');
console.log("Processing directory:", targetDir);
processDir(targetDir);
