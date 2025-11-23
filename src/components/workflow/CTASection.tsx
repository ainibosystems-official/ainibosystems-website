"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export default function CTASection() {
  const { t, lang } = useLanguageContext();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Smooth scroll logic for multilingual routing
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // If already on the homepage → scroll directly
    if (pathname === `/${lang}` || pathname === "/") {
      const target = document.getElementById("Contact");
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page → go to locale homepage, then scroll
      router.push(`/${lang}`);
      setTimeout(() => {
        const target = document.getElementById("Contact");
        target?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <section
      id="cta"
      className="relative py-40 px-6 sm:px-10 lg:px-24 text-center bg-gradient-to-b from-[#07111C] to-[#0D1E2F] overflow-visible"
    >
      {/* 🔹 Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#30C493]/20 blur-[200px] rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[#2370BC]/20 blur-[220px] rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* 🔹 Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-8 leading-[1.3] pb-2"
      >
        {t.cta.title}
      </motion.h2>

      {/* 🔹 Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        {t.cta.subtitle1}
        <br />
        {t.cta.subtitle2}
      </motion.p>

      {/* 🔹 Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Link
          href={`/${lang}/#Contact`}
          onClick={handleContactClick}
          scroll={false}
          className="inline-flex items-center gap-3 bg-[#30C493] hover:bg-[#2370BC] text-white text-lg font-semibold py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_0_40px_#30C49355] hover:shadow-[0_0_50px_#2370BC66]"
        >
          {t.cta.button}
          <ArrowRightCircle size={26} />
        </Link>
      </motion.div>

      {/* 🔹 Bottom Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#30C493] via-[#2370BC] to-transparent opacity-80"
      ></motion.div>
    </section>
  );
}
