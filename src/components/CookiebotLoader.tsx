"use client";
import { useEffect } from "react";

export default function CookiebotLoader({ locale }: { locale: string }) {
  useEffect(() => {
    const existing = document.getElementById("Cookiebot");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "Cookiebot";
    script.src = "https://consent.cookiebot.com/uc.js";
    script.dataset.cbid = "ff3af146-1d84-484c-a9f6-d075741e2623"; // ✅ Your real ID
    script.dataset.blockingmode = "auto"; // you selected Auto
    script.dataset.culture = locale; // auto-language support for EN/DE/BG
    script.type = "text/javascript";
    document.head.appendChild(script);
  }, [locale]);

  return null;
}
