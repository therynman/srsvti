// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}', ],
  theme: {
    extend: {
      colors: { 'brand-orange': '#ED5E42', },
      animation: {
        'moveGradient': 'moveGradient 15s ease-in-out infinite',
        'scroll-left': 'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 40s linear infinite',
      },
      keyframes: {
        moveGradient: {
          '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' },
        },
        'scroll-left': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' }, },
        'scroll-right': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' }, },
      },
    },
  },
  plugins: [],
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}', ],
//   theme: {
//     extend: {
//       colors: { 'brand-orange': '#ED5E42', },
//       animation: {
//         'moveGradient': 'moveGradient 15s ease-in-out infinite',
//         'scroll-left': 'scroll-left 40s linear infinite',
//         'scroll-right': 'scroll-right 40s linear infinite',
//       },
//       keyframes: { /* ... your keyframes ... */ },
//     },
//   },
//   plugins: [],
// }