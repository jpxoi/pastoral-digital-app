import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dynamicStartUrl: false,
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
            hostname: 'static.jpxoi.com',
            port: '',
            pathname: '/media/**',
          },
          {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
};

export default withPWA(nextConfig);