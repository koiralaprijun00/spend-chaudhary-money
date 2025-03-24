// middleware.js
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'np'],
  defaultLocale: 'en'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // If trying to access /login directly (without locale)
  if (pathname === '/login') {
    // Redirect to the localized login page
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  
  // Check if this is an admin route that needs protection
  if (
    pathname.includes('/geo-admin') || 
    pathname.includes('/api/geo-admin')
  ) {
    // Verify authentication for admin routes
    // This can be done in the API route and page components as well
    // We'll just pass through here
  }

  // Apply internationalization for all routes
  return intlMiddleware(request);
}

// Update the matcher configuration
export const config = {
  matcher: [
    // Match all paths that need locale
    '/((?!api|_next|.*\\..*).*)',
    // Match login path specifically
    '/login',
    // Admin API routes that need protection
    '/api/geo-admin/:path*'
  ]
};