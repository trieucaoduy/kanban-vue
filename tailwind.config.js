/** @type {import('tailwindcss').Config} */
const { blackA, green, grass, mauve } = require('@radix-ui/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
