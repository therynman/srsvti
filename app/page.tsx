// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
// Import your ScrollIndicator component (adjust the import path as needed)
import ScrollIndicator from "../components/ScrollIndicator";

export default function Home() {
    const headlineRef = useRef<HTMLHeadingElement>(null);

    // GSAP Animation
    useEffect(() => {
        gsap.from(headlineRef.current, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power4.out",
        });
    }, []);

    return (
        <main className="min-h-screen bg-[#F5F0E6]">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-screen flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1
                        ref={headlineRef}
                        className="text-6xl font-bold mb-4 text-[#333333]"
                    >
                        Welcome to SRVSVTI
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-[#606C38] mb-8"
                    >
                        Where Design Meets Innovation
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#606C38] text-white px-8 py-3 rounded-full hover:bg-[#4a5530] transition-all"
                    >
                        Explore Our Work
                    </motion.button>
                    {/* Adding the ScrollIndicator component */}
                    <ScrollIndicator />
                </div>
            </motion.section>
        </main>
    );
}
