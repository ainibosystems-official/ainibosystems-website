"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap, Lock, Trophy, Users } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function WhyChooseAiNiBo() {
  const { t } = useLanguageContext();

  const features = t.whyChoose.features;

  return (
    <section
      id="why-ainibo"
      className="relative py-32 px-6 sm:px-10 lg:px-24 bg-gradient-to-b from-[#06101A] to-[#07111C] overflow-hidden"
    >
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent leading-[1.3]">
          {t.whyChoose.title}
        </h2>
        <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto">
          {t.whyChoose.subtitle}
        </p>
      </motion.div>

      {/* 🔹 Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1500px] mx-auto">
        {features.map((f: any, i: number) => {
          const icons = [Cpu, ShieldCheck, Zap, Users, Trophy, Lock];
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0, delay: i * 0, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(48,196,147,0.25)",
              }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-[#30C493]/40"
            >
              <div className="flex justify-center mb-6">
                <Icon
                  size={48}
                  className={i % 2 === 0 ? "text-[#30C493]" : "text-[#2370BC]"}
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#30C493] mb-3 text-center">
                {f.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* 🔹 Floating Stats */}
      <div className="relative flex flex-wrap justify-center gap-8 mt-28 text-center">
        {t.whyChoose.stats.map((stat: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#30C493]/10 to-[#2370BC]/10 border border-white/10 backdrop-blur-xl"
          >
            <h4
              className={`text-4xl font-bold ${
                i % 2 === 0 ? "text-[#30C493]" : "text-[#2370BC]"
              }`}
            >
              {stat.value}
            </h4>
            <p className="text-gray-300 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#30C493]/20 blur-[150px] rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-[#2370BC]/20 blur-[180px] rounded-full opacity-50 animate-pulse"></div>
      </div>
    </section>
  );
}
