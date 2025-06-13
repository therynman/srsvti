import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      // Show navbar if scrolling up or at the very top of the page
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
                
  return (
    <nav className={`fixed top-5 rounded-lg w-3xl left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-24'}`}>
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl px-8 py-4 flex items-center justify-between space-x-10">
        {/* <a href="#home" className="font-bold text-2xl text-text-[#1A1A1A]">srsVti</a> */}

        <a href="#home"><img src="/images/logos/image.png" alt="logo" className='w-25 h-5 mt-0.5 -ml-1'/></a>
        <div className="flex items-center space-x-8 text-md font-primary_font font-bold">
          <a href="#home" className="hover:text-primary transition-colors">Home</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Services</a>
        </div>
        <a href="#contact" className="font-primary_font bg-primary -mr-5 text-white px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2">
          <span>Contact Us</span>
          <span>↗</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;