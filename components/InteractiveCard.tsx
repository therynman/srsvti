// components/InteractiveCard.tsx
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function InteractiveCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useMotionTemplate`${y}deg`;
    const rotateY = useMotionTemplate`${x}deg`;

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
            style={{ rotateX, rotateY }}
            className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#606C38]/30 hover:border-[#606C38]/60 transition-all"
        >
            <h3 className="text-2xl text-[#F5F0E6]">The Art of Engagement</h3>
            <p className="text-[#F5F0E6]/80 mt-4">
                Crafting interfaces that don’t just work—
                <br />
                they enchant.
            </p>
        </motion.div>
    );
}
