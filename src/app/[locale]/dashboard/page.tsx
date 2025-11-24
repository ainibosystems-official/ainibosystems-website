"use client";

import { useSession } from "@/contexts/SessionProvider";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { user } = useSession();
  const { t } = useLanguageContext();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#07111C]">
        <p>{t.dashboard.loading || "Loading your dashboard..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111C] text-white px-6 md:px-10 py-12">
      <div className="flex flex-col items-start md:items-start w-full max-w-[1000px] md:pl-0 lg:pl-0">
        {/* Header */}
        <div className="max-w-3xl mt-8 md:mt-0 mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300 drop-shadow-lg">
            {t.dashboard.welcome}
          </h1>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {t.dashboard.intro}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-[#0D1828] border border-[#15304D] rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,170,0.1)] hover:shadow-[0_0_30px_rgba(0,255,170,0.2)] transition-all duration-300">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">{t.dashboard.activeBots}</h3>
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-2">{t.dashboard.activeBotsDesc}</p>
          </div>

          <div className="bg-[#0D1828] border border-[#15304D] rounded-2xl p-6 shadow-[0_0_25px_rgba(0,170,255,0.1)] hover:shadow-[0_0_30px_rgba(0,170,255,0.2)] transition-all duration-300">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">{t.dashboard.subscription}</h3>
            <p className="text-3xl font-bold text-green-400">Free Tier</p>
            <p className="text-gray-400 text-sm mt-2">{t.dashboard.subscriptionDesc}</p>
          </div>

          <div className="bg-[#0D1828] border border-[#15304D] rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">{t.dashboard.status}</h3>
            <p className="text-3xl font-bold text-green-400">{t.dashboard.statusActive}</p>
            <p className="text-gray-400 text-sm mt-2">{t.dashboard.statusDesc}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-gray-500 text-sm text-center w-full">
          AiNiBo Systems — Automated Solutions © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
