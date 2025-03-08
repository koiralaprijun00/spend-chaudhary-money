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
      className="px-4 py-2 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-sm md:text-md font-medium rounded-full shadow-sm hover:bg-orange-200 dark:hover:bg-orange-700 hover:shadow-md transition-all duration-300 disabled:opacity-50"
    >
      {currentLocale === 'en' ? 'नेपालीमा' : 'in English'}
      {isPending && (
        <span className="ml-2 inline-block animate-spin">⟳</span>
      )}
    </button>
  );
}