"use client";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import InteractiveCard from "../components/InteractiveCard";
import { CASE_STUDIES } from "@/lib/data";
import Image from "next/image";
import React, { Fragment } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const horizontalSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(headlineRef.current, {
            backgroundImage: "linear-gradient(45deg, #F5F0E6 0%, #606C38 100%)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        gsap.to(buttonRef.current, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    }, []);

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
            {/* Hero Section */}{" "}
            <section className="h-screen flex items-center justify-center">
                {" "}
                <div className="container mx-auto px-4">
                    {" "}
                    <motion.h1
                        ref={headlineRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-[10vw] leading-[0.9] font-display"
                    >
                        {" "}
                        <span className="block text-primary">
                            Crafting
                        </span>{" "}
                        <span className="block ml-[15%]">Digital</span>{" "}
                        <span className="block ml-[30%] text-secondary">
                            Experiences{" "}
                        </span>{" "}
                    </motion.h1>{" "}
                </div>{" "}
            </section>
            {/* Case Studies Section */}           {" "}
            <section className="py-20">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
                    {" "}
                    {CASE_STUDIES.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {" "}
                            <InteractiveCard>
                                <Fragment>
                                    {" "}
                                    {/* Wrap children in Fragment */}
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        width={600}
                                        height={400}
                                        className="rounded-lg"
                                    />
                                    <h3 className="text-xl mt-4 text-[#F5F0E6]">
                                        {study.title}
                                    </h3>
                                    <p className="text-muted-foreground text-[#F5F0E6]/80">
                                        {study.description}
                                    </p>
                                </Fragment>
                            </InteractiveCard>{" "}
                        </motion.div>
                    ))}{" "}
                </div>{" "}
            </section>
            {/* Storytelling Section 1 */}{" "}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center text-center px-4"
            >
                {" "}
                <div className="max-w-4xl mx-auto">
                    {" "}
                    <h2 className="text-5xl mb-8 text-[#F5F0E6]">
                        We Don’t Just Design—
                        <br />{" "}
                        <span className="text-[#606C38]">
                            We Orchestrate Moments{" "}
                        </span>{" "}
                    </h2>{" "}
                    <p className="text-xl text-[#F5F0E6]/80 leading-relaxed">
                        Every pixel we place is a word in your brand’s story.{" "}
                        <br />
                        Every interaction, a chapter that demands to be felt.{" "}
                    </p>{" "}
                </div>{" "}
            </motion.section>{" "}
            {/* Storytelling Section 2 (Horizontal Scroll using useGSAP) */}{" "}
            <section className="h-screen relative flex items-center justify-center">
                <div className="flex overflow-x-hidden h-[80vh]">
                    {/* Add InteractiveCard with children here */}
                    <div className="w-screen flex-shrink-0 flex items-center justify-center">
                        <InteractiveCard>
                            <>
                                <h3 className="text-2xl text-[#F5F0E6]">
                                    Our Creative Process
                                </h3>
                                <p className="text-[#F5F0E6]/80 mt-4">
                                    Discover how we transform ideas into
                                    immersive experiences
                                </p>
                            </>
                        </InteractiveCard>
                    </div>
                    <div className="w-screen flex-shrink-0 flex items-center justify-center">
                        <InteractiveCard>
                            <>
                                <h3 className="text-2xl text-[#F5F0E6]">
                                    Design Philosophy
                                </h3>
                                <p className="text-[#F5F0E6]/80 mt-4">
                                    Where aesthetics meet functionality in
                                    perfect harmony
                                </p>
                            </>
                        </InteractiveCard>
                    </div>
                </div>
            </section>{" "}
        </main>
    );
}
