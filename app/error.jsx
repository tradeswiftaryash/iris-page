"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-3xl font-extrabold text-brand-ink">Something went wrong</h1>
      <p className="mt-3 text-brand-slate text-sm max-w-md">
        An error occurred while loading this page.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueDark"
        >
          Try again
        </button>
        <Link
          href="/iris"
          className="rounded-lg border border-brand-line px-6 py-2.5 text-sm font-semibold text-brand-ink transition hover:bg-brand-surface"
        >
          Back to IRIS
        </Link>
      </div>
    </div>
  );
}
