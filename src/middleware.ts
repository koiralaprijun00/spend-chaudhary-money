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
  
  // Skip middleware for all API routes
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_next/') ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if the path is for a protected route
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/profile');
  
  // Protected routes need authentication
  if (isProtectedRoute) {
    const token = await getToken({ req: request });
    
    if (!token) {
      // Use URL to preserve locale when redirecting to sign-in
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }
  }

  // Apply internationalization for all routes
  return intlMiddleware(request);
}

// Update the matcher configuration
export const config = {
  matcher: [
    // Match all paths except specific ones
    '/((?!_next|api|.*\\..*).*)',
  ],
};