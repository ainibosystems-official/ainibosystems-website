"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useRouter, usePathname } from "next/navigation";

export default function BotsSection() {
  const { t, lang } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();

  const bots = t.bots.cards; // ✅ translated cards
  const botImages = [
    "/bots/spotbot.svg",
    "/bots/futuresbot.svg",
    "/bots/arbitragebot.svg",
    "/bots/paperbot.svg",
  ];

  // ✅ Smooth scroll handler
  const handleWorkflowClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();

    const fullPath = `/${lang}/workflow#${targetId}`;

    // If user is not on workflow page, navigate first
    if (!pathname.includes("/workflow")) {
      router.push(`/${lang}/workflow`);
      setTimeout(() => {
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      // If already on workflow page, smooth scroll directly
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="Bots"
      className="relative w-full py-24 px-6 sm:px-10 lg:px-24 
                 bg-gradient-to-b from-[#0D1E2F] to-[#07111C] 
                 text-white mt-[-100px]"
    >
      {/* 🔹 Section Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-extrabold leading-[1.3] bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
          {t.bots.title}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
          {t.bots.subtitle}
        </p>
      </div>

      {/* 🔹 Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[1500px] mx-auto items-center">
        {bots.map((bot, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* ✅ Image + hover glow */}
            <div className="relative group w-full flex justify-center md:justify-start">
              <div
                className="absolute -inset-10 rounded-3xl 
                           bg-gradient-to-r from-[#30C493]/25 to-[#2370BC]/25 
                           blur-[100px] z-0 
                           transition-all duration-700 ease-in-out 
                           group-hover:blur-[140px] 
                           group-hover:from-[#30C493]/70 
                           group-hover:to-[#2370BC]/70"
              ></div>

              <Image
                src={botImages[index]}
                alt={bot.title}
                width={1200}
                height={700}
                className="relative z-10 w-full max-w-[600px] 
                           rounded-2xl shadow-lg shadow-[#30C493]/20"
                priority={index === 0}
              />
            </div>

            {/* Text content */}
            <div className="mt-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#30C493] mb-3">
                {bot.title}
              </h3>
              <p className="text-gray-300 mb-6">{bot.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Existing button → Workflow */}
                <a
                  href={`/${lang}/workflow#workflow-details`}
                  onClick={(e) => handleWorkflowClick(e, "workflow-details")}
                  className="bg-[#2370BC] hover:bg-[#30C493] 
               text-white font-medium py-2 px-6 rounded-xl 
               transition-all duration-200 inline-block text-center"
                >
                  {t.bots.cta}
                </a>

                {/* New pricing button */}
                <a
                  href={`/${lang}/bots-and-prices`}
                  className="bg-[#30C493] hover:bg-[#2370BC] 
               text-white font-medium py-2 px-6 rounded-xl 
               transition-all duration-200 inline-block text-center"
                >
                  {t.bots.ctaPricing}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
