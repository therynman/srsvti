"use client";

import React, { useRef, useEffect, PropsWithChildren, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface FluidHoverProps extends PropsWithChildren {
    intensity?: number;
    color?: string;
    disableOnMobile?: boolean;
    scale?: number;
    borderRadius?: string;
}

const FluidHover = ({
    children,
    intensity = 0.3,
    color = "#eaeaea", // Lighter color for white background
    disableOnMobile = true,
    scale = 1.02, // Default scale factor on hover
    borderRadius = "sm", // Default border radius
}: FluidHoverProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const isPointerDown = useRef(false);

    // Get appropriate border radius class
    const getBorderRadiusClass = () => {
        switch (borderRadius) {
            case "none":
                return "";
            case "sm":
                return "rounded-sm";
            case "md":
                return "rounded-md";
            case "lg":
                return "rounded-lg";
            case "xl":
                return "rounded-xl";
            case "full":
                return "rounded-full";
            default:
                return "rounded-sm";
        }
    };

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Initialize hover animation
    useEffect(() => {
        if (disableOnMobile && isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        // Handle mouse movement with more precision
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();

            // Get mouse position relative to the container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mousePosition.current = { x, y };

            if (isHovered) {
                updateGradient();
            }
        };

        // Handle mouse enter/leave with smoother transitions
        const handleMouseEnter = () => {
            setIsHovered(true);

            gsap.to(container, {
                scale: scale,
                backgroundColor: color,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            setIsHovered(false);

            gsap.to(container, {
                scale: 1,
                background: "none",
                duration: 0.4,
                ease: "power2.out",
            });
        };

        // Handle pointer down for touch feedback
        const handlePointerDown = () => {
            isPointerDown.current = true;

            gsap.to(container, {
                scale: scale * 0.98, // Slightly smaller when pressed
                duration: 0.2,
                ease: "power2.out",
            });
        };

        // Handle pointer up
        const handlePointerUp = () => {
            isPointerDown.current = false;

            if (isHovered) {
                gsap.to(container, {
                    scale: scale,
                    duration: 0.2,
                    ease: "power2.out",
                });
            }
        };

        // Update the gradient based on mouse position with enhanced effects
        const updateGradient = () => {
            if (!container) return;

            const { x, y } = mousePosition.current;
            const { width, height } = container.getBoundingClientRect();

            // Calculate position as percentage
            const posX = (x / width) * 100;
            const posY = (y / height) * 100;

            // Apply radial gradient with more refined parameters
            const gradientSize = 100 - intensity * 100; // Size inversely proportional to intensity

            gsap.to(container, {
                background: `radial-gradient(circle at ${posX}% ${posY}%, ${color} 0%, rgba(255, 255, 255, 0) ${gradientSize}%)`,
                duration: 0.3, // Faster for smoother tracking
                ease: "power1.out", // Smoother easing
            });
        };

        // Add event listeners
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("pointerdown", handlePointerDown);
        container.addEventListener("pointerup", handlePointerUp);
        container.addEventListener("pointercancel", handlePointerUp);

        // Cleanup
        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("pointerdown", handlePointerDown);
            container.removeEventListener("pointerup", handlePointerUp);
            container.removeEventListener("pointercancel", handlePointerUp);
        };
    }, [color, disableOnMobile, isMobile, isHovered, intensity, scale]);

    // Framer Motion variants for content animation with refinements
    const contentVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        hover: {
            y: -3, // More subtle lift
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden transition-all duration-300 ${getBorderRadiusClass()}`}
            initial="initial"
            animate="animate"
            whileHover="hover"
            style={{
                willChange: "transform, background", // Optimization hint for browser
                backfaceVisibility: "hidden", // Prevents flickering in some browsers
            }}
        >
            <motion.div className="relative z-10" variants={contentVariants}>
                {children}
            </motion.div>
        </motion.div>
    );
};

export default FluidHover;
