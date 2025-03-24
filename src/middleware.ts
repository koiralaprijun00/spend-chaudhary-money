// middleware.js
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'np'],
  defaultLocale: 'en'
});



export default async function middleware(request: NextRequest) {
  // Check if this is an admin route that needs protection
  if (
    request.nextUrl.pathname.includes('/geo-admin') || 
    request.nextUrl.pathname.includes('/api/geo-admin')
  ) {
    // Verify authentication for admin routes
    const token = await getToken({ req: request });
    
    if (!token || token.role !== 'admin') {
      // Redirect to login page, preserving the locale if present
      const locale = request.nextUrl.pathname.split('/')[1];
      const isLocale = ['en', 'np'].includes(locale);
      const loginPath = isLocale ? `/${locale}/login` : '/en/login';
      
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  }

  // Apply internationalization for all routes
  return intlMiddleware(request);
}

// Update the matcher configuration to include API routes that need protection
export const config = {
  matcher: [
    // Internationalization paths (excluding certain paths)
    '/((?!api|_next|.*\\..*).*))',
    // Admin API routes that need protection
    '/api/geo-admin/:path*'
  ]
};