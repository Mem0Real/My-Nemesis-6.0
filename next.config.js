/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
