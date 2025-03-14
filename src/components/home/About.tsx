"use client";

import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Initialize with center of screen to avoid awkward initial position
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [hasMouseMoved, setHasMouseMoved] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // For parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Available images to cycle through
    const images = [
        "/images/mission.jpg",
        "/images/brands.jpg",
        "/images/design.jpg",
        "/images/results.jpg",
    ];

    // Initialize default position to center of screen and add scroll listener
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Set initial position to center of viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            setMousePosition({ x: centerX, y: centerY });
            setTargetPosition({ x: centerX, y: centerY });

            // Handle scroll event to reset hover state
            const handleScroll = () => {
                setScrollY(window.scrollY);
                setIsHovering(false);
                setHasMouseMoved(false);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // Handle mouse movement within the text container
    const handleMouseMove = (e: React.MouseEvent) => {
        setHasMouseMoved(true);
        setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    // Smooth cursor following effect
    useEffect(() => {
        if (!isHovering) return;

        let animationFrameId: number;

        const animatePosition = () => {
            // Smooth interpolation
            setMousePosition((prev) => ({
                x: prev.x + (targetPosition.x - prev.x) * 0.1,
                y: prev.y + (targetPosition.y - prev.y) * 0.1,
            }));

            animationFrameId = requestAnimationFrame(animatePosition);
        };

        animationFrameId = requestAnimationFrame(animatePosition);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovering, targetPosition, scrollY]);

    // Automatic image rotation while hovering
    useEffect(() => {
        if (!isHovering) return;

        const intervalId = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 500); // Change image every 0.5 seconds for even faster cycling

        return () => clearInterval(intervalId);
    }, [isHovering, images.length, scrollY]);

    // GSAP animations setup with more refined timing and effects
    useEffect(() => {
        if (!sectionRef.current || !headlineRef.current) return;

        // Split text into words and animate each word
        const words = headlineRef.current.querySelectorAll(".word");

        gsap.fromTo(
            words,
            {
                opacity: 0,
                y: 30,
                filter: "blur(5px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.04, // Slightly increased for more noticeable effect
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headlineRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate the paragraph text with a slight delay
        const paragraphElement =
            sectionRef.current.querySelector(".intro-paragraph");
        if (paragraphElement) {
            gsap.fromTo(
                paragraphElement,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: paragraphElement,
                        start: "top bottom-=80",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Calculate image position to keep it within viewport
    const calculateImagePosition = () => {
        if (typeof window === "undefined") return { left: 0, top: 0 };

        // Base position (offset slightly from cursor for better visibility)
        const baseLeft = mousePosition.x - 150;
        const baseTop = mousePosition.y - 120;

        // Viewport dimensions
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;

        // Image dimensions
        const imgWidth = 300;
        const imgHeight = 200;

        // Ensure image stays within viewport
        const left = Math.max(20, Math.min(vpWidth - imgWidth - 20, baseLeft));
        const top = Math.max(20, Math.min(vpHeight - imgHeight - 20, baseTop));

        return { left, top };
    };

    const imagePosition = calculateImagePosition();

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-24 bg-white text-black overflow-visible"
        >
            {/* Everything inside a single container with consistent padding */}
            <motion.div className="container mx-auto px-0" style={{ y }}>
                <div className="mx-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-0">
                        {/* Left column with small text */}
                        <div className="lg:col-span-4 pl-[64px] md:pl-16 lg:pl-[64px] pr-8">
                            <motion.p
                                className="text-lg text-gray-600 intro-paragraph relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                Most agencies focus only on aesthetics. But
                                what&apos;s the point of a beautiful website if
                                it doesn&apos;t bring in customers? At{" "}
                                <span className="font-medium relative inline-block">
                                    Srsvti
                                </span>
                                , we combine world-class design with
                                conversion-driven strategies.
                            </motion.p>
                        </div>

                        {/* Right column with mission statement */}
                        <div className="lg:col-span-8 pl-[64px] md:pl-16 lg:pl-[64px] mt-12 lg:mt-0 relative">
                            {/* Matched exactly to Hero font size */}
                            <div
                                ref={textContainerRef}
                                className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight relative z-10 group"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => {
                                    setIsHovering(true);
                                }}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <div ref={headlineRef}>
                                    {/* Combined into a single paragraph with proper line height to prevent cut-off */}
                                    <div
                                        className="flex flex-wrap"
                                        style={{ lineHeight: 1.2 }}
                                    >
                                        <span className="word mr-2 inline-block overflow-hidden pb-1">
                                            Our
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            mission
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            is
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            to
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            create
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            brands
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            and
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            websites
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            that
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            don&apos;t
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            just
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            look
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            good—but
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            work
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            for
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            you.
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            Because
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            design
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            isn&apos;t
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            just
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            art.
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            It&apos;s
                                        </span>
                                        <span className="word mr-2 inline-block overflow-hidden">
                                            business.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating image that follows the mouse - with enhanced transitions */}
                            <AnimatePresence>
                                {/* Only show image when hovering AND after mouse has moved */}
                                {isHovering && hasMouseMoved && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            transition: {
                                                type: "spring",
                                                damping: 20,
                                                stiffness: 150,
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            y: 10,
                                            transition: {
                                                duration: 0.3,
                                            },
                                        }}
                                        className="fixed pointer-events-none z-30"
                                        style={{
                                            left: imagePosition.left,
                                            top: imagePosition.top,
                                            width: "300px",
                                            height: "200px",
                                        }}
                                        ref={imageRef}
                                    >
                                        <div className="w-full h-full overflow-hidden rounded-md shadow-xl">
                                            <Image
                                                src={images[activeImageIndex]}
                                                alt="Hover image"
                                                fill
                                                className="object-cover"
                                                sizes="300px"
                                                priority
                                            />
                                            {/* Add subtle grain texture overlay */}
                                            <div className="absolute inset-0 bg-black/5 opacity-20 mix-blend-overlay" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
