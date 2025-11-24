// src/app/[locale]/are-we-hiring/layout.tsx

export const metadata = {
  title: "Are We Hiring? | AiNiBo Systems",
  description: "Explore open positions and join the AiNiBo Systems team.",
};

export default function AreWeHiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Do NOT include <html> or <body> tags here
  return <>{children}</>;
}

