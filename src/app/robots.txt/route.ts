import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { hostname } = new URL(request.url);
    const isBg = hostname.includes("ainibosystems.bg");
    const finalHost = isBg ? "www.ainibosystems.bg" : "www.ainibosystems.com";
    const base = `https://${finalHost}`;

    const content = `
User-Agent: *
Allow: /
Disallow: /api
Disallow: /_next
Disallow: /private

Host: ${finalHost}
Sitemap: ${base}/sitemap.xml
`.trim();

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Robots generation error:", error);
    return new NextResponse("Robots error", { status: 500 });
  }
}
