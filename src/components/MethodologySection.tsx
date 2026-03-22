"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

const items = [
 {
 num: "1",
 title: "Category Positioning",
 text: "Selling isolated capsules forces a race to the bottom regarding price. We transition the brand from ingredient selling to health protocol ownership. This elevates the core offer to justify absolute premium margins.",
 visual: "/Category Positioning.svg",
 },
 {
 num: "2",
 title: "Trust Stack Construction",
 text: "Premium wellness consumers demand rigorous proof. We replace scattered product reviews with verifiable transformation evidence. We reconstruct the digital proof architecture using quantifiable data and clinical framing.",
 visual: "/Trust Stack Construction.svg",
 },
 {
 num: "3",
 title: "Identity Subscription Design",
 text: "Framing subscriptions as cheap monthly discounts destroys value. We rebuild them as a long\u2011term identity commitment. This drastically inflates Lifetime Value and kills voluntary churn.",
 visual: "/Identity Subscription Design.svg",
 },
 {
 num: "4",
 title: "Revenue Model Elevation",
 text: "We deploy logical protocol bundles to scale Average Order Value at the exact point of checkout without ever cheapening the brand perception.",
 visual: "/Revenue Model Elevation.svg",
 },
];

export default function MethodologySection() {
 const [openIndex, setOpenIndex] = useState<number>(0);

 const toggle = (i: number) => {
 // Always keep one open — clicking the open item does nothing
 if (openIndex !== i) {
 setOpenIndex(i);
 }
 };

 return (
 <div
 className="w-full flex flex-col bg-[#121212] border-t border-[#848484] "
 style={{ zIndex: 4, position: "relative" }}
 >
 {/* Heading */}
 <div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(80px,11.11vw,160px)]">
 <AnimatedHeading
 className="font-medium"
 style={{
 fontSize: "clamp(32px, 2.77vw, 160px)",
 letterSpacing: "-0.04em",
 lineHeight: "100%",
 }}
 >
 Premium Brands Do Not Sell Products. They Sell <span className="text-[#0077FF]">Mandated Health Systems</span>
 </AnimatedHeading>
 </div>

 {/* Responsive Layout Split: Mobile vs Desktop */}
 <div className="w-full mt-[clamp(40px,5.55vw,80px)] border-t border-[#848484]">
 
 {/* MOBILE STATIC LIST */}
 <div className="flex flex-col xl:hidden w-full">
 {/* Mobile sub-heading */}
 <div className="px-[clamp(24px,4.16vw,60px)] py-[clamp(24px,2.77vw,40px)]">
 <p className="font-medium text-white/80" style={{ fontSize: "clamp(14px, 1.11vw, 64px)", letterSpacing: "0", lineHeight: "140%" }}>
 We deploy four structural systems to force growth. We reconstruct the digital ecosystem to logically dismantle buyer hesitation.
 </p>
 </div>
 
 {items.map((item, i) => (
 <div key={i} className="flex flex-col border-t border-[#848484]">
 <div className="px-[clamp(24px,4.16vw,60px)] py-[clamp(24px,2.77vw,40px)] flex flex-col gap-[16px]">
 <div className="flex items-center gap-[20px]">
 <div className="bg-white rounded-[6px] w-[32px] h-[32px] flex items-center justify-center text-[#121212] font-semibold shrink-0" style={{ fontSize: "14px" }}>
 {item.num}
 </div>
 <h3 className="font-semibold text-white text-left" style={{ fontSize: "clamp(20px, 1.66vw, 96px)", letterSpacing: "-0.02em", lineHeight: "100%" }}>
 {item.title}
 </h3>
 </div>
 <p className="font-medium text-white/80 mt-4" style={{ fontSize: "clamp(14px, 1.11vw, 64px)", letterSpacing: "0", lineHeight: "140%" }}>
 {item.text}
 </p>
 </div>
 {/* Mobile Visual */}
 <div className="w-full p-[clamp(24px,4.16vw,60px)] bg-dotted-pattern flex items-center justify-center">
 <img src={item.visual} alt={item.title} className="w-full h-auto max-h-[300px] object-contain" />
 </div>
 </div>
 ))}
 </div>

 {/* DESKTOP ACCORDION */}
 <div className="hidden xl:grid grid-cols-2 w-full">
 {/* Left: sub-heading + accordion */}
 <div className="border-r border-[#848484] flex flex-col">
 {/* Sub-heading */}
 <div className="px-[clamp(24px,4.16vw,60px)] py-[clamp(24px,2.77vw,40px)]">
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 We deploy four structural systems to force growth. We reconstruct
 the digital ecosystem to logically dismantle buyer hesitation.
 </p>
 </div>

 {/* Accordion items */}
 {items.map((item, i) => (
 <div key={i} className="border-t border-[#848484]">
 <button
 onClick={() => toggle(i)}
 className="w-full px-[clamp(24px,4.16vw,60px)] py-[clamp(24px,2.77vw,40px)] flex items-center justify-between group"
 >
 <div className="flex items-center gap-[20px]">
 {/* Number badge */}
 <div
 className="bg-white rounded-[6px] w-[32px] h-[32px] flex items-center justify-center text-[#121212] font-semibold shrink-0"
 style={{ fontSize: "14px" }}
 >
 {item.num}
 </div>
 <h3
 className="font-semibold text-white text-left"
 style={{
 fontSize: "clamp(20px, 1.66vw, 96px)",
 letterSpacing: "-0.02em",
 lineHeight: "100%",
 }}
 >
 {item.title}
 </h3>
 </div>

 {/* Arrow icon — animate rotation */}
 <motion.img
 src="/down-arrow.svg"
 alt="toggle"
 className="w-[20px] h-auto shrink-0"
 animate={{ rotate: openIndex === i ? 180 : 0 }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
 />
 </button>

 {/* Expandable content */}
 <AnimatePresence initial={false}>
 {openIndex === i && (
 <motion.div
 key="content"
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.35, ease: "easeInOut" }}
 className="overflow-hidden"
 >
 <div className="px-[clamp(24px,4.16vw,60px)] pb-[clamp(24px,2.77vw,40px)]">
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 {item.text}
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 ))}
 </div>

 {/* Right: Visual display */}
 <div className="flex items-center justify-center p-[clamp(24px,4.16vw,60px)] min-h-[320px] xl:min-h-[640px] bg-dotted-pattern">
 <AnimatePresence mode="wait">
 {openIndex !== null && (
 <motion.img
 key={openIndex}
 src={items[openIndex].visual}
 alt={items[openIndex].title}
 className="w-full h-auto max-h-[500px] object-contain"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
 />
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>

 
 </div>
 );
}
