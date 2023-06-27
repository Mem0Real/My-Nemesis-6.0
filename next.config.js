/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
};

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require("@next/bundle-analyzer")(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
