"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const emailRef = useRef<HTMLAnchorElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    // Removed the unused isInView variable

    // Animate elements when footer comes into view
    useEffect(() => {
        if (!footerRef.current || !emailRef.current || !headingRef.current)
            return;

        // Split text for the heading
        if (headingRef.current) {
            const text = new SplitType(headingRef.current, {
                types: "words",
                tagName: "span",
            });

            if (text.words) {
                gsap.fromTo(
                    text.words,
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.05,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top bottom-=100",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }

        // Animate email link
        if (emailRef.current) {
            gsap.fromTo(
                emailRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: emailRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        // Animate links section
        if (linksRef.current) {
            const links = linksRef.current.querySelectorAll("a, p");

            gsap.fromTo(
                links,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                    delay: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: linksRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, []);

    // Animation variants
    const arrowVariants = {
        initial: { x: 0, y: 0 },
        hover: { x: 5, y: -5, transition: { duration: 0.3 } },
    };

    return (
        <footer
            ref={footerRef}
            className="bg-black text-white py-20 px-6 md:px-12 lg:px-16 relative"
        >
            {/* Rest of your footer code remains the same */}
            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto relative z-10">
                {/* Top section */}
                <div className="flex flex-col md:flex-row justify-between mb-20">
                    <div>
                        <h2
                            ref={headingRef}
                            className="text-lg font-normal mb-4"
                        >
                            DROP US A LINE, AND WE&apos;LL
                            <br />
                            GET IN TOUCH!
                        </h2>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href="/contact"
                                className="inline-block text-sm relative group"
                            >
                                <span className="inline-flex items-center">
                                    <span className="mr-2">
                                        SCHEDULE A CALL
                                    </span>
                                    <motion.div
                                        variants={arrowVariants}
                                        initial="initial"
                                        whileHover="hover"
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </motion.div>
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="mt-10 md:mt-0 flex flex-wrap gap-8 md:gap-12">
                        {/* Social links with hover effects */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href="https://www.behance.net/therynman"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white group relative"
                            >
                                BEHANCE
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href="https://www.linkedin.com/company/srsvti"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white group relative"
                            >
                                LINKEDIN
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Large email section with refined animation */}
                <div className="mb-20 border-t border-b border-gray-800 py-10">
                    <Link
                        ref={emailRef}
                        href="mailto:RAYAN@SRSVTI.COM"
                        className="flex items-center justify-between w-full group"
                    >
                        <motion.span
                            className="text-4xl md:text-7xl lg:text-9xl font-light tracking-tight"
                            whileHover={{ x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            RAYAN@SRSVTI.COM
                        </motion.span>
                        <motion.div
                            variants={arrowVariants}
                            initial="initial"
                            whileHover="hover"
                            className="w-6 h-6 md:w-10 md:h-10"
                        >
                            <ArrowUpRight className="w-full h-full" />
                        </motion.div>
                    </Link>
                </div>

                {/* Bottom section with contact info and links */}
                <div
                    ref={linksRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                >
                    <div className="md:col-span-1">
                        <p className="text-sm text-gray-400">+91-8100418016</p>
                        <p className="text-sm text-gray-400 mt-2">
                            For now, we don&apos;t have any physical office but
                            we&apos;re soon gonna open offices in New York,
                            Dubai &amp; Kolkata
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <ul className="space-y-3">
                            <li>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href="/works"
                                        className="text-sm inline-block group relative"
                                    >
                                        WORKS
                                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/40 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                                    </Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href="/about"
                                        className="text-sm inline-block group relative"
                                    >
                                        ABOUT
                                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/40 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                                    </Link>
                                </motion.div>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <ul className="space-y-3">
                            <li>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href="/services"
                                        className="text-sm inline-block group relative"
                                    >
                                        SERVICES
                                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/40 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                                    </Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="text-sm inline-block group relative"
                                    >
                                        CONTACT
                                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/40 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-in-out"></span>
                                    </Link>
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright section */}
                <div className="flex flex-col md:flex-row justify-between items-start pt-8 mt-16 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                        © ALL RIGHTS RESERVED, SRSVTI {new Date().getFullYear()}
                    </p>
                    <p className="text-sm text-gray-500 mt-4 md:mt-0">
                        LET&apos;S MAKE YOUR IDEAS TO LIFE ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
