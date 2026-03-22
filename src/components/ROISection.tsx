"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
 const numRef = useRef<HTMLSpanElement>(null);
 const [displayed, setDisplayed] = useState(0);
 const hasAnimated = useRef(false);

 useEffect(() => {
 const el = numRef.current;
 if (!el) return;

 ScrollTrigger.create({
 trigger: el,
 start: "top 85%",
 once: true,
 onEnter: () => {
 if (hasAnimated.current) return;
 hasAnimated.current = true;
 const obj = { val: 0 };
 gsap.to(obj, {
 val: value,
 duration: 1.5,
 ease: "power2.out",
 onUpdate: () => setDisplayed(Math.round(obj.val)),
 });
 },
 });
 }, [value]);

 return (
 <span ref={numRef} className="flex items-end">
 <span
 className="text-[#0077FF] font-semibold leading-none"
 style={{
 fontSize: "clamp(140px, 13.88vw, 800px)",
 letterSpacing: "-0.09em",
 }}
 >
 {displayed}
 </span>
 {suffix && (
 <span
 className="text-[#0077FF] font-semibold leading-none"
 style={{
 fontSize: "clamp(44px, 4.44vw, 256px)",
 letterSpacing: "-0.06em",
 }}
 >
 {suffix}
 </span>
 )}
 </span>
 );
}

export default function ROISection() {
 return (
 <div
 className="w-full flex flex-col bg-[#121212] border-t border-[#848484] "
 style={{ zIndex: 6, position: "relative" }}
 >
 {/* Centered heading */}
 <div className="px-[clamp(24px,4.16vw,60px)] pt-[clamp(80px,11.11vw,160px)] text-center">
 <AnimatedHeading
 className="font-medium"
 style={{
 fontSize: "clamp(32px, 2.77vw, 160px)",
 letterSpacing: "-0.04em",
 lineHeight: "100%",
 }}
 >
 The{" "}
 <span className="text-[#0077FF]">Return On Investment</span>{" "}
 Guarantee
 </AnimatedHeading>
 </div>

 {/* Centered paragraph */}
 <div className="px-[clamp(24px,4.16vw,60px)] mt-[clamp(24px,2.77vw,40px)] text-center">
 <p
 className="font-medium text-white/80 max-w-[680px] mx-auto"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 This is not a superficial website redesign. This is a surgical
 injection into the revenue architecture designed to permanently repair
 a funnel that is currently leaking capital.
 </p>
 </div>

 {/* Stats grid */}
 <div className="mt-[clamp(40px,5.55vw,80px)]">
 {/* Top row: 30% | 50% */}
 <div className="flex flex-col xl:grid xl:grid-cols-2 border-t border-[#848484]">
 {/* 30% */}
 <div className="border-b xl:border-b-0 xl:border-r border-[#848484] px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)] flex flex-col xl:flex-row items-start xl:items-end gap-[clamp(16px,2.77vw,40px)]">
 <AnimatedNumber value={30} suffix="%" />
 <p
 className="font-medium text-white/80 pb-[16px]"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 We project a minimum 30 percent lift in subscription adoption
 </p>
 </div>

 {/* 50% */}
 <div className="px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)] flex flex-col xl:flex-row items-start xl:items-end gap-[clamp(16px,2.77vw,40px)]">
 <AnimatedNumber value={50} suffix="%" />
 <p
 className="font-medium text-white/80 pb-[16px]"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 and a 50 percent increase in checkout conversions.
 </p>
 </div>
 </div>

 {/* Bottom row: 120 days — full width */}
 <div className="border-t border-[#848484] px-[clamp(24px,4.16vw,60px)] py-[clamp(40px,4.16vw,60px)] flex flex-col xl:flex-row items-start xl:items-end gap-[clamp(16px,2.77vw,40px)]">
 <AnimatedNumber value={120} suffix="" />
 <p
 className="font-medium text-white/80 pb-[16px]"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 If our structural overhaul does not cover the cost of the engagement
 within the first 120 days of launch, we work for free until it does.
 </p>
 </div>
 </div>

 
 </div>
 );
}
