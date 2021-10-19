module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#41758a',
      secondary: '#fe9a3d'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
