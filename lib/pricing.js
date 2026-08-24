import { PACKAGES, COMBO_DISCOUNTS, GST_RATE } from "@/data/iris-data";

/**
 * Computes the price breakdown for a set of selected package ids.
 * This is the single source of truth for pricing math — it is called
 * from the client (to render the summary) and again on the server
 * inside the create-order API (so a tampered client total is never
 * trusted for payment amount).
 *
 * @param {string[]} planIds - e.g. ["fundamental", "technical"]
 * @returns {{
 *   plans: {id:string, name:string, price:number}[],
 *   subtotal: number,
 *   discountRate: number,
 *   discountAmount: number,
 *   taxableAmount: number,
 *   gstAmount: number,
 *   total: number,
 * }}
 */
export function calculatePricing(planIds = []) {
  const uniqueIds = [...new Set(planIds)].filter(Boolean);
  const plans = uniqueIds
    .map((id) => PACKAGES.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({ id: p.id, name: p.name, price: p.price }));

  const subtotal = plans.reduce((sum, p) => sum + p.price, 0);
  const discountRate = COMBO_DISCOUNTS[plans.length] ?? 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * GST_RATE);
  const total = taxableAmount + gstAmount;

  return { plans, subtotal, discountRate, discountAmount, taxableAmount, gstAmount, total };
}
