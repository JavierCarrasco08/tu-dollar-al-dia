/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        ["inclusive-sans"]: ["Inclusive Sans", "sans-serif"],
      },
      colors: {
        background: "#0d1321",
        dollar: "#38A37F",
        border: "#b3efb2",
        text: "#FEFEFE",
        ["blue"]: "#2667ff",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(transparent, transparent,rgba(255,255,255,0.1))",
      },
      screens: {
        ["3xl"]: "1900px",
      },
    },
  },
  plugins: [],
};
