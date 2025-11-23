"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SecurityPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguageContext();

  const [loading, setLoading] = useState(false);

  // Reset Password
  const [message, setMessage] = useState<string | null>(null);

  // Delete
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [agreeDelete, setAgreeDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set Password
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewPass2, setShowNewPass2] = useState(false);
  const [setPassMessage, setSetPassMessage] = useState<string | null>(null);
  // NEW → allow Set Password only for Google users
  const [canSetPassword, setCanSetPassword] = useState(false);


  // --- Password reset (send email)
  const handlePasswordReset = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) return setMessage(t.security.noEmail);

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/reset-password`,
    });

    if (error) {
      console.warn("Supabase warning:", error.message);
      setMessage(t.security.resetError);
    } else {
      setMessage(t.security.resetSent);
    }

    setLoading(false);
  };

  // --- Delete account
  const handleDeleteAccount = async () => {
    setError(null);
    setMessage(null);

    if (!password || !repeatPassword) {
      setError(t.security.passwordMissing);
      return;
    }

    if (password !== repeatPassword) {
      setError(t.security.passwordMismatch);
      return;
    }

    if (!agreeDelete) {
      setError(t.security.mustConfirmDelete);
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      setError(t.security.noActiveUser);
      setLoading(false);
      return;
    }

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (reauthError) {
      setError(t.security.incorrectPassword);
      setLoading(false);
      return;
    }

    const { error: deleteError } = await supabase.rpc("delete_user_account");

    if (deleteError) {
      setError(t.security.deleteError);
    } else {
      setMessage(t.security.deleteSuccess);
      await supabase.auth.signOut();
      setTimeout(() => router.push(`/${locale}`), 2500);
    }

    setLoading(false);
  };

  // NEW — Detect if user already has an email/password login
  useEffect(() => {
    const checkProvider = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const hasPasswordProvider = user.identities?.some(
        (id) => id.provider === "email"
      );

      // If user has email provider → they already set a password
      setCanSetPassword(!hasPasswordProvider);
    };

    checkProvider();
  }, []);


  return (
    <div className="min-h-screen bg-[#07111C] text-white px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
        {t.security.title}
      </h1>
      <p className="text-gray-400 mb-8 max-w-xl">{t.security.description}</p>

      <div className="space-y-6 max-w-md">
        {/* RESET PASSWORD */}
        <button
          onClick={handlePasswordReset}
          disabled={loading}
          className="w-full py-3 rounded-md bg-gradient-to-r from-green-500 to-blue-500 font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
        >
          {t.security.changePassword}
        </button>

        {/* SET PASSWORD (NEW) — only for Google users */}
        {canSetPassword && (
          <button
            onClick={() => setShowSetPassword(true)}
            disabled={loading}
            className="w-full py-3 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {t.security.setPassword.button}
          </button>
        )}

        {/* DELETE ACCOUNT */}
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className="w-full py-3 rounded-md bg-gradient-to-r from-red-500 to-pink-600 font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
        >
          {t.security.deleteAccount}
        </button>

        {message && <p className="text-sm text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-sm text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {/* DELETE ACCOUNT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0b1423] border border-[#13304f] rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(0,200,255,0.15)] text-center">
            <h2 className="text-xl font-semibold mb-3 text-red-400">
              {t.security.confirmDeletionTitle}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{t.security.confirmDeletionText}</p>

            {/* Password Field */}
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.security.password}
                className="w-full p-2 pr-10 bg-[#0F2A3E] border border-gray-700 rounded-md text-white focus:border-[#30C493] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#30C493]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Repeat Password Field */}
            <div className="relative mb-4">
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder={t.security.repeatPassword}
                className="w-full p-2 pr-10 bg-[#0F2A3E] border border-gray-700 rounded-md text-white focus:border-[#30C493] focus:outline-none"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#30C493]"
              >
                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm checkbox */}
            <label className="flex items-start text-gray-400 text-sm gap-2 mb-4 text-left">
              <input
                type="checkbox"
                checked={agreeDelete}
                onChange={(e) => setAgreeDelete(e.target.checked)}
                className="accent-red-500 mt-1 w-4 h-4 cursor-pointer"
              />
              <span>{t.security.confirmCheckbox}</span>
            </label>

            {error && (
              <div className="bg-red-900/40 border border-red-500/40 text-red-300 rounded-md p-2 text-sm mb-3">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPassword("");
                  setRepeatPassword("");
                  setError(null);
                  setAgreeDelete(false);
                }}
                className="px-5 py-2 rounded-md border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-all duration-200"
              >
                {t.security.cancel}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading || !agreeDelete}
                className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${loading || !agreeDelete
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-pink-500 hover:opacity-90"
                  }`}
              >
                {loading ? t.security.deleting : t.security.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SET PASSWORD MODAL */}
      {showSetPassword && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0b1423] border border-[#13304f] rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(0,200,255,0.15)] text-center">
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">
              {t.security.setPassword.title}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {t.security.setPassword.text}
            </p>

            {/* New Password */}
            <div className="relative mb-3">
              <input
                type={showNewPass ? "text" : "password"}
                placeholder={t.security.setPassword.newPassword}
                className="w-full p-2 pr-10 bg-[#0F2A3E] border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-yellow-400"
              >
                {showNewPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Repeat */}
            <div className="relative mb-4">
              <input
                type={showNewPass2 ? "text" : "password"}
                placeholder={t.security.setPassword.repeatPassword}
                className="w-full p-2 pr-10 bg-[#0F2A3E] border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:outline-none"
                value={newPass2}
                onChange={(e) => setNewPass2(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPass2(!showNewPass2)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-yellow-400"
              >
                {showNewPass2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {setPassMessage && (
              <div className="text-sm mb-4 text-center text-yellow-300">
                {setPassMessage}
              </div>
            )}

            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={() => {
                  setShowSetPassword(false);
                  setNewPass("");
                  setNewPass2("");
                  setSetPassMessage(null);
                }}
                className="px-5 py-2 rounded-md border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-all duration-200"
              >
                {t.security.cancel}
              </button>

              <button
                onClick={async () => {
                  setSetPassMessage(null);

                  if (!newPass || !newPass2) {
                    setSetPassMessage(t.security.setPassword.fillBoth);
                    return;
                  }
                  if (newPass !== newPass2) {
                    setSetPassMessage(t.security.setPassword.mismatch);
                    return;
                  }
                  if (newPass.length < 10) {
                    setSetPassMessage(t.security.setPassword.short);
                    return;
                  }

                  const { error } = await supabase.auth.updateUser({
                    password: newPass,
                  });

                  if (error) {
                    setSetPassMessage(t.security.setPassword.error);
                  } else {
                    setSetPassMessage(t.security.setPassword.success);

                    setTimeout(() => {
                      setShowSetPassword(false);
                      setNewPass("");
                      setNewPass2("");
                      setSetPassMessage(null);
                      // NEW — hide button forever after first password creation
                      setCanSetPassword(false);
                    }, 1500);

                  }
                }}
                className="px-5 py-2 rounded-md font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 transition-all duration-300"
              >
                {t.security.setPassword.button}
              </button>
            </div>
          </div>
        </div>
      )}

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
