"use client";

import { useEffect } from "react";

const GA_ID = "G-XXXXXXXXXX"; // Replace with your real Google Analytics ID
// Declare global window properties so TypeScript stops complaining
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}


export default function AnalyticsLoader() {
  useEffect(() => {
    const loadGA = () => {
      // Avoid loading GA twice
      if (document.getElementById("ga-script")) return;

      // Inject script
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };

      // Configure Google Analytics
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
    };
    // Listen for consent changes
    const onConsentChange = (e: any) => {
      if (e.detail === "accepted") loadGA();
    };

    window.addEventListener("cookie-consent-changed", onConsentChange);
    return () => window.removeEventListener("cookie-consent-changed", onConsentChange);
  }, []);

  return null;
}
