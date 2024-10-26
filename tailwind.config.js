/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],
	theme: {
		container: {
			center: true,
			screens: {
				sm: "600px",
				md: "728px",
				lg: "1024px",
			},
			padding: {
				DEFAULT: "15px",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
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
				green: "#BFF6C3",
				yellow: "#FFE0B5",
				red: "#FF8787",
			},
		},
	},
	plugins: [],
};
