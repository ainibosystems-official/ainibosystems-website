"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export default function CookiePolicyPage() {
  const { t, lang } = useLanguageContext();

  useEffect(() => {
    if (window.Cookiebot && typeof window.Cookiebot.renew === "function") {
      window.Cookiebot.renew();
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 text-gray-200 leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent">
        {t.legal.cookiesTitle}
      </h1>

      <p className="mb-6 text-gray-300">{t.cookies.policyIntro}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          {t.legal.cookiesSection1Title}
        </h2>
        <p>{t.legal.cookiesSection1Text}</p>

        <h2 className="text-2xl font-semibold text-white mt-8">
          {t.legal.cookiesSection2Title}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>{t.legal.cookiesEssential}</li>
          <li>{t.legal.cookiesAnalytics}</li>
          <li>{t.legal.cookiesFunctional}</li>
          <li>{t.legal.cookiesMarketing}</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-8">
          {t.legal.cookiesSection3Title}
        </h2>
        <p>{t.legal.cookiesSection3Text}</p>
      </section>

      {/* ✅ Official Cookiebot Declaration */}
      <div className="mt-12">
        <script
          id="CookieDeclaration"
          src="https://consent.cookiebot.com/ff3af146-1d84-484c-a9f6-d075741e2623/cd.js"
          type="text/javascript"
          async
        ></script>
      </div>
    </div>
  );
}
