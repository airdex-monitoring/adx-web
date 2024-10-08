/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px ',
        md: '728px',
        lg: '984px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        white: "#FFFFFF",
        black: "#353535",
        green: "#3C6E71",
        gray: "#D9D9D9",
        blue: "#284B63",
      }
    },
  },
  plugins: [],
}

