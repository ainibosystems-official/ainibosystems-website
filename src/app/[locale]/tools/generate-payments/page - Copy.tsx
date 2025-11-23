"use client";

import { useState } from "react";

export default function GeneratePaymentLink() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [ref, setRef] = useState("");

  const generateLink = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("❌ Please enter a valid amount.");
      return;
    }

    const finalRef =
      ref ||
      `AINI-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${Math.floor(Math.random() * 900 + 100)}`;

    // ✅ Add /en by default
    const link = `https://ainibosystems.com/en/checkout?amount=${amount}&currency=${currency}&ref=${finalRef}`;

    navigator.clipboard.writeText(link);
    alert(`✅ Payment link copied:\n${link}`);
  };

  return (
    <main className="min-h-screen bg-[#0C1D2F] text-white flex flex-col justify-center items-center gap-6 px-4">
      <h1 className="text-3xl font-bold">Generate Payment Link</h1>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <input
          type="number"
          placeholder="Amount (e.g. 490)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>

        <input
          type="text"
          placeholder="Reference (optional)"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        />

        <button
          onClick={generateLink}
          className="mt-3 bg-[#30C493] hover:bg-[#2370BC] rounded-xl py-3 font-semibold transition-all duration-300 shadow-[0_0_20px_#30C49380]"
        >
          Generate Payment Link
        </button>
      </div>
    </main>
  );
}
