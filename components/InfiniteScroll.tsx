// components/InfiniteScroll.tsx
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function InfiniteScroll() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current!;
        const tween = gsap.to(scroller, {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "none",
        });

        return () => {
            tween.kill();
        };
    }, []);

    return (
        <div className="overflow-hidden py-20">
            <div ref={scrollerRef} className="flex whitespace-nowrap">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-6xl mx-8 text-[#606C38]/30">
                        Crafted with Intent •
                    </span>
                ))}
            </div>
        </div>
    );
}
