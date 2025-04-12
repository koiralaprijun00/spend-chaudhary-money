import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'www.piromomo.com'],
    },
    async rewrites() {
        return [
            {
                source: '/districts/:path*',
                destination: 'https://www.piromomo.com/districts/:path*',
            },
        ];
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);