'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Extract locale from pathname
  const currentLocale = pathname.startsWith('/np') ? 'np' : 'en';
  
  const switchLocale = () => {
    const nextLocale = currentLocale === 'en' ? 'np' : 'en';
    
    // Get the path without the locale prefix
    let newPathname = pathname;
    if (pathname.startsWith('/en') || pathname.startsWith('/np')) {
      newPathname = pathname.substring(3); // Remove locale prefix
    }
    
    // If pathname is empty after removing locale, use root path
    if (!newPathname) newPathname = '/';
    
    startTransition(() => {
      router.push(`/${nextLocale}${newPathname}`);
    });
  };

  return (
    <button
    onClick={switchLocale}
    disabled={isPending}
    className="gradient-btn px-4 py-2 text-orange-700 dark:text-orange-200 text-sm md:text-md font-medium rounded-lg shadow-sm hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 disabled:opacity-50"
  >
    <span>
      {currentLocale === 'en' ? 'नेपालीमा' : 'in English'}
      {isPending && <span className="ml-2 inline-block animate-spin">⟳</span>}
    </span>
  </button>
  );
}