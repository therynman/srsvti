// import React, { useState, useEffect, useRef } from 'react';
// import WavyBackground from './components/WavyBackground';
// import Navbar from './components/Navbar';
// import Projects from './components/Projects';
// import Testimonials from './components/Testimonials';
// import Footer from './components/Footer';
// import Contact from './components/Contact';
// import FloatingConnectButton from './components/FloatingConnectButton';
// const Hero = () => (
//   <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center bg-bg-['0F2F2] px-4 pt-20">
//     <div className="mb-6 mt-18">
// <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
//     ⭐⭐⭐⭐⭐ Trusted by 40+ Founders Internationally
//   </span>
// </div>
// <h1 className="text-6xl md:text-7xl font-primary_font  max-w-4xl leading-tighter font-semibold tracking-tight">
//   Crafting <span className="font-secondary_font font-medium text-primary italic">solutions</span> and beautiful <span className="text-primary font-secondary_font font-medium italic">experiences</span> for the greatest <span className="font-secondary_font font-medium text-primary italic">brands</span>
// </h1>

// <div className="mt-10 w-[579px] h-[53px] mx-auto flex items-center shadow-lg rounded-xl relative">
  // <input
  //   type="email"
  //   placeholder="You're one email away"
  //   required
  //   className="
  //     w-full h-full rounded-xl border border-gray-200 bg-white
  //     pl-4 pr-[260px] font-primary_font font-bold
  //     text-lg text-gray-800 placeholder-gray-400
  //     transition-all
  //     focus:outline-none focus:ring-2 focus:ring-red-400
  //   "
  // />
  // <button
  //   type="submit"
  //   className="
  //     absolute right-2 top-1/2 -translate-y-1/2
  //     rounded-lg bg-primary px-6 py-2.5 
  //     text-base font-semibold text-white
  //     transition-all duration-300
  //     hover:from-red-500 hover:to-red-600
  //     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
  //   "
  // >
  //   Revolutionize your Brand
  // </button>
// </div>


// <p className="max-w-3xl mx-auto font-primary_font font-semibold text-gray-700 text-2xl mt-25 mb-10 leading-tight tracking-tight ">
//   Thoughtful design, built for those building the future. We design with intention: blending <span className="font-secondary_font font-medium text-primary italic">clarity</span>, <span className="font-secondary_font font-medium text-primary italic">elegance</span>, and <span className="font-secondary_font font-medium text-primary italic">strategy</span> into every brand and digital experience. Whether you're launching, rebranding, or scaling — we craft work that reflects who you are, and where you're going.
// </p>
// Use code with caution.
//   </section>
// );
// function App() {
// const [isButtonVisible, setIsButtonVisible] = useState(true);
// // A ref to attach to our footer element
// const footerRef = useRef(null);
// useEffect(() => {
// const observer = new IntersectionObserver(
// ([entry]) => {
// // If the footer is intersecting (visible), hide the button.
// // Otherwise, show it.
// setIsButtonVisible(!entry.isIntersecting);
// },
// {
// // The footer is considered "visible" when 10% of it is on screen
// threshold: 0.1,
// }
// );
// // Start observing the footer element
// if (footerRef.current) {
//   observer.observe(footerRef.current);
// }

// // Cleanup function to stop observing when the component unmounts
// return () => {
//   if (footerRef.current) {
//     observer.unobserve(footerRef.current);
//   }
// };
// Use code with caution.
// }, []);
// return (
// <WavyBackground>
// <div className="font-primary_font font-semibold">
// <Navbar />
// <main>
// <Hero />
// <Projects />
// <Testimonials />
// {/* Empty divs to act as scroll anchors /}
// <div id="services" className="h-1"></div>
// <div id="contact" className="h-1"></div>
// <Contact />
// </main>
// {/ <footer className="text-center py-8 bg-bg-['0F2F2] text-gray-500">
// <p>© {new Date().getFullYear()} srsVti. All rights reserved.</p>
// </footer> */}
// <div ref={footerRef}>
// <Footer />
//     </div>
//     <FloatingConnectButton isVisible={isButtonVisible} />
//   </div>
// </WavyBackground>
// Use code with caution.
// );
// }
// export default App;

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import WavyBackground from './components/WavyBackground';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';
import FloatingConnectButton from './components/FloatingConnectButton';
import Preloader from './components/Preloader';

// ... (Your Hero component remains the same) ...
const Hero = () => (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      <div className="mb-6 mt-18">
        <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
          ⭐⭐⭐⭐⭐ Trusted by 40+ Founders Internationally
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary_font max-w-4xl leading-tight font-semibold tracking-tight">
        Crafting <span className="font-secondary_font font-medium text-primary italic">solutions</span> and beautiful <span className="text-primary font-secondary_font font-medium italic">experiences</span> for the greatest <span className="font-secondary_font font-medium text-primary italic">brands</span>
      </h1>
      <div className="mt-10 w-full max-w-xs sm:max-w-md md:w-[579px] h-auto md:h-[53px] mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-0 md:shadow-lg rounded-xl md:relative">
        <input
          type="email"
          placeholder="You're one email away"
          required
          className="w-full h-[53px] rounded-xl border border-gray-200 bg-white pl-4 md:pr-[260px] font-primary_font font-bold text-lg text-gray-800 placeholder-gray-400 shadow-md md:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 rounded-lg bg-primary px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:opacity-90"
        >
          Revolutionize your Brand
        </button>
      </div>
      <p className="max-w-3xl mx-auto font-primary_font font-semibold text-gray-700 text-lg md:text-2xl mt-10 md:mt-25 mb-10 leading-relaxed md:leading-tight tracking-tight">
        Thoughtful design, built for those building the future. We design with intention: blending <span className="font-secondary_font font-medium text-primary italic">clarity</span>, <span className="font-secondary_font font-medium text-primary italic">elegance</span>, and <span className="font-secondary_font font-medium text-primary italic">strategy</span> into every brand and digital experience. Whether you're launching, rebranding, or scaling — we craft work that reflects who you are, and where you're going.
      </p>
    </section>
  );

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <WavyBackground>
          <div className="font-primary_font font-semibold">
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Testimonials />
              <div id="services" className="h-1"></div>
              <Contact />
            </main>
            <div ref={footerRef}>
              <Footer />
            </div>
            <FloatingConnectButton isVisible={isButtonVisible} />
          </div>
        </WavyBackground>
      )}
    </>
  );
}

export default App;