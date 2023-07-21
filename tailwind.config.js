/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.js", "./src/app/**/*.jsx"],
  darkMode: ["class"],
  theme: {
    listStyleType: {
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
