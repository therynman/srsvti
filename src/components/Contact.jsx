import React from 'react';

// ... (PaperPlaneSvg remains the same) ...
const PaperPlaneSvg = ({ className }) => (
  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* ...SVG content... */}
    <mask id="mask0_19_12" masktype="luminance" maskUnits="userSpaceOnUse" x="154" y="270" width="79" height="79">
      <path d="M154.568 270.617H232.593V348.416H154.568V270.617Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_19_12)">
      <path d="M232.228 295.523L167.772 348.248L154.88 270.901L232.228 295.523Z" fill="#E65535"/>
    </g>
    <path d="M200.966 187.108L96.8691 258.009L0.18512 225.781L200.966 187.108Z" fill="#FF886D"/>
    <mask id="mask1_19_12" masktype="luminance" maskUnits="userSpaceOnUse" x="0" y="51" width="400" height="176">
      <path d="M0 51.7495H400V226.173H0V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_19_12)">
      <path d="M399.815 51.7495L200.966 187.108L0.18512 225.781L399.815 51.7495Z" fill="#FF5C38"/>
    </g>
    <mask id="mask2_19_12" masktype="luminance" maskUnits="userSpaceOnUse" x="96" y="51" width="304" height="298">
      <path d="M96.79 51.7495H400V348.416H96.79V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask2_19_12)">
      <path d="M399.815 51.7495L236.225 198.131L154.88 270.901L167.772 348.248L96.8692 258.009L200.966 187.108L399.815 51.7495Z" fill="#AF422A"/>
    </g>
    <path d="M236.225 198.131L296.684 316.021L232.228 295.523L154.88 270.901L236.225 198.131Z" fill="#FF886D"/>
    <mask id="mask3_19_12" masktype="luminance" maskUnits="userSpaceOnUse" x="236" y="51" width="164" height="266">
      <path d="M236.049 51.7495H400V316.049H236.049V51.7495Z" fill="white"/>
    </mask>
    <g mask="url(#mask3_19_12)">
      <path d="M399.815 51.7495L296.684 316.02L236.225 198.131L399.815 51.7495Z" fill="#FF5C38"/>
    </g>
  </svg>
);


const Contact = () => {
  return (
    <section id="contact" className="py-15 md:py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-footer-bg rounded-2xl h-[550px] md:h-[400px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden md:overflow-visible">
          <div className="md:w-3/5 text-white text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-primary_font font-semibold">
              Hire us <span className="text-primary font-secondary_font italic">already!</span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Tell us what you're building — we'll make it <span className="text-primary font-secondary_font italic">unforgettable.</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row w-full max-w-md mx-auto md:mx-0 p-1 rounded-lg border border-gray-700 bg-gray-800/50 relative">
              <input type="email" placeholder="You're one email away" className="w-full bg-transparent py-2.5 pl-4 pr-5 text-white placeholder-gray-400 focus:outline-none" />
              <button type="submit" className="w-full sm:w-auto rounded-md bg-primary px-4 py-2 text-base font-semibold text-white transition-all duration-300 hover:opacity-90 flex-shrink-0">
                Make It Happen
              </button>
            </div>
          </div>
          <div className="-mt-10 md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2 md:translate-x-1/5 lg:translate-x-1/5">
            <PaperPlaneSvg className="w-60 h-60 md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem] hover:animate-wiggle" />
          </div>
        </div>
      </div>
    </section>
//     <section id="contact" className="py-10 md:py-16">
//   <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="relative bg-footer-bg rounded-2xl p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-visible">
      
//       {/* Text Content */}
//       <div className="w-full md:w-3/5 text-white text-center md:text-left z-10">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary_font font-semibold">
//           Hire us <span className="text-primary font-secondary_font italic">already!</span>
//         </h2>
//         <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">
//           Tell us what you're building — we'll make it <span className="text-primary font-secondary_font italic">unforgettable.</span>
//         </p>

//         {/* Email Input + Button */}
//         <div className="mt-8 flex flex-col sm:flex-row w-full max-w-md mx-auto md:mx-0 p-1 rounded-lg border border-gray-700 bg-gray-800/50 relative z-10">
//           <input
//             type="email"
//             placeholder="You're one email away"
//             className="w-full bg-transparent py-2.5 pl-4 pr-5 text-white placeholder-gray-400 focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 rounded-md bg-primary px-4 py-2 text-base font-semibold text-white transition-all duration-300 hover:opacity-90 flex-shrink-0"
//           >
//             Make It Happen
//           </button>
//         </div>
//       </div>

//       {/* SVG Placement */}
//       <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] flex-shrink-0 z-0 md:static md:translate-x-10">
//         <PaperPlaneSvg className="w-full h-full hover:animate-wiggle" />
//       </div>
//     </div>
//   </div>
// </section>

  );
};

export default Contact;