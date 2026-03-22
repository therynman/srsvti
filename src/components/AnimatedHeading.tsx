"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHeadingProps {
 children: React.ReactNode;
 className?: string;
 style?: React.CSSProperties;
}

export default function AnimatedHeading({ children, className = "", style }: AnimatedHeadingProps) {
 const textRef = useRef<HTMLHeadingElement>(null);

 useEffect(() => {
 let splitTextInstance: any;

 async function initSplitType() {
 if (!textRef.current) return;

 // Dynamically import SplitType
 const splitTypeModule = await import("split-type");
 const SplitType = splitTypeModule.default || splitTypeModule;

 // Split text into lines and words
 splitTextInstance = new SplitType(textRef.current, { types: "lines,words" });

 // Set line overflow hidden so words reveal from bottom
 if (splitTextInstance.lines) {
 splitTextInstance.lines.forEach((line: HTMLElement) => {
 line.style.overflow = "hidden";
 // To handle descenders (like 'g', 'p', 'y') properly without cutting them off,
 // we use a slight padding and negative margin (often a standard fix, but simple overflow usually suffices for this style)
 line.style.paddingBottom = "0.2em";
 line.style.marginBottom = "-0.2em";
 });
 }

 // Set words initial state (pushed down and transparent)
 gsap.set(splitTextInstance.words, { y: "100%", opacity: 0 });

 // Create ScrollTrigger to animate when entering viewport
 ScrollTrigger.create({
 trigger: textRef.current,
 start: "top 85%", // Trigger when it's 85% down the viewport
 once: true,
 onEnter: () => {
 gsap.to(splitTextInstance.words, {
 y: "0%",
 opacity: 1,
 duration: 1.2,
 stagger: 0.03,
 ease: "power4.out",
 });
 },
 });
 }

 initSplitType();

 return () => {
 if (splitTextInstance) {
 splitTextInstance.revert(); // clean up split-type on unmount
 }
 };
 }, []);

 // We render an h2 by default
 return (
 <h2 ref={textRef} className={`font-medium ${className}`} style={style}>
 {children}
 </h2>
 );
}
