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
  const [isClientSide, setIsClientSide] = useState(false);

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

  // This effect runs once on client-side render to indicate we're in the browser
  useEffect(() => {
    setIsClientSide(true);
  }, []);

  // Initialize the ad when on client side
  useEffect(() => {
    // Only run this on the client side
    if (!isClientSide || !adRef.current) return;

    // Ensure the AdSense script is loaded
    const loadAdSenseScript = () => {
      // Check if script is already added
      if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        initializeAd();
        return;
      }

      // Add the script if not present
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.adClient = 'ca-pub-4708248697764153';
      
      script.onload = initializeAd;
      script.onerror = () => console.error('AdSense script failed to load');
      
      document.head.appendChild(script);
    };

    // Initialize the ad
    const initializeAd = () => {
      try {
        // Clear any existing content
        if (adRef.current) {
          adRef.current.innerHTML = '';
          
          // Create ad element with explicit sizing
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.style.width = adWidth;
          adElement.style.height = adHeight;
          
          // Set attributes
          adElement.setAttribute('data-ad-client', 'ca-pub-4708248697764153');
          adElement.setAttribute('data-ad-slot', adSlot);
          
          // Only set responsive if using auto format
          if (adFormat === 'auto') {
            adElement.setAttribute('data-ad-format', 'auto');
            adElement.setAttribute('data-full-width-responsive', 'true');
          } else {
            // Fixed size ad
            adElement.setAttribute('data-full-width-responsive', 'false');
          }
          
          // Append to container
          adRef.current.appendChild(adElement);
          
          // Initialize with a slight delay to ensure DOM is ready
          setTimeout(() => {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
              console.error('AdSense push error:', e);
            }
          }, 100);
        }
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    };

    // Start the loading process with a small delay to ensure component is properly mounted
    const timer = setTimeout(loadAdSenseScript, 50);
    return () => clearTimeout(timer);
  }, [isClientSide, adSlot, adWidth, adHeight, adFormat]);

  // Create container style with explicit dimensions
  const containerStyle: React.CSSProperties = {
    display: 'block',
    width: adWidth,
    height: adHeight,
    overflow: 'hidden',
    ...style,
  };

  return (
    <div
      ref={adRef}
      className={`adsense-container ${className}`}
      style={containerStyle}
      data-ad-status="not-loaded"
    />
  );
}

// Type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}