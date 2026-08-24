import Razorpay from "razorpay";

let instance = null;

/**
 * Lazily-created singleton Razorpay client.
 * Reads credentials from environment variables so keys never touch the
 * client bundle. Set these in `.env.local` (see `.env.local.example`).
 */
export function getRazorpayInstance() {
  if (instance) return instance;

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay credentials are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment."
    );
  }

  instance = new Razorpay({ key_id, key_secret });
  return instance;
}
