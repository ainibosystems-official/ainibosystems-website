"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function CheckoutResultPage() {
  const { t } = useLanguageContext();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";

  const isSuccess = status === "success";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0C1D2F] via-[#0C1D2F]/95 to-[#0E2235] text-white overflow-hidden px-6">
      {/* Decorative circles */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#2370BC]/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#30C493]/10 rounded-full blur-[180px]" />

      {/* Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(35,112,188,0.3)] rounded-3xl p-10 max-w-md w-full text-center"
      >
        <div className="flex flex-col items-center gap-6">
          {isSuccess ? (
            <CheckCircle2
              className="w-20 h-20 text-[#30C493]"
              strokeWidth={2.5}
            />
          ) : (
            <XCircle className="w-20 h-20 text-red-500" strokeWidth={2.5} />
          )}

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#30C493] to-[#2370BC] bg-clip-text text-transparent drop-shadow-lg">
              {isSuccess
                ? t.checkoutResult.titleSuccess
                : t.checkoutResult.titleFailed}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-[80%] mx-auto leading-relaxed">
              {isSuccess
                ? t.checkoutResult.messageSuccess
                : t.checkoutResult.messageFailed}
            </p>
          </div>

          <Link
            href="/"
            className="inline-block mt-4 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#30C493] to-[#2370BC] hover:opacity-90 hover:scale-[1.03] active:scale-95 transition-all duration-300 text-white shadow-lg"
          >
            {t.checkoutResult.backHome}
          </Link>
        </div>
      </motion.div>

      {/* Support footer */}
      <div className="relative z-10 mt-12 text-center text-gray-400 text-sm">
        <p>
          {t.checkoutResult.needHelp}{" "}
          <Link
            href="/#Contact"
            className="text-[#30C493] hover:text-[#2370BC] transition-colors"
          >
            {t.checkoutResult.contact}
          </Link>
        </p>
      </div>
    </main>
  );
}
