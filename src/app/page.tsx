"use client";

import Navbar from "../components/Navbar";
import VideoSection from "../components/VideoSection";
import MethodologySection from "../components/MethodologySection";
import CTASection from "../components/CTASection";
import ROISection from "../components/ROISection";
import CriteriaSection from "../components/CriteriaSection";
import FooterSection from "../components/FooterSection";
import dynamic from "next/dynamic";

const AnimatedHeading = dynamic(() => import("../components/AnimatedHeading"), { ssr: false });
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
 const heroRef = useRef<HTMLDivElement>(null);
 const nextSectionRef = useRef<HTMLDivElement>(null);
 const section3Ref = useRef<HTMLDivElement>(null);
 const section4Ref = useRef<HTMLDivElement>(null);
 const section5Ref = useRef<HTMLDivElement>(null);
 const section6Ref = useRef<HTMLDivElement>(null);
 const section7Ref = useRef<HTMLDivElement>(null);
 const section8Ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 // Small delay to ensure DOM is ready and Lenis is initialized
 const timer = setTimeout(() => {
 ScrollTrigger.refresh();
 }, 100);

  let mm = gsap.matchMedia();
  // GSAP SCROLL STACKING COMPLETELY REMOVED FOR PURE NATIVE FLOW
  return () => {
  clearTimeout(timer);
  if (mm) mm.revert();
  };
  }, []);

 return (
 <main className="min-h-screen bg-[#121212] flex flex-col text-white font-sans w-full">
 
 {/* Navbar with auto-hide behavior */}
 <Navbar />

 {/* Spacer for fixed navbar */}
 <div className="h-[97px] w-full shrink-0" />

 {/* Main Content Area: Side borders, spaced fluidly from screen edges */}
 <div className="mx-[clamp(16px,4.16vw,60px)] border-x border-[#848484] flex-grow flex flex-col">
 
 {/* HERO SECTION — will be pinned by GSAP when fully visible */}
 <div ref={heroRef} className="w-full flex flex-col bg-[#121212] " style={{ zIndex: 1 }}>
 {/* Text Section */}
 <div className="px-[clamp(16px,4.16vw,60px)] pt-[clamp(60px,5.55vw,80px)] pb-[clamp(40px,4.16vw,60px)] w-full">
 <div className="flex flex-col xl:grid xl:grid-cols-12 gap-[clamp(24px,3vw,12px)] items-start xl:items-end">
 {/* Heading: 8 grids */}
 <div className="w-full xl:col-span-6">
 <AnimatedHeading
 className="font-medium"
 style={{ 
 fontSize: 'clamp(32px, 2.77vw, 160px)', 
 letterSpacing: '-0.04em',
 lineHeight: '100%'
 }}
 >
 <span className="text-[#0077FF]">Clinical Grade Product</span>. You Are Selling It Like A Commodity
 </AnimatedHeading>
 </div>

 {/* Subheadline: 4 grids on the right */}
 <div className="w-full xl:col-span-4 xl:col-start-9 mt-6 xl:mt-0">
 <p 
 className="font-medium text-white/80"
 style={{ 
 fontSize: 'clamp(14px, 1.11vw, 64px)', 
 letterSpacing: '0',
 lineHeight: '100%'
 }}
 >
 You are scaling acquisition on top of an emotionally dead retention architecture. We engineer the digital trust systems required to convert isolated buyers into long term health subscriptions.
 </p>
 </div>
 </div>
 </div>

 {/* Hero Graphics Pattern Area */}
 <div className="w-full border-t border-[#848484] bg-dotted-pattern flex items-center justify-center">
 <div className="w-full px-[clamp(16px,4.16vw,60px)] py-[clamp(24px,4.16vw,60px)]">
 <img 
 src="/Hero Graphics.svg" 
 alt="Hero Graphics" 
 className="w-full h-auto object-contain"
 id="hero-graphic"
 />
 </div>
 </div>
 </div>

 {/* SECTION 2: Delusion vs Reality — slides over the pinned hero */}
 <div ref={nextSectionRef} className="w-full flex flex-col bg-[#121212] border-t border-[#848484] " style={{ zIndex: 2, position: 'relative' }}>
 {/* Header */}
 <div className="px-[clamp(16px,4.16vw,60px)] pt-[clamp(80px,11.11vw,160px)] pb-[clamp(40px,5.55vw,80px)]">
 <AnimatedHeading
 className="font-medium"
 style={{ 
 fontSize: 'clamp(32px, 2.77vw, 160px)', 
 letterSpacing: '-0.04em',
 lineHeight: '100%'
 }}
 >
 On the <span className="text-[#0077FF]">surface</span>, the brand projects authority. <span className="text-[#0077FF]">Economically</span>, the infrastructure behaves like a beginner
 </AnimatedHeading>
 </div>

 {/* Grid */}
 <div className="w-full flex flex-col xl:grid xl:grid-cols-2 border-t border-[#848484]">
 {/* Left Graphic */}
 <div className="border-b xl:border-b-0 xl:border-r border-[#848484] bg-dotted-pattern flex items-center justify-center p-[clamp(24px,4.16vw,60px)] min-h-[400px] xl:min-h-[800px]">
 <img src="/Delusion vs Reality Graphics.svg" alt="Delusion vs Reality" className="w-full h-auto xl:w-[80%] max-w-[80vw] xl:max-w-[700px] object-contain" />
 </div>

 {/* Right Cards */}
 <div className="flex flex-col h-full">
 {/* Delusion Card */}
 <div className="flex-1 border-b border-[#848484] px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] xl:pb-[60px] flex flex-col">
 <div className="flex items-center gap-[16px] mb-6">
 <div className="bg-white rounded-[4px] w-[26px] h-[26px] flex flex-shrink-0 items-center justify-center">
 <img src="/Cross.svg" alt="Cross" className="w-[12px] h-auto" />
 </div>
 <h3 className="font-semibold text-white" style={{ fontSize: 'clamp(24px, 2.22vw, 128px)', letterSpacing: '-0.02em', lineHeight: '100%' }}>The Delusion</h3>
 </div>
 <p 
 className="font-medium text-white/80"
 style={{ 
 fontSize: 'clamp(14px, 1.11vw, 64px)', 
 letterSpacing: '0',
 lineHeight: '140%'
 }}
 >
 Relying on minimalist packaging and ingredient transparency creates a false sense of security. Educating the customer does not automatically build emotional trust. Framing a subscription model as a simple pricing discount traps the brand in a volume driven commodity loop.
 </p>
 </div>

 {/* Reality Card */}
 <div className="flex-1 px-[clamp(16px,4.16vw,60px)] py-[clamp(40px,5.55vw,60px)] xl:pt-[60px] xl:pb-[60px] flex flex-col">
 <div className="flex items-center gap-[16px] mb-6">
 <div className="bg-white rounded-[4px] w-[26px] h-[26px] flex flex-shrink-0 items-center justify-center">
 <img src="/Tick.svg" alt="Tick" className="w-[12px] h-auto" />
 </div>
 <h3 className="font-semibold text-white" style={{ fontSize: 'clamp(24px, 2.22vw, 128px)', letterSpacing: '-0.02em', lineHeight: '100%' }}>The Reality</h3>
 </div>
 <p 
 className="font-medium text-white/80"
 style={{ 
 fontSize: 'clamp(14px, 1.11vw, 64px)', 
 letterSpacing: '0',
 lineHeight: '140%'
 }}
 >
 The market only sees another replaceable supplement. Capital is currently bleeding into Meta ads to capture single purchases. Hoping that product efficacy alone will drive repeat business is not a viable growth model. Customer Acquisition Cost rises daily while Lifetime Value remains trapped on a plateau.
 </p>
 </div>
 </div>
 </div>
 
 
 </div>

 {/* SECTION 3: Video Section */}
 <div ref={section3Ref} className="relative" style={{ zIndex: 3 }}>
 <VideoSection />
 </div>

 {/* SECTION 4: Methodology Accordion */}
 <div ref={section4Ref} className="relative" style={{ zIndex: 4 }}>
 <MethodologySection />
 </div>

 {/* SECTION 5: CTA */}
 <div ref={section5Ref} className="relative" style={{ zIndex: 5 }}>
 <CTASection />
 </div>

 {/* SECTION 6: ROI Guarantee */}
 <div ref={section6Ref} className="relative" style={{ zIndex: 6 }}>
 <ROISection />
 </div>

 {/* SECTION 7: Criteria */}
 <div ref={section7Ref} className="relative" style={{ zIndex: 7 }}>
 <CriteriaSection />
 </div>

 {/* SECTION 8: Footer */}
 <div ref={section8Ref} className="relative" style={{ zIndex: 8 }}>
 <FooterSection />
 </div>

 {/* Bottom Border & Gap — padding matches side margins for uniform look */}
 <div className="w-full border-t border-[#848484]"></div>
 <div style={{ height: "clamp(16px, 4.16vw, 60px)" }} className="w-full bg-[#121212]"></div>

 </div>
 </main>
 );
}