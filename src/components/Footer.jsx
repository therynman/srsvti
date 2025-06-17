
import React from 'react';
import Logo from './Logo';
import useMailchimpForm from '../hooks/useMailchimpForm';

const Footer = () => {
  const { email, setEmail, formStatus, handleSubmit } = useMailchimpForm();
  return (
    <footer className="bg-footer-bg text-gray-300 font-primary_font">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-12 md:gap-16">
            <div>
              <h3 className="text-white font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Social Links</h3>
              <ul className="space-y-2">
                <li><a href="https://www.linkedin.com/company/srsvti/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter/X</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-md mx-auto md:mx-0">
            <h2 className="text-2xl md:text-3xl font-primary_font font-semibold text-white leading-snug">
              We build <span className="text-primary font-secondary_font font-medium italic">identities, experiences, and systems.</span> Whether you're <span className="text-primary font-secondary_font font-medium italic">launching, pivoting, or scaling</span> — we're here to make it unforgettable.
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row w-full p-1 rounded-lg bg-gray-900 border border-gray-700 relative text-sm gap-2">
              <input
                type="email"
                placeholder="You're one email away"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto text-center sm:text-left px-3 py-2 text-gray-400 bg-transparent border-none focus:outline-none"
              />
              <button
                type="submit" disabled={formStatus.submitting}
                className="flex-shrink-0 w-full sm:w-auto rounded-md bg-primary px-4 py-2 text-white transition-all duration-300 hover:opacity-90"
              >
                {formStatus.submitting ? 'Submitting...' : "Let's build something great together"}
              </button>
            </form>
            {formStatus.message && (
              <p className="mt-4 text-center text-white font-semibold">{formStatus.message}</p>
            )}
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <Logo className="w-full h-auto text-gray-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;