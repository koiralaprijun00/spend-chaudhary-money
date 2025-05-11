'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import  GameButton  from '../ui/GameButton'; // Use your own Button component

export function SignInButton() {
  const { data: session, status } = useSession();
  const t = useTranslations('Translations');
  const pathname = usePathname();
  
  // Get locale from pathname
  const locale = pathname.startsWith('/np') ? 'np' : 'en';
  
  if (status === 'authenticated') {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">{session.user?.name}</span>
        <GameButton 
          onClick={() => signOut({ 
            callbackUrl: `/${locale}` // Ensure redirect respects locale
          })}
        >
          {t('signOut')}
        </GameButton>
      </div>
    );
  }
  
  return (
    <GameButton 
      onClick={() => signIn('google', { 
        callbackUrl: pathname // Return to current page after login
      })}
    >
      {t('signIn')}
    </GameButton>
  );
}