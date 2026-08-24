import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/iris-data";

export default function FaqAccordion() {
  const half = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, half), FAQS.slice(half)];

  return (
    <section id="faq" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-brand-ink md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-sm text-brand-slate md:text-base">
          Everything you need to know about Tradeswift Research and IRIS subscriptions.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
          {columns.map((colItems, colIndex) => (
            <div
              key={colIndex}
              className="divide-y divide-brand-line rounded-xl2 border border-brand-line bg-white shadow-card"
            >
              {colItems.map((item, i) => (
                <details key={i} className="group px-5 py-4 open:bg-brand-surface/60 md:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-brand-ink marker:content-none md:text-base">
                    {item.q}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

