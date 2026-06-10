"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function ProjectsPage() {
  const { t, lang } = useLanguageContext();

  return (
    <main className="min-h-screen bg-[#060E18] text-white">

      {/* =========================
    HERO
========================= */}
      <section
        id="ProjectsHero"
        className="
    relative
    w-screen
    min-h-[85vh] md:min-h-[90vh]
    flex
    items-center
    justify-center
    text-center
    overflow-hidden
  "
      >
        {/* 🔹 Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/projects/hero.jpg"
            alt="AiNiBo Systems Projects"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        {/* 🔹 Overlay (same philosophy as main hero) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/* 🔹 Text */}
        <div className="relative z-10 px-4 sm:px-8 max-w-[1000px]">
          <h1
            className="
      text-4xl sm:text-6xl lg:text-7xl
      font-extrabold
      leading-[1.3]
      pb-3
      mb-6
      bg-gradient-to-r from-[#30C493] to-[#2370BC]
      bg-clip-text text-transparent
      drop-shadow-lg
    "
          >
            {t.projects.title}
          </h1>

          <p
            className="
      text-lg sm:text-xl
      leading-relaxed
      text-gray-200
      max-w-3xl
      mx-auto
    "
          >
            {t.projects.subtitle}
          </p>
        </div>

      </section>

      {/* =========================
    ATELIE
========================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-start pt-16 md:pt-20 mb-32 px-6 sm:px-10 lg:px-24"
      >
        {/* Image */}
        <div className="relative max-w-md mx-auto md:order-2 group">
          <div
            className="
        absolute
        inset-0
        rounded-2xl
        bg-gradient-to-r from-[#30C493]/60 to-[#2370BC]/60
        blur-2xl
        opacity-50
        transition-all
        duration-500
        ease-out
        group-hover:opacity-90
        group-hover:blur-3xl
        group-hover:scale-105
        pointer-events-none
      "
          />

          <div
            className="
        relative
        rounded-2xl
        overflow-hidden
        shadow-2xl
        transition-transform
        duration-500
        ease-out
        group-hover:-translate-y-1
      "
          >
            <Image
              src="/images/projects/atelie-preview.png"
              alt={t.projects.atelie.name}
              width={1600}
              height={900}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative pr-6 md:order-1">
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          <span className="inline-block text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-[#30C493] mb-4">
            {t.projects.badgeBuiltOperated}
          </span>

          <h2 className="text-3xl font-semibold mb-1">
            {t.projects.atelie.name}
          </h2>

          <div className="w-12 h-[2px] bg-gradient-to-r from-[#30C493] to-[#2370BC] mb-4" />

          <p className="text-sm text-gray-400 mb-6">
            {t.projects.atelie.tagline}
          </p>

          <p className="text-gray-300 mb-6">
            {t.projects.atelie.intro}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.atelie.challenge.title}
          </h3>

          <p className="text-gray-300 mb-5">
            {t.projects.atelie.challenge.text}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.atelie.solution.title}
          </h3>

          <p className="text-gray-300 mb-6">
            {t.projects.atelie.solution.text}
          </p>

          <h3 className="font-semibold mb-3">
            {t.projects.atelie.deliverables.title}
          </h3>

          <ul className="text-gray-300 mb-8 space-y-2">
            {t.projects.atelie.deliverables.items.map(
              (item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#30C493]">▸</span>
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

          <Link
            href="https://psiholog-dzhuliabozhidarova.com"
            target="_blank"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#30C493] to-[#2370BC] font-medium hover:opacity-90 transition"
          >
            {t.projects.atelie.cta}
          </Link>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="my-40 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-[#30C493]/30 to-transparent" />
      </div>

      {/* =========================
          NIBODOM
      ========================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-start pt-16 md:pt-20 mb-32 px-6 sm:px-10 lg:px-24"
      >
        {/* Image */}
        <div className="relative max-w-md mx-auto group">
          {/* Glow layer */}
          <div
            className="
      absolute
      inset-0
      rounded-2xl
      bg-gradient-to-r from-[#30C493]/60 to-[#2370BC]/60
      blur-2xl
      opacity-50
      transition-all
      duration-500
      ease-out
      group-hover:opacity-90
      group-hover:blur-3xl
      group-hover:scale-105
      pointer-events-none
    "
          />

          {/* Image wrapper (THIS is where overflow goes) */}
          <div
            className="
      relative
      rounded-2xl
      overflow-hidden
      shadow-2xl
      transition-transform
      duration-500
      ease-out
      group-hover:-translate-y-1
    "
          >
            <Image
              src="/images/projects/nibodom-preview.png"
              alt={t.projects.nibodom.name}
              width={1600}
              height={900}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative pl-6">
          {/* vertical guide */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <span className="inline-block text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-[#30C493] mb-4">
            {t.projects.badgeBuiltOperated}
          </span>

          <h2 className="text-3xl font-semibold mb-1">
            {t.projects.nibodom.name}
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#30C493] to-[#2370BC] mb-4" />

          <p className="text-sm text-gray-400 mb-6">
            {t.projects.nibodom.tagline}
          </p>

          <p className="text-gray-300 mb-6">
            {t.projects.nibodom.intro}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.nibodom.challenge.title}
          </h3>
          <p className="text-gray-300 mb-5">
            {t.projects.nibodom.challenge.text}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.nibodom.solution.title}
          </h3>
          <p className="text-gray-300 mb-6">
            {t.projects.nibodom.solution.text}
          </p>

          <h3 className="font-semibold mb-3">
            {t.projects.nibodom.deliverables.title}
          </h3>
          <ul className="text-gray-300 mb-8 space-y-2">
            {t.projects.nibodom.deliverables.items.map(
              (item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#30C493]">▸</span>
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

          <Link
            href="https://nibodom.com"
            target="_blank"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#30C493] to-[#2370BC] font-medium hover:opacity-90 transition"
          >
            {t.projects.nibodom.cta}
          </Link>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="my-40 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-[#30C493]/30 to-transparent" />
      </div>

      {/* =========================
    NIBOFIX
========================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-start mb-32 px-6 sm:px-10 lg:px-24"
      >
        {/* Image (right side) */}
        <div className="relative max-w-md mx-auto md:order-2 group">
          {/* Glow layer */}
          <div
            className="
      absolute
      inset-0
      rounded-2xl
      bg-gradient-to-r from-[#30C493]/60 to-[#2370BC]/60
      blur-2xl
      opacity-50
      transition-all
      duration-500
      ease-out
      group-hover:opacity-90
      group-hover:blur-3xl
      group-hover:scale-105
      pointer-events-none
    "
          />

          {/* Image wrapper */}
          <div
            className="
      relative
      rounded-2xl
      overflow-hidden
      shadow-2xl
      transition-transform
      duration-500
      ease-out
      group-hover:-translate-y-1
    "
          >
            <Image
              src="/images/projects/nibofix-preview.png"
              alt={t.projects.nibofix.name}
              width={1600}
              height={900}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Content (left side, mirrored spacing) */}
        <div className="relative pr-6 md:order-1">
          {/* vertical guide — RIGHT side now */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          <span className="inline-block text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-[#30C493] mb-4">
            {t.projects.badgeBuiltOperated}
          </span>

          <h2 className="text-3xl font-semibold mb-1">
            {t.projects.nibofix.name}
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#30C493] to-[#2370BC] mb-4" />

          <p className="text-sm text-gray-400 mb-6">
            {t.projects.nibofix.tagline}
          </p>

          <p className="text-gray-300 mb-6">
            {t.projects.nibofix.intro}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.nibofix.challenge.title}
          </h3>
          <p className="text-gray-300 mb-5">
            {t.projects.nibofix.challenge.text}
          </p>

          <h3 className="font-semibold mb-2">
            {t.projects.nibofix.solution.title}
          </h3>
          <p className="text-gray-300 mb-6">
            {t.projects.nibofix.solution.text}
          </p>

          <h3 className="font-semibold mb-3">
            {t.projects.nibofix.deliverables.title}
          </h3>
          <ul className="text-gray-300 mb-8 space-y-2">
            {t.projects.nibofix.deliverables.items.map(
              (item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#30C493]">▸</span>
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

          <Link
            href="https://nibofix.com"
            target="_blank"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#30C493] to-[#2370BC] font-medium hover:opacity-90 transition"
          >
            {t.projects.nibofix.cta}
          </Link>
        </div>
      </motion.section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="mt-40 pb-40 lg:pb-56 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t.projects.finalCtaTitle}
        </h2>

        <p className="text-gray-300 mb-10">
          {t.projects.finalCtaText}
        </p>

        <Link
          href={`/${lang}/#Contact`}
          className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-[#30C493] to-[#2370BC] font-semibold hover:opacity-90 transition"
        >
          {t.projects.finalCtaButton}
        </Link>
      </section>
    </main>
  );
}
