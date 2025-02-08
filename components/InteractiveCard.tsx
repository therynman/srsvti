// components/InteractiveCard.tsx
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { cursorVariant } from "@/lib/store";
import Image from "next/image";
import React from "react";

interface InteractiveCardProps {
    children: React.ReactNode;
}

export default function InteractiveCard({ children }: InteractiveCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useMotionTemplate`${y}deg`;
    const rotateY = useMotionTemplate`${x}deg`;
    const [, setVariant] = useAtom(cursorVariant);

    return (
        <motion.div
            onPointerMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set((e.clientX - rect.left - rect.width / 2) / 10);
                y.set((e.clientY - rect.top - rect.height / 2) / 10);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
            onHoverStart={() => setVariant("hover")}
            onHoverEnd={() => setVariant("default")}
            style={{ rotateX, rotateY }}
            className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#606C38]/30 hover:border-[#606C38]/60 transition-all"
        >
            {/* Image container */}
            <div className="relative h-64 overflow-hidden rounded-xl">
                <motion.div
                    style={{ x, y }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
                />
                <Image
                    src="/images/project-placeholder.jpg"
                    alt="Project"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card content */}
            <h3 className="text-2xl text-[#F5F0E6] mt-4">
                The Art of Engagement
            </h3>
            <p className="text-[#F5F0E6]/80 mt-2">
                Crafting interfaces that don’t just work—
                <br />
                they enchant.
            </p>
        </motion.div>
    );
}
