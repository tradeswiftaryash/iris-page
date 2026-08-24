import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/data/iris-data";

export default function ContactCta() {
  return (
    <section className="bg-brand-blue">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{CONTACT.heading}</h2>
          <p className="mt-3 text-sm text-blue-100 md:text-base">{CONTACT.body}</p>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <MessageCircle size={16} className="text-white" />
              </span>
              <div>
                <dt className="text-xs text-blue-100">Whatsapp</dt>
                <dd className="text-sm font-semibold text-white">{CONTACT.whatsapp}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Phone size={16} className="text-white" />
              </span>
              <div>
                <dt className="text-xs text-blue-100">Landline</dt>
                <dd className="text-sm font-semibold text-white">{CONTACT.landline}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Mail size={16} className="text-white" />
              </span>
              <div>
                <dt className="text-xs text-blue-100">Email</dt>
                <dd className="text-sm font-semibold text-white">{CONTACT.email}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MapPin size={16} className="text-white" />
              </span>
              <div>
                <dt className="text-xs text-blue-100">Address</dt>
                <dd className="text-sm font-semibold text-white">{CONTACT.address}</dd>
              </div>
            </div>
          </dl>
        </div>

        <Link
          href={CONTACT.cta.href}
          className="inline-flex h-fit shrink-0 items-center justify-center rounded-lg bg-brand-red px-8 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-redDark"
        >
          {CONTACT.cta.label}
        </Link>
      </div>
    </section>
  );
}
