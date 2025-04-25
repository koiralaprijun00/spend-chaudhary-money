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
    // Don't rerun if already initialized
    if (adInitialized) return;
    
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Ensure the container exists
    if (!adRef.current) return;
    
    // Check if window.adsbygoogle is available (will be defined by the script in layout.tsx)
    const initAd = () => {
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
          
          // Initialize ad - use a delay to ensure DOM is settled
          setTimeout(() => {
            try {
              if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdInitialized(true);
              } else {
                console.warn('AdSense not loaded yet, will retry');
                // Retry after a short delay
                setTimeout(initAd, 1000);
              }
            } catch (e) {
              console.error('AdSense push error:', e);
            }
          }, 100);
        }
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    };

    // Use IntersectionObserver to initialize ads when they become visible
    // This improves performance and ad viewability
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !adInitialized) {
            // Wait a bit to ensure the element is properly visible
            setTimeout(initAd, 300);
            // Stop observing once we've initialized
            observer.disconnect();
          }
        },
        { threshold: 0.1 } // Initialize when at least 10% is visible
      );

      if (adRef.current) {
        observer.observe(adRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      // Fallback if IntersectionObserver is not available
      console.warn('IntersectionObserver not available, falling back to immediate init');
      setTimeout(initAd, 300);
    }
  }, [adSlot, adWidth, adHeight, adFormat, adInitialized]);

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
      data-ad-status={adInitialized ? "filled" : "waiting"}
    />
  );
}

// Type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}