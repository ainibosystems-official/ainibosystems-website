import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency, reference } = await req.json();

    const clientId = process.env.PAYPAL_CLIENT_ID!;
    const secret = process.env.PAYPAL_SECRET!;
    const base = process.env.PAYPAL_API_BASE || "https://api-m.paypal.com";

    // 1️⃣ Get Access Token
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error("❌ PayPal Token Error:", text);
      return NextResponse.json({ error: "Token request failed" }, { status: 500 });
    }

    const { access_token } = await tokenRes.json();

    // 2️⃣ Create Order
    const orderRes = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "USD",
              value: amount || "1.00",
            },
            description: reference || "AiNiBo Systems Custom Payment",
          },
        ],
        application_context: {
          brand_name: "AiNiBo Systems",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/after-checkout?status=success&ref=${reference}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/after-checkout?status=cancel&ref=${reference}`,
        },
      }),
    });

    const orderData = await orderRes.json();

    console.log("✅ PayPal Order Created:", orderData);

    // 3️⃣ Check for approval link
    const approveUrl = orderData?.links?.find((l: any) => l.rel === "approve")?.href;
    if (!approveUrl) {
      console.error("⚠️ Missing approve link:", orderData);
      return NextResponse.json({ error: "No approval link found", orderData }, { status: 500 });
    }

    // ✅ Success
    return NextResponse.json({ id: orderData.id, approveUrl });
  } catch (err) {
    console.error("💥 PayPal Create Order Error:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
