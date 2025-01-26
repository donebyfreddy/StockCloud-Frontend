/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/screens/landingPage/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sofia: ['Sofia', 'sans-serif'], // "sofia" is now available
      },
    },
  },
  plugins: [],
}

