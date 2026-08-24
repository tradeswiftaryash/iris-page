"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { calculatePricing } from "@/lib/pricing";

export default function LeadModal({ planIds = [], onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const pricing = calculatePricing(planIds);
  const selectedNames = pricing.plans.map((p) => p.name).join(" + ");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const validateForm = () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          planIds,
          packageId: planIds[0],
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSuccess(true);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-lg flex-col rounded-xl2 bg-white p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-brand-line pb-4">
          <div>
            <h3 className="text-xl font-bold text-brand-ink">Subscribe to IRIS</h3>
            <p className="mt-1 text-sm font-medium text-brand-slate">
              Selected Package:{" "}
              <span className="font-bold text-brand-blue">{selectedNames || "IRIS Subscription"}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-brand-slate transition hover:bg-gray-100 hover:text-brand-ink"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="mt-4 text-lg font-bold text-brand-ink">Interest Submitted Successfully!</h4>
            <p className="mt-2 text-sm text-brand-slate">
              Thank you <span className="font-semibold text-brand-ink">{name}</span>! Your interest for{" "}
              <span className="font-semibold text-brand-blue">{selectedNames}</span> has been recorded and saved in our database. Our research team will contact you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueDark"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs sm:text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-brand-ink">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-brand-line px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-semibold text-brand-ink">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(val);
                }}
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-brand-line px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-xs font-semibold text-brand-ink">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="emailAddress"
                type="email"
                placeholder="e.g. rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-brand-line px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div className="rounded-lg bg-brand-surface p-3 text-xs text-brand-slate">
              <div className="flex justify-between font-medium">
                <span>Selected Package(s):</span>
                <span className="font-bold text-brand-ink">{selectedNames}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Total Payable:</span>
                <span className="font-bold text-brand-blue">
                  ₹{pricing.total.toLocaleString("en-IN")} (incl. GST)
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-lg border border-brand-line px-4 py-2.5 text-xs sm:text-sm font-semibold text-brand-slate transition hover:bg-gray-50 hover:text-brand-ink disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-brand-redDark disabled:opacity-60"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Submitting..." : "Submit Interest"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
