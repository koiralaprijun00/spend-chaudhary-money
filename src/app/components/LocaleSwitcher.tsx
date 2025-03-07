'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ne' : 'en';
    startTransition(() => {
      router.push(`/${nextLocale}${pathname}`);
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="px-4 py-2 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-sm md:text-md font-medium rounded-full shadow-sm hover:bg-orange-200 dark:hover:bg-orange-700 hover:shadow-md transition-all duration-300 disabled:opacity-50"
    >
      {locale === 'en' ? 'नेपालीमा' : 'in English'}
      {isPending && (
        <span className="ml-2 inline-block animate-spin">⟳</span>
      )}
    </button>
  );
}