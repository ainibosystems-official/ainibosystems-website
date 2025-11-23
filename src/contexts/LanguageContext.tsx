"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

import enData from "../locales/en.json";
import deData from "../locales/de.json";
import bgData from "../locales/bg.json";

type Lang = "en" | "de" | "bg";
type TranslationType = typeof enData;

const translations: Record<Lang, TranslationType> = {
  en: enData,
  de: deData,
  bg: bgData,
};

type LanguageContextType = {
  lang: Lang;
  t: TranslationType;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [lang, setLang] = useState<Lang | null>(null);
  const [t, setT] = useState<TranslationType | null>(null);
  const [isReady, setIsReady] = useState(false);

  // ✅ Prevent fade from replaying on every click
  const hasAnimated = useRef<boolean>(false);

  // ✅ Load saved language once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("preferredLang") as Lang;
      const cookieLang = document.cookie.match(/preferredLang=(\w+)/)?.[1] as Lang;
      const initialLang = storedLang || cookieLang || "en";

      setLang(initialLang);
      setT(translations[initialLang]);
      setIsReady(true);
    }
  }, []);

  // ✅ Sync translations, cookies, and route when language changes
  useEffect(() => {
    if (!lang) return;

    setT(translations[lang]);
    localStorage.setItem("preferredLang", lang);
    document.cookie = `preferredLang=${lang}; path=/; max-age=2592000`;
    document.documentElement.lang = lang;

    // ✅ Update route path if it doesn't match selected lang (preserve query params)
    if (!pathname.startsWith(`/${lang}`)) {
      const newPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
      const search = typeof window !== "undefined" ? window.location.search : "";
      router.push(`/${lang}${newPath}${search}`);
    }

  }, [lang]);

  if (!isReady || !lang || !t) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#07111C] text-gray-400">
        Loading…
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {hasAnimated.current ? (
        children
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            hasAnimated.current = true;
          }}
        >
          {children}
        </motion.div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguageContext must be used within LanguageProvider");
  return ctx;
}
