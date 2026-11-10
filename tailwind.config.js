// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        obsidian: {
          950: '#050608',
          900: '#07080a',
          850: '#0d0f12',
          800: '#14171c',
          700: '#1e2229',
        },
        aerospace: {
          green: '#22c55e', // Restrained emerald accent
          steel: '#94a3b8',
          charcoal: '#334155',
        }
      },
    }
  },
  plugins: [],
};

