/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export', // enables static export
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig; // <-- use module.exports instead of export default
