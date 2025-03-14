"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";
import Link from "next/link";

// Use a single run flag for this session only
let animationRanThisSession = false;

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const backgroundImageUrl = "/images/background.jpg";

    // Add client-side only state to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    const titleTextRef = useRef<SplitType | null>(null);
    // Mark component as mounted on client-side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle mouse movement for subtle parallax
    useEffect(() => {
        if (!isMounted) return;

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
    }, [isMounted]);

    // Handle text animation
    useEffect(() => {
        if (!isMounted || !titleRef.current) return;

        // Store a reference to the current elements for cleanup
        const titleElement = titleRef.current;
        let chars: HTMLElement[] | null = null;

        // If animation already ran this session, don't run it again
        if (animationRanThisSession) {
            // Just make text visible
            if (titleElement) {
                titleElement.style.opacity = "1";
            }
            return;
        }

        // Set this to prevent duplicate animations in the same session
        animationRanThisSession = true;

        // Create animation timeline
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
        });

        // Background fade in
        if (backgroundRef.current) {
            tl.fromTo(
                backgroundRef.current,
                { scale: 1.05, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.8 }
            );
        }

        // Make title container visible first with no opacity during setup
        gsap.set(titleElement, { autoAlpha: 1, opacity: 1 });

        // Split text into characters
        titleTextRef.current = new SplitType(titleElement, {
            types: "chars",
            tagName: "span",
        });

        // After a small delay to ensure splitting is complete, animate characters
        const animationTimeout = setTimeout(() => {
            if (
                titleTextRef.current?.chars &&
                titleTextRef.current.chars.length > 0
            ) {
                // Store chars for cleanup
                chars = titleTextRef.current.chars;

                // Set initial state
                gsap.set(chars, {
                    y: 100,
                    opacity: 0,
                    rotateX: -90,
                });

                // Animate each character
                tl.to(
                    chars,
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
            } else {
                // Fallback if characters not found
                gsap.to(titleElement, { opacity: 1, duration: 1 });
            }
        }, 100);

        return () => {
            // Cleanup
            clearTimeout(animationTimeout);
            tl.kill();

            // Kill tweens using the stored references
            gsap.killTweensOf(titleElement);
            if (chars) {
                gsap.killTweensOf(chars);
            }

            // Ensure text is visible
            if (titleElement) {
                titleElement.style.opacity = "1";
            }
        };
    }, [isMounted]);

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
                    className="object-cover w-full h-full"
                    style={{
                        objectPosition: "65% center", // Position to show the face
                    }}
                />

                {/* Dynamic overlay with gradient that shifts based on mouse position */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black bg-opacity-20"
                    style={
                        isMounted
                            ? {
                                  backgroundImage:
                                      "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                              }
                            : undefined
                    }
                />

                {/* Subtle grain texture overlay */}
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Main content container */}
            <div className="absolute bottom-16 left-0 right-0 z-20 px-6 md:px-12 lg:px-16">
                <div className="container">
                    {/* Main headline at bottom - left aligned with updated font sizes for all screens */}
                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-medium leading-tight tracking-tight text-white max-w-7xl overflow-visible visibility-visible"
                        style={{
                            opacity: 0, // Start invisible and let animation make it visible
                            visibility: "visible", // But always keep it in the flow
                        }}
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

            {/* Social links in bottom right - only visible on large screens */}
            <div className="absolute bottom-16 right-16 z-20 hidden lg:flex flex-col items-end gap-2 text-white">
                <Link
                    href="https://www.linkedin.com/company/srsvti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl lg:text-2xl xl:text-4xl 2xl:text-5xl text-white hover:opacity-80 transition-opacity"
                >
                    LinkedIn
                </Link>
                <Link
                    href="https://www.behance.net/therynman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl lg:text-2xl xl:text-4xl 2xl:text-5xl text-white hover:opacity-80 transition-opacity"
                >
                    Instagram
                </Link>
            </div>
        </section>
    );
};

export default Hero;
