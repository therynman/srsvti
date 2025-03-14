"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

// Custom rating data for each testimonial
const RATINGS = [
    { score: 4.8 },
    { score: 5.0 },
    { score: 4.6 },
    { score: 4.9 },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-advance testimonials
    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                setDirection(1);
                setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
            }, 8000); // Change every 8 seconds
        };

        startInterval();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Reset interval when manually changing testimonial
    const handleNavClick = (direction: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setDirection(direction);

        if (direction === -1) {
            setActiveIndex(
                (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
            );
        } else {
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }

        // Restart interval
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 8000);
    };

    // Variants for testimonial animations
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "20%" : "-20%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-20%" : "20%",
            opacity: 0,
            transition: {
                x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
        }),
    };

    const currentTestimonial = TESTIMONIALS[activeIndex];

    // Function to split quote into main headline and remaining text
    const splitQuote = (quote: string) => {
        const sentences = quote.match(/[^.!?]+[.!?]+/g) || [quote];

        // Take first sentence for headline
        const headline = sentences[0];

        // Join remaining sentences for body text if there are any
        const bodyText =
            sentences.length > 1 ? sentences.slice(1).join(" ") : "";

        return { headline, bodyText };
    };

    const { headline, bodyText } = splitQuote(currentTestimonial.quote);

    return (
        <section className="py-20 lg:py-32 bg-[#F9F9F9]">
            <div className="container mx-auto px-0">
                <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-0 items-start pl-[64px] md:pl-16 lg:pl-[64px] pr-[64px] md:pr-16 lg:pr-[64px]"
                    style={{ overflowX: "hidden" }}
                >
                    {/* Left section with description and navigation */}
                    <div
                        className="md:col-span-4 mb-12 md:mb-0 h-full flex flex-col justify-between"
                        style={{ minHeight: "450px" }}
                    >
                        <p className="text-lg text-gray-700 mb-8 max-w-xs">
                            Here&apos;s what people have to say about working
                            together. Real moments, real experiences, real
                            feedback.
                        </p>

                        {/* Navigation controls */}
                        <div className="flex items-center gap-4 mt-auto">
                            <button
                                onClick={() => handleNavClick(-1)}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200"
                                aria-label="Previous testimonial"
                                data-no-cursor="true"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => handleNavClick(1)}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200"
                                aria-label="Next testimonial"
                                data-no-cursor="true"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right section with testimonial content */}
                    <div
                        className="md:col-span-8 relative"
                        style={{ minHeight: "450px" }}
                    >
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full h-full"
                            >
                                <div className="relative h-full flex flex-col justify-between">
                                    {/* Quote marks */}
                                    <div className="text-8xl text-gray-200 font-serif leading-none absolute -top-8 left-0">
                                        &quot;
                                    </div>

                                    {/* Testimonial text */}
                                    <div className="pl-4 flex flex-col">
                                        <div className="mb-8">
                                            {/* First sentence in large font */}
                                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight mb-4">
                                                &quot;{headline}&quot;
                                            </h3>

                                            {/* Remaining text in paragraph size */}
                                            {bodyText && (
                                                <p className="text-lg text-gray-700 mt-4 max-w-3xl">
                                                    &quot;{bodyText}&quot;
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-auto">
                                            <p className="text-gray-600 text-lg font-medium mb-1">
                                                {currentTestimonial.author}
                                            </p>

                                            {/* Position/title */}
                                            <p className="text-gray-500 text-sm mb-6">
                                                {currentTestimonial.title}
                                            </p>

                                            {/* Rating and avatar - always visible at bottom */}
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                                    <Image
                                                        src={`/images/person${
                                                            (activeIndex % 4) +
                                                            1
                                                        }.jpg`}
                                                        alt={
                                                            currentTestimonial.author
                                                        }
                                                        width={40}
                                                        height={40}
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex items-center ml-3">
                                                    <div className="text-sm text-gray-500 mr-2">
                                                        {RATINGS[
                                                            activeIndex %
                                                                RATINGS.length
                                                        ].score.toFixed(1)}
                                                        /5.0
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className="w-4 h-4 text-black"
                                                                    fill={
                                                                        i <
                                                                        Math.floor(
                                                                            RATINGS[
                                                                                activeIndex %
                                                                                    RATINGS.length
                                                                            ]
                                                                                .score
                                                                        )
                                                                            ? "currentColor"
                                                                            : "none"
                                                                    }
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
