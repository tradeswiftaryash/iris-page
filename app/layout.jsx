import "./globals.css";

export const metadata = {
  title: "Tradeswift",
  description: "Tradeswift — IRIS",
};

// This root layout exists only so this repo can build/run standalone
// for preview. When integrating into the existing tradeswift.net
// Next.js app, delete this file and merge `app/globals.css`'s brand
// tokens into your existing global stylesheet / tailwind config instead,
// keeping your app's real <html>/<body>/root layout.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>


  );
}
