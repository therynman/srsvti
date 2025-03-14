import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

const WaveIcon = ({ isPlaying }: { isPlaying: boolean }) => {
    const numBars = 4;

    return (
        <div className="flex items-center gap-[2px] h-4">
            {Array.from({ length: numBars }).map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-current w-[2px]" // Changed from bg-white to bg-current to inherit text color
                    animate={
                        isPlaying
                            ? {
                                  height: [4, 12, 4],
                                  transition: {
                                      repeat: Infinity,
                                      duration: 0.6,
                                      delay: i * 0.1,
                                      ease: [0.45, 0, 0.55, 1],
                                  },
                              }
                            : {
                                  height: 1,
                                  transition: {
                                      duration: 0.2,
                                  },
                              }
                    }
                />
            ))}
        </div>
    );
};

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio on mount
    useEffect(() => {
        audioRef.current = new Audio("/audio/background-music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const toggleMusic = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                await audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } catch {
            console.log("Toggle music failed");
        }
    };

    return (
        <button
            onClick={toggleMusic}
            className="text-sm flex items-center gap-1 group opacity-100 font-medium"
            // Added font-medium and ensured opacity-100
        >
            <WaveIcon isPlaying={isPlaying} />
            <span className="relative">
                Music {isPlaying ? "On" : "Off"}
                <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
        </button>
    );
};

export default BackgroundMusic;
