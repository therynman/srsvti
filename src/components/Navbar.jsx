import { useState, useEffect } from 'react';

const NavLinks = ({ onClick }) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <a href="#home" onClick={(e) => handleClick(e, '#home')} className="hover:text-primary transition-colors block py-2 md:py-0">Home</a>
      <a href="#projects" onClick={(e) => handleClick(e, '#projects')} className="hover:text-primary transition-colors block py-2 md:py-0">Projects</a>
      <a href="#testimonials" onClick={(e) => handleClick(e, '#testimonials')} className="hover:text-primary transition-colors block py-2 md:py-0">Services</a>
    </>
  );
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    }
  };

  const closeMenuWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-5 left-1/2 w-full md:w-3xl -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-24'}`}>
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl px-4 md:px-5 py-3 flex items-center justify-between">
          <a href="#home">
            <img src="/images/logos/Full_Logo.png" alt="logo" className="w-20 md:w-25 h-5" />
          </a>

          <div className="hidden md:flex items-center space-x-8 text-md font-primary_font font-bold">
            <NavLinks />
          </div>

          <div className="hidden  md:block">
            <a href="#contact" className="font-primary_font bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2">
              <span>Contact Us</span>
              <span>↗</span>
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={`md:hidden mt-2 bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-6 py-6 text-center font-primary_font font-bold space-y-4 transition-all duration-300 ease-in-out ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <NavLinks onClick={closeMenuWithAnimation} />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector('#contact');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
                closeMenuWithAnimation();
              }}
              className="block w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
