"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext"; // ✅ global context hook
import { Eraser } from "lucide-react";

type ChatMessage = {
  from: "user" | "bot";
  text: string;
};

// ✅ Time (in minutes) to keep messages before clearing
const MESSAGE_EXPIRY_MINUTES = 360;

// Helper to clean up expired chats
function loadMessagesWithExpiry() {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("chatMessages");
  if (!saved) return null;

  try {
    const { messages, savedAt } = JSON.parse(saved);
    const now = Date.now();
    if (now - savedAt > MESSAGE_EXPIRY_MINUTES * 60 * 1000) {
      localStorage.removeItem("chatMessages");
      return null;
    }
    return messages;
  } catch {
    return null;
  }
}


export default function ChatbotWidget() {
  const { lang, t } = useLanguageContext(); // ✅ global translation hook
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  // ✅ Initialize chat with current greeting (localized)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Popup confirmation for clearing chat


    if (typeof window !== "undefined") {
      const saved = loadMessagesWithExpiry();
      if (saved && Array.isArray(saved)) {
        return saved as ChatMessage[];
      }
    }
    return [{ from: "bot", text: t.chatbot.greeting }];
  });

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // 🧹 Clear conversation manually
  const clearConversation = () => {
    localStorage.removeItem("chatMessages");
    setMessages([{ from: "bot", text: t.chatbot.greeting }]);
  };


  // ✅ Auto-open NiBo chat on first visit only (Next.js safe)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          const hasGreeted = window.localStorage.getItem("niboGreeted");
          console.log("Checking NiBo greeting state:", hasGreeted);

          if (!hasGreeted) {
            setIsOpen(true); // open chat
            window.localStorage.setItem("niboGreeted", "true");
          }
        }
      } catch (err) {
        console.error("LocalStorage error:", err);
      }
    }, 2000); // 2s delay gives hydration time

    return () => clearTimeout(timer);
  }, []);

  // ✅ Update greeting when language changes
  useEffect(() => {
    setMessages((prev) => {
      // If there are no messages or the first one is bot’s greeting, reset
      if (prev.length === 0 || (prev.length === 1 && prev[0].from === "bot")) {
        return [{ from: "bot", text: t.chatbot.greeting }];
      }
      // Otherwise, keep chat history intact but update greeting text only if it's the bot's first message
      const updated = [...prev];
      if (updated[0]?.from === "bot") {
        updated[0].text = t.chatbot.greeting;
      }
      return updated;
    });
  }, [lang, t]);

  // ✅ Save chat history to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataToSave = {
        messages,
        savedAt: Date.now(),
      };
      localStorage.setItem("chatMessages", JSON.stringify(dataToSave));
    }
  }, [messages]);

  // ✅ Send message handler
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    const userInput = input.trim();
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const botReply: ChatMessage = { from: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Network error. Please try again later." },
      ]);
    }
  };

  return (
    <>

      {/* 💬 Floating NiBo Button */}
      <button
        id="nibo-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#30C493] to-[#2370BC]
                   p-[2px] rounded-full shadow-[0_0_25px_rgba(48,196,147,0.5)] hover:scale-105
                   transition-transform duration-300"
      >
        <div className="bg-[#0A1A28] rounded-full p-2 flex items-center justify-center">
          <img
            src="/logos/nibo-icon.svg"
            alt="NiBo Assistant"
            className="w-10 h-10 rounded-full object-contain hover:drop-shadow-[0_0_10px_rgba(48,196,147,0.8)] transition-all duration-300"
          />
        </div>
      </button>

      {/* 🪄 Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0A1A28]/95 text-white 
                     rounded-2xl shadow-xl backdrop-blur-lg border border-[#30C493]/30 
                     flex flex-col overflow-hidden animate-fadeIn"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#30C493] to-[#2370BC] text-white px-4 py-3 font-semibold">
            <div className="flex items-center gap-2">
              <img src="/logos/nibo-icon.svg" alt="NiBo" className="w-6 h-6 rounded-full" />
              {t.chatbot.title}
            </div>

            <div className="flex items-center gap-3">

              {/* 🧹 Clear chat (vector icon) */}
              <button onClick={() => setShowClearConfirm(true)}
                className="p-1 text-white/70 hover:text-[#30C493] transition"
                title={lang === "bg" ? "Изчистване на разговора" :
                  lang === "de" ? "Gespräch löschen" : "Clear conversation"} >
                <Eraser size={17} strokeWidth={2} /> </button>

              {/* ❌ Close chat */}
              <button

                onClick={() => setIsOpen(false)}
                className="text-sm text-white/70 hover:text-white transition"
                title={
                  lang === "bg"
                    ? "Затвори"
                    : lang === "de"
                      ? "Schließen"
                      : "Close"
                }
              >
                ✕
              </button>
            </div>
          </div>

          {/* 🔹 Clear confirmation popup */}
          {showClearConfirm && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center z-50">
              <div className="bg-[#0B1725] text-white p-6 rounded-2xl shadow-xl w-64 text-center space-y-4 border border-white/10">
                <p className="text-sm">
                  {lang === "bg"
                    ? "Сигурен ли си, че искаш да изчистиш разговора?"
                    : lang === "de"
                      ? "Möchtest du das Gespräch wirklich löschen?"
                      : "Are you sure you want to clear the conversation?"}
                </p>
                <div className="flex justify-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      localStorage.removeItem("chatMessages");
                      setMessages([{ from: "bot", text: t.chatbot.greeting }]);
                      setShowClearConfirm(false);
                    }}
                    className="px-3 py-1.5 text-xs rounded-md bg-[#30C493] text-black hover:bg-[#25a87f] transition"
                  >
                    {lang === "bg"
                      ? "Да, изчисти"
                      : lang === "de"
                        ? "Ja, löschen"
                        : "Yes, clear"}
                  </button>

                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3 py-1.5 text-xs rounded-md bg-gray-700 hover:bg-gray-600 transition"
                  >
                    {lang === "bg"
                      ? "Откажи"
                      : lang === "de"
                        ? "Abbrechen"
                        : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] ${m.from === "user"
                    ? "bg-[#30C493]/30 border border-[#30C493]/40"
                    : "bg-white/10 border border-white/10"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                lang === "bg"
                  ? "Въведете вашето съобщение..."
                  : lang === "de"
                    ? "Nachricht eingeben..."
                    : "Type your message..."
              }
              className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl p-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-gradient-to-r from-[#30C493] to-[#2370BC] hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
