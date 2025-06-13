import React from 'react';

// The SVG for the paper plane
const PaperPlaneSvg = ({ className }) => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <mask id="mask0_19_12" maskType="luminance" maskUnits="userSpaceOnUse" x="154" y="270" width="79" height="79">
      <path d="M154.568 270.617H232.593V348.416H154.568V270.617Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_19_12)">
      <path d="M232.228 295.523L167.772 348.248L154.88 270.901L232.228 295.523Z" fill="#E65535"/>
    </g>
    <path d="M200.966 187.108L96.8691 258.009L0.18512 225.781L200.966 187.108Z" fill="#FF886D"/>
    <mask id="mask1_19_12" maskType="luminance" maskUnits="userSpaceOnUse" x="0" y="51" width="400" height="176">
      <path d="M0 51.7495H400V226.173H0V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_19_12)">
      <path d="M399.815 51.7495L200.966 187.108L0.18512 225.781L399.815 51.7495Z" fill="#FF5C38"/>
    </g>
    <mask id="mask2_19_12" maskType="luminance" maskUnits="userSpaceOnUse" x="96" y="51" width="304" height="298">
      <path d="M96.79 51.7495H400V348.416H96.79V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask2_19_12)">
      <path d="M399.815 51.7495L236.225 198.131L154.88 270.901L167.772 348.248L96.8692 258.009L200.966 187.108L399.815 51.7495Z" fill="#AF422A"/>
    </g>
    <path d="M236.225 198.131L296.684 316.021L232.228 295.523L154.88 270.901L236.225 198.131Z" fill="#FF886D"/>
    <mask id="mask3_19_12" maskType="luminance" maskUnits="userSpaceOnUse" x="236" y="51" width="164" height="266">
      <path d="M236.049 51.7495H400V316.049H236.049V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask3_19_12)">
      <path d="M399.815 51.7495L296.684 316.02L236.225 198.131L399.815 51.7495Z" fill="#FF5C38"/>
    </g>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-footer-bg rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
          
          {/* Left Side: Text and Form */}
          <div className="md:w-1/2 text-white">
            <h2 className="text-5xl font-primary_font font-bold">
              Hire us <span className="text-primary font-secondary_font italic">already!</span>
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Tell us what you're building — we'll make it <span className="text-primary font-secondary_font italic">unforgettable.</span>
            </p>
            <div className="mt-8 flex w-full max-w-md p-1 rounded-lg border border-gray-700 bg-gray-800/50 relative">
              <input
                type="email"
                placeholder="You're one email away"
                className="w-full bg-transparent py-2.5 pl-4 pr-36 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-md bg-primary px-5 text-base font-semibold text-white transition-all duration-300 hover:opacity-90"
              >
                Make It Happen
              </button>
            </div>
          </div>

          {/* Right Side: Paper Plane SVG */}
          <div className="md:w-1/2 flex justify-center group">
            {/* CORRECTED: Increased the size of the SVG for better visual balance */}
            <PaperPlaneSvg className="w-72 h-72 md:w-[26rem] md:h-[26rem] group-hover:animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;