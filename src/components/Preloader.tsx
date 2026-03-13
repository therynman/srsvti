"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        // Re-enable scrolling
        document.body.style.overflow = "";
      }
    });

    const counter = { val: 0 };

    // 1. Counter increment animation
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerHTML = Math.round(counter.val) + "%";
        }
      }
    });

    // 2. Pause exactly like Jason Jerez site
    tl.to({}, { duration: 0.3 });

    // 3. Slide up reveal
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut"
    });

    return () => {
      tl.kill();
      document.body.style.overflow = ""; // ensure scroll is re-enabled if unmounted early
    };
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#000000] flex items-center justify-center pointer-events-none"
    >
      <div 
        ref={counterRef}
        className="text-[#FFFFFF] font-sans font-bold text-[clamp(60px,10vw,150px)] leading-none"
      >
        0%
      </div>
    </div>
  );
}
