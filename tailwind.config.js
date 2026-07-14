/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF5C35',      // Coral
        'secondary': '#233554',    // Navy
        'tertiary': '#F7D11D',     // Yellow
        'surface': '#F4F1EA',      // Off-white
        'on-surface': '#000000',   // Black
      },
      fontFamily: {
        'display': ['Space Mono', 'monospace'],
        'body': ['Public Sans', 'sans-serif'],
        'label': ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}