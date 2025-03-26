'use client'

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import LocaleSwitcher from "./LocaleSwitcher"
import { useTranslations } from 'next-intl';
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"

const Navbar = () => {
    const t = useTranslations('Translations');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        if (!isMenuOpen) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isMenuOpen]);

    // Focus management for mobile menu
    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const firstFocusableElement = menuRef.current.querySelector('a');
            if (firstFocusableElement) {
                (firstFocusableElement as HTMLElement).focus();
            }
        }
    }, [isMenuOpen]);

    // Link classes for both desktop and mobile
    const linkClasses = "text-gray-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";

    const navLinks = [
        { href: "/spend", label: t('spendBinodTitle') },
        { href: "/guess-festival", label: t('games.guessFestival.title') },
        { href: "/kings-of-nepal", label: t('kingsOfNepal.title') },
        { href: "/name-districts", label: t('nameDistrictTitle') },
        { href: "/life-checklist", label: t('nepalChecklist.navbarTitle') },
        { href: "/general-knowledge", label: t('nepalGk.titleshort') || 'Nepal GK Quiz' },
        { href: "/patta-lagau", label: t('pattalagauTitle') || 'Patta Lagau'}
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto md:px-0 px-4 py-2">
                {/* Top Row: Logo, Brand Name, Locale Switcher, Twitter Link (all screens) */}
                <div className="flex items-center justify-between">
                    {/* Left: Logo and Brand Name */}
                    <Link href="/" className="flex items-center group">
                        <Image 
                            src="/images/momo.png" 
                            alt="" 
                            width={40} 
                            height={40} 
                            className="mr-2 transform group-hover:scale-110 transition-transform duration-200" 
                            priority
                        />
                        <span className="text-gray-800 text-xl font-bold group-hover:text-orange-500 transition-colors duration-200">
                            {t('piromomo')}
                        </span>
                    </Link>

                    {/* Right: Locale Switcher, Twitter Link, and Hamburger (Hamburger only on mobile) */}
                    <div className="flex items-center space-x-4">
                        <LocaleSwitcher aria-label={t('switchLanguage') || 'Switch language'} />
                        <Link 
                            href="https://x.com/kastopiromomo" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="text-xl" />
                        </Link>
                        <Link 
                            href="https://www.instagram.com/kastopiromomo/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-xl" />
                        </Link>

                        {/* Hamburger menu button - visible only on mobile */}
                        <button 
                            ref={buttonRef}
                            className="md:hidden text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-1"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center justify-start space-x-1 mt-3 xl:mt-2 xl:justify-start">
                    {navLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.href} 
                            className={linkClasses}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile menu - visible only when hamburger is clicked */}
                <div 
                    id="mobile-menu"
                    ref={menuRef}
                    className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 transform transition-all duration-200 ${
                        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                >
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link, index) => (
                                <Link 
                                    key={index}
                                    href={link.href} 
                                    className={linkClasses}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar