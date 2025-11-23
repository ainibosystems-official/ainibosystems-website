"use client";

import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

type HeroButtonsProps = {
  primaryText: string;
  secondaryText: string;
};

export default function HeroButtons({
  primaryText,
  secondaryText,
}: HeroButtonsProps) {
  const { lang } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Smooth scroll helper for same-page anchors
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    // If we're already on the homepage, scroll
    if (pathname === `/${lang}`) {
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to homepage then scroll after a delay
      router.push(`/${lang}`);
      setTimeout(() => {
        const newElement = document.getElementById(targetId);
        newElement?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <div
      key={lang}
      className="flex flex-wrap justify-center gap-5 mt-10"
    >
      {/* 🔹 See Agency (scroll to agency-video in homepage) */}
      <Link
        href={`/${lang}/#agency-video`}
        onClick={(e) => handleAnchorClick(e, "agency-video")}
        scroll={false}
        className="
    w-34 sm:w-36 md:w-44 lg:w-52
    px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3
    rounded-xl font-medium text-white 
    text-sm sm:text-base md:text-lg
    bg-gradient-to-r from-[#30C493] to-[#2370BC]
    hover:opacity-90 hover:scale-[1.03]
    active:scale-95 transition-all duration-300 shadow-lg text-center
  "
      >
        {primaryText}
      </Link>

      {/* 🔹 See Bots (go to workflow page, scroll to bots-video) */}
      <Link
        href={`/${lang}/workflow#bots-video`}
        onClick={(e) => {
          e.preventDefault();
          if (pathname.includes("/workflow")) {
            const el = document.getElementById("bots-video");
            el?.scrollIntoView({ behavior: "smooth" });
          } else {
            router.push(`/${lang}/workflow`);
            setTimeout(() => {
              const el = document.getElementById("bots-video");
              el?.scrollIntoView({ behavior: "smooth" });
            }, 400);
          }
        }}
        scroll={false}
        className="
    w-34 sm:w-36 md:w-44 lg:w-52
    px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3
    rounded-xl font-medium 
    text-gray-900 bg-white/90 hover:bg-white 
    hover:scale-[1.03] active:scale-95 
    text-sm sm:text-base md:text-lg
    transition-all duration-300 shadow-lg text-center
  "
      >
        {secondaryText}
      </Link>
    </div>
  );
}
