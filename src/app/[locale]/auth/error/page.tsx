'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const t = useTranslations('Translations');
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return t('authErrorConfiguration');
      case 'AccessDenied':
        return t('authErrorAccessDenied');
      case 'Verification':
        return t('authErrorVerification');
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return t('authErrorOAuth');
      case 'OAuthAccountNotLinked':
        return t('authErrorAccountNotLinked');
      case 'EmailSignin':
        return t('authErrorEmailSignin');
      case 'CredentialsSignin':
        return t('authErrorCredentials');
      case 'SessionRequired':
        return t('authErrorSessionRequired');
      default:
        return t('authErrorDefault');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
          {t('authenticationError')}
        </h1>
        
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {getErrorMessage(error)}
        </div>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="inline-block px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {t('backToSignIn')}
          </Link>
        </div>
      </div>
    </div>
  );
} 