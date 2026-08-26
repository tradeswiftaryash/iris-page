"use client";

import { useMemo, useState, useRef } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { PACKAGES, COMBO_DISCOUNTS, GST_RATE } from "@/data/iris-data";
import { calculatePricing } from "@/lib/pricing";
import LeadModal from "@/components/iris/LeadModal";

const currency = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Packages() {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | processing | success | error
  const [leadPlanIds, setLeadPlanIds] = useState(null);
  const orderSummaryRef = useRef(null);

  const pricing = useMemo(() => calculatePricing(selected), [selected]);
  const unselectedPackages = useMemo(() => PACKAGES.filter((p) => !selected.includes(p.id)), [selected]);

  const scrollToOrderSummary = () => {
    setTimeout(() => {
      orderSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  function toggle(planId) {
    setStatus({ state: "idle", message: "" });
    const isAdding = !selected.includes(planId);
    setSelected((prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]));
    if (isAdding) {
      scrollToOrderSummary();
    }
  }

  function handleLeadModalOpen(planIds) {
    if (!planIds || planIds.length === 0) return;
    setLeadPlanIds(planIds);
  }

  function handleChoosePackage(planId) {
    setStatus({ state: "idle", message: "" });
    setSelected((prev) => {
      if (!prev.includes(planId)) {
        return [...prev, planId];
      }
      return prev;
    });
    scrollToOrderSummary();
  }

  return (
    <section id="packages" className="scroll-mt-20 bg-brand-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-ink md:text-3xl">Our Packages</h2>
        </div>

        {/* Combo pack discount box */}
        <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-xl2 border border-brand-line bg-white shadow-card">
          <div className="bg-brand-red px-6 py-3 text-sm font-semibold text-white text-left">
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
                    <h3 className="text-xl font-bold text-brand-ink">{pkg.name}</h3>
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs font-normal text-brand-slate">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggle(pkg.id)}
                        className="h-4 w-4 rounded border-brand-line text-brand-blue focus:ring-brand-blue"
                      />
                      Add to combo
                    </label>
                  </div>

                  <p className="mt-1.5 text-2xl font-extrabold text-brand-blue">
                    {currency(pkg.price)}
                    <span className="ml-1 text-xs font-normal text-brand-slate">/ year + GST</span>
                  </p>

                  {/* Clean Inline Table without outer box */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[360px]">
                      <thead>
                        <tr className="border-b border-brand-line">
                          <th className="py-2.5 pr-2 font-semibold text-brand-ink align-top">Feature</th>
                          {pkg.columns.map((col) => (
                            <th
                              key={col}
                              className="py-2.5 px-1.5 font-semibold text-brand-ink align-top leading-snug"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-line/60">
                        {pkg.rows.map((row) => (
                          <tr key={row.label}>
                            <td className="py-2.5 pr-2 font-normal text-brand-slate align-top leading-snug">
                              {row.label}
                            </td>
                            {row.values.map((val, i) => (
                              <td
                                key={i}
                                className="py-2.5 px-1.5 font-medium text-brand-ink align-top leading-snug"
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-5 text-xs text-brand-slate">
                    Desirable amount: <span className="font-bold text-brand-ink">{pkg.desirableAmount}</span>
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleChoosePackage(pkg.id)}
                    className="w-full rounded-xl bg-brand-red px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-redDark disabled:cursor-not-allowed disabled:opacity-60"
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
          <div
            id="your-order"
            ref={orderSummaryRef}
            className="mx-auto mt-10 max-w-5xl scroll-mt-24 flex flex-col lg:flex-row items-stretch justify-center gap-6"
          >
            {/* Left Column: YOUR ORDER payment card */}
            <div className={`w-full ${unselectedPackages.length > 0 ? "lg:w-1/2" : "max-w-2xl mx-auto"} flex flex-col justify-between rounded-xl2 border border-brand-blue/30 bg-white p-6 shadow-cardHover transition-all`}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-slate">Your Order</h3>
                <ul className="mt-3 space-y-1.5">
                  {pricing.plans.map((p) => (
                    <li key={p.id} className="flex justify-between text-sm text-brand-ink font-medium">
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
                    <div className="flex justify-between text-emerald-600 font-semibold">
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
              </div>

              <button
                onClick={() => handleLeadModalOpen(selected)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-blueDark disabled:cursor-not-allowed disabled:opacity-60"
              >
                Subscribe
              </button>
            </div>

            {/* Right Column: Upsell side panel for remaining packages */}
            {unselectedPackages.length > 0 ? (
              <div className="w-full lg:w-1/2 flex flex-col justify-between rounded-xl2 border border-brand-blue/30 bg-white p-6 shadow-card transition-all">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-slate">
                    Add Packages & Save More
                  </h3>

                  <div className="mt-4 space-y-3">
                    {unselectedPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-brand-line p-4 transition hover:border-brand-blue/40 hover:bg-brand-surface/50"
                      >
                        <div>
                          <h4 className="text-lg font-bold text-brand-ink">{pkg.name}</h4>
                          <p className="mt-0.5 text-base font-extrabold text-brand-blue">
                            {currency(pkg.price)}
                            <span className="ml-1 text-xs font-normal text-brand-slate">/ year + GST</span>
                          </p>
                        </div>
                        <label className="flex cursor-pointer items-center gap-2 self-start sm:self-center rounded-lg border border-brand-blue/20 bg-blue-50/60 px-3.5 py-2 text-xs font-semibold text-brand-blue transition hover:bg-blue-100/80">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => toggle(pkg.id)}
                            className="h-4 w-4 rounded border-brand-line text-brand-blue focus:ring-brand-blue cursor-pointer"
                          />
                          Add to combo
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discount Banner text below packages */}
                <div className="mt-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-brand-blue/20 p-3 text-center shadow-sm">
                  {selected.length === 1 && (
                    <p className="text-xs font-extrabold text-brand-blue tracking-wide uppercase">
                      Add and get 15% off
                    </p>
                  )}
                  {selected.length === 2 && (
                    <p className="text-xs font-extrabold text-brand-blue tracking-wide uppercase">
                      Add this and get 25% off
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-center rounded-xl2 border border-emerald-200 bg-emerald-50/50 p-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-600 mb-2" />
                <h4 className="text-base font-bold text-emerald-900">Maximum Discount Unlocked!</h4>
                <p className="mt-1 text-xs text-emerald-700">
                  You have selected all 3 packages and saved <span className="font-bold">25% off</span> on your entire subscription!
                </p>
              </div>
            )}
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

      {/* Lead Registration Form Popup Modal */}
      {leadPlanIds && (
        <LeadModal
          planIds={leadPlanIds}
          onClose={() => setLeadPlanIds(null)}
          onSuccess={() => {
            setStatus({
              state: "success",
              message: "Your subscription request has been received! Our team will contact you shortly.",
            });
            setSelected([]);
          }}
        />
      )}
    </section>
  );
}


