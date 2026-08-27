import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import ContactCta from "@/components/layout/ContactCta";

export const metadata = {
  title: "Investor Grievance Escalation Matrix | Tradeswift Research",
  description:
    "Investor Grievance Escalation Matrix for Research Analyst services at Tradeswift — contact details of Customer Care, Head of Customer Care, Compliance Officer, Directors/CEO, and Principal Officer.",
};

const MATRIX_DATA = [
  {
    designation: "Customer Care",
    name: "Deepika Mathur",
    address: "4th Floor, Baid House, 1-Tara Nagar, Ajmer Road, Jaipur-302006",
    contact: "0141-4050517",
    emails: ["advisory@tradeswift.net"],
  },
  {
    designation: "Head of Customer Care",
    name: "Rakesh Sharma",
    address: "4th Floor, Baid House, 1-Tara Nagar, Ajmer Road, Jaipur-302006",
    contact: "0141-4050517",
    emails: ["rakesh@tradeswift.net"],
  },
  {
    designation: "Compliance Officer",
    name: "Ajay Mundhra",
    address: "4th Floor, Baid House, 1-Tara Nagar, Ajmer Road, Jaipur-302006",
    contact: "0141-4050521",
    emails: ["Complianceofficer.ra@tradeswift.net"],
  },
  {
    designation: "Directors/ CEO",
    name: "Mr. Sandeep Kumar Jain & Mr. Nishant Jain",
    address: "4th Floor, Baid House, 1-Tara Nagar, Ajmer Road, Jaipur-302006",
    contact: "0141-4050505",
    emails: ["Sandeep@tradeswift.net", "contact@tradeswift.net"],
  },
  {
    designation: "Principal Officer",
    name: "Mr. Shubham Sharma",
    address: "4th Floor, Baid House, 1-Tara Nagar, Ajmer Road, Jaipur-302006",
    contact: "0141-4050505",
    emails: ["Principalofficer.ra@tradeswift.net"],
  },
];

const COMPLAINT_PORTALS = [
  { name: "SCORES", url: "https://scores.sebi.gov.in" },
  { name: "SMART ODR", url: "https://smartodr.in/login" },
];

export default function InvestorGrievancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F6F8FC] py-10 md:py-14 text-brand-ink">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-6">
            <Link
              href="/iris"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to IRIS Research</span>
            </Link>
          </div>

          {/* Section 1: Dear Investor Notice */}
          <div className="rounded-2xl border border-brand-line bg-white p-6 sm:p-8 shadow-sm">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-ink">
              Dear Investor,
            </h1>
            <p className="mt-3 text-sm sm:text-base font-semibold text-brand-slate">
              In case of any grievance / complaint against the research analyst:
            </p>
            <ul className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-brand-slate">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-blue" />
                <span>
                  Please contact the Compliance Officer of the research analyst:{" "}
                  <strong className="font-bold text-brand-ink">Ajay Mundhra</strong>, email:{" "}
                  <a
                    href="mailto:complianceofficer.ra@tradeswift.net"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    complianceofficer.ra@tradeswift.net
                  </a>
                  , Phone:{" "}
                  <a
                    href="tel:9101414050505"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    91-0141-4050505
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-blue" />
                <span>
                  You may also approach the CEO / Director:{" "}
                  <strong className="font-bold text-brand-ink">Sandeep Jain / Nishant Jain</strong>, email:{" "}
                  <a
                    href="mailto:sandeep@tradeswift.net"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    sandeep@tradeswift.net
                  </a>{" "}
                  and{" "}
                  <a
                    href="mailto:contact@tradeswift.net"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    contact@tradeswift.net
                  </a>
                  , Phone:{" "}
                  <a
                    href="tel:9101414050505"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    91-0141-4050505
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-blue" />
                <span>
                  If not satisfied with the response, you can lodge your grievance with SEBI at{" "}
                  <a
                    href="https://scores.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    https://scores.sebi.gov.in
                  </a>
                  , or write to any SEBI office. For queries, feedback or assistance, contact the SEBI Toll-Free Helpline at{" "}
                  <strong className="font-bold text-brand-ink">1800 22 7575 / 1800 266 7575</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: Escalation Matrix Table */}
          <div className="mt-10">
            <div className="mb-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-ink">
                Investor Grievance Escalation matrix of Research Analyst
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-brand-line bg-white shadow-card">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#B00000] text-white">
                    <th className="py-4 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs align-top w-[18%]">
                      Details of designation
                    </th>
                    <th className="py-4 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs align-top w-[20%]">
                      Contact Person Name
                    </th>
                    <th className="py-4 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs align-top w-[26%]">
                      Address where the physical address location
                    </th>
                    <th className="py-4 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs align-top w-[18%]">
                      <div>Contact No.</div>
                      <div className="mt-1 text-[11px] font-normal leading-tight opacity-95">
                        Working hours when complainant can call
                      </div>
                    </th>
                    <th className="py-4 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs align-top w-[18%]">
                      Email-ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  {MATRIX_DATA.map((row, idx) => (
                    <tr
                      key={row.designation}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"}
                    >
                      <td className="py-4 px-4 sm:px-5 font-bold text-brand-ink align-top">
                        {row.designation}
                      </td>
                      <td className="py-4 px-4 sm:px-5 font-semibold text-brand-slate align-top">
                        {row.name}
                      </td>
                      <td className="py-4 px-4 sm:px-5 text-brand-slate leading-relaxed align-top">
                        {row.address}
                      </td>
                      <td className="py-4 px-4 sm:px-5 font-semibold text-brand-ink align-top">
                        <a
                          href={`tel:${row.contact.replace(/[^0-9]/g, "")}`}
                          className="text-brand-blue hover:underline whitespace-nowrap"
                        >
                          {row.contact}
                        </a>
                      </td>
                      <td className="py-4 px-4 sm:px-5 align-top">
                        <div className="flex flex-col gap-1">
                          {row.emails.map((email) => (
                            <a
                              key={email}
                              href={`mailto:${email}`}
                              className="font-medium text-brand-blue hover:underline break-all"
                            >
                              {email}
                            </a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: SEBI & Exchange Grievance Portals */}
          <div className="mt-10 rounded-2xl border border-brand-line bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-brand-ink">
              In absence of response/complaint not addressed to your satisfaction, you may lodge a complaint with SEBI or Exchanges at:
            </h3>
            <div className="mt-4 space-y-2 text-sm sm:text-base">
              {COMPLAINT_PORTALS.map((portal) => (
                <div key={portal.name} className="flex items-center gap-2">
                  <span className="font-bold text-brand-ink">{portal.name} :</span>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-blue hover:underline break-all"
                  >
                    {portal.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <ContactCta />
    </>
  );
}
