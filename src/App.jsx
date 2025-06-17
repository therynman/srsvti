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
const Hero = () => {
  const [email, setEmail] = useState('');
  // State to manage the form's status (submitting, success, error)
  const [formStatus, setFormStatus] = useState({ submitting: false, message: '' });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setFormStatus({ submitting: true, message: '' });

    try {
      // Send the email to our secure serverless function
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If Mailchimp returned an error, use it
        throw new Error(data.error || 'Something went wrong.');
      }

      // On success
      setFormStatus({ submitting: false, message: 'Success! Please check your email to confirm.' });
      setEmail(''); // Clear the input field

    } catch (error) {
      // On failure
      setFormStatus({ submitting: false, message: error.message });
    }
  };

  return(
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      <div className="mb-6 mt-18">
        <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
          ⭐⭐⭐⭐⭐ Trusted by 40+ Founders Internationally
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary_font max-w-4xl leading-tight font-semibold tracking-tight">
        Crafting <span className="font-secondary_font font-medium text-primary italic">solutions</span> and beautiful <span className="text-primary font-secondary_font font-medium italic">experiences</span> for the greatest <span className="font-secondary_font font-medium text-primary italic">brands</span>
      </h1>

      {/* The div is now a form with an onSubmit handler */}
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xs sm:max-w-md md:w-[579px] h-auto md:h-[53px] mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-0 md:shadow-lg rounded-xl md:relative">
        <input
          type="email"
          value={email} // Controlled component
          onChange={(e) => setEmail(e.target.value)} // Update state on change
          placeholder="You're one email away"
          required
          className="w-full h-[53px] rounded-xl border border-gray-200 bg-white pl-4 md:pr-[260px] font-primary_font font-bold text-lg text-gray-800 placeholder-gray-400 shadow-md md:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          disabled={formStatus.submitting} // Disable button while submitting
          className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 rounded-lg bg-primary px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formStatus.submitting ? 'Submitting...' : 'Revolutionize your Brand'}
        </button>
      </form>

      {/* Display the success or error message below the form */}
      {formStatus.message && (
        <p className="mt-4 text-center text-gray-800 font-semibold">
          {formStatus.message}
        </p>
      )}
      <p className="max-w-3xl mx-auto font-primary_font font-semibold text-gray-700 text-lg md:text-2xl mt-10 md:mt-25 mb-10 leading-relaxed md:leading-tight tracking-tight">
        Thoughtful design, built for those building the future. We design with intention: blending <span className="font-secondary_font font-medium text-primary italic">clarity</span>, <span className="font-secondary_font font-medium text-primary italic">elegance</span>, and <span className="font-secondary_font font-medium text-primary italic">strategy</span> into every brand and digital experience. Whether you're launching, rebranding, or scaling — we craft work that reflects who you are, and where you're going.
      </p>
    </section>
  );
};

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