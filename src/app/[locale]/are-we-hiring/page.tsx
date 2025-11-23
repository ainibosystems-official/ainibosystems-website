"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function AreWeHiringPage() {
  const { t } = useLanguageContext();

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#06111C] to-[#0C1D2F] text-white overflow-hidden">
      {/* 🔹 Background Overlay */}
      <div className="absolute inset-0 bg-[url('/images/background/network-bg.webp')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0A1A28]/70 to-black/80"></div>

      {/* 🔹 Glass Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6 sm:px-10 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl w-full bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* 🔹 Hero / Intro */}
          <div className="p-10 border-b border-white/10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-6 leading-[1.3]">
              {t.hiring.title}
            </h1>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {t.hiring.paragraph1}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t.hiring.paragraph2}
            </p>
          </div>

          {/* 💌 Hiring Form */}
          <div className="p-10 text-left">
            <h3 className="text-3xl font-semibold text-[#30C493] text-center mb-6">
              {t.hiring.formTitle}
            </h3>
            <p className="text-gray-300 text-center mb-10">
              {t.hiring.formSubtitle}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);
                const name = formData.get("name");
                const email = formData.get("email");
                const area = formData.get("area");
                const portfolio = formData.get("portfolio");
                const message = formData.get("message");

                const res = await fetch("/api/hiring", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, area, portfolio, message }),
                });

                let data: any = {};
                try {
                  data = await res.clone().json();
                } catch {
                  /* ignore */
                }

                if (res.ok && data?.success) {
                  alert("✅ Application sent successfully!");
                  e.currentTarget.reset();
                  return;
                }

                if (res.status === 500) {
                  alert(
                    "⚙️ Application not sent (server error). Works only on live site."
                  );
                } else {
                  alert("❌ Something went wrong. Please try again later.");
                }
              }}
              className="space-y-6"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={t.hiring.placeholders.name}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t.hiring.placeholders.email}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
                />
              </div>

              {/* Area of Expertise */}
              <div>
                <label className="block text-gray-300 mb-2">
                  {t.hiring.labels.area}
                </label>
                <select
                  name="area"
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#30C493]"
                >
                  <option value="">{t.hiring.options.area[0]}</option>
                  <option>{t.hiring.options.area[1]}</option>
                  <option>{t.hiring.options.area[2]}</option>
                  <option>{t.hiring.options.area[3]}</option>
                  <option>{t.hiring.options.area[4]}</option>
                </select>
              </div>

              {/* Portfolio */}
              <input
                name="portfolio"
                type="url"
                placeholder={t.hiring.placeholders.portfolio}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
              />

              {/* Message */}
              <textarea
                name="message"
                required
                placeholder={t.hiring.placeholders.message}
                rows={5}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
              ></textarea>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#2370BC] hover:bg-[#30C493] font-medium text-white py-3 px-8 rounded-xl transition-all duration-300"
                >
                  {t.hiring.submit}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contact shortcut */}
        <div className="text-center mt-10">
          <a
            href="mailto:contact@ainibosystems.com"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#30C493] transition-all"
          >
            <Mail size={18} /> contact@ainibosystems.com
          </a>
        </div>
      </section>
    </main>
  );
}
