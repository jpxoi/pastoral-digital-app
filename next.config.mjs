/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'static.jpxoi.com',
            port: '',
            pathname: '/media/**',
          },
        ],
      },
};

export default nextConfig;
