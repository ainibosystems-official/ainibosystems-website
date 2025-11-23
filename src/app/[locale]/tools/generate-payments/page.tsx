"use client";

import { useState } from "react";

export default function GeneratePaymentLink() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [ref, setRef] = useState("");
  const [country, setCountry] = useState("BG"); // buyer country (for VAT logic)
  const [vatId, setVatId] = useState("");

  const isEUCountry = (code: string) => {
    const euCountries = [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
      "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"
    ];
    return euCountries.includes(code.toUpperCase());
  };

  const calculateTotal = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return 0;

    // VAT logic:
    // - EU consumer → 20% VAT
    // - EU business with VAT ID → 0% (reverse charge)
    // - Non-EU → 0%
    if (isEUCountry(country)) {
      if (country === "BG") return amt * 1.2; // Bulgarian clients always with VAT
      if (vatId.trim()) return amt; // B2B reverse charge
      return amt * 1.2; // EU consumer
    } else {
      return amt; // outside EU
    }
  };

  const generateLink = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      alert("❌ Please enter a valid amount.");
      return;
    }

    const finalRef =
      ref ||
      `AINI-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${Math.floor(Math.random() * 900 + 100)}`;

    const total = calculateTotal().toFixed(2);

    const link = `https://ainibosystems.com/en/checkout?amount=${amount}&currency=${currency}&ref=${finalRef}&country=${country}&vatId=${vatId}&total=${total}`;
    
    navigator.clipboard.writeText(link);
    alert(`✅ Payment link copied:\n${link}`);
  };

  const vatLabel = () => {
    if (!amount) return "";
    if (isEUCountry(country)) {
      if (country === "BG") return "Includes 20% Bulgarian VAT";
      if (vatId.trim()) return "EU Business (VAT 0% Reverse Charge)";
      return "Includes 20% EU VAT";
    } else {
      return "VAT 0% (Export outside EU)";
    }
  };

  return (
    <main className="min-h-screen bg-[#0C1D2F] text-white flex flex-col justify-center items-center gap-6 px-4">
      <h1 className="text-3xl font-bold">Generate Payment Link</h1>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {/* Amount */}
        <input
          type="number"
          placeholder="Amount (e.g. 490)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        />

        {/* Currency */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>

        {/* Country */}
        <input
          type="text"
          placeholder="Customer Country (e.g. BG, DE, US)"
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
          className="p-3 rounded bg-white/10 border border-white/20 uppercase"
          maxLength={2}
        />

        {/* VAT ID */}
        <input
          type="text"
          placeholder="Customer VAT ID (optional)"
          value={vatId}
          onChange={(e) => setVatId(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        />

        {/* Reference */}
        <input
          type="text"
          placeholder="Reference (optional)"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20"
        />

        {/* VAT Info */}
        {amount && (
          <div className="text-gray-300 text-sm mt-2">
            <p>{vatLabel()}</p>
            <p>
              <span className="text-white font-semibold">Total: </span>
              {currency} {calculateTotal().toFixed(2)}
            </p>
          </div>
        )}

        {/* Button */}
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
