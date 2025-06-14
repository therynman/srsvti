// src/App.jsx
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';

const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center bg-bg-['0F2F2] px-4 pt-20">
    <div className="mb-6 mt-18">
      <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
        ⭐⭐⭐⭐⭐ Trusted by 40+ Founders Internationally
      </span>
    </div>
    <h1 className="text-6xl md:text-7xl font-primary_font  max-w-4xl leading-tighter font-semibold tracking-tight">
      Crafting <span className="font-secondary_font font-medium text-primary italic">solutions</span> and beautiful <span className="text-primary font-secondary_font font-medium italic">experiences</span> for the greatest <span className="font-secondary_font font-medium text-primary italic">brands</span>
    </h1>

   <div className="mt-10 w-[579px] h-[53px] mx-auto flex items-center shadow-lg rounded-xl relative">
        <input
        type="email"
        placeholder="You're one email away"
        required
        className="
          w-full h-full rounded-xl border border-gray-200 bg-white
          pl-4 pr-[260px] font-primary_font font-bold
          text-lg text-gray-800 placeholder-gray-400
          transition-all
          focus:outline-none focus:ring-2 focus:ring-red-400
        "
      />
      <button
        type="submit"
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          rounded-lg bg-primary px-6 py-2.5 
          text-base font-semibold text-white
          transition-all duration-300
          hover:from-red-500 hover:to-red-600
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        "
      >
            Revolutionize your Brand
          </button>
    </div>


    <p className="max-w-3xl mx-auto font-primary_font font-semibold text-gray-700 text-2xl mt-25 mb-10 leading-tight tracking-tight ">
      Thoughtful design, built for those building the future. We design with intention: blending <span className="font-secondary_font font-medium text-primary italic">clarity</span>, <span className="font-secondary_font font-medium text-primary italic">elegance</span>, and <span className="font-secondary_font font-medium text-primary italic">strategy</span> into every brand and digital experience. Whether you're launching, rebranding, or scaling — we craft work that reflects who you are, and where you're going.
    </p>
    
  </section>
);

function App() {
  return (
    <AnimatedBackground>
      <div className="font-primary_font font-semibold">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Testimonials />
          {/* Empty divs to act as scroll anchors */}
          <div id="services" className="h-1"></div>
          <div id="contact" className="h-1"></div>
          <Contact/>
        </main>
        {/* <footer className="text-center py-8 bg-bg-['0F2F2] text-gray-500">
          <p>© {new Date().getFullYear()} srsVti. All rights reserved.</p>
        </footer> */}
        <Footer />
      </div>
    </AnimatedBackground>
  );
}

export default App;