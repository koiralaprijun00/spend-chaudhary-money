'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Translations');
  
  // Extract locale from pathname
  const locale = pathname.startsWith('/np') ? 'np' : 'en';
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname, locale]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t('unauthorized')}</h1>
          <p className="mt-2">{t('signingIn')}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}