/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Soleil"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'ynd': 'rgb(240, 235, 230)', // Add your custom color here
      },
    },
  },
  plugins: [],
}

