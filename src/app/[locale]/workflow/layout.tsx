// src/app/[locale]/workflow/layout.tsx

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Do NOT wrap with <html> or <body>
  return <>{children}</>;
}
