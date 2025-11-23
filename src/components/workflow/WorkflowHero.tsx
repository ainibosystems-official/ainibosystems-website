"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function WorkflowHero() {
  const { t, lang } = useLanguageContext();

  return (
    <section
      id="workflow-hero"
      className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-24 py-40 overflow-visible"
    >
      {/* 🔹 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111C] to-[#0D1E2F] z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#30C493]/20 via-transparent to-transparent blur-[160px] opacity-70"></div>
      <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-[#2370BC]/20 rounded-full blur-[150px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[15%] right-[20%] w-[300px] h-[300px] bg-[#30C493]/20 rounded-full blur-[150px] opacity-60 animate-pulse"></div>

      {/* 🔹 Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <Sparkles size={40} className="text-[#30C493] animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.3] pb-3 relative z-20 bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
          {t.workflowHero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-8 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          {t.workflowHero.subtitle1}
          <br />
          {t.workflowHero.subtitle2}
        </p>

        {/* 🔹 Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <Link
            href="#workflow-steps"
            className="bg-[#30C493] hover:bg-[#2370BC] text-white font-medium py-3 px-8 rounded-xl flex items-center gap-2 transition-all duration-300"
          >
            {t.workflowHero.primaryButton}
            <ArrowRight size={18} />
          </Link>

          <Link
            href={`/${lang}/#Services`}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-8 rounded-xl backdrop-blur-md transition-all duration-300"
          >
            {t.workflowHero.secondaryButton}
          </Link>
        </div>
      </motion.div>

      {/* 🔹 Floating Decorative Lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#30C493]/40 to-transparent"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2370BC]/30 to-transparent"
      ></motion.div>
    </section>
  );
}
