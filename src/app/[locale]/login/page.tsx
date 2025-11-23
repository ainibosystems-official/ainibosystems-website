"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@/contexts/SessionProvider";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, loading } = useSession();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguageContext();

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [user, loading, router, locale]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(t.login.invalidCredentials);
    } else {
      router.replace(`/${locale}/dashboard`);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        {t.login.loading}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white mt-20 sm:mt-24 md:mt-28">
      <div className="bg-[#0B1E2E] p-10 rounded-xl shadow-lg w-[90%] max-w-md text-center border border-white/10">
        <h2 className="text-2xl font-semibold mb-8">{t.login.welcome}</h2>

        {/* 🔹 Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-2.5 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} />
          {t.login.google}
        </button>

        {/* 🔹 Divider */}
        <div className="flex items-center my-6 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="mx-3">{t.login.orEmail}</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* 🔹 Email/Password Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t.login.email}
            className="bg-[#0F2A3E] border border-gray-700 rounded-md p-2 text-white focus:border-[#30C493] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 👁️ Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.login.password}
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

          {/* ❌ Error Message */}
          {errorMsg && (
            <div className="bg-red-900/40 border border-red-500/40 text-red-300 rounded-md p-3 text-sm text-left animate-fadeIn">
              {errorMsg}
              <div className="mt-2">
                <Link
                  href={`/${locale}/register`}
                  className="text-[#30C493] font-semibold hover:underline"
                >
                  {t.login.registerCTA}
                </Link>
              </div>
            </div>
          )}

          {/* ✅ Login Button */}
          <button
            type="submit"
            className="w-full bg-[#30C493] hover:bg-[#28A77B] text-white font-semibold py-2 rounded-md transition"
          >
            {t.login.button}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          {t.login.noAccount}{" "}
          <Link href={`/${locale}/register`} className="text-[#30C493] hover:underline">
            {t.login.register}
          </Link>
        </p>
      </div>

      {/* Fade animation */}
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
