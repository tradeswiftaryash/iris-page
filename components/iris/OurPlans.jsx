import { BadgeCheck, TrendingUp, Layers } from "lucide-react";
import { PLANS } from "@/data/iris-data";

const ICONS = {
  fundamental: BadgeCheck,
  technical: TrendingUp,
  "option-strategy": Layers,
};

export default function OurPlans() {
  return (
    <section id="our-plans" className="scroll-mt-20 bg-white">
      <div className="bg-brand-red py-3 text-center">
        <h2 className="text-2xl font-bold tracking-wide text-white md:text-[28px]">OUR PLANS</h2>
      </div>

      <div className="mx-auto grid max-w-[1350px] grid-cols-1 gap-6 px-4 sm:px-6 py-12 md:grid-cols-3 items-stretch">
        {PLANS.map((plan) => {
          const Icon = ICONS[plan.id] ?? BadgeCheck;
          return (
            <article
              key={plan.id}
              className="flex flex-col justify-between rounded-xl2 border border-brand-line bg-brand-surface p-6 sm:p-7 shadow-card hover:shadow-cardHover transition-shadow"
            >
              <div>
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-brand-ink">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-brand-slate">
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-brand-line/60 pt-5">
                  <p className="text-sm font-semibold text-brand-ink">{plan.benefitsTitle}</p>
                  <ul className="mt-3 space-y-2.5">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-brand-slate">
                        <span className="mt-0.5 font-semibold text-brand-blue shrink-0">
                          {String.fromCharCode(97 + i)}.
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
