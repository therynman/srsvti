import React from 'react';


const LinkedInIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const FloatingConnectButton = ({ isVisible }) => {
    return (
        <a
            href="https://www.linkedin.com/company/srsvti/e"
            target="_blank"
            rel="noopener noreferrer"
            className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-3 px-5 py-2
        bg-white/70 backdrop-blur-md rounded-full
        shadow-lg
        border border-gray-300/75
        text-gray-800/75 
       hover:border-gray-300 hover:text-gray-800
        hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
        >
            <span>Let's Connect</span>
            <LinkedInIcon />
        </a>
    );
};

export default FloatingConnectButton;