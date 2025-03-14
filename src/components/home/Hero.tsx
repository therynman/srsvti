"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const backgroundImageUrl = "/images/background.jpg";

    // Handle mouse movement for subtle parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth - 0.5;
            const y = clientY / window.innerHeight - 0.5;

            // Subtle background movement
            if (backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                    x: x * 20, // Subtle movement
                    y: y * 20,
                    duration: 1.2,
                    ease: "power2.out",
                });
            }

            // Subtle overlay gradient shift
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    backgroundImage: `radial-gradient(circle at ${
                        50 + x * 10
                    }% ${
                        50 + y * 10
                    }%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)`,
                    duration: 1.5,
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // GSAP animations on mount
    useEffect(() => {
        if (!titleRef.current) return;

        // Create a timeline for sequential animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial fade in of background
        if (backgroundRef.current) {
            tl.fromTo(
                backgroundRef.current,
                { scale: 1.05, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.8 }
            );
        }

        // Split heading text for character animation
        const titleText = new SplitType(titleRef.current, {
            types: "chars",
            tagName: "span",
        });

        // Staggered animation for each character
        tl.fromTo(
            titleText.chars || [],
            {
                y: 100,
                opacity: 0,
                rotateX: -90,
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.03,
                ease: "power4.out",
            },
            "-=0.8"
        );

        // Cleanup
        return () => {
            if (titleText && typeof titleText.revert === "function") {
                titleText.revert();
            }
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="h-screen w-full overflow-hidden relative bg-black"
        >
            {/* Background Image with parallax effect */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 w-full h-full transform"
            >
                <Image
                    src={backgroundImageUrl}
                    alt="Creative studio background"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover transition-transform duration-500"
                    style={{
                        objectPosition: "65% center", // Position to show the face
                    }}
                />

                {/* Dynamic overlay with gradient that shifts based on mouse position */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black bg-opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                    }}
                />

                {/* Subtle grain texture overlay */}
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Main content container */}
            <div className="absolute bottom-16 left-0 right-0 z-20 px-6 md:px-12 lg:px-16">
                <div className="container">
                    {/* Main headline at bottom - left aligned */}
                    <h1
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-6xl font-medium leading-tight tracking-tight text-white max-w-5xl overflow-hidden"
                    >
                        Creative studio crafting
                        <br />
                        beautiful experiences and
                        <br />
                        products for the greatest
                        <br />
                        brands.
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;
