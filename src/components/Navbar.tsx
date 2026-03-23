"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Navbar() {
 const { scrollY } = useScroll();
 const [hidden, setHidden] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const menuRef = useRef<HTMLDivElement>(null);

 useMotionValueEvent(scrollY, "change", (latest) => {
  const previous = scrollY.getPrevious() || 0;
  if (latest > previous && latest > 150) {
   setHidden(true);
   setMenuOpen(false);
  } else {
   setHidden(false);
  }
 });

 // Close dropdown when clicking outside
 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
   if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
    setMenuOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

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
    {/* Desktop nav buttons — visible at xl+ */}
    <div className="hidden xl:flex items-center gap-[16px]">
     <button className="flex items-center justify-center px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#222222] text-white hover:bg-[#333333] transition-colors border border-white/5 font-medium" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px, 1.11vw, 80px)" }}>
      Methodology
     </button>
     <button className="flex items-center justify-center px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#222222] text-white hover:bg-[#333333] transition-colors border border-white/5 font-medium" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px, 1.11vw, 80px)" }}>
      Engineered Trust
     </button>
    </div>

    {/* CTA — hidden on very small screens (below md), visible from md to xl and on xl+ */}
    <button className="hidden md:inline-flex justify-center items-center gap-[clamp(8px,1vw,16px)] px-[clamp(24px,2vw,32px)] rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors w-fit" style={{ height: "clamp(48px,3.88vw,72px)", fontSize: "clamp(14px,1.11vw,20px)" }}>
     Initiate Revenue Diagnosis <img src="/CTA Arrow.svg" alt="arrow" className="w-[clamp(12px,0.9vw,20px)] h-[clamp(12px,0.9vw,20px)]" />
    </button>

    {/* Hamburger menu button — visible below xl */}
    <div className="relative xl:hidden" ref={menuRef}>
     <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex items-center justify-center rounded-[12px] transition-colors border border-white/5"
      style={{
       height: "clamp(48px,3.88vw,72px)",
       width: "clamp(48px,3.88vw,72px)",
       backgroundColor: menuOpen ? "#0077FF" : "#222222",
      }}
     >
      {menuOpen ? (
       /* Close X icon */
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
       </svg>
      ) : (
       /* Hamburger icon */
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7L7 7M20 7L11 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 17H17M4 17L13 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 12H7L20 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
       </svg>
      )}
     </button>

     {/* Dropdown menu */}
     <AnimatePresence>
      {menuOpen && (
       <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-[calc(100%+12px)] right-0 bg-[#1A1A1A] rounded-[16px] shadow-2xl overflow-hidden border border-white/10"
        style={{ minWidth: "260px" }}
       >
        {/* Menu items */}
        <div className="flex flex-col px-5 py-5 gap-1">
         <a href="#" className="text-white font-medium py-1.5 hover:text-[#0077FF] transition-colors" style={{ fontSize: "clamp(14px, 1.11vw, 64px)" }}>
          Methodology
         </a>
         <a href="#" className="text-white font-medium py-1.5 hover:text-[#0077FF] transition-colors" style={{ fontSize: "clamp(14px, 1.11vw, 64px)" }}>
          Engineered Trust
         </a>

         {/* CTA inside dropdown — only visible on very small screens (below md) */}
         <a
          href="#"
          className="md:hidden inline-flex justify-center items-center gap-2 px-5 mt-3 rounded-[12px] bg-[#0077FF] text-white font-medium hover:bg-[#0077FF]/90 transition-colors whitespace-nowrap"
          style={{ height: "44px", fontSize: "clamp(14px, 1.11vw, 64px)" }}
         >
          Initiate Revenue Diagnosis
          <img src="/CTA Arrow.svg" alt="arrow" className="w-[12px] h-[12px]" />
         </a>
        </div>
       </motion.div>
      )}
     </AnimatePresence>
    </div>
   </div>
  </motion.nav>
 );
}
