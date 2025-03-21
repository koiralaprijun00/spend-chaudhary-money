// middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'np'],
  
  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};