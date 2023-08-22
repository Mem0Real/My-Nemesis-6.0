/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

export default withPlaiceholder(nextConfig);
