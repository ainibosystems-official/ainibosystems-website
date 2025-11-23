"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguageContext();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) setStatus("sent");
      else throw new Error("Email not sent");
    } catch (err) {
      console.error("❌ Contact error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="Contact" className="relative w-full py-24 px-6 sm:px-10 lg:px-24 bg-gradient-to-b from-[#07111C] to-[#0D1E2F] text-white mt-[-100px]">
      {/* 🔹 Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-extrabold leading-[1.3] bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
          {t.contact.title}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
          {t.contact.subtitle}
        </p>
      </div>

      {/* 🔹 Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1500px] mx-auto text-center">

        {/* 💬 Chat Bubble */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-[#30C493]/30 transition-all"
        >
          <div className="absolute -inset-4 blur-[80px] bg-gradient-to-r from-[#30C493]/20 to-[#2370BC]/20 -z-10 rounded-2xl"></div>
          <MessageCircle size={50} className="text-[#30C493] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-[#30C493]">
            {t.contact.chatTitle}
          </h3>
          <p className="text-gray-300 mb-6">{t.contact.chatText}</p>
          <button
            onClick={() => document.getElementById("nibo-toggle")?.click()}
            className="bg-[#2370BC] hover:bg-[#30C493] text-white font-medium py-2 px-6 rounded-xl transition-all duration-200"
          >
            {t.contact.chatButton}
          </button>
        </motion.div>

        {/* 🛒 Order via Platforms */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-[#30C493]/30 transition-all"
        >
          <div className="absolute -inset-4 blur-[80px] bg-gradient-to-r from-[#2370BC]/20 to-[#30C493]/20 -z-10 rounded-2xl"></div>
          <ShoppingCart size={50} className="text-[#2370BC] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-[#30C493]">
            {t.contact.platformTitle}
          </h3>
          <p className="text-gray-300 mb-6">{t.contact.platformText}</p>

          <div className="flex justify-center items-baseline gap-7 mt-6">
            <a
              href="https://www.fiverr.com/s/YR1qkRK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all"
            >
              <Image
                src="/logos/fiverr.svg"
                alt="Fiverr"
                width={61}
                height={23}
                className="object-contain translate-y-[3px]"
              />
            </a>

            <a
              href="https://www.upwork.com/agencies/1980796097603262827/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all"
            >
              <Image
                src="/logos/upwork.svg"
                alt="Upwork"
                width={100}
                height={36}
                className="object-contain translate-y-[-8px]"
              />
            </a>

            <a
              href="https://www.freelancer.com/u/NikolayBZ/AiNiBo-Systems-Ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all"
            >
              <Image
                src="/logos/freelancer.svg"
                alt="Freelancer"
                width={110}
                height={34}
                className="object-contain translate-y-[-8px]"
              />
            </a>
          </div>
        </motion.div>

        {/* ✉️ Email Contacts */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-[#30C493]/30 transition-all"
        >
          <div className="absolute -inset-4 blur-[80px] bg-gradient-to-r from-[#30C493]/20 to-[#2370BC]/20 -z-10 rounded-2xl"></div>
          <Mail size={50} className="text-[#30C493] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-[#30C493]">
            {t.contact.emailTitle}
          </h3>
          <p className="text-gray-300 mb-4">{t.contact.businessText}</p>
          <a href="mailto:contact@ainibosystems.com" className="text-[#30C493] hover:text-[#2370BC] font-medium transition">
            contact@ainibosystems.com
          </a>
          <p className="text-gray-300 mt-4">{t.contact.supportText}</p>
          <a href="mailto:info@ainibosystems.com" className="text-[#30C493] hover:text-[#2370BC] font-medium transition">
            info@ainibosystems.com
          </a>
        </motion.div>
      </div>

      {/* 🔹 Social Media Links */}
      <div className="flex justify-center items-center gap-8 mt-24">
        {[
          { href: "https://www.facebook.com/AiNiBoSystems/", icon: "/logos/facebook.svg", alt: "Facebook" },
          { href: "https://www.instagram.com/ainibosystems/", icon: "/logos/instagram.svg", alt: "Instagram" },
          { href: "https://x.com/AiNiBoSystems", icon: "/logos/x.svg", alt: "X (Twitter)" },
          { href: "https://youtube.com/@AiNiBoSystems", icon: "/logos/youtube.svg", alt: "YouTube" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            className="opacity-70 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={social.icon}
              alt={social.alt}
              width={38}
              height={38}
              className="object-contain"
            />
          </motion.a>
        ))}
      </div>


      {/* 💌 Quick Contact Form */}
      <div className="max-w-3xl mx-auto mt-24 bg-white/10 border border-white/10 rounded-2xl p-10 backdrop-blur-xl shadow-xl">
        <h3 className="text-3xl font-semibold text-[#30C493] text-center mb-6">
          {t.contact.quickFormTitle}
        </h3>
        <p className="text-gray-300 text-center mb-10">
          {t.contact.quickFormSubtitle}
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const interest = formData.get("interest");
            const budget = formData.get("budget");
            const contactMethod = formData.get("contactMethod");
            const message = formData.get("message");

            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                phone,
                interest,
                budget,
                contactMethod,
                message,
              }),
            });

            let data: any = {};
            try {
              data = await res.clone().json();
            } catch {
              /* ignore */
            }

            if (res.ok && data?.success) {
              alert("✅ Your message has been sent successfully!");
              e.currentTarget.reset();
              return;
            }

            if (res.status === 500) {
              alert("⚙️ Message not sent (server error). Works only on live site.");
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
              placeholder={t.contact.placeholders.name}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t.contact.placeholders.email}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
            />
          </div>

          {/* Phone (optional) */}
          <input
            name="phone"
            type="tel"
            placeholder={t.contact.placeholders.phone}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
          />

          {/* Interest */}
          <div>
            <label className="block text-gray-300 mb-2">
              {t.contact.labels.interest}
            </label>
            <select
              name="interest"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#30C493]"
            >
              <option value="">{t.contact.options.interest[0]}</option>
              <option>{t.contact.options.interest[1]}</option>
              <option>{t.contact.options.interest[2]}</option>
              <option>{t.contact.options.interest[3]}</option>
              <option>{t.contact.options.interest[4]}</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-300 mb-2">
              {t.contact.labels.budget}
            </label>
            <select
              name="budget"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#30C493]"
            >
              <option value="">{t.contact.options.budget[0]}</option>
              <option>{t.contact.options.budget[1]}</option>
              <option>{t.contact.options.budget[2]}</option>
              <option>{t.contact.options.budget[3]}</option>
            </select>
          </div>

          {/* Preferred Contact */}
          <div>
            <label className="block text-gray-300 mb-2">
              {t.contact.labels.contactMethod}
            </label>
            <select
              name="contactMethod"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#30C493]"
            >
              <option value="">{t.contact.options.contact[0]}</option>
              <option>{t.contact.options.contact[1]}</option>
              <option>{t.contact.options.contact[2]}</option>
              <option>{t.contact.options.contact[3]}</option>
            </select>
          </div>

          {/* Message */}
          <textarea
            name="message"
            required
            placeholder={t.contact.placeholders.message}
            rows={5}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#30C493]"
          ></textarea>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#2370BC] hover:bg-[#30C493] font-medium text-white py-3 px-8 rounded-xl transition-all duration-300"
            >
              {t.contact.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
