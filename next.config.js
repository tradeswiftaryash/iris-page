/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "182.71.18.22",
    "182.71.18.22:5999",
    "0.0.0.0",
    "0.0.0.0:5999",
    "localhost",
    "localhost:5999",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
