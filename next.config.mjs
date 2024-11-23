import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontendNav: false,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/fallback",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.jpxoi.com',
            port: '',
            pathname: '/media/**',
          },
          {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ucarecdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.gravatar.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
};

export default withPWA(nextConfig);