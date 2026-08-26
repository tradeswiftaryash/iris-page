/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tradeswift brand tokens — pulled from the Figma file (node 19:54 / 19:43)
        // and cross-checked against the existing PMS page screenshot.
        brand: {
          blue: "#1E45E0", // primary navy-blue (banners, header, footer)
          blueDark: "#152F9C", // hover / darker blue
          red: "#B00000", // primary CTA red (buttons, banners, headers)
          redDark: "#B00000", // hover red
          ink: "#141B2D", // body copy on light backgrounds
          slate: "#5B6472", // secondary/muted text
          line: "#E4E7EE", // hairline borders
          surface: "#F6F8FC", // light section background
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 10px 0 rgba(20, 27, 45, 0.06)",
        cardHover: "0 12px 28px 0 rgba(20, 27, 45, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
