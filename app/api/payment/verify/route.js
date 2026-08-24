import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planIds } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, error: "Missing payment fields." }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { verified: false, error: "Razorpay credentials are not configured on the server." },
        { status: 400 }
      );
    }

    // Razorpay's recommended verification: HMAC-SHA256 of "order_id|payment_id"
    // signed with the key secret must equal the signature returned by checkout.
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({ verified: false, error: "Signature mismatch." }, { status: 400 });
    }

    // TODO: Persist the subscription (planIds, order id, payment id, user)
    // to your database here, and/or trigger a confirmation email.
    console.log("[verify] payment confirmed:", { razorpay_order_id, razorpay_payment_id, planIds });

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("[verify] failed:", error);
    return NextResponse.json({ verified: false, error: "Verification failed." }, { status: 500 });
  }
}
