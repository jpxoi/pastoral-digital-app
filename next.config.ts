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
  turbopack: {}
  // custom config here
};

export default withPWA(nextConfig);