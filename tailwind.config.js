/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#BE3455",
        "secondary":"#D4CACD",
        "hover":"#EEEEEE"
      }
    },
  },
  plugins: [],
}

