"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
 const cursorRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const cursor = cursorRef.current;
 if (!cursor) return;

 // GSAP quickTo for smooth interpolated following
 const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power2.out" });
 const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power2.out" });

 const handleMouseMove = (e: MouseEvent) => {
 xTo(e.clientX);
 yTo(e.clientY);
 };

 window.addEventListener("mousemove", handleMouseMove);
 return () => window.removeEventListener("mousemove", handleMouseMove);
 }, []);

 return (
 <div
 ref={cursorRef}
 data-custom-cursor
 className="pointer-events-none fixed top-0 left-0 z-[9999]"
 style={{ transform: "translate(-7px, -1px)" }}
 >
 <img
 src="/custom-cursor.svg"
 alt=""
 className="w-[24px] h-[24px] pointer-events-none"
 draggable={false}
 />
 </div>
 );
}
