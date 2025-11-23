"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroButtons from "@/components/HeroButtons";
import { useLanguageContext } from "@/contexts/LanguageContext"; // ✅ use global context

export default function HeroCarousel() {
  const { t, lang } = useLanguageContext(); // ✅ global translations
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      title: t.hero.slides[0].headline,
      subtitle: t.hero.slides[0].subline,
      image: "/hero/hero1.jpg",
    },
    {
      title: t.hero.slides[1].headline,
      subtitle: t.hero.slides[1].subline,
      image: "/hero/hero2.jpg",
    },
    {
      title: t.hero.slides[2].headline,
      subtitle: t.hero.slides[2].subline,
      image: "/hero/hero3.jpg",
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => handleNext(), 6000);
    return () => clearInterval(interval);
  }, [index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSwipe = (offsetX: number) => {
    if (offsetX < -100) handleNext();
    else if (offsetX > 100) handlePrev();
  };

  return (
    <section
      key={lang} // 👈 forces re-render when language changes
      id="Home"
      className="relative w-screen flex flex-col items-center justify-center text-center min-h-[85vh] md:min-h-[90vh]"
    >
      {/* 🔹 Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={`${index}-${lang}`} // 👈 also re-renders on lang change
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          />
        </AnimatePresence>
      </div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* 🔹 Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${slides[index].title}-${lang}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10 text-white px-4 sm:px-8 max-w-[1000px]"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {slides[index].title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            {slides[index].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 🔹 Buttons */}
      <div
        key={lang} // 👈 forces re-render when language changes
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[15]"
      >
        <HeroButtons
          key={lang} // 👈 extra safety for Framer caches
          primaryText={t.hero.cta1}
          secondaryText={t.hero.cta2}
        />
      </div>

      {/* 🔹 Dots navigation */}
      <div className="absolute bottom-6 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition ${i === index ? "bg-white scale-110" : "bg-gray-500/50"
              }`}
          />
        ))}
      </div>

      {/* 🔹 Swipe gestures for mobile/tablet */}
      <motion.div
        className="absolute inset-0 z-10"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, { offset }) => handleSwipe(offset.x)}
      />
    </section>
  );
}
