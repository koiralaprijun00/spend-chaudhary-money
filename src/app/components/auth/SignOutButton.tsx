'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  const t = useTranslations('Translations');

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
    >
      <LogOut className="w-4 h-4" />
      {t('signOut')}
    </button>
  );
} 