const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/editor': { page: '/editor' },
  }),
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
