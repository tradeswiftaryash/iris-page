import Link from "next/link";
import { ShieldCheck, LineChart, Newspaper, Radio } from "lucide-react";
import { HERO } from "@/data/iris-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="-ml-4 inline-flex items-center gap-2 rounded-full bg-brand-surface px-4 py-1.5 text-sm sm:text-base font-bold uppercase tracking-wide text-brand-blue">
            {HERO.eyebrow}
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-none text-brand-ink sm:text-5xl md:text-[54px]">
            {HERO.title}
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-bold text-brand-red">
            {HERO.subtitle}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate">
            {HERO.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={HERO.primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-redDark"
            >
              {HERO.primaryCta.label}
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-lg border border-brand-blue px-7 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-surface"
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-slate">
              <ShieldCheck size={14} className="text-brand-blue" />
              {HERO.badge}
            </div>
          </div>
        </div>

        {/* Illustration: the source Figma frame held only a hand-drawn
            "image" placeholder here, so this is an original graphic
            built from the page's own subject matter (research signals) —
            swap in the client's real illustration asset when available. */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-xl2 bg-gradient-to-br from-brand-blue to-brand-blueDark p-8 shadow-cardHover">
            <div className="grid grid-cols-2 gap-4">
              <IllustrationTile icon={LineChart} label="Technical Calls" value="30–80 / mo" />
              <IllustrationTile icon={Newspaper} label="Fundamental Picks" value="Curated" />
              <IllustrationTile icon={Radio} label="Option Strategies" value="All-season" />
              <IllustrationTile icon={ShieldCheck} label="Research" value="SEBI Regd." />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 bg-white px-5 py-4 shadow-card sm:block">
            <p className="text-xs text-brand-slate">Subscription models</p>
            <p className="text-lg font-bold text-brand-ink">3 research tracks</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IllustrationTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
      <Icon size={20} className="text-white" />
      <p className="mt-3 text-[11px] uppercase tracking-wide text-blue-100">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
