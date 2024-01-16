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
        "hover":"#EEEEEE",
        "text-secondary":"#6B6B6B"
      },
      keyframes:{
        slideDown:{
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
      },
      animation:{
        slidedown:'slideDown 0.9s ease-in-out'
      }
    },
  },
  plugins: [],
}

