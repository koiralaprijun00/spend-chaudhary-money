'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto',
  style = { display: 'block' },
  className = ''
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (adRef.current && !isLoaded.current) {
      try {
        // Clear any existing ads in this slot
        if (adRef.current.firstChild) {
          adRef.current.innerHTML = '';
        }

        // Create new ins element
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', 'ca-pub-4708248697764153');
        adElement.setAttribute('data-ad-slot', adSlot);
        adElement.setAttribute('data-ad-format', adFormat);
        adElement.setAttribute('data-full-width-responsive', 'true');
        
        // Append to container
        adRef.current.appendChild(adElement);
        
        // Push to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }

    // Cleanup function
    return () => {
      isLoaded.current = false;
    };
  }, [adSlot, adFormat]);

  return <div ref={adRef} className={className} style={style}></div>;
}

// Add this to global.d.ts
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}