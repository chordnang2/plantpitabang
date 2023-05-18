/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mha.co.id"],
  },
};

module.exports = nextConfig;

