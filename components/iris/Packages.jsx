"use client";

import { useMemo, useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2, Info, X } from "lucide-react";
import { PACKAGES, COMBO_DISCOUNTS, GST_RATE } from "@/data/iris-data";
import { calculatePricing } from "@/lib/pricing";
import { startRazorpayCheckout } from "@/lib/useRazorpayCheckout";

const currency = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Packages() {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | processing | success | error
  const [modalPackage, setModalPackage] = useState(null);

  const pricing = useMemo(() => calculatePricing(selected), [selected]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalPackage(null);
    };
    if (modalPackage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [modalPackage]);

  function toggle(planId) {
    setStatus({ state: "idle", message: "" });
    setSelected((prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]));
  }

  function pay(planIds) {
    if (planIds.length === 0) return;
    setStatus({ state: "processing", message: "Opening secure checkout…" });

    startRazorpayCheckout(
      planIds,
      {},
      {
        onSuccess: () => {
          setStatus({
            state: "success",
            message: "Payment successful! Your IRIS subscription is now active — a confirmation has been sent to your email.",
          });
        },
        onError: (message) => setStatus({ state: "error", message }),
        onDismiss: () =>
          setStatus((prev) => (prev.state === "processing" ? { state: "idle", message: "" } : prev)),
      }
    );
  }

  return (
    <section id="packages" className="scroll-mt-20 bg-brand-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-ink md:text-3xl">Our Packages</h2>
        </div>

        {/* Combo pack discount box */}
        <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-xl2 border border-brand-line bg-white shadow-card">
          <div className="bg-brand-blue px-6 py-3 text-sm font-semibold text-white text-left">
            Combo Pack Discount
          </div>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-brand-line">
                <td className="px-6 py-3 text-brand-slate">Combine any 2 subscriptions</td>
                <td className="px-6 py-3 text-right font-bold text-brand-blue">
                  {Math.round(COMBO_DISCOUNTS[2] * 100)}% off
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-brand-slate">Combine all 3 subscriptions</td>
                <td className="px-6 py-3 text-right font-bold text-brand-blue">
                  {Math.round(COMBO_DISCOUNTS[3] * 100)}% off
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => {
            const isSelected = selected.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-xl2 border bg-white p-6 shadow-card transition ${
                  isSelected ? "border-brand-blue ring-2 ring-brand-blue/30" : "border-brand-line"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-brand-ink">{pkg.name}</h3>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-brand-slate">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggle(pkg.id)}
                        className="h-4 w-4 rounded border-brand-line text-brand-blue focus:ring-brand-blue"
                      />
                      Add to combo
                    </label>
                  </div>

                  <p className="mt-1 text-2xl font-extrabold text-brand-blue">
                    {currency(pkg.price)}
                    <span className="ml-1 text-xs font-medium text-brand-slate">/ year + GST</span>
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setModalPackage(pkg)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-blue transition hover:text-brand-blueDark hover:underline"
                  >
                    <Info size={15} />
                    More info
                  </button>

                  <button
                    onClick={() => pay([pkg.id])}
                    disabled={status.state === "processing"}
                    className="w-full rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-redDark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-brand-slate">
          Charges exclude GST &mdash; 18% GST
        </p>

        {/* Running order summary + checkout */}
        {selected.length > 0 && (
          <div className="mx-auto mt-10 max-w-2xl rounded-xl2 border border-brand-blue/30 bg-white p-6 shadow-cardHover">
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-slate">Your Order</h3>
            <ul className="mt-3 space-y-1.5">
              {pricing.plans.map((p) => (
                <li key={p.id} className="flex justify-between text-sm text-brand-ink">
                  <span>{p.name}</span>
                  <span>{currency(p.price)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1.5 border-t border-brand-line pt-4 text-sm">
              <div className="flex justify-between text-brand-slate">
                <span>Subtotal</span>
                <span>{currency(pricing.subtotal)}</span>
              </div>
              {pricing.discountRate > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Combo discount ({Math.round(pricing.discountRate * 100)}%)</span>
                  <span>&minus;{currency(pricing.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-slate">
                <span>GST ({Math.round(GST_RATE * 100)}%)</span>
                <span>{currency(pricing.gstAmount)}</span>
              </div>
              <div className="flex justify-between border-t border-brand-line pt-2 text-base font-bold text-brand-ink">
                <span>Total payable</span>
                <span>{currency(pricing.total)}</span>
              </div>
            </div>

            <button
              onClick={() => pay(selected)}
              disabled={status.state === "processing"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-blueDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.state === "processing" && <Loader2 size={16} className="animate-spin" />}
              Proceed to Payment
            </button>
          </div>
        )}

        {status.state === "success" && (
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            {status.message}
          </p>
        )}
        {status.state === "error" && (
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <XCircle size={18} className="mt-0.5 shrink-0" />
            {status.message}
          </p>
        )}
      </div>

      {/* Package Detail Modal */}
      {modalPackage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setModalPackage(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl2 bg-white p-6 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-brand-line pb-4">
              <div>
                <h3 className="text-xl font-bold text-brand-ink">{modalPackage.name} Package Details</h3>
                <p className="mt-1 text-2xl font-extrabold text-brand-blue">
                  {currency(modalPackage.price)}
                  <span className="ml-1 text-xs font-medium text-brand-slate">/ year + GST</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalPackage(null)}
                className="rounded-lg p-1.5 text-brand-slate transition hover:bg-gray-100 hover:text-brand-ink"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 overflow-y-auto pr-1">
              <div className="overflow-x-auto rounded-xl border border-brand-line bg-brand-surface/30 p-2 sm:p-4">
                <table className="w-full min-w-[340px] border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="w-1/3 border-b border-brand-line pb-2 font-semibold text-brand-ink">
                        Feature
                      </th>
                      {modalPackage.columns.map((col) => (
                        <th
                          key={col}
                          className="border-b border-brand-line pb-2 pl-2 font-semibold text-brand-ink"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modalPackage.rows.map((row) => (
                      <tr key={row.label} className="border-b border-brand-line/70 last:border-0">
                        <td className="py-2.5 pr-2 text-brand-slate font-medium">{row.label}</td>
                        {row.values.map((val, i) => (
                          <td key={i} className="py-2.5 pl-2 font-medium text-brand-ink">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-lg bg-brand-surface p-3 text-xs sm:text-sm text-brand-slate">
                Desirable amount:{" "}
                <span className="font-bold text-brand-ink">{modalPackage.desirableAmount}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-brand-line pt-4">
              <button
                type="button"
                onClick={() => setModalPackage(null)}
                className="rounded-lg border border-brand-line px-4 py-2 text-xs sm:text-sm font-semibold text-brand-slate transition hover:bg-gray-50 hover:text-brand-ink"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const pkgId = modalPackage.id;
                  setModalPackage(null);
                  pay([pkgId]);
                }}
                className="rounded-lg bg-brand-red px-5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-brand-redDark"
              >
                Choose {modalPackage.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

