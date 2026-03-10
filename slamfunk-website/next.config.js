// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  ignoreBuildErrors: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/i/teamlogos/ncaa/**',
      },
    ],
  },
};

module.exports = nextConfig;
