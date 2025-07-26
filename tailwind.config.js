// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   extend: {
  animation: {
    'spin-slow': 'spin 6s linear infinite',
  },
}
  },
  plugins: [],
};

