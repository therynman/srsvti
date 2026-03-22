const fs = require('fs');

const buttonClassMap = 'inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors w-fit';
const buttonStyleMap = '{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px,1.11vw,20px)" }';
const imgClassMap = 'w-[clamp(12px,0.9vw,20px)] h-[clamp(12px,0.9vw,20px)]';

// Navbar CTA update
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nav = nav.replace(/<button className="px-6 rounded-\[12px\] bg-\[\#0077FF\].*?<\/button>/s, 
`<button className="${buttonClassMap}" style={${buttonStyleMap}}>
          Initiate Revenue Diagnosis <img src="/CTA Arrow.svg" alt="arrow" className="${imgClassMap}" />
        </button>`);
// Nav methodology buttons update padding
nav = nav.replace(/px-6/g, 'px-[clamp(24px,2vw,32px)]');
fs.writeFileSync('src/components/Navbar.tsx', nav);

// CTA Section
let cta = fs.readFileSync('src/components/CTASection.tsx', 'utf8');
cta = cta.replace(/<a\s+href="#"\s+className="mt-\[40px\] inline-flex items-center gap-2 px-6 rounded-\[12px\] bg-\[\#0077FF\].*?<\/a>/s, 
`<a
       href="#"
       className="mt-[40px] ${buttonClassMap}"
       style={${buttonStyleMap}}
      >
       Initiate Revenue Diagnosis
       <img src="/CTA Arrow.svg" alt="" className="${imgClassMap}" />
      </a>`);
fs.writeFileSync('src/components/CTASection.tsx', cta);

// Criteria Section
let criteria = fs.readFileSync('src/components/CriteriaSection.tsx', 'utf8');
criteria = criteria.replace(/<a\s+href="#"\s+className="mt-\[clamp\(40px,4\.16vw,180px\)\] inline-flex items-center gap-2 px-6 rounded-\[12px\] bg-\[\#0077FF\].*?<\/a>/s, 
`<a
       href="#"
       className="mt-[clamp(40px,4.16vw,180px)] ${buttonClassMap}"
       style={${buttonStyleMap}}
      >
       Apply for a Revenue Diagnosis
       <img src="/CTA Arrow.svg" alt="" className="${imgClassMap}" />
      </a>`);
fs.writeFileSync('src/components/CriteriaSection.tsx', criteria);

console.log('CTAs harmonized.');
