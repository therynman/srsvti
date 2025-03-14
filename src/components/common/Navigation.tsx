"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";
import BackgroundMusic from "@/components/common/BackgroundMusic";

const Navigation = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkBackground, setIsDarkBackground] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);

    // Create refs for each nav item to track their positions
    const navItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    // Track the background state of each nav item individually
    const [navItemsBackground, setNavItemsBackground] = useState<boolean[]>([]);

    const menuItems = [
        { title: "Home", path: "/" },
        { title: "Work", path: "/work" },
        { title: "About", path: "/about" },
        { title: "Services", path: "/services" },
        { title: "Contact", path: "/contact" },
    ];

    // Initialize state and handle initial animations
    useEffect(() => {
        // Initialize navigation item background states
        setNavItemsBackground(Array(menuItems.length).fill(true));
        navItemRefs.current = Array(menuItems.length).fill(null);

        // Initial load animation with slight delay
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [menuItems.length]);

    // Create a canvas for sampling background colors
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Create an offscreen canvas for sampling colors
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const checkElementBackground = () => {
            // Skip if in mobile view
            if (window.innerWidth < 768) return;

            // Skip if menu is open
            if (isMenuOpen) return;

            // Get all nav items with refs
            const items = navItemRefs.current.filter(Boolean);
            if (items.length === 0) return;

            // Create an array to store background color state for each item
            const newBackgroundStates = [...navItemsBackground];

            // Check hero section first
            const heroSection =
                document.querySelector(".hero-section") ||
                document.querySelector("section:first-of-type");

            // Always use dark mode for hero section
            if (
                heroSection &&
                window.scrollY <
                    heroSection.getBoundingClientRect().height - 100
            ) {
                setNavItemsBackground(Array(menuItems.length).fill(true));
                setIsDarkBackground(true);
                return;
            }

            // First get all the dark sections
            const darkSections = Array.from(
                document.querySelectorAll('.bg-black, [data-dark-bg="true"]')
            );

            // For each nav item, check if it's over a dark section
            items.forEach((item, index) => {
                if (!item) return;

                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Check if this item is over any dark section
                const isOverDarkSection = darkSections.some((section) => {
                    const sectionRect = section.getBoundingClientRect();
                    return (
                        centerX >= sectionRect.left &&
                        centerX <= sectionRect.right &&
                        centerY >= sectionRect.top &&
                        centerY <= sectionRect.bottom
                    );
                });

                // Update state for this item
                newBackgroundStates[index] = isOverDarkSection;
            });

            // Update background states for all items
            setNavItemsBackground(newBackgroundStates);

            // Set overall nav background for other elements
            // Use majority vote from nav items
            const darkCount = newBackgroundStates.filter(Boolean).length;
            setIsDarkBackground(darkCount > newBackgroundStates.length / 2);
        };

        // Check backgrounds on scroll and resize
        window.addEventListener("scroll", checkElementBackground);
        window.addEventListener("resize", checkElementBackground);

        // Initial check
        setTimeout(checkElementBackground, 100);

        // Set up interval to periodically check (helpful for dynamic content changes)
        const checkInterval = setInterval(checkElementBackground, 1000);

        return () => {
            window.removeEventListener("scroll", checkElementBackground);
            window.removeEventListener("resize", checkElementBackground);
            clearInterval(checkInterval);
        };
    }, [isMenuOpen, navItemsBackground, menuItems.length]);

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle mobile menu animations
    useEffect(() => {
        if (isMenuOpen) {
            // Prevent background scrolling when menu is open
            document.body.style.overflow = "hidden";

            // Animate menu items when menu opens
            const splitTexts = document.querySelectorAll(".menu-item-text");
            splitTexts.forEach((text, i) => {
                const splitText = new SplitType(text as HTMLElement, {
                    types: "chars",
                });

                if (splitText.chars) {
                    gsap.fromTo(
                        splitText.chars,
                        {
                            y: 50,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.02,
                            duration: 0.6,
                            delay: 0.1 + i * 0.1,
                            ease: "power3.out",
                        }
                    );
                }
            });
        } else {
            // Re-enable scrolling when menu is closed
            document.body.style.overflow = "";
        }
    }, [isMenuOpen]);

    // Add class to hero section for easier targeting
    useEffect(() => {
        const heroSection = document.querySelector("section:first-of-type");
        if (heroSection) {
            heroSection.classList.add("hero-section");
        }
    }, []);

    // Animation variants
    const navVariants = {
        hidden: {
            y: -20,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const navItemVariants = {
        hidden: { y: -10, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "afterChildren",
            },
        },
        open: {
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const menuItemVariants = {
        closed: { opacity: 0, y: 20 },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    // Force dark mode for the first section (hero)
    const forceDarkMode = !isScrolled;

    // Overall text color for logo and other elements
    const overallTextColor =
        forceDarkMode || isDarkBackground ? "text-white" : "text-black";

    return (
        <header
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-16 lg:px-[64px] ${
                isScrolled ? "py-4" : "py-6"
            }`}
        >
            <motion.div
                className="container mx-auto flex justify-between items-center"
                initial="hidden"
                animate={isInitialLoad ? "hidden" : "animate"}
                variants={navVariants}
            >
                {/* Logo */}
                <motion.div
                    variants={navItemVariants}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/" className="relative h-10 w-24 block">
                        {/* White Logo for dark backgrounds */}
                        <Image
                            src="/images/logo-white.png"
                            alt="Srsvti"
                            fill
                            className={`object-contain transition-opacity duration-500 ${
                                forceDarkMode || isDarkBackground
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        />

                        {/* Black Logo for light backgrounds */}
                        <Image
                            src="/images/logo-black.png"
                            alt="Srsvti"
                            fill
                            className={`object-contain transition-opacity duration-500 ${
                                forceDarkMode || isDarkBackground
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.nav
                    variants={navVariants}
                    className="hidden md:flex items-center gap-8"
                >
                    {menuItems.map((item, index) => {
                        // Determine text color for each individual nav item
                        const itemTextColor =
                            forceDarkMode ||
                            (navItemsBackground[index] ?? isDarkBackground)
                                ? "text-white"
                                : "text-black";

                        return (
                            <motion.div
                                key={item.path}
                                variants={navItemVariants}
                            >
                                <Link
                                    href={item.path}
                                    ref={(el: HTMLAnchorElement | null) => {
                                        // Create a new array if it doesn't exist yet
                                        if (!navItemRefs.current) {
                                            navItemRefs.current = [];
                                        }
                                        navItemRefs.current[index] = el;
                                    }}
                                    data-no-cursor="true"
                                    className={`text-sm transition-all duration-300 relative hover-underline ${itemTextColor} ${
                                        pathname === item.path
                                            ? "opacity-100"
                                            : "opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    {item.title}
                                    {pathname === item.path && (
                                        <motion.span
                                            className="absolute -bottom-1 left-0 w-full h-[1px] bg-current"
                                            layoutId="navIndicator"
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.nav>

                {/* Right section: Music Button + Contact Button */}
                <motion.div
                    variants={navVariants}
                    className="hidden md:flex items-center gap-8"
                >
                    {/* Music Button */}
                    <motion.div
                        variants={navItemVariants}
                        className={overallTextColor}
                    >
                        <BackgroundMusic />
                    </motion.div>

                    {/* Contact Button */}
                    <motion.div
                        variants={navItemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href="/contact"
                            data-no-cursor="true"
                            className={`group flex items-center gap-2 text-sm ${overallTextColor}`}
                        >
                            <span className="relative">
                                Let&apos;s Talk
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.25,0.1,0.25,1]"></span>
                            </span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                    variants={navItemVariants}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(true)}
                    className={`flex md:hidden p-1 ${overallTextColor}`}
                    aria-label="Open menu"
                >
                    <MenuIcon className="w-6 h-6" />
                </motion.button>

                {/* Full Screen Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 bg-black z-50 flex flex-col"
                        >
                            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                                <Link
                                    href="/"
                                    className="relative h-10 w-24 block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Image
                                        src="/images/logo-white.png"
                                        alt="Srsvti"
                                        fill
                                        className="object-contain"
                                    />
                                </Link>
                                <div className="flex items-center gap-6">
                                    <div className="text-white">
                                        <BackgroundMusic />
                                    </div>
                                    <motion.button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-1 text-white"
                                        aria-label="Close menu"
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center">
                                <nav className="space-y-6 text-center">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.path}
                                            className="overflow-hidden"
                                            variants={menuItemVariants}
                                            custom={index}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className="block text-4xl sm:text-5xl font-light text-white transition-colors hover:text-gray-400 menu-item-text"
                                            >
                                                {item.title}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>

                            <motion.div
                                variants={menuItemVariants}
                                className="container mx-auto px-6 py-8 text-center"
                            >
                                <div className="overflow-hidden">
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="inline-flex items-center gap-2 group text-white"
                                    >
                                        <span className="relative">
                                            Let&apos;s Start a Project
                                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.25,0.1,0.25,1]"></span>
                                        </span>
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
};

export default Navigation;
