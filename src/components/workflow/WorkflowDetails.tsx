"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function WorkflowDetails() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, lang } = useLanguageContext();

  // ✅ Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Bots data from translations
  const bots = t.workflowDetails.bots;

  return (
    <section
      id="workflow-details"
      className="relative py-32 px-6 sm:px-10 lg:px-24 bg-gradient-to-b from-[#0D1E2F] to-[#06101A] text-gray-200"
    >
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-6 leading-[1.3]">
          {t.workflowDetails.title}
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          {t.workflowDetails.subtitle}
        </p>
      </motion.div>

      {/* 🔹 BOTS */}
      <div className="max-w-[1500px] mx-auto space-y-28">
        {bots.map((bot: any, i: number) => (
          <div
            key={i}
            className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
          >
            {/* Text block */}
            <div className="flex-1">
              <h3
                className="text-3xl font-semibold mb-4"
                style={{ color: bot.color }}
              >
                {bot.title}
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {bot.desc}
              </p>

              {/* 🔹 Pricing Button (always centered) */}
              <div className="flex justify-center mt-4">
                <a
                  href={`/${lang}/bots-and-prices`}
                  className="inline-block bg-[#30C493] hover:bg-[#2370BC] 
               text-white font-medium py-2 px-6 rounded-xl 
               transition-all duration-200 text-center"
                >
                  {t.workflowDetails.ctaPricing}
                </a>
              </div>
            </div>

            {/* Images */}
            <div
              className={`flex flex-wrap justify-center gap-6 flex-1 ${bot.singleImage ? "lg:justify-start" : ""
                }`}
            >
              {bot.images.map((src: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(src)}
                  className="relative w-[400px] h-[250px] sm:w-[420px] sm:h-[260px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#30C493]/40 shadow-lg transition-all duration-300 group"
                >
                  <Image
                    src={src}
                    alt={`${bot.title} Preview ${idx + 1}`}
                    fill
                    className="object-contain p-4 bg-white/5 backdrop-blur-sm group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🎥 Embedded Video Section */}
      <div className="max-w-5xl mx-auto mt-32 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-semibold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-8"
        >
          {t.workflowDetails.videoTitle}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-black/20 backdrop-blur-sm"
        >
          <iframe
            id="bots-video"
            src="https://www.youtube.com/embed/hwzWLVrOjYE"
            title="AiNiBo Systems Bot Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

      {/* 🔹 SERVICES */}
      <div id="workflow-bottom" className="max-w-5xl mx-auto space-y-16 text-gray-300">
        <h3 className="text-3xl font-semibold text-[#30C493] mb-4">
          {t.workflowDetails.services.title}
        </h3>
        <p className="leading-relaxed">{t.workflowDetails.services.description}</p>

        {t.workflowDetails.services.cards.map((card: any, i: number) => (
          <div
            key={i}
            className={`border-l-4 pl-6 ${i % 2 === 0 ? "border-[#30C493]/60" : "border-[#2370BC]/60"
              }`}
          >
            <h4 className="text-2xl font-semibold mb-2" style={{ color: card.color }}>
              {card.title}
            </h4>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%] max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={selectedImage}
                alt="Enlarged Bot Preview"
                width={1600}
                height={900}
                className="w-full h-auto object-contain bg-[#0C1D2F]"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
              >
                <X size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
