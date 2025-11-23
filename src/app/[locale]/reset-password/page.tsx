"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params?.locale || "en";
  const { t } = useLanguageContext();

  // 🧠 Ensure Supabase sees the access_token in the URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const parsed = Object.fromEntries(new URLSearchParams(hash.substring(1)));
      if (parsed.access_token) {
        supabase.auth.setSession({
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token,
        });
      }
    }
  }, []);

  // 🧩 Handle reset
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!password || !confirmPassword) {
      setMessage(t.resetPassword.fillBoth);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t.resetPassword.mismatch);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Supabase password reset error:", error.message);
      setMessage(t.resetPassword.error);
    } else {
      setMessage(t.resetPassword.success);
      setTimeout(() => router.push(`/${locale}/login`), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07111C] text-white px-4">
      <div className="max-w-md w-full bg-[#0D1828] border border-[#15304D] rounded-2xl p-8 shadow-[0_0_35px_rgba(0,170,255,0.1)]">
        <h1 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300">
          {t.resetPassword.title}
        </h1>
        <p className="text-gray-400 mb-8">{t.resetPassword.subtitle}</p>

        <form onSubmit={handleReset} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.resetPassword.newPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-10 rounded-md bg-[#0b1423] border border-[#1a2b42] focus:ring-2 focus:ring-green-400 focus:outline-none text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-[#30C493]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t.resetPassword.repeatPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-10 rounded-md bg-[#0b1423] border border-[#1a2b42] focus:ring-2 focus:ring-green-400 focus:outline-none text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-[#30C493]"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 font-semibold rounded-md hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? t.resetPassword.updating : t.resetPassword.button}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-sm text-center ${
              message.startsWith("✅")
                ? "text-green-400"
                : message.startsWith("❌")
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} AiNiBo Systems — Automated Solutions
        </p>
      </div>
    </div>
  );
}
