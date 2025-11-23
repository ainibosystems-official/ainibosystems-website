import Stripe from "stripe";
import { NextResponse } from "next/server";

// ✅ Create Stripe instance (no apiVersion needed — it's inferred)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, currency, reference } = await req.json();

    // ✅ Create Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Order ${reference}`,
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-result?status=success&ref=${reference}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-result?status=failed&ref=${reference}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
