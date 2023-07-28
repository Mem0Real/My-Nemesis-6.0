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
      boxShadow: {
        redGlow: "box-shadow: -1px 9px 46px 25px rgba(104,70,70,0.75)",
        greenGlow: "box-shadow: -1px 9px 46px 25px rgba(65,157,46,0.75)",
        glow: "box-shadow: -1px 9px 46px 25px rgba(0,0,0,0.51)",
        innerGlow: "box-shadow: -1px 9px 46px 63px rgba(0,0,0,0.34) inset",
      },
    },
  },
  plugins: [],
};
