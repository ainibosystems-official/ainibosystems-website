import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["en", "de", "bg"];
const DEFAULT = "en";
const PUBLIC_FILE = /\.(.*)$/;

const COUNTRY_TO_LANG: Record<string, string> = {
  BG: "bg",
  DE: "de",
  AT: "de",
  CH: "de",
};

export function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  // 🚫 Skip static assets, APIs, and special routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/dashboard") ||
    pathname.includes("/session-test") ||
    pathname.includes("/reset-password")
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect root paths based on domain
  if (pathname === "/") {
    if (hostname.includes("ainibosystems.bg")) {
      const url = req.nextUrl.clone();
      url.pathname = "/bg";
      return NextResponse.redirect(url, 307);
    }

    if (hostname.includes("ainibosystems.com")) {
      const url = req.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url, 307);
    }
  }

  // ✅ Locale detection
  const current = pathname.split("/")[1];
  if (!SUPPORTED.includes(current)) {
    let preferred = DEFAULT;

    const country = (req as any).geo?.country;
    if (country && COUNTRY_TO_LANG[country]) {
      preferred = COUNTRY_TO_LANG[country];
    } else {
      const header = req.headers.get("accept-language");
      if (header) {
        const match = header.match(/^[a-z]{2}/i);
        if (match && SUPPORTED.includes(match[0])) preferred = match[0];
      }
    }

    const url = req.nextUrl.clone();
    url.pathname = `/${preferred}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
