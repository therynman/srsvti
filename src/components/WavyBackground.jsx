import React from 'react';

const WavyBackground = ({ children }) => {
  // Common classes for all spots to avoid repetition
  const spotBaseClasses = "absolute bg-[radial-gradient(50%_50%_at_50%_50%,rgba(22,35,42,0.2)_0%,rgba(22,35,42,0)_100%)]";

  return (

    <div className="relative w-full h-full bg-[#E4EEF0] overflow-hidden">
      
      <div className={`${spotBaseClasses} w-[1215.4px] h-[237.35px] left-[-249.44px] top-[65px] rotate-[40deg] blur-[45px]`}></div>
      
      <div className={`${spotBaseClasses} w-[1300px] h-[300px] right-[-400px] bottom-[-100px] rotate-[-30deg] blur-[50px]`}></div>
      
      <div className={`${spotBaseClasses} w-[1500px] h-[250px] right-[-550px] top-[150px] rotate-[60deg] blur-[60px]`}></div>
  
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;