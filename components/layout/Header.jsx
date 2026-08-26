"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Phone, User, ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product & Services", href: "/product-services", hasDropdown: true },
  { label: "PMS", href: "/pms", hasDropdown: true },
  { label: "About Us", href: "/about-us" },
  { label: "Research", href: "/research", hasDropdown: true },
  { label: "Back Office", href: "/back-office" },
  { label: "ReKYC", href: "/rekyc" },
  { label: "Downloads", href: "/downloads", hasDropdown: true },
  { label: "e-IPO", href: "/e-ipo" },
  { label: "Login", href: "/login", hasDropdown: true },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm z-50 relative">
      {/* Top Bar - Logo and Utility Actions */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 py-3">
        {/* Tradeswift Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Tradeswift - The Equity & Commodity Brokers"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Right Utility Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm font-medium">
          <Link
            href="#main-content"
            className="text-[#2E62D3] hover:underline text-sm font-medium mr-1"
          >
            Skip to main content
          </Link>

          <Link
            href="/open-account"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2E62D3] text-[#2E62D3] font-semibold hover:bg-blue-50 transition-colors"
          >
            <User className="w-4 h-4 text-[#2E62D3]" />
            <span>Open an Account</span>
          </Link>

          <Link
            href="/pms"
            className="px-5 py-2 rounded-lg bg-[#B00000] text-white font-bold hover:bg-[#B00000] transition-colors"
          >
            PMS
          </Link>

          <Link
            href="/call-back"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2E62D3] text-[#2E62D3] font-semibold hover:bg-blue-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#2E62D3]" />
            <span>Call Back</span>
          </Link>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
              aria-label="Accessibility options"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
              </svg>
              <span>Accessibility</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="lg:hidden text-[#0B2B85] p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Main Navigation Bar (Blue Ribbon) */}
      <div className="bg-[#0047BA] w-full">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 py-3 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-2.5 py-1 text-sm font-semibold text-white hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-white/80 shrink-0" />
                )}
              </Link>
            ))}
          </nav>

          <div className="lg:hidden py-2 text-white text-xs font-semibold">
            Tradeswift
          </div>

          {/* Search Icon */}
          <button
            type="button"
            aria-label="Search"
            className="text-white hover:opacity-80 py-3 pl-4 pr-2 flex items-center justify-center shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-3 pb-4 border-b border-gray-100">
            <Link
              href="/open-account"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#2E62D3] text-[#2E62D3] font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              <User className="w-4 h-4 text-[#2E62D3]" />
              <span>Open an Account</span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/pms"
                className="flex items-center justify-center py-2.5 rounded-lg bg-[#B00000] text-white font-bold text-center"
                onClick={() => setMobileOpen(false)}
              >
                PMS
              </Link>
              <Link
                href="/call-back"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#2E62D3] text-[#2E62D3] font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="w-4 h-4 text-[#2E62D3]" />
                <span>Call Back</span>
              </Link>
            </div>
          </div>

          <ul className="flex flex-col py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-2 text-base font-semibold text-gray-800 hover:text-[#0047BA]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
