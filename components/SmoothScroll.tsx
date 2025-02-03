"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {

                y: () =>
                    -(containerRef.current!.scrollHeight - window.innerHeight),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    });

    return (
        <div ref={containerRef} className="fixed top-0 left-0 w-full">
            {children}
        </div>
    );
}
