/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'stone-950': '#0c0a09',
        'stone-900': '#1c1917',
        'stone-800': '#292524',
        'stone-400': '#a8a29e',
        'amber-500': '#d97706',
        'emerald-400': '#34d399'
      }
    }
  },
  plugins: []
};
