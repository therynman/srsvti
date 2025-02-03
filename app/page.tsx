// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import InteractiveCard from "../components/InteractiveCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    // New ref for the horizontal scroll section
    const horizontalSectionRef = useRef<HTMLDivElement>(null);

    // Hero animations
    useEffect(() => {
        // Text gradient animation
        gsap.to(headlineRef.current, {
            backgroundImage: "linear-gradient(45deg, #F5F0E6 0%, #606C38 100%)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        // Floating button
        gsap.to(buttonRef.current, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    }, []);

    // Horizontal scroll animation using useGSAP
    useGSAP(
        () => {
            const sections = gsap.utils.toArray(".horizontal-panel");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalSectionRef.current,
                    pin: true,
                    scrub: 1,
                    end: "+=3000",
                },
            });
        },
        { scope: horizontalSectionRef }
    );

    return (
        <main className="min-h-screen bg-[#0a0a0a] overflow-hidden">
            {/* Hero Section */}
            <section className="h-screen relative flex items-center justify-center text-center px-4">
                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#333333_0%,#0a0a0a_70%)] opacity-50" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                >
                    <h1
                        ref={headlineRef}
                        className="text-7xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent"
                    >
                        SRVSVTI
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-[#F5F0E6] mb-8 max-w-2xl mx-auto"
                    >
                        Where design becomes{" "}
                        <span className="text-[#606C38]">narrative</span>,<br />
                        and pixels whisper{" "}
                        <span className="text-[#606C38]">stories</span>.
                    </motion.p>
                    <motion.button
                        ref={buttonRef}
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#606C38] text-white px-8 py-4 rounded-full hover:bg-[#4a5530] transition-all border-2 border-[#F5F0E6]/20"
                    >
                        Begin the Journey →
                    </motion.button>
                </motion.div>
            </section>

            {/* Second Section: Horizontal scroll "album" feel */}
            <section className="h-screen relative flex items-center justify-center">
                <div className="flex overflow-x-hidden h-[80vh]">
                    {/* Case Study 1 */}
                    <div className="w-screen flex-shrink-0 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-center p-12 backdrop-blur-lg bg-[#0a0a0a]/50 rounded-2xl"
                        >
                            <h2 className="text-4xl mb-6 text-[#F5F0E6]">
                                Fintech Dashboard Reimagined
                            </h2>
                            <p className="text-[#F5F0E6]/80 max-w-xl mx-auto">
                                We transformed raw data into a symphony of
                                clarity—
                                <br />
                                where numbers dance and insights sing.
                            </p>
                        </motion.div>
                    </div>
                    {/* Case Study 2 */}
                    <div className="w-screen flex-shrink-0 flex items-center justify-center">
                        {/* Similar structure for another case study */}
                    </div>
                </div>
            </section>

            {/* Storytelling Section 1 */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center text-center px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl mb-8 text-[#F5F0E6]">
                        We Don’t Just Design—
                        <br />
                        <span className="text-[#606C38]">
                            We Orchestrate Moments
                        </span>
                    </h2>
                    <p className="text-xl text-[#F5F0E6]/80 leading-relaxed">
                        Every pixel we place is a word in your brand’s story.
                        <br />
                        Every interaction, a chapter that demands to be felt.
                    </p>
                </div>
            </motion.section>

            {/* Storytelling Section 2 (Horizontal Scroll using useGSAP) */}
            <section
                ref={horizontalSectionRef}
                className="h-screen relative flex items-center justify-center"
            >
                <div className="flex h-[80vh] w-max">
                    {/* Mark each panel with the class "horizontal-panel" */}
                    <div className="horizontal-panel w-screen flex-shrink-0 flex items-center justify-center">
                        <InteractiveCard />
                    </div>
                    <div className="horizontal-panel w-screen flex-shrink-0 flex items-center justify-center">
                        <InteractiveCard />
                    </div>
                    {/* Add more panels if needed */}
                </div>
            </section>
        </main>
    );
}
