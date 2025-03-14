"use client";

import { useEffect, useState } from "react";

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [blackVisible, setBlackVisible] = useState(true);
    const [blueVisible, setBlueVisible] = useState(true);

    useEffect(() => {
        // Counter animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 99) return prev + 1;
                clearInterval(interval);

                // When counter reaches 99, start panel animations
                setTimeout(() => {
                    // First hide black panel
                    setBlackVisible(false);

                    // Then hide blue panel after delay
                    setTimeout(() => {
                        setBlueVisible(false);
                        // Finally remove component
                        setTimeout(() => setLoading(false), 100);
                    }, 1000);
                }, 500);

                return 99;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-[100]">
            {/* Blue panel (revealed when black slides up) */}
            {blueVisible && (
                <div
                    className="absolute inset-0 bg-[#015CE8]"
                    style={{
                        transform: blackVisible
                            ? "translateY(0)"
                            : "translateY(-100%)",
                        transition:
                            "transform 0.9s cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                />
            )}

            {/* Black panel with counter */}
            {blackVisible && (
                <div className="absolute inset-0 bg-black flex flex-col justify-between p-8 md:p-12">
                    {/* Top left text */}
                    <div className="text-white text-3xl md:text-5xl lg:text-6xl font-light">
                        Design that converts...
                    </div>

                    {/* Bottom right counter */}
                    <div className="self-end">
                        <div className="text-6xl md:text-9xl lg:text-[12rem] font-light text-white">
                            {progress.toString().padStart(2, "0")}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
