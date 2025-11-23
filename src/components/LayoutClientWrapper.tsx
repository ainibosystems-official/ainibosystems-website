"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

// ✅ import the provider
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // ✅ wrap the entire layout tree
    <LanguageProvider>
      <Header onToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <main className="relative z-10">{children}</main>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <Footer />
      <ChatbotWidget />
    </LanguageProvider>
  );
}
