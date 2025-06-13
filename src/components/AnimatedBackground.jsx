import React from 'react';

const AnimatedBackground = ({ children }) => {
  return (
    // This div has the animated background and acts as a wrapper
    // min-h-screen ensures it always takes up at least the full screen height
    <div className="animated-gradient-background min-h-screen">
      {children}
    </div>
  );
};

export default AnimatedBackground;