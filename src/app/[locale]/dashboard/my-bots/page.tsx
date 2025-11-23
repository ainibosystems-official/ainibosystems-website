"use client";

import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function MyBotsPage() {
  const { t, lang } = useLanguageContext();

  return (
    <div className="min-h-screen bg-[#07111C] text-white px-6 md:px-10 py-16">
      <h1 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300 drop-shadow-lg">
        {t.myBots.title}
      </h1>
      <p className="text-gray-300 max-w-2xl mb-10">{t.myBots.description}</p>

      <div className="bg-[#0D1828] border border-[#15304D] rounded-2xl p-6 max-w-xl shadow-[0_0_25px_rgba(0,170,255,0.1)] hover:shadow-[0_0_30px_rgba(0,170,255,0.2)] transition-all duration-300">
        <p className="text-gray-400">
          {t.myBots.noBots}{" "}
          <Link
            href={`/${lang}${t.myBots.linkText}`}
            className="text-green-400 font-semibold hover:text-green-300 underline transition-colors duration-200"
          >
            Bots & Prices
          </Link>{" "}
          {t.myBots.linkSuffix}
        </p>
      </div>
    </div>
  );
}
