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

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <a
              href={`tel:${CONTACT.landline.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-3 group transition hover:opacity-90"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                <Phone size={16} className="text-white" />
              </span>
              <div>
                <span className="block text-xs text-blue-100">Call</span>
                <span className="text-sm font-semibold text-white group-hover:underline">{CONTACT.landline}</span>
              </div>
            </a>

            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group transition hover:opacity-90"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 transition group-hover:bg-emerald-600">
                <MessageCircle size={16} className="text-white" />
              </span>
              <div>
                <span className="block text-xs text-blue-100">Whatsapp</span>
                <span className="text-sm font-semibold text-white group-hover:underline">{CONTACT.whatsapp}</span>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 group transition hover:opacity-90"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                <Mail size={16} className="text-white" />
              </span>
              <div>
                <span className="block text-xs text-blue-100">Email</span>
                <span className="text-sm font-semibold text-white group-hover:underline">{CONTACT.email}</span>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MapPin size={16} className="text-white" />
              </span>
              <div>
                <span className="block text-xs text-blue-100">Address</span>
                <span className="text-sm font-semibold text-white">{CONTACT.address}</span>
              </div>
            </div>
          </div>
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
