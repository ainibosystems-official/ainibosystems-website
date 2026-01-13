import "@/app/globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n/loadMessages";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import { Analytics } from "@vercel/analytics/react";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import CookiebotLoader from "@/components/CookiebotLoader";
import { metadata as siteMetadata } from "../metadata";

export const metadata = siteMetadata;
export const dynamicParams = true;

type Params = Promise<{ locale: string }>;

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "bg" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  const messages = await loadMessages(locale).catch(() => null);

  if (!messages || Object.keys(messages).length === 0) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* 🌍 SEO / Language alternates */}
        <link rel="alternate" href="https://ainibosystems.com/en" hrefLang="en" />
        <link rel="alternate" href="https://ainibosystems.com/de" hrefLang="de" />
        <link rel="alternate" href="https://ainibosystems.com/bg" hrefLang="bg" />
        <link
          rel="alternate"
          href="https://ainibosystems.com/"
          hrefLang="x-default"
        />
      </head>

      <body className="relative min-h-screen text-white bg-[#07111C] pattern-tech">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutClientWrapper>{children}</LayoutClientWrapper>
        </NextIntlClientProvider>

        {/* ✅ Load external scripts after UI */}
        <CookiebotLoader locale={locale} />
        <Analytics />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
