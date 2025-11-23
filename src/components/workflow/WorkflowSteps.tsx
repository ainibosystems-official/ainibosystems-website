"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Rocket,
  Settings,
  Target,
  ArrowDownCircle,
} from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function WorkflowSteps() {
  const { t } = useLanguageContext();

  // ✅ Pull steps dynamically from translations
  const steps = t.workflowSteps.steps;

  const icons = [Target, Brain, Code2, Settings, Rocket];

  return (
    <section
      id="workflow-steps"
      className="relative py-40 px-6 sm:px-10 lg:px-24 overflow-hidden bg-gradient-to-b from-[#06111C] via-[#0A1A28] to-[#0C1D2F]"
    >
      {/* 🔹 Animated grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1b3149_0%,#060E18_80%)] opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/images/background/grid.svg')] bg-center bg-cover opacity-[0.04] animate-pulse-slow"></div>

      {/* 🔹 Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-28"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-6 leading-[1.3]">
          {t.workflowSteps.title}
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          {t.workflowSteps.subtitle}
        </p>
      </motion.div>

      {/* 🔹 Glowing vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#30C493]/40 to-transparent hidden md:block"></div>

      {/* 🔹 Step cards */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-32">
        {steps.map((step: any, i: number) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center justify-between gap-10 w-full ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Connection glow line */}
              <div
                className={`absolute ${
                  i % 2 === 0 ? "md:-left-20" : "md:-right-20"
                } top-1/2 w-1/2 h-[3px] bg-gradient-to-r ${
                  i % 2 === 0
                    ? "from-transparent via-[#30C493]/40 to-transparent"
                    : "from-transparent via-[#2370BC]/40 to-transparent"
                } hidden md:block`}
              />

              {/* Step Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 w-full md:w-[45%] text-center md:text-left backdrop-blur-md shadow-lg hover:shadow-[#30C493]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-b opacity-5 rounded-2xl pointer-events-none" />
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Icon size={40} className={i % 2 === 0 ? "text-[#30C493]" : "text-[#2370BC]"} />
                  <h3 className="text-2xl font-semibold text-[#30C493]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {step.text}
                </p>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Final Arrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <ArrowDownCircle
            size={52}
            className="text-[#30C493]/60 animate-bounce-slow"
          />
        </motion.div>
      </div>

      {/* 🔹 Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[#30C493]/40 rounded-full blur-sm top-10 left-[30%] animate-float-slow" />
        <div className="absolute w-3 h-3 bg-[#2370BC]/40 rounded-full blur-md top-1/3 right-[25%] animate-float-slow" />
        <div className="absolute w-2 h-2 bg-[#30C493]/40 rounded-full blur-md bottom-[20%] left-[45%] animate-float-slower" />
      </div>
    </section>
  );
}
