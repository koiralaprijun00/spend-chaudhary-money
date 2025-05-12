import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'np'],
  defaultLocale: 'en',
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Important: Special handling for NextAuth.js routes
  // These routes should NOT have locale prefixes, so we skip intlMiddleware for them
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Skip middleware for static files and non-auth API routes
  if (pathname.startsWith('/_next/') ||
      (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if the path is for a protected route
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/profile');
  
  // Protected routes need authentication
  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET // Add the secret for JWT validation
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

// Update the matcher configuration to explicitly handle auth routes
export const config = {
  matcher: [
    // Match all paths except specific ones
    // Important: We need to explicitly include /api/auth routes so middleware runs for them
    '/((?!_next|.*\\..*).)*',
    '/api/auth/:path*' 
  ],
};