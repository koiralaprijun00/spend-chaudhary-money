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
    // Only show alert when status changes and not on initial load
    if (prevStatus && prevStatus !== status) {
      if (status === 'authenticated') {
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
        
        <div className="flex items-center gap-2 profile-dropdown-container">
          <div className="hidden md:flex items-center">
            <span className="text-sm text-gray-600 mr-2">
              {session.user?.name?.split(' ')[0]}
            </span>
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500 border-2 border-orange-100 hover:border-orange-300 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || 'User avatar'} 
                  width={36} 
                  height={36} 
                  className="rounded-full"
                />
              ) : (
                <UserCircle2 className="w-6 h-6 text-gray-500" />
              )}
            </button>
            
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user?.email}
                  </p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push(`/${locale}/dashboard`);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    {t('dashboard') || 'Dashboard'}
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('signOut')}
                  </button>
                </div>
              </div>
            )}
          </div>
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
      
      <GameButton onClick={handleSignIn}>
        {t('signIn')}
      </GameButton>
    </>
  );
}