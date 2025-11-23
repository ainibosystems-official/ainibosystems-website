"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { CreditCard, ShieldCheck, Banknote, ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { t, lang } = useLanguageContext();
  const router = useRouter();

  // ✅ Default order state
  const [order, setOrder] = useState({
    amount: 0,
    currency: "USD",
    reference: "",
    country: "BG",
    vatId: "",
    total: 0,
  });

  // ✅ EU country check (same as generator)
  const isEUCountry = (code: string) => {
    const euCountries = [
      "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE",
      "IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"
    ];
    return euCountries.includes(code.toUpperCase());
  };

  // ✅ VAT calculation logic (identical to generator)
  const calculateVAT = (amount: number, country: string, vatId: string): number => {
    if (isNaN(amount) || amount <= 0) return 0;

    if (isEUCountry(country)) {
      if (country === "BG") return amount * 0.2;     // BG always with VAT
      if (vatId.trim()) return 0;                    // EU Business (reverse charge)
      return amount * 0.2;                           // EU consumer
    } else {
      return 0;                                      // Non-EU
    }
  };

  const getVATLabel = (country: string, vatId: string): string => {
    if (isEUCountry(country)) {
      if (country === "BG") return "Includes 20% Bulgarian VAT";
      if (vatId.trim()) return "EU Business (VAT 0% Reverse Charge)";
      return "Includes 20% EU VAT";
    } else {
      return "VAT 0% (Export outside EU)";
    }
  };

  // ✅ Read parameters from URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const amount = query.get("amount");
    const currency = query.get("currency") || "USD";
    const ref = query.get("ref");
    const country = query.get("country") || "BG";
    const vatId = query.get("vatId") || "";
    const total = query.get("total");

    // Generate fallback reference
    let finalRef = ref;
    if (!finalRef) {
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomPart = Math.floor(Math.random() * 900 + 100);
      finalRef = `AINI-${datePart}-${randomPart}`;
    }

    setOrder({
      amount: amount ? parseFloat(amount) : 0,
      currency,
      reference: finalRef,
      country,
      vatId,
      total: total ? parseFloat(total) : 0,
    });
  }, []);

  // ✅ Stripe
  const handleStripeCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(order.amount * 100),
          currency: order.currency.toLowerCase(),
          reference: order.reference,
        }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else console.error("No checkout URL returned:", data);
    } catch (err) {
      console.error("❌ Stripe Checkout Error:", err);
    }
  };

  // ✅ PayPal
  const handlePayPal = async () => {
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.amount.toFixed(2),
          currency: order.currency,
          reference: order.reference,
        }),
      });

      const data = await res.json();

      if (data.approveUrl) {
        window.location.href = data.approveUrl;
      } else {
        alert("⚠️ Failed to retrieve PayPal approval link.");
        console.error("Server response:", data);
      }
    } catch (err) {
      console.error("💥 PayPal Checkout Error:", err);
      alert("❌ Something went wrong while creating the PayPal order.");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#06111C] to-[#0C1D2F] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/background/grid.svg')] opacity-[0.04]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0A1A28]/70 to-black/90" />

      <div className="relative z-10 flex flex-col items-center justify-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent mb-12 leading-[1.35]"
        >
          AiNiBo Payment
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* 🧾 Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">{t.checkout.orderSummary.title}</h2>

            {(() => {
              const amount = Number(order.amount) || 0;
              const total = Number(order.total) || amount;
              const vat = calculateVAT(amount, order.country, order.vatId);
              const currency = order.currency?.toUpperCase() || "EUR";
              const vatLabel = getVATLabel(order.country, order.vatId);

              return (
                <div className="space-y-3 text-gray-200">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span>Custom Project</span>
                    <span>{currency} {amount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span>Reference Number</span>
                    <span>{order.reference || "—"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-3 text-sm">
                    <span>Customer Country</span>
                    <span>{order.country || "—"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-3 text-sm">
                    <span>VAT ID</span>
                    <span>{order.vatId || "—"}</span>
                  </div>

                  {/* VAT */}
                  <div className="flex justify-between border-b border-white/10 pb-3 text-sm text-gray-300">
                    <span>{vat > 0 ? "VAT (20%)" : "VAT (0%)"}</span>
                    <span>{currency} {vat.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-[#30C493] pt-3">
                    <span>Total</span>
                    <span>{currency} {total.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-gray-400 mt-3 italic">{vatLabel}</p>
                </div>
              );
            })()}
          </motion.div>

          {/* 💳 Payment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">{t.checkout.payment.title}</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {["/logos/visa.svg", "/logos/mastercard.svg", "/logos/applepay.svg", "/logos/googlepay.svg"].map(
                (src) => (
                  <img key={src} src={src} alt="Payment method" className="h-6 sm:h-7 opacity-75 hover:opacity-100 transition-all" />
                )
              )}
            </div>

            <button
              onClick={handleStripeCheckout}
              className="w-full py-4 bg-[#30C493] hover:bg-[#2370BC] rounded-xl text-white font-semibold text-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_0_25px_#30C49355]"
            >
              <CreditCard size={22} /> {t.checkout.payment.button}
            </button>

            <button
              onClick={handlePayPal}
              className="w-full mt-4 py-4 bg-[#FFC439] hover:bg-[#d89e00] rounded-xl text-gray-900 font-semibold text-lg transition-all duration-300 flex justify-center items-center shadow-[0_0_25px_#ffc43988]"
            >
              <Image src="/logos/paypal.svg" alt="PayPal" width={120} height={32} className="object-contain" />
            </button>

            <div className="mt-10 text-left text-gray-200 text-sm">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Banknote size={18} /> {t.checkout.bank.title}
              </h3>
              <p>{t.checkout.bank.accountName}: AiNiBo Systems Ltd.</p>
              <p>IBAN: BG91UNCR70001526206617</p>
              <p>BIC/SWIFT: UNCRBGSF</p>
              <p>{t.checkout.bank.bank}: UniCredit Bulbank AD</p>
              <p>{t.checkout.bank.reference}: {order.reference}</p>
              <p className="mt-3 italic">{t.checkout.bank.notice}</p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => router.push(`/${lang}/#Contact`)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <ShieldCheck size={18} /> {t.checkout.payment.help}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
          <Lock size={16} className="text-[#30C493]" />
          <p>{t.checkout.payment.secure}</p>
        </div>

        <div className="mt-10">
          <button
            onClick={() => router.push(`/${lang}/pre-checkout`)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
          >
            <ArrowLeft size={16} /> {t.checkout.back}
          </button>
        </div>
      </div>
    </main>
  );
}
