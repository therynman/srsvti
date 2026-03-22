"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("./AnimatedHeading"), { ssr: false });

export default function VideoSection() {
 const videoRef = useRef<HTMLVideoElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);
 const cursorRef = useRef<HTMLDivElement>(null);
 const [showPopup, setShowPopup] = useState(false);

 // Custom play cursor follows mouse over video — replaces the site cursor entirely
 useEffect(() => {
 const container = containerRef.current;
 const cursor = cursorRef.current;
 if (!container || !cursor) return;

 const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power2.out" });
 const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power2.out" });

 const handleMove = (e: MouseEvent) => {
 const rect = container.getBoundingClientRect();
 xTo(e.clientX - rect.left);
 yTo(e.clientY - rect.top);
 };

 const handleEnter = () => {
 gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25 });
 // Hide the global custom cursor
 const globalCursor = document.querySelector("[data-custom-cursor]") as HTMLElement;
 if (globalCursor) globalCursor.style.opacity = "0";
 };
 const handleLeave = () => {
 gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.25 });
 // Show the global custom cursor again
 const globalCursor = document.querySelector("[data-custom-cursor]") as HTMLElement;
 if (globalCursor) globalCursor.style.opacity = "1";
 };

 container.addEventListener("mousemove", handleMove);
 container.addEventListener("mouseenter", handleEnter);
 container.addEventListener("mouseleave", handleLeave);

 return () => {
 container.removeEventListener("mousemove", handleMove);
 container.removeEventListener("mouseenter", handleEnter);
 container.removeEventListener("mouseleave", handleLeave);
 };
 }, []);

 return (
 <>
 {/* Section 3: Video Section */}
 <div className="w-full flex flex-col bg-[#121212] border-t border-[#848484] " style={{ zIndex: 3, position: "relative" }}>
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
 Aesthetic Design Will Not Fix Your <span className="text-[#0077FF]">Lifetime Value</span>
 </AnimatedHeading>
 </div>

 {/* Paragraph texts – 4 grids each on the right */}
 <div className="px-[clamp(24px,4.16vw,60px)] mt-[40px] border-t border-[#848484]">
 <div className="flex flex-col xl:grid xl:grid-cols-12 gap-[clamp(24px,3vw,12px)] pt-[clamp(24px,2.77vw,40px)]">
 {/* Empty left columns (4 grids) */}
 <div className="hidden xl:block xl:col-span-4" />

 {/* Paragraph 1: 5 grids */}
 <div className="w-full xl:col-span-4">
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 The functional wellness space is flooded with creative agencies
 that design beautiful websites but fail to comprehend behavioral
 economics. Srsvti does not operate like them. Our architectural
 frameworks originate from the high stakes financial technology
 sectors. In those environments, a fraction of a percent in
 conversion friction costs millions in lost capital.
 </p>
 </div>

 {/* Paragraph 2: 5 grids */}
 <div className="w-full xl:col-span-4">
 <p
 className="font-medium text-white/80"
 style={{
 fontSize: "clamp(14px, 1.11vw, 64px)",
 letterSpacing: "0",
 lineHeight: "140%",
 }}
 >
 We spent years engineering buyer trust in the most skeptical
 digital arenas on the internet. We bring that exact data driven
 rigor to functional wellness. We map specific buyer skepticism,
 rebuild subscription psychology, and mathematically justify
 absolute premium pricing.
 </p>
 </div>
 </div>
 </div>

 {/* Video area — 60px margin, stretches edge to edge, no border radius */}
 <div className="mt-[clamp(40px,4.16vw,60px)] pb-[clamp(40px,5.55vw,80px)]">
 <div
 ref={containerRef}
 className="relative w-full overflow-hidden"
 style={{ cursor: "none" }}
 onClick={() => setShowPopup(true)}
 >
 <video
 ref={videoRef}
 src="/section3-video.mp4"
 autoPlay
 loop
 muted
 playsInline
 className="w-full h-auto object-cover"
 />
 {/* Custom play cursor overlay — acts as the cursor itself */}
 <div
 ref={cursorRef}
 className="absolute top-0 left-0 pointer-events-none"
 style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" }}
 >
 <img
 src="/play-video.svg"
 alt="Play"
 className="w-[64px] h-[64px]"
 draggable={false}
 />
 </div>
 </div>
 </div>
 </div>

 {/* Video Popup Modal — portaled to body to escape z-index stacking */}
 {showPopup && createPortal(
 <div
 className="fixed inset-0 z-[9998] bg-black/80 flex items-center justify-center backdrop-blur-sm"
 onClick={() => setShowPopup(false)}
 style={{ cursor: "none" }}
 >
 <div
 className="relative w-[85vw] max-w-[1200px]"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Close button */}
 <button
 onClick={() => setShowPopup(false)}
 className="absolute -top-10 right-0 text-white/70 hover:text-white text-[14px] font-medium transition-colors"
 >
 Close ✕
 </button>
 <video
 src="/section3-video.mp4"
 autoPlay
 controls
 playsInline
 className="w-full h-auto"
 />
 </div>
 </div>,
 document.body
 )}
 </>
 );
}
