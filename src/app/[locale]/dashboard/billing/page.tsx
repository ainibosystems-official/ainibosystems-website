"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";

export default function BillingPage() {
  const { t } = useLanguageContext();

  return (
    <div className="min-h-screen bg-[#07111C] text-white px-6 md:px-10 py-16">
      <h1 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300 drop-shadow-lg">
        {t.billing.title}
      </h1>
      <p className="text-gray-300 max-w-2xl mb-10">{t.billing.description}</p>

      <div className="bg-[#0D1828] border border-[#15304D] rounded-2xl p-6 max-w-xl shadow-[0_0_25px_rgba(0,255,170,0.1)] hover:shadow-[0_0_30px_rgba(0,255,170,0.2)] transition-all duration-300">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">
          {t.billing.currentPlan}
        </h3>
        <p className="text-2xl font-bold text-green-400">{t.billing.freeTier}</p>
        <p className="text-gray-400 text-sm mt-3">{t.billing.upgradeMessage}</p>
      </div>
    </div>
  );
}
