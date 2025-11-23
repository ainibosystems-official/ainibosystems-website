"use client";

import { motion } from "framer-motion";
import { Globe2, Wallet, Code2, BrainCircuit } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export default function ServicesSection() {
  const { t, lang } = useLanguageContext();
  const pathname = usePathname();
  const router = useRouter();

  const handleWorkflowClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const fullPath = `/${lang}/workflow#${sectionId}`;

    // ✅ If not already on workflow page, navigate first
    if (!pathname.includes("/workflow")) {
      router.push(`/${lang}/workflow`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      // ✅ Smooth scroll if already on the same page
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Inject translated titles/descriptions
  const services = [
    {
      title: t.services.cards[0].title,
      description: t.services.cards[0].description,
      icon: <Wallet size={68} className="text-[#30C493]" />,
      highlight: true,
      direction: "left",
    },
    {
      title: t.services.cards[1].title,
      description: t.services.cards[1].description,
      icon: <Code2 size={64} className="text-[#2370BC]" />,
      direction: "right",
    },
    {
      title: t.services.cards[2].title,
      description: t.services.cards[2].description,
      icon: <BrainCircuit size={64} className="text-[#30C493]" />,
      direction: "right",
    },
    {
      title: t.services.cards[3]?.title || t.services.cards[0].title,
      description:
        t.services.cards[3]?.description || t.services.cards[0].description,
      icon: <Globe2 size={64} className="text-[#2370BC]" />,
      direction: "right",
    },
  ];

  return (
    <section
      id="Services"
      className="relative w-full py-20 px-4 sm:px-8 lg:px-24 
             bg-gradient-to-b from-[#060E18] to-[#0C1D2F] text-white mt-[-100px]"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.3] bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
          {t.services.title}
        </h2>
        <p className="text-gray-300 mt-4 max-w-3xl mx-auto text-base sm:text-lg">
          {t.services.subtitle}
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 w-full max-w-[1500px] mx-auto px-4 sm:px-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: service.direction === "left" ? -300 : 300,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0,
              delay: index * 0,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: service.highlight
                ? "0 0 30px #30C49366"
                : "0 0 20px #2370BC55",
            }}
            className={`relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between
              ${service.highlight
                ? "bg-gradient-to-br from-[#1A3A4A]/40 to-[#0B1F2C]/60 border-[#30C493]/40 shadow-[0_0_30px_#30C49344]"
                : "bg-white/5 border-white/10 hover:border-[#30C493]/30"
              }`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">{service.icon}</div>

            {/* Title */}
            <h3
              className={`text-2xl font-semibold mb-3 ${service.highlight
                  ? "text-[#30C493]"
                  : "text-white hover:text-[#30C493]"
                }`}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Learn More Button */}
            <a
              href={`/${lang}/workflow#${index === 0 ? "workflow-details" : "workflow-bottom"
                }`}
              onClick={(e) =>
                handleWorkflowClick(
                  e,
                  index === 0 ? "workflow-details" : "workflow-bottom"
                )
              }
              className={`inline-block font-medium py-2 px-6 rounded-xl text-sm transition-all duration-300 self-start ${index === 0
                  ? "bg-[#30C493] hover:bg-[#2370BC]"
                  : "bg-[#2370BC] hover:bg-[#30C493]"
                }`}
            >
              {t.services.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
