import { Metadata } from "next";

export function generateMetadata(): Metadata {
  const host =
    typeof window !== "undefined"
      ? window.location.hostname
      : process.env.NEXT_PUBLIC_SITE_DOMAIN || "ainibosystems.com";

  const isBg = host.includes("ainibosystems.bg");

  const commonAlternates = {
    canonical: isBg
      ? "https://www.ainibosystems.bg"
      : "https://www.ainibosystems.com",
    languages: {
      en: "https://www.ainibosystems.com",
      bg: "https://www.ainibosystems.bg",
    },
  };

  if (isBg) {
    return {
      title: "AiNiBo Systems – Автоматизирани решения",
      description:
        "AiNiBo Systems създава интелигентни ботове, SaaS платформи и автоматизации с изкуствен интелект, които помагат на бизнесите да растат ефективно и сигурно.",
      keywords: [
        "AiNiBo Systems",
        "AI ботове",
        "търговски ботове",
        "автоматизация",
        "AI разработка",
        "GPT ботове",
        "SaaS автоматизация",
        "автоматизирана търговия",
      ],
      metadataBase: new URL("https://www.ainibosystems.bg"),
      alternates: commonAlternates,
      openGraph: {
        title: "AiNiBo Systems – Автоматизирани решения",
        description:
          "AI базирани решения и търговски ботове, разработени с инженерна прецизност.",
        url: "https://www.ainibosystems.bg",
        siteName: "AiNiBo Systems",
        images: [
          {
            url: "https://www.ainibosystems.bg/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "AiNiBo Systems – Автоматизирани решения",
          },
        ],
        locale: "bg_BG",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "AiNiBo Systems – Автоматизирани решения",
        description:
          "AiNiBo Systems предлага интелигентни автоматизации и ботове за растеж.",
        images: ["https://www.ainibosystems.bg/og-image.jpg"],
      },
    };
  }

  // Default English metadata
  return {
    title: "AiNiBo Systems – Automated Solutions",
    description:
      "AiNiBo Systems builds AI-powered trading bots, SaaS platforms, and intelligent automations that help businesses scale efficiently and securely.",
    keywords: [
      "AiNiBo Systems",
      "AI bots",
      "crypto trading bots",
      "automation agency",
      "AI development",
      "GPT-powered bots",
      "SaaS automation",
      "automated trading",
      "AiNiBo",
    ],
    metadataBase: new URL("https://www.ainibosystems.com"),
    alternates: commonAlternates,
    openGraph: {
      title: "AiNiBo Systems – Automated Solutions",
      description:
        "AI-powered bots, SaaS solutions, and intelligent automations engineered for growth and precision.",
      url: "https://www.ainibosystems.com",
      siteName: "AiNiBo Systems",
      images: [
        {
          url: "https://www.ainibosystems.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AiNiBo Systems – Automated Solutions",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AiNiBo Systems – Automated Solutions",
      description:
        "Explore the future of automation with AiNiBo Systems. AI bots, SaaS, and digital solutions designed for performance.",
      creator: "@AiNiBoSystems",
      images: ["https://www.ainibosystems.com/og-image.jpg"],
    },
  };
}

export const metadata = generateMetadata();
