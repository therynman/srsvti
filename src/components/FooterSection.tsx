"use client";

import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

export default function FooterSection() {
 return (
 <div
 className="w-full relative bg-[#121212] overflow-hidden border-t border-[#848484]"
 style={{ zIndex: 8 }}
 >
 {/* Background Image */}
 <img
 src="/Footer Background.png"
 alt="Footer Background"
 className="absolute top-0 left-0 w-full h-full object-cover z-0"
 />

 {/* Content */}
 <div className="relative z-10 w-full px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)] flex flex-col justify-between">
 
 {/* Top Area */}
 <div className="flex flex-col xl:grid xl:grid-cols-12 gap-[clamp(24px,3vw,12px)]">
 {/* Main Text: 6 grids left */}
 <div className="w-full xl:col-span-6">
 <AnimatedHeading
 className="font-medium text-white"
 style={{
 fontSize: "clamp(32px, 2.77vw, 160px)",
 letterSpacing: "-0.04em",
 lineHeight: "100%",
 }}
 >
 Systematic conversion engineering for the premium functional wellness sector
 </AnimatedHeading>
 </div>

 {/* Links: 3 rightmost grids, 40px gap */}
 <div className="w-full xl:col-start-10 xl:col-span-3 flex flex-col gap-[clamp(24px,2.77vw,40px)] mt-12 xl:mt-0">
 {["ABOUT US", "REPORTS", "PRIVACY POLICY", "TERMS OF SERVICE"].map((link) => (
 <a
 key={link}
 href="#"
 className="font-medium text-white hover:text-white/80 transition-colors"
 style={{
 fontSize: "clamp(18px, 1.66vw, 96px)",
 letterSpacing: "0",
 lineHeight: "100%",
 }}
 >
 {link}
 </a>
 ))}
 </div>
 </div>

 {/* Bottom Area: 60px gap below the nav links */}
 <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-[clamp(40px,3vw,12px)] items-start xl:items-end mt-[clamp(40px,4.16vw,60px)]">
 {/* Copyright */}
 <div className="w-full xl:col-span-6">
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "100%",
 }}
 >
 © 2026 Srsvti. All Rights Reserved
 </p>
 </div>

 {/* Social Icons: stretched across 3 rightmost grids */}
 <div className="w-full xl:col-start-10 xl:col-span-3 flex gap-[24px] xl:justify-between items-center">
 <a href="#" className="hover:opacity-80 transition-opacity">
 <img src="/LinkedIn Icon.svg" alt="LinkedIn" className="h-[32px] w-auto" />
 </a>
 <a href="#" className="hover:opacity-80 transition-opacity">
 <img src="/Behance Icon.svg" alt="Behance" className="h-[32px] w-auto" />
 </a>
 <a href="#" className="hover:opacity-80 transition-opacity">
 <img src="/X Icon.svg" alt="X" className="h-[32px] w-auto" />
 </a>
 <a href="#" className="hover:opacity-80 transition-opacity">
 <img src="/Insta Icon.svg" alt="Instagram" className="h-[32px] w-auto" />
 </a>
 </div>
 </div>
 </div>
 </div>
 );
}
