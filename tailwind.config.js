/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        primary: "url('/images/commons/background-primary.png')",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      screens: { desktop: { min: "1536px", max: "1920px" } },
      maxWidth: {
        desktop: "1920px",
      },
      colors: {
        "primary-dark": "#171717",
        "primary-red": "#F32845",
        "primary-red-dark": "#D32A3D",
      },
    },
  },
  plugins: [],
};
