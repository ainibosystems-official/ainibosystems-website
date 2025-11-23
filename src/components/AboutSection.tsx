"use client";

import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguageContext();

  return (
    <section
      id="About"
      className="relative w-full py-24 px-6 sm:px-10 lg:px-24 
                 bg-gradient-to-b from-[#0D1E2F] to-[#07111C] text-white overflow-hidden mt-[-100px]"
    >
      {/* 🔹 Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#30C493]/10 via-transparent to-[#2370BC]/10 blur-[160px] -z-10"></div>

      {/* 🔹 Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold leading-[1.3] bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
          {t.about.title}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* 🔹 Full-width text content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto text-center lg:text-left space-y-6"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-[#30C493]">
          {t.about.headline}
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {t.about.paragraph1}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {t.about.paragraph2}
        </p>
      </motion.div>

      {/* 🔹 Video Section */}
      <motion.div
        id="agency-video"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-24 flex justify-center"
      >
        {/* 🎥 Video container */}
        <div className="relative w-full max-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(48,196,147,0.3)]">
          <iframe
            src="https://www.youtube.com/embed/2sr4snrXU-Y"
            title="AiNiBo Systems - Agency Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-2xl border border-[#30C493]/20"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
