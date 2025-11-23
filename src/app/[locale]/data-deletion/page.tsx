"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";

export default function DataDeletion() {
  const { t } = useLanguageContext();

  return (
    <main className="min-h-screen bg-[#0B1725] text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{t.dataDeletion.title}</h1>
      <p className="max-w-2xl text-white/80 leading-relaxed">
        {t.dataDeletion.description}{" "}
        <a
          href="mailto:contact@ainibosystems.com"
          className="text-[#30C493] hover:underline"
        >
          contact@ainibosystems.com
        </a>
        .<br />
        {t.dataDeletion.timeline}
      </p>
    </main>
  );
}
