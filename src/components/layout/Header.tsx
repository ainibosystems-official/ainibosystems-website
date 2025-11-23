"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@/contexts/SessionProvider";
import { supabase } from "@/lib/supabaseClient";

type HeaderProps = {
  onToggle: () => void;
  isMenuOpen: boolean;
};

export default function Header({ onToggle, isMenuOpen }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguageContext();
  const { user } = useSession();

  // ✅ Smooth scroll-hide logic
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const getScrollY = () =>
      typeof window !== "undefined"
        ? window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
        : 0;

    let lastY = 0;

    const onScroll = () => {
      const y = getScrollY();
      if (y > lastY && y > 100) setShowHeader(false);
      else if (y < lastY - 5 || y < 100) setShowHeader(true);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔹 Scroll to top if already on homepage
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === `/${lang}` || pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🔹 Define navigation links
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

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();

      const targetId = href.replace("/#", "#");
      const target = document.querySelector(targetId);

      if (pathname !== `/${lang}`) {
        router.push(`/${lang}`);
        setTimeout(() => {
          const newTarget = document.querySelector(targetId);
          newTarget?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // ------------------------------------------------------------
  // ✅ FINAL RETURN
  // ------------------------------------------------------------
  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[9999] backdrop-blur-md bg-[#2370BC]/70 border-b border-white/10 will-change-transform"
      style={{ transform: showHeader ? "translateY(0)" : "translateY(-100%)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* 🔹 Header content */}
      <div className="relative w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* ✅ Logo */}
        <div className="flex items-center">
          <Link href={`/${lang}`} onClick={handleLogoClick}>
            <Image
              src="/Logo.svg"
              alt="AiNiBo Systems Logo"
              width={100}
              height={32}
              priority
              className="object-contain cursor-pointer hover:scale-[1.05] transition-transform duration-300"
            />
          </Link>
        </div>

        {/* ✅ Tablet/Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3 text-white text-sm lg:text-base font-medium">
          {navItems.map((item) => {
            const localizedHref = item.href.startsWith("/#")
              ? item.href
              : `/${lang}${item.href}`;
            return (
              <Link
                key={item.href}
                href={localizedHref}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="
                  relative hover:text-[#30C493]
                  after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                  after:bg-[#30C493]
                  after:transition-all after:duration-300
                  hover:after:w-full hover:after:bottom-[0px]
                "
              >
                {item.label}
              </Link>
            );
          })}

          {/* 🔐 Login / Dashboard Buttons */}
          <div className="flex items-center ml-4">
            {!user ? (
              <Link
                href={`/${lang}/login`}
                className="bg-[#30C493] px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-[#25a97b] transition-colors duration-300"
              >
                {t.navbar.login || "Login"}
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href={`/${lang}/dashboard`}
                  className="bg-[#30C493] px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-[#25a97b] transition-colors duration-300"
                >
                  {t.navbar.dashboard || "Dashboard"}
                </Link>
              </div>
            )}
          </div>


          {/* 🌐 Language Buttons */}
          <div className="flex gap-2 text-sm font-thin ml-4">
            {[
              { code: "en", label: "EN" },
              { code: "de", label: "DE" },
              { code: "bg", label: "BG" },
            ].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code as "en" | "de" | "bg")}
                className={`
                  relative transition-colors duration-200
                  ${lang === code
                    ? "text-[#30C493] after:w-full"
                    : "text-white/70 hover:text-[#30C493]"
                  }
                  after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                  after:bg-[#30C493] after:transition-all after:duration-300
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* 🔹 Mobile Burger Icon */}
        <button
          onClick={onToggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
        >
          <span
            className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[0px]" : "-translate-y-[6px]"
              }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-white rounded transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[0px]" : "translate-y-[6px]"
              }`}
          />
        </button>
      </div>
    </motion.header>
  );
}
