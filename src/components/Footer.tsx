"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";


// Add this line near the top, before `export default function Footer() {`
declare global {
  interface Window {
    Cookiebot?: { renew: () => void };
  }
}


export default function Footer() {
  const { t, lang } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/#Home", label: t.navbar.home },
    { href: "/#Services", label: t.navbar.services },
    { href: "/#Bots", label: t.navbar.bots },
    { href: "/#Contact", label: t.navbar.contact },
    { href: "/#About", label: t.navbar.about },
    { href: "/workflow", label: t.navbar.workflow },
    { href: "/projects", label: t.navbar.projects },
    { href: "/bots-and-prices", label: t.navbar.pricing },
    { href: "/are-we-hiring", label: t.navbar.hiring },
  ];

  const socials = [
    { Icon: Facebook, href: "https://www.facebook.com/AiNiBoSystems/", label: "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/ainibosystems/", label: "Instagram" },
    { Icon: FaXTwitter, href: "https://x.com/AiNiBoSystems", label: "X" },
    { Icon: Youtube, href: "https://youtube.com/@AiNiBoSystems", label: "YouTube" },
  ];

  return (
    <footer className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-b from-[#0A1C2F] to-[#2370BC] text-white border-t border-white/10">
      {/* 🔹 Top Section */}
      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-24 py-14 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Logo & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:text-left space-y-3 flex-1"
        >
          <div className="flex justify-center md:justify-start items-center gap-3">
            <Image
              src="/footer/ainibo-logo.svg"
              alt="AiNiBo Systems"
              width={48}
              height={48}
              className="opacity-90"
            />
            <h3 className="text-2xl font-semibold tracking-wide">
              AiNiBo Systems
            </h3>
          </div>
          <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-2">
            {t.footer.tagline}
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <ul className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-3 text-gray-300 text-sm">
            {navLinks.map(({ href, label }) => {
              const localizedHref = href.startsWith("/#")
                ? href
                : `/${lang}${href}`;
              return (
                <li key={href}>
                  <Link
                    href={localizedHref}
                    onClick={(e) => handleAnchorClick(e, href)}
                    className="hover:text-[#30C493] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.nav>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-end gap-4 flex-1"
        >
          <h4 className="text-gray-400 text-sm font-medium">
            {t.footer.followUs}
          </h4>
          <div className="flex gap-5">
            {socials.map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-gray-400 hover:text-[#30C493] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(48,196,147,0.4)] cursor-pointer"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>


      {/* 🔹 Freelancing Platforms */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-[1500px] mx-auto flex flex-wrap justify-center items-center gap-7 px-6">
          {[
            { src: "/logos/fiverr.svg", alt: "Fiverr", href: "https://www.fiverr.com/s/YR1qkRK", width: 70, height: 34 },
            { src: "/logos/upwork.svg", alt: "Upwork", href: "https://www.upwork.com/agencies/1980796097603262827/", width: 90, height: 36 },
            { src: "/logos/freelancer.svg", alt: "Freelancer", href: "https://www.freelancer.com/u/NikolayBZ/AiNiBo-Systems-Ltd", width: 100, height: 34 },
            { src: "/logos/visa.svg", alt: "Visa", width: 75, height: 35 },
            { src: "/logos/mastercard.svg", alt: "MasterCard", width: 50, height: 40 },
            { src: "/logos/paypal.svg", alt: "PayPal", width: 90, height: 38 },
            { src: "/logos/applepay.svg", alt: "Apple Pay", width: 65, height: 35 },
            { src: "/logos/googlepay.svg", alt: "Google Pay", width: 75, height: 35 },
            { src: "/logos/bank.svg", alt: "Bank Transfer", width: 60, height: 35 },
            { src: "/logos/binance.svg", alt: "Binance", href: "https://www.binance.com", width: 105, height: 35 },
            { src: "/logos/bitget.svg", alt: "Bitget", href: "https://www.bitget.com", width: 85, height: 35 },
            { src: "/logos/kucoin.svg", alt: "KuCoin", href: "https://www.kucoin.com", width: 95, height: 35 },
          ].map((logo, i) =>
            logo.href ? (
              <Link key={i} href={logo.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="opacity-70 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(48,196,147,0.3)] cursor-pointer"
                />
              </Link>
            ) : (
              <Image
                key={i}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="opacity-70 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(48,196,147,0.3)]"
              />
            )
          )}
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-white/10 flex flex-col items-center justify-center text-xs text-gray-400 px-6 sm:px-10 lg:px-24 py-6 space-y-2 text-center">
        <p>© {new Date().getFullYear()} AiNiBo Systems. {t.footer.rights}</p>

        <div className="flex flex-wrap justify-center gap-5 text-gray-400">
          <Link href={`/${lang}/privacy`} className="hover:text-[#30C493] transition-colors duration-200">{t.footer.privacy}</Link>
          <Link href={`/${lang}/cookies`} className="hover:text-[#30C493] transition-colors duration-200">{t.footer.cookies}</Link>
          <Link href={`/${lang}/terms`} className="hover:text-[#30C493] transition-colors duration-200">{t.footer.terms}</Link>
          <button
            onClick={() => window?.Cookiebot?.renew()}
            className="hover:text-[#30C493] transition-colors duration-200"
          >
            {t.footer.settings}
          </button>
        </div>
      </div>
    </footer>
  );
}
