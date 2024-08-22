/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          500: "#6b7280", // Ensure this matches the color you want
        },
      },
    },
  },
  plugins: [],
};
