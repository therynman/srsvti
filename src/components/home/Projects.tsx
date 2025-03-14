"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectItemProps {
    project: (typeof PROJECTS)[0];
    index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    // Animate project item when it comes into view
    useEffect(() => {
        if (!itemRef.current) return;

        gsap.fromTo(
            itemRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);

    return (
        <div
            ref={itemRef}
            className="relative mb-8 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={project.url} className="block group">
                <div className="relative overflow-hidden rounded-sm">
                    <motion.div
                        ref={imageRef}
                        className="aspect-[2/3] relative project-image"
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <Image
                            src={`/images/${project.id}.jpg`}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index < 2}
                            data-cursor-project
                        />

                        {/* Dark overlay with refined transition */}
                        <motion.div
                            className="absolute inset-0 bg-black"
                            animate={{
                                opacity: isHovered ? 0.1 : 0.3,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                </div>

                {/* Project Details - Below image with enhanced hover effects */}
                <div className="mt-4 relative overflow-hidden" ref={infoRef}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium text-black relative inline-block">
                            {project.title}
                            <motion.span
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            />
                        </h3>

                        <motion.div
                            animate={{
                                x: isHovered ? 0 : 10,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <ArrowUpRight className="w-5 h-5 text-black" />
                        </motion.div>
                    </div>
                    <p className="text-sm text-gray-600">{project.category}</p>
                </div>
            </Link>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const viewAllRef = useRef<HTMLAnchorElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

    // Horizontal line animation
    const [lineWidth, setLineWidth] = useState(0);

    // Add reveal animations
    useEffect(() => {
        if (!headingRef.current || !viewAllRef.current || !sectionRef.current)
            return;

        // Heading animation
        gsap.fromTo(
            headingRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none none",
                },
            }
        );

        // View All link animation
        gsap.fromTo(
            viewAllRef.current,
            {
                y: 20,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: viewAllRef.current,
                    start: "top bottom-=50",
                    toggleActions: "play none none none",
                },
            }
        );

        // Track scroll progress for horizontal line
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            onUpdate: (self) => {
                setLineWidth(self.progress * 100);
            },
        });
    }, []);

    // Define container variants for smooth reveals
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-white">
            <motion.div className="container mx-auto px-0" style={{ y }}>
                <div className="mb-16 pl-[64px] md:pl-16 lg:pl-[64px]">
                    <div className="flex flex-col space-y-4">
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-5xl lg:text-6xl font-light"
                        >
                            Selected Projects
                        </h2>

                        {/* Animated horizontal line */}
                        <div className="h-[1px] bg-black/10 w-full mt-4 relative overflow-hidden">
                            <motion.div
                                className="h-full bg-black/40 absolute top-0 left-0"
                                style={{ width: `${lineWidth}%` }}
                                transition={{ ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 px-[64px] md:px-16 lg:px-[64px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="space-y-16 md:mt-0">
                        {PROJECTS.filter((_, i) => i % 2 === 0).map(
                            (project, index) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                    index={index * 2}
                                />
                            )
                        )}
                    </div>
                    <div className="space-y-16 md:mt-32">
                        {PROJECTS.filter((_, i) => i % 2 === 1).map(
                            (project, index) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                    index={index * 2 + 1}
                                />
                            )
                        )}
                    </div>
                </motion.div>

                <div className="mt-24 pl-[64px] md:pl-16 lg:pl-[64px]">
                    <Link
                        ref={viewAllRef}
                        href="/work"
                        className="inline-flex items-center gap-2 group"
                    >
                        <span className="text-black text-lg relative">
                            View All Projects
                            <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.25,0.1,0.25,1]"></span>
                        </span>
                        <motion.div
                            animate={{ x: 0, y: 0 }}
                            whileHover={{ x: 3, y: -3 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
