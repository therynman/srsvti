"use client";
import { useMotionValue, motion, useSpring } from "framer-motion";

export default function FluidHover({
    children,
}: {
    children: React.ReactNode;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    return (
        <motion.div
            onPointerMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left);
                y.set(e.clientY - rect.top);
            }}
            style={{ position: "relative", overflow: "hidden" }}
        >
            <motion.div
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    x: springX,
                    y: springY,
                    background: `radial-gradient(40px at 50% 50%, var(--accent) 0%, transparent 100%)`,
                    mixBlendMode: "multiply",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    opacity: 0,
                }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
            />
            {children}
        </motion.div>
    );
}
