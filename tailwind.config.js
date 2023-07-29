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
        redGlow: "-1px 9px 46px 25px rgba(104,70,70,0.95)",
        greenGlow: "-1px 9px 46px 25px rgba(65,157,46,0.95)",
        glow: "-1px 9px 46px 25px rgba(0,0,0,0.71)",
        innerGlow: "-1px 9px 46px 63px rgba(0,0,0,0.74) inset",
        myShadow1: "0px 0px 25px 10px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
