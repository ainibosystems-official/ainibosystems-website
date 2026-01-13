import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { hostname } = new URL(request.url);
    const isBg = hostname.includes("ainibosystems.bg");
    const finalHost = isBg ? "www.ainibosystems.bg" : "www.ainibosystems.com";
    const base = `https://${finalHost}`;
    const lastmod = new Date().toISOString();

    // ✅ Real multilingual pages only (no internal anchors)
    const urls = [
      // 🌍 Homepages
      { loc: `${base}/en`, changefreq: "weekly", priority: "1.0" },
      { loc: `${base}/bg`, changefreq: "weekly", priority: "1.0" },
      { loc: `${base}/de`, changefreq: "weekly", priority: "1.0" },

      // ⚙️ Workflow pages
      { loc: `${base}/en/workflow`, changefreq: "monthly", priority: "0.9" },
      { loc: `${base}/bg/workflow`, changefreq: "monthly", priority: "0.9" },
      { loc: `${base}/de/workflow`, changefreq: "monthly", priority: "0.9" },

      // 👥 Are We Hiring pages
      { loc: `${base}/en/are-we-hiring`, changefreq: "monthly", priority: "0.8" },
      { loc: `${base}/bg/are-we-hiring`, changefreq: "monthly", priority: "0.8" },
      { loc: `${base}/de/are-we-hiring`, changefreq: "monthly", priority: "0.8" },

      // 🤖 Bots & Pricing pages
      { loc: `${base}/en/bots-and-pricing`, changefreq: "weekly", priority: "0.95" },
      { loc: `${base}/bg/bots-and-pricing`, changefreq: "weekly", priority: "0.95" },
      { loc: `${base}/de/bots-and-pricing`, changefreq: "weekly", priority: "0.95" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map(
          (u) => `<url>
  <loc>${u.loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
        )
        .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("❌ Sitemap generation error:", error);
    return new NextResponse("Sitemap error", { status: 500 });
  }
}
