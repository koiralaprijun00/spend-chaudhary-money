"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function AdSense() {
  useEffect(() => {
    // Push adsbygoogle only after component mounts on client
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4708248697764153"
        data-ad-slot="1820052970"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}