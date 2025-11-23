"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useSession } from "@/contexts/SessionProvider";
import { supabase } from "@/lib/supabaseClient";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguageContext();
  const { user } = useSession();

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "#");
      const target = document.querySelector(targetId);

      onClose();

      if (pathname !== `/${lang}`) {
        router.push(`/${lang}`);
        setTimeout(() => {
          const newTarget = document.querySelector(targetId);
          newTarget?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        target?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onClose();
    }
  };

  type Locale = "en" | "de" | "bg";
  const handleLanguageChange = (newLang: Locale) => {
    if (newLang !== lang) {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        router.push(`/${newLang}`);
        setLang(newLang);
        document.body.classList.remove("fade-out");
      }, 200);
    }
  };

  // Main navbar links
  const navItems = [
    { href: "/#Home", label: t.navbar.home },
    { href: "/#Services", label: t.navbar.services },
    { href: "/#Bots", label: t.navbar.bots },
    { href: "/#Contact", label: t.navbar.contact },
    { href: "/#About", label: t.navbar.about },
    { href: "/workflow", label: t.navbar.workflow },
    { href: "/bots-and-prices", label: t.navbar.pricing },
    { href: "/are-we-hiring", label: t.navbar.hiring },
  ];

  // ✅ Dashboard submenu (shared with desktop dashboardLayout)
  const dashboardLinks = [
    { href: "/dashboard", key: "overview" },
    { href: "/dashboard/my-bots", key: "myBots" },
    { href: "/dashboard/billing", key: "billing" },
    { href: "/dashboard/security", key: "security" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-gradient-to-br from-[#0B1725]/95 via-[#0B1E2E]/95 to-[#0B1725]/95 backdrop-blur-2xl z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 inset-x-0 bottom-0 z-50 flex flex-col items-center text-white bg-transparent overflow-y-auto hide-scrollbar"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-start w-full px-6 pt-10 pb-12"
            >
              {/* Main Nav */}
              <nav className="flex flex-col gap-8 text-2xl sm:text-3xl font-medium text-white/90 text-center w-full">
                {navItems.map(({ href, label }) => {
                  const localizedHref = href.startsWith("/#") ? href : `/${lang}${href}`;
                  return (
                    <Link
                      key={href}
                      href={localizedHref}
                      onClick={(e) => handleLinkClick(e, href)}
                      className="hover:text-[#30C493] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>

              {/* Auth Buttons & Dashboard links */}
              <div className="flex flex-col items-center mt-10 gap-6 w-full">
                {!user ? (
                  <Link
                    href={`/${lang}/login`}
                    onClick={onClose}
                    className="bg-[#30C493] px-8 py-4 rounded-xl font-semibold text-xl hover:bg-[#25a97b] transition-all duration-300 w-[80%] text-center"
                  >
                    {t.navbar.login || "Login"}
                  </Link>
                ) : (
                  <>
                    <Link
                      href={`/${lang}/dashboard`}
                      onClick={onClose}
                      className="bg-[#30C493] px-8 py-4 rounded-xl font-semibold text-xl hover:bg-[#25a97b] transition-all duration-300 w-[80%] text-center"
                    >
                      {t.navbar.dashboard || "Dashboard"}
                    </Link>

                    {/* Dashboard sublinks */}
                    <div className="flex flex-col items-center gap-4 mt-4 w-full">
                      {dashboardLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={`/${lang}${item.href}`}
                          onClick={onClose}
                          className="text-white/90 text-lg font-medium hover:text-[#30C493] transition"
                        >
                          {t.dashboardLayout[item.key] || item.key}
                        </Link>
                      ))}

                      {/* Logout button */}
                      <button
                        onClick={async () => {
                          await supabase.auth.signOut();
                          onClose();
                          router.push(`/${lang}/login`);
                        }}
                        className="mt-6 text-red-400 text-lg font-semibold hover:text-red-500 transition"
                      >
                        {t.navbar.logout || "Logout"}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Language Selector */}
              <div className="flex gap-6 mt-12 text-lg">
                {(["en", "de", "bg"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`hover:text-[#30C493] transition ${
                      lang === l ? "text-[#30C493]" : "text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
