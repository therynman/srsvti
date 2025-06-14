import React from 'react';
import Logo from './Logo'; 

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-gray-300 font-primary_font">
      <div className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Top Section: Links and Tagline */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Links Section */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-white font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Social Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter/X</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>

          {/* Tagline and Form Section */}
          <div className="max-w-md">
            <h2 className="text-3xl font-primary_font font-semibold text-white leading-snug">
              We build <span className="text-primary font-secondary_font font-medium italic">identities, experiences, and systems.</span> Whether you're <span className="text-primary font-secondary_font font-medium italic">launching, pivoting, or scaling</span> — we're here to make it unforgettable.
            </h2>
            <div className="mt-8 flex w-full p-1 rounded-lg bg-gray-900 border border-gray-300 relative text-sm">
              <span className="pl-2 pr-3 mt-0.5 py-2 text-gray-400">You're one email away</span>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 ml-4 text-white transition-all duration-300 hover:opacity-90"
              >
                Let's build something great together
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Large Logo */}
        <div className="mt-24">
          <Logo className="w-full h-auto text-gray-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;