'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('Translations');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t('signInToAccount')}
        </h1>
        
        <button 
          onClick={() => signIn('google', { callbackUrl })}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            {/* Google logo SVG */}
          </svg>
          {t('signInWithGoogle')}
        </button>
        
        {/* Add more providers here */}
      </div>
    </div>
  );
}