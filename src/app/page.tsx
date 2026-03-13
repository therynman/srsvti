"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Preloader from "@/components/Preloader";
import WebGLImage from "@/components/WebGLImage";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Automatic Nav Color Change Based on Background
    const themeSections = document.querySelectorAll("[data-nav-theme]");
    themeSections.forEach((section) => {
      const theme = section.getAttribute("data-nav-theme");
      const color = theme === "light" ? "#F7F7F8" : "#010206";
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 60px", // Trigger when section hits the nav height approx
        end: "bottom 60px",
        onEnter: () => gsap.to(navRef.current, { color: color, duration: 0.3, ease: "power2.out" }),
        onEnterBack: () => gsap.to(navRef.current, { color: color, duration: 0.3, ease: "power2.out" })
      });
    });

    // Text scroll animations (Baseline Reveal)
    const splitInstances: SplitType[] = [];
    const animatedTexts = document.querySelectorAll(".animate-on-scroll");
    
    animatedTexts.forEach((el) => {
      const text = new SplitType(el as HTMLElement, { types: "lines,words" });
      splitInstances.push(text);
      
      if (text.words) {
        text.words.forEach((word) => {
          // Wrap each word to hide it initially via overflow-hidden mask
          const wrapper = document.createElement("div");
          wrapper.style.display = "inline-block";
          wrapper.style.overflow = "hidden";
          wrapper.style.verticalAlign = "bottom";
          wrapper.style.paddingTop = "0.1em"; // prevent ascender clipping
          wrapper.style.paddingBottom = "0.1em";
          wrapper.style.marginTop = "-0.1em";
          wrapper.style.marginBottom = "-0.1em";
          
          word.parentNode?.insertBefore(wrapper, word);
          wrapper.appendChild(word);
        });

        gsap.fromTo(
          text.words,
          { y: "110%" },
          {
            y: "0%",
            duration: 1.2,
            stagger: 0.04,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Guarantee Section Pinning & Text Transition (Text 2 setup)
    const text2 = new SplitType(".guarantee-text-2", { types: "lines,words" });
    if (text2.words) {
      text2.words.forEach((word) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "bottom";
        wrapper.style.paddingTop = "0.1em";
        wrapper.style.paddingBottom = "0.1em";
        wrapper.style.marginTop = "-0.1em";
        wrapper.style.marginBottom = "-0.1em";
        word.parentNode?.insertBefore(wrapper, word);
        wrapper.appendChild(word);
      });
      // Hide text2 words initially offscreen completely
      gsap.set(text2.words, { yPercent: 150 });
      
      // Cleanup for text2
      splitInstances.push(text2);
    }

    const guaranteeTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#guarantee-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // We animate the same `.word` descendants that the animate-on-scroll block generated for text-1
    guaranteeTl.to({}, { duration: 0.5 }) 
      .to(".guarantee-text-1 .word", { yPercent: -150, stagger: 0.02, duration: 1, ease: "power2.inOut" })
      .to(text2.words, { yPercent: 0, stagger: 0.02, duration: 1, ease: "power2.out" }, "-=0.2")
      .to({}, { duration: 0.5 });



    return () => {
      splitInstances.forEach(instance => instance.revert());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="w-full bg-[#010206]">
      {/* <Preloader /> */}
      
      {/* Fixed Navbar */}
      <nav ref={navRef} className="fixed top-0 left-0 z-50 w-full flex items-start justify-between px-[28px] pt-[28px] text-[#F7F7F8]">
        <div className="flex-shrink-0 mt-[4px]">
          <svg className="w-[clamp(32px,2.5vw,40px)] h-auto" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2778 18.3269C19.0111 18.2126 7.2006 12.8094 5.48617 12.0026C3.77174 11.1958 -0.423773 7.96415 2.324 3.01137C5.07178 -1.94142 11.1247 0.631896 11.8486 0.954048C12.5725 1.2762 25.7926 7.39267 25.7926 7.39267H21.8304L19.5445 6.36402V8.30704C19.5445 8.30704 9.56269 3.69714 9.10551 3.50664C8.64833 3.31614 6.55292 2.64777 5.71476 4.34482C4.87659 6.04187 6.25405 7.14335 7.1244 7.54507C7.99474 7.94678 27.2403 16.7282 28.3452 17.2602C29.4501 17.7921 33.4123 21.4129 31.5836 26.2895C29.7548 31.1661 26.0593 31.8899 24.8401 31.9661C23.621 32.0423 7.92446 31.9661 6.89581 31.9661C5.86715 31.9661 3.75048 30.8613 2.20971 29.4516C0.668937 28.042 -3.23366e-06 25.3751 0 24.4227V12.7264V12.7094C0 12.1998 0.526524 11.8605 0.990558 12.0711C0.990558 12.0711 18.4015 19.9906 18.5539 20.0413C18.7063 20.0921 19.354 20.0794 19.6207 19.508C19.8874 18.9365 19.5445 18.4412 19.2778 18.3269Z" fill="currentColor"/>
            <path d="M26.3648 9.14338L32.1177 11.7722H27.3935L21.6406 9.14338H26.3648Z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Nav Links */}
        <div className="flex gap-[clamp(60px,8vw,120px)] items-start pt-[6px] font-extrabold text-[clamp(16px,1.67vw,24px)] uppercase tracking-[0.02em] leading-none">
          <a href="#methodology" className="hover:opacity-80 transition-opacity">
            Methodology
          </a>
          <a href="#diagnosis" className="flex items-start gap-[0.2em] group hover:opacity-80 transition-opacity">
            <span className="border-b-[2px] border-current pb-[2px]">
              Start Revenue Diagnosis
            </span>
            <svg className="w-[0.7em] h-[0.7em] mt-[0.1em] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 561 561" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M520.853 0C542.945 0 560.853 17.9086 560.853 40V520.5C560.853 542.591 542.945 560.5 520.853 560.5H519.853C497.762 560.5 479.853 542.591 479.853 520.5V138.275L68.9911 549.138C53.3701 564.759 28.0436 564.759 12.4226 549.138L11.7157 548.431C-3.90525 532.81 -3.90524 507.483 11.7157 491.862L422.578 81H40.3533C18.2619 81 0.35334 63.0914 0.35334 41V40C0.35334 17.9086 18.2619 0 40.3533 0H520.853Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section data-nav-theme="light" className="relative h-screen w-full overflow-hidden flex flex-col p-[28px] text-[#F7F7F8]">
        {/* Background Video using z-0 to avoid buggy negative stacking context behind main */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay: #1A1A1A 40% opacity */}
        <div className="absolute inset-0 bg-[#1A1A1A] opacity-40 z-10" />

        {/* Hero Content Grid (Bottom) */}
        <div className="relative z-20 w-full flex-grow grid grid-cols-12 gap-x-[24px]">
          {/* H1 Headline (6 Grids, Left, Bottom) */}
          <div className="col-start-1 col-span-6 self-end">
            <h1 className="animate-on-scroll text-[clamp(40px,4.17vw,60px)] font-semibold leading-[1.02] tracking-tight">
              Stop Charging Protocol<br />
              Level Prices With Product<br />
              Level Positioning
            </h1>
          </div>
          
          {/* Paragraph (4 Grids, Right, Middle) */}
          <div className="col-start-9 col-span-4 row-start-1 self-center">
            <p className="animate-on-scroll text-[clamp(16px,1.39vw,20px)] font-semibold text-right leading-[1.4]">
              We build digital infrastructure that converts high value prospects into long term subscriptions. Stop losing $50,000 a month to a leaky conversion funnel and an emotionally dead retention architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Revenue Diagnosis */}
      <section id="news-section" data-nav-theme="dark" className="w-full bg-[#F7F7F8] px-[28px] pt-[160px] pb-[160px] text-[#010206]">
        <div className="grid grid-cols-12 gap-0 relative z-10">
          <div className="col-start-7 col-span-6 flex flex-col items-start">
            <h2 className="animate-on-scroll text-[clamp(24px,3.33vw,48px)] font-semibold leading-[1.05] tracking-tight">
              We build digital infrastructure that converts high value prospects into long term subscriptions. Stop losing <span className="text-[#D92D20]">$50,000</span> a month to a <span className="text-[#D92D20]">leaky</span> conversion funnel and an <span className="text-[#D92D20]">emotionally dead</span> retention architecture.
            </h2>
            
            <a href="#diagnosis" className="mt-[80px] flex items-start gap-[0.2em] font-extrabold text-[clamp(16px,1.67vw,24px)] uppercase tracking-[0.02em] w-fit group hover:opacity-80 transition-opacity leading-none text-[#010206]">
              <span className="border-b-[2px] border-current pb-[2px]">
                START YOUR REVENUE DIAGNOSIS
              </span>
              <svg className="w-[0.7em] h-[0.7em] mt-[0.1em] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 561 561" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M520.853 0C542.945 0 560.853 17.9086 560.853 40V520.5C560.853 542.591 542.945 560.5 520.853 560.5H519.853C497.762 560.5 479.853 542.591 479.853 520.5V138.275L68.9911 549.138C53.3701 564.759 28.0436 564.759 12.4226 549.138L11.7157 548.431C-3.90525 532.81 -3.90524 507.483 11.7157 491.862L422.578 81H40.3533C18.2619 81 0.35334 63.0914 0.35334 41V40C0.35334 17.9086 18.2619 0 40.3533 0H520.853Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Delusion vs Reality */}
      <section data-nav-theme="dark" className="w-full bg-[#F7F7F8] px-[28px] pb-[160px] text-[#010206]">
        <div className="grid grid-cols-12 gap-0 relative z-10">
          <div className="col-start-1 col-span-6 flex flex-col">
            <h2 className="animate-on-scroll text-[clamp(32px,3.33vw,48px)] font-semibold leading-[1.05] tracking-tight">
              On the surface, you look premium. Economically, you behave like a commodity.
            </h2>
            
            <div className="mt-[80px] w-full flex flex-col border-t-[1px] border-[#010206] pt-[24px]">
              <div className="grid grid-cols-6 gap-0">
                <div className="col-span-3 pr-[24px]">
                  <h3 className="animate-on-scroll text-[24px] font-extrabold uppercase tracking-tight leading-none">THE DELUSION</h3>
                </div>
                <div className="col-span-3 pr-[24px]">
                  <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                    You rely on clinical packaging and ingredient transparency. You believe educating customers automatically builds trust. You treat subscriptions as a discount mechanism to drive volume.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-[40px] w-full flex flex-col border-t-[1px] border-[#010206] pt-[24px]">
              <div className="grid grid-cols-6 gap-0">
                <div className="col-span-3 pr-[24px]">
                  <h3 className="animate-on-scroll text-[24px] font-extrabold uppercase tracking-tight leading-none">THE REALITY</h3>
                </div>
                <div className="col-span-3 pr-[24px]">
                  <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                    The market only sees another replaceable product. You are scaling acquisition on top of a fundamentally broken retention architecture. CAC is rising while your Lifetime Value remains stagnant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Methodology */}
      <section data-nav-theme="dark" className="w-full bg-[#F7F7F8] px-[28px] pb-[160px] text-[#010206]">
        <div className="grid grid-cols-12 gap-x-[24px] relative z-10 w-full mb-[80px]">
          <div className="col-start-1 col-span-6 flex flex-col">
            <h2 className="animate-on-scroll text-[clamp(32px,3.33vw,48px)] font-semibold leading-[1.05] tracking-tight">
              Premium Brands<span className="text-[#D92D20]"> Do Not Sell Products.</span> They Sell Health Systems. We deploy four structural systems to force growth.
            </h2>
          </div>
        </div>

        {/* 4 Cards Grid - No Animation per request */}
        <div className="grid grid-cols-12 gap-0 relative z-10 w-full border-t-[1px] border-l-[1px] border-[#010206] divide-x-[1px] divide-[#010206] border-b-[1px] bg-[#F7F7F8]">
          
          {/* Card 1 */}
          <div className="col-span-3 flex flex-col p-[20px] pt-[248px]">
            <h3 className="font-extrabold text-[24px] uppercase leading-[1.1] tracking-tight mb-[20px]">
              CATEGORY<br />POSITIONING
            </h3>
            <p className="font-medium text-[20px] leading-[1.15] tracking-tight">
              Move from ingredient selling to health protocol ownership.
            </p>
          </div>

          {/* Card 2 */}
          <div className="col-span-3 flex flex-col p-[20px] pt-[248px]">
            <h3 className="font-extrabold text-[24px] uppercase leading-[1.1] tracking-tight mb-[20px]">
              TRUST STACK<br />ARCHITECTURE
            </h3>
            <p className="font-medium text-[20px] leading-[1.15] tracking-tight">
              Replace scattered information with verifiable transformation evidence.
            </p>
          </div>

          {/* Card 3 */}
          <div className="col-span-3 flex flex-col p-[20px] pt-[248px]">
            <h3 className="font-extrabold text-[24px] uppercase leading-[1.1] tracking-tight mb-[20px]">
              IDENTITY<br />SUBSCRIPTION DESIGN
            </h3>
            <p className="font-medium text-[20px] leading-[1.15] tracking-tight">
              Stop framing subscriptions as discounts. We rebuild them as long term identity commitments to kill churn.
            </p>
          </div>

          {/* Card 4 */}
          <div className="col-span-3 flex flex-col p-[20px] pt-[248px]">
            <h3 className="font-extrabold text-[24px] uppercase leading-[1.1] tracking-tight mb-[20px]">
              REVENUE MODEL<br />ENGINEERING
            </h3>
            <p className="font-medium text-[20px] leading-[1.15] tracking-tight">
              Deploy protocol bundles to scale your Average Order Value.
            </p>
          </div>

        </div>
      </section>

      {/* Section 4: Fintech Level Conversion Math */}
      <section data-nav-theme="dark" className="w-full bg-[#F7F7F8] px-[28px] pb-[160px] text-[#010206]">
        <div className="grid grid-cols-12 gap-0 relative z-10 w-full">
          
          {/* Left: Image (takes 20px less than 6 grids) */}
          <div className="col-start-1 col-span-6 relative">
            <div className="absolute inset-0 w-[calc(100%-20px)]">
              <WebGLImage 
                src="/section4-img.jpg" 
                alt="Fintech Level Conversion Math" 
                className="w-full h-full" 
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="col-start-7 col-span-6 flex flex-col">
            <h2 className="animate-on-scroll text-[48px] font-semibold leading-[1.05] tracking-tight">
              We Bring Fintech Level Conversion Math To Premium Wellness
            </h2>
            
            <div className="grid grid-cols-6 gap-0 mt-[80px]">
              {/* Left Paragraph Block (3 grids) */}
              <div className="col-start-1 col-span-3 row-start-1 flex flex-col gap-[20px] pr-[24px]">
                <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                  The wellness industry is infected with aesthetic designers who cannot do math. We do not come from the wellness space. We come from Fintech and Web3.
                </p>
                <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                  In the financial sector, a fraction of a percent drop in conversion equals millions in lost capital. We spent years engineering trust in the most skeptical, high friction environments on the internet.
                </p>
              </div>

              {/* Right Paragraph Block (3 grids) */}
              <div className="col-start-4 col-span-3 row-start-2 flex flex-col gap-[20px] pr-[24px] mt-[80px]">
                <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                  Now, we are bringing that exact ruthless, data driven architecture to your brand.
                </p>
                <p className="animate-on-scroll text-[20px] font-medium leading-[1.15] tracking-tight">
                  While other agencies debate color palettes and font pairings, we deploy behavioral economics. We audit your skepticism peaks, rebuild your subscription psychology, and mathematically justify your premium price tag. We do not guess. We calculate.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Section 5: CTA Block */}
      <section className="w-full bg-[#F7F7F8] px-[28px] flex flex-col items-center">
        {/* Dark container */}
        <div data-nav-theme="light" className="w-full bg-[#051C2C] grid grid-cols-12 gap-0 relative z-10">
          {/* Content spanning 6 grids out of 12 */}
          <div className="col-start-1 col-span-6 flex flex-col p-[60px] gap-[60px] text-[#F7F7F8]">
            
            <h2 className="animate-on-scroll text-[clamp(36px,3.5vw,48px)] font-semibold leading-[1.05] tracking-tight">
              Stop Guessing.<br />Audit Your Funnel.
            </h2>
            
            <div className="flex flex-col gap-[20px]">
              <h3 className="animate-on-scroll text-[20px] font-extrabold uppercase leading-[1.1] tracking-tight">
                DO NOT BOOK A CALL. FIRST, YOU MUST COMPLETE OUR REVENUE ARCHITECTURE DIAGNOSTIC.
              </h3>
              
              <p className="animate-on-scroll text-[18px] font-medium leading-[1.25] tracking-tight pr-[40px]">
                This interactive tool will force you to answer highly specific questions regarding your Average Order Value, your subscription retention architecture, and your reliance on paid ads. It will automatically calculate your conversion friction and pinpoint exactly where you are bleeding capital.
              </p>
            </div>
            
            <a href="#diagnostic" className="animate-on-scroll flex items-start gap-[0.2em] font-extrabold text-[20px] uppercase tracking-[0.02em] w-fit group hover:opacity-80 transition-opacity leading-none text-[#F7F7F8]">
              <span className="border-b-[2px] border-current pb-[2px]">
                START THE FREE DIAGNOSTIC
              </span>
              <svg className="w-[0.7em] h-[0.7em] mt-[0.1em] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 561 561" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M520.853 0C542.945 0 560.853 17.9086 560.853 40V520.5C560.853 542.591 542.945 560.5 520.853 560.5H519.853C497.762 560.5 479.853 542.591 479.853 520.5V138.275L68.9911 549.138C53.3701 564.759 28.0436 564.759 12.4226 549.138L11.7157 548.431C-3.90525 532.81 -3.90524 507.483 11.7157 491.862L422.578 81H40.3533C18.2619 81 0.35334 63.0914 0.35334 41V40C0.35334 17.9086 18.2619 0 40.3533 0H520.853Z" fill="currentColor"/>
              </svg>
            </a>
            
          </div>
        </div>
        
        {/* Bottom padding as a sequential block */}
        <div data-nav-theme="dark" className="w-full h-[160px] bg-[#F7F7F8]"></div>
      </section>

      {/* Section 6: Guarantee Transition (Pinned) */}
      <section id="guarantee-section" data-nav-theme="dark" className="relative h-[250vh] w-full bg-[#F7F7F8] text-[#010206] pb-[160px]">
        <div className="sticky top-0 h-screen w-full flex items-center px-[28px]">
          <div className="w-full grid grid-cols-12 gap-0 relative z-10">
            <div className="col-start-7 col-span-6 relative flex flex-col justify-center">
              <div className="relative w-full">
                {/* Text 1 */}
                <h2 className="guarantee-text-1 animate-on-scroll text-[clamp(32px,3.8vw,52px)] font-semibold leading-[1.05] tracking-tight">
                  This is a $10,000 injection into your revenue architecture. We project a minimum 30 percent lift in your subscription adoption and a 50 percent increase in checkout conversions.
                </h2>
                {/* Text 2 */}
                <h2 className="guarantee-text-2 absolute top-0 left-0 w-full text-[clamp(32px,3.8vw,52px)] font-semibold leading-[1.05] tracking-tight">
                  If we <span className="text-[#D92D20]">fail to hit</span> these benchmarks within 120 days of launch, our team continues to audit, test, and iterate on your funnel at zero additional cost to you until the metrics are achieved.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Strict Qualification Parameters — LAST SECTION */}
      <section data-nav-theme="dark" className="w-full bg-[#F7F7F8] px-[28px] pb-[160px] text-[#010206]">
        <div className="w-full grid grid-cols-2 gap-0" style={{ border: '1px solid #010206' }}>

          {/* Left Column — title */}
          <div style={{ padding: '60px' }}>
            <h2 className="animate-on-scroll text-[48px] font-semibold leading-[1.05] tracking-tight">
              Strict Qualification<br />Parameters
            </h2>
          </div>

          {/* Right Column — static cards */}
          <div className="flex flex-col" style={{ borderLeft: '1px solid #010206' }}>

            {/* Card 1 — THE CRITERIA */}
            <div style={{ padding: '60px', borderBottom: '1px solid #010206' }}>
              <h3 className="text-[20px] font-extrabold uppercase leading-[1.1] tracking-tight mb-[16px]">THE CRITERIA</h3>
              <ul className="text-[16px] font-medium leading-[1.5] tracking-tight list-disc pl-[20px] space-y-[4px]">
                <li>Founder led wellness brands only.</li>
                <li>Minimum $1M to $8M in annual revenue.</li>
                <li>Currently deploying capital on paid acquisition.</li>
              </ul>
            </div>

            {/* Card 2 — THE EXCLUSIONS */}
            <div style={{ padding: '60px', borderBottom: '1px solid #010206' }}>
              <h3 className="text-[20px] font-extrabold uppercase leading-[1.1] tracking-tight mb-[16px]">THE EXCLUSIONS</h3>
              <ul className="text-[16px] font-medium leading-[1.5] tracking-tight list-disc pl-[20px] space-y-[4px]">
                <li>No Amazon commodity supplement sellers.</li>
                <li>No influencer vanity brands.</li>
                <li>No early stage startups seeking a cheap redesign.</li>
              </ul>
            </div>

            {/* Card 3 — THE INVESTMENT */}
            <div style={{ padding: '60px', borderBottom: '1px solid #010206' }}>
              <h3 className="text-[20px] font-extrabold uppercase leading-[1.1] tracking-tight mb-[16px]">THE INVESTMENT</h3>
              <ul className="text-[16px] font-medium leading-[1.5] tracking-tight list-disc pl-[20px] space-y-[4px]">
                <li>Baseline engagements begin at $10,000.</li>
              </ul>
            </div>

            {/* Card 4 — Closing paragraph */}
            <div style={{ padding: '60px', borderBottom: '1px solid #010206' }}>
              <p className="text-[16px] font-medium leading-[1.5] tracking-tight">
                If you meet these parameters and are ready to fix your structural bottlenecks, submit your data for an economic diagnosis.
              </p>
            </div>

            {/* Card 5 — CTA */}
            <div style={{ padding: '60px' }}>
              <a href="#diagnosis" className="flex items-start gap-[0.2em] font-extrabold text-[20px] uppercase tracking-[0.02em] w-fit group hover:opacity-80 transition-opacity leading-none text-[#010206]">
                <span className="border-b-[2px] border-current pb-[2px]">
                  START YOUR REVENUE DIAGNOSIS
                </span>
                <svg className="w-[0.7em] h-[0.7em] mt-[0.1em] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 561 561" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M520.853 0C542.945 0 560.853 17.9086 560.853 40V520.5C560.853 542.591 542.945 560.5 520.853 560.5H519.853C497.762 560.5 479.853 542.591 479.853 520.5V138.275L68.9911 549.138C53.3701 564.759 28.0436 564.759 12.4226 549.138L11.7157 548.431C-3.90525 532.81 -3.90524 507.483 11.7157 491.862L422.578 81H40.3533C18.2619 81 0.35334 63.0914 0.35334 41V40C0.35334 17.9086 18.2619 0 40.3533 0H520.853Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-nav-theme="light" className="w-full bg-[#051C2C] text-[#F7F7F8]" style={{ minHeight: '520px' }}>
        <div className="w-full h-full flex flex-col">

          {/* Row 1: Heading + Logo | Nav Links — takes remaining space */}
          <div className="flex-1 grid grid-cols-12 gap-0" style={{ borderBottom: '1px solid rgba(247,247,248,0.2)' }}>

            {/* Left 6 grids: Heading + Logo */}
            <div className="col-span-6 flex items-start justify-between" style={{ padding: '60px' }}>
              <h2 className="text-[48px] font-semibold leading-[1.05] tracking-tight" style={{ maxWidth: '360px' }}>
                Systematic conversion engineering for the premium wellness sector
              </h2>
              <img src="/srsvti-logo-icon.svg" alt="Srsvti" className="w-[48px] h-auto mt-[4px]" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>

            {/* Right 6 grids: Nav Links */}
            <div className="col-span-6 flex flex-col gap-[16px]" style={{ borderLeft: '1px solid rgba(247,247,248,0.2)', padding: '60px' }}>
              <a href="#about" className="text-[24px] font-extrabold uppercase tracking-[0.02em] leading-none hover:opacity-80 transition-opacity">ABOUT US</a>
              <a href="#reports" className="text-[24px] font-extrabold uppercase tracking-[0.02em] leading-none hover:opacity-80 transition-opacity">REPORTS</a>
              <a href="#privacy" className="text-[24px] font-extrabold uppercase tracking-[0.02em] leading-none hover:opacity-80 transition-opacity">PRIVACY POLICY</a>
              <a href="#terms" className="text-[24px] font-extrabold uppercase tracking-[0.02em] leading-none hover:opacity-80 transition-opacity">TERMS OF SERVICE</a>
            </div>

          </div>

          {/* Row 2: CTA | Social Icons */}
          <div className="grid grid-cols-12 gap-0" style={{ borderBottom: '1px solid rgba(247,247,248,0.2)' }}>

            {/* Left 6 grids: CTA */}
            <div className="col-span-6 flex items-center" style={{ padding: '20px 60px' }}>
              <a href="#diagnosis" className="flex items-start gap-[0.2em] font-extrabold text-[20px] uppercase tracking-[0.02em] w-fit group hover:opacity-80 transition-opacity leading-none text-[#F7F7F8]">
                <span className="border-b-[2px] border-current pb-[2px]">
                  START YOUR REVENUE DIAGNOSIS
                </span>
                <svg className="w-[0.7em] h-[0.7em] mt-[0.1em] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 561 561" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M520.853 0C542.945 0 560.853 17.9086 560.853 40V520.5C560.853 542.591 542.945 560.5 520.853 560.5H519.853C497.762 560.5 479.853 542.591 479.853 520.5V138.275L68.9911 549.138C53.3701 564.759 28.0436 564.759 12.4226 549.138L11.7157 548.431C-3.90525 532.81 -3.90524 507.483 11.7157 491.862L422.578 81H40.3533C18.2619 81 0.35334 63.0914 0.35334 41V40C0.35334 17.9086 18.2619 0 40.3533 0H520.853Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            {/* Right 6 grids: Social Icons — 4 equal cells */}
            <div className="col-span-6 grid grid-cols-4 gap-0" style={{ borderLeft: '1px solid rgba(247,247,248,0.2)' }}>
              <a href="#linkedin" className="flex items-center justify-center hover:opacity-80 transition-opacity aspect-square" style={{ borderRight: '1px solid rgba(247,247,248,0.2)' }}>
                <img src="/linkedin.svg" alt="LinkedIn" className="w-[32px] h-[32px]" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
              <a href="#behance" className="flex items-center justify-center hover:opacity-80 transition-opacity aspect-square" style={{ borderRight: '1px solid rgba(247,247,248,0.2)' }}>
                <img src="/behance.svg" alt="Behance" className="w-[32px] h-[32px]" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
              <a href="#x" className="flex items-center justify-center hover:opacity-80 transition-opacity aspect-square" style={{ borderRight: '1px solid rgba(247,247,248,0.2)' }}>
                <img src="/x.svg" alt="X" className="w-[32px] h-[32px]" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
              <a href="#instagram" className="flex items-center justify-center hover:opacity-80 transition-opacity aspect-square">
                <img src="/instagram.svg" alt="Instagram" className="w-[32px] h-[32px]" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
            </div>

          </div>

          {/* Row 3: Copyright */}
          <div style={{ padding: '24px 60px' }}>
            <p className="text-[20px] font-medium leading-[1.4] tracking-tight opacity-60">
              © 2026 Srsvti. All Rights Reserved
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}