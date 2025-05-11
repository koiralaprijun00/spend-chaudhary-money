// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'np'],
  defaultLocale: 'en'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for all API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Apply internationalization for all non-API routes
  return intlMiddleware(request);
}

// Update the matcher configuration
export const config = {
  matcher: [
    // Match all paths that need locale
    '/((?!api|_next|.*\\..*).*)'
  ]
};