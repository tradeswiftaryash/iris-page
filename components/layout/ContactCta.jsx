import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, FileText, ExternalLink } from "lucide-react";
import { CONTACT, COMPLIANCE_DOCS, FOOTER } from "@/data/iris-data";

export default function ContactCta() {
  return (
    <section className="bg-brand-blue py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading, description, contact details & CTA */}
          <div className="text-white lg:col-span-7">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">{CONTACT.heading}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100 md:text-base">{CONTACT.body}</p>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 max-w-xl">
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

            <div className="mt-8">
              <Link
                href={CONTACT.cta.href}
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-black shadow-card transition hover:bg-gray-100"
              >
                {CONTACT.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: White Box with 5 Clickable Document Buttons */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-2xl bg-white p-5 md:p-6 shadow-xl text-brand-ink">
              <div className="flex flex-col gap-2.5">
                {COMPLIANCE_DOCS.map((doc) => {
                  const isInternal = doc.pdfUrl.startsWith("/");
                  const isExternal = doc.pdfUrl.startsWith("http") || doc.pdfUrl.endsWith(".pdf");
                  const LinkComponent = isInternal ? Link : "a";

                  return (
                    <LinkComponent
                      key={doc.id}
                      href={doc.pdfUrl}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-blue hover:bg-brand-surface hover:text-brand-blue group"
                    >
                      <span className="flex items-center gap-2.5">
                        <FileText size={16} className="text-brand-blue shrink-0" />
                        {doc.title}
                      </span>
                      <ExternalLink size={14} className="text-gray-400 group-hover:text-brand-blue shrink-0 transition" />
                    </LinkComponent>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Centered SEBI Reg No, Disclaimer, and Copyright each on a separate line */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-xs md:text-sm text-blue-100 leading-relaxed space-y-2">
          <p className="font-medium text-white">
            {CONTACT.sebiRegNo}
          </p>
          <p>
            {FOOTER.disclaimer}
          </p>
          <p className="font-medium text-white">
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}

