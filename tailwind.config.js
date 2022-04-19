module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1081px",
      },
      transitionProperty: {
        fade: "opacity, visibility",
      },
      colors: {
        "light-bg": "#f6f6f6",
        gray: "#606060",
        black: "#423E37",
        opaque: "rgba(0, 0, 0, 0.95)",
      },
    },
  },
  plugins: [],
};
