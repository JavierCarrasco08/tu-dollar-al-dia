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
        ["red"]: "#ef233c",
        ["blue"]: "#2667ff",
        ["yellow"]: "#ffc15e",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(transparent, transparent,rgba(255,255,255,0.1))",
      },
    },
  },
  plugins: [],
};
