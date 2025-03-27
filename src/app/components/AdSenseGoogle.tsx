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
  const [isReady, setIsReady] = useState(false);

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

  // Wait for component to mount and be visible
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // First check if container is ready
    const checkContainer = () => {
      if (!adRef.current) return false;
      
      // Get computed style to check visibility
      const style = window.getComputedStyle(adRef.current);
      const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
      
      // Check if element has width
      const width = adRef.current.offsetWidth;
      
      return isVisible && width > 0;
    };

    if (checkContainer()) {
      setIsReady(true);
    } else {
      // If not ready, check again after a short delay
      const timer = setTimeout(() => {
        if (checkContainer()) {
          setIsReady(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Once container is ready, initialize the ad
  useEffect(() => {
    if (!isReady || !adRef.current) return;

    try {
      // Clear any existing content
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
      
      // Push to AdSense with a delay to ensure rendering is complete
      const timer = setTimeout(() => {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [isReady, adSlot, adWidth, adHeight, adFormat]);

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
    />
  );
}

// Type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}