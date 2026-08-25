import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl font-extrabold text-brand-ink">404 - Page Not Found</h1>
      <p className="mt-3 text-brand-slate">The page you are looking for does not exist.</p>
      <Link
        href="/iris"
        className="mt-6 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueDark"
      >
        Go to IRIS Research
      </Link>
    </div>
  );
}
