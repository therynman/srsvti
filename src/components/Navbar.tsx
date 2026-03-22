"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
 const { scrollY } = useScroll();
 const [hidden, setHidden] = useState(false);

 useMotionValueEvent(scrollY, "change", (latest) => {
 const previous = scrollY.getPrevious() || 0;
 if (latest > previous && latest > 150) {
 setHidden(true);
 } else {
 setHidden(false);
 }
 });

 return (
 <motion.nav 
 variants={{
 visible: { y: 0 },
 hidden: { y: "-100%" },
 }}
 animate={hidden ? "hidden" : "visible"}
 transition={{ duration: 0.35, ease: "easeInOut" }}
 className="w-full flex justify-between items-center px-[clamp(24px,4.16vw,60px)] py-[clamp(16px,1.66vw,24px)] border-b border-[#848484] fixed top-0 left-0 bg-[#121212] z-50"
 >
 {/* Logo with button-like background */}
 <div className="flex items-center">
 <div className="bg-[#222222] p-2.5 rounded-[12px] flex items-center justify-center border border-white/5">
 <img src="/Srsvti Icon.svg" alt="Srsvti Logo" className="h-[24px] w-auto relative" />
 </div>
 </div>

 {/* Nav Buttons & CTA */}
 <div className="flex items-center gap-[clamp(16px,3.33vw,48px)]">
 <div className="hidden xl:flex items-center gap-[16px]">
 <button className="flex items-center justify-center px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#222222] text-white hover:bg-[#333333] transition-colors border border-white/5 font-medium" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px, 1.11vw, 80px)" }}>
 Methodology
 </button>
 <button className="flex items-center justify-center px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#222222] text-white hover:bg-[#333333] transition-colors border border-white/5 font-medium" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px, 1.11vw, 80px)" }}>
 Engineered Trust
 </button>
 </div>
 <button className="inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors w-fit" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px,1.11vw,20px)" }}>
          Initiate Revenue Diagnosis <img src="/CTA Arrow.svg" alt="arrow" className="w-[clamp(12px,0.9vw,20px)] h-[clamp(12px,0.9vw,20px)]" />
        </button>
 </div>
 </motion.nav>
 );
}
