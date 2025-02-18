import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

function AdComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle block';
      ins.dataset.adFormat = 'fluid';
      ins.dataset.adLayoutKey = '-fb+5w+4e-db+86';
      ins.dataset.adClient = 'ca-pub-4708248697764153';
      ins.dataset.adSlot = '1642775800';
      document.getElementById('ads-container')?.appendChild(ins); // Use a container

      (window.adsbygoogle = window.adsbygoogle || []).push({});

      return () => { // Cleanup: Remove the script when the component unmounts
        document.head.removeChild(script);
      };
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  return (
    <div>
      {/* ... other content ... */}
      <div id="ads-container"></div> {/* Container for the ad */}
      {/* ... more content ... */}
    </div>
  );
}

export default AdComponent;