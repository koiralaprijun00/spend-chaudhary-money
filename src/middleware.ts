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
  
  // 1. Bypass all NextAuth API and auth routes (including subpaths)
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  // 2. Bypass static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 3. Protect certain routes (e.g., dashboard, profile)
  const isProtectedRoute = pathname.includes('/dashboard') || pathname.includes('/profile');
  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
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

  // 4. Apply i18n for all other routes
  return intlMiddleware(request);
}

// Matcher: Exclude all NextAuth and static routes, include everything else
export const config = {
  matcher: [
    '/((?!api/auth|auth|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};