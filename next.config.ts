import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Your other Next.js configuration options...
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);