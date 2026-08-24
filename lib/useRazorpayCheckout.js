"use client";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);

    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
    document.body.appendChild(script);
  });
}

/**
 * Runs the full pay flow for a set of selected package ids:
 * 1. Ask our own Node backend to create a Razorpay order (server prices it).
 * 2. Load Razorpay Checkout and open it.
 * 3. On success, ask our backend to verify the signature.
 *
 * @param {string[]} planIds
 * @param {{name?: string, email?: string, contact?: string}} customer
 * @param {{onSuccess?: (data: any) => void, onError?: (message: string) => void, onDismiss?: () => void}} callbacks
 */
export async function startRazorpayCheckout(planIds, customer = {}, callbacks = {}) {
  const { onSuccess, onError, onDismiss } = callbacks;

  try {
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planIds }),
    });
    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      throw new Error(orderData?.error || "Could not start checkout.");
    }

    await loadScript(CHECKOUT_SRC);

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Tradeswift",
      description: "IRIS Research Subscription",
      order_id: orderData.orderId,
      prefill: {
        name: customer.name || "",
        email: customer.email || "",
        contact: customer.contact || "",
      },
      theme: { color: "#1E45E0" },
      handler: async function (response) {
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, planIds }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            onSuccess?.({ ...response, pricing: orderData.pricing });
          } else {
            onError?.(verifyData.error || "We couldn't verify that payment. Please contact support.");
          }
        } catch (err) {
          onError?.("We couldn't verify that payment. Please contact support.");
        }
      },
      modal: {
        ondismiss: function () {
          onDismiss?.();
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      onError?.(response?.error?.description || "Payment failed. Please try again.");
    });
    razorpay.open();
  } catch (error) {
    onError?.(error.message || "Something went wrong starting checkout.");
  }
}
