module.exports = {
  // purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
  },
  variants: {
    extend: {
      backgroundBlendMode: ["hover", "focus"],
    },
  },
  plugins: [],
};
