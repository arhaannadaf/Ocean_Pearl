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

export default nextConfig; // ✅ ES module export
