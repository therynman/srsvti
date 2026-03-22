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

 const splitTypeModule = await import("split-type");
 const SplitType = splitTypeModule.default || splitTypeModule;

 // Split into words only — no line splitting (line splits create block divs)
 splitTextInstance = new SplitType(textRef.current, { types: "words" });

 // SplitType may turn parent <span> elements (e.g. colored text) and
 // its own wrappers into block/flex elements. Force EVERYTHING inside
 // the heading to be inline, then selectively set word wrappers to
 // inline-block for the reveal animation.
 const wordEls = new Set(splitTextInstance.words || []);
 const allEls = textRef.current.querySelectorAll("*");
 allEls.forEach((el: Element) => {
  const htmlEl = el as HTMLElement;
  if (!wordEls.has(htmlEl)) {
  // Non-word elements (colored spans, SplitType wrappers) must stay inline
  htmlEl.style.display = "inline";
  }
 });

 // Set word elements to inline-block with overflow hidden for reveal
 if (splitTextInstance.words) {
  splitTextInstance.words.forEach((word: HTMLElement) => {
  word.style.overflow = "hidden";
  word.style.display = "inline-block";
  word.style.paddingBottom = "0.2em";
  word.style.marginBottom = "-0.2em";
  });
 }

 // Set words initial state (pushed down and transparent)
 gsap.set(splitTextInstance.words, { y: "100%", opacity: 0 });

 // Create ScrollTrigger to animate when entering viewport
 ScrollTrigger.create({
  trigger: textRef.current,
  start: "top 85%",
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
  splitTextInstance.revert();
 }
 };
 }, []);

 return (
 <h2 ref={textRef} className={`font-medium ${className}`} style={style}>
 {children}
 </h2>
 );
}
