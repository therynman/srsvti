const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const refs = [
  'heroRef', 'nextSectionRef', 'section3Ref', 'section4Ref', 
  'section5Ref', 'section6Ref', 'section7Ref'
];

let i = 0;
content = content.replace(/const t = triggerElement;/g, () => {
  i++;
  return `const t = ${refs[i]}.current;`;
});

fs.writeFileSync('src/app/page.tsx', content);
console.log("Fixed page.tsx refs");
