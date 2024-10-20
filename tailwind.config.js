/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px ",
        md: "728px",
        lg: "984px",
      },
    },
    extend: {
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        white: "#FFFFFF",
        black: "#212427",
        green: "#3C6E71",
        gray: "#D9D9D9",
        blue: "#284B63",
      },
    },
  },
  plugins: [],
};
