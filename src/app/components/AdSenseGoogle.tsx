'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseGoogle({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adInitialized, setAdInitialized] = useState(false);

  // Set up standard ad sizes based on format
  let adWidth = '100%';
  let adHeight = '100%';

  // Set standard sizes based on format
  switch (adFormat) {
    case 'horizontal':
      adWidth = '728px';
      adHeight = '90px';
      break;
    case 'vertical':
      adWidth = '160px';
      adHeight = '600px';
      break;
    case 'rectangle':
      adWidth = '300px';
      adHeight = '250px';
      break;
    // auto will use responsive sizing
  }

  // Override with any custom sizes
  if (style.width) adWidth = typeof style.width === 'string' ? style.width : `${style.width}px`;
  if (style.height) adHeight = typeof style.height === 'string' ? style.height : `${style.height}px`;

  // Initialize the ad
  useEffect(() => {
    if (adInitialized || typeof window === 'undefined' || !adRef.current) return;

    const initAd = () => {
      try {
        // Clear any existing content
        adRef.current!.innerHTML = '';
        
        // Create ad element
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.style.width = adWidth;
        adElement.style.height = adHeight;
        
        // Set attributes without data-nscript
        adElement.setAttribute('data-ad-client', 'ca-pub-4708248697764153');
        adElement.setAttribute('data-ad-slot', adSlot);
        
        if (adFormat === 'auto') {
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
        } else {
          adElement.setAttribute('data-full-width-responsive', 'false');
        }
        
        // Append to container
        adRef.current!.appendChild(adElement);
        
        // Initialize ad
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdInitialized(true);
        }
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    };

    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !adInitialized) {
          initAd();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [adSlot, adWidth, adHeight, adFormat, adInitialized]);

  return (
    <div
      ref={adRef}
      className={`adsense-container ${className}`}
      style={{
        display: 'block',
        width: adWidth,
        height: adHeight,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}

// Type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}