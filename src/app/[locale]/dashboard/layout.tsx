"use client";

import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useSession } from "@/contexts/SessionProvider";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguageContext();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/${locale}/login`);
    }
  }, [loading, user, router, locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 bg-[#07111C]">
        {t.dashboardLayout.loading}
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { href: `/${locale}/dashboard`, label: t.dashboardLayout.overview },
    { href: `/${locale}/dashboard/my-bots`, label: t.dashboardLayout.myBots },
    { href: `/${locale}/dashboard/billing`, label: t.dashboardLayout.billing },
    { href: `/${locale}/dashboard/security`, label: t.dashboardLayout.security },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace(`/${locale}/login`);
  };

  return (
    <div className="min-h-screen flex bg-[#07111C] text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-6 border-r border-[#15304D] bg-[#0A1423] shadow-[0_0_25px_rgba(0,255,170,0.05)]">
        <h2 className="text-2xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300 text-center drop-shadow-md">
          AiNiBo Systems
        </h2>

        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${active
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-[0_0_15px_rgba(0,255,180,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-[#0F2237]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-[#15304D] text-center">
          <p className="text-xs text-gray-500 mb-3">
            {t.dashboardLayout.loggedInAs} <br />
            <span className="text-blue-300 font-semibold">{user.email}</span>
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-md font-semibold hover:from-red-400 hover:to-red-500 transition-all duration-200 shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          >
            {t.dashboardLayout.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center md:justify-start px-4 md:px-6 py-10 transition-all duration-300">
        <div className="w-full max-w-4xl">

          {children}

          {/* Mobile Logged-in Info (visible on all dashboard pages) */}
          <div className="md:hidden w-full mt-10 mb-6 p-4 rounded-xl bg-[#0A1423] border border-[#15304D] shadow-lg flex flex-col items-center text-center">
            <span className="text-sm text-gray-300 mb-3">
              {t.dashboardLayout.loggedInAs}
              <br />
              <span className="text-blue-300 font-semibold">{user.email}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:from-red-400 hover:to-red-500 transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)]"
            >
              {t.dashboardLayout.logout}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
