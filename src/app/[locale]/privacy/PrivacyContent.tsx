"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function PrivacyContent() {
  const t = useTranslations("legal");

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold text-[#30C493] mb-6">
        {t("privacyPageTitle")}
      </h1>
      <p className="text-sm mb-10">{t("legalLastUpdated")}</p>

      <section className="space-y-6 text-gray-300 leading-relaxed">
        <p>{t("privacyPageIntro")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          1. {t("privacySection1Title")}
        </h2>
        <p>{t("privacySection1Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          2. {t("privacySection2Title")}
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>{t("privacySection2a")}</li>
          <li>{t("privacySection2b")}</li>
          <li>{t("privacySection2c")}</li>
          <li>{t("privacySection2d")}</li>
          <li>{t("privacySection2e")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">
          3. {t("privacySection3Title")}
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>{t("privacySection3a")}</li>
          <li>{t("privacySection3b")}</li>
          <li>{t("privacySection3c")}</li>
          <li>{t("privacySection3d")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">
          4. {t("privacySection4Title")}
        </h2>
        <p>{t("privacySection4Text")}</p>

        <h2 className="text-xl font-semibold text-white mt-8">
          5. {t("privacySection5Title")}
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>{t("privacySection5a")}</li>
          <li>{t("privacySection5b")}</li>
          <li>{t("privacySection5c")}</li>
          <li>{t("privacySection5d")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">
          6. {t("privacySection6Title")}
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>{t("privacySection6a")}</li>
          <li>{t("privacySection6b")}</li>
          <li>{t("privacySection6c")}</li>
          <li>{t("privacySection6d")}</li>
        </ul>
      </section>
    </main>
  );
}
