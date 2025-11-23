"use client";

import { useState, useEffect } from "react";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import bg from "@/locales/bg.json";

type Lang = "en" | "de" | "bg";
const translations = { en, de, bg } as const;

export function useTranslation() {
  // 🔹 1. Load from cookie if available
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )preferredLang=([^;]+)/);
      if (match && ["en", "de", "bg"].includes(match[1])) {
        return match[1] as Lang;
      }
    }
    return "en";
  });

  // 🔹 2. Keep current translation data
  const [t, setT] = useState(translations[lang]);

  // 🔹 3. Update text when lang changes
  useEffect(() => {
    setT(translations[lang]);
    document.cookie = `preferredLang=${lang}; path=/; max-age=2592000`;
  }, [lang]);

  return { t, lang, setLang };
}
