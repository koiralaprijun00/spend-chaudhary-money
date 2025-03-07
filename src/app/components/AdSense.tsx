// components/AdSense.jsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function AdSense() {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Push AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        // Optional: Add event listener to ensure new tab behavior
        const ensureNewTab = () => {
          if (adRef.current) {
            const links = (adRef.current as HTMLElement).getElementsByTagName("a");
            for (let link of links) {
              link.setAttribute("target", "_blank");
              link.setAttribute("rel", "noopener noreferrer"); // Security best practice
            }
          }
        };

        // Wait for ads to load and modify links
        const observer = new MutationObserver((mutations) => {
          ensureNewTab();
        });

        if (adRef.current) {
          observer.observe(adRef.current, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div ref={adRef}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onError={(e) => console.error("AdSense script failed to load", e)}
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4708248697764153"
        data-ad-slot="1820052970"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}