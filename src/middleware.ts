import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'np'],
  defaultLocale: 'en',
  localePrefix: 'always', // Explicitly mark this as always applying locale prefix
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for NextAuth.js API routes
  // Important: Always let NextAuth handle its own routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Also bypass internationalization for NextAuth callback routes
  if (pathname === '/auth/signin' || 
      pathname === '/auth/error' || 
      pathname === '/auth/callback' ||
      pathname === '/auth/verify-request') {
    return NextResponse.next();
  }
  
  // Skip middleware for static files and non-auth API routes
  if (pathname.startsWith('/_next/') ||
      (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if the path is for a protected route
  const isProtectedRoute = pathname.includes('/dashboard') || 
                           pathname.includes('/profile');
  
  // Protected routes need authentication
  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    if (!token) {
      // Extract locale from the current path (defaults to 'en')
      const locale = pathname.match(/^\/(en|np)\//) ? pathname.split('/')[1] : 'en';
      
      // Create sign-in URL with proper locale prefix
      const url = new URL(`/${locale}/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }
  }

  // Apply internationalization for all other routes
  return intlMiddleware(request);
}

// Update the matcher configuration to handle auth routes correctly
export const config = {
  matcher: [
    // Match all paths except specific ones
    '/((?!api|_next|.*\\..*).*)',
    // We want to explicitly match auth routes
    '/auth/:path*'
  ],
};