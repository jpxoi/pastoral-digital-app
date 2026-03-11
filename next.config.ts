import type { NextConfig } from 'next'
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
  dest: "public",
  fallbacks: {
    document: "/fallback",
  },
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  turbopack: {
    // ...
  },
skipTrailingSlashRedirect: true,
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
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fymwpl3ap9.ufs.sh',
        port: '',
        pathname: '/f/**',
      }
    ],
  },
};

export default withPWA(nextConfig);