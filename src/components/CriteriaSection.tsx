"use client";

import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

export default function CriteriaSection() {
 return (
 <div
 className="w-full flex flex-col bg-[#121212] border-t border-[#848484]"
 style={{ zIndex: 7, position: "relative" }}
 >
 {/* Top Heading */}
 <div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(80px,11.11vw,160px)] pb-[clamp(40px,5.55vw,80px)]">
 <AnimatedHeading
 className="font-medium"
 style={{
 fontSize: "clamp(32px, 2.77vw, 160px)",
 letterSpacing: "-0.04em",
 lineHeight: "100%",
 }}
 >
 Clinical Parameters For <span className="text-[#0077FF]">Engagement</span>
 </AnimatedHeading>
 </div>

 {/* Grid Layout: Visual on Left, Text Cards on Right */}
 <div className="flex flex-col xl:grid xl:grid-cols-2 border-t border-[#848484]">
 
 {/* Left: Visual with dotted background */}
 <div className="border-b xl:border-b-0 xl:border-r border-[#848484] bg-dotted-pattern flex items-center justify-center p-[clamp(24px,4.16vw,60px)] xl:min-h-[640px]">
 <img
 src="/Criteria vs Exclusions.svg"
 alt="Criteria vs Exclusions"
 className="w-full h-auto max-h-[300px] xl:max-h-none object-contain"
 />
 </div>

 {/* Right: The Criteria & The Exclusions */}
 <div className="flex flex-col">
 
 {/* Top Card: The Criteria */}
 <div className="flex-1 flex flex-col justify-center px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)] border-b border-[#848484]">
 <div className="flex items-center gap-[16px] mb-6">
 <div className="bg-white text-[#121212] rounded-[4px] w-[26px] h-[26px] flex flex-shrink-0 items-center justify-center">
 <img src="/Tick.svg" alt="Tick" className="w-[12px] h-auto" />
 </div>
 <h3 className="font-semibold text-white" style={{ fontSize: 'clamp(24px, 2.22vw, 128px)', letterSpacing: '-0.02em', lineHeight: '100%' }}>
 The Criteria
 </h3>
 </div>
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 Founder-led wellness brands only. Minimum $1M to $8M in annual revenue. Currently deploying capital on paid acquisition.
 </p>
 </div>

 {/* Bottom Card: The Exclusions & CTA */}
 <div className="flex-1 flex flex-col justify-center px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)]">
 <div className="flex items-center gap-[16px] mb-6">
 <div className="bg-white text-[#121212] rounded-[4px] w-[26px] h-[26px] flex flex-shrink-0 items-center justify-center">
 <img src="/Cross.svg" alt="Cross" className="w-[12px] h-auto" />
 </div>
 <h3 className="font-semibold text-white" style={{ fontSize: 'clamp(24px, 2.22vw, 128px)', letterSpacing: '-0.02em', lineHeight: '100%' }}>
 The Exclusions
 </h3>
 </div>
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 No Amazon commodity supplement sellers. No influencer vanity brands. No early-stage startups are seeking a cheap aesthetic refresh. If the brand meets these parameters and is ready to resolve structural bottlenecks, submit the data for an economic diagnosis.
 </p>

 {/* CTA Button — 60px below paragraph */}
 <a
 href="#"
 className="mt-[clamp(40px,4.16vw,60px)] inline-flex items-center gap-2 px-6 rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors self-start"
 style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px,1.11vw,20px)" }}
 >
 Apply for a Revenue Diagnosis
 <img src="/CTA Arrow.svg" alt="" className="w-[12px] h-[12px] xl:w-[clamp(12px,0.9vw,20px)] xl:h-[clamp(12px,0.9vw,20px)]" />
 </a>
 </div>

 </div>
 </div>
 
 
    {/* Bottom border */}
   <div className="w-full border-t border-[#848484]" />
  </div>
 );
}
