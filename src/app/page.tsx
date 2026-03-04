'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const delusionRef = useRef<HTMLElement>(null);
  const systemsRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Custom Cursor Logic
      if (!cursorRef.current || !cursorOutlineRef.current) return;



      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });

        gsap.to(cursorOutlineRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      window.addEventListener('mousemove', moveCursor);

      // Hero Animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo('.hero-heading-line',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo('.hero-subtext',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo('.hero-cta',
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          "-=0.4"
        );

      // Scroll Animations
      if (problemRef.current) {
        gsap.fromTo(problemRef.current.querySelectorAll('.reveal-fade-up'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
            scrollTrigger: { trigger: problemRef.current, start: "top 75%" }
          }
        );
      }

      if (delusionRef.current) {
        gsap.fromTo(delusionRef.current.querySelectorAll('.delusion-card'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
            scrollTrigger: { trigger: delusionRef.current, start: "top 75%" }
          }
        );
      }

      if (systemsRef.current) {
        gsap.fromTo(systemsRef.current.querySelectorAll('.system-card'),
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1,
            scrollTrigger: { trigger: systemsRef.current, start: "top 75%" }
          }
        );
      }

      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }, { scope: document.body });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 overflow-hidden selection:bg-[#a3e635] selection:text-black">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
      <div ref={cursorOutlineRef} className="custom-cursor-outline hidden md:block"></div>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#a3e635] opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#a3e635] opacity-[0.03] blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation / Header */}
        <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
          <div className="text-xl font-bold tracking-tighter">Srsvti.</div>
          <a
            href="https://cal.com/srsvti/diagnostic-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-[#a3e635] text-[#050505] text-sm font-medium hover:scale-105 transition-transform duration-300"
          >
            Apply Now
          </a>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-12 text-center overflow-hidden">
          {/* Hero Background Image & Overlays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/hero-bg.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent"></div>
            {/* Smooth Transition to Next Section */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="hero-badge mb-6 px-4 py-1.5 rounded-full border border-white/10 glass-panel text-xs font-semibold tracking-widest uppercase text-zinc-300">
              Not through ads. Through structural positioning.
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
              <div className="overflow-hidden pb-2"><span className="hero-heading-line block text-zinc-400">Stop Charging</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-heading-line block">Protocol-Level Prices</span></div>
              <div className="overflow-hidden pb-2 text-gradient-green"><span className="hero-heading-line block italic font-light">With Product-Level Positioning.</span></div>
            </h1>

            <p className="hero-subtext text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
              We redesign the <strong className="text-zinc-200 font-medium">revenue architecture</strong> of premium wellness brands.
            </p>

            <a
              href="https://cal.com/srsvti/diagnostic-call"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group relative inline-flex items-center justify-center px-8 py-4 font-medium text-[#050505] bg-[#a3e635] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] focus:outline-none"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Revenue Diagnosis
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
            </a>
          </div>
        </section>

        {/* Problem Section */}
        <section ref={problemRef} className="py-32 px-6 max-w-4xl mx-auto">
          <div className="reveal-fade-up text-[#a3e635] font-mono text-sm tracking-widest uppercase mb-4">Fast Resonance</div>
          <h2 className="reveal-fade-up text-4xl md:text-5xl font-medium mb-12">Your brand probably looks serious.</h2>

          <div className="grid md:grid-cols-2 gap-12 text-zinc-400 text-lg leading-relaxed">
            <div className="reveal-fade-up space-y-4">
              <p>Clinical packaging.</p>
              <p>Ingredient transparency.</p>
              <p>Scientific language everywhere.</p>
              <p className="text-zinc-200 mt-8 text-xl">On the surface it looks premium. But economically it behaves like a commodity.</p>
              <p className="text-[#a3e635] font-medium text-xl">Why?</p>
            </div>
            <div className="reveal-fade-up">
              <p className="mb-6">Because most wellness brands scale acquisition on top of <strong className="text-white">weak retention architecture</strong>.</p>
              <p>So growth looks like this:</p>
              <ul className="mt-4 space-y-2 border-l-2 border-white/10 pl-4 py-2">
                <li>CAC increases</li>
                <li>Retention fluctuates</li>
                <li>Subscriptions stall</li>
                <li>Competitors copy claims</li>
              </ul>
              <p className="mt-6 text-zinc-300">And suddenly your &quot;premium brand&quot; feels interchangeable.</p>
            </div>
          </div>
        </section>

        {/* Founder Delusion Section */}
        <section ref={delusionRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto bg-[#0a0a0a] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a3e635] opacity-[0.02] blur-[80px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium mb-6">The Founder Delusion</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">Most wellness founders believe three things. None of these are the real bottleneck.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { belief: "If the product works, growth will follow.", reality: "Information is mistaken for authority." },
                { belief: "If we educate customers, trust will increase.", reality: "Explanation is mistaken for persuasion." },
                { belief: "If CAC drops, the business will scale.", reality: "Clean design is mistaken for category leadership." }
              ].map((item, i) => (
                <div key={i} className="delusion-card glass-panel p-8 rounded-2xl relative group">
                  <div className="text-5xl font-bold text-white/5 mb-4 group-hover:text-[#a3e635]/10 transition-colors">0{i + 1}</div>
                  <h3 className="text-xl font-medium mb-4">{item.belief}</h3>
                  <div className="h-[1px] w-full bg-white/10 my-4"></div>
                  <p className="text-zinc-400 text-sm">{item.reality}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center text-xl">
              The real bottleneck is <strong className="text-[#a3e635]">structural positioning</strong>.
            </div>
          </div>
        </section>

        {/* The Real Problem & Systems */}
        <section ref={systemsRef} className="py-32 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left Column: Context */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">The Real Problem</h2>
              <div className="space-y-6 text-lg text-zinc-400">
                <p>Right now your business likely sells: Capsules. Powders. Ingredients. Which means the market sees: <span className="text-white">A product.</span></p>
                <p className="text-xl text-white py-4 border-y border-white/10">Premium wellness companies don’t sell products.<br /><span className="text-[#a3e635]">They sell protocols, systems, and identity reinforcement.</span></p>
                <p>The difference is not branding. It is <strong className="text-white">revenue architecture</strong>.</p>
              </div>
            </div>

            {/* Right Column: 4 Systems Grid */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <h3 className="text-2xl font-medium text-white mb-2">What We Actually Do</h3>
                <p className="text-zinc-400">Srsvti does not design brands. We redesign the economic system behind them through four structural changes.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="system-card glass-panel p-6 rounded-2xl hover:border-[#a3e635]/30 transition-all duration-300">
                  <h4 className="text-[#a3e635] font-mono text-sm mb-3">01</h4>
                  <h5 className="text-xl font-medium mb-2">Category Positioning</h5>
                  <p className="text-zinc-400 text-sm">Move your brand from ingredient selling to health protocol ownership. This creates category authority instead of comparison shopping.</p>
                </div>

                <div className="system-card glass-panel p-6 rounded-2xl hover:border-[#a3e635]/30 transition-all duration-300">
                  <h4 className="text-[#a3e635] font-mono text-sm mb-3">02</h4>
                  <h5 className="text-xl font-medium mb-2">Trust Stack Architecture</h5>
                  <p className="text-zinc-400 text-sm">Rebuild how credibility appears across the site. Clinical authority, proof hierarchy, transformation evidence. Structured conviction.</p>
                </div>

                <div className="system-card glass-panel p-6 rounded-2xl hover:border-[#a3e635]/30 transition-all duration-300">
                  <h4 className="text-[#a3e635] font-mono text-sm mb-3">03</h4>
                  <h5 className="text-xl font-medium mb-2">Subscription Identity Design</h5>
                  <p className="text-zinc-400 text-sm">Most subscriptions are framed as discounts. That guarantees churn. We redesign it as identity reinforcement and long-term commitment.</p>
                </div>

                <div className="system-card glass-panel-heavy p-6 rounded-2xl border-[#a3e635]/20 hover:border-[#a3e635]/50 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <h4 className="text-[#a3e635] font-mono text-sm mb-3">04</h4>
                    <h5 className="text-xl font-medium mb-2 text-white">Revenue Model Engineering</h5>
                    <p className="text-zinc-300 text-sm">Protocol bundles, system pathways, and strategic offer ladders designed to increase AOV and lifetime value simultaneously.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-[#a3e635] opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium mb-6">The Shift</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">What happens when you stop selling ingredients and start owning outcomes.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Before */}
              <div className="glass-panel p-8 md:p-12 rounded-3xl opacity-60">
                <div className="text-red-400/80 font-mono text-sm tracking-widest uppercase mb-8">The Old Model</div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-red-500/50">→</div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Single-purchase mindset</h4>
                      <p className="text-sm text-zinc-500">Customers buy once to "try it out."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-red-500/50">→</div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Discount-driven subscriptions</h4>
                      <p className="text-sm text-zinc-500">They subscribe to save 15%, then cancel.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-red-500/50">→</div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Commoditized brand</h4>
                      <p className="text-sm text-zinc-500">Competing purely on claims and ingredients.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="glass-panel-heavy p-8 md:p-12 rounded-3xl border-[#a3e635]/30 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl z-0"></div>
                <div className="relative z-10">
                  <div className="text-[#a3e635] font-mono text-sm tracking-widest uppercase mb-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></div>
                    The New Architecture
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-[#a3e635]">✓</div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Protocol adoption</h4>
                        <p className="text-sm text-zinc-400">Customers buy into a 90-day biological shift.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-[#a3e635]">✓</div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Identity-driven retention</h4>
                        <p className="text-sm text-zinc-400">Subscriptions become a commitment to themselves.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-[#a3e635]">✓</div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Category of one</h4>
                        <p className="text-sm text-zinc-400">You become the only logical choice for that outcome.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Final CTA / Audience Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-24">

            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Who This Is For</h2>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="px-6 py-3 rounded-full border border-white/10 glass-panel text-sm text-zinc-300">
                  <span className="text-[#a3e635] mr-2">✦</span> $1M–$10M+ Revenue
                </div>
                <div className="px-6 py-3 rounded-full border border-white/10 glass-panel text-sm text-zinc-300">
                  <span className="text-[#a3e635] mr-2">✦</span> High-LTV Potential
                </div>
                <div className="px-6 py-3 rounded-full border border-white/10 glass-panel text-sm text-zinc-300">
                  <span className="text-[#a3e635] mr-2">✦</span> Clinically-Backed Products
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-8 md:p-16 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#a3e635]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-medium mb-6">Ready to redesign your revenue architecture?</h3>
                <p className="text-zinc-400 mb-10 text-lg">Stop losing margin to ad platforms. Start building structural loyalty.</p>

                <a
                  href="https://cal.com/srsvti/diagnostic-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-medium text-[#050505] bg-[#a3e635] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(163,230,53,0.2)] focus:outline-none"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Apply for a Diagnosis
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                </a>
                <p className="mt-6 text-xs text-zinc-500 uppercase tracking-widest">Limited availability for Q2</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
