"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiFiverr, SiUpwork, SiFreelancer } from "react-icons/si";
import { Mail } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRouter, usePathname } from "next/navigation";

export default function BotsAndPricesPage() {
  const { t, lang } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === `/${lang}` || pathname === "/") {
      const target = document.getElementById("Contact");
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${lang}`);
      setTimeout(() => {
        const target = document.getElementById("Contact");
        target?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  // 🌊 Floating animation for cards
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#060E18] to-[#0C1D2F] text-white pt-28 sm:pt-32 pb-16 px-6 sm:px-10 lg:px-24">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[url('/images/background/network-bg.webp')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0A1A28]/70 to-black/80"></div>

      <div className="relative z-10">
        {/* 🌟 Coming Soon Cards (Future Bot Tiers) */}
        <section className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-20 flex-wrap">
          {t.botsAndPrices.cards.map((card: any, i: number) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.07 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, }}
              viewport={{ once: true }}
              className="relative bg-white/10 border border-white/10 rounded-3xl p-8 w-full md:w-[360px] lg:w-[400px]
  h-[500px] text-center backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,170,0.1)]
  hover:shadow-[0_0_50px_rgba(0,255,170,0.3)] transition-all duration-500 transform-gpu
  flex flex-col justify-between overflow-hidden"
            >

              {/* Card Background Image */}
              <div
                className="absolute inset-0 opacity-35 bg-cover"
                style={{
                  backgroundImage: `url('/images/bots_background${i + 1}.jpg')`,
                  backgroundPosition: "center 50%",
                }}
              ></div>

              <div className="relative z-10 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-4xl md:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-200 text-2xl md:text-xl leading-relaxed font-medium mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Placeholder Buy Button */}
                <button
                  disabled
                  className="w-full py-3 bg-gradient-to-r from-[#30C493] to-[#2370BC] rounded-lg font-semibold text-white opacity-70 cursor-not-allowed"
                >
                  {t.botsAndPrices.buyButton || "Coming Soon"}
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Existing Pricing Section */}
        <div className="flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-xl w-full bg-white/10 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl text-center"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent leading-[1.3]">
              {t.botsAndPrices.title}
            </h1>

            <p className="text-gray-300 leading-relaxed mb-10 whitespace-pre-line">
              {t.botsAndPrices.description}
            </p>

            {/* Freelancing Buttons */}
            <div className="flex flex-col gap-4">
              <Link
                href="https://www.fiverr.com/s/YR1qkRK"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#30C493]/90 hover:bg-[#30C493] text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                <SiFiverr size={22} /> Fiverr
              </Link>

              <Link
                href="https://www.upwork.com/agencies/1980796097603262827/"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#2370BC]/90 hover:bg-[#2370BC] text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                <SiUpwork size={22} /> Upwork
              </Link>

              <Link
                href="https://www.freelancer.com/u/NikolayBZ/AiNiBo-Systems-Ltd"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                <SiFreelancer size={22} /> Freelancer
              </Link>
            </div>

            {/* Contact */}
            <div className="mt-10">
              <Link
                href={`/${lang}/#Contact`}
                onClick={handleContactClick}
                scroll={false}
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#30C493] transition-all mt-4"
              >
                <Mail size={18} /> {t.botsAndPrices.contactButton}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
