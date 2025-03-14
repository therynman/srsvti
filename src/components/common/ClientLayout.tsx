"use client";

import { useEffect, useState, ReactNode } from "react";
import SmoothScroll from "@/components/common/SmoothScroll";
import LoadingScreen from "@/components/common/LoadingScreen";
import Navigation from "@/components/common/Navigation";
import CustomCursor from "@/components/common/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Check if it's a touch device
        const checkTouchDevice = () => {
            setIsTouchDevice(
                "ontouchstart" in window || navigator.maxTouchPoints > 0
            );
        };
        checkTouchDevice();

        // Add class to body for CSS targeting
        document.documentElement.classList.add("is-loading");

        // Set a timeout to remove loading screen
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
            
            // Initialize transition animation when loading completes
            const tl = gsap.timeline();
            
            // Transition animation
            tl.call(() => {
                document.documentElement.classList.remove("is-loading");
                document.documentElement.classList.add("is-loaded");
            }, [], 0)
            
            // Make content visible with animation
            .call(() => {
                setContentVisible(true);
            }, [], 0.1)
            
            // Animate hero section elements
            .call(() => {
                // Find hero section and its elements
                const heroSection = document.querySelector("section:first-of-type");
                if (!heroSection) return;
                
                // Find hero headline and background
                const heroHeadline = heroSection.querySelector("h1");
                const heroBackground = heroSection.querySelector(".absolute.inset-0");
                
                // Animate background with scale effect
                if (heroBackground) {
                    gsap.fromTo(
                        heroBackground,
                        { opacity: 0.3, scale: 1.05 },
                        { 
                            opacity: 1, 
                            scale: 1, 
                            duration: 1.8, 
                            ease: "power3.out"
                        }
                    );
                }
                
                // Animate heading if split text exists
                const chars = heroHeadline?.querySelectorAll(".char");
                if (chars && chars.length > 0) {
                    gsap.fromTo(
                        chars,
                        { y: 30, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            stagger: 0.03, 
                            duration: 1.2, 
                            ease: "power3.out" 
                        }
                    );
                } else if (heroHeadline) {
                    // If no split text, animate the whole headline
                    gsap.fromTo(
                        heroHeadline,
                        { y: 30, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            duration: 1.2, 
                            ease: "power3.out" 
                        }
                    );
                }
            }, [], 0.4);
            
        }, 2500); // Keep your original timing

        // Prevent FOUC (Flash of Unstyled Content)
        const handleLoad = () => {
            document.body.classList.add("content-loaded");
        };

        window.addEventListener("load", handleLoad);

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(loadingTimer);
        };
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {isLoading && <LoadingScreen />}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: contentVisible ? 1 : 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full"
            >
                {/* Only show custom cursor on non-touch devices */}
                {!isTouchDevice && <CustomCursor />}

                <SmoothScroll>
                    <Navigation />
                    {children}
                </SmoothScroll>
            </motion.div>

            <Analytics />
        </>
    );
}