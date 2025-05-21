'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GameButton from '../ui/GameButton';
import AuthAlert, { AlertType } from '../AuthAlert';
import { UserCircle2, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

export function SignInButton() {
  const { data: session, status } = useSession();
  const t = useTranslations('Translations');
  const pathname = usePathname();
  const router = useRouter();
  
  // Alert state
  const [alert, setAlert] = useState<{type: AlertType, message: string}>({
    type: null,
    message: ''
  });
  
  // Track previous status to detect changes
  const [prevStatus, setPrevStatus] = useState<string | null>(null);
  
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Get locale from pathname
  const locale = pathname.startsWith('/np') ? 'np' : 'en';
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && 
          !(event.target as Element).closest('.profile-dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);
  
  // Handle status changes to show appropriate alerts
  useEffect(() => {
    // Only show alert when status changes from unauthenticated to authenticated
    if (prevStatus === 'unauthenticated' && status === 'authenticated') {
      setAlert({
        type: 'success',
        message: t('loginSuccess') || 'Successfully logged in!'
      });
    } else if (prevStatus === 'authenticated' && status === 'unauthenticated') {
      setAlert({
        type: 'info',
        message: t('logoutSuccess') || 'Successfully logged out'
      });
    }
    
    setPrevStatus(status);
  }, [status, prevStatus, t]);
  
  // Clear alert
  const clearAlert = () => {
    setAlert({ type: null, message: '' });
  };
  
  // Handle logging out
  const handleSignOut = () => {
    setDropdownOpen(false);
    signOut({ 
      callbackUrl: `/${locale}` // Ensure redirect respects locale
    });
  };
  
  if (status === 'loading') {
    return (
      <div className="w-24 h-9 bg-gray-100 animate-pulse rounded-md"></div>
    );
  }
  
  if (status === 'authenticated') {
    return (
      <>
        {alert.type && (
          <AuthAlert
            type={alert.type}
            message={alert.message}
            onClose={clearAlert}
          />
        )}
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'User avatar'} 
                width={24} 
                height={24} 
                className="rounded-full"
              />
            ) : (
              <UserCircle2 className="w-6 h-6 text-gray-500" />
            )}
            <span className="hidden md:inline text-sm text-gray-600">
              {session.user?.name?.split(' ')[0]}
            </span>
          </button>
        </div>
      </>
    );
  }
  
  // Handle sign in
  const handleSignIn = async () => {
    try {
      await router.push(`/${locale}/auth/signin`);
    } catch (error) {
      setAlert({
        type: 'error',
        message: t('loginFailed') || 'Login failed. Please try again.'
      });
    }
  };
  
  return (
    <>
      {alert.type && (
        <AuthAlert
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}
      
      <GameButton type="text"  onClick={handleSignIn}>
        {t('signIn')}
      </GameButton>
    </>
  );
}