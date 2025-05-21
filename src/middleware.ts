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
  
  // 1. Bypass NextAuth API routes only
  if (pathname.startsWith('/api/auth')) {
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

  // 3. Handle auth routes with internationalization
  if (pathname.startsWith('/auth')) {
    // Extract locale from the current path (defaults to 'en')
    const locale = pathname.match(/^\/(en|np)\//) ? pathname.split('/')[1] : 'en';
    
    // If accessing /auth directly, redirect to localized version
    if (pathname === '/auth') {
      return NextResponse.redirect(new URL(`/${locale}/auth/signin`, request.url));
    }
    
    // If accessing /auth/register or /auth/signin without locale, redirect to localized version
    if (pathname === '/auth/register' || pathname === '/auth/signin') {
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
  }

  // 4. Protect certain routes (e.g., dashboard, profile)
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

  // 5. Apply i18n for all other routes
  return intlMiddleware(request);
}

// Matcher: Include all routes except NextAuth API and static files
export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};