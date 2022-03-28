module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "light-bg": "#f6f6f6",
      black: "#423E37",
    },
    extend: {
      transitionProperty: {
        fade: "opacity, visibility",
      },
    },
  },
  plugins: [],
};
