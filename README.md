# Tradeswift — IRIS Page (Investment and Research Intelligence Services)

A single, self-contained Next.js page built from the Figma reference, styled to match
the existing `tradeswift.net` PMS page, with a working Razorpay payment flow on a
Node.js backend. **Build verified** (`next build` ✓) and **runtime-tested**
(`next start` + live requests against every route ✓) before delivery.

## What's in this package

```
app/
  iris/page.jsx                      the page itself (Header → Hero → Our Plans → Packages → FAQ → Contact CTA)
  api/payment/create-order/route.js  Node.js API — creates a Razorpay order (server prices it, never trusts the client)
  api/payment/verify/route.js        Node.js API — verifies the Razorpay payment signature (HMAC-SHA256)
  layout.jsx, globals.css            standalone root layout + Tailwind setup, for preview only — see "Integrating" below
components/
  layout/Header.jsx                  navbar rebuilt from your screenshot
  layout/ContactCta.jsx              "Ready to Partner with Tradeswift?" footer band
  iris/Hero.jsx                      title, description, "Know More" + "See Our Packages" buttons
  iris/OurPlans.jsx                  Fundamental / Technical / Option Strategy description cards
  iris/Packages.jsx                  pricing table, combo-discount selector, order summary, checkout trigger
  iris/FaqAccordion.jsx              24-question accordion (native <details>, no JS required to expand/collapse)
data/iris-data.js                    ALL copy in one file (hero text, plan descriptions, pricing table, FAQ, contact info)
lib/
  razorpay.js                        server-side Razorpay client (reads env vars, never exposes the secret)
  pricing.js                         combo-discount + GST math — single source of truth, used both client & server-side
  useRazorpayCheckout.js             client helper that loads Razorpay Checkout and drives the pay flow
```

## How the two buttons work (as you specified)

- **"Know More"** (Figma "button 3") → smooth-scrolls to `#our-plans` (the Fundamental / Technical / Option Strategy description cards).
- **"See Our Packages"** (Figma "button 1") → smooth-scrolls to `#packages` (the pricing table).

Both are plain anchor links (`<Link href="#our-plans">`), so they work even before JS hydrates.

## The payment flow

1. Visitor selects one package (individual "Choose ⟨Plan⟩" button) or checks "Add to combo" on 2–3 cards.
2. Client posts the **plan IDs only** (never a price) to `POST /api/payment/create-order`.
3. The Node.js route recalculates the price server-side via `lib/pricing.js` (fundamental ₹50,000 / technical ₹40,000 / option strategy ₹30,000, combo discounts 15%/25%, GST 18% — all sourced from `Fianl.xlsx`), creates a Razorpay order, and returns the order id + public key id.
4. The browser opens Razorpay Checkout with that order id.
5. On success, Razorpay's `handler` posts the payment id/order id/signature to `POST /api/payment/verify`, which recomputes the HMAC-SHA256 signature server-side and only confirms if it matches.
6. `console.log` marks where to persist the subscription to your database / send a confirmation email — see the `TODO` in `app/api/payment/verify/route.js`.

**This was tested end-to-end against dummy credentials**: empty selection → 400, real selection → order-creation attempt (fails gracefully with dummy keys, as expected), and both a missing-fields and a tampered-signature request to `/verify` correctly return `verified:false`.

## Setting up Razorpay

1. Create/log into a [Razorpay account](https://dashboard.razorpay.com/) and grab your Key ID + Key Secret (Settings → API Keys). Use the `rzp_test_...` pair while developing.
2. Copy `.env.local.example` to `.env.local` and fill in both values.
3. `npm install && npm run dev`, visit `/iris`.

No other secrets are needed — the client never sees `RAZORPAY_KEY_SECRET`.

## Integrating into your existing Next.js app

This was built and build-tested as a **standalone** app so it could be verified in isolation. To merge it in:

1. Copy `app/iris/`, `app/api/payment/`, `components/`, `data/`, and `lib/` into your existing project.
2. **Delete `app/layout.jsx` from this package** — keep your app's real root layout, and instead merge the brand tokens from `tailwind.config.js` (`brand.blue #1E45E0`, `brand.red #C23434`, etc.) into your existing Tailwind config, and the small utility rules from `app/globals.css` into your existing global stylesheet.
3. **Replace `components/layout/Header.jsx` with your actual shared header component** — this file is a faithful rebuild from your screenshot so the page works standalone, but you said to "keep the header as it is," so your real header component should be a drop-in swap in `app/iris/page.jsx`.
4. Add the two env vars to your existing `.env.local` / hosting provider's env settings.
5. Run `npm install razorpay lucide-react` in your existing project if you don't already have them (check `package.json` in this package for exact versions used).

## One content note

The Figma frame in the hero area only contained a hand-drawn placeholder box (literally the word "Image" sketched in red) rather than a finished illustration — so `components/iris/Hero.jsx` ships an original graphic built from the page's own subject matter (a small research-signal tile grid) instead of reproducing that sketch. Swap in your real illustration asset whenever it's ready; the layout slot is ready for an `<img>`/`<Image>` in its place.

## Verified

- `npx next build` — compiles cleanly, no type/lint errors.
- `npx next start` + live HTTP checks — `/iris` returns 200 with correct content; both API routes return correct status codes and error messages for empty/invalid/tampered input.
- Combo pricing math spot-checked directly: ₹50,000 → ₹59,000 w/ GST · combo-of-2 ₹90,000 → 15% off → ₹90,270 w/ GST · combo-of-3 ₹1,20,000 → 25% off → ₹1,06,200 w/ GST.
