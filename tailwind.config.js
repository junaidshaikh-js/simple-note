module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(245, 53%, 53%)",
        primaryDark: "hsl(245, 53%, 33%)",
      },
      spacing: {
        90: "90vh",
      },
    },
    backgroundColor: {
      grey: "hsl(210, 23%, 95%)",
      hoverClr: "#28292c11",
      primary: "hsl(245, 53%, 53%)",
      primaryDark: "hsl(245, 53%, 33%)",
    },
    minHeight: {
      60: "60vh",
      70: "70vh",
    },
  },
  plugins: [],
};
