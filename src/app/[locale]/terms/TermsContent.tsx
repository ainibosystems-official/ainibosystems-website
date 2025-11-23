"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function TermsContent() {
  const t = useTranslations("legal");

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold text-[#30C493] mb-6">
        {t("termsTitle")}
      </h1>
      <p className="text-sm mb-10">{t("lastUpdated")}</p>

      <section className="space-y-6 text-gray-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-white mt-8">
          1. {t("termsSection1Title")}
        </h2>
        <p>{t("termsSection1Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          2. {t("termsSection2Title")}
        </h2>
        <p>{t("termsSection2Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          3. {t("termsSection3Title")}
        </h2>
        <p>{t("termsSection3Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          4. {t("termsSection4Title")}
        </h2>
        <p>{t("termsSection4Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          5. {t("termsSection5Title")}
        </h2>
        <p className="border-l-4 border-[#30C493] pl-4 italic">
          {t("termsSection5Text")}
        </p>

        <p>{t("termsSection5Extra")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          6. {t("termsSection6Title")}
        </h2>
        <p>{t("termsSection6Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          7. {t("termsSection7Title")}
        </h2>
        <p>
          {t("termsSection7Text")}{" "}
          <a
            href="mailto:contact@ainibosystems.com"
            className="text-[#30C493] underline"
          >
            contact@ainibosystems.com
          </a>
        </p>
      </section>
    </main>
  );
}
