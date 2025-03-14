"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import OurApproach from "@/components/home/OurApproach";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
import Footer from "@/components/common/Footer";
import FlowingBackground from "@/components/home/FlowingBackground";

export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading skeleton
    }

    return (
        <main className="relative">
            <FlowingBackground />
            <Hero />
            <About />
            <Projects />
            <OurApproach />
            <Pricing />
            <Testimonials />
            <FAQ />
            <Contact />
            <Footer />
        </main>
    );
}
