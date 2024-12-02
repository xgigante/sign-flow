/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-600": "#0A0AF4",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".table-header": {
          "@apply py-2 px-4 border-b text-center font-normal sm:text-sm text-xs":
            {},
        },
        ".table-cell": {
          "@apply py-2 px-4 border-b text-center sm:text-sm text-xs": {},
        },
      });
    },
  ],
};
