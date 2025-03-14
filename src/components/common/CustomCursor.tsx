"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState("default");
    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const arrowCursorRef = useRef<HTMLDivElement>(null);
    const mouseStopped = useRef<NodeJS.Timeout | null>(null);

    // Initialize and set the mounted state
    useEffect(() => {
        setIsMounted(true);

        // Short delay to show cursor only after component is mounted
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Handle mouse move and hover events
    useEffect(() => {
        if (!isMounted) return;

        // Track mouse position
        const updateMousePosition = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Update state for React rendering
            setMousePosition({ x: clientX, y: clientY });

            // Reset mouse stopped timer
            if (mouseStopped.current) {
                clearTimeout(mouseStopped.current);
            }

            // Hide cursor after 2 seconds of inactivity
            mouseStopped.current = setTimeout(() => {
                if (cursorOuterRef.current && cursorInnerRef.current) {
                    gsap.to(
                        [
                            cursorOuterRef.current,
                            cursorInnerRef.current,
                            arrowCursorRef.current,
                        ],
                        {
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.out",
                        }
                    );
                }
            }, 2000);

            // Show cursor when it moves
            if (cursorOuterRef.current && cursorInnerRef.current) {
                gsap.to([cursorOuterRef.current, cursorInnerRef.current], {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out",
                });
            }
        };

        // Handle project elements with improved targeting
        const handleProjectElements = () => {
            const projectElements = document.querySelectorAll(
                ".project-image, [data-cursor-project], .hover-project"
            );

            projectElements.forEach((element) => {
                // Check if element is within excluded sections
                const isInExcludedSection =
                    element.closest('section[data-section="faq"]') ||
                    element.closest('section[data-section="contact"]') ||
                    element.closest("footer") ||
                    element.closest("section:has(.faq-item)") ||
                    element.closest("section:has(.contact-form)");

                if (isInExcludedSection) {
                    return; // Skip hover effects for these sections
                }

                element.addEventListener("mouseenter", () => {
                    setIsHovering(true);
                    setCursorVariant("project");

                    // Hide default cursor elements
                    if (cursorOuterRef.current && cursorInnerRef.current) {
                        gsap.to(
                            [cursorOuterRef.current, cursorInnerRef.current],
                            {
                                opacity: 0,
                                duration: 0.2,
                                ease: "power2.out",
                            }
                        );
                    }
                    // Show arrow cursor
                    if (arrowCursorRef.current) {
                        gsap.to(arrowCursorRef.current, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                });

                element.addEventListener("mouseleave", () => {
                    setIsHovering(false);
                    setCursorVariant("default");

                    // Show default cursor elements
                    if (cursorOuterRef.current && cursorInnerRef.current) {
                        gsap.to(
                            [cursorOuterRef.current, cursorInnerRef.current],
                            {
                                opacity: 1,
                                duration: 0.2,
                                ease: "power2.out",
                            }
                        );
                    }
                    // Hide arrow cursor
                    if (arrowCursorRef.current) {
                        gsap.to(arrowCursorRef.current, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                });
            });
        };

        // Handle interactive elements with more specific cursor types
        const handleInteractiveElement = (element: Element) => {
            // Skip elements in excluded sections
            const isInExcludedSection =
                element.closest('section[data-section="faq"]') ||
                element.closest('section[data-section="contact"]') ||
                element.closest("footer") ||
                element.closest("section:has(.faq-item)") ||
                element.closest("section:has(.contact-form)");

            // Skip navigation elements or elements in excluded sections
            if (
                element.closest("header") ||
                element.closest("nav") ||
                element.closest(".nav-item") ||
                element.hasAttribute("data-no-cursor") ||
                isInExcludedSection
            ) {
                return;
            }

            // Determine specific cursor behavior for different element types
            const isLink =
                element.tagName.toLowerCase() === "a" ||
                element.hasAttribute("data-cursor-link");

            const isButton =
                element.tagName.toLowerCase() === "button" ||
                element.hasAttribute("data-cursor-button") ||
                (element.hasAttribute("role") &&
                    element.getAttribute("role") === "button");

            const isText =
                element.tagName.toLowerCase() === "input" ||
                element.tagName.toLowerCase() === "textarea";

            element.addEventListener("mouseenter", () => {
                setIsHovering(true);

                // Check for custom variants
                if (isLink) {
                    setCursorVariant("link");
                } else if (isButton) {
                    setCursorVariant("button");
                } else if (isText) {
                    setCursorVariant("text");
                } else {
                    setCursorVariant("hover");
                }

                // Check for data attributes for custom cursor behavior
                const target = element as HTMLElement;
                const cursorCustomText =
                    target.getAttribute("data-cursor-text");
                const isLarge = target.hasAttribute("data-cursor-large");
                const isExtraLarge = target.hasAttribute("data-cursor-xl");

                if (cursorCustomText) {
                    setCursorText(cursorCustomText);
                }

                if (isLarge && cursorOuterRef.current) {
                    gsap.to(cursorOuterRef.current, {
                        scale: 2,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                } else if (isExtraLarge && cursorOuterRef.current) {
                    gsap.to(cursorOuterRef.current, {
                        scale: 3,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                }
            });

            element.addEventListener("mouseleave", () => {
                setIsHovering(false);
                setCursorVariant("default");
                setCursorText("");

                if (cursorOuterRef.current) {
                    gsap.to(cursorOuterRef.current, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                }
            });
        };

        // Handle mouse down/up events for click animations
        const handleMouseDown = () => {
            setIsClicking(true);
            setCursorVariant((prev) => `${prev}-active`);
        };

        const handleMouseUp = () => {
            setIsClicking(false);
            setCursorVariant((prev) => prev.replace("-active", ""));
        };

        // Add event listeners
        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Add event listeners to interactive elements with a delay to ensure DOM is ready
        setTimeout(() => {
            // Get more specific with selectors
            const interactiveElements = document.querySelectorAll(
                "a, button, [data-cursor], input, textarea, [data-cursor-text], [data-cursor-large], [data-cursor-xl], [role='button'], .hover-underline, .interactive"
            );

            // Add project elements handling
            handleProjectElements();

            // Add interactive elements handling
            interactiveElements.forEach(handleInteractiveElement);
        }, 500);

        // Mobile detection and handling
        const handleTouchStart = () => {
            if (
                cursorOuterRef.current &&
                cursorInnerRef.current &&
                arrowCursorRef.current
            ) {
                gsap.to(
                    [
                        cursorOuterRef.current,
                        cursorInnerRef.current,
                        arrowCursorRef.current,
                    ],
                    {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    }
                );
            }
        };

        window.addEventListener("touchstart", handleTouchStart);

        // Hide default cursor
        document.documentElement.classList.add("cursor-custom");

        // Clean up event listeners
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchstart", handleTouchStart);
            document.documentElement.classList.remove("cursor-custom");

            if (mouseStopped.current) {
                clearTimeout(mouseStopped.current);
            }
        };
    }, [isMounted, cursorVariant]);

    // Define cursor variants and their styles
    const getCursorVariantStyles = (variant: string) => {
        switch (variant) {
            case "link":
            case "link-active":
                return {
                    scale: 1.2,
                    borderWidth: "1px",
                    borderColor: "rgba(255, 255, 255, 0.8)",
                };
            case "button":
            case "button-active":
                return {
                    scale: 1.5,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: "1px",
                };
            case "project":
                return {
                    opacity: 0,
                };
            case "text":
                return {
                    scale: 0.5,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    mixBlendMode: "exclusion" as const,
                };
            case "hover":
            case "hover-active":
                return {
                    scale: 1.3,
                    borderWidth: "1px",
                };
            case "default-active":
                return {
                    scale: 0.8,
                };
            default:
                return {};
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {/* Larger outer cursor circle */}
            <motion.div
                ref={cursorOuterRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-50 mix-blend-difference custom-cursor"
                animate={{
                    translateX: mousePosition.x - 16,
                    translateY: mousePosition.y - 16,
                    ...getCursorVariantStyles(cursorVariant),
                    opacity: isVisible ? 1 : 0,
                    scale: isClicking
                        ? 0.8
                        : cursorVariant.includes("link") ||
                          cursorVariant.includes("button") ||
                          cursorVariant.includes("hover")
                        ? 1.5
                        : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5,
                }}
            >
                {cursorText && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium">
                        {cursorText}
                    </div>
                )}
            </motion.div>

            {/* Small inner cursor dot */}
            <motion.div
                ref={cursorInnerRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference custom-cursor"
                animate={{
                    translateX: mousePosition.x - 1,
                    translateY: mousePosition.y - 1,
                    scale: isClicking ? 0.5 : isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    mass: 0.1,
                }}
            />

            {/* Project hover arrow cursor */}
            <motion.div
                ref={arrowCursorRef}
                className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full flex items-center justify-center pointer-events-none z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    translateX: mousePosition.x - 48,
                    translateY: mousePosition.y - 48,
                    opacity:
                        isHovering && isVisible && cursorVariant === "project"
                            ? 1
                            : 0,
                    scale: isHovering && cursorVariant === "project" ? 1 : 0.8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                }}
            >
                <motion.div
                    animate={{
                        x: isClicking ? 2 : 0,
                        y: isClicking ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <ArrowUpRight className="w-8 h-8 text-black" />
                </motion.div>
            </motion.div>
        </>
    );
}
