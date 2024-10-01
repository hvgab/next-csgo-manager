/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //     serverActions: true,
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daisyui.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "placecats.com",
      },
    ],
  },
  pageExtensions: ["page.tsx", "tsx"],
};

module.exports = nextConfig;
