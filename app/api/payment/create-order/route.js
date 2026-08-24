import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";
import { calculatePricing } from "@/lib/pricing";

// Force the Node.js runtime — the Razorpay SDK uses Node APIs and is not
// compatible with the Edge runtime.
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const planIds = Array.isArray(body?.planIds) ? body.planIds : [];

    if (planIds.length === 0) {
      return NextResponse.json(
        { error: "Select at least one package before proceeding to payment." },
        { status: 400 }
      );
    }

    // Recompute the price on the server — never trust an amount sent by the client.
    const pricing = calculatePricing(planIds);

    if (pricing.total <= 0) {
      return NextResponse.json({ error: "Could not price the selected packages." }, { status: 400 });
    }

    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: pricing.total * 100, // Razorpay expects the amount in paise
      currency: "INR",
      receipt: `iris_${Date.now()}`,
      notes: {
        plans: pricing.plans.map((p) => p.name).join(", "),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      pricing,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[create-order] failed:", error);
    return NextResponse.json(
      { error: "Unable to create the payment order. Please try again." },
      { status: 500 }
    );
  }
}
