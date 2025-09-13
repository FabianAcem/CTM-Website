/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ctm: {
          black: "#000000",
          yellow: "#FFD700",
          road: "#2e2e2e",
        },
      },
    },
  },
  plugins: [],
};
export default {
  prefix: 'tw-',         // alle Klassen mit tw-
  corePlugins: { preflight: false },
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
