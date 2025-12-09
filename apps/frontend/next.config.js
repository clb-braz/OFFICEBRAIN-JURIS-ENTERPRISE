/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Para Docker
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:3001/api';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  images: {
    domains: ['localhost', 'backend'],
  },
};

module.exports = nextConfig;

