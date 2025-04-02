import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

// Configure bundle analyzer
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'np'],  // Add other languages here if needed
    defaultLocale: 'en',    // Set your default language
  },
  // Optimize the bundle size by modifying how modules are loaded
  experimental: {
    optimizeCss: true,
  },
  // Module optimization for mapbox-gl to be loaded only on pages that need it
  webpack: (config, { isServer }) => {
    // Only include mapbox-gl on client-side and only when needed
    if (!isServer) {
      config.module.rules.push({
        test: /node_modules\/mapbox-gl/,
        sideEffects: false,
      });
    }
    return config;
  },
  // Custom optimization for third-party libraries
  transpilePackages: ['mapbox-gl'],
};

// Apply the plugins
const withNextIntl = createNextIntlPlugin();

// Export the final configuration with both plugins applied
export default withAnalyzer(withNextIntl(nextConfig));