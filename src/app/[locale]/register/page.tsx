"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLanguageContext } from "@/contexts/LanguageContext";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁️ Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguageContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== repeatPassword) {
      setErrorMsg(t.register.mismatch);
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(t.register.mustAgree);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(t.register.success);
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setAgreeTerms(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white mt-20 sm:mt-24 md:mt-28">
      <div className="bg-[#0B1E2E] p-10 rounded-xl shadow-lg w-[90%] max-w-md text-center border border-white/10">
        <h2 className="text-2xl font-semibold mb-8">{t.register.title}</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 text-left">
          <input
            type="email"
            placeholder={t.register.email}
            className="bg-[#0F2A3E] border border-gray-700 rounded-md p-2 text-white focus:border-[#30C493] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password field with icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.register.password}
              className="bg-[#0F2A3E] border border-gray-700 rounded-md p-2 pr-10 text-white focus:border-[#30C493] focus:outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-[#30C493]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Repeat password field with icon */}
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder={t.register.repeatPassword}
              className="bg-[#0F2A3E] border border-gray-700 rounded-md p-2 pr-10 text-white focus:border-[#30C493] focus:outline-none w-full"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-[#30C493]"
            >
              {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* ✅ Terms Checkbox */}
          <label className="flex items-center text-gray-400 text-sm gap-2 mt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="accent-[#30C493] w-4 h-4 cursor-pointer"
              required
            />
            <span>
              {t.register.agreePrefix}{" "}
              <Link
                href={`/${locale}/terms`}
                className="text-[#30C493] hover:underline"
              >
                {t.register.terms}
              </Link>{" "}
              {t.register.and}{" "}
              <Link
                href={`/${locale}/privacy`}
                className="text-[#30C493] hover:underline"
              >
                {t.register.privacy}
              </Link>
              .
            </span>
          </label>

          {errorMsg && (
            <div className="bg-red-900/40 border border-red-500/40 text-red-300 rounded-md p-3 text-sm text-left animate-fadeIn">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-900/30 border border-green-500/40 text-green-300 rounded-md p-3 text-sm text-left animate-fadeIn">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !agreeTerms}
            className={`w-full font-semibold py-2 rounded-md transition ${
              loading || !agreeTerms
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#30C493] hover:bg-[#28A77B] text-white"
            }`}
          >
            {loading ? t.register.creating : t.register.button}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          {t.register.haveAccount}{" "}
          <Link
            href={`/${locale}/login`}
            className="text-[#30C493] hover:underline"
          >
            {t.register.login}
          </Link>
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
      `}</style>
    </div>
  );
}
