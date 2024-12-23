/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          900: '#004225', // Use this for REM Farms theme color
        },
      },
    },
  },
  plugins: [],
}
