'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import LocaleSwitcher from "./LocaleSwitcher"
import { useTranslations } from 'next-intl';
import { FaTwitter } from "react-icons/fa"

const Navbar = () => {
    const t = useTranslations('Translations');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm mb-4">
            <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
                {/* Left side: Logo and brand name */}
                <Link href="/" className="flex items-center">
                    <Image src="/images/momo.png" alt="Piro Momo Logo" width={40} height={40} className="mr-2" />
                    <span className="text-gray-800 dark:text-white text-xl font-bold">{t('piromomo')}</span>
                </Link>

                {/* Center: Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-4 mx-4">
                    <Link href="/spend" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('spendBinodTitle')}
                    </Link>
                    <Link href="/guess-festival" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('games.guessFestival.title')}
                    </Link>
                    <Link href="/kings-of-nepal" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('kingsOfNepal.title')}
                    </Link>
                    <Link href="/name-districts" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('nameDistrictTitle')}
                    </Link>
                    <Link href="/life-checklist" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('nepalChecklist.navbarTitle')}
                    </Link>
                    <Link href="/general-knowledge" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {t('nepalGk.titleshort') || 'Nepal GK Quiz'}
                    </Link>
                </div>

                {/* Right side: Language switcher, Twitter Icon, and hamburger */}
                <div className="flex items-center space-x-4">
                    <LocaleSwitcher />
                    <Link href="https://x.com/kastopiromomo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <FaTwitter className="text-2xl" />
                    </Link>
                    
                    {/* Hamburger menu button - visible only on mobile */}
                    <button 
                        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-orange-500 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                
                {/* Mobile menu - visible only when hamburger is clicked */}
                {isMenuOpen && (
                    <div className="md:hidden w-full mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                href="/spend" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('spendBinodTitle')}
                            </Link>
                            <Link 
                                href="/guess-festival" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('games.guessFestival.title')}
                            </Link>
                            <Link 
                                href="/kings-of-nepal" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('kingsOfNepal.title')}
                            </Link>
                            <Link 
                                href="/name-districts" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nameDistrictTitle')}
                            </Link>
                            <Link 
                                href="/life-checklist" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nepalChecklist.navbarTitle')}
                            </Link>
                            <Link 
                                href="/nepal-gk" 
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nepalGk.title') || 'Nepal GK Quiz'}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar