"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/contexts/SessionProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSession();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.warn("🚫 No session found — redirecting to login");
        router.replace(`/${locale}/login`);
      } else {
        console.log("✅ User authenticated:", user.email);
      }
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Checking session...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
