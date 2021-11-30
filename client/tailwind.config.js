module.exports = {
  // purge: [],
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "text-blue-600",
      "text-gray-600",
      "text-blue-400",
      "text-gray-400",
      "text-blue-700",
      "text-gray-700",
      "text-blue-900",
      "text-gray-900",
    ],
  },
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
