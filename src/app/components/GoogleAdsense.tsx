'use client';

import { useEffect } from 'react';

export default function GoogleAdsense({ 
  adSlot = '1820052970',
  adFormat = 'auto',
  fullWidthResponsive = true 
}) {
  useEffect(() => {
    try {
      // Push the ad only when component mounts on the client
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="ad-container my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4708248697764153"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}