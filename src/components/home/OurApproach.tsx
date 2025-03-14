"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useInView,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const OurApproach = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // State for mouse following images
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [hasMouseMoved, setHasMouseMoved] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // For scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Image paths for each section
    const sectionImages = [
        "/images/understanding-research.jpg",
        "/images/strategy-design.jpg",
        "/images/collaboration-delivery.jpg",
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

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
                setActiveSection(null);
                setHasMouseMoved(false);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // Set up GSAP scroll animations
    useEffect(() => {
        if (!sectionRef.current) return;

        // Get all approach sections
        const sections =
            sectionRef.current.querySelectorAll(".approach-section");

        sections.forEach((section) => {
            // Create a timeline for each section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animate the section line
            const sectionLine = section.querySelector(".section-line");
            if (sectionLine) {
                tl.fromTo(
                    sectionLine,
                    { width: 0 },
                    { width: "100%", duration: 1, ease: "power2.inOut" },
                    0
                );
            }

            // Animate the title
            const title = section.querySelector("h3");
            if (title) {
                tl.fromTo(
                    title,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    0.2
                );
            }

            // Animate the description
            const description = section.querySelector("p");
            if (description) {
                tl.fromTo(
                    description,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    0.4
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Handle mouse movement
    const handleMouseMove = (e: React.MouseEvent, sectionIndex: number) => {
        setHasMouseMoved(true);
        setTargetPosition({ x: e.clientX, y: e.clientY });
        setActiveSection(sectionIndex);
    };

    // Smooth cursor following effect
    useEffect(() => {
        if (activeSection === null) return;

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
    }, [activeSection, targetPosition, scrollY]);

    // Calculate image position to keep it within viewport
    const calculateImagePosition = () => {
        if (typeof window === "undefined") return { left: 0, top: 0 };

        // Base position (offset slightly from cursor for better visibility)
        const baseLeft = mousePosition.x - 150;
        const baseTop = mousePosition.y - 100;

        // Viewport dimensions
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;

        // Image dimensions (3:4 ratio)
        const imgWidth = 240;
        const imgHeight = 320;

        // Ensure image stays within viewport
        const left = Math.max(20, Math.min(vpWidth - imgWidth - 20, baseLeft));
        const top = Math.max(20, Math.min(vpHeight - imgHeight - 20, baseTop));

        return { left, top };
    };

    const imagePosition = calculateImagePosition();

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-white">
            <motion.div className="container mx-auto px-0" style={{ y }}>
                {/* Section heading */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mb-16 pl-[64px] md:pl-16 lg:pl-[64px]"
                >
                    <div className="flex flex-col space-y-4">
                        <motion.h2
                            ref={headingRef}
                            className="text-4xl md:text-5xl lg:text-6xl font-light"
                            variants={headingVariants}
                        >
                            Our approach
                        </motion.h2>
                    </div>
                </motion.div>

                {/* First row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-200 py-16 pl-[64px] md:pl-16 lg:pl-[64px] pr-[64px] md:pr-16 lg:pr-[64px] approach-section"
                >
                    <div>
                        <motion.div className="section-line w-0 h-[1px] bg-black mb-6" />
                        <h3 className="text-2xl font-light">
                            Understanding &amp; Research:
                            <br />
                            The Foundation of Success
                        </h3>
                    </div>
                    <div
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseEnter={() => setActiveSection(0)}
                        onMouseLeave={() => setActiveSection(null)}
                        className="relative group"
                    >
                        <p className="text-lg text-gray-700">
                            Every great design starts with a deep understanding
                            of the problem. We begin by talking to you—learning
                            about your goals, challenges, and vision. Then, we
                            dive into research, analyzing your product, target
                            audience, and competitors. This ensures that our
                            design is not just visually appealing but
                            strategically positioned to outperform the
                            competition.
                        </p>

                        {/* Subtle indicator line */}
                        <motion.div
                            className="h-[1px] bg-black/20 w-0 mt-6"
                            animate={{
                                width: activeSection === 0 ? "100px" : 0,
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Second row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-200 py-16 pl-[64px] md:pl-16 lg:pl-[64px] pr-[64px] md:pr-16 lg:pr-[64px] approach-section"
                >
                    <div>
                        <motion.div className="section-line w-0 h-[1px] bg-black mb-6" />
                        <h3 className="text-2xl font-light">
                            Strategy &amp; Design:
                            <br />
                            Where Art Meets Conversion
                        </h3>
                    </div>
                    <div
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseEnter={() => setActiveSection(1)}
                        onMouseLeave={() => setActiveSection(null)}
                        className="relative group"
                    >
                        <p className="text-lg text-gray-700">
                            Unlike many agencies, we don&apos;t just focus on
                            aesthetics—we prioritize results. From wireframing
                            to visual design, we balance design factors (user
                            experience, brand identity) and marketing factors
                            (conversion optimization, engagement strategies)
                            simultaneously. Every element is crafted to attract,
                            engage, and convert your audience.
                        </p>

                        {/* Subtle indicator line */}
                        <motion.div
                            className="h-[1px] bg-black/20 w-0 mt-6"
                            animate={{
                                width: activeSection === 1 ? "100px" : 0,
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Third row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-200 py-16 pl-[64px] md:pl-16 lg:pl-[64px] pr-[64px] md:pr-16 lg:pr-[64px] approach-section"
                >
                    <div>
                        <motion.div className="section-line w-0 h-[1px] bg-black mb-6" />
                        <h3 className="text-2xl font-light">
                            Collaboration &amp; Delivery:
                            <br />
                            Refining for Perfection
                        </h3>
                    </div>
                    <div
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseEnter={() => setActiveSection(2)}
                        onMouseLeave={() => setActiveSection(null)}
                        className="relative group"
                    >
                        <p className="text-lg text-gray-700">
                            Design isn&apos;t a one-and-done process. We believe
                            in constant collaboration, checking in with you
                            regularly to ensure the project aligns with your
                            expectations. Once the final design is ready, we
                            deliver a solution that doesn&apos;t just look
                            great—it works. Whether it&apos;s a website,
                            branding, or marketing assets, our goal is simple:
                            maximize your business growth through design.
                        </p>

                        {/* Subtle indicator line */}
                        <motion.div
                            className="h-[1px] bg-black/20 w-0 mt-6"
                            animate={{
                                width: activeSection === 2 ? "100px" : 0,
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating image that follows the mouse with enhanced transitions */}
            <AnimatePresence>
                {activeSection !== null && hasMouseMoved && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                damping: 20,
                                stiffness: 170,
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
                            width: "240px",
                            height: "320px",
                        }}
                    >
                        <div className="w-full h-full overflow-hidden rounded-md shadow-2xl relative">
                            {activeSection !== null && (
                                <Image
                                    src={sectionImages[activeSection]}
                                    alt={`Approach section ${
                                        activeSection + 1
                                    }`}
                                    fill
                                    className="object-cover"
                                    sizes="240px"
                                    priority
                                />
                            )}

                            {/* Subtle grain texture overlay */}
                            <div className="absolute inset-0 bg-black/5 opacity-20 mix-blend-overlay" />

                            {/* Subtle gradient overlay at the bottom for better text visibility */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Section indicator */}
                            <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                                {activeSection === 0 &&
                                    "Understanding & Research"}
                                {activeSection === 1 && "Strategy & Design"}
                                {activeSection === 2 &&
                                    "Collaboration & Delivery"}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default OurApproach;
