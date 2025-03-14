"use client";

import { useEffect, useState, ReactNode, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion } from "framer-motion";

interface SmoothScrollProps {
    children: ReactNode;
}

interface LenisScrollEvent {
    animatedScroll: number;
    dimensions: {
        height: number;
        width: number;
    };
    direction: number;
    options: Record<string, unknown>;
    scroll: number;
    velocity: number;
}

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const progressBarRef = useRef<HTMLDivElement | null>(null);

    // Setup Lenis smooth scrolling
    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2, // Slightly increased for smoother effect
            smoothWheel: true,
            orientation: "vertical",
            gestureOrientation: "vertical",
            easing: (t: number) => {
                // Custom easing function for more natural feel
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            },
            wheelMultiplier: 1,
        });

        setLenis(lenisInstance);

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Setup GSAP ScrollTrigger integration
        ScrollTrigger.refresh();
        ScrollTrigger.update();

        // Connect Lenis to ScrollTrigger
        lenisInstance.on("scroll", (e: LenisScrollEvent) => {
            ScrollTrigger.update();

            // Update scroll progress for progress bar
            const scrollTop = e.animatedScroll;
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / height) * 100;
            setScrollProgress(Math.min(progress, 100));
        });

        // Add scroll progress indicator at the BOTTOM of the page
        const progressBar = document.createElement("div");
        progressBar.className = "scroll-progress";
        progressBar.style.position = "fixed";
        progressBar.style.bottom = "0"; // Keep at bottom
        progressBar.style.left = "0";
        progressBar.style.height = "4px"; // Slightly reduced for more subtle look
        progressBar.style.backgroundColor = "var(--color-accent, #000)";
        progressBar.style.width = "0%";
        progressBar.style.zIndex = "1000";
        progressBar.style.transition = "width 0.1s ease-out"; // Smoother transition
        progressBar.style.opacity = "0.8"; // Slightly transparent

        document.body.appendChild(progressBar);
        progressBarRef.current = progressBar;

        // Setup scroll reveal animations - using a more refined approach
        const setupScrollReveal = () => {
            // Find all elements with data-scroll-reveal
            const revealElements = document.querySelectorAll(
                "[data-scroll-reveal]"
            );

            revealElements.forEach((element) => {
                // Get custom reveal settings if provided
                const delay = element.getAttribute("data-scroll-delay") || "0";
                const duration =
                    element.getAttribute("data-scroll-duration") || "0.8";

                ScrollTrigger.create({
                    trigger: element,
                    start: "top bottom-=100",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: parseFloat(duration),
                            delay: parseFloat(delay),
                            ease: "power2.out",
                        });
                    },
                    once: element.hasAttribute("data-scroll-once") || false,
                });
            });
        };

        // Run once ScrollTrigger is ready
        setupScrollReveal();

        // Cleanup function
        return () => {
            lenisInstance.destroy();

            // Remove scroll progress indicator
            if (progressBarRef.current) {
                document.body.removeChild(progressBarRef.current);
                progressBarRef.current = null;
            }

            // Clean up scrollTrigger instances
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            ScrollTrigger.refresh();
        };
    }, []);

    // Reset scroll position when route changes
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        }
    }, [pathname, lenis]);

    // Update scroll progress bar
    useEffect(() => {
        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${scrollProgress}%`;
        }
    }, [scrollProgress]);

    // Handle elements coming into view with a refined approach
    useEffect(() => {
        // Handle elements coming into view
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add class with slight delay for staggered effect
                    setTimeout(() => {
                        entry.target.classList.add("is-inview");
                    }, Math.random() * 150); // Random delay for natural effect
                } else if (entry.target.hasAttribute("data-repeat-anim")) {
                    entry.target.classList.remove("is-inview");
                }
            });
        };

        // Create intersection observer with more refined options
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.05, // Lower threshold to start animations slightly earlier
        });

        // Observe elements with animation classes
        document
            .querySelectorAll(
                ".fade-in, .slide-up, .char-reveal, .img-reveal, .scale-in, .fade-up"
            )
            .forEach((element) => {
                observer.observe(element);
            });

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <div ref={scrollRef} className="smooth-scroll">
            {/* Apply framer-motion for page transitions if needed */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SmoothScroll;
